/**
 * Shared constants
 */

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    BASE: '/users',
    BY_ID: (id: string) => `/users/${id}`,
  },
  BLOGS: {
    BASE: '/blogs',
    BY_ID: (id: string) => `/blogs/${id}`,
    BY_SLUG: (slug: string) => `/blogs/public/${slug}`,
  },
  CONTENT: {
    BASE: '/content',
    BY_ID: (id: string) => `/content/${id}`,
    BY_SLUG: (slug: string) => `/content/public/${slug}`,
  },
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  AUTHOR: 'author',
  VIEWER: 'viewer',
} as const;

export const CONTENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

export const CONTENT_TYPES = {
  PAGE: 'page',
  POST: 'post',
  CUSTOM: 'custom',
} as const;

