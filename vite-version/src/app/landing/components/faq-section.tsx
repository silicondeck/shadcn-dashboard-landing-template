"use client"

import { CircleHelp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'

type FaqItem = {
  value: string
  question: string
  answer: string
}

const faqItems: FaqItem[] = [
  {
    value: 'item-1',
    question: 'How do I integrate ShadcnStore components into my project?',
    answer:
      'Integration is simple! All our components are built with shadcn/ui and work with React, Next.js, and Vite. Just copy the component code, install any required dependencies, and paste it into your project. Each component comes with detailed installation instructions and examples.',
  },
  {
    value: 'item-2',
    question: 'What\'s the difference between free and premium components?',
    answer:
      'Free components include essential UI elements like buttons, forms, and basic layouts. Premium components offer advanced features like complex data tables, analytics dashboards, authentication flows, and complete admin templates. Premium also includes Figma files, priority support, and commercial licenses.',
  },
  {
    value: 'item-3',
    question: 'Can I use these components in commercial projects?',
    answer:
      'Yes! Free components come with an MIT license for unlimited use. Premium components include a commercial license that allows usage in client projects, SaaS applications, and commercial products without attribution requirements.',
  },
  {
    value: 'item-4',
    question: 'Do you provide support and updates?',
    answer:
      'Absolutely! We provide community support for free components through our Discord server and GitHub issues. Premium subscribers get priority email support, regular component updates, and early access to new releases. We also maintain compatibility with the latest shadcn/ui versions.',
  },
  {
    value: 'item-5',
    question: 'What frameworks and tools do you support?',
    answer:
      'Our components work with React 18+, Next.js 13+, and Vite. We use TypeScript, Tailwind CSS, and follow shadcn/ui conventions. Components are tested with popular tools like React Hook Form, TanStack Query, and Zustand for state management.',
  },
  {
    value: 'item-6',
    question: 'How often do you release new components?',
    answer:
      'We release new components and templates weekly. Premium subscribers get early access to new releases, while free components are updated regularly based on community feedback. You can track our roadmap and request specific components through our GitHub repository.',
  },
]

const FaqSection = () => {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">FAQ</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about ShadcnStore components, licensing, and integration. Still have questions? We're here to help!
          </p>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          <div className='bg-transparent'>
            <div className='p-0'>
              <Accordion type='single' collapsible className='space-y-5'>
                {faqItems.map(item => (
                  <AccordionItem key={item.value} value={item.value} className='rounded-md !border bg-transparent'>
                    <AccordionTrigger className='cursor-pointer items-center gap-4 rounded-none bg-transparent py-2 ps-3 pe-4 hover:no-underline data-[state=open]:border-b'>
                      <div className='flex items-center gap-4'>
                        <div className='bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full'>
                          <CircleHelp className='size-5' />
                        </div>
                        <span className='text-start font-semibold'>{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='p-4 bg-transparent'>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Contact Support CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help.
            </p>
            <Button className='cursor-pointer' asChild>
              <a href="#contact">
                Contact Support
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export { FaqSection }
