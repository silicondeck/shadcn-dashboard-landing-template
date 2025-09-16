# Vite Build & Deploy

Learn how to build and deploy the Vite version of Shadcn Dashboard + Landing Page Template to production.

## Production Build

### Building for Production

Create an optimized production build:

```bash
# Build for production
pnpm build

# Output will be in the dist/ directory
```

### Build Output Structure

```text
dist/
├── assets/
│   ├── index-[hash].js          # Main application bundle
│   ├── vendor-[hash].js         # Third-party libraries
│   ├── index-[hash].css         # Compiled styles
│   └── [asset]-[hash].[ext]     # Static assets with cache busting
├── index.html                   # Main HTML file
└── favicon.svg                  # Favicon and other static files
```

### Build Configuration

The Vite configuration includes optimizations:

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    // Output directory
    outDir: 'dist',
    
    // Generate source maps for debugging
    sourcemap: true,
    
    // Optimize chunk sizes
    chunkSizeWarningLimit: 1000,
    
    // Rollup options for advanced optimization
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Separate vendor libraries
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          charts: ['recharts'],
          table: ['@tanstack/react-table'],
        },
      },
    },
    
    // Minification options
    minify: 'esbuild',
    target: 'es2015',
  },
})
```

## Deployment Options

### Vercel (Recommended)

Vercel provides zero-configuration deployment for Vite applications:

#### Automatic Deployment

1. **Connect Repository:**
   - Link your GitHub repository to Vercel
   - Automatic deployments on every push

2. **Configure Project:**
   ```bash
   # Vercel will auto-detect Vite configuration
   # Build Command: pnpm build
   # Output Directory: dist
   # Install Command: pnpm install
   ```

3. **Environment Variables:**
   ```bash
   # Add environment variables in Vercel dashboard
   VITE_APP_NAME=ShadcnStore Admin
   VITE_API_URL=https://api.yourdomain.com
   ```

#### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from command line
vercel

# Production deployment
vercel --prod
```

### Netlify

Deploy to Netlify with drag-and-drop or Git integration:

#### Build Settings

```bash
# Build command
pnpm build

# Publish directory
dist

# Environment variables
VITE_APP_NAME=ShadcnStore Admin
```

#### Netlify Configuration

Create `netlify.toml` for advanced configuration:

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### GitHub Pages

Deploy to GitHub Pages using GitHub Actions:

#### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'pnpm'
        
    - name: Install pnpm
      run: npm install -g pnpm
      
    - name: Install dependencies
      run: pnpm install
      working-directory: ./vite-version
      
    - name: Build
      run: pnpm build
      working-directory: ./vite-version
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./vite-version/dist
```

#### Base Path Configuration

For GitHub Pages subdirectory deployment:

```typescript
// vite.config.ts
export default defineConfig({
  base: '/your-repo-name/', // Replace with your repository name
  // ... other configuration
})
```

### AWS S3 + CloudFront

Deploy to AWS for scalable hosting:

#### S3 Bucket Setup

```bash
# Create S3 bucket
aws s3 mb s3://your-bucket-name

# Configure bucket for static website hosting
aws s3 website s3://your-bucket-name --index-document index.html --error-document index.html

# Upload files
aws s3 sync dist/ s3://your-bucket-name --delete
```

#### CloudFront Distribution

Create CloudFront distribution for CDN:

```json
{
  "Origins": [{
    "DomainName": "your-bucket-name.s3-website.region.amazonaws.com",
    "Id": "S3-your-bucket-name",
    "CustomOriginConfig": {
      "HTTPPort": 80,
      "OriginProtocolPolicy": "http-only"
    }
  }],
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-your-bucket-name",
    "ViewerProtocolPolicy": "redirect-to-https"
  }
}
```

### Docker Deployment

Containerize your application for deployment:

#### Dockerfile

```dockerfile
# Multi-stage build for optimized image
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install

# Copy source code
COPY . .

# Build application
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Nginx Configuration

```nginx
# nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
}
```

#### Docker Commands

```bash
# Build image
docker build -t shadcn-admin .

# Run container
docker run -p 80:80 shadcn-admin

# Deploy to registry
docker tag shadcn-admin your-registry/shadcn-admin
docker push your-registry/shadcn-admin
```

## Environment Variables

### Development vs Production

Configure environment-specific variables:

```bash
# .env.local (development)
VITE_APP_NAME=ShadcnStore Admin (Dev)
VITE_API_URL=http://localhost:3001
VITE_DEBUG=true

# .env.production (production)
VITE_APP_NAME=ShadcnStore Admin
VITE_API_URL=https://api.yourdomain.com
VITE_DEBUG=false
```

### Using Environment Variables

```typescript
// Access in your application
const config = {
  appName: import.meta.env.VITE_APP_NAME,
  apiUrl: import.meta.env.VITE_API_URL,
  isDebug: import.meta.env.VITE_DEBUG === 'true',
}
```

## Performance Optimization

### Build Optimizations

#### Bundle Size Analysis

```bash
# Install bundle analyzer
pnpm add -D rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    // ... other plugins
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
    }),
  ],
})
```

#### Asset Optimization

```typescript
// vite.config.ts optimizations
export default defineConfig({
  build: {
    // Inline small assets as base64
    assetsInlineLimit: 4096,
    
    // Optimize CSS
    cssMinify: 'esbuild',
    
    // Enable compression
    reportCompressedSize: true,
  },
})
```

### Runtime Optimizations

#### Lazy Loading

```typescript
// Implement lazy loading for better performance
const Dashboard = lazy(() => import('@/app/(dashboard)/page'))
const Analytics = lazy(() => import('@/app/(dashboard)/analytics/page'))

function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  )
}
```

#### Service Worker

Add service worker for caching:

```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
      },
    }),
  ],
})
```

## Security Considerations

### Content Security Policy

Add CSP headers for security:

```html
<!-- In index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.yourdomain.com;
">
```

### Build Security

```typescript
// vite.config.ts security settings
export default defineConfig({
  build: {
    // Remove source maps in production
    sourcemap: process.env.NODE_ENV === 'development',
    
    // Minify code
    minify: 'esbuild',
  },
  
  // Secure server options
  server: {
    https: false, // Enable HTTPS in development if needed
    cors: true,
  },
})
```

## Monitoring and Analytics

### Build Monitoring

Track build performance:

```bash
# Build with timing information
pnpm build --reporter verbose

# Analyze bundle size
pnpm build && npx vite-bundle-analyzer
```

### Performance Monitoring

Add performance monitoring:

```typescript
// Track page load performance
window.addEventListener('load', () => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  console.log('Page load time:', navigation.loadEventEnd - navigation.fetchStart)
})
```

## Troubleshooting

### Common Build Issues

**Module not found errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Build memory issues:**
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" pnpm build
```

**TypeScript errors:**
```bash
# Run type checking separately
pnpm type-check
```

### Deployment Issues

**SPA routing not working:**
- Ensure server redirects all routes to index.html
- Check base path configuration for subdirectory deployments

**Assets not loading:**
- Verify asset paths in build output
- Check CORS settings for cross-domain assets

**Environment variables not working:**
- Ensure variables start with `VITE_`
- Check variable names and values in deployment platform

## Next Steps

- **[Troubleshooting](/vite/troubleshooting)** - Common issues and solutions
- **[Development Guide](/vite/development)** - Development workflow
- **[Components](/components/)** - Component library usage
- **[Theme Customizer](/theme-customizer/)** - Customize your theme
