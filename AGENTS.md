# Frontyard Ultra Timer — Agent Guide

## What This Repo Is

**Frontyard Ultra Timer** is a single-page race-display app for ultramarathon-style "Frontyard Ultra" events where lap durations decrease by a fixed number of minutes each lap. It is built with:

- **React 19** (UI)
- **Jotai** (state) + **jotai-location** (URL-synced atoms)
- **Tailwind CSS v4** (styling)
- **Bun** (runtime, bundler, test runner)
- **Biome** (linter + formatter)
- **TypeScript** (strict mode)

The entire app compiles to a single standalone `dist/index.html` file with all JS/CSS inlined.

## URL-Driven State

All configuration lives in the URL query string. No server, no backend.

| Param   | Type     | Default | Meaning                                  |
|---------|----------|---------|------------------------------------------|
| `start` | ISO 8601 | —       | Scheduled race start (required)          |
| `first` | integer  | `30`    | Lap 1 duration in minutes                |
| `dec`   | integer  | `1`     | Minutes subtracted each subsequent lap   |
| `dist`  | float    | `3`     | Loop distance in km                      |

Example: `/?start=2026-03-09T10:00&first=30&dec=1&dist=3`

If `start` is absent or invalid, the app renders a **ConfigForm** to set parameters. Once set, the URL updates and the **RaceDisplay** renders.

## Project Structure

```
src/
  atoms/          # Jotai atoms, one per URL param (*.atom.ts)
  components/     # React components (ConfigForm, RaceDisplay, etc.)
  hooks/          # Custom hooks (useRaceConfig, useRaceState, useClock, useBanner)
  lib/            # Pure logic: race.ts, config.ts, format.ts
  types/          # TypeScript interfaces (race.ts)
  main.tsx        # Entry point
  App.tsx         # Root component — routes between ConfigForm and RaceDisplay
```

## Key Domain Concepts

- **Lap schedule**: Laps count up from 1. Lap `n` has duration `first - (n-1) * dec` minutes (minimum 1 minute). The race ends when the next lap's unclamped minutes would be ≤ 0.
- **Race phases**: `pre` (before start), `racing` (in progress), `done` (all laps finished).
- `getRaceState(config, nowTs)` in `src/lib/race.ts` is the core computation.

## Development Commands

| Command               | Purpose                                |
|-----------------------|----------------------------------------|
| `bun run dev`         | Watch mode dev server                  |
| `bun test`            | Run all tests                          |
| `bun run typecheck`   | TypeScript type check (no emit)        |
| `bun run lint`        | Biome lint check                       |
| `bun run lint:fix`    | Biome lint with auto-fix               |
| `bun run build`       | Production build → `dist/index.html`   |

## Testing

Tests live alongside source files (`*.test.ts` / `*.test.tsx`). Run with `bun test`. Test setup uses `@happy-dom/global-registrator` and `@testing-library/react`.

## Code Conventions

- All query-param atoms are in `src/atoms/` and named `<param>.atom.ts`.
- Pure, side-effect-free logic goes in `src/lib/`.
- React components go in `src/components/`.
- Custom hooks go in `src/hooks/`.
- Biome enforces formatting and linting — run `bun run lint:fix` before committing.
- No `any` types; prefer explicit TypeScript interfaces.

## CI / Deployment

- **Pull requests**: lint, typecheck, tests, and build must pass (`.github/workflows/ci-pages.yml`).
- **Push to `main`**: CI runs, then `dist/index.html` is deployed to GitHub Pages automatically.
