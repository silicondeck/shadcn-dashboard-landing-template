# Next.js Development Guide

Comprehensive guide for developing with the Next.js version of Shadcn Dashboard + Landing Page Template.

## Development Workflow

### Setting Up Your Environment

1. **Start the development server:**

   ```bash
   cd nextjs-version
   pnpm dev
   ```

2. **Enable Turbopack (experimental):**

   ```bash
   pnpm dev:turbo
   ```

3. **Open in browser:**

   - Local: <http://localhost:3000>
   - Network: Available on your local IP

### File Structure and Conventions

The Next.js version follows App Router conventions:

```
src/app/
├── layout.tsx              # Root layout (required)
├── page.tsx               # Home page (/)
├── loading.tsx            # Loading UI
├── error.tsx              # Error UI
├── not-found.tsx          # 404 page
├── globals.css            # Global styles
└── (route-groups)/
    ├── (dashboard)/       # Dashboard pages
    │   ├── layout.tsx     # Dashboard layout
    │   ├── dashboard/
    │   │   └── page.tsx   # /dashboard
    │   └── analytics/
    │       └── page.tsx   # /analytics
    └── (auth)/           # Auth pages
        ├── layout.tsx    # Auth layout
        ├── login/
        │   └── page.tsx  # /login
        └── register/
            └── page.tsx  # /register
```

## App Router Features

### Server and Client Components

**Server Components (default):**

```typescript
// app/dashboard/page.tsx
import { DashboardStats } from '@/components/dashboard-stats'

// This is a Server Component by default
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <DashboardStats />
    </div>
  )
}
```

**Client Components (interactive):**

```typescript
// components/dashboard-stats.tsx
"use client"

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'

export function DashboardStats() {
  const [stats, setStats] = useState(null)
  
  useEffect(() => {
    // Client-side logic here
  }, [])

  return (
    <Card>
      {/* Interactive content */}
    </Card>
  )
}
```

### Route Groups and Layouts

**Route Groups:**

Route groups organize files without affecting URL structure:

```
(dashboard)/           # Groups dashboard pages
├── layout.tsx        # Shared layout for dashboard pages
├── dashboard/page.tsx   # /dashboard
└── analytics/page.tsx   # /analytics

(auth)/               # Groups auth pages  
├── layout.tsx        # Shared layout for auth pages
├── login/page.tsx    # /login
└── register/page.tsx # /register
```

**Nested Layouts:**

```typescript
// app/(dashboard)/layout.tsx
import { BaseLayout } from '@/components/layouts/base-layout'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <BaseLayout>
      {children}
    </BaseLayout>
  )
}
```

### Loading and Error States

**Loading UI:**

```typescript
// app/(dashboard)/loading.tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  )
}
```

**Error Boundaries:**

```typescript
// app/(dashboard)/error.tsx
"use client"

import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <h2 className="text-xl font-semibold">Something went wrong!</h2>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
```

## Data Fetching

### Server Components (Recommended)

```typescript
// app/users/page.tsx
import { Card } from '@/components/ui/card'

async function getUsers() {
  const res = await fetch('https://api.example.com/users', {
    next: { revalidate: 3600 } // Revalidate every hour
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch users')
  }
  
  return res.json()
}

export default async function UsersPage() {
  const users = await getUsers()
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Users</h1>
      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

### Client-Side Fetching

```typescript
// components/user-list.tsx
"use client"

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'

export function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users')
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid gap-4">
      {users.map((user) => (
        <Card key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </Card>
      ))}
    </div>
  )
}
```

## Navigation and Routing

### Next.js Link Component

```typescript
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function Navigation() {
  return (
    <nav className="flex space-x-4">
      <Link href="/dashboard">
        <Button variant="ghost">Dashboard</Button>
      </Link>
      
      <Link href="/users" prefetch={false}>
        <Button variant="ghost">Users</Button>
      </Link>
      
      {/* External links */}
      <Link href="https://example.com" target="_blank" rel="noopener noreferrer">
        <Button variant="outline">External</Button>
      </Link>
    </nav>
  )
}
```

### Programmatic Navigation

```typescript
"use client"

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

function LoginForm() {
  const router = useRouter()

  const handleLogin = async (formData: FormData) => {
    // Login logic
    const success = await login(formData)
    
    if (success) {
      router.push('/dashboard')
      router.refresh() // Refresh server components
    }
  }

  return (
    <form action={handleLogin}>
      {/* Form fields */}
      <Button type="submit">Login</Button>
    </form>
  )
}
```

### Active Link Detection

```typescript
"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'px-4 py-2 rounded-md transition-colors',
        isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'hover:bg-muted'
      )}
    >
      {children}
    </Link>
  )
}
```

## API Routes (Optional)

Create API endpoints in the `app/api/` directory:

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Fetch users from database or external API
    const users = await fetchUsers()
    
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const user = await createUser(body)
    
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
```

## State Management

### Zustand with Next.js

```typescript
// hooks/use-user-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
)
```

### Server State with React Query

```typescript
// hooks/use-users.ts
"use client"

import { useQuery } from '@tanstack/react-query'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
```

## Font Optimization

Next.js optimizes fonts automatically:

```typescript
// lib/fonts.ts
import { Inter, Roboto_Mono } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

// app/layout.tsx
import { inter, robotoMono } from '@/lib/fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
```

## Metadata and SEO

### Static Metadata

```typescript
// app/dashboard/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - ShadcnStore Admin',
  description: 'View your dashboard analytics and metrics',
}

export default function DashboardPage() {
  return <div>Dashboard content</div>
}
```

### Dynamic Metadata

```typescript
// app/users/[id]/page.tsx
import type { Metadata } from 'next'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await getUser(params.id)
  
  return {
    title: `${user.name} - User Profile`,
    description: `View profile information for ${user.name}`,
  }
}

export default async function UserPage({ params }: Props) {
  const user = await getUser(params.id)
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
```

## Environment Variables

### Client-Side Variables

Must be prefixed with `NEXT_PUBLIC_`:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=ShadcnStore Admin
```

```typescript
// components/api-client.tsx
const apiUrl = process.env.NEXT_PUBLIC_API_URL

export async function fetchData(endpoint: string) {
  const response = await fetch(`${apiUrl}${endpoint}`)
  return response.json()
}
```

### Server-Side Variables

No prefix required:

```bash
# .env.local
DATABASE_URL=postgresql://username:password@localhost/mydb
JWT_SECRET=your-secret-key
```

```typescript
// lib/database.ts
const dbUrl = process.env.DATABASE_URL
const jwtSecret = process.env.JWT_SECRET
```

## Development Tools

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### ESLint Configuration

```javascript
// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

### Next.js Configuration

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'recharts'
    ],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
```

## Testing

### Jest Configuration

```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(config)
```

### Component Testing

```typescript
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })
})
```

## Performance Optimization

### Code Splitting

```typescript
// Lazy load heavy components
import { lazy, Suspense } from 'react'

const HeavyChart = lazy(() => import('@/components/heavy-chart'))

export default function AnalyticsPage() {
  return (
    <div>
      <h1>Analytics</h1>
      <Suspense fallback={<div>Loading chart...</div>}>
        <HeavyChart />
      </Suspense>
    </div>
  )
}
```

### Image Optimization

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
      priority={false} // Set to true for above-the-fold images
    />
  )
}
```

## Debugging

### Development Debugging

```typescript
// Add debug logging in development
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', { user, settings })
}

// Use Next.js built-in debugging
export default function DebugPage() {
  console.log('Page rendered at:', new Date().toISOString())
  
  return <div>Debug page</div>
}
```

### Error Monitoring

```typescript
// lib/error-reporting.ts
export function reportError(error: Error, context?: any) {
  if (process.env.NODE_ENV === 'production') {
    // Send to error reporting service
    console.error('Error reported:', error, context)
  } else {
    console.error('Development error:', error, context)
  }
}
```

## Hot Reload and Fast Refresh

Next.js Fast Refresh preserves component state during development:

```typescript
// This will preserve state during hot reload
function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

## Common Patterns

### Page Templates

```typescript
// components/page-template.tsx
import { Metadata } from 'next'

interface PageTemplateProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function PageTemplate({ title, description, children }: PageTemplateProps) {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-2">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}

// Usage in pages
export default function UsersPage() {
  return (
    <PageTemplate 
      title="Users" 
      description="Manage your application users"
    >
      <UsersList />
    </PageTemplate>
  )
}
```

## Next Steps

- **[Build & Deploy Guide](/nextjs/build-deploy)** - Production deployment
- **[Troubleshooting](/nextjs/troubleshooting)** - Common issues and solutions
- **[Components](/components/)** - Using the component library
- **[Theme Customizer](/theme-customizer/)** - Customizing the theme
