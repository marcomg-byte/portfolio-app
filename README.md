# Portfolio App

Personal portfolio for Marco Antonio Melo, built to present professional experience, technical capabilities, selected projects, and contact paths in a polished, responsive web experience.

The site positions Marco as a Cloud Architect, Full Stack Engineer, and Pentester. It includes a visual home page, an about section with skills and career journey, a filterable projects area, contact information, a contact form UI, and a resume link. The app is designed around reusable UI primitives, a custom token-driven Tailwind theme pipeline, and mobile-first responsive layouts.

The project is built with Next.js, React, TypeScript, Tailwind CSS, Font Awesome, Vitest, and Yarn 4 through Corepack. It runs on Node 24 and deploys to Vercel under the production domain `marcoantoniomelo.qzz.io`.

## Features

- Home page with a carousel-style hero, profile actions, expertise cards, and featured project highlights.
- About page covering skills, key areas of expertise, professional journey, and personal interests.
- Projects page with category filters for backend, cybersecurity, web applications, developer tools, cloud/devops, and libraries/design systems.
- Contact page with contact cards, availability details, collaboration signals, and a structured message form UI.
- Shared component system for app chrome, cards, typography, buttons, forms, lists, carousel, hero, progress stepper, and media blocks.
- Token-based theme generation from `tokens.json` through `parse-theme.mts`.
- Automated validation with theme checks, linting, Vitest coverage, and production builds.
- Release automation through GitHub labels: `patch`, `minor`, and `major`.
- Vercel production deployment with the verified custom domain `marcoantoniomelo.qzz.io`.

## Current Version

Current app version: `1.0.1`

The version is tracked in `package.json` and is bumped automatically by the release workflow when a merged pull request has one release label: `patch`, `minor`, or `major`.

## Latest Releases

Latest releases are published as GitHub Releases from `.github/workflows/release.yml`.

Use the repository Releases page to review published versions, tags, and release notes. Each release tag follows the package version, for example:

```txt
v1.0.0
```

## Requirements

- Node.js `>=24 <25`
- Corepack enabled
- Yarn `4.16.0`

The expected Node version is declared in `.nvmrc` and `package.json`.

```bash
corepack enable
yarn install --immutable
```

## Development

Start the local development server:

```bash
yarn dev
```

This runs the theme token watcher and the Next.js dev server together.

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Starts token watching and the Next.js dev server. |
| `yarn build` | Generates theme output and builds the Next.js app. |
| `yarn start` | Starts the production Next.js server after a build. |
| `yarn lint` | Runs ESLint. |
| `yarn lint:fix` | Runs ESLint with automatic fixes. |
| `yarn test` | Runs Vitest. |
| `yarn test:cov` | Runs Vitest with coverage. |
| `yarn test:watch` | Runs Vitest in watch mode. |
| `yarn test:debug` | Runs Vitest with the Node inspector enabled. |
| `yarn theme:check` | Type-checks the Tailwind/theme configuration. |
| `yarn theme:run` | Generates theme output from `tokens.json`. |
| `yarn theme:watch` | Watches `tokens.json` and regenerates theme output. |

## Project Structure

| Path | Purpose |
| --- | --- |
| `app/` | Next.js App Router routes and layouts. |
| `components/` | Reusable UI and theme components. |
| `lib/` | Shared library code. |
| `utils/` | Utility functions. |
| `test/` | Vitest test files. |
| `public/` | Static assets served by Next.js. |
| `tokens.json` | Theme token source file. |
| `parse-theme.mts` | Theme token generation script. |
| `tailwind.config.ts` | Tailwind configuration generated/consumed by the theme pipeline. |

## Validation

Before opening a pull request, run:

```bash
yarn theme:check
yarn lint
yarn test:cov
yarn build
```

These are the same checks used by the CI workflow.

## GitHub Actions

### CI

`.github/workflows/ci.yaml` runs on pull requests, pushes to `main`, and manual dispatches.

It checks:

- Theme type safety
- ESLint
- Vitest coverage
- Next.js production build

### CD Dry Run

`.github/workflows/cd.yml` runs a Vercel production build without deploying.

It pulls the Vercel production environment and runs:

```bash
yarn dlx vercel build --prod
```

This is useful for confirming that the app can be built by Vercel before a real release deploy.

### Release

`.github/workflows/release.yml` creates GitHub releases from merged pull requests into `main`.

Add exactly one of these labels to the pull request before merge:

- `patch`
- `minor`
- `major`

When the PR is merged, the workflow bumps `package.json`, creates a release commit, tags the release, and publishes a GitHub Release.

### Deploy

`.github/workflows/deploy.yml` deploys to Vercel when a GitHub Release is published. It can also be run manually.

The workflow:

- Pulls the Vercel production environment
- Builds the project with Vercel
- Deploys the prebuilt output to production
- Aliases the deployment to `marcoantoniomelo.qzz.io`

## Vercel Configuration

The production domain is:

```txt
marcoantoniomelo.qzz.io
```

The domain is expected to already be registered and verified in Vercel.

Required GitHub repository secrets:

| Secret | Description |
| --- | --- |
| `VERCEL_TOKEN` | Vercel token used by the CLI and API. |
| `VERCEL_ORG_ID` | Vercel team or account ID. |
| `VERCEL_PROJECT_ID` | Vercel project ID. |

The production domain DNS is hosted in Cloudflare. Keep the Vercel-related DNS records in sync with Vercel's domain settings.

## Release Flow

1. Open a pull request into `main`.
2. Let CI and the CD dry run pass.
3. Apply one release label: `patch`, `minor`, or `major`.
4. Merge the pull request.
5. The release workflow creates a GitHub Release.
6. The deploy workflow publishes the release to Vercel.

## Notes

- This project is private and is not published to npm.
- Use Yarn commands consistently; the project is pinned to Yarn `4.16.0`.
- If Vercel commands fail with an empty token, confirm the repository secrets are configured and available to the workflow.
