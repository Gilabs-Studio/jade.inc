/**
 * Admin service - handles admin API calls
 */

import { apiGet, apiPost, apiPatch, apiDelete, apiGetPaginated } from '@/src/lib/api/client';
import type { User } from '@/src/features/auth/types';
import type { Blog } from '@/src/features/blog/types';
import type {
  BlogCreateInput,
  BlogUpdateInput,
  ContentCreateInput,
  ContentUpdateInput,
  Content,
  UserCreateInput,
  UserUpdateInput,
} from '../types';

const API_PREFIX = '/api/v1';

export class AdminService {
  /**
   * Get dashboard statistics
   */
  static async getDashboardStats(): Promise<{
    totalUsers: number;
    totalBlogs: number;
    totalContent: number;
    publishedBlogs: number;
  }> {
    const [users, blogs, content] = await Promise.all([
      apiGetPaginated<User>(`${API_PREFIX}/users`, { page: 1, limit: 1 }),
      apiGetPaginated<Blog>(`${API_PREFIX}/blogs`, { page: 1, limit: 1 }),
      apiGetPaginated<Content>(`${API_PREFIX}/content`, { page: 1, limit: 1 }),
    ]);

    // Get published blogs count
    const publishedBlogs = await apiGetPaginated<Blog>(`${API_PREFIX}/blogs`, {
      page: 1,
      limit: 1,
      status: 'published',
    });

    return {
      totalUsers: users.meta?.total || 0,
      totalBlogs: blogs.meta?.total || 0,
      totalContent: content.meta?.total || 0,
      publishedBlogs: publishedBlogs.meta?.total || 0,
    };
  }

  // ========== Users ==========
  /**
   * Get all users (admin only)
   */
  static async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{ data: User[]; meta: any }> {
    return apiGetPaginated<User>(`${API_PREFIX}/users`, params);
  }

  /**
   * Get user by ID
   */
  static async getUserById(id: string): Promise<User> {
    return apiGet<User>(`${API_PREFIX}/users/${id}`);
  }

  /**
   * Create new user
   */
  static async createUser(input: UserCreateInput): Promise<User> {
    return apiPost<User>(`${API_PREFIX}/users`, input);
  }

  /**
   * Update user
   */
  static async updateUser(input: UserUpdateInput): Promise<User> {
    const { id, ...data } = input;
    return apiPatch<User>(`${API_PREFIX}/users/${id}`, data);
  }

  /**
   * Delete user
   */
  static async deleteUser(id: string): Promise<void> {
    return apiDelete<void>(`${API_PREFIX}/users/${id}`);
  }

  // ========== Blogs ==========
  /**
   * Get all blogs
   */
  static async getBlogs(params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<{ data: Blog[]; meta: any }> {
    return apiGetPaginated<Blog>(`${API_PREFIX}/blogs`, params);
  }

  /**
   * Get blog by ID
   */
  static async getBlogById(id: string): Promise<Blog> {
    return apiGet<Blog>(`${API_PREFIX}/blogs/${id}`);
  }

  /**
   * Create new blog
   */
  static async createBlog(input: BlogCreateInput): Promise<Blog> {
    return apiPost<Blog>(`${API_PREFIX}/blogs`, input);
  }

  /**
   * Update blog
   */
  static async updateBlog(input: BlogUpdateInput): Promise<Blog> {
    const { id, ...data } = input;
    return apiPatch<Blog>(`${API_PREFIX}/blogs/${id}`, data);
  }

  /**
   * Delete blog
   */
  static async deleteBlog(id: string): Promise<void> {
    return apiDelete<void>(`${API_PREFIX}/blogs/${id}`);
  }

  // ========== Content ==========
  /**
   * Get all content
   */
  static async getContent(params?: {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
    search?: string;
  }): Promise<{ data: Content[]; meta: any }> {
    return apiGetPaginated<Content>(`${API_PREFIX}/content`, params);
  }

  /**
   * Get content by ID
   */
  static async getContentById(id: string): Promise<Content> {
    return apiGet<Content>(`${API_PREFIX}/content/${id}`);
  }

  /**
   * Create new content
   */
  static async createContent(input: ContentCreateInput): Promise<Content> {
    return apiPost<Content>(`${API_PREFIX}/content`, input);
  }

  /**
   * Update content
   */
  static async updateContent(input: ContentUpdateInput): Promise<Content> {
    const { id, ...data } = input;
    return apiPatch<Content>(`${API_PREFIX}/content/${id}`, data);
  }

  /**
   * Delete content
   */
  static async deleteContent(id: string): Promise<void> {
    return apiDelete<void>(`${API_PREFIX}/content/${id}`);
  }

  // ========== Categories ==========
  /**
   * Get all categories
   */
  static async getCategories(): Promise<Array<{ id: string; name: string; slug: string; description?: string | null; color?: string | null }>> {
    return apiGet<Array<{ id: string; name: string; slug: string; description?: string | null; color?: string | null }>>(`${API_PREFIX}/categories`);
  }

  /**
   * Get category by ID
   */
  static async getCategoryById(id: string): Promise<{ id: string; name: string; slug: string; description?: string | null; color?: string | null }> {
    return apiGet<{ id: string; name: string; slug: string; description?: string | null; color?: string | null }>(`${API_PREFIX}/categories/${id}`);
  }

  /**
   * Create new category
   */
  static async createCategory(input: { name: string; slug: string; description?: string; color?: string }): Promise<{ id: string; name: string; slug: string; description?: string | null; color?: string | null }> {
    return apiPost<{ id: string; name: string; slug: string; description?: string | null; color?: string | null }>(`${API_PREFIX}/categories`, input);
  }

  /**
   * Update category
   */
  static async updateCategory(id: string, input: { name?: string; slug?: string; description?: string; color?: string }): Promise<{ id: string; name: string; slug: string; description?: string | null; color?: string | null }> {
    return apiPatch<{ id: string; name: string; slug: string; description?: string | null; color?: string | null }>(`${API_PREFIX}/categories/${id}`, input);
  }

  /**
   * Delete category
   */
  static async deleteCategory(id: string): Promise<void> {
    return apiDelete<void>(`${API_PREFIX}/categories/${id}`);
  }

  // ========== Upload ==========
  /**
   * Upload image
   */
  static async uploadImage(file: File): Promise<{ url: string; path: string; fileName: string }> {
    const { apiUploadFile } = await import('@/src/lib/api/client');
    return apiUploadFile<{ url: string; path: string; fileName: string }>(
      `${API_PREFIX}/upload/image`,
      file,
      'image'
    );
  }
}

