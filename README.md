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

### Form
Button, ButtonGroup, Checkbox, ChoiceCard, Combobox, CustomSelect, Field, Form, Input, InputGroup, Label, Radio, RadioGroup, Select, Slider, Switch, Textarea

### Layout
Accordion, Breadcrumb, Card, Pagination, Sidebar, Table, Tabs

### Overlay
Command, Dialog, Drawer, DropdownMenu, Popover, Tooltip

### Feedback
Alert, Avatar, Badge, Carousel, Empty, Item, Kbd, Progress, Skeleton, Spinner, ThemeSwitcher, Toast / Toaster

## License

MIT License - see [LICENSE](LICENSE) for details.
