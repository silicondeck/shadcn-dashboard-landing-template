# Custom Themes

Learn how to create, manage, and share custom themes for your dashboard and landing page.

## Creating Custom Themes

### Basic Theme Creation

Start with a base theme and customize colors:

```typescript
const myCustomTheme = {
  name: 'Ocean Breeze',
  colors: {
    primary: 'hsl(210, 100%, 50%)',
    primaryForeground: 'hsl(210, 40%, 98%)',
    secondary: 'hsl(210, 50%, 90%)',
    secondaryForeground: 'hsl(210, 84%, 4.9%)',
    accent: 'hsl(25, 100%, 60%)',
    accentForeground: 'hsl(25, 10%, 10%)',
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(222.2, 84%, 4.9%)',
  },
  layout: {
    sidebarWidth: 280,
    headerHeight: 64,
    borderRadius: 8,
  }
}
```

### Advanced Theme Structure

```typescript
interface CustomTheme {
  // Metadata
  name: string
  description?: string
  author?: string
  version?: string
  
  // Color scheme
  colors: {
    [key: string]: string
  }
  
  // Layout configuration
  layout: {
    sidebarWidth: number
    headerHeight: number
    borderRadius: number
    spacing: number
  }
  
  // Typography
  typography: {
    fontFamily: string[]
    fontSize: {
      [size: string]: string
    }
  }
  
  // Component styling
  components: {
    [component: string]: Record<string, any>
  }
}
```

## Theme Export and Import

### Exporting Themes

Save your customizations as a JSON file:

```typescript
const exportTheme = (theme: CustomTheme) => {
  const themeData = {
    ...theme,
    exportedAt: new Date().toISOString(),
    version: '1.0'
  }
  
  const json = JSON.stringify(themeData, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = `${theme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`
  a.click()
  
  URL.revokeObjectURL(url)
}
```

### Importing Themes

Load themes from JSON files:

```typescript
const importTheme = async (file: File): Promise<CustomTheme> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const theme = JSON.parse(e.target?.result as string)
        
        // Validate theme structure
        if (validateTheme(theme)) {
          resolve(theme)
        } else {
          reject(new Error('Invalid theme format'))
        }
      } catch (error) {
        reject(new Error('Failed to parse theme file'))
      }
    }
    
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}
```

### Theme Validation

```typescript
const validateTheme = (theme: any): theme is CustomTheme => {
  // Check required properties
  if (!theme.name || typeof theme.name !== 'string') {
    return false
  }
  
  if (!theme.colors || typeof theme.colors !== 'object') {
    return false
  }
  
  // Validate required colors
  const requiredColors = [
    'primary', 'primaryForeground',
    'secondary', 'secondaryForeground',
    'background', 'foreground'
  ]
  
  for (const color of requiredColors) {
    if (!theme.colors[color]) {
      return false
    }
  }
  
  // Validate color format (HSL)
  const hslRegex = /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/
  for (const [key, value] of Object.entries(theme.colors)) {
    if (typeof value === 'string' && !hslRegex.test(value)) {
      console.warn(`Invalid color format for ${key}: ${value}`)
    }
  }
  
  return true
}
```

## Sharing Themes

### URL-Based Sharing

Share themes via URL parameters:

```typescript
const shareThemeViaURL = (theme: CustomTheme) => {
  const compressed = compressTheme(theme)
  const encoded = encodeURIComponent(compressed)
  const shareUrl = `${window.location.origin}?theme=${encoded}`
  
  // Copy to clipboard
  navigator.clipboard.writeText(shareUrl)
  
  return shareUrl
}

const compressTheme = (theme: CustomTheme): string => {
  // Remove metadata and compress for URL sharing
  const minimal = {
    n: theme.name,
    c: theme.colors,
    l: theme.layout
  }
  
  return btoa(JSON.stringify(minimal))
}
```

### Theme Registry

Create a theme registry for sharing:

```typescript
interface ThemeRegistry {
  [id: string]: {
    theme: CustomTheme
    downloads: number
    rating: number
    tags: string[]
    createdAt: string
  }
}

const themeRegistry: ThemeRegistry = {
  'ocean-breeze': {
    theme: oceanBreezeTheme,
    downloads: 1250,
    rating: 4.8,
    tags: ['blue', 'professional', 'calm'],
    createdAt: '2024-01-15T10:00:00Z'
  },
  'forest-green': {
    theme: forestGreenTheme,
    downloads: 892,
    rating: 4.6,
    tags: ['green', 'nature', 'eco'],
    createdAt: '2024-01-20T14:30:00Z'
  }
}
```

## Pre-built Theme Examples

### Professional Blue Theme

```typescript
const professionalBlue = {
  name: 'Professional Blue',
  description: 'Clean, corporate-friendly blue theme',
  colors: {
    primary: 'hsl(210, 100%, 50%)',
    primaryForeground: 'hsl(210, 40%, 98%)',
    secondary: 'hsl(210, 40%, 96%)',
    secondaryForeground: 'hsl(222.2, 84%, 4.9%)',
    accent: 'hsl(210, 40%, 90%)',
    accentForeground: 'hsl(222.2, 84%, 4.9%)',
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(222.2, 84%, 4.9%)',
    card: 'hsl(0, 0%, 100%)',
    cardForeground: 'hsl(222.2, 84%, 4.9%)',
    muted: 'hsl(210, 40%, 96%)',
    mutedForeground: 'hsl(215.4, 16.3%, 46.9%)',
    border: 'hsl(214.3, 31.8%, 91.4%)',
    input: 'hsl(214.3, 31.8%, 91.4%)',
    ring: 'hsl(210, 100%, 50%)'
  }
}
```

### Dark Elegant Theme

```typescript
const darkElegant = {
  name: 'Dark Elegant',
  description: 'Sophisticated dark theme with purple accents',
  colors: {
    primary: 'hsl(263, 70%, 50%)',
    primaryForeground: 'hsl(210, 40%, 98%)',
    secondary: 'hsl(215, 27.9%, 16.9%)',
    secondaryForeground: 'hsl(210, 40%, 98%)',
    accent: 'hsl(263, 50%, 30%)',
    accentForeground: 'hsl(210, 40%, 98%)',
    background: 'hsl(222.2, 84%, 4.9%)',
    foreground: 'hsl(210, 40%, 98%)',
    card: 'hsl(222.2, 84%, 4.9%)',
    cardForeground: 'hsl(210, 40%, 98%)',
    muted: 'hsl(217.2, 32.6%, 17.5%)',
    mutedForeground: 'hsl(215, 20.2%, 65.1%)',
    border: 'hsl(217.2, 32.6%, 17.5%)',
    input: 'hsl(217.2, 32.6%, 17.5%)',
    ring: 'hsl(263, 70%, 50%)'
  }
}
```

### Warm Sunset Theme

```typescript
const warmSunset = {
  name: 'Warm Sunset',
  description: 'Warm orange and red tones inspired by sunset',
  colors: {
    primary: 'hsl(25, 95%, 53%)',
    primaryForeground: 'hsl(25, 10%, 5%)',
    secondary: 'hsl(25, 40%, 95%)',
    secondaryForeground: 'hsl(25, 80%, 20%)',
    accent: 'hsl(10, 80%, 60%)',
    accentForeground: 'hsl(10, 10%, 5%)',
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(25, 50%, 10%)',
    card: 'hsl(0, 0%, 100%)',
    cardForeground: 'hsl(25, 50%, 10%)',
    muted: 'hsl(25, 30%, 95%)',
    mutedForeground: 'hsl(25, 20%, 50%)',
    border: 'hsl(25, 20%, 85%)',
    input: 'hsl(25, 20%, 85%)',
    ring: 'hsl(25, 95%, 53%)'
  }
}
```

## Theme Management

### Theme Storage

Store themes in localStorage:

```typescript
class ThemeManager {
  private storageKey = 'custom-themes'
  
  saveTheme(theme: CustomTheme): void {
    const themes = this.getStoredThemes()
    themes[theme.name] = theme
    localStorage.setItem(this.storageKey, JSON.stringify(themes))
  }
  
  getStoredThemes(): Record<string, CustomTheme> {
    const stored = localStorage.getItem(this.storageKey)
    return stored ? JSON.parse(stored) : {}
  }
  
  deleteTheme(themeName: string): void {
    const themes = this.getStoredThemes()
    delete themes[themeName]
    localStorage.setItem(this.storageKey, JSON.stringify(themes))
  }
  
  applyTheme(theme: CustomTheme): void {
    // Apply colors as CSS variables
    const root = document.documentElement
    
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
      root.style.setProperty(cssVar, value)
    })
    
    // Apply layout variables
    if (theme.layout) {
      Object.entries(theme.layout).forEach(([key, value]) => {
        const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
        root.style.setProperty(cssVar, typeof value === 'number' ? `${value}px` : value)
      })
    }
  }
}
```

### Theme Switching

Implement smooth theme switching:

```typescript
const switchTheme = async (newTheme: CustomTheme) => {
  // Add transition class for smooth switching
  document.documentElement.classList.add('theme-transitioning')
  
  // Apply new theme
  themeManager.applyTheme(newTheme)
  
  // Wait for transition to complete
  await new Promise(resolve => setTimeout(resolve, 300))
  
  // Remove transition class
  document.documentElement.classList.remove('theme-transitioning')
}

// CSS for smooth transitions
const transitionStyles = `
  .theme-transitioning * {
    transition: background-color 300ms ease, 
                color 300ms ease, 
                border-color 300ms ease !important;
  }
`
```

## Theme Customizer Integration

### Real-time Preview

Integrate with the theme customizer for live preview:

```typescript
const useThemeCustomizer = () => {
  const [currentTheme, setCurrentTheme] = useState<CustomTheme>(defaultTheme)
  const [previewMode, setPreviewMode] = useState(false)
  
  const updateColor = (colorKey: string, value: string) => {
    const updatedTheme = {
      ...currentTheme,
      colors: {
        ...currentTheme.colors,
        [colorKey]: value
      }
    }
    
    setCurrentTheme(updatedTheme)
    
    if (previewMode) {
      themeManager.applyTheme(updatedTheme)
    }
  }
  
  const saveCurrentTheme = () => {
    themeManager.saveTheme(currentTheme)
    setPreviewMode(false)
  }
  
  const resetTheme = () => {
    setCurrentTheme(defaultTheme)
    themeManager.applyTheme(defaultTheme)
  }
  
  return {
    currentTheme,
    updateColor,
    saveCurrentTheme,
    resetTheme,
    previewMode,
    setPreviewMode
  }
}
```

### Theme Builder UI

Create a user-friendly theme builder:

```typescript
function ThemeBuilder() {
  const { currentTheme, updateColor, saveCurrentTheme } = useThemeCustomizer()
  
  return (
    <div className="theme-builder">
      <h2>Theme Builder</h2>
      
      {/* Color Pickers */}
      <div className="color-section">
        <h3>Colors</h3>
        {Object.entries(currentTheme.colors).map(([key, value]) => (
          <div key={key} className="color-input">
            <label>{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</label>
            <input
              type="color"
              value={hslToHex(value)}
              onChange={(e) => updateColor(key, hexToHsl(e.target.value))}
            />
          </div>
        ))}
      </div>
      
      {/* Theme Actions */}
      <div className="theme-actions">
        <button onClick={saveCurrentTheme}>Save Theme</button>
        <button onClick={() => exportTheme(currentTheme)}>Export</button>
      </div>
    </div>
  )
}
```

## Best Practices

### Color Theory

- **Contrast**: Ensure sufficient contrast ratios for accessibility
- **Harmony**: Use complementary or analogous color schemes
- **Consistency**: Maintain color relationships across light and dark modes

### Performance

- **CSS Variables**: Use CSS custom properties for efficient theme switching
- **Minimal Changes**: Only update necessary CSS variables
- **Debouncing**: Debounce rapid theme changes to improve performance

### Accessibility

- **WCAG Compliance**: Follow WCAG 2.1 AA guidelines
- **High Contrast**: Provide high contrast alternatives
- **Color Independence**: Don't rely solely on color to convey information
