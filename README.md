# Kosmos Cortex

Kosmos Cortex is the starting point for a web application built with Next.js, TypeScript, and Supabase.

## Stack

- Next.js App Router and React
- TypeScript
- Supabase for database and authentication integration
- GitHub Actions for continuous integration

Cloudflare deployment is intentionally not configured in this initial commit. Choose and validate the deployment target before adding platform-specific configuration.

## Requirements

- Node.js 22 or a currently supported Node.js LTS release
- npm
- A Supabase project for live backend integration (optional for the initial local UI)

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
- `npm run build` — build the production application

## Environment variables

See `.env.example`. Never commit `.env.local`, access tokens, database passwords, service-role keys, or other secrets. Only use Supabase publishable/anon credentials in browser code. Privileged credentials, if needed in future server-only code, must remain server-side.

## Database changes

Database migrations are not included in this initial scaffold. Add reviewed, version-controlled migrations only after the existing database functions, permissions, and RLS posture have been assessed.

## Deployment

No Cloudflare deployment configuration or deployment workflow is included yet. Select and validate a compatible deployment target before publishing.

## Current scope

This repository currently contains the application scaffold and CI checks only. It does not create or modify database objects, change existing database function permissions, configure production secrets, or deploy the application.
