
# Removing the Theme Customizer

If you want a simpler template or don't need live theme editing, you can safely remove the theme customizer. Follow these steps for both Vite and Next.js versions:

## 1. Remove the Customizer UI

- Delete or comment out the `<ThemeCustomizer />` component from your layout/header/sidebar files.
- Vite: `vite-version/src/components/layouts/base-layout.tsx`, `vite-version/src/components/site-header.tsx`
- Next.js: `nextjs-version/src/components/layouts/base-layout.tsx`, `nextjs-version/src/components/site-header.tsx`

## 2. Remove Customizer Files

- Delete the `theme-customizer/` folder in `src/components/`.
- Optionally, remove `use-theme-manager.ts` from `src/hooks/` if not used elsewhere.

## 3. Clean Up Config

- Remove any references to `theme-customizer` in your config files and navigation/sidebar.
- Update your docs and navigation as needed.

**Note:** The template will still support dark/light mode and basic theming via Tailwind CSS and shadcn/ui, even without the customizer.

## Step-by-Step Removal Process

### Step 1: Remove Component References

Remove the ThemeCustomizer component from your layout files:

```typescript
// Before - src/components/layouts/base-layout.tsx
import { ThemeCustomizer } from '@/components/theme-customizer'

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <SiteHeader />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      <ThemeCustomizer /> {/* Remove this line */}
    </div>
  )
}

// After - Clean layout without customizer
export function BaseLayout({ children }: { children: React.ReactNode }) {
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

### Step 2: Remove Theme Customizer Files

Delete the following files and directories:

```bash
# Remove theme customizer directory
rm -rf src/components/theme-customizer/

# Remove theme manager hook (if not used elsewhere)
rm src/hooks/use-theme-manager.ts

# Remove theme data config (if only used by customizer)
rm src/config/theme-data.ts
```

### Step 3: Remove Dependencies

Remove theme customizer related dependencies:

```bash
# Remove tweakcn and related packages
pnpm remove tweakcn
pnpm remove @tweakcn/core
pnpm remove colord

# Remove other customizer-specific dependencies
pnpm remove react-colorful
pnpm remove color2k
```

### Step 4: Clean Up Imports

Remove any remaining imports in your files:

```typescript
// Remove these imports from files that used the customizer
import { ThemeCustomizer } from '@/components/theme-customizer'
import { useThemeManager } from '@/hooks/use-theme-manager'
import { themeColors } from '@/config/theme-data'
```

### Step 5: Update Navigation

Remove theme customizer from navigation:

```typescript
// Remove from app-sidebar.tsx or navigation config
const navItems = [
  // ... other items
  // Remove: { title: "Theme", url: "/theme", icon: Palette },
]
```

## Alternative: Minimal Theme Support

If you want to keep basic theme switching without the full customizer:

### Keep Dark/Light Mode Toggle

```typescript
// Keep the mode toggle component
import { ModeToggle } from '@/components/mode-toggle'

function Header() {
  return (
    <header>
      {/* Other header content */}
      <ModeToggle />
    </header>
  )
}
```

### Simple Theme Variables

Keep basic CSS variables for theming:

```css
/* globals.css - Keep these for basic theming */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
}
```

## Verification Steps

After removing the theme customizer, verify everything works:

### 1. Build Test

```bash
# Test build in both versions
cd vite-version && pnpm build
cd nextjs-version && pnpm build
```

### 2. Runtime Test

```bash
# Start development server
cd vite-version && pnpm dev
# or
cd nextjs-version && pnpm dev
```

### 3. Check for Errors

- No console errors related to missing theme customizer
- Dark/light mode toggle still works
- All components render correctly
- No broken imports or missing dependencies

## Troubleshooting

### Build Errors

If you encounter build errors after removal:

1. **Missing Imports**: Search for remaining theme customizer imports
2. **Type Errors**: Remove TypeScript references to theme customizer types
3. **CSS Variables**: Ensure basic CSS variables are still defined

### Runtime Issues

**Dark mode not working**: Ensure you kept the basic theme provider and mode toggle

**Styling broken**: Check that essential CSS variables are still defined in your globals.css

**Component errors**: Look for components that still reference removed theme customizer functions

## Benefits After Removal

- **Smaller Bundle Size**: Reduced JavaScript bundle without theme customizer dependencies
- **Simpler Codebase**: Fewer files and dependencies to maintain
- **Faster Build Times**: Less code to compile and bundle
- **Production Ready**: Cleaner production build without development-focused features

The template will continue to work perfectly with shadcn/ui's built-in theming system and Tailwind CSS variables.

Remove any scripts related to theme customization:

```json
{
  "scripts": {
    // Remove these if they exist
    // "theme:export": "tweakcn export",
    // "theme:import": "tweakcn import"
  }
}
```

### Step 5: Remove Theme Hooks

Delete theme-related custom hooks:

```bash
# Remove theme management hooks
rm src/hooks/use-theme-manager.ts
rm src/hooks/use-theme-customizer.ts

# Keep basic theme hook for dark/light mode
# Keep src/hooks/use-theme.ts if you still want dark/light mode
```

### Step 6: Simplify Theme Provider

Keep only basic theme functionality:

```typescript
// src/components/theme-provider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
```

### Step 7: Update Mode Toggle

Simplify the mode toggle to only handle dark/light switching:

```typescript
// src/components/mode-toggle.tsx
'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### Step 8: Remove Settings Pages

If you have theme customizer settings pages, remove them:

```bash
# Remove theme customizer settings
rm -rf src/app/settings/theme/
rm -rf src/app/settings/appearance/

# Or remove the specific page files
rm src/app/settings/theme/page.tsx
rm src/app/settings/appearance/page.tsx
```

### Step 9: Update Navigation

Remove theme customizer links from navigation:

```typescript
// src/components/app-sidebar.tsx
export const sidebarNavItems = [
  // ... other nav items
  {
    title: 'Settings',
    items: [
      {
        title: 'General',
        url: '/settings',
        icon: Settings,
      },
      {
        title: 'Profile',
        url: '/settings/profile',
        icon: User,
      },
      // Remove theme customizer link
      // {
      //   title: 'Theme',
      //   url: '/settings/theme',
      //   icon: Palette,
      // },
    ],
  },
]
```

### Step 10: Clean Up CSS Variables

Keep only essential CSS variables and remove customizer-specific ones:

```css
/* src/index.css or globals.css */
@import 'tailwindcss';

@layer base {
  :root {
    /* Core theme variables */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
    
    /* Remove customizer-specific variables */
    /* --sidebar-width: 280px; */
    /* --header-height: 64px; */
    /* --customizer-panel-width: 320px; */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 94.0%;
  }
}

/* Remove customizer-specific styles */
```

## Alternative: Conditional Inclusion

If you want to keep the theme customizer for development but remove it in production:

### Environment-Based Removal

```typescript
// src/components/layouts/base-layout.tsx
import { ThemeCustomizer } from '@/components/theme-customizer'

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <SiteHeader />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      {/* Only show in development */}
      {process.env.NODE_ENV === 'development' && <ThemeCustomizer />}
    </div>
  )
}
```

### Feature Flag Approach

```typescript
// src/lib/config.ts
export const FEATURES = {
  THEME_CUSTOMIZER: process.env.NEXT_PUBLIC_ENABLE_THEME_CUSTOMIZER === 'true',
}

// src/components/layouts/base-layout.tsx
import { FEATURES } from '@/lib/config'
import { ThemeCustomizer } from '@/components/theme-customizer'

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <SiteHeader />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      {FEATURES.THEME_CUSTOMIZER && <ThemeCustomizer />}
    </div>
  )
}
```

## Bundle Size Impact

Removing the theme customizer can reduce your bundle size by:

- **~50-100KB** of JavaScript (minified + gzipped)
- **~10-20KB** of CSS
- **Faster initial page load** due to fewer components
- **Reduced runtime memory usage**

## Testing After Removal

After removing the theme customizer:

1. **Build the application** to ensure no compilation errors
2. **Test all pages** to verify nothing is broken
3. **Check for console errors** related to missing dependencies
4. **Verify theme switching** still works (if keeping basic mode toggle)
5. **Test responsive behavior** to ensure layout is intact

## Keeping Custom Themes

If you want to keep custom themes without the customizer:

1. **Export your theme** before removing the customizer
2. **Hard-code theme values** in your CSS variables
3. **Create theme variants** as separate CSS classes
4. **Use a theme selector** dropdown instead of the full customizer

```css
/* Example: Hard-coded custom theme */
.theme-ocean {
  --primary: 210 100% 50%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 50% 90%;
  /* ... other colors */
}

.theme-forest {
  --primary: 120 100% 40%;
  --primary-foreground: 120 40% 98%;
  --secondary: 120 50% 90%;
  /* ... other colors */
}
```

## Rollback Plan

If you need to restore the theme customizer:

1. **Restore from git** using `git checkout HEAD~1 -- src/components/theme-customizer/`
2. **Reinstall dependencies** with `pnpm install tweakcn @tweakcn/core`
3. **Re-add component imports** to your layouts
4. **Restore navigation links** and settings pages

## Next Steps

- **[Installation Guide](/guide/installation)** - Set up a fresh installation without customizer
- **[Theme Customizer](/theme-customizer/)** - Learn about the customizer before removing
- **[Customization Guide](/customization/)** - Alternative customization approaches
