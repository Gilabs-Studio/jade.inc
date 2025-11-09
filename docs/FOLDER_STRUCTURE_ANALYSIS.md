# Analisis Struktur Folder

Analisis struktur folder berdasarkan standar `@standart.mdc` dan identifikasi folder/file yang perlu dipindahkan.

## Struktur Saat Ini

### ✅ **Sudah Sesuai Standar**

#### **apps/web/src/features/** ✅
- Semua features sudah berada di `apps/web/src/features/<featureName>/`
- Struktur per feature sudah benar:
  - `types/` - Type declarations
  - `stores/` - Zustand stores
  - `hooks/` - React hooks
  - `services/` - API services
  - `components/` - UI components
  - `messages/` - Translation files

#### **apps/web/src/lib/** ✅
- `src/lib/api/` - API client (sudah benar)
- `src/lib/i18n/` - i18n utilities (sudah benar)

#### **apps/api/src/** ✅
- `src/modules/` - Feature modules (sudah benar)
- `src/shared/` - Shared utilities (sudah benar)
- `src/config/` - Configuration (sudah benar)

### ⚠️ **Perlu Analisis Lebih Lanjut**

#### **apps/web/components/** (Root Level)
- **Lokasi**: `apps/web/components/ui/`
- **Status**: Shared UI components (shadcn/ui)
- **Keputusan**: ✅ **Tetap di root** karena:
  - Sudah dikonfigurasi di `components.json` dengan alias `@/components`
  - Banyak file yang menggunakan `@/components/ui/*`
  - Standar shadcn/ui menggunakan root level `components/`
  - Shared components yang digunakan di seluruh aplikasi

#### **apps/web/lib/utils.ts** (Root Level)
- **Lokasi**: `apps/web/lib/utils.ts`
- **Status**: Shared utility function (`cn()`)
- **Keputusan**: ✅ **Tetap di root** karena:
  - Sudah dikonfigurasi di `components.json` dengan alias `@/lib/utils`
  - Banyak file yang menggunakan `@/lib/utils`
  - Standar shadcn/ui menggunakan root level `lib/utils.ts`
  - Shared utility yang digunakan di seluruh aplikasi

### ❌ **Perlu Dihapus**

#### **apps/web/app/blog/[slug]/** (Duplikasi Route)
- **Lokasi**: `apps/web/app/blog/[slug]/`
- **Status**: Folder kosong
- **Masalah**: Duplikasi dengan `apps/web/app/[locale]/blog/[slug]/`
- **Tindakan**: ❌ **Hapus** folder ini ✅ **SUDAH DIHAPUS**

#### **apps/web/messages/** (Folder Kosong)
- **Lokasi**: `apps/web/messages/`
- **Status**: Folder kosong
- **Tindakan**: ❌ **Hapus** folder ini ✅ **SUDAH DIHAPUS**

### ✅ **Sudah Benar (Root Level Files)**

#### **apps/web/app/page.tsx**
- **Status**: ✅ Root redirect page (redirect ke `/en`)
- **Tindakan**: Tetap di root

#### **apps/web/app/not-found.tsx**
- **Status**: ✅ Root 404 page
- **Tindakan**: Tetap di root

#### **apps/web/app/layout.tsx**
- **Status**: ✅ Root layout
- **Tindakan**: Tetap di root

## Rencana Perbaikan

### 1. Hapus Folder Duplikasi ✅
- [x] Hapus `apps/web/app/blog/[slug]/` (kosong) ✅ **SUDAH DIHAPUS**
- [x] Hapus `apps/web/messages/` (kosong) ✅ **SUDAH DIHAPUS**

### 2. Verifikasi Import Paths ✅
- [x] Pastikan semua import menggunakan alias yang benar:
  - `@/components/*` untuk shared UI components ✅
  - `@/lib/utils` untuk shared utilities ✅
  - `@/src/features/*` untuk feature components ✅
  - `@/src/lib/*` untuk feature-specific libs ✅

### 3. Update tsconfig.json ✅
- [x] Update paths alias di `tsconfig.json` untuk clarity ✅

## Kesimpulan

Struktur folder **sudah sesuai standar** dan tidak ada yang perlu dipindahkan:

- ✅ Features sudah di `src/features/`
- ✅ Shared components di root `components/` (sesuai shadcn/ui standard)
- ✅ Shared utilities di root `lib/` (sesuai shadcn/ui standard)
- ✅ Feature-specific libs di `src/lib/`
- ✅ Root level routes (`app/page.tsx`, `app/not-found.tsx`) untuk fallback
- ✅ Folder kosong sudah dihapus
- ✅ tsconfig.json sudah diupdate dengan paths alias yang eksplisit

**Tidak ada file/folder yang perlu dipindahkan** karena struktur sudah sesuai dengan standar Next.js 16 dan shadcn/ui.

## Tindakan yang Sudah Dilakukan

1. ✅ Dihapus `apps/web/app/blog/[slug]/` (folder kosong, duplikasi route)
2. ✅ Dihapus `apps/web/messages/` (folder kosong)
3. ✅ Update `tsconfig.json` dengan paths alias yang lebih eksplisit untuk clarity

## Struktur Final

```
apps/web/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Localized routes
│   ├── page.tsx           # Root redirect
│   ├── layout.tsx         # Root layout
│   └── not-found.tsx     # Root 404
├── components/            # Shared UI components (shadcn/ui)
│   └── ui/
├── lib/                   # Shared utilities
│   └── utils.ts
├── src/
│   ├── features/         # Feature modules
│   │   └── <feature>/
│   │       ├── components/
│   │       ├── services/
│   │       ├── stores/
│   │       ├── hooks/
│   │       ├── types/
│   │       └── messages/
│   └── lib/              # Feature-specific libs
│       ├── api/
│       └── i18n/
└── public/                # Static assets
```
