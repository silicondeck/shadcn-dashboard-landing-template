import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Shadcn Dashboard & Landing',
  description: 'Open-source admin dashboard & landing page template built with React, TypeScript, shadcn/ui v3, and Tailwind CSS v4. Developed by ShadcnStore.',

  // Theme configuration
  themeConfig: {
    logo: '/logo.svg',

    // Navigation menu
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Vite Version', link: '/vite/' },
      { text: 'Next.js Version', link: '/nextjs/' },
      { text: 'Components', link: '/components/' },
      { text: 'Theme Customizer', link: '/theme-customizer/' }
    ],

    // Sidebar configuration with path-specific sidebars
    sidebar: {
      // Main guide sidebar
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Overview', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Choosing Framework', link: '/guide/choosing-framework' }
          ]
        },
        {
          text: 'Template Guide',
          items: [
            { text: 'Features', link: '/guide/features' },
            { text: 'Tech Stack', link: '/guide/tech-stack' },
            { text: 'Project Structure', link: '/guide/project-structure' },
            { text: 'Theme System', link: '/guide/theme-system' }
          ]
        },
        {
          text: 'Community',
          items: [
            { text: 'Contributing', link: '/guide/contributing' },
            { text: 'Support', link: '/guide/support' },
            { text: 'License', link: '/guide/license' }
          ]
        }
      ],

      // Vite version sidebar
      '/vite/': [
        {
          text: 'Vite Version',
          items: [
            { text: 'Overview', link: '/vite/' },
            { text: 'Quick Start', link: '/vite/quick-start' },
            { text: 'Development', link: '/vite/development' },
            { text: 'Build & Deploy', link: '/vite/build-deploy' },
            { text: 'Troubleshooting', link: '/vite/troubleshooting' }
          ]
        }
      ],

      // Next.js version sidebar
      '/nextjs/': [
        {
          text: 'Next.js Version',
          items: [
            { text: 'Overview', link: '/nextjs/' },
            { text: 'Quick Start', link: '/nextjs/quick-start' },
            { text: 'Development', link: '/nextjs/development' },
            { text: 'Build & Deploy', link: '/nextjs/build-deploy' },
            { text: 'Troubleshooting', link: '/nextjs/troubleshooting' }
          ]
        }
      ],

      // Components sidebar
      '/components/': [
        {
          text: 'Component Library',
          items: [
            { text: 'Overview', link: '/components/' },
            { text: 'shadcn/ui Integration', link: '/components/shadcn-ui' },
            { text: 'Data Tables', link: '/components/data-tables' },
            { text: 'Charts', link: '/components/charts' },
            { text: 'Custom Components', link: '/components/custom-components' }
          ]
        }
      ],

      // Theme customizer sidebar
      '/theme-customizer/': [
        {
          text: 'Theme Customizer',
          items: [
            { text: 'Overview', link: '/theme-customizer/' },
            { text: 'Configuration', link: '/theme-customizer/configuration' },
            { text: 'Custom Themes', link: '/theme-customizer/custom-themes' },
            { text: 'Removing Customizer', link: '/theme-customizer/removing-customizer' }
          ]
        }
      ]
    },

    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/silicondeck/shadcn-dashboard-landing-template' }
    ],

    // Footer
    footer: {
      message: 'Released under the MIT License. Developed by ShadcnStore.',
      copyright: 'Copyright © 2024-present ShadcnStore'
    },

    // Search
    search: {
      provider: 'local'
    },

    // Edit link
    editLink: {
      pattern: 'https://github.com/silicondeck/shadcn-dashboard-landing-template/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  },

  // Markdown configuration
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  },

  // Head configuration
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#5f6368' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'Shadcn Dashboard + Landing Page Template | React & Next.js Starter Template' }],
    ['meta', { property: 'og:site_name', content: 'ShadcnStore' }],
    ['meta', { property: 'og:image', content: '/og-image.png' }],
    ['meta', { property: 'og:url', content: 'https://shadcnstore.com/templates/dashboard/shadcn-dashboard-landing-template' }]
  ]
})
