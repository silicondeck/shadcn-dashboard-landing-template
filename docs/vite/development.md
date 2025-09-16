# Vite Development Workflow

Learn how to develop effectively with the Vite version of Shadcn Dashboard + Landing Page Template.

## Development Environment

### Development Server

The Vite development server provides:

- **Lightning-fast HMR** - Changes appear instantly (< 50ms)
- **Source maps** - Debug directly in your original TypeScript files
- **Error overlay** - Clear error messages in the browser
- **Network mode** - Test on mobile devices

```bash
# Start development server
pnpm dev

# Start with custom port
pnpm dev --port 3001

# Start with network access
pnpm dev --host
```

### File Watching

Vite automatically watches and reloads:

- **Component changes** - Instant UI updates
- **Style changes** - CSS hot reloading without page refresh
- **Configuration changes** - Automatic server restart
- **New file creation** - Immediate inclusion in module graph

## Project Structure Deep Dive

### Source Organization

```text
src/
├── App.tsx                    # Main application with routing
├── main.tsx                   # React application entry point
├── index.css                  # Global styles and Tailwind imports
├── app/                       # Page components organized by feature
│   ├── (dashboard)/           # Dashboard route group
│   │   ├── page.tsx          # Main dashboard page
│   │   ├── analytics/        # Analytics page
│   │   └── users/            # Users management
│   ├── (auth)/               # Authentication route group
│   │   ├── login/            # Login page
│   │   └── register/         # Registration page
│   ├── landing/              # Landing page
│   ├── mail/                 # Email application
│   ├── tasks/                # Task management
│   ├── chat/                 # Chat interface
│   ├── calendar/             # Calendar application
│   └── settings/             # Settings pages
├── components/               # Reusable components
│   ├── ui/                   # shadcn/ui base components
│   ├── layouts/              # Layout components
│   ├── router/               # Router utilities and guards
│   └── theme-customizer/     # Theme customization components
├── hooks/                    # Custom React hooks and Zustand stores
├── lib/                      # Utility functions and configurations
├── types/                    # TypeScript type definitions
└── utils/                    # Helper functions
```

### Page Component Pattern

Each page follows a consistent structure:

```typescript
// src/app/(dashboard)/analytics/page.tsx
import { BaseLayout } from '@/components/layouts/base-layout'
import { AnalyticsCharts } from '@/components/analytics-charts'
import { useAnalytics } from '@/hooks/use-analytics'

export default function AnalyticsPage() {
  const { data, isLoading } = useAnalytics()

  if (isLoading) {
    return <AnalyticsPageSkeleton />
  }

  return (
    <BaseLayout 
      title="Analytics" 
      description="View your analytics data and insights"
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Track your performance and insights
          </p>
        </div>
        
        <AnalyticsCharts data={data} />
      </div>
    </BaseLayout>
  )
}
```

## Routing System

### React Router DOM v6

The application uses React Router DOM for client-side routing:

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { BaseLayout } from '@/components/layouts/base-layout'

// Lazy load pages for better performance
const Dashboard = lazy(() => import('@/app/(dashboard)/page'))
const Analytics = lazy(() => import('@/app/(dashboard)/analytics/page'))
const LandingPage = lazy(() => import('@/app/landing/page'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          {/* Public routes */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected routes with layout */}
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            {/* More routes */}
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
```

### Route Protection

Implement authentication guards:

```typescript
// src/components/router/protected-route.tsx
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to login with return URL
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    )
  }

  return <>{children}</>
}
```

## State Management

### Zustand Stores

Use Zustand for global state management:

```typescript
// src/hooks/use-sidebar-config.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarState {
  isCollapsed: boolean
  isMobile: boolean
  setCollapsed: (collapsed: boolean) => void
  setMobile: (mobile: boolean) => void
  toggle: () => void
}

export const useSidebarConfig = create<SidebarState>()(
  persist(
    (set, get) => ({
      isCollapsed: false,
      isMobile: false,
      setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
      setMobile: (mobile) => set({ isMobile: mobile }),
      toggle: () => set({ isCollapsed: !get().isCollapsed }),
    }),
    {
      name: 'sidebar-config',
      partialize: (state) => ({ isCollapsed: state.isCollapsed }),
    }
  )
)
```

### Local Component State

For component-specific state, use React hooks:

```typescript
// Example: Data table with local state
function UsersTable() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [sorting, setSorting] = useState<SortingState>([])
  
  const { data, isLoading } = useUsers({
    search,
    page,
    sorting,
  })

  return (
    <DataTable
      data={data}
      onSearchChange={setSearch}
      onPageChange={setPage}
      onSortingChange={setSorting}
    />
  )
}
```

## Styling and Theming

### Tailwind CSS v4

The project uses Tailwind CSS v4 with the Vite plugin:

```typescript
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind CSS v4 Vite plugin
  ],
})
```

### CSS Variables

Theme colors are defined as CSS variables:

```css
/* src/index.css */
@import 'tailwindcss';

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    /* ... more variables */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark mode variables */
  }
}
```

### Component Styling

Use the `cn` utility for conditional classes:

```typescript
import { cn } from '@/lib/utils'

interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline'
  size?: 'default' | 'sm' | 'lg'
  className?: string
}

function Button({ variant = 'default', size = 'default', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        // Variant styles
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
          'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
          'border border-input bg-background hover:bg-accent': variant === 'outline',
        },
        // Size styles
        {
          'h-10 px-4 py-2': size === 'default',
          'h-9 rounded-md px-3': size === 'sm',
          'h-11 rounded-md px-8': size === 'lg',
        },
        className
      )}
      {...props}
    />
  )
}
```

## Development Tools

### TypeScript Configuration

The project includes strict TypeScript settings:

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### ESLint Configuration

Code quality rules for React and TypeScript:

```javascript
// eslint.config.js
export default [
  {
    extends: [
      'eslint:recommended',
      '@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
    ],
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'prefer-const': 'error',
    },
  },
]
```

### VS Code Integration

Recommended VS Code settings:

```json
// .vscode/settings.json
{
  "typescript.preferences.preferTypeOnlyAutoImports": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true,
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "'([^']*)'"]
  ]
}
```

## Performance Optimization

### Code Splitting

Implement route-based code splitting:

```typescript
// Lazy load pages
const Dashboard = lazy(() => import('@/app/(dashboard)/page'))
const Analytics = lazy(() => import('@/app/(dashboard)/analytics/page'))

// Lazy load heavy components
const HeavyChart = lazy(() => import('@/components/heavy-chart'))

function AnalyticsPage() {
  return (
    <div>
      <h1>Analytics</h1>
      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart />
      </Suspense>
    </div>
  )
}
```

### Bundle Analysis

Analyze your bundle size:

```bash
# Install bundle analyzer
pnpm add -D rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
    }),
  ],
})

# Build and analyze
pnpm build
```

### Optimization Tips

1. **Use React.memo** for expensive components
2. **Implement useMemo** for complex calculations
3. **Use useCallback** for stable function references
4. **Lazy load routes** and heavy components
5. **Optimize images** and use WebP format

## Testing

### Component Testing

Set up Vitest for component testing:

```typescript
// src/components/__tests__/button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '../ui/button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')
  })
})
```

### Setup Testing Environment

```bash
# Install testing dependencies
pnpm add -D vitest @testing-library/react @testing-library/jest-dom

# Add to vite.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

## Debugging

### Browser DevTools

Use React DevTools for debugging:

1. **Install React DevTools** browser extension
2. **Inspect component props** and state
3. **Profile performance** with React Profiler
4. **Debug routing** with React Router DevTools

### Vite DevTools

Vite provides helpful debugging features:

```bash
# Enable debug mode
DEBUG=vite:* pnpm dev

# Verbose logging
pnpm dev --debug

# Force optimize dependencies
pnmp dev --force
```

### Common Debugging Scenarios

**Component not re-rendering:**
- Check if props are properly passed
- Verify state updates are immutable
- Use React DevTools to inspect component tree

**Routing issues:**
- Check route definitions in App.tsx
- Verify navigation links use correct paths
- Check for route conflicts or overlaps

**Style not applying:**
- Verify Tailwind classes are correct
- Check CSS variable definitions
- Use browser DevTools to inspect computed styles

## Next Steps

- **[Build & Deploy](/vite/build-deploy)** - Deploy your application
- **[Troubleshooting](/vite/troubleshooting)** - Common issues and solutions
- **[Components](/components/)** - Learn about the component library
- **[Theme Customizer](/theme-customizer/)** - Customize your theme
