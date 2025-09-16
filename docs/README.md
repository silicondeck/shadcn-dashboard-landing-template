# Shadcn Dashboard + Landing Page Template Documentation

This directory contains the complete documentation for the Shadcn Dashboard + Landing Page Template, built with VitePress for optimal performance and user experience.

## 📚 Documentation Structure

The documentation is organized into framework-specific sections to provide targeted guidance:

### 🏁 Getting Started
- **[Overview](./index.md)** - Project introduction and features
- **[Installation Guide](./guide/installation.md)** - Complete setup instructions
- **[Framework Comparison](./guide/choosing-framework.md)** - Vite vs Next.js decision guide

### 🔧 Framework-Specific Guides
- **[Vite Version](./vite/)** - React + Vite + React Router DOM
- **[Next.js Version](./nextjs/)** - Next.js 15 + App Router

### 🎨 Component System
- **[Component Library](./components/)** - shadcn/ui v3 integration
- **[Theme Customizer](./theme-customizer/)** - Real-time theme editing
- **[Layouts](./layouts/)** - Layout system and navigation

### 🚀 Advanced Topics
- **[Deployment](./deployment/)** - Production deployment guides
- **[Customization](./customization/)** - Styling and customization
- **[Migration](./migration/)** - Framework and version migration

## 🛠️ Development

### Prerequisites
- Node.js (v18.0.0 or higher)
- pnpm (recommended) or npm/yarn

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
# or use the convenience script
./dev.sh

# Documentation will be available at http://localhost:5173
```

### Build Documentation

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 📖 Documentation Philosophy

This documentation follows these principles:

### Framework-Specific Organization
Rather than mixing Vite and Next.js instructions, each framework has dedicated sections to avoid confusion and provide targeted guidance.

### User-Journey Focused
Documentation is organized by user goals rather than technical implementation details:
- Quick setup for immediate results
- Deep customization for advanced users
- Migration paths for framework switching

### Comprehensive Examples
Every concept includes working code examples that can be copied and used immediately.

### Performance Oriented
VitePress provides:
- Fast site generation
- Excellent search capabilities
- Mobile-optimized experience
- Dark/light mode support

## 🔍 Search and Navigation

The documentation includes:
- **Full-text search** across all content
- **Sidebar navigation** with collapsible sections
- **Cross-references** between related topics
- **Mobile-responsive** design

## 🤝 Contributing to Documentation

To improve the documentation:

1. **Edit Markdown files** in the appropriate directories
2. **Test locally** with `pnpm dev`
3. **Follow the style guide** for consistency
4. **Update navigation** in `.vitepress/config.ts` if needed

### Style Guidelines

- Use clear, descriptive headings
- Include code examples for all concepts
- Add framework-specific notes where relevant
- Keep explanations concise but complete
- Use proper Markdown formatting

### File Organization

```
docs/
├── .vitepress/
│   ├── config.ts          # VitePress configuration
│   └── theme/             # Custom theme components
├── guide/                 # Getting started guides
├── vite/                  # Vite-specific documentation
├── nextjs/                # Next.js-specific documentation
├── components/            # Component library docs
├── theme-customizer/      # Theme customization guides
├── layouts/              # Layout system docs
├── deployment/           # Deployment guides
├── customization/        # Customization guides
├── migration/            # Migration guides
├── api/                  # API reference
└── examples/             # Usage examples
```

## 🚀 Deployment

The documentation can be deployed to any static hosting provider:

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel

# or link to a Git repository for automatic deployments
```

### Netlify
```bash
# Build command: pnpm build
# Publish directory: .vitepress/dist
```

### GitHub Pages
```bash
# Use GitHub Actions with VitePress deployment action
```

## 📝 Content Updates

### Adding New Pages

1. Create Markdown files in the appropriate directory
2. Update sidebar navigation in `.vitepress/config.ts`
3. Add cross-references from related pages
4. Test the build process

### Updating Existing Content

1. Edit the relevant Markdown files
2. Maintain consistency with existing style
3. Update any affected cross-references
4. Verify all code examples still work

## 🔧 VitePress Configuration

The documentation uses these VitePress features:

- **Theme Configuration** - Custom sidebar and navigation
- **Search Integration** - Local search with full-text indexing
- **Code Highlighting** - Syntax highlighting for multiple languages
- **Custom Components** - Vue components for enhanced content
- **SEO Optimization** - Meta tags and social media cards

## 📊 Performance

The documentation is optimized for:
- **Fast Loading** - Minimal JavaScript, optimized assets
- **Search Performance** - Efficient search indexing
- **Mobile Experience** - Responsive design and touch-friendly navigation
- **Accessibility** - WCAG compliant structure and navigation

## 🐛 Troubleshooting

### Common Issues

**Build Failures:**
- Check for broken internal links
- Verify all imported files exist
- Ensure proper Markdown syntax

**Search Not Working:**
- Rebuild the documentation
- Check for JavaScript errors
- Verify search index generation

**Navigation Issues:**
- Check `.vitepress/config.ts` sidebar configuration
- Ensure file paths match navigation links
- Verify proper heading structure

## 📄 License

The documentation is released under the same MIT License as the main project.

---

For questions about the documentation, please open an issue in the main repository or contribute improvements via pull request.
