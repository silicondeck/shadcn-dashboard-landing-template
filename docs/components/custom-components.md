# Custom Components

The template includes several custom components built specifically for the dashboard and landing page. These components extend shadcn/ui with additional functionality and styling.

## Layout Components

### App Sidebar

The main navigation component with collapsible groups and search functionality:

```typescript
import { AppSidebar } from '@/components/app-sidebar'

// Usage in layout
<div className="flex">
  <AppSidebar />
  <main className="flex-1">
    {children}
  </main>
</div>
```

**Features:**
- Collapsible navigation groups
- Active route detection
- Search functionality
- User profile section
- Responsive behavior

**Customization:**
```typescript
// Customize navigation items
const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Analytics", 
    url: "/analytics",
    icon: BarChart3,
  },
]

<AppSidebar items={navigationItems} />
```

### Base Layout

Main application layout wrapper:

```typescript
import { BaseLayout } from '@/components/layouts/base-layout'

function DashboardPage() {
  return (
    <BaseLayout
      title="Dashboard"
      description="Main dashboard overview"
    >
      <div>Your page content</div>
    </BaseLayout>
  )
}
```

### Site Header

Application header with navigation and user menu:

```typescript
import { SiteHeader } from '@/components/site-header'

<SiteHeader 
  showSearch={true}
  showNotifications={true}
  showUserMenu={true}
/>
```

### Site Footer

Application footer with links and information:

```typescript
import { SiteFooter } from '@/components/site-footer'

<SiteFooter 
  showLinks={true}
  showSocial={true}
  compact={false}
/>
```

## UI Components

### Logo Component

Responsive logo with theme support:

```typescript
import { Logo } from '@/components/logo'

// Basic usage
<Logo className="h-8 w-auto" />

// With custom size and variant
<Logo 
  size="lg"
  variant="light"
  className="h-12 w-auto"
/>
```

### Mode Toggle

Dark/light mode switcher:

```typescript
import { ModeToggle } from '@/components/mode-toggle'

// Basic toggle
<ModeToggle />

// With custom styling
<ModeToggle 
  variant="outline"
  size="sm"
  className="border-muted"
/>
```

### Theme Customizer

Real-time theme editing component:

```typescript
import { ThemeCustomizer } from '@/components/theme-customizer'

// Add to your app
<ThemeCustomizer />

// With custom position
<ThemeCustomizer 
  position="bottom-left"
  defaultOpen={false}
/>
```

**Features:**
- Live color preview
- Layout adjustments
- Typography controls
- Export/import themes

### Color Picker

Advanced color picker component:

```typescript
import { ColorPicker } from '@/components/color-picker'

function ThemeEditor() {
  const [primaryColor, setPrimaryColor] = useState('#3b82f6')

  return (
    <ColorPicker
      value={primaryColor}
      onChange={setPrimaryColor}
      label="Primary Color"
      presets={['#3b82f6', '#10b981', '#f59e0b']}
    />
  )
}
```

### Command Search

Command palette for quick actions:

```typescript
import { CommandSearch } from '@/components/command-search'

// Global command palette
<CommandSearch 
  placeholder="Search commands..."
  commands={[
    { id: 'dashboard', label: 'Go to Dashboard', action: () => navigate('/dashboard') },
    { id: 'settings', label: 'Open Settings', action: () => navigate('/settings') },
  ]}
/>
```

## Navigation Components

### Nav Main

Main navigation component for sidebar:

```typescript
import { NavMain } from '@/components/nav-main'

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    items: [
      { title: "Overview", url: "/dashboard" },
      { title: "Analytics", url: "/dashboard/analytics" },
    ]
  },
]

<NavMain items={navItems} />
```

### Nav Secondary

Secondary navigation for additional links:

```typescript
import { NavSecondary } from '@/components/nav-secondary'

const secondaryItems = [
  { title: "Support", url: "/support", icon: HelpCircle },
  { title: "Feedback", url: "/feedback", icon: MessageSquare },
]

<NavSecondary items={secondaryItems} />
```

### Nav User

User profile navigation component:

```typescript
import { NavUser } from '@/components/nav-user'

const user = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/avatars/john.jpg",
}

<NavUser user={user} />
```

## Specialized Components

### Pricing Plans

Pricing table component for landing pages:

```typescript
import { PricingPlans } from '@/components/pricing-plans'

const plans = [
  {
    name: "Starter",
    price: "$9",
    period: "month",
    features: ["Feature 1", "Feature 2"],
    featured: false,
  },
  {
    name: "Pro",
    price: "$29", 
    period: "month",
    features: ["Everything in Starter", "Feature 3", "Feature 4"],
    featured: true,
  },
]

<PricingPlans plans={plans} />
```

### Sidebar Notification

Notification component for sidebar:

```typescript
import { SidebarNotification } from '@/components/sidebar-notification'

<SidebarNotification
  title="New Update Available"
  message="Version 2.0 is now available with new features."
  action="Update Now"
  onAction={() => handleUpdate()}
  variant="info"
/>
```

### Upgrade to Pro Button

Call-to-action button for upgrades:

```typescript
import { UpgradeToProButton } from '@/components/upgrade-to-pro-button'

<UpgradeToProButton 
  variant="default"
  size="sm"
  className="w-full"
/>
```

## Creating Custom Components

### Component Structure

Follow this pattern for new custom components:

```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const customComponentVariants = cva(
  "base-styles",
  {
    variants: {
      variant: {
        default: "default-styles",
        secondary: "secondary-styles",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface CustomComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof customComponentVariants> {
  // Additional props
}

const CustomComponent = React.forwardRef<HTMLDivElement, CustomComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(customComponentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
CustomComponent.displayName = "CustomComponent"

export { CustomComponent, customComponentVariants }
```

### Using Compound Components

Create complex components with multiple parts:

```typescript
// Card with header, content, and footer
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
      {...props}
    />
  )
)

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
)

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)

// Export as compound component
export { Card, CardHeader, CardContent }
```

### Hooks Integration

Create components that use custom hooks:

```typescript
import { useSidebar } from '@/hooks/use-sidebar'

function ResponsiveSidebar() {
  const { isOpen, toggle, isMobile } = useSidebar()

  return (
    <aside className={cn(
      "transition-all duration-300",
      isOpen ? "w-64" : "w-16",
      isMobile && "absolute z-50"
    )}>
      <Button onClick={toggle} variant="ghost" size="icon">
        {isOpen ? <X /> : <Menu />}
      </Button>
      {/* Sidebar content */}
    </aside>
  )
}
```

## Styling Guidelines

### CSS Variables

Use CSS variables for theming:

```css
.custom-component {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}
```

### Responsive Design

Include responsive variants:

```typescript
const responsiveVariants = cva(
  "base-styles",
  {
    variants: {
      responsive: {
        mobile: "text-sm p-2 md:text-base md:p-4",
        tablet: "text-base p-4 lg:text-lg lg:p-6",
        desktop: "text-lg p-6 xl:text-xl xl:p-8",
      },
    },
  }
)
```

### Accessibility

Ensure components are accessible:

```typescript
function AccessibleComponent({ children, ...props }) {
  return (
    <div
      role="region"
      aria-label="Custom component"
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  )
}
```
