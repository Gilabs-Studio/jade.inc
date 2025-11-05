# Jade Inc Monorepo (Turborepo + pnpm)

This repository is a Turborepo monorepo managed with pnpm workspaces.

## Structure

- `apps/@web`: Next.js 16 app (Tailwind CSS v4)
- `packages/*`: Place shared libraries here (optional)

## Commands (run at repo root)

- `pnpm dev` — run all apps in parallel (Turborepo)
- `pnpm build` — build all apps/packages
- `pnpm start` — start apps after build
- `pnpm lint` — lint across the monorepo

To run only the web app in dev:

```bash
pnpm --filter @apps/web dev
```

## Notes

- Single lockfile at repo root (`pnpm-lock.yaml`)
- Workspaces defined in `pnpm-workspace.yaml`
- Turborepo configured via `turbo.json`

