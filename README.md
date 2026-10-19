# Kosmos Cortex

Kosmos Cortex is a web application built with Next.js, TypeScript, Supabase, and the IBM Carbon Design System.

## Stack

- Next.js App Router and React
- TypeScript
- IBM Carbon Design System v11 via `@carbon/react`
- IBM enterprise UI patterns via `@carbon/ibm-products`
- Supabase for database and authentication integration
- GitHub Actions for continuous integration

Cloudflare deployment is intentionally not configured. Choose and validate the deployment target before adding platform-specific configuration.

## Design system baseline

The UI baseline uses exact direct dependency versions for Carbon core, IBM Products, and Sass. Application components should be imported through `src/design-system/index.ts`. Unreviewed custom controls, inline styles, hard-coded design values, and direct Carbon package imports outside the approved gateway are prohibited by default.

See [the Carbon baseline](docs/design-system/carbon-baseline.md) and [the exception register](docs/design-system/exceptions.json) for policy and review requirements.

## Telemetry

Carbon and IBM Products packages include documented telemetry opt-out environment variables. The repository CI sets `CARBON_TELEMETRY_DISABLED=1` and `IBM_TELEMETRY_DISABLED=true` before installing dependencies. For local installation, set both variables in your shell before running `npm install` if you want to opt out of install-time telemetry.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in the public Supabase project URL and publishable key if you want to test Supabase connectivity.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open http://localhost:3000.

## Scripts

- `npm run dev` — start the local development server
- `npm run lint` — run ESLint
- `npm run typecheck` — check TypeScript types
- `npm run check:design-system` — enforce Carbon usage and styling rules
- `npm run build` — build the production application

## Environment variables

See `.env.example`. Never commit `.env.local`, access tokens, database passwords, service-role keys, or other secrets. Only use Supabase publishable/anon credentials in browser code. Privileged credentials, if needed in future server-only code, must remain server-side.

## Database changes

Database migrations are not included in this scaffold. Add reviewed, version-controlled migrations only after the existing database functions, permissions, and RLS posture have been assessed.

## Deployment

No Cloudflare deployment configuration or deployment workflow is included. Select and validate a compatible deployment target before publishing.

## Current scope

This repository contains the application scaffold, Carbon design-system integration, and CI checks. It does not create or modify database objects, change existing database function permissions, configure production secrets, or deploy the application.
