import { supabaseAdmin } from '../../config/supabase.js';
import { mapContentRow } from '../../shared/utils/db-mapper.util.js';
import { NotFoundError, ConflictError, ForbiddenError } from '../../shared/errors/app-error.js';
import type { CreateContentInput, UpdateContentInput, ListContentQuery, Content } from './content.types.js';

/**
 * Content service - handles CMS content management with markdown support
 */
export class ContentService {
  /**
   * Create new content
   */
  async createContent(input: CreateContentInput, authorId: string): Promise<Content> {
    const {
      title,
      slug,
      type = 'page',
      content,
      excerpt,
      featuredImage,
      status = 'draft',
      publishedAt,
      metadata,
    } = input;

    // Check if slug already exists for this type
    const { data: existingContent } = await supabaseAdmin
      .from('content')
      .select('id')
      .eq('slug', slug)
      .eq('type', type)
      .single();

    if (existingContent) {
      throw new ConflictError('Slug already exists for this content type', 'SLUG_EXISTS');
    }

    const { data, error } = await supabaseAdmin
      .from('content')
      .insert({
        title,
        slug,
        type,
        content, // Store as markdown
        excerpt,
        featured_image: featuredImage,
        status,
        published_at: publishedAt || (status === 'published' ? new Date().toISOString() : null),
        metadata: metadata || {},
        author_id: authorId,
      })
      .select()
      .single();

    if (error || !data) {
      throw new Error('Failed to create content');
    }

    return mapContentRow(data);
  }

  /**
   * Get content by ID
   */
  async getContentById(id: string): Promise<Content> {
    const { data, error } = await supabaseAdmin
      .from('content')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundError('Content not found', 'CONTENT');
    }

    return mapContentRow(data);
  }

  /**
   * Get content by slug (public)
   */
  async getContentBySlug(slug: string, type?: string): Promise<Content> {
    let queryBuilder = supabaseAdmin
      .from('content')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published');

    if (type) {
      queryBuilder = queryBuilder.eq('type', type);
    }

    const { data, error } = await queryBuilder.single();

    if (error || !data) {
      throw new NotFoundError('Content not found', 'CONTENT');
    }

    return mapContentRow(data);
  }

  /**
   * List content with pagination
   */
  async listContent(query: ListContentQuery, userId?: string): Promise<{
    content: Content[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { page = 1, limit = 10, search, type, status } = query;
    const offset = (page - 1) * limit;

    let queryBuilder = supabaseAdmin
      .from('content')
      .select('*', { count: 'exact' });

    // If not authenticated, only show published content
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

    if (type) {
      queryBuilder = queryBuilder.eq('type', type);
    }

    if (status) {
      queryBuilder = queryBuilder.eq('status', status);
    }

    // Apply pagination
    const { data, error, count } = await queryBuilder
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error('Failed to fetch content');
    }

    const content: Content[] = (data || []).map(mapContentRow);

    return {
      content,
      total: count || 0,
      page,
      limit,
    };
  }

  /**
   * Update content
   */
  async updateContent(
    id: string,
    input: UpdateContentInput,
    userId: string,
    userRole: string
  ): Promise<Content> {
    // Check if user owns the content or is admin
    const { data: existingContent } = await supabaseAdmin
      .from('content')
      .select('author_id, published_at')
      .eq('id', id)
      .single();

    if (!existingContent) {
      throw new NotFoundError('Content not found', 'CONTENT');
    }

    if (existingContent.author_id !== userId && userRole !== 'admin') {
      throw new ForbiddenError('Unauthorized to update this content');
    }

    // Check slug uniqueness if updating
    if (input.slug) {
      const { data: slugCheck } = await supabaseAdmin
        .from('content')
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
    if (input.type) updateData.type = input.type;
    if (input.content) updateData.content = input.content;
    if (input.excerpt !== undefined) updateData.excerpt = input.excerpt;
    if (input.featuredImage !== undefined) updateData.featured_image = input.featuredImage;
    if (input.status) {
      updateData.status = input.status;
      // Auto-set published_at if publishing
      if (input.status === 'published' && !existingContent.published_at) {
        updateData.published_at = new Date().toISOString();
      }
    }
    if (input.publishedAt) updateData.published_at = input.publishedAt;
    if (input.metadata !== undefined) updateData.metadata = input.metadata;

    const { data, error } = await supabaseAdmin
      .from('content')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      throw new Error('Failed to update content');
    }

    return mapContentRow(data);
  }

  /**
   * Delete content
   */
  async deleteContent(id: string, userId: string, userRole: string): Promise<void> {
    // Check if user owns the content or is admin
    const { data: existingContent } = await supabaseAdmin
      .from('content')
      .select('author_id')
      .eq('id', id)
      .single();

    if (!existingContent) {
      throw new NotFoundError('Content not found', 'CONTENT');
    }

    if (existingContent.author_id !== userId && userRole !== 'admin') {
      throw new ForbiddenError('Unauthorized to delete this content');
    }

    const { error } = await supabaseAdmin.from('content').delete().eq('id', id);

    if (error) {
      throw new Error('Failed to delete content');
    }
  }
}

