# Image3D Component

A reusable 3D image component with hover effects for landing pages and feature sections.

## Features

- ✨ **3D Transform Effects**: Perspective, rotation, and translation on hover
- 🌓 **Theme-aware**: Automatic light/dark mode image switching
- 📱 **Responsive**: Works on all screen sizes
- 🎨 **Customizable**: Direction, styling, and positioning options
- ⚡ **Performance**: Hardware-accelerated transforms and optimized animations

## Usage

```tsx
import { Image3D } from "@/components/image-3d"

// Basic usage
<Image3D
  lightSrc="/image-light.png"
  darkSrc="/image-dark.png"
  alt="Feature description"
/>

// With direction and custom styling
<Image3D
  lightSrc="/feature-1-light.png"
  darkSrc="/feature-1-dark.png"
  alt="Analytics dashboard"
  direction="right"
  className="lg:order-2"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lightSrc` | `string` | - | Image source for light mode |
| `darkSrc` | `string` | - | Image source for dark mode |
| `alt` | `string` | - | Alt text for accessibility |
| `direction` | `"left" \| "right"` | `"left"` | Controls gradient mask direction and shimmer animation |
| `className` | `string` | - | Additional CSS classes |

## Effects Breakdown

### 3D Transform
- **Hover**: `rotate-x-8 rotate-y-12 translate-z-16`
- **Perspective**: Uses `perspective-distant` for proper 3D viewing
- **Transitions**: Smooth 700ms ease-out animations

### Visual Elements
- **Depth Layer**: Subtle background frame for 3D depth
- **Shimmer Effect**: Animated light sweep on hover
- **Content Mask**: Gradient fade for seamless content integration
- **Border Highlights**: Ring effects that intensify on hover

### Theme Integration
- **Auto-switching**: Shows appropriate image based on dark/light mode
- **Border adaptation**: Ring colors adjust to theme
- **Gradient masks**: Blend with current background colors

## Customization

### Direction Options

- **Left** (`direction="left"`): Content fades from left, shimmer moves left to right
- **Right** (`direction="right"`): Content fades from right, shimmer moves right to left

### Styling

The component accepts additional classes through the `className` prop:

```tsx
<Image3D
  lightSrc="/image-light.png"
  darkSrc="/image-dark.png"
  alt="Custom styling"
  className="lg:order-2 xl:max-w-lg"
/>
```

## Implementation Details

### Performance
- Uses CSS `transform-3d` for hardware acceleration
- Optimized with `will-change` implications
- Lazy loading and async decoding for images

### Accessibility
- Proper alt text support
- Respects user motion preferences
- Keyboard navigation friendly

### Browser Support
- Modern browsers with CSS Grid and 3D transforms
- Graceful degradation for older browsers
- Uses Tailwind CSS v4 3D utilities

## Examples

### Feature Section
```tsx
<div className="grid items-center gap-12 lg:grid-cols-2">
  <Image3D
    lightSrc="/dashboard-light.png"
    darkSrc="/dashboard-dark.png"
    alt="Analytics dashboard"
    direction="left"
  />
  <div>
    <h3>Powerful Analytics</h3>
    <p>Feature description...</p>
  </div>
</div>
```

### Gallery Grid
```tsx
<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
  {features.map((feature, index) => (
    <Image3D
      key={index}
      lightSrc={feature.lightImage}
      darkSrc={feature.darkImage}
      alt={feature.title}
      className="aspect-square"
    />
  ))}
</div>
```
