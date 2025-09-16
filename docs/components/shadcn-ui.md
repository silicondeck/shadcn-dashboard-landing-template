# shadcn/ui Integration

The template comes with shadcn/ui v3 pre-configured and ready to use. This guide covers the configuration, component structure, and how to add new components.

## Installation

The template has shadcn/ui v3 already configured. To add new components:

```bash
# Add individual components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add data-table

# Add multiple components
npx shadcn@latest add button card input
```

## Configuration

The shadcn/ui configuration is stored in `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

## Available Components

### UI Foundation Components

Core building blocks from shadcn/ui v3:

- **Button** - Various button styles and states
- **Input** - Text inputs, search fields, and form controls
- **Card** - Content containers and panels
- **Badge** - Status indicators and labels
- **Avatar** - User profile images and fallbacks
- **Dialog** - Modals and overlays
- **Dropdown Menu** - Context menus and select options
- **Tabs** - Tabbed content navigation
- **Sheet** - Side panels and drawers
- **Tooltip** - Contextual information popups

### Form Components

Complete form handling solution:

- **Form** - React Hook Form integration
- **Select** - Enhanced select dropdowns
- **Checkbox** - Checkbox inputs with indeterminate state
- **Radio Group** - Radio button groups
- **Switch** - Toggle switches
- **Textarea** - Multi-line text inputs
- **Date Picker** - Date and time selection

### Data Display Components

- **Calendar** - Date picker and event display
- **Progress** - Progress bars and indicators
- **Skeleton** - Loading placeholders
- **Accordion** - Collapsible content sections

### Navigation Components

- **Breadcrumb** - Hierarchical navigation paths
- **Pagination** - Page navigation controls
- **Command** - Command palette for quick actions

## Component Structure

All shadcn/ui components follow a consistent pattern:

```typescript
// Example: Button component structure
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

## Form Integration

React Hook Form integration with schema validation:

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
})

function UserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

## Styling and Customization

### CSS Variables

All components use CSS variables for theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
}
```

### Component Variants

Use `class-variance-authority` for component variants:

```typescript
const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border-border",
        destructive: "border-destructive",
        outline: "border-2",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### Custom Styling

Extend components with custom classes:

```typescript
<Button 
  variant="outline" 
  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
>
  Custom Button
</Button>
```

## Accessibility

All shadcn/ui components follow accessibility best practices:

- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Support** - Proper ARIA labels and descriptions
- **Focus Management** - Logical focus order and visible focus indicators
- **Color Contrast** - WCAG AA compliant color combinations

## Performance

Components are optimized for performance:

- **Tree Shaking** - Only import what you use
- **Lazy Loading** - Components load on demand
- **Memoization** - React.memo for expensive components
- **Bundle Splitting** - Automatic code splitting
