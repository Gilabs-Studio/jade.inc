import { z } from 'zod';

/**
 * Blog module types
 */

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    excerpt: z.string().optional(),
    content: z.string().min(1, 'Content is required'), // Markdown content
    featuredImage: z.string().url('Featured image must be a valid URL'), // Required
    status: z.enum(['draft', 'published', 'archived']).default('draft'),
    publishedAt: z.string().datetime().optional(),
    tags: z.array(z.string()).optional(),
    categoryIds: z.array(z.string().uuid()).min(1, 'At least one category is required'), // Many-to-many
  }),
});

export const updateBlogSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid blog ID'),
  }),
  body: z.object({
    title: z.string().min(1).optional(),
    slug: z.string().min(1).optional(),
    excerpt: z.string().optional(),
    content: z.string().min(1).optional(),
    featuredImage: z.string().url().optional(),
    status: z.enum(['draft', 'published', 'archived']).optional(),
    publishedAt: z.string().datetime().optional(),
    tags: z.array(z.string()).optional(),
    categoryIds: z.array(z.string().uuid()).optional(), // Many-to-many
  }),
});

export const getBlogSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid blog ID'),
  }),
});

export const getBlogBySlugSchema = z.object({
  params: z.object({
    slug: z.string().min(1, 'Slug is required'),
  }),
});

export const listBlogsSchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    search: z.string().optional(),
    status: z.enum(['draft', 'published', 'archived']).optional(),
    categoryIds: z
      .union([z.string().uuid(), z.array(z.string().uuid())])
      .optional()
      .transform((val) => {
        if (!val) return undefined;
        return Array.isArray(val) ? val : [val];
      }),
    tag: z.string().optional(),
  }),
});

export const deleteBlogSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid blog ID'),
  }),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>['body'];
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>['body'];
export type ListBlogsQuery = z.infer<typeof listBlogsSchema>['query'];

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string; // Markdown content
  featuredImage: string; // Required
  status: 'draft' | 'published' | 'archived';
  publishedAt: string | null;
  tags: string[];
  categories: Category[]; // Many-to-many relationship
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

