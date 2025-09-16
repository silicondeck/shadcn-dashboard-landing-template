# Next.js Troubleshooting

Common issues and solutions when working with the Next.js version of Shadcn Dashboard + Landing Page Template.

## Development Issues

### Port Already in Use

**Problem:** Port 3000 is already occupied

**Solutions:**

```bash
# Use a different port
pnpm dev -p 3001

# Find and kill the process using the port
lsof -ti:3000 | xargs kill -9

# Or use the PORT environment variable
PORT=3001 pnpm dev
```

### Slow Development Server

**Problem:** Development server is slow to start or reload

**Solutions:**

1. **Enable Turbopack (experimental):**

   ```bash
   pnpm dev --turbo
   ```

2. **Clear Next.js cache:**

   ```bash
   rm -rf .next
   pnpm dev
   ```

3. **Optimize package imports:**

   ```typescript
   // next.config.ts
   const nextConfig = {
     experimental: {
       optimizePackageImports: [
         'lucide-react',
         '@radix-ui/react-icons',
         'recharts',
         '@tanstack/react-table',
       ],
     },
   }
   ```

### Module Resolution Errors

**Problem:** Cannot resolve module imports

**Solutions:**

1. **Check path aliases:**

   ```typescript
   // tsconfig.json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

2. **Verify file extensions:**

   ```typescript
   // Correct imports
   import { Button } from '@/components/ui/button'
   import type { User } from '@/types/user'
   
   // Avoid these
   import { Button } from '@/components/ui/button.tsx' // ❌
   import { User } from '@/types/user.ts' // ❌
   ```

3. **Check Next.js configuration:**

   ```typescript
   // next.config.ts
   const nextConfig = {
     experimental: {
       typedRoutes: true, // Enable typed routes
     },
   }
   ```

### Server and Client Component Issues

**Problem:** Server/Client component boundary errors

**Solutions:**

1. **Add "use client" directive:**

   ```typescript
   // For components using hooks or event handlers
   "use client"
   
   import { useState } from 'react'
   
   export function InteractiveComponent() {
     const [state, setState] = useState()
     // Component logic
   }
   ```

2. **Separate server and client logic:**

   ```typescript
   // server-component.tsx (Server Component)
   import { ClientComponent } from './client-component'
   
   export async function ServerComponent() {
     const data = await fetchData() // Server-side data fetching
     
     return <ClientComponent data={data} />
   }
   
   // client-component.tsx (Client Component)
   "use client"
   
   export function ClientComponent({ data }) {
     const [state, setState] = useState()
     // Client-side logic
   }
   ```

3. **Handle hydration mismatches:**

   ```typescript
   "use client"
   
   import { useEffect, useState } from 'react'
   
   export function HydratedComponent() {
     const [mounted, setMounted] = useState(false)
   
     useEffect(() => {
       setMounted(true)
     }, [])
   
     if (!mounted) {
       return <div>Loading...</div> // Prevent hydration mismatch
     }
   
     return <div>{/* Client-only content */}</div>
   }
   ```

## Build Issues

### TypeScript Compilation Errors

**Problem:** Build fails due to TypeScript errors

**Solutions:**

1. **Run type checking separately:**

   ```bash
   pnpm type-check
   ```

2. **Common type issues:**

   ```typescript
   // Fix Server Component props
   export default function Page({ 
     params 
   }: { 
     params: { id: string } 
   }) {
     return <div>Page {params.id}</div>
   }
   
   // Fix async component types
   export default async function AsyncPage() {
     const data = await fetchData()
     return <div>{data}</div>
   }
   
   // Fix metadata types
   import type { Metadata } from 'next'
   
   export const metadata: Metadata = {
     title: 'Page Title',
   }
   ```

3. **Configure TypeScript strictness:**

   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "strict": true,
       "noUncheckedIndexedAccess": true,
       "exactOptionalPropertyTypes": true
     }
   }
   ```

### Build Memory Issues

**Problem:** Build fails with out-of-memory errors

**Solutions:**

```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" pnpm build

# Or set in package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

### Static Export Issues

**Problem:** Static export fails or pages missing

**Solutions:**

1. **Configure static export properly:**

   ```typescript
   // next.config.ts
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true, // Required for static export
     },
     experimental: {
       missingSuspenseWithCSRBailout: false,
     }
   }
   ```

2. **Handle dynamic routes:**

   ```typescript
   // app/users/[id]/page.tsx
   export async function generateStaticParams() {
     const users = await getUsers()
     
     return users.map((user) => ({
       id: user.id.toString(),
     }))
   }
   ```

3. **Check for server-only features:**

   ```typescript
   // Remove or conditionally render server-only code
   export default function Page() {
     return (
       <div>
         {/* Remove Image optimization for static export */}
         <img src="/image.jpg" alt="Image" />
         
         {/* Remove API routes references */}
         {/* <APIComponent /> */}
       </div>
     )
   }
   ```

## Runtime Issues

### Routing Problems

**Problem:** Routes not working correctly

**Solutions:**

1. **Check file naming conventions:**

   ```bash
   # Correct App Router structure
   app/
   ├── page.tsx          # / route
   ├── about/
   │   └── page.tsx      # /about route
   ├── users/
   │   ├── page.tsx      # /users route
   │   └── [id]/
   │       └── page.tsx  # /users/[id] route
   └── (dashboard)/      # Route group (doesn't affect URL)
       ├── layout.tsx    # Layout for grouped routes
       └── analytics/
           └── page.tsx  # /analytics route
   ```

2. **Fix navigation links:**

   ```typescript
   import Link from 'next/link'
   
   // Use Next.js Link for internal navigation
   <Link href="/dashboard">Dashboard</Link> // ✅
   <a href="/dashboard">Dashboard</a> // ❌ (causes full page reload)
   
   // For external links
   <Link href="https://example.com" target="_blank" rel="noopener noreferrer">
     External
   </Link>
   ```

3. **Handle dynamic routes:**

   ```typescript
   import Link from 'next/link'
   
   // Dynamic route navigation
   <Link href={`/users/${user.id}`}>User Profile</Link>
   
   // Programmatic navigation
   import { useRouter } from 'next/navigation'
   
   function Component() {
     const router = useRouter()
     
     const handleClick = () => {
       router.push(`/users/${userId}`)
     }
   }
   ```

### Font Loading Issues

**Problem:** Fonts not loading or FOUT (Flash of Unstyled Text)

**Solutions:**

1. **Properly configure Next.js fonts:**

   ```typescript
   // lib/fonts.ts
   import { Inter } from 'next/font/google'
   
   export const inter = Inter({
     subsets: ['latin'],
     variable: '--font-inter',
     display: 'swap', // Prevents FOIT
     preload: true,   // Preload for better performance
   })
   
   // app/layout.tsx
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

2. **Add font fallbacks:**

   ```css
   /* app/globals.css */
   :root {
     --font-inter: 'Inter', system-ui, sans-serif;
   }
   
   .font-sans {
     font-family: var(--font-inter);
   }
   ```

3. **Handle custom fonts:**

   ```typescript
   // For local fonts
   import localFont from 'next/font/local'
   
   const customFont = localFont({
     src: './path/to/font.woff2',
     variable: '--font-custom',
     display: 'swap',
   })
   ```

### State Management Issues

**Problem:** Zustand store not working with SSR

**Solutions:**

1. **Handle hydration properly:**

   ```typescript
   import { create } from 'zustand'
   import { persist } from 'zustand/middleware'
   
   const useStore = create<State>()(
     persist(
       (set, get) => ({
         // State and actions
       }),
       {
         name: 'app-storage',
         // Skip hydration on server
         skipHydration: true,
       }
     )
   )
   
   // In component
   export function Component() {
     const store = useStore()
     const [hydrated, setHydrated] = useState(false)
   
     useEffect(() => {
       useStore.persist.rehydrate()
       setHydrated(true)
     }, [])
   
     if (!hydrated) {
       return <div>Loading...</div>
     }
   
     return <div>{store.data}</div>
   }
   ```

2. **Use client-only wrapper:**

   ```typescript
   // components/client-only.tsx
   "use client"
   
   import { useEffect, useState } from 'react'
   
   export function ClientOnly({ children }: { children: React.ReactNode }) {
     const [mounted, setMounted] = useState(false)
   
     useEffect(() => {
       setMounted(true)
     }, [])
   
     if (!mounted) return null
   
     return <>{children}</>
   }
   
   // Usage
   <ClientOnly>
     <StoreComponent />
   </ClientOnly>
   ```

### Image Optimization Issues

**Problem:** Images not loading or optimizing properly

**Solutions:**

1. **Configure Image component properly:**

   ```typescript
   import Image from 'next/image'
   
   // For local images
   import heroImage from '@/public/hero.jpg'
   
   export function Hero() {
     return (
       <Image
         src={heroImage}
         alt="Hero image"
         priority // For above-the-fold images
         placeholder="blur" // Automatic blur placeholder
       />
     )
   }
   
   // For external images
   export function UserAvatar({ src, alt }: { src: string; alt: string }) {
     return (
       <Image
         src={src}
         alt={alt}
         width={40}
         height={40}
         className="rounded-full"
       />
     )
   }
   ```

2. **Configure remote image domains:**

   ```typescript
   // next.config.ts
   const nextConfig = {
     images: {
       remotePatterns: [
         {
           protocol: 'https',
           hostname: 'images.unsplash.com',
         },
         {
           protocol: 'https',
           hostname: 'example.com',
           pathname: '/images/**',
         },
       ],
     },
   }
   ```

3. **Handle image loading errors:**

   ```typescript
   "use client"
   
   import Image from 'next/image'
   import { useState } from 'react'
   
   export function SafeImage({ src, alt, ...props }) {
     const [error, setError] = useState(false)
   
     if (error) {
       return <div className="bg-muted">Image failed to load</div>
     }
   
     return (
       <Image
         src={src}
         alt={alt}
         onError={() => setError(true)}
         {...props}
       />
     )
   }
   ```

## Environment Issues

### Environment Variables Not Working

**Problem:** Environment variables are undefined

**Solutions:**

1. **Check variable naming:**

   ```bash
   # Client-side variables must start with NEXT_PUBLIC_
   NEXT_PUBLIC_API_URL=http://localhost:3001 ✅
   API_URL=http://localhost:3001 ❌ (server-side only)
   ```

2. **Verify file names and loading order:**

   ```bash
   .env                 # Loaded in all environments
   .env.local           # Loaded in all environments (ignored by git)
   .env.development     # Loaded in development
   .env.production      # Loaded in production
   .env.test            # Loaded in test
   ```

3. **Access variables correctly:**

   ```typescript
   // Client-side access
   const apiUrl = process.env.NEXT_PUBLIC_API_URL
   
   // Server-side access
   const dbUrl = process.env.DATABASE_URL
   
   // Runtime validation
   if (!process.env.NEXT_PUBLIC_API_URL) {
     throw new Error('NEXT_PUBLIC_API_URL is required')
   }
   ```

### Deployment Environment Differences

**Problem:** Application works locally but not in production

**Solutions:**

1. **Test production build locally:**

   ```bash
   pnpm build
   pnpm start
   ```

2. **Check environment-specific issues:**

   ```typescript
   // Handle development vs production differences
   const isDevelopment = process.env.NODE_ENV === 'development'
   const isProduction = process.env.NODE_ENV === 'production'
   
   if (isDevelopment) {
     // Development-only code
   }
   
   if (isProduction) {
     // Production-only code
   }
   ```

3. **Verify asset paths:**

   ```typescript
   // Use absolute paths for static assets
   <Image src="/images/logo.png" alt="Logo" width={200} height={50} />
   
   // For dynamic imports
   const Component = dynamic(() => import('@/components/heavy-component'), {
     ssr: false, // Disable SSR if needed
   })
   ```

## Performance Issues

### Slow Page Loads

**Problem:** Pages load slowly

**Solutions:**

1. **Implement proper loading states:**

   ```typescript
   // app/dashboard/loading.tsx
   export default function Loading() {
     return (
       <div className="space-y-4">
         <div className="h-8 bg-muted animate-pulse rounded" />
         <div className="h-32 bg-muted animate-pulse rounded" />
       </div>
     )
   }
   ```

2. **Use dynamic imports for heavy components:**

   ```typescript
   import dynamic from 'next/dynamic'
   
   const HeavyChart = dynamic(() => import('@/components/heavy-chart'), {
     loading: () => <div>Loading chart...</div>,
     ssr: false, // Skip SSR if component is client-only
   })
   ```

3. **Optimize data fetching:**

   ```typescript
   // Use streaming for slow data
   import { Suspense } from 'react'
   
   export default function Page() {
     return (
       <div>
         <h1>Dashboard</h1>
         <Suspense fallback={<div>Loading stats...</div>}>
           <DashboardStats />
         </Suspense>
         <Suspense fallback={<div>Loading charts...</div>}>
           <DashboardCharts />
         </Suspense>
       </div>
     )
   }
   ```

### Bundle Size Issues

**Problem:** Large bundle size affecting performance

**Solutions:**

1. **Analyze bundle size:**

   ```bash
   ANALYZE=true pnpm build
   ```

2. **Optimize imports:**

   ```typescript
   // Tree-shake properly
   import { Button } from '@/components/ui/button' // ✅
   import * as UI from '@/components/ui' // ❌
   
   // Use dynamic imports for large libraries
   const { format } = await import('date-fns')
   ```

3. **Configure bundle optimization:**

   ```typescript
   // next.config.ts
   const nextConfig = {
     experimental: {
       optimizePackageImports: ['lucide-react', 'recharts'],
     },
     webpack: (config) => {
       config.optimization.splitChunks = {
         chunks: 'all',
         cacheGroups: {
           vendor: {
             test: /[\\/]node_modules[\\/]/,
             name: 'vendors',
             chunks: 'all',
           },
         },
       }
       return config
     },
   }
   ```

## Debugging

### Development Debugging

**Problem:** Need to debug application behavior

**Solutions:**

1. **Use Next.js debugging features:**

   ```bash
   # Enable debug mode
   DEBUG=* pnpm dev
   
   # Debug specific modules
   DEBUG=next:* pnpm dev
   ```

2. **Add strategic logging:**

   ```typescript
   // Server Component debugging
   export default async function Page() {
     console.log('Page rendered at:', new Date().toISOString())
     
     const data = await fetchData()
     console.log('Data fetched:', data)
     
     return <div>Page content</div>
   }
   
   // Client Component debugging
   "use client"
   
   export function ClientComponent() {
     useEffect(() => {
       console.log('Component mounted')
     }, [])
   }
   ```

3. **Use React DevTools:**

   ```typescript
   // Add display names for better debugging
   function MyComponent() {
     return <div>Content</div>
   }
   
   MyComponent.displayName = 'MyComponent'
   ```

### Production Debugging

**Problem:** Issues only occur in production

**Solutions:**

1. **Enable source maps:**

   ```typescript
   // next.config.ts
   const nextConfig = {
     productionBrowserSourceMaps: true, // Enable for debugging
   }
   ```

2. **Add error boundaries:**

   ```typescript
   "use client"
   
   import { Component, ErrorInfo, ReactNode } from 'react'
   
   interface Props {
     children: ReactNode
   }
   
   interface State {
     hasError: boolean
   }
   
   export class ErrorBoundary extends Component<Props, State> {
     public state: State = {
       hasError: false
     }
   
     public static getDerivedStateFromError(_: Error): State {
       return { hasError: true }
     }
   
     public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
       console.error('Uncaught error:', error, errorInfo)
       // Send to error reporting service
     }
   
     public render() {
       if (this.state.hasError) {
         return <div>Something went wrong.</div>
       }
   
       return this.props.children
     }
   }
   ```

## Getting Help

### Next.js Resources

- **[Next.js Documentation](https://nextjs.org/docs)** - Official Next.js docs
- **[Next.js Discord](https://discord.gg/nextjs)** - Community support
- **[GitHub Discussions](https://github.com/vercel/next.js/discussions)** - Q&A and discussions

### Debugging Information

When reporting issues, include:

```bash
# System information
node --version
pnpm --version
next --version

# Project information
pnpm list --depth=0

# Build information
pnpm build 2>&1 | tee build.log
```

### Debug Checklist

Before reporting issues:

- [ ] Clear `.next` cache and rebuild
- [ ] Check TypeScript errors with `pnpm type-check`
- [ ] Verify environment variables are set correctly
- [ ] Test with a fresh `pnpm install`
- [ ] Check browser console for errors
- [ ] Test in production build locally

## Next Steps

- **[Development Guide](/nextjs/development)** - Development workflow
- **[Build & Deploy](/nextjs/build-deploy)** - Production deployment
- **[Components](/components/)** - Component library usage
- **[Theme Customizer](/theme-customizer/)** - Theme customization
