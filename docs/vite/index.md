# Vite Version Guide

The Vite version of the Shadcn Dashboard + Landing Page Template provides a lightning-fast development experience with React + TypeScript, React Router DOM, and modern build tooling. This guide covers everything you need to know about working with the Vite implementation.

## Overview

The Vite version is optimized for:

- **Single Page Applications (SPA)**
- **Fast development iteration**
- **Admin dashboards and internal tools**
- **Client-side heavy applications**
- **Simple deployment requirements**

## Key Features

### ⚡ Lightning-Fast Development
- Near-instantaneous Hot Module Replacement (HMR)
- Fast cold starts (~50ms)
- Optimized development server

### 📦 Modern Build System
- Vite 5 with Rollup-based production builds
- Tree shaking and code splitting
- TypeScript support out of the box
- ESBuild for fast transpilation

### 🔀 Client-Side Routing
- React Router DOM v6 integration
- Nested routes and layouts
- Protected routes and authentication guards
- Dynamic route loading

### 🎨 UI Framework Integration
- shadcn/ui v3 components
- Tailwind CSS v4 with @tailwindcss/vite plugin
- CSS-in-JS support
- PostCSS processing

## Project Structure

```
vite-version/
├── src/
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   ├── index.css              # Global styles and Tailwind imports
│   ├── app/                   # Demo pages organized by feature
│   │   ├── (dashboard)/       # Dashboard pages group
│   │   ├── (auth)/           # Authentication pages
│   │   ├── landing/          # Landing page
│   │   ├── mail/             # Email application
│   │   ├── tasks/            # Task management
│   │   ├── chat/             # Chat application
│   │   ├── calendar/         # Calendar application
│   │   ├── settings/         # Settings pages
│   │   └── errors/           # Error pages
│   ├── components/           # Reusable components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── layouts/          # Layout components
│   │   ├── router/           # Router utilities
│   │   └── theme-customizer/ # Theme customization
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities and configurations
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Helper functions
├── public/                   # Static assets
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── components.json          # shadcn/ui configuration
```

## Configuration

### Vite Configuration

The `vite.config.ts` file includes optimized settings:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-table',
      'recharts',
      'zustand',
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
})
```

### Tailwind Configuration

Tailwind CSS v4 configuration with custom theme:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        // ... more theme colors
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

## Routing System

### Router Setup

React Router DOM configuration in `App.tsx`:

```typescript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { BaseLayout } from '@/components/layouts/base-layout'

// Page imports
import Dashboard from '@/app/(dashboard)/page'
import Analytics from '@/app/(dashboard)/analytics/page'
import Login from '@/app/(auth)/login/page'
import LandingPage from '@/app/landing/page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes with layout */}
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          {/* More dashboard routes */}
        </Route>
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### Protected Routes

Implement authentication guards:

```typescript
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
```

### Dynamic Route Loading

Implement lazy loading for better performance:

```typescript
import { lazy, Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

// Lazy load pages
const Dashboard = lazy(() => import('@/app/(dashboard)/page'))
const Analytics = lazy(() => import('@/app/(dashboard)/analytics/page'))

// Route with loading state
<Route 
  path="dashboard" 
  element={
    <Suspense fallback={<Skeleton className="h-screen" />}>
      <Dashboard />
    </Suspense>
  } 
/>
```

## Font Loading

The Vite version uses HTML link tags for font loading:

### HTML Setup

In `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Google Fonts preconnect for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    
    <!-- Inter font with optimal character sets -->
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    
    <title>Shadcn Dashboard + Landing Page Template</title>
  </head>
  <body class="font-sans antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### CSS Variables

Font family is applied via CSS variables:

```css
/* src/index.css */
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  --font-inter: 'Inter', system-ui, sans-serif;
}

body {
  font-family: var(--font-inter);
}
```

## State Management

### Zustand Integration

The template uses Zustand for state management:

```typescript
// hooks/use-sidebar-config.ts
import { create } from 'zustand'

interface SidebarConfig {
  isCollapsed: boolean
  isMobile: boolean
  setCollapsed: (collapsed: boolean) => void
  setMobile: (mobile: boolean) => void
}

export const useSidebarConfig = create<SidebarConfig>((set) => ({
  isCollapsed: false,
  isMobile: false,
  setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
  setMobile: (mobile) => set({ isMobile: mobile }),
}))
```

### Theme State

Theme management with persistence:

```typescript
// hooks/use-theme.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeStore {
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
}

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => {
        set({ theme })
        applyTheme(theme)
      },
    }),
    {
      name: 'theme-storage',
    }
  )
)
```

## Next Steps

- **[Quick Start](/vite/quick-start)** - Get up and running quickly
- **[Development Guide](/vite/development)** - Development workflow
- **[Build & Deploy](/vite/build-deploy)** - Production deployment
- **[Troubleshooting](/vite/troubleshooting)** - Common issues and solutions
