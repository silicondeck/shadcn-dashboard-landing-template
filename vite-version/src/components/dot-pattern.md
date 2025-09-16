# DotPattern Component

A beautiful radial gradient dot pattern background component that adds elegant visual texture to your layouts.

## Features

- ✨ **Multiple Variants**: Theme-aware, light-only, and dark-only versions
- 📏 **Customizable Size**: Small, medium, and large dot patterns
- 🎨 **Opacity Control**: Low, medium, and high opacity levels
- 🌟 **Fade Effects**: Ellipse, circle, or no fade masking
- 🌓 **Theme Support**: Automatic dark/light mode adaptation

## Usage

### Basic Usage

```tsx
import { DotPattern } from "@/components/dot-pattern"

// Default theme-aware pattern
<div className="relative">
  <DotPattern />
  <div>Your content here</div>
</div>
```

### With Custom Props

```tsx
<div className="relative">
  <DotPattern 
    size="lg" 
    opacity="high" 
    fadeStyle="circle"
    className="z-0"
  />
  <div className="relative z-10">Your content here</div>
</div>
```

### Variant Components

```tsx
import { DotPatternLight, DotPatternDark } from "@/components/dot-pattern"

// Light theme only
<DotPatternLight size="md" opacity="medium" />

// Dark theme only  
<DotPatternDark size="sm" opacity="low" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Dot pattern size (12px, 16px, 20px) |
| `opacity` | `"low" \| "medium" \| "high"` | `"medium"` | Pattern opacity level |
| `fadeStyle` | `"ellipse" \| "circle" \| "none"` | `"ellipse"` | Masking fade effect |

## Size Options

- **Small (`sm`)**: 12px × 12px grid - Subtle, fine texture
- **Medium (`md`)**: 16px × 16px grid - Balanced visibility  
- **Large (`lg`)**: 20px × 20px grid - Bold, prominent pattern

## Opacity Levels

- **Low**: 20-30% opacity - Very subtle background texture
- **Medium**: 40-50% opacity - Noticeable but not overwhelming
- **High**: 60-70% opacity - Strong visual presence

## Fade Styles

- **Ellipse**: Oval-shaped fade from center to edges
- **Circle**: Circular fade from center to edges
- **None**: No masking, full pattern visibility

## Layout Integration

### Section Backgrounds

```tsx
<section className="relative py-24 bg-background">
  <DotPattern opacity="low" fadeStyle="ellipse" />
  <div className="relative container mx-auto">
    <h2>Section Content</h2>
  </div>
</section>
```

### Card Overlays

```tsx
<div className="relative rounded-lg border bg-card p-6">
  <DotPattern 
    size="sm" 
    opacity="low" 
    fadeStyle="circle"
    className="rounded-lg"
  />
  <div className="relative z-10">
    <h3>Card Title</h3>
    <p>Card content...</p>
  </div>
</div>
```

### Hero Section

```tsx
<section className="relative min-h-screen">
  {/* Grid pattern base */}
  <div className="absolute inset-0 bg-grid-pattern" />
  
  {/* Dot pattern overlay */}
  <DotPattern opacity="medium" size="md" />
  
  {/* Content */}
  <div className="relative z-10">
    <h1>Hero Content</h1>
  </div>
</section>
```

## Advanced Usage

### Layered Patterns

```tsx
<div className="relative">
  {/* Base layer */}
  <div className="absolute inset-0 bg-grid-subtle" />
  
  {/* Dot pattern overlay */}
  <DotPattern size="md" opacity="medium" fadeStyle="ellipse" />
  
  {/* Glowing effect */}
  <div className="absolute inset-0 bg-gradient-radial opacity-20" />
  
  <div className="relative z-10">Content</div>
</div>
```

### Responsive Patterns

```tsx
<DotPattern 
  size="sm" 
  opacity="low"
  className="md:opacity-medium lg:size-lg"
/>
```

## Color Customization

### Custom Colors

```tsx
<div 
  className="absolute inset-0 bg-[radial-gradient(#your-color_1px,transparent_1px)] [background-size:16px_16px]"
/>
```

### CSS Variables

```css
:root {
  --dot-color: #e5e7eb;
  --dot-size: 1px;
  --pattern-size: 16px;
}

[data-theme="dark"] {
  --dot-color: #374151;
}
```

## Performance Notes

- Uses CSS `background-image` with `radial-gradient`
- Hardware accelerated when possible
- Minimal performance impact
- Works well with CSS containment

## Browser Support

- Modern browsers with CSS Grid and radial-gradient support
- Graceful degradation in older browsers
- Works with all CSS frameworks

## Examples

### Landing Page Section

```tsx
<section className="relative py-32 bg-background">
  <DotPattern opacity="medium" fadeStyle="ellipse" />
  <div className="relative container mx-auto text-center">
    <h1>Beautiful Landing Page</h1>
    <p>With elegant dot pattern background</p>
  </div>
</section>
```

### Feature Grid

```tsx
<div className="relative grid gap-6 md:grid-cols-3">
  <DotPattern size="sm" opacity="low" />
  {features.map(feature => (
    <div key={feature.id} className="relative bg-card p-6 rounded-lg">
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </div>
  ))}
</div>
```
