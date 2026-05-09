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
            "drawer-trigger": { "enabled": true },
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

Components are namespaced under `Twigcn:` in Twig (Symfony UX TwigComponent prefixes third-party bundle components with their bundle namespace):

```twig
{# Button #}
<twig:Twigcn:Button variant="primary" size="lg">Click me</twig:Twigcn:Button>

{# Button as link #}
<twig:Twigcn:Button as="a" href="/dashboard" variant="outline">
    Go to Dashboard
</twig:Twigcn:Button>

{# Dialog (uses the native HTML <dialog> element) #}
<twig:Twigcn:Button onclick="document.getElementById('confirm-dialog').showModal()">
    Open Dialog
</twig:Twigcn:Button>

<twig:Twigcn:Dialog id="confirm-dialog">
    <header>
        <h2 class="text-lg font-semibold">Confirm Action</h2>
        <p class="text-muted-foreground">Are you sure you want to proceed?</p>
    </header>
    <footer>
        <twig:Twigcn:Button variant="outline" onclick="document.getElementById('confirm-dialog').close()">
            Cancel
        </twig:Twigcn:Button>
        <twig:Twigcn:Button variant="destructive" onclick="document.getElementById('confirm-dialog').close()">
            Confirm
        </twig:Twigcn:Button>
    </footer>
</twig:Twigcn:Dialog>

{# Drawer (open via the dedicated DrawerTrigger) #}
<twig:Twigcn:DrawerTrigger for="settings-drawer" class="btn-outline">
    Open Settings
</twig:Twigcn:DrawerTrigger>

<twig:Twigcn:Drawer id="settings-drawer" side="right">
    <twig:Twigcn:DrawerContent>
        <twig:Twigcn:DrawerHeader>
            <h3 class="text-lg font-semibold">Settings</h3>
        </twig:Twigcn:DrawerHeader>
        <div class="p-4">Drawer content goes here.</div>
        <twig:Twigcn:DrawerFooter>
            <twig:Twigcn:DrawerClose class="btn-outline">Close</twig:Twigcn:DrawerClose>
        </twig:Twigcn:DrawerFooter>
    </twig:Twigcn:DrawerContent>
</twig:Twigcn:Drawer>

{# Tabs #}
<twig:Twigcn:Tabs defaultValue="account">
    <twig:Twigcn:TabsList>
        <twig:Twigcn:TabsTrigger value="account">Account</twig:Twigcn:TabsTrigger>
        <twig:Twigcn:TabsTrigger value="password">Password</twig:Twigcn:TabsTrigger>
    </twig:Twigcn:TabsList>
    <twig:Twigcn:TabsContent value="account">
        <p>Manage your account settings here.</p>
    </twig:Twigcn:TabsContent>
    <twig:Twigcn:TabsContent value="password">
        <p>Change your password here.</p>
    </twig:Twigcn:TabsContent>
</twig:Twigcn:Tabs>

{# Accordion #}
<twig:Twigcn:Accordion type="single" collapsible>
    <twig:Twigcn:AccordionItem value="item-1" title="Is it accessible?">
        Yes. It adheres to the WAI-ARIA design pattern.
    </twig:Twigcn:AccordionItem>
    <twig:Twigcn:AccordionItem value="item-2" title="Is it styled?">
        Yes. It comes with default styles using Tailwind CSS.
    </twig:Twigcn:AccordionItem>
</twig:Twigcn:Accordion>

{# Form elements #}
<twig:Twigcn:Field>
    <twig:Twigcn:Label for="email">Email</twig:Twigcn:Label>
    <twig:Twigcn:Input type="email" id="email" placeholder="you@example.com" />
</twig:Twigcn:Field>

{# Alerts #}
<twig:Twigcn:Alert variant="destructive">
    <strong>Error!</strong> Something went wrong.
</twig:Twigcn:Alert>
```

## Available Components

### Form
- `Button` - Clickable button with variants
- `ButtonGroup` - Group of related buttons
- `Checkbox` - Checkbox input
- `ChoiceCard` - Selectable card-style option
- `Combobox` - Autocomplete input with suggestions
- `CustomSelect` - Enhanced select with search
- `Field` - Form field wrapper
- `Form` - Form container
- `Input` - Text input field
- `InputGroup` - Input with prefix/suffix slots
- `Label` - Form label
- `Radio` / `RadioGroup` - Radio buttons
- `Select` - Native select dropdown
- `Slider` - Range slider
- `Switch` - Toggle switch
- `Textarea` - Multi-line text input

### Layout
- `Accordion` / `AccordionItem` - Collapsible sections
- `Breadcrumb` / `BreadcrumbItem` / `BreadcrumbSeparator` - Breadcrumb navigation
- `Card` - Container with border and shadow
- `Pagination` / `PaginationItem` - Page navigation
- `Sidebar` - Collapsible sidebar navigation (with `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`)
- `Table` - Data table
- `Tabs` / `TabsList` / `TabsTrigger` / `TabsContent` - Tabbed content panels

### Overlay
- `Command` - Command palette (with `CommandInput`, `CommandList`, `CommandGroup`, `CommandItem`, `CommandShortcut`, `CommandSeparator`, `CommandEmpty`)
- `Dialog` - Modal dialog (use `:closeOnBackdrop="false"` for alert-dialog behavior)
- `Drawer` - Slide-out panel (with `DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerClose`)
- `DropdownMenu` / `DropdownMenuTrigger` / `DropdownMenuContent` / `DropdownMenuItem` - Dropdown menu
- `Popover` / `PopoverTrigger` / `PopoverContent` - Floating content on trigger
- `Tooltip` - Hover tooltip

### Feedback
- `Alert` - Alert messages
- `Avatar` - User avatar
- `Badge` - Status badges
- `Carousel` - Image/content carousel (with `CarouselContent`, `CarouselItem`, `CarouselNext`, `CarouselPrevious`)
- `Empty` - Empty-state placeholder
- `Item` - Generic content item
- `Kbd` - Keyboard key display
- `Progress` - Progress bar
- `Skeleton` - Loading placeholder
- `Spinner` - Loading spinner
- `ThemeSwitcher` - Dark/light mode toggle
- `Toast` / `Toaster` (with `ToastTitle`, `ToastDescription`, `ToastClose`) - Toast notifications

### Naming Notes

A few PHP class names differ from their Twig component tag because the tag name is reserved or already taken in PHP:

| Twig tag | PHP class |
|----------|-----------|
| `<twig:Twigcn:Empty>` | `EmptyState` |
| `<twig:Twigcn:Switch>` | `SwitchComponent` |
| `<twig:Twigcn:Field>` | `FieldForm` |

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
<twig:Twigcn:ThemeSwitcher />
```

Or manually:

```javascript
document.documentElement.classList.toggle('dark');
```

## License

MIT License
