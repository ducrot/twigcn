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

   No npm token is needed: `publish-ui` authenticates to npm via OIDC
   ([Trusted Publishing](https://docs.npmjs.com/trusted-publishers)).

### Packagist

1. Submit the bundle once at <https://packagist.org/packages/submit> using
   `https://github.com/ducrot/twigcn-bundle` as the repository URL.
2. Install the *Packagist* GitHub App on `ducrot/twigcn-bundle` so new tags are
   picked up automatically.

### npm

1. Make sure 2FA is on for the account that owns `@ducrot`:
   `npm profile enable-2fa auth-and-writes`.
2. **Publish the very first version manually** — Trusted Publishing cannot be
   used until the package exists on npm
   ([npm/cli#8544](https://github.com/npm/cli/issues/8544)). From a clean
   checkout of the `v1.0.0` tag:
   ```bash
   npm ci
   npm run build --workspace=@ducrot/twigcn-ui
   npm publish --workspace=@ducrot/twigcn-ui
   ```
   You will be prompted for an OTP. `publishConfig.access=public` in
   `packages/ui/package.json` registers the scope as public.
3. **Configure Trusted Publishing on npmjs.com**, once the package exists:
   - Go to <https://www.npmjs.com/package/@ducrot/twigcn-ui/access>.
   - Under *Trusted Publisher* select GitHub Actions and fill in:
     - Organization or user: `ducrot`
     - Repository: `twigcn`
     - Workflow filename: `release.yml` (no path, with extension)
     - Environment name: leave empty
   - Save. Fields are case-sensitive; npm does not validate them — typos only
     surface as opaque 404s during publish.
4. **Recommended**: under *Settings → Publishing access*, switch to
   *Require two-factor authentication and disallow tokens*. This locks the
   package to OIDC + interactive 2FA only.

## First release (v1.0.0)

The very first release of `@ducrot/twigcn-ui` cannot use Trusted Publishing
because the package does not yet exist on npm. Order of operations:

1. Complete *One-time setup* above, including the manual `npm publish` of
   `1.0.0` and configuring the Trusted Publisher.
2. Update `CHANGELOG.md`: rename `[Unreleased]` to `[1.0.0] - YYYY-MM-DD`,
   add a fresh empty `[Unreleased]` block above it, fix the compare links.
3. Commit and tag:
   ```bash
   git add CHANGELOG.md
   git commit -m "release: v1.0.0"
   git tag v1.0.0
   git push && git push --tags
   ```
4. The workflow runs. `split-bundle` succeeds. `publish-ui` will fail with
   *cannot publish over previously published version* — that is expected,
   because you already published `1.0.0` manually in step 1.
5. From `v1.0.1` onwards the workflow is fully automatic.

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
