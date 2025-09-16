# Support

Get help with the Shadcn Dashboard template.

## Quick Help

### Documentation
- **[Installation Guide](/guide/installation)** - Setup instructions
- **[Components](/components/)** - Component library
- **[Theme System](/guide/theme-system)** - Customization options
- **[Project Structure](/guide/project-structure)** - Code organization

### Common Issues

**Build Errors**
- Check Node.js version (18+ required)
- Clear `node_modules` and reinstall: `rm -rf node_modules pnpm-lock.yaml && pnpm install`
- Verify TypeScript configuration

**Theme Not Working**
- Ensure CSS variables are properly imported
- Check component `"use client"` directives
- Verify theme provider wrapper

**Component Issues**
- Update to latest shadcn/ui version
- Check import paths and aliases
- Ensure proper TypeScript types

## Community Support

### GitHub
- **[Issues](https://github.com/silicondeck/shadcn-dashboard-template/issues)** - Bug reports
- **[Discussions](https://github.com/silicondeck/shadcn-dashboard-template/discussions)** - Questions
- **[Wiki](https://github.com/silicondeck/shadcn-dashboard-template/wiki)** - Guides

### Discord
Join our community for real-time help:
- [Discord Server](https://discord.com/invite/XEQhPc9a6p) (if available)

### Social Media
- **Twitter**: [@ShadcnStore](https://twitter.com/shadcnstore)
- **LinkedIn**: [SiliconDeck](https://linkedin.com/company/silicondeck)

## Commercial Support

For priority support and custom development:
- **Email**: [support@shadcnstore.com](mailto:support@shadcnstore.com)
- **Custom Development** - Tailored solutions
- **Priority Bug Fixes** - Fast-track issue resolution
- **Training & Consultation** - Team onboarding

## Bug Reports

When reporting bugs, include:
1. **Description** of the issue
2. **Steps to reproduce** the problem
3. **Expected** vs **actual** behavior
4. **Environment** details (OS, browser, versions)
5. **Screenshots** or error messages

## Feature Requests

Suggest new features via:
- [GitHub Discussions](https://github.com/silicondeck/shadcn-dashboard-template/discussions)
- Community voting on priorities
- Detailed use case descriptions

---

We're here to help you succeed with the template!
Suggest improvements and new features:
- Check existing discussions first
- Explain the use case and benefits
- Consider implementation complexity
- Provide mockups or examples if helpful

## Frequently Asked Questions

### Installation & Setup

**Q: Which version should I choose - Vite or Next.js?**
A: Choose based on your project needs:
- **Vite**: Fast SPA development, client-side routing, simpler deployment
- **Next.js**: SEO optimization, server-side rendering, full-stack capabilities

**Q: Can I use both versions in the same project?**
A: No, choose one version. Both provide identical UI components and features but different architectures.

**Q: What Node.js version is required?**
A: Node.js 18+ is required. Node.js 20+ is recommended for best performance.

### Development

**Q: How do I add a new page?**
A: 
1. Create a new directory in `src/app/`
2. Add a `page.tsx` file with your component
3. Update navigation in `app-sidebar.tsx`
4. For Vite: Add route to `App.tsx`

**Q: How do I customize the theme?**
A: Use the built-in theme customizer:
1. Click the theme customizer button
2. Adjust colors and layout options
3. Export your theme configuration
4. Apply to your production build

**Q: Can I remove the theme customizer?**
A: Yes, see [Removing Customizer](/theme-customizer/removing-customizer) guide for instructions.

### Components & Styling

**Q: How do I add new shadcn/ui components?**
A: Use the shadcn/ui CLI:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

**Q: How do I customize component styles?**
A: Modify the component files in `src/components/ui/` or create custom variants using class-variance-authority.

**Q: How do I handle responsive design?**
A: Use Tailwind CSS responsive prefixes:
```tsx
<div className="px-4 md:px-6 lg:px-8">
  Content
</div>
```

### Deployment

**Q: How do I deploy the Vite version?**
A: 
1. Run `pnpm build`
2. Deploy the `dist/` folder to any static hosting
3. Recommended: Netlify, Vercel, or AWS S3

**Q: How do I deploy the Next.js version?**
A:
1. Run `pnpm build`
2. Deploy to Vercel (recommended) or any Node.js hosting
3. Set environment variables as needed

**Q: Can I deploy to GitHub Pages?**
A: Yes, for the Vite version. Configure the base path in `vite.config.ts` for GitHub Pages deployment.

### Troubleshooting

**Q: I'm getting TypeScript errors**
A: 
1. Check Node.js version (18+)
2. Run `pnpm install` to ensure dependencies
3. Restart TypeScript server in your editor
4. Check for missing type definitions

**Q: Styles aren't loading correctly**
A:
1. Ensure Tailwind CSS is configured properly
2. Check if `globals.css` is imported
3. Verify CSS variables are defined
4. Clear browser cache

**Q: Theme customizer isn't working**
A:
1. Check if `ThemeCustomizer` component is included
2. Verify tweakcn dependencies are installed
3. Ensure CSS variables are properly configured
4. Check browser console for errors

## Professional Support

### ShadcnStore Premium Support

For enterprise customers and complex implementations:

**Premium Support Includes:**
- Priority email support
- Video consultation sessions
- Custom component development
- Advanced integration assistance
- Performance optimization help

**Contact Options:**
- Email: [support@shadcnstore.com](mailto:support@shadcnstore.com)
- Enterprise: [enterprise@shadcnstore.com](mailto:enterprise@shadcnstore.com)

### Consulting Services

**Available Services:**
- Custom dashboard development
- Component library creation
- Performance optimization
- Migration assistance
- Training and workshops

**Get a Quote:**
Contact us at [consulting@shadcnstore.com](mailto:consulting@shadcnstore.com) with your project requirements.

## Learning Resources

### Video Tutorials

**YouTube Channel**
Subscribe to our channel for video tutorials:
- Setup and installation guides
- Component customization tutorials
- Advanced theming techniques
- Real-world implementation examples

[ShadcnStore YouTube](https://youtube.com/@shadcnstore)

### Blog Articles

**Technical Blog**
Read in-depth articles about:
- Dashboard design patterns
- React component best practices
- Performance optimization techniques
- Modern UI/UX trends

[ShadcnStore Blog](https://shadcnstore.com/blog)

### Example Projects

**Demo Applications**
Explore real-world implementations:
- E-commerce dashboards
- SaaS application interfaces
- Content management systems
- Analytics dashboards

[View Examples](https://shadcnstore.com/examples)

## Contributing to Support

### Help the Community

**Share Knowledge**
- Answer questions in Discord
- Contribute to GitHub discussions
- Write tutorials and guides
- Share your implementations

**Improve Documentation**
- Fix typos and errors
- Add missing information
- Create new guides
- Translate documentation

### Become a Community Moderator

Help us maintain a helpful and welcoming community:
- Moderate Discord channels
- Review and answer questions
- Help newcomers get started
- Organize community events

Contact [community@shadcnstore.com](mailto:community@shadcnstore.com) if interested.

## Contact Information

### Direct Contact

**General Inquiries**
[hello@shadcnstore.com](mailto:hello@shadcnstore.com)

**Technical Support**
[support@shadcnstore.com](mailto:support@shadcnstore.com)

**Business Inquiries**
[business@shadcnstore.com](mailto:business@shadcnstore.com)

**Security Issues**
[security@shadcnstore.com](mailto:security@shadcnstore.com)

### Social Media

**Stay Connected**
- Twitter: [@shadcnstore](https://twitter.com/shadcnstore)
- LinkedIn: [ShadcnStore](https://linkedin.com/company/shadcnstore)
- GitHub: [silicondeck](https://github.com/silicondeck)

### Response Times

**Community Support**
- Discord: Usually within hours
- GitHub: 1-3 business days
- Email: 2-5 business days

**Premium Support**
- Email: Within 24 hours
- Video calls: Within 48 hours
- Enterprise: Same business day

## Feedback

### Help Us Improve

**Documentation Feedback**
Found something unclear or missing? Let us know:
- Create GitHub issues for documentation problems
- Suggest improvements in Discord
- Email feedback to [docs@shadcnstore.com](mailto:docs@shadcnstore.com)

**Product Feedback**
Help us make the template better:
- Rate the template on GitHub
- Share success stories
- Suggest new features
- Report usability issues

**Community Feedback**
How can we improve the community experience?
- Suggest new Discord channels
- Propose community events
- Share ideas for tutorials
- Recommend guest speakers

## Success Stories

### Community Showcase

**Built with Shadcn Dashboard**
See what others have created:
- SaaS applications
- E-commerce platforms
- Internal tools
- Portfolio websites

Share your project in Discord or tag us on social media!

### Customer Testimonials

*"The Shadcn Dashboard template saved us months of development time. The code quality is excellent and the documentation is comprehensive."*
- **Jane Smith**, Lead Developer at TechCorp

*"Outstanding template with great community support. The theme customizer is a game-changer for our client projects."*
- **Mike Johnson**, Freelance Developer

---

**Need help?** Don't hesitate to reach out. Our community and team are here to help you succeed with the Shadcn Dashboard + Landing Page Template!
