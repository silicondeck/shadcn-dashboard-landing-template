---
layout: home
hero:
  name: "Shadcn Dashboard + Landing Page Template"
  tagline: "Beautiful admin dashboard & landing page template built with shadcn/ui v3 and Tailwind CSS v4."
  image:
    src: /hero.png
    alt: Dashboard Preview
    width: 800px
    height: auto
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View Components
      link: /components/

features:
  - icon: 🖥️
    title: Admin Dashboard
    details: Modern, feature-rich dashboard with 30+ pages including mail, tasks, chat, calendar apps and authentication flows
  - icon: 🌐
    title: Landing Page
    details: Beautiful marketing landing page with hero, features, pricing, testimonials and complete business sections
  - icon: ⚡
    title: Dual Framework
    details: Choose between Vite for lightning-fast development or Next.js 15 for production-ready SSR/SSG capabilities
  - icon: 🎨
    title: Live Theme Customizer
    details: Real-time theme editing with tweakcn integration. Customize colors, layouts, and components instantly
  - icon: 📱
    title: Responsive Design
    details: Mobile-first design with container queries that works seamlessly across all devices and screen sizes
  - icon: 🚀
    title: Production Ready
    details: Clean, optimized TypeScript code with shadcn/ui v3, Tailwind CSS v4, and modern development tools
---

## 🌟 Live Demos

<div class="demo-links">
  <div class="demo-card">
    <div class="demo-icon">🖥️</div>
    <h3>Dashboard Demo</h3>
    <p>Complete admin dashboard with mail, tasks, chat, calendar apps and 30+ pages including authentication and settings</p>
    <a href="https://shadcnstore.com/templates/dashboard/shadcn-dashboard-landing-template" target="_blank" class="demo-button">View Dashboard</a>
  </div>
  
  <div class="demo-card">
    <div class="demo-icon">🌐</div>
    <h3>Landing Page Demo</h3>
    <p>Beautiful marketing landing page with hero, features, pricing, testimonials and complete business sections</p>
    <a href="https://shadcnstore.com/templates/landing/shadcn-dashboard-landing-template" target="_blank" class="demo-button">View Landing Page</a>
  </div>
</div>

<style>
.demo-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0 3rem 0;
}

.demo-card {
  padding: 2rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  text-align: center;
}

.demo-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.demo-card h3 {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.demo-card p {
  margin: 0 0 1.5rem 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.demo-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand-1);
  color: white !important;
  text-decoration: none !important;
  border-radius: 6px;
  font-weight: 500;
}

/* Features customization for better icon-title alignment */
.VPFeature .icon {
  margin-bottom: 1rem;
}

.VPFeatures .VPFeature h2 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
</style>
