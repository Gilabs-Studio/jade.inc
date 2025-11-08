-- Initial Database Schema Migration (All-in-one)
-- This is a consolidated migration file for easy setup
-- For production, use the separated migration files (00001-00006)

-- ============================================================================
-- EXTENSIONS
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLES
-- ============================================================================

-- Users table
-- NOTE: Password is NOT stored here. Password is stored securely in auth.users
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer' 
    CHECK (role IN ('admin', 'editor', 'author', 'viewer')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  status TEXT NOT NULL DEFAULT 'draft' 
    CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  tags TEXT[] DEFAULT '{}',
  category_id UUID,
  author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Content table
CREATE TABLE IF NOT EXISTS public.content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'page' 
    CHECK (type IN ('page', 'post', 'custom')),
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  status TEXT NOT NULL DEFAULT 'draft' 
    CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(slug, type)
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON public.users(created_at DESC);

-- Blogs indexes
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON public.blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_author_id ON public.blogs(author_id);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON public.blogs(published_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_blogs_tags ON public.blogs USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_blogs_status_published_at 
  ON public.blogs(status, published_at DESC NULLS LAST) 
  WHERE status = 'published';

-- Content indexes
CREATE INDEX IF NOT EXISTS idx_content_slug ON public.content(slug);
CREATE INDEX IF NOT EXISTS idx_content_type ON public.content(type);
CREATE INDEX IF NOT EXISTS idx_content_status ON public.content(status);
CREATE INDEX IF NOT EXISTS idx_content_author_id ON public.content(author_id);
CREATE INDEX IF NOT EXISTS idx_content_published_at ON public.content(published_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_content_type_status ON public.content(type, status);
CREATE INDEX IF NOT EXISTS idx_content_status_published_at 
  ON public.content(status, published_at DESC NULLS LAST) 
  WHERE status = 'published';
CREATE UNIQUE INDEX IF NOT EXISTS idx_content_slug_type ON public.content(slug, type);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_blogs_updated_at ON public.blogs;
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_content_updated_at ON public.content;
CREATE TRIGGER update_content_updated_at
  BEFORE UPDATE ON public.content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

-- Users policies
DROP POLICY IF EXISTS "Users can read own profile" ON public.users;
CREATE POLICY "Users can read own profile" ON public.users FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "Admins can read all users" ON public.users;
CREATE POLICY "Admins can read all users" ON public.users FOR SELECT USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
CREATE POLICY "Admins can update all users" ON public.users FOR UPDATE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- Blogs policies
DROP POLICY IF EXISTS "Anyone can read published blogs" ON public.blogs;
CREATE POLICY "Anyone can read published blogs" ON public.blogs FOR SELECT USING (status = 'published');
DROP POLICY IF EXISTS "Authors can read own blogs" ON public.blogs;
CREATE POLICY "Authors can read own blogs" ON public.blogs FOR SELECT USING (auth.uid() = author_id);
DROP POLICY IF EXISTS "Editors and admins can read all blogs" ON public.blogs;
CREATE POLICY "Editors and admins can read all blogs" ON public.blogs FOR SELECT USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'editor')));
DROP POLICY IF EXISTS "Authors can insert own blogs" ON public.blogs;
CREATE POLICY "Authors can insert own blogs" ON public.blogs FOR INSERT WITH CHECK (auth.uid() = author_id);
DROP POLICY IF EXISTS "Authors can update own blogs" ON public.blogs;
CREATE POLICY "Authors can update own blogs" ON public.blogs FOR UPDATE USING (auth.uid() = author_id) WITH CHECK (auth.uid() = author_id);
DROP POLICY IF EXISTS "Editors and admins can update any blog" ON public.blogs;
CREATE POLICY "Editors and admins can update any blog" ON public.blogs FOR UPDATE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'editor')));
DROP POLICY IF EXISTS "Authors can delete own blogs" ON public.blogs;
CREATE POLICY "Authors can delete own blogs" ON public.blogs FOR DELETE USING (auth.uid() = author_id);
DROP POLICY IF EXISTS "Admins can delete any blog" ON public.blogs;
CREATE POLICY "Admins can delete any blog" ON public.blogs FOR DELETE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- Content policies
DROP POLICY IF EXISTS "Anyone can read published content" ON public.content;
CREATE POLICY "Anyone can read published content" ON public.content FOR SELECT USING (status = 'published');
DROP POLICY IF EXISTS "Authors can read own content" ON public.content;
CREATE POLICY "Authors can read own content" ON public.content FOR SELECT USING (auth.uid() = author_id);
DROP POLICY IF EXISTS "Editors and admins can read all content" ON public.content;
CREATE POLICY "Editors and admins can read all content" ON public.content FOR SELECT USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'editor')));
DROP POLICY IF EXISTS "Authors can insert own content" ON public.content;
CREATE POLICY "Authors can insert own content" ON public.content FOR INSERT WITH CHECK (auth.uid() = author_id);
DROP POLICY IF EXISTS "Authors can update own content" ON public.content;
CREATE POLICY "Authors can update own content" ON public.content FOR UPDATE USING (auth.uid() = author_id) WITH CHECK (auth.uid() = author_id);
DROP POLICY IF EXISTS "Editors and admins can update any content" ON public.content;
CREATE POLICY "Editors and admins can update any content" ON public.content FOR UPDATE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'editor')));
DROP POLICY IF EXISTS "Authors can delete own content" ON public.content;
CREATE POLICY "Authors can delete own content" ON public.content FOR DELETE USING (auth.uid() = author_id);
DROP POLICY IF EXISTS "Admins can delete any content" ON public.content;
CREATE POLICY "Admins can delete any content" ON public.content FOR DELETE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));
