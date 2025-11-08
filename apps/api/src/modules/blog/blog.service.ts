import { supabaseAdmin } from '../../config/supabase.js';
import { mapBlogRow } from '../../shared/utils/db-mapper.util.js';
import { NotFoundError, ConflictError, ForbiddenError } from '../../shared/errors/app-error.js';
import type { CreateBlogInput, UpdateBlogInput, ListBlogsQuery, Blog } from './blog.types.js';

/**
 * Blog service - handles blog management logic
 */
export class BlogService {
  /**
   * Create a new blog post
   */
  async createBlog(input: CreateBlogInput, authorId: string): Promise<Blog> {
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      status = 'draft',
      publishedAt,
      tags = [],
      categoryId,
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

    const { data, error } = await supabaseAdmin
      .from('blogs')
      .insert({
        title,
        slug,
        excerpt,
        content, // Store as markdown
        featured_image: featuredImage,
        status,
        published_at: publishedAt || (status === 'published' ? new Date().toISOString() : null),
        tags,
        category_id: categoryId,
        author_id: authorId,
      })
      .select()
      .single();

    if (error || !data) {
      throw new Error('Failed to create blog post');
    }

    return mapBlogRow(data);
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

    return mapBlogRow(data);
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

    return mapBlogRow(data);
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
    const { page = 1, limit = 10, search, status, categoryId, tag } = query;
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

    if (categoryId) {
      queryBuilder = queryBuilder.eq('category_id', categoryId);
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

    const blogs: Blog[] = (data || []).map(mapBlogRow);

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
    if (input.categoryId !== undefined) updateData.category_id = input.categoryId;

    const { data, error } = await supabaseAdmin
      .from('blogs')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      throw new Error('Failed to update blog post');
    }

    return mapBlogRow(data);
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

