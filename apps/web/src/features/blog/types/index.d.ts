/**
 * Blog feature types
 * Updated to match API response
 */

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  color?: string | null;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  tags?: string[];
  categories?: BlogCategory[]; // Many-to-many relationship
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  author: {
    name: string;
    avatar: string | null;
  };
  category: string; // For backward compatibility (comma-separated category names)
  categories?: BlogCategory[]; // Full categories array from API
  publishedAt: string; // ISO
  readTime: number; // minutes
}

// BlogCategory for list display (with count)
export interface BlogCategoryWithCount {
  id: string;
  name: string;
  slug: string;
  count: number;
}
