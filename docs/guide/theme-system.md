# Theme System

Real-time theme customization with integrated tweakcn support.

## Quick Overview

The template includes a **complete theme customization system** that allows:

- **Live theme editing** with instant preview
- **Color scheme customization** with HSL color picker
- **Layout configuration** (sidebar position, width, headers)
- **Dark/light mode** with system preference detection
- **Export/import** theme configurations
- **CSS variable-based** theming system

## Theme Customizer

Access via the **gear icon** in the header to customize:

### Colors
- Primary, secondary, accent colors
- Background and foreground variants
- Border and muted tones
- Destructive action colors

### Layout
- Sidebar position (left/right)
- Sidebar width and behavior
- Header styles and positioning
- Content spacing and typography

### Modes
- Light/dark mode toggle
- System preference detection
- Automatic theme switching

## Technical Implementation

**CSS Variables**
```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* ... */
}
```

**React Hook**
```typescript
const [config, setConfig] = useTheme()
```

**Customizer Component**
```tsx
<ThemeCustomizer />
```

## Integration

The theme system works through:
- **CSS custom properties** for all colors and spacing
- **Tailwind CSS classes** that reference CSS variables
- **React Context** for theme state management
- **Local storage** for persistence

---

For implementation details, see [Theme Customizer](/theme-customizer/) documentation.
