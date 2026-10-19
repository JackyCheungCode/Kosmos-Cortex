# Kosmos-Cortex IBM Carbon Design System Baseline

## Approved baseline

- Carbon Design System: v11 active release line.
- Core React components: `@carbon/react@1.118.0`.
- IBM enterprise patterns: `@carbon/ibm-products@2.100.0`.
- Sass compiler: `sass@1.105.2`.
- Framework: existing Next.js App Router, React 19, and TypeScript setup.

These are exact direct-dependency versions. The project must re-check peer dependencies and run CI before upgrading any package. Do not adopt Carbon v12 prereleases for production without a separately approved migration.

## Component policy

1. Use stable, officially released components from `@carbon/react` and `@carbon/ibm-products`.
2. Application code imports components from `@/src/design-system`; direct imports from the two Carbon packages are restricted to that gateway.
3. Prefer IBM Products patterns when the use case matches a stable, documented pattern. Preview, canary, and experimental components are not allowed by default.
4. Do not create replacement implementations for standard interactive controls when an official component exists.
5. Native interactive JSX elements (`a`, `button`, `input`, `select`, `textarea`, `option`, `dialog`, `details`, and `summary`) are prohibited unless a reviewed, unexpired exception is recorded.
6. Inline JSX styles and hard-coded colors, font declarations, and spacing/typography values in app Sass/CSS are prohibited. Use Carbon components, classes, themes, and design tokens.
7. Exceptions must be specific, justified, approved by a named reviewer, and carry an expiry date in `docs/design-system/exceptions.json`.

## Styling and theming

- Global styles are loaded from `app/globals.scss`.
- Carbon and IBM Products Sass entry points are the source of component styling.
- Do not add global overrides to Carbon component internals.
- Use Carbon theme support and Carbon design tokens instead of introducing parallel color, type, spacing, radius, or motion systems.

## Required checks

Before merging, run:

- `npm run check:design-system`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

The CI workflow runs the design-system policy check in addition to lint, type checking, and production build. Automated checks are guardrails, not a substitute for keyboard, focus, responsive, and accessibility review.

## Dependency and upgrade policy

- Keep direct Carbon package versions exact; do not use `^` or `~` for them.
- Review official release notes, peer dependencies, and migration guidance before upgrading.
- Regenerate and commit the npm lockfile as part of dependency installation/validation before relying on deterministic `npm ci` builds.
- Treat any major Carbon version change as a reviewed design-system migration, not a routine dependency bump.
