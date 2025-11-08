/**
 * Shared database types
 * Export database schema types and domain types
 */

export * from './schema.js';

// Re-export enums for convenience
export type { UserRole, ContentStatus, ContentType } from './schema.js';

// ============================================================================
// DOMAIN TYPES (camelCase for API usage)
// ============================================================================

import type { UserRole, ContentStatus, ContentType } from './schema.js';

/**
 * User domain type (camelCase)
 */
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Blog domain type (camelCase)
 */
export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string; // Markdown
  featuredImage: string | null;
  status: ContentStatus;
  publishedAt: string | null;
  tags: string[];
  categoryId: string | null;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Content domain type (camelCase)
 */
export interface Content {
  id: string;
  title: string;
  slug: string;
  type: ContentType;
  content: string; // Markdown
  excerpt: string | null;
  featuredImage: string | null;
  status: ContentStatus;
  publishedAt: string | null;
  metadata: Record<string, any> | null;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}
