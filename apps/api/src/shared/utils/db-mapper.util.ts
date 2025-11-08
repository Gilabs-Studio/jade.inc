/**
 * Database Mapper Utilities
 * Maps database types (snake_case) to domain types (camelCase)
 */

import type { User, Blog, Content } from '@packages/shared-types';

/**
 * Map database user row to domain User type
 */
export function mapUserRow(row: {
  id: string;
  email: string;
  full_name: string;
  role: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}): User {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    role: row.role as User['role'],
    avatarUrl: row.avatar_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Map database blog row to domain Blog type
 */
export function mapBlogRow(row: {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  status: string;
  published_at: string | null;
  tags: string[];
  category_id: string | null;
  author_id: string;
  created_at: string;
  updated_at: string;
}): Blog {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    featuredImage: row.featured_image,
    status: row.status as Blog['status'],
    publishedAt: row.published_at,
    tags: row.tags || [],
    categoryId: row.category_id,
    authorId: row.author_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Map database content row to domain Content type
 */
export function mapContentRow(row: {
  id: string;
  title: string;
  slug: string;
  type: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  status: string;
  published_at: string | null;
  metadata: Record<string, any> | null;
  author_id: string;
  created_at: string;
  updated_at: string;
}): Content {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    type: row.type as Content['type'],
    content: row.content,
    excerpt: row.excerpt,
    featuredImage: row.featured_image,
    status: row.status as Content['status'],
    publishedAt: row.published_at,
    metadata: row.metadata || {},
    authorId: row.author_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

