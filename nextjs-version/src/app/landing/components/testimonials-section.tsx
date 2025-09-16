"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

type Testimonial = {
  name: string
  role: string
  image: string
  quote: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Alexandra Mitchell',
    role: 'Senior Frontend Developer',
    image: 'https://notion-avatars.netlify.app/api/avatar?preset=female-1',
    quote:
      'This platform has completely transformed our development workflow. The component system is so well-architected that even complex applications feel simple to build.',
  },
  {
    name: 'James Thompson',
    role: 'Technical Lead',
    image: 'https://notion-avatars.netlify.app/api/avatar?preset=male-1',
    quote: 'After trying countless frameworks, this is the one that finally clicked. The documentation is exceptional.',
  },
  {
    name: 'Priya Sharma',
    role: 'Product Designer',
    image: 'https://notion-avatars.netlify.app/api/avatar?preset=female-2',
    quote:
      'The design system is beautiful and consistent. I can prototype ideas quickly and hand them off to developers with confidence that the implementation will match perfectly.',
  },
  {
    name: 'Robert Kim',
    role: 'Engineering Manager',
    image: 'https://notion-avatars.netlify.app/api/avatar?preset=male-2',
    quote:
      'We migrated our entire application to this platform in just two weeks. The performance improvements were immediate.',
  },
  {
    name: 'Maria Santos',
    role: 'Full Stack Engineer',
    image: 'https://notion-avatars.netlify.app/api/avatar?preset=female-3',
    quote:
      'The accessibility features are top-notch. Building inclusive applications has never been easier. Every component follows best practices out of the box, and the automated testing suite ensures we maintain high accessibility standards throughout our development process.',
  },
  {
    name: 'Thomas Anderson',
    role: 'Solutions Architect',
    image: 'https://notion-avatars.netlify.app/api/avatar?preset=male-3',
    quote: 'Scalability was our biggest concern, but this platform handles enterprise-level complexity with ease.',
  },
  {
    name: 'Lisa Chang',
    role: 'UX Researcher',
    image: 'https://notion-avatars.netlify.app/api/avatar?preset=female-4',
    quote:
      'User testing results have been consistently positive since we adopted this platform. The user experience is intuitive and the performance is stellar. Our user satisfaction scores have increased by 40% since the migration.',
  },
  {
    name: 'Michael Foster',
    role: 'DevOps Engineer',
    image: 'https://notion-avatars.netlify.app/api/avatar?preset=male-4',
    quote: 'Deployment and maintenance are a breeze. The platform integrates seamlessly with our CI/CD pipeline.',
  },
  {
    name: 'Sophie Laurent',
    role: 'Creative Director',
    image: 'https://notion-avatars.netlify.app/api/avatar?preset=female-5',
    quote:
      'The creative possibilities are endless. We can bring any design concept to life without compromising on technical quality or user experience.',
  },
  {
    name: 'Daniel Wilson',
    role: 'Backend Developer',
    image: 'https://notion-avatars.netlify.app/api/avatar?preset=male-5',
    quote: 'The API design is exceptional. Clean, intuitive, and well-documented.',
  },
  {
    name: 'Natasha Petrov',
    role: 'Mobile App Developer',
    image: 'https://notion-avatars.netlify.app/api/avatar?preset=female-6',
    quote:
      'Cross-platform development has never been this efficient. One codebase, multiple platforms, consistent user experience. This is the future. The responsive design system ensures our apps look perfect on every device.',
  },
  {
    name: 'Carlos Rivera',
    role: 'Startup Founder',
    image: 'https://notion-avatars.netlify.app/api/avatar?preset=male-6',
    quote: 'As a non-technical founder, this platform gave me the confidence to build our MVP quickly.',
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="container mx-auto px-8 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Empowering Innovation Worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of developers and teams who trust our platform to build exceptional digital experiences.
          </p>
        </div>

        {/* Testimonials Masonry Grid */}
        <div className="columns-1 gap-4 md:columns-2 md:gap-6 lg:columns-3 lg:gap-4">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="mb-6 break-inside-avoid shadow-none lg:mb-4">
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar className="bg-muted size-12 shrink-0">
                    <AvatarImage
                      alt={testimonial.name}
                      src={testimonial.image}
                      loading="lazy"
                      width="120"
                      height="120"
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <a href="#" onClick={e => e.preventDefault()} className="cursor-pointer">
                      <h3 className="font-medium hover:text-primary transition-colors">{testimonial.name}</h3>
                    </a>
                    <span className="text-muted-foreground block text-sm tracking-wide">
                      {testimonial.role}
                    </span>
                  </div>
                </div>

                <blockquote className="mt-4">
                  <p className="text-sm leading-relaxed text-balance">{testimonial.quote}</p>
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
