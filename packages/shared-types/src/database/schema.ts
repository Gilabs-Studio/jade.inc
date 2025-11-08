/**
 * Database Schema Types
 * Type definitions matching the Supabase database schema
 */

// ============================================================================
// ENUMS
// ============================================================================

export type UserRole = 'admin' | 'editor' | 'author' | 'viewer';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type ContentType = 'page' | 'post' | 'custom';

// ============================================================================
// DATABASE TABLES (snake_case as in database)
// ============================================================================

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: UserRole;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: UserRole;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: UserRole;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      blogs: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          featured_image: string | null;
          status: ContentStatus;
          published_at: string | null;
          tags: string[];
          category_id: string | null;
          author_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content: string;
          featured_image?: string | null;
          status?: ContentStatus;
          published_at?: string | null;
          tags?: string[];
          category_id?: string | null;
          author_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string;
          featured_image?: string | null;
          status?: ContentStatus;
          published_at?: string | null;
          tags?: string[];
          category_id?: string | null;
          author_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      content: {
        Row: {
          id: string;
          title: string;
          slug: string;
          type: ContentType;
          content: string;
          excerpt: string | null;
          featured_image: string | null;
          status: ContentStatus;
          published_at: string | null;
          metadata: Record<string, any>;
          author_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          type?: ContentType;
          content: string;
          excerpt?: string | null;
          featured_image?: string | null;
          status?: ContentStatus;
          published_at?: string | null;
          metadata?: Record<string, any>;
          author_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          type?: ContentType;
          content?: string;
          excerpt?: string | null;
          featured_image?: string | null;
          status?: ContentStatus;
          published_at?: string | null;
          metadata?: Record<string, any>;
          author_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

