# TwigcnBundle

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
- Node.js 20+
- Tailwind CSS 4.0+

## Quick Start

### 1. Install the PHP Bundle

```bash
composer require ducrot/twigcn-bundle
```

### 2. Install the NPM Package

```bash
npm install @ducrot/twigcn-ui
```

### 3. Configure Your CSS

```css
@import "tailwindcss";
@import "@ducrot/twigcn-ui/styles";

/* Scan bundle templates for Tailwind classes */
@source "../vendor/ducrot/twigcn-bundle/templates";
```

### 4. Register Stimulus Controllers

```typescript
import { Application } from '@hotwired/stimulus';
import { registerControllers } from '@ducrot/twigcn-ui';

const app = Application.start();
registerControllers(app);
```

### 5. Use Components

Components from a bundle are namespaced under `Twigcn:` in Twig:

```twig
<twig:Twigcn:Button variant="primary">Click me</twig:Twigcn:Button>

<twig:Twigcn:Button onclick="document.getElementById('my-dialog').showModal()">
    Open Dialog
</twig:Twigcn:Button>

<twig:Twigcn:Dialog id="my-dialog">
    <header>
        <h2>Dialog Title</h2>
        <p>Dialog content here.</p>
    </header>
    <footer>
        <twig:Twigcn:Button variant="outline" onclick="document.getElementById('my-dialog').close()">
            Cancel
        </twig:Twigcn:Button>
        <twig:Twigcn:Button onclick="document.getElementById('my-dialog').close()">
            Confirm
        </twig:Twigcn:Button>
    </footer>
</twig:Twigcn:Dialog>
```

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

## Components

The authoritative component reference (form, layout, overlay, feedback —
including sub-components and PHP/Twig naming notes) lives in the bundle
README: [packages/bundle/README.md](packages/bundle/README.md#available-components).

## Contributing

Issues, feature requests and pull requests belong in this repository:
<https://github.com/ducrot/twigcn/issues>. The subsplit
[`ducrot/twigcn-bundle`](https://github.com/ducrot/twigcn-bundle) is
read-only and its Issues/PRs are intentionally disabled.

Releases are documented in [CHANGELOG.md](CHANGELOG.md); the release
process itself is described in [RELEASING.md](RELEASING.md).

## License

MIT License - see [LICENSE](LICENSE) for details.
