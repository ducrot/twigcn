# TwigcnBundle

[![CI](https://img.shields.io/github/actions/workflow/status/ducrot/twigcn/tests.yml?branch=main&label=CI&logo=github)](https://github.com/ducrot/twigcn/actions/workflows/tests.yml)
[![Packagist](https://img.shields.io/packagist/v/ducrot/twigcn-bundle.svg?label=packagist)](https://packagist.org/packages/ducrot/twigcn-bundle)
[![npm](https://img.shields.io/npm/v/@ducrot/twigcn-ui.svg?label=npm)](https://www.npmjs.com/package/@ducrot/twigcn-ui)
[![PHP](https://img.shields.io/packagist/php-v/ducrot/twigcn-bundle.svg)](composer.json)
[![Node](https://img.shields.io/node/v/@ducrot/twigcn-ui.svg)](packages/ui/package.json)
[![License](https://img.shields.io/github/license/ducrot/twigcn.svg)](LICENSE)

UI components for Symfony & Twig, inspired by [shadcn/ui](https://ui.shadcn.com/) and [Basecoat](https://basecoat.dev/).

This repository is the development hub. It is a monorepo containing the
Symfony bundle, its JS/CSS companion package, and a demo app. The two
distributable packages are published from here to their respective
registries.

## Packages

| Package | Source | Install from |
|---------|--------|--------------|
| [`ducrot/twigcn-bundle`](packages/bundle) | `packages/bundle` | [Packagist](https://packagist.org/packages/ducrot/twigcn-bundle) |
| [`@ducrot/twigcn-ui`](packages/ui) | `packages/ui` | [npm](https://www.npmjs.com/package/@ducrot/twigcn-ui) |

`packages/bundle` is mirrored to the read-only repository
[`ducrot/twigcn-bundle`](https://github.com/ducrot/twigcn-bundle) on every
release tag — that mirror is what Packagist ships from. **All issues and
pull requests belong here**, in `ducrot/twigcn`.

## Requirements

- PHP 8.2+
- Symfony 7.0+
- Node.js 22+
- Tailwind CSS 4.0+

## Getting Started

Installation, asset-pipeline options (AssetMapper + Tailwind CLI, or Vite
via `pentatrion/vite-bundle`), Stimulus registration, theming and the full
component reference live in the [bundle README](packages/bundle/README.md).

The [demo app](packages/demo) under `packages/demo` is a working reference
of the Vite-based setup.

## Development

This is a monorepo using npm workspaces and Composer path repositories.

### Setup

```bash
# Clone the repository
git clone https://github.com/ducrot/twigcn.git
cd twigcn
ddev start

# Install npm dependencies
ddev npm install

# Build the UI package
ddev npm run build

# Start the demo app with DDEV
ddev composer install
ddev npm run dev
```

### Demo App

Visit `https://twigcn.ddev.site/showcase` to see all components in action.

## Contributing

Issues, feature requests and pull requests belong in this repository:
<https://github.com/ducrot/twigcn/issues>. The subsplit
[`ducrot/twigcn-bundle`](https://github.com/ducrot/twigcn-bundle) is
read-only and its Issues/PRs are intentionally disabled.

Releases are documented in [CHANGELOG.md](CHANGELOG.md); the release
process itself is described in [RELEASING.md](RELEASING.md).

## License

MIT License - see [LICENSE](LICENSE) for details.
