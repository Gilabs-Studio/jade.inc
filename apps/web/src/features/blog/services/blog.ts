/**
 * Blog service - handles blog API calls
 * Updated to use real API
 */

import { apiGet, apiGetPaginated } from '@/src/lib/api/client';
import type { Blog, BlogPost, BlogCategory } from '../types';

const API_PREFIX = '/api/v1/blogs';

export class BlogService {
  /**
   * List published blog posts (public)
   */
  static async listPosts(): Promise<BlogPost[]> {
    try {
      const response = await apiGetPaginated<Blog>(`${API_PREFIX}/public`, {
        page: 1,
        limit: 100,
      });

      // Transform API response to BlogPost format
      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data.map((blog) => ({
        id: blog.id,
        slug: blog.slug,
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        coverImage: blog.featuredImage || null,
        author: {
          name: 'Author', // TODO: Fetch author details
          avatar: null,
        },
        category: blog.categories && blog.categories.length > 0 
          ? blog.categories.map(c => c.name).join(', ') 
          : '', // Use first category name or empty string
        categories: blog.categories || [], // Store full categories array
        publishedAt: blog.publishedAt || blog.createdAt,
        readTime: Math.ceil(blog.content.split(' ').length / 200), // Estimate read time
      }));
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      return [];
    }
  }

  /**
   * List blog categories
   */
  static async listCategories(): Promise<{ id: string; name: string; slug: string; count: number }[]> {
    try {
      // apiGet already extracts data from response, so response is the array directly
      const categories = await apiGet<Array<BlogCategory>>('/api/v1/categories');

      console.log('Categories API response:', categories); // Debug log

      if (!categories || !Array.isArray(categories) || categories.length === 0) {
        console.warn('No categories found in API response:', categories);
        return [];
      }

      // Transform API response to BlogCategory format
      // Count will be calculated on the client side based on actual blog posts
      const mapped = categories.map((category: BlogCategory) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        count: 0, // Will be calculated in component based on actual posts
      }));

      console.log('Mapped categories:', mapped); // Debug log
      return mapped;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
      }
      return [];
    }
  }

  /**
   * Get blog post by slug
   */
  static async getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    try {
      const blog = await apiGet<Blog>(`${API_PREFIX}/public/${slug}`);
      
      return {
        id: blog.id,
        slug: blog.slug,
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        coverImage: blog.featuredImage || null,
        author: {
          name: 'Author', // TODO: Fetch author details
          avatar: null,
        },
        category: blog.categories && blog.categories.length > 0 
          ? blog.categories.map(c => c.name).join(', ') 
          : '',
        categories: blog.categories || [],
        publishedAt: blog.publishedAt || blog.createdAt,
        readTime: Math.ceil(blog.content.split(' ').length / 200),
      };
    } catch (error) {
      console.error('Failed to fetch blog post:', error);
      return undefined;
    }
  }

  /**
   * Get featured blog posts
   */
  static async featured(): Promise<BlogPost[]> {
    const posts = await this.listPosts();
    return posts.slice(0, 2);
  }
}
