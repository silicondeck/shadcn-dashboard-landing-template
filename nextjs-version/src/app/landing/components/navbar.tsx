"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Github, LayoutDashboard, ChevronDown, X, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Logo } from '@/components/logo'
import { MegaMenu } from '@/components/landing/mega-menu'
import { ModeToggle } from '@/components/mode-toggle'
import { useTheme } from '@/hooks/use-theme'

const navigationItems = [
  { name: 'Home', href: '/landing' },
  { name: 'Features', href: '#features' },
  { name: 'Solutions', href: '#features', hasMegaMenu: true },
  { name: 'Team', href: '#team' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
]

// Solutions menu items for mobile
const solutionsItems = [
  { title: 'Browse Products' },
  { name: 'Free Blocks', href: '#free-blocks' },
  { name: 'Premium Templates', href: '#premium-templates' },
  { name: 'Admin Dashboards', href: '#admin-dashboards' },
  { name: 'Landing Pages', href: '#landing-pages' },
  { title: 'Categories' },
  { name: 'E-commerce', href: '#ecommerce' },
  { name: 'SaaS Dashboards', href: '#saas-dashboards' },
  { name: 'Analytics', href: '#analytics' },
  { name: 'Authentication', href: '#authentication' },
  { title: 'Resources' },
  { name: 'Documentation', href: '#docs' },
  { name: 'Component Showcase', href: '#showcase' },
  { name: 'GitHub Repository', href: '#github' },
  { name: 'Design System', href: '#design-system' }
]

// Smooth scroll function
const smoothScrollTo = (targetId: string) => {
  if (targetId.startsWith('#')) {
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }
}

export function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const { setTheme, theme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/landing" className="flex items-center space-x-2 cursor-pointer">
            <Logo size={32} />
            <span className="font-bold">
              ShadcnStore
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden xl:flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                {item.hasMegaMenu ? (
                  <>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary cursor-pointer">
                      {item.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <MegaMenu />
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink
                    className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none cursor-pointer"
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault()
                      if (item.href.startsWith('#')) {
                        smoothScrollTo(item.href)
                      } else {
                        window.location.href = item.href
                      }
                    }}
                  >
                    {item.name}
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA */}
        <div className="hidden xl:flex items-center space-x-2">
          <ModeToggle variant="ghost" />
          <Button variant="ghost" size="icon" asChild className="cursor-pointer">
            <a href="https://github.com/silicondeck/shadcn-dashboard-landing-template" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" asChild className="cursor-pointer">
            <Link href="/dashboard" target="_blank" rel="noopener noreferrer">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
          </Button>
          <Button variant="ghost" asChild className="cursor-pointer">
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
          <Button asChild className="cursor-pointer">
            <Link href="/auth/sign-up">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="xl:hidden">
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[400px] p-0 gap-0 [&>button]:hidden overflow-hidden flex flex-col">
            <div className="flex flex-col h-full">
              {/* Header */}
              <SheetHeader className="space-y-0 p-4 pb-2 border-b">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Logo size={16} />
                  </div>
                  <SheetTitle className="text-lg font-semibold">ShadcnStore</SheetTitle>
                  <div className="ml-auto flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                      className="cursor-pointer h-8 w-8"
                    >
                      <Moon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Sun className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="cursor-pointer h-8 w-8">
                      <a href="https://github.com/silicondeck/shadcn-dashboard-landing-template" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="cursor-pointer h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </SheetHeader>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto">
                <nav className="p-6 space-y-1">
                  {navigationItems.map((item) => (
                    <div key={item.name}>
                      {item.hasMegaMenu ? (
                        <Collapsible open={solutionsOpen} onOpenChange={setSolutionsOpen}>
                          <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer">
                            {item.name}
                            <ChevronDown className={`h-4 w-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pl-4 space-y-1">
                            {solutionsItems.map((solution, index) => (
                              solution.title ? (
                                <div
                                  key={`title-${index}`}
                                  className="px-4 mt-5 py-2 text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider"
                                >
                                  {solution.title}
                                </div>
                              ) : (
                                <a
                                  key={solution.name}
                                  href={solution.href}
                                  className="flex items-center px-4 py-2 text-sm rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
                                  onClick={(e) => {
                                    setIsOpen(false)
                                    if (solution.href?.startsWith('#')) {
                                      e.preventDefault()
                                      setTimeout(() => smoothScrollTo(solution.href), 100)
                                    }
                                  }}
                                >
                                  {solution.name}
                                </a>
                              )
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <a
                          href={item.href}
                          className="flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
                          onClick={(e) => {
                            setIsOpen(false)
                            if (item.href.startsWith('#')) {
                              e.preventDefault()
                              setTimeout(() => smoothScrollTo(item.href), 100)
                            }
                          }}
                        >
                          {item.name}
                        </a>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Footer Actions */}
              <div className="border-t p-6 space-y-4">

                {/* Primary Actions */}
                <div className="space-y-3">
                  <Button variant="outline" size="lg" asChild className="w-full cursor-pointer">
                    <Link href="/dashboard">
                      <LayoutDashboard className="size-4" />
                      Dashboard
                    </Link>
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="lg" asChild className="cursor-pointer">
                      <Link href="/auth/sign-in">Sign In</Link>
                    </Button>
                    <Button asChild size="lg" className="cursor-pointer" >
                      <Link href="/auth/sign-up">Get Started</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
