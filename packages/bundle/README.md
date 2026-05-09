# TwigcnBundle

Beautiful, accessible UI components for Symfony & Twig. Inspired by shadcn/ui, built for Symfony.

## Requirements

- PHP 8.2+
- Symfony 7.0+
- Node.js 20+ (for asset compilation)
- Tailwind CSS 4.0+

## Installation

### Step 1: Install the PHP Bundle

```bash
composer require ducrot/twigcn-bundle
```

The bundle registers automatically via Symfony Flex.

### Step 2: Install the NPM Package

```bash
npm install @ducrot/twigcn-ui
```

### Step 3: Configure Your CSS

Update your main CSS file (e.g., `assets/styles/app.css`):

```css
@import "tailwindcss";
@import "@ducrot/twigcn-ui/styles";

/* IMPORTANT: Scan bundle templates for Tailwind classes */
@source "../vendor/ducrot/twigcn-bundle/templates";

/* Optional: Override theme variables */
:root {
    --primary: #6b5fc3;
    --primary-foreground: #ffffff;
    --radius: 0.5rem;
}
```

### Step 4: Register Stimulus Controllers

**Option A: Automatic (Symfony UX)**

Create or update `assets/controllers.json`:

```json
{
    "controllers": {
        "@ducrot/twigcn-ui": {
            "accordion": { "enabled": true },
            "carousel": { "enabled": true },
            "combobox": { "enabled": true },
            "command": { "enabled": true },
            "custom-select": { "enabled": true },
            "dialog": { "enabled": true },
            "drawer": { "enabled": true },
            "popover": { "enabled": true },
            "slider": { "enabled": true },
            "tabs": { "enabled": true },
            "theme": { "enabled": true },
            "toaster": { "enabled": true },
            "tooltip": { "enabled": true }
        }
    }
}
```

**Option B: Manual Registration**

```typescript
// assets/bootstrap.ts
import { Application } from '@hotwired/stimulus';
import { registerControllers } from '@ducrot/twigcn-ui';

const app = Application.start();
registerControllers(app);
```

## Usage

Use components directly in your Twig templates:

```twig
{# Button #}
<twig:Button variant="primary" size="lg">Click me</twig:Button>

{# Button as link #}
<twig:Button as="a" href="/dashboard" variant="outline">
    Go to Dashboard
</twig:Button>

{# Dialog #}
<twig:Dialog id="confirm-dialog">
    <twig:Button data-action="click->dialog#open">
        Open Dialog
    </twig:Button>
    <template>
        <h2 class="text-lg font-semibold">Confirm Action</h2>
        <p class="text-muted-foreground">Are you sure you want to proceed?</p>
        <div class="flex gap-2 mt-4">
            <twig:Button variant="outline" data-action="click->dialog#close">
                Cancel
            </twig:Button>
            <twig:Button variant="destructive">Confirm</twig:Button>
        </div>
    </template>
</twig:Dialog>

{# Tabs #}
<twig:Tabs defaultValue="account">
    <twig:TabsList>
        <twig:TabsTrigger value="account">Account</twig:TabsTrigger>
        <twig:TabsTrigger value="password">Password</twig:TabsTrigger>
    </twig:TabsList>
    <twig:TabsContent value="account">
        <p>Manage your account settings here.</p>
    </twig:TabsContent>
    <twig:TabsContent value="password">
        <p>Change your password here.</p>
    </twig:TabsContent>
</twig:Tabs>

{# Accordion #}
<twig:Accordion type="single" collapsible>
    <twig:AccordionItem value="item-1" title="Is it accessible?">
        Yes. It adheres to the WAI-ARIA design pattern.
    </twig:AccordionItem>
    <twig:AccordionItem value="item-2" title="Is it styled?">
        Yes. It comes with default styles using Tailwind CSS.
    </twig:AccordionItem>
</twig:Accordion>

{# Form elements #}
<twig:Field>
    <twig:Label for="email">Email</twig:Label>
    <twig:Input type="email" id="email" placeholder="you@example.com" />
</twig:Field>

{# Alerts #}
<twig:Alert variant="destructive">
    <strong>Error!</strong> Something went wrong.
</twig:Alert>
```

## Available Components

### Layout
- `Card` - Container with border and shadow
- `Sidebar` - Collapsible sidebar navigation
- `Tabs` - Tabbed content panels

### Forms
- `Button` - Clickable button with variants
- `Input` - Text input field
- `Textarea` - Multi-line text input
- `Checkbox` - Checkbox input
- `Radio` / `RadioGroup` - Radio buttons
- `Switch` - Toggle switch
- `Select` - Native select dropdown
- `CustomSelect` - Enhanced select with search
- `Combobox` - Autocomplete input
- `Slider` - Range slider
- `Label` - Form label
- `Field` - Form field wrapper

### Feedback
- `Alert` - Alert messages
- `Badge` - Status badges
- `Progress` - Progress bar
- `Skeleton` - Loading placeholder
- `Spinner` - Loading spinner
- `Toast` / `Toaster` - Toast notifications

### Overlays
- `Dialog` - Modal dialog
- `Drawer` - Slide-out panel
- `Popover` - Floating content
- `Tooltip` - Hover tooltip
- `DropdownMenu` - Dropdown menu

### Navigation
- `Breadcrumb` - Breadcrumb navigation
- `Pagination` - Page navigation
- `Command` - Command palette

### Display
- `Accordion` - Collapsible sections
- `Avatar` - User avatar
- `Carousel` - Image carousel
- `Table` - Data table
- `Kbd` - Keyboard key display

## Theming

Components use CSS custom properties for theming. Override these in your CSS:

```css
:root {
    /* Colors */
    --background: #ffffff;
    --foreground: #333333;
    --primary: #6b5fc3;
    --primary-foreground: #ffffff;
    --secondary: #e7e7ea;
    --secondary-foreground: #4e4d58;
    --muted: #ececef;
    --muted-foreground: #6c6b75;
    --accent: #d6d9f0;
    --accent-foreground: #433669;
    --destructive: #ef4444;
    --destructive-foreground: #ffffff;
    --border: #dbdadf;
    --input: #dbdadf;
    --ring: #6b5fc3;

    /* Radius */
    --radius: 0.375rem;
}

/* Dark mode */
.dark {
    --background: #171717;
    --foreground: #e5e5e5;
    /* ... other dark mode overrides */
}
```

## Dark Mode

Toggle dark mode by adding/removing the `dark` class on the `<html>` element:

```twig
<twig:ThemeSwitcher />
```

Or manually:

```javascript
document.documentElement.classList.toggle('dark');
```

## License

MIT License
