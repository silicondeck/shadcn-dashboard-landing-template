# Vite Troubleshooting

Common issues and solutions when working with the Vite version of Shadcn Dashboard + Landing Page Template.

## Development Issues

### Port Already in Use

**Problem:** Port 5173 is already occupied

**Solutions:**

```bash
# Use a different port
pnpm dev --port 3001

# Find and kill the process using the port
lsof -ti:5173 | xargs kill -9

# Or use a specific port range
pnpm dev --port 5174
```

### Slow Development Server

**Problem:** Development server is slow to start or reload

**Solutions:**

1. **Clear Vite cache:**
   ```bash
   rm -rf node_modules/.vite
   pnpm dev
   ```

2. **Optimize dependencies:**
   ```bash
   pnpm dev --force
   ```

3. **Check large dependencies:**
   ```typescript
   // vite.config.ts - Pre-bundle heavy dependencies
   export default defineConfig({
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
   })
   ```

### Module Resolution Errors

**Problem:** Cannot resolve module imports

**Solutions:**

1. **Check path aliases:**
   ```typescript
   // vite.config.ts
   import path from 'path'
   
   export default defineConfig({
     resolve: {
       alias: {
         '@': path.resolve(__dirname, './src'),
       },
     },
   })
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

3. **Check tsconfig paths:**
   ```json
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

### CSS/Tailwind Issues

**Problem:** Tailwind classes not applying or styles missing

**Solutions:**

1. **Check Tailwind configuration:**
   ```typescript
   // tailwind.config.ts
   import type { Config } from 'tailwindcss'
   
   const config: Config = {
     content: [
       './index.html',
       './src/**/*.{js,ts,jsx,tsx}', // Make sure this matches your file structure
     ],
     // ... rest of config
   }
   ```

2. **Verify CSS imports:**
   ```css
   /* src/index.css */
   @import 'tailwindcss'; /* Make sure this is present */
   
   @layer base {
     /* Your custom styles */
   }
   ```

3. **Check for CSS conflicts:**
   ```typescript
   // Use cn utility for conditional classes
   import { cn } from '@/lib/utils'
   
   function Component({ className }: { className?: string }) {
     return (
       <div className={cn('default-classes', className)}>
         Content
       </div>
     )
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
   // Fix missing types
   npm install @types/react @types/react-dom
   
   // Fix import type issues
   import type { ComponentProps } from 'react' // ✅
   import { ComponentProps } from 'react' // ❌ for types only
   ```

3. **Strict mode issues:**
   ```typescript
   // Handle potential undefined values
   const user = data?.user // ✅
   const name = user?.name ?? 'Unknown' // ✅
   
   // Or disable strict mode temporarily
   // tsconfig.json
   {
     "compilerOptions": {
       "strict": false // Not recommended for production
     }
   }
   ```

### Bundle Size Issues

**Problem:** Bundle size is too large

**Solutions:**

1. **Analyze bundle:**
   ```bash
   pnpm add -D rollup-plugin-visualizer
   
   # Add to vite.config.ts
   import { visualizer } from 'rollup-plugin-visualizer'
   
   export default defineConfig({
     plugins: [
       visualizer({ filename: 'dist/stats.html', open: true })
     ]
   })
   
   pnpm build
   ```

2. **Implement code splitting:**
   ```typescript
   // Lazy load heavy components
   const HeavyChart = lazy(() => import('@/components/heavy-chart'))
   const Dashboard = lazy(() => import('@/app/(dashboard)/page'))
   
   function App() {
     return (
       <Suspense fallback={<div>Loading...</div>}>
         <Routes>
           <Route path="/dashboard" element={<Dashboard />} />
         </Routes>
       </Suspense>
     )
   }
   ```

3. **Optimize dependencies:**
   ```typescript
   // vite.config.ts
   export default defineConfig({
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             router: ['react-router-dom'],
             ui: ['@radix-ui/react-dialog'],
           },
         },
       },
     },
   })
   ```

### Memory Issues During Build

**Problem:** Build fails with out-of-memory errors

**Solutions:**

```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" pnpm build

# Or set in package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' vite build"
  }
}
```

## Runtime Issues

### Routing Problems

**Problem:** Routes not working correctly

**Solutions:**

1. **Check route definitions:**
   ```typescript
   // App.tsx - Ensure routes are properly defined
   function App() {
     return (
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<Navigate to="/dashboard" replace />} />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/analytics" element={<Analytics />} />
           <Route path="*" element={<NotFound />} />
         </Routes>
       </BrowserRouter>
     )
   }
   ```

2. **Fix navigation links:**
   ```typescript
   import { Link } from 'react-router-dom'
   
   // Use Link for internal navigation
   <Link to="/dashboard">Dashboard</Link> // ✅
   <a href="/dashboard">Dashboard</a> // ❌ (causes full page reload)
   ```

3. **Handle nested routes:**
   ```typescript
   // For nested routes with layouts
   <Route path="/" element={<BaseLayout />}>
     <Route index element={<Navigate to="/dashboard" replace />} />
     <Route path="dashboard" element={<Dashboard />} />
     <Route path="settings" element={<Settings />} />
   </Route>
   ```

### State Management Issues

**Problem:** Zustand store not persisting or updating

**Solutions:**

1. **Check store configuration:**
   ```typescript
   import { create } from 'zustand'
   import { persist } from 'zustand/middleware'
   
   const useStore = create<State>()(
     persist(
       (set, get) => ({
         // State and actions
       }),
       {
         name: 'app-storage', // Storage key
         partialize: (state) => ({ 
           // Only persist specific fields
           theme: state.theme 
         }),
       }
     )
   )
   ```

2. **Debug store updates:**
   ```typescript
   // Add logging to actions
   const useStore = create<State>((set, get) => ({
     updateUser: (user) => {
       console.log('Updating user:', user)
       set({ user })
     },
   }))
   ```

3. **Handle hydration issues:**
   ```typescript
   import { useEffect, useState } from 'react'
   
   function Component() {
     const [hydrated, setHydrated] = useState(false)
     const store = useStore()
   
     useEffect(() => {
       setHydrated(true)
     }, [])
   
     if (!hydrated) {
       return <div>Loading...</div>
     }
   
     return <div>{store.data}</div>
   }
   ```

### Theme and Styling Issues

**Problem:** Theme customizer not working or styles not applying

**Solutions:**

1. **Check CSS variable definitions:**
   ```css
   /* src/index.css */
   :root {
     --background: 0 0% 100%;
     --foreground: 222.2 84% 4.9%;
     /* Ensure all required variables are defined */
   }
   
   .dark {
     --background: 222.2 84% 4.9%;
     --foreground: 210 40% 98%;
     /* Dark mode variables */
   }
   ```

2. **Verify theme provider setup:**
   ```typescript
   // main.tsx
   import { ThemeProvider } from '@/components/theme-provider'
   
   ReactDOM.createRoot(document.getElementById('root')!).render(
     <React.StrictMode>
       <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
         <App />
       </ThemeProvider>
     </React.StrictMode>
   )
   ```

3. **Debug theme switching:**
   ```typescript
   import { useTheme } from '@/components/theme-provider'
   
   function Component() {
     const { theme, setTheme } = useTheme()
     
     console.log('Current theme:', theme)
     
     return (
       <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
         Toggle theme
       </button>
     )
   }
   ```

## Performance Issues

### Slow Page Loads

**Problem:** Pages load slowly in development or production

**Solutions:**

1. **Implement lazy loading:**
   ```typescript
   // Split large components
   const Dashboard = lazy(() => import('@/app/(dashboard)/page'))
   const HeavyChart = lazy(() => import('@/components/heavy-chart'))
   
   // Use Suspense with meaningful fallbacks
   <Suspense fallback={<DashboardSkeleton />}>
     <Dashboard />
   </Suspense>
   ```

2. **Optimize images:**
   ```typescript
   // Use appropriate image formats and sizes
   <img 
     src="/images/hero.webp" 
     alt="Hero"
     loading="lazy"
     width={800}
     height={400}
   />
   ```

3. **Preload critical resources:**
   ```html
   <!-- In index.html -->
   <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
   <link rel="preconnect" href="https://fonts.googleapis.com">
   ```

### Memory Leaks

**Problem:** Memory usage increases over time

**Solutions:**

1. **Clean up event listeners:**
   ```typescript
   useEffect(() => {
     const handleResize = () => {
       // Handle resize
     }
     
     window.addEventListener('resize', handleResize)
     
     return () => {
       window.removeEventListener('resize', handleResize)
     }
   }, [])
   ```

2. **Cancel async operations:**
   ```typescript
   useEffect(() => {
     const controller = new AbortController()
     
     fetch('/api/data', { signal: controller.signal })
       .then(response => response.json())
       .then(data => setData(data))
       .catch(error => {
         if (error.name !== 'AbortError') {
           console.error('Fetch error:', error)
         }
       })
     
     return () => {
       controller.abort()
     }
   }, [])
   ```

3. **Avoid memory leaks in timers:**
   ```typescript
   useEffect(() => {
     const interval = setInterval(() => {
       // Update something
     }, 1000)
     
     return () => clearInterval(interval)
   }, [])
   ```

## Environment-Specific Issues

### Environment Variables Not Working

**Problem:** Environment variables are undefined

**Solutions:**

1. **Check variable naming:**
   ```bash
   # Variables must start with VITE_
   VITE_API_URL=http://localhost:3001 ✅
   API_URL=http://localhost:3001 ❌
   ```

2. **Verify file names:**
   ```bash
   .env                # Loaded in all environments
   .env.local          # Loaded in all environments (ignored by git)
   .env.development    # Loaded in development
   .env.production     # Loaded in production
   ```

3. **Check variable usage:**
   ```typescript
   // Access environment variables
   const apiUrl = import.meta.env.VITE_API_URL
   
   // Type-safe access
   interface ImportMetaEnv {
     readonly VITE_API_URL: string
     readonly VITE_APP_NAME: string
   }
   ```

### Production vs Development Differences

**Problem:** Application works in development but not in production

**Solutions:**

1. **Test production build locally:**
   ```bash
   pnpm build
   pnpm preview
   ```

2. **Check for development-only code:**
   ```typescript
   // Remove or conditionally include development tools
   if (import.meta.env.DEV) {
     console.log('Development mode')
   }
   
   // Don't ship with React DevTools
   const isDevelopment = import.meta.env.DEV
   ```

3. **Verify asset paths:**
   ```typescript
   // Use absolute paths for assets
   <img src="/images/logo.png" alt="Logo" /> // ✅
   <img src="./images/logo.png" alt="Logo" /> // ❌ in some deployment scenarios
   ```

## Debugging Tools

### Browser DevTools

1. **React DevTools:**
   - Install React Developer Tools browser extension
   - Inspect component props and state
   - Profile component performance

2. **Vite DevTools:**
   ```bash
   # Enable verbose logging
   DEBUG=vite:* pnpm dev
   
   # Enable HMR debugging
   DEBUG=vite:hmr pnpm dev
   ```

3. **Network tab:**
   - Check for failed resource loads
   - Monitor bundle sizes
   - Verify API calls

### Console Debugging

```typescript
// Add strategic console logs
console.log('Component mounted:', { props, state })
console.log('API response:', data)
console.log('Route changed:', location.pathname)

// Use performance markers
performance.mark('component-start')
// Component logic
performance.mark('component-end')
performance.measure('component-time', 'component-start', 'component-end')
```

## Getting Help

### Community Resources

- **Vite Discord** - Active community support
- **React Community** - General React questions
- **GitHub Issues** - Report template-specific bugs

### Documentation

- **[Vite Documentation](https://vitejs.dev/)** - Official Vite docs
- **[React Router](https://reactrouter.com/)** - Routing documentation
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling documentation
- **[shadcn/ui](https://ui.shadcn.com/)** - Component documentation

### Debug Information

When reporting issues, include:

```bash
# System information
node --version
pnpm --version
vite --version

# Project information
pnpm list --depth=0

# Build/error logs
pnpm build 2>&1 | tee build.log
```

## Next Steps

- **[Development Guide](/vite/development)** - Development workflow
- **[Build & Deploy](/vite/build-deploy)** - Production deployment
- **[Components](/components/)** - Component library usage
- **[Theme Customizer](/theme-customizer/)** - Theme customization
