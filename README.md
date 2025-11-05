# Jade Inc

Monorepo project menggunakan Turborepo dan pnpm workspaces.

## Prerequisites

Sebelum memulai, pastikan Anda sudah menginstall:

- **Node.js** (versi 18 atau lebih tinggi)
- **pnpm** (versi 10.18.3 atau lebih tinggi)

Untuk menginstall pnpm:

```bash
npm install -g pnpm@10.18.3
```

## Setup

1. **Clone repository**

```bash
git clone <repository-url>
cd jade-inc
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Jalankan development server**

```bash
pnpm dev
```

Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000)

## Struktur Project

```
jade-inc/
├── apps/
│   └── web/          # Next.js 16 app (Tailwind CSS v4, next-intl)
├── packages/         # Shared libraries (optional)
├── package.json      # Root package.json
├── pnpm-workspace.yaml
└── turbo.json        # Turborepo configuration
```

## Commands

Semua command dijalankan dari root directory:

| Command | Deskripsi |
|---------|-----------|
| `pnpm dev` | Menjalankan semua apps dalam mode development (parallel) |
| `pnpm build` | Build semua apps/packages untuk production |
| `pnpm start` | Menjalankan apps setelah build |
| `pnpm lint` | Lint semua apps/packages |

### Menjalankan app spesifik

Untuk menjalankan hanya web app:

```bash
pnpm --filter @apps/web dev
```

## Teknologi

- **Next.js 16** - App Router, Server Components, Server Actions
- **React 19** - UI library
- **Tailwind CSS v4** - Styling
- **next-intl** - Internationalization (i18n)
- **TypeScript** - Type safety
- **Turborepo** - Monorepo build system
- **pnpm** - Package manager

## Catatan

- Single lockfile di root: `pnpm-lock.yaml`
- Workspaces didefinisikan di `pnpm-workspace.yaml`
- Turborepo dikonfigurasi via `turbo.json`
- Environment variables (jika diperlukan) dapat ditambahkan di file `.env` di root atau di `apps/web/.env`

