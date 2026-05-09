# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TwigcnBundle is a UI component library for Symfony & Twig, inspired by shadcn/ui and Basecoat. It's a monorepo containing:

- **packages/bundle**: PHP Symfony bundle with Twig components
- **packages/ui**: NPM package with Stimulus controllers & styles (@ducrot/twigcn-ui)
- **packages/demo**: Symfony demo application for development/testing

## Common Commands

```bash
# Install dependencies
ddev npm install                    # NPM workspaces (ui + demo)
ddev composer install               # Demo app PHP dependencies (via DDEV)

# Development
ddev npm run dev                    # Start Vite dev server for demo app
ddev npm run build:demo             # Build UI demo app
ddev npm run build                  # Build UI package
ddev npm run typecheck              # Run TypeScript type checking

# Demo app
ddev start                          # Start DDEV environment
# Visit https://twigcn.ddev.site/
```

## Architecture

### Component System
- PHP component classes: `packages/bundle/src/Twig/Components/`
- Twig templates: `packages/bundle/templates/components/`
- Uses `<twig:Twigcn:ComponentName>` syntax via Symfony UX TwigComponent

### Stimulus Controllers
Located in `packages/ui/src/controllers/`:
accordion, carousel, combobox, command, custom-select, dialog, drawer, popover, slider, tabs, theme, toaster, tooltip

### Styling
- Tailwind CSS 4.0+ with shadcn CSS design system
- CSS custom properties for theming (--primary, --background, etc.)
- Dark mode via `.dark` class on `<html>`

### Build System
- Vite 6.x for TypeScript/asset bundling
- NPM workspaces at root level
- Composer path repositories for local bundle development

## Key Patterns

### Adding a New Component
1. Create PHP class in `packages/bundle/src/Twig/Components/`
2. Create Twig template in `packages/bundle/templates/components/`
3. If interactive, add Stimulus controller in `packages/ui/src/controllers/`
4. Export controller in `packages/ui/src/index.ts`

### Component Structure
Components use Symfony UX TwigComponent with `#[AsTwigComponent]` attribute. Templates receive props via component classes.

## Requirements
- PHP 8.2+, Symfony 7.0+
- Node.js 20+, Tailwind CSS 4.0+
- DDEV for local development environment
