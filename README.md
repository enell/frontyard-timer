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
