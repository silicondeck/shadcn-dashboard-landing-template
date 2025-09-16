
# Theme Customizer

The Shadcn Dashboard & Landing template includes a powerful, real-time theme customizer built with [tweakcn](https://github.com/silicondeck/tweakcn). It lets you preview and adjust colors, dark/light mode, and UI variables instantly—across both Vite and Next.js versions.

## Key Features

- **Live theme editing**: Change primary, secondary, and accent colors in real time
- **Dark/light mode toggle**: Instantly preview both modes
- **CSS variable integration**: All changes use CSS variables for maximum flexibility
- **Reset & export**: Reset to default or export your theme config
- **Works in both Vite & Next.js**: Unified experience, minor integration differences

## How It Works

- The customizer is available from the dashboard sidebar and landing page header.
- It uses Zustand for state, tweakcn for UI, and updates Tailwind CSS variables on the fly.
- All theme changes are local (no backend required).

## Usage in Vite & Next.js

- **Vite**: See `vite-version/src/components/theme-customizer/` and `vite-version/src/hooks/use-theme-manager.ts`.
- **Next.js**: See `nextjs-version/src/components/theme-customizer/` and `nextjs-version/src/hooks/use-theme-manager.ts`.
- Both versions use the same API and UI, with only minor differences in font loading and SSR handling.

## Quick Start

### Opening the Customizer

The customizer appears as a slide-out panel on the right side of your screen:

```typescript
import { ThemeCustomizer } from '@/components/theme-customizer'

function App() {
  return (
    <div>
      {/* Your app content */}
      <ThemeCustomizer />
    </div>
  )
}
```

### Making Changes

1. **Colors**: Click color swatches in the Theme tab to adjust primary, secondary, and accent colors
2. **Layout**: Use the Layout tab to adjust sidebar width, header height, and spacing
3. **Export**: Save your custom theme configuration for future use

## Related Files

- `src/components/theme-customizer/`
- `src/hooks/use-theme-manager.ts`
- `src/config/theme-data.ts`

## Documentation Sections

- **[Configuration](/theme-customizer/configuration)** - Detailed configuration options and customization
- **[Custom Themes](/theme-customizer/custom-themes)** - Creating and managing custom themes
- **[Removing Customizer](/theme-customizer/removing-customizer)** - Remove the customizer for production

For advanced usage, see the [tweakcn documentation](https://github.com/silicondeck/tweakcn).
