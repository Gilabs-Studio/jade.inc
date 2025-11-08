import { z } from 'zod';

/**
 * Content Management module types
 * For managing CMS content with markdown support
 */

export const createContentSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    type: z.enum(['page', 'post', 'custom']).default('page'),
    content: z.string().min(1, 'Content is required'), // Markdown content
    excerpt: z.string().optional(),
    featuredImage: z.string().url().optional(),
    status: z.enum(['draft', 'published', 'archived']).default('draft'),
    publishedAt: z.string().datetime().optional(),
    metadata: z.record(z.any()).optional(), // Additional metadata as JSON
  }),
});

export const updateContentSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid content ID'),
  }),
  body: z.object({
    title: z.string().min(1).optional(),
    slug: z.string().min(1).optional(),
    type: z.enum(['page', 'post', 'custom']).optional(),
    content: z.string().min(1).optional(),
    excerpt: z.string().optional(),
    featuredImage: z.string().url().optional(),
    status: z.enum(['draft', 'published', 'archived']).optional(),
    publishedAt: z.string().datetime().optional(),
    metadata: z.record(z.any()).optional(),
  }),
});

export const getContentSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid content ID'),
  }),
});

export const getContentBySlugSchema = z.object({
  params: z.object({
    slug: z.string().min(1, 'Slug is required'),
  }),
});

export const listContentSchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    search: z.string().optional(),
    type: z.enum(['page', 'post', 'custom']).optional(),
    status: z.enum(['draft', 'published', 'archived']).optional(),
  }),
});

export const deleteContentSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid content ID'),
  }),
});

export type CreateContentInput = z.infer<typeof createContentSchema>['body'];
export type UpdateContentInput = z.infer<typeof updateContentSchema>['body'];
export type ListContentQuery = z.infer<typeof listContentSchema>['query'];

export interface Content {
  id: string;
  title: string;
  slug: string;
  type: 'page' | 'post' | 'custom';
  content: string; // Markdown content
  excerpt: string | null;
  featuredImage: string | null;
  status: 'draft' | 'published' | 'archived';
  publishedAt: string | null;
  metadata: Record<string, any> | null;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

