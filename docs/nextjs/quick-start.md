# Next.js Quick Start

Get started with the Next.js version of Shadcn Dashboard + Landing Page Template in minutes.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.17.0 or higher)
- **pnpm** (recommended) or npm/yarn
- **Git** (for cloning the repository)

## Installation

### Option 1: Clone Repository

```bash
# Clone the repository
git clone https://github.com/your-username/shadcn-dashboard.git
cd shadcn-dashboard

# Navigate to Next.js version
cd nextjs-version

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Option 2: Use degit (Recommended)

```bash
# Clone only the Next.js version without git history
npx degit your-username/shadcn-dashboard/nextjs-version my-admin-app
cd my-admin-app

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Option 3: Download Manually

1. Download the repository as ZIP from GitHub
2. Extract and navigate to `nextjs-version/`
3. Run `pnpm install`
4. Run `pnpm dev`

## Project Structure

```
nextjs-version/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Dashboard pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── layouts/          # Layout components
│   │   └── ...               # Custom components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Helper utilities
├── public/                   # Static assets
├── components.json           # shadcn/ui configuration
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── package.json             # Dependencies and scripts
```

## Key Features

### Next.js 15 with App Router

- **Server Components** - Optimal performance with RSC
- **File-based routing** - Automatic route generation
- **Nested layouts** - Shared UI components
- **Loading states** - Built-in loading.tsx support
- **Error boundaries** - Automatic error handling

### Development Experience

- **TypeScript** - Full type safety
- **ESLint** - Code quality enforcement
- **Tailwind CSS v4** - Modern utility-first styling
- **shadcn/ui v3** - Latest component library
- **Next.js optimizations** - Image optimization, font loading, etc.

## Development Server

Start the development server:

```bash
pnpm dev
```

The application will be available at:
- **Local**: http://localhost:3000
- **Network**: http://192.168.x.x:3000 (for testing on devices)

### Development Features

- **Hot Module Replacement** - Instant updates
- **Fast Refresh** - Preserves component state
- **TypeScript checking** - Real-time error detection
- **Automatic port detection** - Uses next available port if 3000 is busy

## Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm dev:turbo        # Start with Turbopack (experimental)

# Building
pnpm build            # Create production build
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint errors automatically
pnpm type-check       # Run TypeScript type checking

# Dependencies
pnpm add [package]    # Add new dependency
pnpm update           # Update all dependencies
```

## Environment Configuration

Create environment files in the project root:

### `.env.local` (Development)

```bash
# Application
NEXT_PUBLIC_APP_NAME="ShadcnStore Admin"
NEXT_PUBLIC_APP_DESCRIPTION="Modern admin dashboard template"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3001"

# Feature Flags
NEXT_PUBLIC_THEME_CUSTOMIZER="true"
NEXT_PUBLIC_ANALYTICS="false"

# Database (if using)
DATABASE_URL="postgresql://..."

# Authentication (if using)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

### Environment Variable Access

```typescript
// Client-side access (must be prefixed with NEXT_PUBLIC_)
const apiUrl = process.env.NEXT_PUBLIC_API_URL

// Server-side access (no prefix required)
const dbUrl = process.env.DATABASE_URL
```

## Framework-Specific Features

### App Router Benefits

- **Server-first approach** - Better performance and SEO
- **Streaming** - Progressive page loading
- **Parallel routes** - Complex layouts made simple
- **Intercepting routes** - Modal-like experiences

### File-based Routing

```typescript
// Route structure
src/app/
├── page.tsx                    # / (Home)
├── (dashboard)/               
│   ├── dashboard/
│   │   └── page.tsx           # /dashboard
│   ├── analytics/
│   │   └── page.tsx           # /analytics
│   └── layout.tsx             # Shared dashboard layout
└── (auth)/
    ├── login/
    │   └── page.tsx           # /login
    └── layout.tsx             # Auth layout
```

### Navigation

Use Next.js Link component for optimal performance:

```typescript
import Link from 'next/link'

function Navigation() {
  return (
    <nav>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/analytics">Analytics</Link>
    </nav>
  )
}
```

### Font Optimization

Fonts are optimized using Next.js font system:

```typescript
// src/lib/fonts.ts
import { Inter } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Used in layout.tsx
<html className={inter.variable}>
```

## Initial Setup Steps

After installation, customize your application:

### 1. Update Configuration

```typescript
// next.config.ts - Customize build settings
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
}

// components.json - Verify shadcn/ui settings
{
  "rsc": true,          // Enable React Server Components
  "style": "new-york",  // Choose component style
  "tailwind": {
    "css": "src/app/globals.css"
  }
}
```

### 2. Customize Branding

```typescript
// Update app metadata
// src/app/layout.tsx
export const metadata = {
  title: 'Your App Name',
  description: 'Your app description',
}

// Update theme colors
// src/app/globals.css
:root {
  --primary: 221.2 83.2% 53.3%;    /* Your brand color */
  --secondary: 210 40% 98%;        /* Secondary color */
}
```

### 3. Configure Pages

```typescript
// Add your pages to the sidebar
// src/components/app-sidebar.tsx
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    // Add your custom pages here
  ]
}
```

## Deployment Ready

The Next.js version is optimized for deployment:

- **Static exports** - Can be deployed as static files
- **Server-side rendering** - Full SSR support
- **API routes** - Backend functionality included
- **Image optimization** - Automatic image processing
- **Bundle analysis** - Built-in bundle analyzer

## IDE Setup

### VS Code Extensions

Install these recommended extensions:

- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript Importer**
- **Auto Rename Tag**
- **Prettier**
- **ESLint**

### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## Next Steps

Now that you have the Next.js version running:

1. **[Development Guide](/nextjs/development)** - Learn the development workflow
2. **[Components](/components/)** - Explore the component library
3. **[Theme Customizer](/theme-customizer/)** - Customize the appearance
4. **[Build & Deploy](/nextjs/build-deploy)** - Deploy to production

## Troubleshooting

If you encounter issues:

- **Port in use**: Next.js will automatically use the next available port (3001, 3002, etc.)
- **Module errors**: Run `pnpm install` to ensure all dependencies are installed
- **TypeScript errors**: Run `pnpm type-check` to see detailed type errors
- **Build errors**: Check the **[Troubleshooting Guide](/nextjs/troubleshooting)** for common solutions

## Framework Comparison

| Feature | Next.js Version | Vite Version |
|---------|----------------|--------------|
| **Routing** | File-based App Router | React Router DOM |
| **Performance** | SSR + Static Export | Client-side rendering |
| **Build Speed** | Turbopack (fast) | Vite (very fast) |
| **Bundle Size** | Optimized chunks | Tree-shaking |
| **Deployment** | Vercel optimized | Static hosting |
| **Learning Curve** | Next.js patterns | Standard React |

Choose based on your project needs:
- **Next.js**: Better for SEO, server-side rendering, and full-stack applications
- **Vite**: Better for SPAs, faster development, and client-side applications
