# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Both `ducrot/twigcn-bundle` (Composer) and `@ducrot/twigcn-ui` (npm) share the
same version. A single tag `vX.Y.Z` releases both packages.

## [Unreleased]

### Added

- `CONTRIBUTING.md` covering the local DDEV setup, common commands, the
  workflow for adding a new component, the PR checklist, and where to
  report bugs versus security issues.
- `CODE_OF_CONDUCT.md` adopting the Contributor Covenant 2.1 by
  reference, with reports routed to the maintainer mailbox.
- GitHub PR template and Issue templates (bug report, feature request),
  plus a `config.yml` that routes security reports to GitHub Security
  Advisories and questions to Discussions instead of the bug tracker.

### Changed

- Clarified the role of each README across the three audiences (monorepo,
  Packagist, npm). The bundle and ui READMEs now point back to the
  `ducrot/twigcn` monorepo for issues and pull requests; the root README
  explains the monorepo layout and defers component documentation to the
  bundle README.
- Raised the documented consumer Node.js minimum from 20 to 22 (current
  Active LTS) across the root README, the bundle README, and `CLAUDE.md`.
  No `engines` field is enforced — older Node versions may still work
  but are no longer the supported baseline.
- Unified the Node.js version across the dev toolchain to 24: DDEV
  (`nodejs_version`) and the `tests` and `deploy-demo` workflows now
  match `release.yml` and the new `.nvmrc`.
- `RELEASING.md`: removed the outdated Packagist GitHub App step.

### Deprecated

### Removed

### Fixed

### Security

- Added `SECURITY.md` documenting the vulnerability-reporting process via
  GitHub Security Advisories.
- Hardened CI workflows: top-level `permissions: { contents: read }` on
  `release.yml`, `tests.yml`, and `deploy-demo.yml`, with `id-token:
  write` opted in only by the `publish-ui` job that needs it for npm
  Trusted Publishing.
- Added concurrency control to `release.yml` so a duplicate tag push or
  manual re-run cannot race the active release.

## [1.0.0] - 2026-05-10

### Added

- Initial release of `ducrot/twigcn-bundle` (Symfony bundle) and
  `@ducrot/twigcn-ui` (npm package) — UI components for Symfony and Twig
  inspired by shadcn/ui.
- Twig components covering form inputs (Button, Checkbox, Combobox,
  CustomSelect, Field, Form, Input, Label, Radio, Select, Slider, Switch,
  Textarea, …), layout (Accordion, Breadcrumb, Card, Pagination, Sidebar,
  Table, Tabs), overlays (Command, Dialog, Drawer, DropdownMenu, Popover,
  Tooltip) and feedback (Alert, Avatar, Badge, Carousel, Empty, Kbd,
  Progress, Skeleton, Spinner, ThemeSwitcher, Toast/Toaster).
- Stimulus controllers for accordion, carousel, combobox, command,
  custom-select, dialog, drawer, popover, slider, tabs, theme, toaster
  and tooltip.
- Tailwind CSS 4 design system with dark-mode support via `.dark` on
  `<html>`.

[Unreleased]: https://github.com/ducrot/twigcn/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/ducrot/twigcn/releases/tag/v1.0.0
