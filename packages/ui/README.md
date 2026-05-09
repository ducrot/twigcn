# @ducrot/twigcn-ui

Stimulus controllers and CSS styles for [TwigcnBundle](https://github.com/ducrot/twigcn-bundle).

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
