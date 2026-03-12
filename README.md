# Frontyard Ultra Timer

Single-page race display app built with React + Vite + Tailwind.

The app is URL-state driven using `jotai-location`.

## Behavior

The app only uses `/`.

- If URL has a valid `start` query parameter, race display is shown.
- If `start` is missing or invalid, config form is shown.
- `first`, `dec`, and `dist` are optional and default to:
  - `first=30`
  - `dec=1`
  - `dist=3`

Example valid URL:

`/?start=2026-03-09T10:00&first=30&dec=1&dist=3`

## Query parameter source of truth

All query param atoms are in `src/atoms` and filenames end with `.atom.ts`.

- `start.atom.ts`
- `first.atom.ts`
- `dec.atom.ts`
- `dist.atom.ts`
- `location.atom.ts`
- `race-config.atom.ts` (composed helper)

## Scripts

- `npm run dev` — start dev server
- `npm run test` — run tests
- `npm run typecheck` — TypeScript checks
- `npm run build` — production build

## GitHub Pages deployment

This repository includes `.github/workflows/ci-pages.yml`.

- On pull requests: runs lint, typecheck, tests, and build.
- On pushes to `main`: runs CI and deploys `dist` to GitHub Pages.

Deployment uses a Pages base path based on the repository name via `VITE_BASE_PATH`, so assets resolve correctly at `https://<owner>.github.io/<repo>/`.

Repository setting required once:

- **Settings → Pages → Build and deployment → Source**: set to **GitHub Actions**.
