# Configuration

Detailed configuration options for the theme customizer, including color systems, layout settings, and advanced customization.

## Color System Configuration

The theme system supports comprehensive color customization:

```typescript
interface ColorScheme {
  // Primary brand colors
  primary: string
  primaryForeground: string
  
  // Secondary colors
  secondary: string
  secondaryForeground: string
  
  // Semantic colors
  destructive: string
  constructive: string
  warning: string
  
  // Surface colors
  background: string
  foreground: string
  card: string
  cardForeground: string
  
  // Interactive elements
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  
  // Borders and separators
  border: string
  input: string
  ring: string
}
```

### Configuring Colors

Edit the theme configuration in `src/config/theme-data.ts`:

```typescript
export const themeColors = {
  // Base color palette
  slate: {
    50: "210 40% 98%",
    100: "210 40% 96%",
    200: "214 32% 91%",
    // ... more shades
  },
  
  // Semantic colors
  primary: {
    light: "210 100% 50%",
    dark: "210 100% 60%"
  },
  
  secondary: {
    light: "210 40% 96%",
    dark: "210 40% 16%"
  }
}
```

## Layout Configuration

```typescript
interface LayoutConfig {
  // Sidebar settings
  sidebarWidth: number
  sidebarCollapsedWidth: number
  
  // Header settings
  headerHeight: number
  
  // Spacing
  containerPadding: number
  contentSpacing: number
  
  // Border radius
  borderRadius: number
  
  // Menu layout
  menuLayout: 'vertical' | 'horizontal'
}
```

### Layout Options

Configure layout settings in your theme manager:

```typescript
const layoutConfig = {
  sidebar: {
    width: 280,
    collapsedWidth: 64,
    breakpoint: 768,
  },
  header: {
    height: 64,
    sticky: true,
  },
  content: {
    maxWidth: 1200,
    padding: 24,
  }
}
```

## Typography Configuration

```typescript
interface TypographyConfig {
  // Font families
  fontFamily: {
    sans: string[]
    mono: string[]
  }
  
  // Font sizes
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
  }
  
  // Line heights
  lineHeight: {
    tight: string
    normal: string
    relaxed: string
  }
  
  // Font weights
  fontWeight: {
    normal: string
    medium: string
    semibold: string
    bold: string
  }
}
```

### Font Configuration

Configure typography in your Tailwind config:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
      }
    }
  }
}
```

## Component-Specific Configuration

### Button Configuration

```typescript
const buttonConfig = {
  variants: {
    default: {
      background: 'hsl(var(--primary))',
      foreground: 'hsl(var(--primary-foreground))',
      hover: 'hsl(var(--primary) / 0.9)',
    },
    outline: {
      border: 'hsl(var(--border))',
      background: 'transparent',
      hover: 'hsl(var(--accent))',
    }
  },
  sizes: {
    sm: {
      height: '36px',
      padding: '0 12px',
      fontSize: '14px',
    },
    default: {
      height: '40px',
      padding: '0 16px',
      fontSize: '16px',
    }
  }
}
```

### Card Configuration

```typescript
const cardConfig = {
  base: {
    borderRadius: '8px',
    border: '1px solid hsl(var(--border))',
    background: 'hsl(var(--card))',
    color: 'hsl(var(--card-foreground))',
    shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
  },
  variants: {
    elevated: {
      shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    },
    outlined: {
      border: '2px solid hsl(var(--border))',
      shadow: 'none',
    }
  }
}
```

## Animation Configuration

Control animations and transitions:

```typescript
interface AnimationConfig {
  duration: {
    fast: string
    normal: string
    slow: string
  }
  
  easing: {
    default: string
    bounce: string
    elastic: string
  }
  
  transitions: {
    colors: boolean
    transform: boolean
    opacity: boolean
  }
}
```

### Animation Setup

```typescript
const animationConfig = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  transitions: {
    colors: true,
    transform: true,
    opacity: true,
  }
}
```

## CSS Variables Integration

### Automatic Variable Generation

The theme customizer automatically generates CSS variables:

```css
:root {
  /* Colors */
  --primary: 210 100% 50%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  
  /* Layout */
  --sidebar-width: 280px;
  --header-height: 64px;
  --border-radius: 8px;
  
  /* Animation */
  --transition-duration: 300ms;
  --transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Dark Mode Variables

```css
.dark {
  --primary: 210 100% 60%;
  --primary-foreground: 210 40% 8%;
  --secondary: 210 40% 16%;
  --secondary-foreground: 210 40% 98%;
  
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
}
```

## Environment-Specific Configuration

### Development Configuration

```typescript
const devConfig = {
  enableDevTools: true,
  showGridLines: true,
  debugMode: true,
  hotReload: true,
}
```

### Production Configuration

```typescript
const prodConfig = {
  enableDevTools: false,
  showGridLines: false,
  debugMode: false,
  optimizePerformance: true,
}
```

## Advanced Configuration

### Custom Color Palettes

Create and register custom color palettes:

```typescript
const customPalettes = {
  ocean: {
    name: 'Ocean Blue',
    colors: {
      primary: 'hsl(210, 100%, 50%)',
      secondary: 'hsl(210, 50%, 90%)',
      accent: 'hsl(25, 100%, 60%)',
    }
  },
  forest: {
    name: 'Forest Green',
    colors: {
      primary: 'hsl(120, 60%, 40%)',
      secondary: 'hsl(120, 30%, 90%)',
      accent: 'hsl(45, 100%, 50%)',
    }
  }
}
```

### Theme Validation

Implement theme validation:

```typescript
const validateTheme = (theme: Theme): boolean => {
  // Check required properties
  const requiredColors = ['primary', 'secondary', 'background', 'foreground']
  
  for (const color of requiredColors) {
    if (!theme.colors[color]) {
      console.error(`Missing required color: ${color}`)
      return false
    }
  }
  
  // Validate color format
  const colorRegex = /^hsl\(\d+,?\s*\d+%?,?\s*\d+%?\)$/
  for (const [key, value] of Object.entries(theme.colors)) {
    if (!colorRegex.test(value as string)) {
      console.error(`Invalid color format for ${key}: ${value}`)
      return false
    }
  }
  
  return true
}
```

## Performance Configuration

### Optimization Settings

```typescript
const performanceConfig = {
  // Debounce theme updates
  updateDebounce: 100,
  
  // Batch CSS variable updates
  batchUpdates: true,
  
  // Use requestAnimationFrame for smooth transitions
  useRAF: true,
  
  // Preload common themes
  preloadThemes: ['light', 'dark', 'auto'],
}
```

### Memory Management

```typescript
const memoryConfig = {
  // Maximum number of cached themes
  maxCachedThemes: 10,
  
  // Clear unused themes after timeout
  cleanupTimeout: 5 * 60 * 1000, // 5 minutes
  
  // Use weak references for event listeners
  useWeakRefs: true,
}
```
