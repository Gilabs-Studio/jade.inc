/**
 * Admin feature types
 */

export interface DashboardStats {
  totalUsers: number;
  totalBlogs: number;
  totalContent: number;
  publishedBlogs: number;
}

// Blog Admin Types
export interface BlogCreateInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  tags?: string[];
  categoryIds?: string[];
}

export interface BlogUpdateInput extends Partial<BlogCreateInput> {
  id: string;
}

// Content Admin Types
export interface ContentCreateInput {
  title: string;
  slug: string;
  type: 'page' | 'post' | 'custom';
  content: string;
  excerpt?: string;
  featuredImage?: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  metadata?: Record<string, any>;
}

export interface ContentUpdateInput extends Partial<ContentCreateInput> {
  id: string;
}

export interface Content {
  id: string;
  title: string;
  slug: string;
  type: 'page' | 'post' | 'custom';
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  status: 'draft' | 'published' | 'archived';
  publishedAt: string | null;
  metadata: Record<string, any> | null;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

// User Admin Types
export interface UserCreateInput {
  email: string;
  password: string;
  fullName: string;
  role: 'admin' | 'editor' | 'author' | 'viewer';
}

export interface UserUpdateInput {
  id: string;
  email?: string;
  fullName?: string;
  role?: 'admin' | 'editor' | 'author' | 'viewer';
}

