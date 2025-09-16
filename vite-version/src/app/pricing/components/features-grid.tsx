import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, Shield, Zap, Users, Headphones, Clock } from "lucide-react"

// Icon mapping
const iconMap = {
  Rocket,
  Shield,
  Zap,
  Users,
  Headphones,
  Clock,
}

interface Feature {
  id: number
  name: string
  description: string
  icon: string
}

interface FeaturesGridProps {
  features: Feature[]
}

export function FeaturesGrid({ features }: FeaturesGridProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">All Plans Include</CardTitle>
        <CardDescription>
          Every plan comes with these essential features to help your team succeed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='mx-auto mt-6 sm:mt-8 lg:mt-12'>
          <dl className='grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-16'>
            {features.map(feature => {
              const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
              return (
                <div key={feature.name} className='relative pl-16'>
                  <div className='text-base leading-7 font-semibold'>
                    <div className='bg-accent absolute start-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg'>
                      <IconComponent className='text-foreground size-6' aria-hidden='true' />
                    </div>
                    <span className='text-lg'>{feature.name}</span>
                  </div>
                  <p className='text-muted-foreground mt-2 text-base leading-relaxed'>{feature.description}</p>
                </div>
              )
            })}
          </dl>
        </div>
      </CardContent>
    </Card>
  )
}
