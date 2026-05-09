# TwigcnBundle

UI components for Symfony & Twig, inspired by [shadcn/ui](https://ui.shadcn.com/) and [Basecoat](https://basecoat.dev/).

## Packages

| Package | Description |
|---------|-------------|
| [`ducrot/twigcn-bundle`](packages/bundle) | Symfony bundle with Twig components |
| [`@ducrot/twigcn-ui`](packages/ui) | NPM package with Stimulus controllers & styles |

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

```twig
<twig:Button variant="primary">Click me</twig:Button>

<twig:Dialog id="my-dialog">
    <twig:Button data-action="click->dialog#open">Open</twig:Button>
    <template>
        <h2>Dialog Title</h2>
        <p>Dialog content here.</p>
    </template>
</twig:Dialog>
```

## Development

This is a monorepo using npm workspaces and Composer path repositories.

### Setup

```bash
# Clone the repository
git clone https://github.com/ducrot/twigcn-bundle.git
cd twigcn-bundle
ddev start

# Install npm dependencies
ddev npm ci

# Build the UI package
ddev npm run build

# Start the demo app with DDEV
ddev composer install
ddev npm run dev

```

### Demo App

Visit `https://twigcn.ddev.site/showcase` to see all components in action.

## Components

### Form
Button, Checkbox, Choice Card, Combobox, Field, Input, Input Group, Label, Radio Group, Select, Switch, Textarea

### Layout
Accordion, Breadcrumb, Button Group, Card, Pagination, Sidebar, Table, Tabs

### Overlay
Alert Dialog, Command, Dialog, Drawer, Dropdown Menu, Popover, Tooltip

### Feedback
Alert, Avatar, Badge, Carousel, Empty, Item, Kbd, Progress, Skeleton, Spinner, Theme Switcher, Toast

## License

MIT License - see [LICENSE](LICENSE) for details.
