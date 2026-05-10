# Contributing to TwigcnBundle

Thanks for your interest in contributing! This monorepo ships two
packages from a single tag:

- `ducrot/twigcn-bundle` (Composer) — the Symfony bundle.
- `@ducrot/twigcn-ui` (npm) — the Stimulus controllers and styles.

All issues and pull requests live on the `ducrot/twigcn` monorepo —
the subsplit at `ducrot/twigcn-bundle` is read-only.

## Code of conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md).
By participating you agree to abide by its terms.

## Development setup

Prerequisites:

- [DDEV](https://ddev.com/) for the local Symfony stack
- Node.js (see [`.nvmrc`](./.nvmrc))
- PHP 8.2+ and Composer (provided inside DDEV)

```bash
git clone https://github.com/ducrot/twigcn.git
cd twigcn
ddev start
ddev composer install
ddev npm install
ddev npm run dev
```

The demo app then runs at <https://twigcn.ddev.site/>.

### Useful commands

```bash
# Frontend
ddev npm run build          # Build @ducrot/twigcn-ui
ddev npm run build:demo     # Build the demo
ddev npm run typecheck      # TypeScript check
ddev npm test               # Vitest

# Backend
ddev composer -d packages/bundle test     # PHPUnit
ddev composer -d packages/bundle phpstan  # Static analysis
ddev composer -d packages/bundle qa       # phpstan + test
```

## Adding a component

1. PHP class in `packages/bundle/src/Twig/Components/`.
2. Twig template in `packages/bundle/templates/components/`.
3. If interactive, Stimulus controller in `packages/ui/src/controllers/`.
4. Export the controller in `packages/ui/src/index.ts`.
5. Add a demo route under `packages/demo/` so the component is visible
   on the showcase.
6. Add a smoke test under `packages/bundle/tests/` (see existing tests
   for the pattern).

## Pull requests

- Branch from `main`. Keep PRs focused — one logical change per PR.
- Add a `[Unreleased]` entry to [`CHANGELOG.md`](./CHANGELOG.md) under
  the appropriate Keep-a-Changelog section (Added / Changed / Fixed /
  Security / …).
- Run the full check locally before pushing:
  ```bash
  ddev composer -d packages/bundle qa
  ddev npm run typecheck && ddev npm test
  ```
- The CI runs PHPUnit on PHP 8.2–8.5, PHPStan, and Vitest. PRs must be
  green before review.
- Never push directly to `main`; never push tags. Tagging is a maintainer
  action that triggers the release workflow.

## Reporting bugs and requesting features

Use the issue templates on
<https://github.com/ducrot/twigcn/issues/new/choose>.

For security issues, follow [`SECURITY.md`](./SECURITY.md) instead — do
**not** open a public issue.

## Releases

Releases are coordinated by maintainers via [`RELEASING.md`](./RELEASING.md).
Both packages ship from a single `vX.Y.Z` git tag.
