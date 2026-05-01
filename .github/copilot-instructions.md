# Copilot Instructions

See [AGENTS.md](../AGENTS.md) for a full description of this repository, its architecture, conventions, and development workflow.

## Quick Reference

- **Runtime / bundler / test runner**: Bun
- **UI**: React 19 + Tailwind CSS v4
- **State**: Jotai atoms synced to URL query params via `jotai-location`
- **Linter / formatter**: Biome (`bun run lint:fix`)
- **Type check**: `bun run typecheck`
- **Tests**: `bun test`
- **Build**: `bun run build` → produces `dist/index.html` (all assets inlined)

## Key Conventions

- Query-param atoms live in `src/atoms/` and are named `<param>.atom.ts`.
- Pure race logic (no side effects) lives in `src/lib/`.
- React components live in `src/components/`; custom hooks in `src/hooks/`.
- Run `bun run lint:fix` before every commit to keep Biome happy.
- Avoid `any`; use the TypeScript interfaces in `src/types/race.ts`.
