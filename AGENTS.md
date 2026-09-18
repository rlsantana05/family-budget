# AGENTS.md — Project Structure Contract

> This document defines mandatory rules for how code is organized in this repository. Any AI agent or contributor generating code **MUST** follow these rules. Violating them is a bug, not a style preference.

---

## Folder Structure

```
src/
├── app/              # Routing only
├── features/         # Business logic, grouped by domain
├── components/ui/    # Shared/global UI primitives
├── lib/              # Shared utilities, db client, config
└── types/            # Global shared types
```

---

## Rules

### 1. `app/` is routing-only

- Files in `app/` MUST NOT contain business logic, data-fetching logic, or complex state.
- A `page.tsx` should primarily import and render a component from `features/`.
- Server actions and route handlers in `app/` should delegate to functions defined in `features/`, not implement logic inline.

### 2. Each feature is self-contained

Every folder under `features/<name>/` follows this internal shape:

```
features/<name>/
├── components/
├── hooks/
├── actions/      # server actions
├── api/          # client-side data fetching
├── types.ts
└── index.ts      # public API of this feature
```

- A feature MUST NOT be split or duplicated elsewhere.
- If a subfolder isn't needed (e.g., no hooks), omit it — don't create empty folders.

### 3. No cross-feature imports except through `index.ts`

- Feature A MUST NOT import directly from `features/B/components/...` or any internal path of feature B.
- Feature A MAY import only from `features/B/index.ts`.
- `index.ts` MUST export only what is intended for external use. Internal helpers stay unexported.

### 4. Shared code lives in `components/` or `lib/`, never duplicated

- If two or more features need the same component, hook, or utility, it MUST be moved to `components/ui/` or `lib/`, not copy-pasted.
- `lib/` is for framework-agnostic utilities and shared clients (db, api clients, config). No React components here.

### 5. One feature = one deletable unit

- Deleting a `features/<name>/` folder MUST NOT break any other feature.
- If deleting a feature breaks another, that's a signal the shared code should have been in `lib/` or `components/`, not left in the feature.

### 6. Naming conventions

| Type | Convention |
|------|-----------|
| Folders | kebab-case |
| Components | PascalCase file content, kebab-case.tsx filename |
| Hooks | use-thing.ts |
| Server actions | verb-based, e.g. `create-user-action.ts` |

---

## Anti-patterns to reject

- A `utils/` or `helpers/` dumping ground inside a feature with no clear ownership
- Business logic inside `app/page.tsx` or `app/layout.tsx`
- Importing a feature's internal file path instead of its `index.ts`
- A "shared" or "common" feature folder that becomes a catch-all (use `lib/` or `components/` instead)
- Circular imports between two features (if A needs B and B needs A, extract the shared piece)

---

## When generating new code

1. Identify which feature the code belongs to (or if it's genuinely cross-cutting → `lib/`/`components/`).
2. Place it in the correct subfolder (`components/`, `hooks/`, `actions/`, `api/`).
3. Export it from `index.ts` only if other features or `app/` need it.
4. Do not create new top-level folders outside this structure without explicit approval.
