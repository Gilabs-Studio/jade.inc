# Supabase Database Structure

Struktur database untuk Jade Inc API menggunakan Supabase.

## Migration Files

Migrations diorganisir dalam beberapa file untuk kemudahan maintenance:

1. **`20240101000001_extensions.sql`** - PostgreSQL extensions
2. **`20240101000002_tables.sql`** - Database tables
3. **`20240101000003_indexes.sql`** - Database indexes
4. **`20240101000004_functions.sql`** - Database functions
5. **`20240101000005_triggers.sql`** - Database triggers
6. **`20240101000006_rls_policies.sql`** - Row Level Security policies

### All-in-One Migration

File **`20240101000000_initial_schema.sql`** berisi semua migrations dalam satu file untuk kemudahan setup pertama kali.

## Seed Data

File **`seed.sql`** berisi data awal untuk development dan testing:

- **6 Categories**: Technology, Design, Business, Lifestyle, Tutorial, News
- **6 Blog Posts**: Sample blog posts dengan featured images dan categories (many-to-many)
- **Blog-Category Relationships**: Many-to-many relationships antara blogs dan categories

### Prerequisites

Sebelum menjalankan seed data, pastikan:

1. Migrations sudah dijalankan (tabel sudah dibuat)
2. Admin user sudah dibuat dengan email `admin@example.com` via Supabase Auth atau API

### Running Seed Data

**Option 1: Using Supabase CLI (Recommended)**

```bash
# Reset database (runs migrations + seed.sql)
supabase db reset

# Or run seed manually
supabase db execute -f supabase/seed.sql
```

**Option 2: Manual Execution via Supabase Dashboard**

1. Buka Supabase Dashboard → SQL Editor
2. Copy dan paste isi file `supabase/seed.sql`
3. Klik "Run" untuk menjalankan

**Option 3: Using psql**

```bash
psql -h <your-db-host> -U postgres -d postgres -f supabase/seed.sql
```

### Seed Data Contents

- **Categories**: 6 sample categories dengan warna dan deskripsi
- **Blogs**: 6 sample blog posts (5 published, 1 draft) dengan:
  - Featured images (required)
  - Multiple categories per blog (many-to-many)
  - Markdown content
  - Tags
  - Published dates

**Note:** Jika admin user belum ada, blog seed data akan di-skip dengan warning message.

## Database Schema

### Tables

#### `users`

User profiles linked to Supabase Auth.

**Note:** Password tidak disimpan di tabel ini. Password disimpan secara aman di Supabase Auth (`auth.users`) yang sudah ter-encrypt.

- `id` (UUID, PK) - References `auth.users.id`
- `email` (TEXT, UNIQUE) - User email
- `full_name` (TEXT) - User full name
- `role` (TEXT) - User role: `admin`, `editor`, `author`, `viewer`
- `avatar_url` (TEXT, NULLABLE) - User avatar URL
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp

**Password Storage:**

- Password disimpan di `auth.users` (Supabase Auth)
- Sudah ter-encrypt dan secure
- Tidak perlu disimpan di `public.users` untuk keamanan

#### `blogs`

Blog posts with markdown content.

- `id` (UUID, PK) - Blog ID
- `title` (TEXT) - Blog title
- `slug` (TEXT, UNIQUE) - URL-friendly slug
- `excerpt` (TEXT, NULLABLE) - Short excerpt
- `content` (TEXT) - Markdown content
- `featured_image` (TEXT, NULLABLE) - Featured image URL
- `status` (TEXT) - Status: `draft`, `published`, `archived`
- `published_at` (TIMESTAMPTZ, NULLABLE) - Publication date
- `tags` (TEXT[]) - Array of tags
- `category_id` (UUID, NULLABLE) - Category reference
- `author_id` (UUID, FK) - References `users.id`
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp

#### `content`

CMS content with markdown support.

- `id` (UUID, PK) - Content ID
- `title` (TEXT) - Content title
- `slug` (TEXT) - URL-friendly slug
- `type` (TEXT) - Content type: `page`, `post`, `custom`
- `content` (TEXT) - Markdown content
- `excerpt` (TEXT, NULLABLE) - Short excerpt
- `featured_image` (TEXT, NULLABLE) - Featured image URL
- `status` (TEXT) - Status: `draft`, `published`, `archived`
- `published_at` (TIMESTAMPTZ, NULLABLE) - Publication date
- `metadata` (JSONB) - Additional metadata
- `author_id` (UUID, FK) - References `users.id`
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp
- UNIQUE(`slug`, `type`)

## Row Level Security (RLS)

RLS policies mengatur akses ke data berdasarkan role user:

### Users Table

- Users can read/update their own profile
- Admins can read/update all users

### Blogs Table

- Anyone can read published blogs
- Authors can read/insert/update/delete their own blogs
- Editors and admins can read/update all blogs
- Admins can delete any blog

### Content Table

- Anyone can read published content
- Authors can read/insert/update/delete their own content
- Editors and admins can read/update all content
- Admins can delete any content

## Indexes

Indexes dibuat untuk optimasi query performance:

- Email, role, created_at indexes untuk users
- Slug, status, author_id, published_at indexes untuk blogs
- Slug, type, status, author_id, published_at indexes untuk content
- Composite indexes untuk common queries
- GIN index untuk tags array

## Functions

### `update_updated_at_column()`

Automatically updates the `updated_at` timestamp when a row is updated.

## Triggers

Triggers menggunakan function `update_updated_at_column()` untuk:

- `update_users_updated_at`
- `update_blogs_updated_at`
- `update_content_updated_at`

## Usage

### Setup Database (First Time)

**Quick Setup (Recommended):**

1. Buka Supabase Dashboard > SQL Editor
2. Copy isi dari `migrations/20240101000000_initial_schema.sql` (all-in-one script)
3. Paste dan Run di SQL Editor

**Or Using Separated Migrations (Production):**

1. Install Supabase CLI: `npm install -g supabase`
2. Login: `supabase login`
3. Link project: `supabase link --project-ref your-project-ref`
4. Push migrations: `supabase db push`

### Apply Migrations (Production)

Jika menggunakan Supabase CLI:

```bash
supabase db push
```

Atau jalankan migrations secara manual di SQL Editor sesuai urutan:

1. Extensions
2. Tables
3. Indexes
4. Functions
5. Triggers
6. RLS Policies

## Notes

- Semua tables menggunakan schema `public`
- Foreign keys menggunakan `ON DELETE CASCADE`
- Timestamps menggunakan `TIMESTAMPTZ` untuk timezone support
- UUID menggunakan extension `uuid-ossp`
- RLS enabled untuk semua tables
