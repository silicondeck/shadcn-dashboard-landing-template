# Contributing

Help improve the Shadcn Dashboard template.

## Getting Started

1. **Fork** the repository
2. **Clone** your fork locally
3. **Install** dependencies: `pnpm install`
4. **Create** a feature branch
5. **Make** your changes
6. **Test** in both Vite and Next.js versions
7. **Submit** a pull request

## Development Setup

```bash
# Clone repository
git clone https://github.com/your-username/shadcn-dashboard-template.git
cd shadcn-dashboard-template

# Install dependencies for both versions
cd vite-version && pnpm install
cd ../nextjs-version && pnpm install

# Start development servers
pnpm dev  # In each version directory
```

## Contribution Guidelines

### Code Standards
- **TypeScript** for all new code
- **ESLint/Prettier** formatting
- **Consistent** naming conventions
- **Client components** must use `"use client"` directive

### Testing Requirements
- Test changes in **both Vite and Next.js** versions
- Verify **responsive** design on mobile/desktop
- Check **accessibility** with screen readers
- Test **dark/light** mode compatibility

### Dual-Version Compatibility
All changes must work in both frameworks:
- **Vite**: React Router DOM, client-side rendering
- **Next.js**: App Router, server-side rendering
- **Shared components**: Use framework-agnostic patterns

## Areas for Contribution

### Components
- New shadcn/ui components
- Enhanced existing components
- Accessibility improvements
- Performance optimizations

### Features
- Dashboard widgets
- Theme customizations
- Layout variations
- Data table enhancements

### Documentation
- Code examples
- Implementation guides
- Best practices
- Video tutorials

### Bug Fixes
- Cross-browser compatibility
- Mobile responsiveness
- Performance issues
- Accessibility bugs

## Pull Request Process

1. **Describe** your changes clearly
2. **Include** screenshots for UI changes
3. **Reference** any related issues
4. **Test** thoroughly in both versions
5. **Update** documentation if needed

## Community

- **GitHub Issues** - Bug reports and feature requests
- **Discussions** - Questions and community help
- **Discord** - Real-time chat and support

---

Thank you for contributing! Every improvement helps the community.

## Getting Started

### Development Environment

**Prerequisites**
- Node.js 18+ installed
- pnpm package manager (recommended)
- Git for version control
- Code editor (VS Code recommended)

**Fork and Clone**
```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/shadcn-dashboard-landing-template.git
cd shadcn-dashboard-landing-template

# Add upstream remote
git remote add upstream https://github.com/silicondeck/shadcn-dashboard-landing-template.git
```

**Install Dependencies**
```bash
# Install dependencies for both versions
cd vite-version && pnpm install
cd ../nextjs-version && pnpm install
cd ../docs && pnpm install
```

**Start Development**
```bash
# Vite version
cd vite-version && pnpm dev

# Next.js version
cd nextjs-version && pnpm dev

# Documentation
cd docs && pnpm dev
```

## Development Workflow

### Branch Strategy

**Create Feature Branch**
```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

**Branch Naming Conventions**
- `feature/component-name` - New features
- `fix/issue-description` - Bug fixes
- `docs/section-name` - Documentation updates
- `refactor/component-name` - Code refactoring
- `perf/optimization-area` - Performance improvements

### Code Standards

**TypeScript First**
- All new code must be TypeScript
- Provide proper type definitions
- Use strict TypeScript configuration
- Export types for reusable components

**Component Guidelines**
```typescript
// Good: Proper TypeScript component
interface ButtonProps {
  variant?: 'default' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ variant = 'default', size = 'md', children, onClick }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md',
        buttonVariants({ variant, size })
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

**Styling Guidelines**
- Use Tailwind CSS utility classes
- Follow existing component patterns
- Ensure dark mode compatibility
- Test responsive design
- Use CSS variables for theming

**Code Formatting**
```bash
# Run formatting before commits
pnpm lint
pnpm format

# Auto-fix issues where possible
pnpm lint:fix
```

### Dual-Version Requirements

**CRITICAL: Both Versions Must Work**

All changes must be compatible with both Vite and Next.js versions:

**Client Component Requirements**
- Always use `"use client"` for interactive components
- Test components in both frameworks
- Avoid framework-specific APIs

**Cross-Platform Patterns**
```typescript
// ✅ Good: Works in both frameworks
"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function Counter() {
  const [count, setCount] = useState(0)
  return (
    <Button onClick={() => setCount(count + 1)}>
      Count: {count}
    </Button>
  )
}

// ❌ Bad: Next.js specific
import { useRouter } from 'next/router'  // Won't work in Vite

// ❌ Bad: Missing "use client"
import { useState } from 'react'  // Will break in Next.js without "use client"
```

### Testing Requirements

**Manual Testing**
- Test in both Vite and Next.js versions
- Verify light and dark modes
- Check responsive design
- Test all interactive features
- Ensure accessibility compliance

**Build Testing**
```bash
# Test Vite build
cd vite-version
pnpm build && pnpm preview

# Test Next.js build
cd nextjs-version
pnpm build && pnpm start
```

**Browser Testing**
- Chrome/Chromium
- Firefox
- Safari (if possible)
- Mobile browsers

## Contribution Process

### 1. Issue Discussion

**For Large Changes**
- Create or comment on a GitHub issue
- Discuss approach and implementation
- Get feedback before starting work
- Ensure alignment with project goals

**For Small Changes**
- Bug fixes and typos can skip discussion
- Minor improvements can be submitted directly
- Document the change in your PR description

### 2. Code Development

**Development Checklist**
- [ ] Code follows TypeScript standards
- [ ] Components work in both Vite and Next.js
- [ ] Styles follow Tailwind conventions
- [ ] Dark mode compatibility verified
- [ ] Responsive design tested
- [ ] Accessibility considered
- [ ] No console errors or warnings

**File Organization**
- Follow existing project structure
- Place files in appropriate directories
- Update both versions when needed
- Co-locate related files

### 3. Commit Guidelines

**Commit Message Format**
```bash
type(scope): description

# Examples:
feat(components): add data table pagination
fix(theme): resolve dark mode toggle issue
docs(guide): update installation instructions
refactor(layout): simplify sidebar component
perf(charts): optimize chart rendering
```

**Commit Types**
- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation changes
- `style` - Code style/formatting
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Testing changes
- `chore` - Build/tooling changes

### 4. Pull Request

**Before Submitting**
```bash
# Ensure code quality
pnpm lint
pnpm type-check

# Test builds
pnpm build

# Update documentation if needed
```

**PR Description Template**
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Testing
- [ ] Tested in Vite version
- [ ] Tested in Next.js version
- [ ] Verified dark mode compatibility
- [ ] Checked responsive design
- [ ] No console errors

## Screenshots
Include screenshots for UI changes.

## Additional Notes
Any additional context or considerations.
```

**PR Guidelines**
- Keep changes focused and atomic
- Write clear, descriptive titles
- Reference related issues
- Include screenshots for visual changes
- Document breaking changes

## Code Review Process

### Review Criteria

**Functionality**
- Code works as intended
- No regressions introduced
- Edge cases considered
- Error handling implemented

**Code Quality**
- TypeScript best practices
- Clean, readable code
- Proper abstractions
- Performance considerations

**Design Consistency**
- Follows existing patterns
- UI/UX consistency
- Accessibility compliance
- Mobile responsiveness

### Reviewer Guidelines

**For Reviewers**
- Be constructive and helpful
- Suggest improvements, not just problems
- Test changes locally when possible
- Consider maintainability and scalability

**For Contributors**
- Address feedback promptly
- Ask questions when unclear
- Update based on suggestions
- Be open to iterative improvements

## Community Guidelines

### Code of Conduct

**Be Respectful**
- Treat all contributors with respect
- Value diverse perspectives
- Provide constructive feedback
- Help others learn and grow

**Be Professional**
- Keep discussions focused and relevant
- Avoid personal attacks or harassment
- Respect project maintainer decisions
- Follow community standards

### Communication

**GitHub Discussions**
- General questions and ideas
- Feature discussions
- Community showcase
- Help and support

**GitHub Issues**
- Bug reports
- Feature requests
- Specific problems
- Task tracking

**Discord Community**
- Real-time chat and help
- Quick questions
- Community interaction
- Announcements

## Recognition

### Contributors

All contributors are recognized in:
- GitHub contributors list
- Project documentation
- Release notes
- Community showcases

### Contribution Levels

**First-time Contributors**
- Welcome and guidance provided
- Good first issues labeled
- Mentorship available
- Documentation improvements encouraged

**Regular Contributors**
- Increased review privileges
- Feature discussion participation
- Community event participation
- Special recognition

**Core Contributors**
- Repository permissions
- Release participation
- Roadmap input
- Maintenance responsibilities

## Resources

### Documentation
- [Project Structure](/guide/project-structure) - Understand codebase organization
- [Tech Stack](/guide/tech-stack) - Learn about technologies used
- [Theme System](/guide/theme-system) - Understand theming architecture

### Tools and Extensions
- [VS Code](https://code.visualstudio.com/) - Recommended editor
- [TypeScript](https://www.typescriptlang.org/) - Language documentation
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library

### Community
- [GitHub Repository](https://github.com/silicondeck/shadcn-dashboard-landing-template)
- [Discord Server](https://discord.com/invite/XEQhPc9a6p)
- [ShadcnStore](https://shadcnstore.com) - Premium components and templates

## Getting Help

### Need Assistance?

**Technical Help**
- Check existing documentation
- Search GitHub issues and discussions
- Ask questions in Discord
- Create detailed issue reports

**Contribution Questions**
- Join Discord #contributors channel
- Comment on relevant GitHub issues
- Email [contribute@shadcnstore.com](mailto:contribute@shadcnstore.com)
- Tag maintainers in discussions

---

Thank you for contributing to the Shadcn Dashboard + Landing Page Template! Your contributions help make this project better for everyone.
