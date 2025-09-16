# Next.js Version Guide

The Next.js version of ShadcnStore provides a full-stack React framework with server-side rendering, static generation, and advanced optimization features. This guide covers the Next.js 15 implementation with App Router.

## Overview

The Next.js version is optimized for:

- **Server-side rendering (SSR) and static generation (SSG)**
- **SEO-critical applications**
- **Multi-user platforms and marketing sites**
- **E-commerce integrations**
- **Enterprise applications**
- **Global edge deployment**

## Key Features

### 🔄 Advanced Rendering Options
- Server-side rendering (SSR) for dynamic content
- Static site generation (SSG) for optimal performance
- Incremental static regeneration (ISR)
- Client-side rendering where appropriate

### 🚀 Next.js 15 Features
- App Router with nested layouts
- Server Components by default
- Streaming and Suspense integration
- Built-in performance optimizations
- Edge Runtime support

### 📄 File-Based Routing
- Automatic route generation from file structure
- Nested layouts and loading states
- Error boundaries and not-found pages
- Dynamic routes with parameters

### ⚡ Performance Optimizations
- Automatic code splitting
- Image optimization with next/image
- Font optimization with next/font
- Bundle analyzer and performance monitoring

## Project Structure

```
nextjs-version/
├── src/
│   ├── middleware.ts          # Route middleware
│   ├── app/                   # App Router directory
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx          # Home page
│   │   ├── loading.tsx       # Global loading UI
│   │   ├── not-found.tsx     # 404 page
│   │   ├── globals.css       # Global styles
│   │   ├── (dashboard)/      # Route group for dashboard
│   │   │   ├── layout.tsx    # Dashboard layout
│   │   │   ├── page.tsx      # Dashboard home
│   │   │   ├── analytics/    # Analytics page
│   │   │   └── users/        # Users page
│   │   ├── (auth)/           # Authentication route group
│   │   │   ├── login/        # Login page
│   │   │   └── register/     # Register page
│   │   ├── landing/          # Landing page
│   │   ├── mail/             # Email application
│   │   ├── tasks/            # Task management
│   │   ├── chat/             # Chat application
│   │   ├── calendar/         # Calendar application
│   │   ├── settings/         # Settings pages
│   │   └── api/              # API routes (optional)
│   ├── components/           # Reusable components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── layouts/          # Layout components
│   │   └── theme-customizer/ # Theme customization
│   ├── lib/                  # Utilities and configurations
│   │   ├── fonts.ts          # Font optimization
│   │   └── utils.ts          # Utility functions
│   ├── hooks/                # Custom React hooks
│   ├── types/                # TypeScript definitions
│   └── utils/                # Helper functions
├── public/                   # Static assets
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── components.json          # shadcn/ui configuration
```

## Configuration

### Next.js Configuration

The `next.config.ts` includes optimized settings:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable experimental features
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
  
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  
  // Bundle analyzer (development only)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
          })
        )
      }
      return config
    },
  }),
}

export default nextConfig
```

### Font Optimization

Next.js version uses `next/font` for optimal font loading:

```typescript
// src/lib/fonts.ts
import { Inter } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})
```

Apply fonts in the root layout:

```typescript
// src/app/layout.tsx
import { inter } from '@/lib/fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
```

## App Router Features

### Layouts

Create nested layouts for different sections:

```typescript
// src/app/(dashboard)/layout.tsx
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <SiteHeader />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

### Loading States

Add loading UI for better UX:

```typescript
// src/app/(dashboard)/loading.tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <Skeleton className="h-96" />
    </div>
  )
}
```

### Error Boundaries

Handle errors gracefully:

```typescript
// src/app/(dashboard)/error.tsx
'use client'

import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 space-y-4">
      <div className="flex items-center space-x-2 text-destructive">
        <AlertCircle className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Something went wrong!</h2>
      </div>
      <p className="text-muted-foreground text-center max-w-md">
        {error.message || 'An unexpected error occurred while loading the dashboard.'}
      </p>
      <Button onClick={reset} variant="outline">
        Try again
      </Button>
    </div>
  )
}
```

### Dynamic Routes

Create dynamic routes with parameters:

```typescript
// src/app/(dashboard)/users/[id]/page.tsx
interface UserPageProps {
  params: Promise<{ id: string }>
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params
  
  // Fetch user data (this could be from an API)
  const user = await getUserById(id)
  
  return (
    <div>
      <h1>User Profile: {user.name}</h1>
      {/* User details */}
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: UserPageProps) {
  const { id } = await params
  const user = await getUserById(id)
  
  return {
    title: `${user.name} - User Profile`,
    description: `Profile page for ${user.name}`,
  }
}
```

## Server Components

### Default Server Components

By default, components are Server Components:

```typescript
// src/app/(dashboard)/analytics/page.tsx
import { AnalyticsChart } from '@/components/analytics-chart'
import { getAnalyticsData } from '@/lib/analytics'

// This is a Server Component by default
export default async function AnalyticsPage() {
  // Data fetching happens on the server
  const data = await getAnalyticsData()
  
  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <AnalyticsChart data={data} />
    </div>
  )
}
```

### Client Components

Use `"use client"` for interactive components:

```typescript
// src/components/analytics-chart.tsx
'use client'

import { useState } from 'react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

interface AnalyticsChartProps {
  data: any[]
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  const [timeframe, setTimeframe] = useState('7d')
  
  return (
    <div>
      {/* Interactive chart component */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
```

## Middleware

Implement authentication and route protection:

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check authentication for protected routes
  const isAuthenticated = checkAuth(request)
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard')
  
  // Redirect to login if not authenticated
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  
  // Redirect to dashboard if authenticated user visits auth pages
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

function checkAuth(request: NextRequest) {
  // Implement your authentication logic
  const token = request.cookies.get('auth-token')
  return !!token
}
```

## SEO and Metadata

### Static Metadata

Add SEO metadata to pages:

```typescript
// src/app/(dashboard)/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - ShadcnStore Admin',
  description: 'Comprehensive admin dashboard with analytics and management tools',
  keywords: ['dashboard', 'admin', 'analytics', 'management'],
  openGraph: {
    title: 'Dashboard - ShadcnStore Admin',
    description: 'Comprehensive admin dashboard with analytics and management tools',
    images: ['/og-dashboard.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboard - ShadcnStore Admin',
    description: 'Comprehensive admin dashboard with analytics and management tools',
    images: ['/og-dashboard.png'],
  },
}

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Dashboard content */}
    </div>
  )
}
```

### Dynamic Metadata

Generate metadata dynamically:

```typescript
// src/app/(dashboard)/users/[id]/page.tsx
export async function generateMetadata({ params }: UserPageProps): Promise<Metadata> {
  const { id } = await params
  const user = await getUserById(id)
  
  return {
    title: `${user.name} - User Profile`,
    description: `Profile page for ${user.name}`,
    openGraph: {
      title: `${user.name} - User Profile`,
      description: `Profile page for ${user.name}`,
      images: [user.avatar || '/default-avatar.png'],
    },
  }
}
```

## Performance Optimizations

### Image Optimization

Use Next.js Image component:

```typescript
import Image from 'next/image'

export function UserAvatar({ user }: { user: User }) {
  return (
    <Image
      src={user.avatar}
      alt={`${user.name} avatar`}
      width={40}
      height={40}
      className="rounded-full"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  )
}
```

### Bundle Analysis

Analyze bundle size:

```bash
# Install bundle analyzer
npm install -D @next/bundle-analyzer

# Analyze bundles
ANALYZE=true npm run build
```

### Code Splitting

Implement dynamic imports:

```typescript
import dynamic from 'next/dynamic'

// Lazy load heavy components
const HeavyChart = dynamic(() => import('@/components/heavy-chart'), {
  loading: () => <ChartSkeleton />,
  ssr: false, // Disable SSR for this component
})

export function AnalyticsPage() {
  return (
    <div>
      <h1>Analytics</h1>
      <HeavyChart />
    </div>
  )
}
```

## Next Steps

- **[Quick Start](/nextjs/quick-start)** - Get up and running quickly
- **[Development Guide](/nextjs/development)** - Development workflow
- **[Build & Deploy](/nextjs/build-deploy)** - Production deployment
- **[Troubleshooting](/nextjs/troubleshooting)** - Common issues and solutions
