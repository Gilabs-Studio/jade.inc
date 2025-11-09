-- Categories and Blog Categories Migration
-- Adds categories table and many-to-many relationship between blogs and categories
-- Also makes featured_image required for blogs

-- ============================================================================
-- CATEGORIES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT, -- Optional color for UI
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- BLOG_CATEGORIES JUNCTION TABLE (Many-to-Many)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.blog_categories (
  blog_id UUID NOT NULL REFERENCES public.blogs(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (blog_id, category_id)
);

-- ============================================================================
-- UPDATE BLOGS TABLE
-- ============================================================================

-- Make featured_image required (NOT NULL)
-- First, update existing blogs without featured_image to have a placeholder
UPDATE public.blogs 
SET featured_image = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=60'
WHERE featured_image IS NULL;

-- Now make it NOT NULL
ALTER TABLE public.blogs 
  ALTER COLUMN featured_image SET NOT NULL;

-- Remove category_id column (replaced by many-to-many relationship)
ALTER TABLE public.blogs 
  DROP COLUMN IF EXISTS category_id;

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Categories indexes
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_name ON public.categories(name);

-- Blog categories junction table indexes
CREATE INDEX IF NOT EXISTS idx_blog_categories_blog_id ON public.blog_categories(blog_id);
CREATE INDEX IF NOT EXISTS idx_blog_categories_category_id ON public.blog_categories(category_id);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Auto-update updated_at for categories
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

-- Enable RLS on categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Anyone can read categories
DROP POLICY IF EXISTS "Anyone can read categories" ON public.categories;
CREATE POLICY "Anyone can read categories" ON public.categories FOR SELECT USING (true);

-- Authors, editors, and admins can insert categories
DROP POLICY IF EXISTS "Authors can insert categories" ON public.categories;
CREATE POLICY "Authors can insert categories" ON public.categories FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'editor', 'author'))
);

-- Editors and admins can update categories
DROP POLICY IF EXISTS "Editors and admins can update categories" ON public.categories;
CREATE POLICY "Editors and admins can update categories" ON public.categories FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Admins can delete categories
DROP POLICY IF EXISTS "Admins can delete categories" ON public.categories;
CREATE POLICY "Admins can delete categories" ON public.categories FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- Enable RLS on blog_categories
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- Anyone can read blog_categories
DROP POLICY IF EXISTS "Anyone can read blog_categories" ON public.blog_categories;
CREATE POLICY "Anyone can read blog_categories" ON public.blog_categories FOR SELECT USING (true);

-- Authors can manage blog_categories for their own blogs
DROP POLICY IF EXISTS "Authors can manage blog_categories for own blogs" ON public.blog_categories;
CREATE POLICY "Authors can manage blog_categories for own blogs" ON public.blog_categories 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.blogs 
      WHERE id = blog_categories.blog_id 
      AND author_id = auth.uid()
    )
  );

-- Editors and admins can manage all blog_categories
DROP POLICY IF EXISTS "Editors and admins can manage all blog_categories" ON public.blog_categories;
CREATE POLICY "Editors and admins can manage all blog_categories" ON public.blog_categories 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

