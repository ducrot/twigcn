# @ducrot/twigcn-ui

[![CI](https://img.shields.io/github/actions/workflow/status/ducrot/twigcn/tests.yml?branch=main&label=CI&logo=github)](https://github.com/ducrot/twigcn/actions/workflows/tests.yml)
[![npm](https://img.shields.io/npm/v/@ducrot/twigcn-ui.svg?label=npm)](https://www.npmjs.com/package/@ducrot/twigcn-ui)
[![Node](https://img.shields.io/node/v/@ducrot/twigcn-ui.svg)](package.json)
[![License](https://img.shields.io/npm/l/@ducrot/twigcn-ui.svg)](LICENSE)

Stimulus controllers and CSS styles for **TwigcnBundle**.

> **Designed as a companion** to the Symfony bundle
> [`ducrot/twigcn-bundle`](https://packagist.org/packages/ducrot/twigcn-bundle).
> The styles are tuned to the bundle's Twig templates and the controllers
> target the data attributes those templates emit — using this package
> without the bundle requires writing your own Twig markup that mirrors
> those conventions.
>
> Source code, issues and pull requests live in the monorepo
> [`ducrot/twigcn`](https://github.com/ducrot/twigcn).

## Installation

```bash
npm install @ducrot/twigcn-ui
```

## Usage

### Styles

```css
@import "tailwindcss";
@import "@ducrot/twigcn-ui/styles";

/* Scan bundle templates for Tailwind classes */
@source "../vendor/ducrot/twigcn-bundle/templates";
```

### Controllers

**Option A: Register All Controllers**

```typescript
import { Application } from '@hotwired/stimulus';
import { registerControllers } from '@ducrot/twigcn-ui';

const app = Application.start();
registerControllers(app);
```

**Option B: Import Individual Controllers**

```typescript
import { Application } from '@hotwired/stimulus';
import { TabsController, DialogController } from '@ducrot/twigcn-ui/controllers';

const app = Application.start();
app.register('tabs', TabsController);
app.register('dialog', DialogController);
```

**Option C: Symfony UX Integration**

Update `assets/controllers.json`:

```json
{
    "controllers": {
        "@ducrot/twigcn-ui": {
            "tabs": { "enabled": true },
            "dialog": { "enabled": true },
            "drawer": { "enabled": true },
            "drawer-trigger": { "enabled": true }
        }
    }
}
```

## Available Controllers

| Controller | Description |
|------------|-------------|
| `accordion` | Collapsible accordion panels |
| `carousel` | Image/content carousel with navigation |
| `combobox` | Autocomplete input with suggestions |
| `command` | Command palette with keyboard navigation |
| `custom-select` | Enhanced select dropdown |
| `dialog` | Modal dialog with backdrop |
| `drawer` | Slide-out panel (left/right/top/bottom) |
| `drawer-trigger` | Click target that opens an associated drawer via its `for` attribute |
| `popover` | Floating content on trigger |
| `slider` | Range slider input |
| `tabs` | Tabbed content panels |
| `theme` | Dark/light mode toggle |
| `toaster` | Toast notification manager |
| `tooltip` | Hover tooltips |

## Tailwind Preset

The bundle is built for Tailwind 4 with `@import "@ducrot/twigcn-ui/styles"`. For legacy Tailwind 3.x projects, an optional preset is shipped:

```javascript
// tailwind.config.js
export default {
    presets: [require('@ducrot/twigcn-ui/tailwind')],
    // ... your config
}
```

## TypeScript

Full TypeScript support with type definitions:

```typescript
import type { TabsController } from '@ducrot/twigcn-ui/controllers';
```

## License

MIT License
