# Releasing

Both `ducrot/twigcn-bundle` (Packagist) and `@ducrot/twigcn-ui` (npm) ship from
the same tag. Pushing a `vX.Y.Z` tag triggers `.github/workflows/release.yml`,
which subtree-splits the bundle into `ducrot/twigcn-bundle` and runs
`npm publish` for the UI package.

## One-time setup

These steps are required once per repository / account.

### GitHub

1. Create the read-only subsplit repository `ducrot/twigcn-bundle` on GitHub.
   Add `[READ ONLY] Subtree split of twigcn-bundle. Do not open PRs here.` to
   the description.
2. In this monorepo's repository settings → *Secrets and variables → Actions*,
   add:
   - `SPLIT_TOKEN` — a GitHub fine-grained Personal Access Token with
     `Contents: Read and write` on `ducrot/twigcn-bundle`.
   - `NPM_TOKEN` — an npm granular access token with publish rights for
     `@ducrot/twigcn-ui` and the *Bypass 2FA for automation* option enabled.

### Packagist

1. Submit the bundle once at <https://packagist.org/packages/submit> using
   `https://github.com/ducrot/twigcn-bundle` as the repository URL.
2. Install the *Packagist* GitHub App on `ducrot/twigcn-bundle` so new tags are
   picked up automatically.

### npm

1. Make sure 2FA is on for the account that owns `@ducrot`:
   `npm profile enable-2fa auth-and-writes`.
2. The first publish must happen interactively (or with `--access public`) so
   npm registers the scope as public. Subsequent publishes inherit this from
   `publishConfig` in `packages/ui/package.json`.

## Per-release checklist

1. Make sure `main` is green and contains everything that should ship.
2. Decide the version `X.Y.Z` based on [SemVer](https://semver.org/):
   - **Patch** for bug fixes.
   - **Minor** for new components or backwards-compatible additions.
   - **Major** for breaking changes (PHP API, Twig component props, controller
     names, removed exports).
3. Bump `packages/ui/package.json`:
   ```bash
   npm version --workspace=@ducrot/twigcn-ui --no-git-tag-version X.Y.Z
   ```
   Do **not** edit `packages/bundle/composer.json` — Composer derives the
   version from the git tag.
4. Move the `[Unreleased]` section in `CHANGELOG.md` under a new
   `## [X.Y.Z] - YYYY-MM-DD` heading and update the compare links.
5. Commit:
   ```bash
   git add packages/ui/package.json CHANGELOG.md
   git commit -m "release: vX.Y.Z"
   ```
6. Tag and push (push is manual, never automated):
   ```bash
   git tag vX.Y.Z
   git push
   git push --tags
   ```
7. Watch the *Release* workflow in the Actions tab. Two jobs must succeed:
   - `split-bundle` pushes `packages/bundle` plus the tag to
     `ducrot/twigcn-bundle`. Packagist then exposes the new version within a
     few seconds.
   - `publish-ui` runs `npm publish` for `@ducrot/twigcn-ui`.
8. Verify:
   - <https://packagist.org/packages/ducrot/twigcn-bundle> lists the new tag.
   - <https://www.npmjs.com/package/@ducrot/twigcn-ui> lists the new version.
9. Create a GitHub release on the monorepo for `vX.Y.Z` and paste the
   CHANGELOG section as the release notes.

## Recovering from a botched release

- **`split-bundle` failed**: re-run the job from the Actions UI once the
  underlying issue is fixed. The action is idempotent for the same tag.
- **`publish-ui` failed before `npm publish`**: fix and re-run the job.
- **`npm publish` succeeded but the wrong code shipped**: bump the patch
  version and release again. npm versions are immutable; never re-publish the
  same version. `npm deprecate @ducrot/twigcn-ui@X.Y.Z "<reason>"` marks the
  bad release as deprecated.
- **Wrong tag pushed**: delete the remote tag (`git push --delete origin
  vX.Y.Z`) only if neither Packagist nor npm has picked it up yet. Otherwise
  treat it as shipped and release a new patch.
