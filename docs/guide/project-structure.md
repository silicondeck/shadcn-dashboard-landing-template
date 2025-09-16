# Project Structure

File organization and architecture overview.

## Dual-Version Architecture

The template provides identical implementations for both frameworks:

```text
shadcn-dashboard-landing-template/
├── vite-version/           # Vite + React Router
├── nextjs-version/         # Next.js + App Router
└── docs/                   # Documentation
```

**Why Two Versions?**
- **Vite**: Fast SPA development, client-side routing
- **Next.js**: SEO optimization, SSR/SSG capabilities
- **Identical Features**: Same UI components and functionality

## Directory Structure

```text
src/
├── app/                    # Demo pages
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # Dashboard pages
│   ├── (auth)/           # Authentication pages
│   ├── mail/             # Email interface
│   ├── tasks/            # Task management
│   └── settings/         # Settings pages
├── components/           # UI components
│   ├── ui/              # shadcn/ui components
│   ├── layouts/         # Layout components
│   └── theme-customizer/ # Theme system
├── hooks/               # React hooks
├── lib/                 # Utilities
├── types/               # TypeScript definitions
└── config/              # Configuration files
```

## Key Conventions

**File Naming**
- `page.tsx` - Route endpoints (Next.js App Router style)
- `layout.tsx` - Shared layouts
- `PascalCase.tsx` - Component files
- `kebab-case.ts` - Utility files

**Import Aliases**
- `@/components` - UI components
- `@/lib` - Utilities and configs
- `@/hooks` - Custom hooks
- `@/types` - Type definitions

**Framework Differences**
- **Vite**: `App.tsx` with React Router setup
- **Next.js**: File-based routing with App Router
- **Shared**: All UI components and styling

## Data Organization

Demo data is co-located with pages:
```text
dashboard/
├── page.tsx
└── data.json
```

---

For framework-specific details, see [Vite](/vite/) or [Next.js](/nextjs/) guides.
