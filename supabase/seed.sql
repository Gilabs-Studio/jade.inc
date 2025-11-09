-- ============================================================================
-- SEED DATA FOR SUPABASE
-- ============================================================================
-- This file contains seed data for development and testing
-- Run this after migrations are complete
--
-- Usage:
--   supabase db reset (will run migrations + seed.sql)
--   OR manually: psql -f supabase/seed.sql
-- ============================================================================

-- ============================================================================
-- CATEGORIES
-- ============================================================================

-- Insert sample categories
INSERT INTO public.categories (id, name, slug, description, color) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Technology', 'technology', 'Articles about technology, programming, and software development', '#3B82F6'),
  ('00000000-0000-0000-0000-000000000002', 'Design', 'design', 'UI/UX design, graphic design, and creative work', '#8B5CF6'),
  ('00000000-0000-0000-0000-000000000003', 'Business', 'business', 'Business strategies, entrepreneurship, and management', '#10B981'),
  ('00000000-0000-0000-0000-000000000004', 'Lifestyle', 'lifestyle', 'Personal development, health, and lifestyle tips', '#F59E0B'),
  ('00000000-0000-0000-0000-000000000005', 'Tutorial', 'tutorial', 'Step-by-step guides and tutorials', '#EF4444'),
  ('00000000-0000-0000-0000-000000000006', 'News', 'news', 'Latest news and updates', '#06B6D4')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- BLOGS (with featured images and categories)
-- ============================================================================

-- Note: These blogs require an existing user (author_id)
-- The author_id should match an existing user in auth.users and public.users
-- For development, you can use the admin user created via Supabase Auth
-- If no user exists, the blog insertions will be skipped

-- Check if admin user exists, if not, create a placeholder
DO $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Try to get admin user
  SELECT id INTO admin_user_id FROM public.users WHERE email = 'admin@example.com' LIMIT 1;
  
  -- If no admin user exists, create a note
  IF admin_user_id IS NULL THEN
    RAISE NOTICE 'WARNING: No admin user found with email admin@example.com';
    RAISE NOTICE 'Please create an admin user first via Supabase Auth or API';
    RAISE NOTICE 'Blog seed data will be skipped.';
    RETURN;
  END IF;
  
  -- Sample Blog 1: Getting Started with Next.js 16
  INSERT INTO public.blogs (
  id,
  title,
  slug,
  excerpt,
  content,
  featured_image,
  status,
  published_at,
  tags,
  author_id
) VALUES (
  '10000000-0000-0000-0000-000000000001',
  'Getting Started with Next.js 16: A Complete Guide',
  'getting-started-with-nextjs-16',
  'Learn how to build modern web applications with Next.js 16, including App Router, Server Components, and the latest features.',
  '# Introduction to Next.js 16

Next.js 16 brings exciting new features and improvements that make building React applications even more powerful and efficient.

## What''s New in Next.js 16

- **App Router**: The new routing system provides better performance and developer experience
- **Server Components**: Build faster applications with server-side rendering
- **Improved Caching**: Better caching strategies for optimal performance
- **TypeScript Support**: Enhanced TypeScript support out of the box

## Getting Started

To create a new Next.js 16 project, run:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

## Key Features

- Server Components by default
- Improved data fetching
- Better error handling
- Enhanced developer tools

## Conclusion

Next.js 16 is a significant step forward for React development. Start building today!',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=80',
  'published',
  NOW() - INTERVAL '5 days',
  ARRAY['nextjs', 'react', 'javascript', 'web-development'],
  admin_user_id
)
ON CONFLICT (id) DO NOTHING;

  -- Link Blog 1 to Categories (Technology, Tutorial)
  INSERT INTO public.blog_categories (blog_id, category_id) VALUES
    ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'), -- Technology
    ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000005')  -- Tutorial
  ON CONFLICT (blog_id, category_id) DO NOTHING;

  -- Sample Blog 2: Modern UI Design Principles
  INSERT INTO public.blogs (
  id,
  title,
  slug,
  excerpt,
  content,
  featured_image,
  status,
  published_at,
  tags,
  author_id
) VALUES (
  '10000000-0000-0000-0000-000000000002',
  'Modern UI Design Principles for 2024',
  'modern-ui-design-principles-2024',
  'Discover the latest UI design principles and trends that will shape digital experiences in 2024.',
  '# Modern UI Design Principles

Design is constantly evolving, and 2024 brings new trends and principles to the forefront.

## Key Principles

### 1. Minimalism
Less is more. Focus on essential elements and remove unnecessary clutter.

### 2. Accessibility
Design for everyone. Ensure your interfaces are usable by people with disabilities.

### 3. Performance
Fast loading times and smooth interactions are crucial for user experience.

## Design Trends

- **Dark Mode**: Popular and easier on the eyes
- **Gradient Backgrounds**: Subtle gradients add depth
- **Micro-interactions**: Small animations enhance engagement
- **Bold Typography**: Large, readable fonts make a statement

## Best Practices

- Use consistent spacing
- Maintain visual hierarchy
- Test on multiple devices
- Gather user feedback

## Conclusion

Great design is about solving problems and creating delightful experiences.',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&auto=format&fit=crop&q=80',
  'published',
  NOW() - INTERVAL '3 days',
  ARRAY['design', 'ui', 'ux', 'web-design'],
  admin_user_id
)
ON CONFLICT (id) DO NOTHING;

  -- Link Blog 2 to Categories (Design, Tutorial)
  INSERT INTO public.blog_categories (blog_id, category_id) VALUES
    ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002'), -- Design
    ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000005')  -- Tutorial
  ON CONFLICT (blog_id, category_id) DO NOTHING;

  -- Sample Blog 3: Building a Successful Startup
  INSERT INTO public.blogs (
  id,
  title,
  slug,
  excerpt,
  content,
  featured_image,
  status,
  published_at,
  tags,
  author_id
) VALUES (
  '10000000-0000-0000-0000-000000000003',
  'Building a Successful Startup: Lessons Learned',
  'building-successful-startup-lessons',
  'Learn from real experiences about what it takes to build and grow a successful startup.',
  '# Building a Successful Startup

Starting a business is challenging, but with the right approach, you can increase your chances of success.

## Essential Steps

### 1. Validate Your Idea
Before investing time and money, make sure there''s a market for your product or service.

### 2. Build a Strong Team
Surround yourself with talented people who share your vision.

### 3. Focus on Customers
Your customers are your most valuable asset. Listen to them and iterate based on feedback.

## Common Mistakes

- Trying to do everything yourself
- Ignoring customer feedback
- Scaling too quickly
- Not having a clear value proposition

## Key Metrics to Track

- Customer acquisition cost (CAC)
- Lifetime value (LTV)
- Monthly recurring revenue (MRR)
- Churn rate

## Conclusion

Building a startup is a marathon, not a sprint. Stay focused, be persistent, and learn from failures.',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&auto=format&fit=crop&q=80',
  'published',
  NOW() - INTERVAL '1 day',
  ARRAY['business', 'startup', 'entrepreneurship', 'strategy'],
  admin_user_id
)
ON CONFLICT (id) DO NOTHING;

  -- Link Blog 3 to Categories (Business)
  INSERT INTO public.blog_categories (blog_id, category_id) VALUES
    ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003') -- Business
  ON CONFLICT (blog_id, category_id) DO NOTHING;

  -- Sample Blog 4: Productivity Tips for Remote Workers
  INSERT INTO public.blogs (
  id,
  title,
  slug,
  excerpt,
  content,
  featured_image,
  status,
  published_at,
  tags,
  author_id
) VALUES (
  '10000000-0000-0000-0000-000000000004',
  '10 Productivity Tips for Remote Workers',
  'productivity-tips-remote-workers',
  'Maximize your productivity while working from home with these proven strategies and tips.',
  '# Productivity Tips for Remote Workers

Working remotely offers flexibility, but it also requires discipline and the right strategies.

## Top Tips

### 1. Create a Dedicated Workspace
Having a specific area for work helps you mentally separate work from personal life.

### 2. Stick to a Routine
Maintain regular working hours to establish boundaries and maintain work-life balance.

### 3. Take Regular Breaks
Use techniques like the Pomodoro Technique to stay focused and avoid burnout.

### 4. Minimize Distractions
Turn off notifications, use website blockers, and communicate your availability to family.

### 5. Stay Connected
Regular communication with your team is crucial for collaboration and staying aligned.

## Tools to Help

- Time tracking: RescueTime, Toggl
- Task management: Todoist, Asana
- Communication: Slack, Microsoft Teams
- Focus: Forest, Cold Turkey

## Conclusion

Remote work can be highly productive when you have the right mindset and tools.',
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&auto=format&fit=crop&q=80',
  'published',
  NOW() - INTERVAL '2 days',
  ARRAY['productivity', 'remote-work', 'lifestyle', 'tips'],
  admin_user_id
)
ON CONFLICT (id) DO NOTHING;

  -- Link Blog 4 to Categories (Lifestyle, Business)
  INSERT INTO public.blog_categories (blog_id, category_id) VALUES
    ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004'), -- Lifestyle
    ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000003')  -- Business
  ON CONFLICT (blog_id, category_id) DO NOTHING;

  -- Sample Blog 5: TypeScript Best Practices
  INSERT INTO public.blogs (
  id,
  title,
  slug,
  excerpt,
  content,
  featured_image,
  status,
  published_at,
  tags,
  author_id
) VALUES (
  '10000000-0000-0000-0000-000000000005',
  'TypeScript Best Practices for 2024',
  'typescript-best-practices-2024',
  'Learn the latest TypeScript best practices and patterns to write better, more maintainable code.',
  '# TypeScript Best Practices

TypeScript has become the standard for building large-scale JavaScript applications.

## Essential Practices

### 1. Use Strict Mode
Enable strict mode in your tsconfig.json for better type safety:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

### 2. Prefer Interfaces for Objects
Use interfaces for object shapes and types for unions/intersections.

### 3. Avoid `any`
Use `unknown` instead of `any` when you need to accept any type, then narrow it down.

### 4. Use Type Guards
Create type guards to safely narrow types:

\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === ''string'';
}
\`\`\`

## Advanced Patterns

- Discriminated unions
- Generic constraints
- Utility types
- Template literal types

## Conclusion

Following these practices will help you write more robust and maintainable TypeScript code.',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&auto=format&fit=crop&q=80',
  'published',
  NOW() - INTERVAL '4 days',
  ARRAY['typescript', 'javascript', 'programming', 'web-development'],
  admin_user_id
)
ON CONFLICT (id) DO NOTHING;

  -- Link Blog 5 to Categories (Technology, Tutorial)
  INSERT INTO public.blog_categories (blog_id, category_id) VALUES
    ('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001'), -- Technology
    ('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005')  -- Tutorial
  ON CONFLICT (blog_id, category_id) DO NOTHING;

  -- Sample Blog 6: Draft Blog (not published)
  INSERT INTO public.blogs (
  id,
  title,
  slug,
  excerpt,
  content,
  featured_image,
  status,
  published_at,
  tags,
  author_id
) VALUES (
  '10000000-0000-0000-0000-000000000006',
  'Upcoming Features: What to Expect',
  'upcoming-features-expect',
  'A sneak peek at the exciting features coming in the next release.',
  '# Upcoming Features

We''re working on some amazing new features that will enhance your experience.

## What''s Coming

- Enhanced search functionality
- Improved performance
- New customization options
- Better mobile experience

Stay tuned for more updates!',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
  'draft',
  NULL,
  ARRAY['news', 'updates', 'features'],
  admin_user_id
)
ON CONFLICT (id) DO NOTHING;

  -- Link Blog 6 to Categories (News)
  INSERT INTO public.blog_categories (blog_id, category_id) VALUES
    ('10000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000006') -- News
  ON CONFLICT (blog_id, category_id) DO NOTHING;
  
END $$;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Display seed data summary
DO $$
DECLARE
  category_count INTEGER;
  blog_count INTEGER;
  blog_category_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO category_count FROM public.categories;
  SELECT COUNT(*) INTO blog_count FROM public.blogs;
  SELECT COUNT(*) INTO blog_category_count FROM public.blog_categories;
  
  RAISE NOTICE 'Seed data summary:';
  RAISE NOTICE '  Categories: %', category_count;
  RAISE NOTICE '  Blogs: %', blog_count;
  RAISE NOTICE '  Blog-Category relationships: %', blog_category_count;
END $$;

