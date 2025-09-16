# Installation

Get the template running in under 2 minutes. Choose between Vite (SPA) or Next.js (SSR/SSG) based on your needs.

## Prerequisites

- Node.js 18+ and pnpm (recommended)
- Git for cloning

## Quick Setup

### Vite Version (SPA)

```bash
git clone https://github.com/silicondeck/shadcn-dashboard-landing-template.git
cd shadcn-dashboard-landing-template/vite-version
pnpm install
pnpm dev
```

Open `http://localhost:5173`

### Next.js Version (SSR/SSG)

```bash
git clone https://github.com/silicondeck/shadcn-dashboard-landing-template.git
cd shadcn-dashboard-landing-template/nextjs-version
pnpm install
pnpm dev
```

Open `http://localhost:3000`

## Commands

**Development:**
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview build (Vite)
pnpm start        # Start production server (Next.js)
```

**Code Quality:**
```bash
pnpm lint         # Check for issues
pnpm type-check   # TypeScript validation
```

## Troubleshooting

**Common Issues:**

- **Node version**: Ensure Node.js 18+
- **Port in use**: Use `pnpm dev -- --port 5174` (Vite) or `pnpm dev -p 3001` (Next.js)
- **TypeScript errors**: Run `pnpm install` and restart your editor

**Need help?** Check the [support guide](/guide/support) or join our [Discord](https://discord.com/invite/XEQhPc9a6p).

## Next Steps

- **[Choose Framework](/guide/choosing-framework)** - Understand the differences
- **[Explore Features](/guide/features)** - See what's included
- **[Framework Guide](/vite/)** - Dive into Vite or [Next.js](/nextjs/)
