# Vite Quick Start

Get up and running with the Vite version of Shadcn Dashboard + Landing Page Template in minutes.

## Prerequisites

Before getting started, ensure you have:

- **Node.js** (v18.0.0 or higher)
- **pnpm** (recommended) or npm/yarn
- **Git** for cloning the repository

## Installation

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/silicondeck/shadcn-dashboard-landing-template.git
cd shadcn-dashboard-landing-template
```

### Step 2: Navigate to Vite Version

```bash
# Navigate to Vite version
cd vite-version
```

### Step 3: Install Dependencies

```bash
# Install dependencies
pnpm install
```

### Step 4: Start Development Server

```bash
# Start development server
pnpm dev

# Server will be available at http://localhost:5173
```

## Verification

After starting the development server, you should see:

1. **Dashboard Interface** - Complete admin dashboard with sidebar navigation
2. **Landing Page** - Marketing website template  
3. **Theme Customizer** - Real-time theme editing panel
4. **Hot Module Replacement** - Instant updates when you modify files

## Project Structure

```text
vite-version/
├── src/
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   ├── index.css              # Global styles
│   ├── app/                   # Demo pages
│   ├── components/            # UI components
│   ├── hooks/                 # Custom hooks
│   └── lib/                   # Utilities
├── public/                    # Static assets
├── index.html                 # HTML template
├── vite.config.ts             # Vite configuration
└── package.json               # Dependencies
```

## Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm type-check   # TypeScript type checking
```

## First Steps

### 1. Explore the Dashboard

Navigate to `http://localhost:5173` to see the main dashboard with:
- Analytics charts and metrics
- Data tables with sorting/filtering
- Sidebar navigation
- Theme customizer

### 2. Check the Landing Page

Visit `http://localhost:5173/landing` to see the marketing template with:
- Hero section
- Features showcase
- Pricing plans
- Testimonials

### 3. Try Theme Customization

Click the customizer icon (bottom-right) to:
- Change colors in real-time
- Adjust layout spacing
- Customize typography
- Export your theme

### 4. Explore Page Templates

Check out various page templates:
- `http://localhost:5173/mail` - Email client interface
- `http://localhost:5173/tasks` - Task management
- `http://localhost:5173/chat` - Chat application
- `http://localhost:5173/calendar` - Calendar interface

## Common Issues

### Port Already in Use

If port 5173 is occupied:

```bash
pnpm dev --port 3001
```

### Missing Dependencies

If you encounter missing dependencies:

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScript Errors

For TypeScript issues:

```bash
pnpm type-check
# Fix any reported errors
```

## Next Steps

- **[Development Guide](/vite/development)** - Learn the development workflow
- **[Build & Deploy](/vite/build-deploy)** - Deploy your application
- **[Components](/components/)** - Explore the component library
- **[Theme Customizer](/theme-customizer/)** - Customize your theme

## Need Help?

- Check **[Troubleshooting](/vite/troubleshooting)** for common issues
- Review the **[Vite Documentation](/vite/)** for detailed guides
- Explore **[Components](/components/)** for UI component usage
