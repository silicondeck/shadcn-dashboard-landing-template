# Component Library

The Shadcn Dashboard + Landing Page Template includes a comprehensive component library built on **shadcn/ui v3** with **Radix UI primitives** and **Tailwind CSS v4**. This section covers all available components, their usage patterns, and customization options.

## Overview

The component library is organized into several categories:

### UI Foundation Components
Core building blocks from shadcn/ui v3 including buttons, inputs, cards, dialogs, and other essential interface elements.

### Data Display Components
Advanced components for presenting information such as data tables, charts, calendars, and progress indicators.

### Navigation Components
Purpose-built navigation elements including sidebar, breadcrumbs, pagination, and command palette.

### Form Components
Complete form handling solution with React Hook Form integration, validation, and various input types.

### Layout Components
Structural components for page organization including layouts, headers, footers, and containers.

## Key Features

- **shadcn/ui v3 Integration** - Latest version with improved performance and accessibility
- **TypeScript Support** - Full type safety with excellent developer experience
- **Accessibility First** - WCAG AA compliant with keyboard navigation and screen reader support
- **Customizable** - Easy theming with CSS variables and variant systems
- **Performance Optimized** - Tree shaking, lazy loading, and bundle splitting

## Quick Start

All components are pre-configured and ready to use. Import them directly:

```typescript
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'

function MyComponent() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  )
}
```

## Component Sections

- **[shadcn/ui Integration](/components/shadcn-ui)** - Core UI components and configuration
- **[Data Tables](/components/data-tables)** - Advanced table components with sorting and filtering
- **[Charts](/components/charts)** - Data visualization with Recharts integration
- **[Custom Components](/components/custom-components)** - Template-specific custom components
