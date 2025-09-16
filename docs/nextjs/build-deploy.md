# Next.js Build & Deploy

Complete guide for building and deploying the Next.js version of Shadcn Dashboard + Landing Page Template to production.

## Production Build

### Build Process

```bash
# Create production build
pnpm build

# Test production build locally
pnpm start
```

### Build Output

Next.js generates optimized production files:

```bash
.next/
├── static/                 # Static assets with cache-friendly names
│   ├── css/               # Minified CSS files
│   ├── js/                # Minified JavaScript chunks
│   └── media/             # Optimized images and fonts
├── server/                # Server-side code
│   ├── app/               # App Router pages
│   └── chunks/            # Shared code chunks
└── standalone/            # Self-contained deployment (if enabled)
```

### Build Optimization

Configure build optimizations in `next.config.ts`:

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable output file tracing for smaller deployments
  output: 'standalone',
  
  // Optimize package imports to reduce bundle size
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'recharts',
      'react-hook-form',
      '@tanstack/react-table'
    ],
  },
  
  // Configure webpack for additional optimizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Reduce client bundle size
      config.resolve.fallback = {
        fs: false,
        path: false,
      }
    }
    return config
  },
  
  // Image optimization settings
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  // Compression settings
  compress: true,
  
  // Enable experimental features for better performance
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'yourdomain.com']
    },
  },
};

export default nextConfig;
```

### Bundle Analysis

Analyze your bundle size:

```bash
# Install bundle analyzer
pnpm add -D @next/bundle-analyzer

# Add to next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true pnpm build
```

## Environment Configuration

### Production Environment Variables

Create `.env.production`:

```bash
# Application
NEXT_PUBLIC_APP_NAME="ShadcnStore Admin"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"

# API Configuration
NEXT_PUBLIC_API_URL="https://api.yourdomain.com"
DATABASE_URL="postgresql://user:pass@host:5432/dbname"

# Security
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret"
JWT_SECRET="your-jwt-secret"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_ANALYTICS_ENABLED="true"

# Feature flags
NEXT_PUBLIC_THEME_CUSTOMIZER="true"
NEXT_PUBLIC_MAINTENANCE_MODE="false"
```

### Environment Validation

Add runtime environment validation:

```typescript
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  DATABASE_URL: z.string().optional(),
  NEXTAUTH_SECRET: z.string().min(1),
})

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
})
```

## Deployment Platforms

### Vercel (Recommended)

**Automatic Deployment:**

1. **Connect repository to Vercel:**

   ```bash
   # Install Vercel CLI
   pnpm add -g vercel
   
   # Login and deploy
   vercel login
   vercel
   ```

2. **Configure project settings:**
   - Framework: Next.js
   - Build command: `pnpm build`
   - Output directory: `.next`
   - Install command: `pnpm install`

3. **Add environment variables** in Vercel dashboard

4. **Configure domains** in project settings

**Manual Deployment:**

```bash
# Build and deploy
pnpm build
vercel --prod
```

**Vercel Configuration:**

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### Netlify

**Build Configuration:**

```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--version"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[context.production.environment]
  NEXT_PUBLIC_APP_URL = "https://yourdomain.netlify.app"

[context.branch-deploy.environment]
  NEXT_PUBLIC_APP_URL = "https://deploy-preview-$REVIEW_ID--yoursite.netlify.app"
```

**Deploy Steps:**

1. Connect GitHub repository
2. Configure build settings:
   - Build command: `pnpm build`
   - Publish directory: `.next`
3. Add environment variables
4. Deploy

### Docker Deployment

**Dockerfile:**

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN npm install -g pnpm && pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

**Build and Run:**

```bash
# Build Docker image
docker build -t shadcn-admin .

# Run container
docker run -p 3000:3000 shadcn-admin
```

**Docker Compose:**

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_URL=http://localhost:3000
    volumes:
      - ./.env.production:/app/.env.production
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped
```

### Static Export

For static hosting (GitHub Pages, S3, etc.):

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
}

export default nextConfig
```

```bash
# Build static files
pnpm build

# Files will be in 'out' directory
ls out/
```

### Self-Hosted VPS

**Using PM2:**

```bash
# Install PM2
npm install -g pm2

# Create ecosystem file
```

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'shadcn-admin',
      script: 'server.js',
      cwd: '/path/to/app',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/log/pm2/shadcn-admin-error.log',
      out_file: '/var/log/pm2/shadcn-admin-out.log',
      log_file: '/var/log/pm2/shadcn-admin.log',
    },
  ],
}
```

```bash
# Deploy with PM2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

## Performance Optimization

### Lighthouse Optimization

Target scores for production:

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 90+

### Core Web Vitals

Optimize for Core Web Vitals:

```typescript
// lib/performance.ts
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics
    gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    })
  }
}

// app/layout.tsx
import { reportWebVitals } from '@/lib/performance'

export { reportWebVitals }
```

### Image Optimization

```typescript
// components/optimized-image.tsx
import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}
```

### Font Optimization

```typescript
// lib/fonts.ts
import { Inter } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})
```

## Monitoring and Analytics

### Error Monitoring

**Sentry Integration:**

```bash
pnpm add @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
})

// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

### Performance Monitoring

```typescript
// lib/monitoring.ts
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GA_ID) {
    gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_location: url,
    })
  }
}

export function trackEvent(action: string, category: string, label?: string) {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GA_ID) {
    gtag('event', action, {
      event_category: category,
      event_label: label,
    })
  }
}
```

## Security

### Security Headers

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
        ],
      },
    ]
  },
}
```

### Content Security Policy

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add CSP header
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  )

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

## CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run linting
        run: pnpm lint
      
      - name: Run type checking
        run: pnpm type-check
      
      - name: Run tests
        run: pnpm test
      
      - name: Build application
        run: pnpm build
        env:
          NEXT_PUBLIC_APP_URL: ${{ secrets.NEXT_PUBLIC_APP_URL }}

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Backup and Maintenance

### Database Backups

```bash
# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > backups/backup_$DATE.sql
```

### Log Rotation

```bash
# Setup log rotation
sudo nano /etc/logrotate.d/shadcn-admin

# Add configuration
/var/log/pm2/shadcn-admin*.log {
    daily
    missingok
    rotate 52
    compress
    notifempty
    create 0644 www-data www-data
    postrotate
        pm2 reload shadcn-admin
    endscript
}
```

### Health Checks

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check database connection
    // Check external services
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    })
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: error.message },
      { status: 500 }
    )
  }
}
```

## Troubleshooting

### Common Build Issues

**Memory Issues:**

```bash
# Increase Node.js memory
NODE_OPTIONS="--max-old-space-size=4096" pnpm build
```

**Dependency Issues:**

```bash
# Clear cache and reinstall
rm -rf .next node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

**TypeScript Errors:**

```bash
# Run type checking separately
pnpm type-check
```

### Performance Issues

**Bundle Size Analysis:**

```bash
ANALYZE=true pnpm build
```

**Runtime Performance:**

```typescript
// Add performance monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

## Next Steps

- **[Troubleshooting Guide](/nextjs/troubleshooting)** - Detailed problem resolution
- **[Components](/components/)** - Component library documentation
- **[Theme Customizer](/theme-customizer/)** - Theme customization guide
- **[API Reference](/api/)** - API endpoints documentation
