import { supabaseAdmin } from '../../config/supabase.js';
import { mapBlogRow, mapCategoryRow } from '../../shared/utils/db-mapper.util.js';
import { NotFoundError, ConflictError, ForbiddenError } from '../../shared/errors/app-error.js';
import type { CreateBlogInput, UpdateBlogInput, ListBlogsQuery, Blog } from './blog.types.js';
import type { Category as SharedCategory } from '@packages/shared-types';

/**
 * Blog service - handles blog management logic
 */
export class BlogService {
  /**
   * Helper: Fetch categories for a blog
   */
  private async fetchBlogCategories(blogId: string): Promise<SharedCategory[]> {
    const { data, error } = await supabaseAdmin
      .from('blog_categories')
      .select('category_id')
      .eq('blog_id', blogId);

    if (error || !data || data.length === 0) {
      return [];
    }

    const categoryIds = data.map((row) => row.category_id);

    const { data: categories, error: categoriesError } = await supabaseAdmin
      .from('categories')
      .select('*')
      .in('id', categoryIds);

    if (categoriesError || !categories) {
      return [];
    }

    return categories.map(mapCategoryRow);
  }

  /**
   * Create a new blog post
   */
  async createBlog(input: CreateBlogInput, authorId: string): Promise<Blog> {
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage, // Required
      status = 'draft',
      publishedAt,
      tags = [],
      categoryIds = [], // Many-to-many
    } = input;

    // Check if slug already exists
    const { data: existingBlog } = await supabaseAdmin
      .from('blogs')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existingBlog) {
      throw new ConflictError('Slug already exists', 'SLUG_EXISTS');
    }

    // Validate categories exist
    if (categoryIds.length > 0) {
      const { data: categories, error: categoriesError } = await supabaseAdmin
        .from('categories')
        .select('id')
        .in('id', categoryIds);

      if (categoriesError || !categories || categories.length !== categoryIds.length) {
        throw new NotFoundError('One or more categories not found', 'CATEGORY');
      }
    }

    // Create blog
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .insert({
        title,
        slug,
        excerpt,
        content, // Store as markdown
        featured_image: featuredImage, // Required
        status,
        published_at: publishedAt || (status === 'published' ? new Date().toISOString() : null),
        tags,
        author_id: authorId,
      })
      .select()
      .single();

    if (error || !data) {
      throw new Error('Failed to create blog post');
    }

    // Create blog_categories relationships
    if (categoryIds.length > 0) {
      const blogCategories = categoryIds.map((categoryId) => ({
        blog_id: data.id,
        category_id: categoryId,
      }));

      const { error: blogCategoriesError } = await supabaseAdmin
        .from('blog_categories')
        .insert(blogCategories);

      if (blogCategoriesError) {
        // Rollback: delete blog if categories insertion fails
        await supabaseAdmin.from('blogs').delete().eq('id', data.id);
        throw new Error('Failed to create blog categories');
      }
    }

    // Fetch categories
    const categories = await this.fetchBlogCategories(data.id);

    return mapBlogRow(data, categories);
  }

  /**
   * Get blog by ID
   */
  async getBlogById(id: string): Promise<Blog> {
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundError('Blog post not found', 'BLOG');
    }

    const categories = await this.fetchBlogCategories(id);
    return mapBlogRow(data, categories);
  }

  /**
   * Get blog by slug (public)
   */
  async getBlogBySlug(slug: string): Promise<Blog> {
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      throw new NotFoundError('Blog post not found', 'BLOG');
    }

    const categories = await this.fetchBlogCategories(data.id);
    return mapBlogRow(data, categories);
  }

  /**
   * List blogs with pagination
   */
  async listBlogs(query: ListBlogsQuery, userId?: string): Promise<{
    blogs: Blog[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { page = 1, limit = 10, search, status, categoryIds, tag } = query;
    const offset = (page - 1) * limit;

    let queryBuilder = supabaseAdmin
      .from('blogs')
      .select('*', { count: 'exact' });

    // If not admin, only show published blogs or own drafts
    if (!userId) {
      queryBuilder = queryBuilder.eq('status', 'published');
    } else {
      // Users can see their own drafts
      queryBuilder = queryBuilder.or(
        `status.eq.published,author_id.eq.${userId}`
      );
    }

    // Apply filters
    if (search) {
      queryBuilder = queryBuilder.or(
        `title.ilike.%${search}%,excerpt.ilike.%${search}%`
      );
    }

    if (status) {
      queryBuilder = queryBuilder.eq('status', status);
    }

    // Filter by categories (many-to-many)
    if (categoryIds && categoryIds.length > 0) {
      // Get blog IDs that have any of the specified categories
      const { data: blogCategories } = await supabaseAdmin
        .from('blog_categories')
        .select('blog_id')
        .in('category_id', categoryIds);

      if (blogCategories && blogCategories.length > 0) {
        const blogIds = [...new Set(blogCategories.map((bc) => bc.blog_id))];
        queryBuilder = queryBuilder.in('id', blogIds);
      } else {
        // No blogs match the categories, return empty result
        return {
          blogs: [],
          total: 0,
          page,
          limit,
        };
      }
    }

    if (tag) {
      queryBuilder = queryBuilder.contains('tags', [tag]);
    }

    // Apply pagination
    const { data, error, count } = await queryBuilder
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error('Failed to fetch blogs');
    }

    // Fetch categories for all blogs
    const blogs: Blog[] = await Promise.all(
      (data || []).map(async (blog) => {
        const categories = await this.fetchBlogCategories(blog.id);
        return mapBlogRow(blog, categories);
      })
    );

    return {
      blogs,
      total: count || 0,
      page,
      limit,
    };
  }

  /**
   * Update blog post
   */
  async updateBlog(id: string, input: UpdateBlogInput, userId: string, userRole: string): Promise<Blog> {
    // Check if user owns the blog or is admin
    const { data: existingBlog } = await supabaseAdmin
      .from('blogs')
      .select('author_id, published_at')
      .eq('id', id)
      .single();

    if (!existingBlog) {
      throw new NotFoundError('Blog post not found', 'BLOG');
    }

    if (existingBlog.author_id !== userId && userRole !== 'admin') {
      throw new ForbiddenError('Unauthorized to update this blog');
    }

    // Check slug uniqueness if updating
    if (input.slug) {
      const { data: slugCheck } = await supabaseAdmin
        .from('blogs')
        .select('id')
        .eq('slug', input.slug)
        .neq('id', id)
        .single();

      if (slugCheck) {
        throw new ConflictError('Slug already exists', 'SLUG_EXISTS');
      }
    }

    const updateData: Record<string, any> = {};

    if (input.title) updateData.title = input.title;
    if (input.slug) updateData.slug = input.slug;
    if (input.excerpt !== undefined) updateData.excerpt = input.excerpt;
    if (input.content) updateData.content = input.content;
    if (input.featuredImage !== undefined) updateData.featured_image = input.featuredImage;
    if (input.status) {
      updateData.status = input.status;
      // Auto-set published_at if publishing
      if (input.status === 'published' && !existingBlog.published_at) {
        updateData.published_at = new Date().toISOString();
      }
    }
    if (input.publishedAt) updateData.published_at = input.publishedAt;
    if (input.tags) updateData.tags = input.tags;

    const { data, error } = await supabaseAdmin
      .from('blogs')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      throw new Error('Failed to update blog post');
    }

    // Update blog_categories if categoryIds provided
    if (input.categoryIds !== undefined) {
      // Validate categories exist
      if (input.categoryIds.length > 0) {
        const { data: categories, error: categoriesError } = await supabaseAdmin
          .from('categories')
          .select('id')
          .in('id', input.categoryIds);

        if (categoriesError || !categories || categories.length !== input.categoryIds.length) {
          throw new NotFoundError('One or more categories not found', 'CATEGORY');
        }
      }

      // Delete existing blog_categories
      await supabaseAdmin.from('blog_categories').delete().eq('blog_id', id);

      // Insert new blog_categories
      if (input.categoryIds.length > 0) {
        const blogCategories = input.categoryIds.map((categoryId) => ({
          blog_id: id,
          category_id: categoryId,
        }));

        const { error: blogCategoriesError } = await supabaseAdmin
          .from('blog_categories')
          .insert(blogCategories);

        if (blogCategoriesError) {
          throw new Error('Failed to update blog categories');
        }
      }
    }

    // Fetch categories
    const categories = await this.fetchBlogCategories(id);

    return mapBlogRow(data, categories);
  }

  /**
   * Delete blog post
   */
  async deleteBlog(id: string, userId: string, userRole: string): Promise<void> {
    // Check if user owns the blog or is admin
    const { data: existingBlog } = await supabaseAdmin
      .from('blogs')
      .select('author_id')
      .eq('id', id)
      .single();

    if (!existingBlog) {
      throw new NotFoundError('Blog post not found', 'BLOG');
    }

    if (existingBlog.author_id !== userId && userRole !== 'admin') {
      throw new ForbiddenError('Unauthorized to delete this blog');
    }

    const { error } = await supabaseAdmin.from('blogs').delete().eq('id', id);

    if (error) {
      throw new Error('Failed to delete blog post');
    }
  }
}

