"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Check } from "lucide-react"
import { cn } from '@/lib/utils'

export interface PricingPlan {
  id: string
  name: string
  description: string
  price: string
  frequency: string
  features: string[]
  popular?: boolean
  current?: boolean
}

interface PricingPlansProps {
  plans?: PricingPlan[]
  mode?: 'pricing' | 'billing'
  currentPlanId?: string
  onPlanSelect?: (planId: string) => void
}

const defaultPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for small online stores',
    price: '$19',
    frequency: '/month',
    features: ['Up to 10 products', 'Basic inventory tracking', 'Email support', 'Mobile-responsive themes'],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Ideal for growing businesses',
    price: '$79',
    frequency: '/month',
    features: [
      'Up to 100 products',
      'Advanced analytics',
      'Priority email & chat support',
      'API access',
      'Custom domain',
      'Abandoned cart recovery',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For high-volume stores',
    price: '$199',
    frequency: '/month',
    features: [
      'Unlimited products',
      'Advanced reporting',
      '24/7 priority support',
      'Custom integrations',
      'Dedicated account manager',
      'Advanced security features',
    ],
  },
]

export function PricingPlans({ 
  plans = defaultPlans, 
  mode = 'pricing', 
  currentPlanId,
  onPlanSelect 
}: PricingPlansProps) {
  const getButtonText = (plan: PricingPlan) => {
    if (mode === 'billing') {
      if (currentPlanId === plan.id) {
        return 'Current Plan'
      }
      const currentIndex = plans.findIndex(p => p.id === currentPlanId)
      const planIndex = plans.findIndex(p => p.id === plan.id)
      
      if (planIndex > currentIndex) {
        return 'Upgrade Plan'
      } else if (planIndex < currentIndex) {
        return 'Downgrade Plan'
      }
    }
    return 'Get Started'
  }

  const getButtonVariant = (plan: PricingPlan) => {
    if (mode === 'billing' && currentPlanId === plan.id) {
      return 'outline' as const
    }
    return plan.popular ? 'default' as const : 'outline' as const
  }

  const isButtonDisabled = (plan: PricingPlan) => {
    return mode === 'billing' && currentPlanId === plan.id
  }

  return (
    <div className='grid gap-8 lg:grid-cols-3'>
      {plans.map(tier => (
        <Card
          key={tier.id}
          className={cn('flex flex-col pt-0', { 
            'border-primary relative shadow-lg': tier.popular,
            'border-primary': currentPlanId === tier.id && mode === 'billing'
          })}
          aria-labelledby={`${tier.id}-title`}
        >
          {tier.popular && (
            <div className='absolute start-0 -top-3 w-full'>
              <Badge className='mx-auto flex w-fit gap-1.5 rounded-full font-medium'>
                <Sparkles className='!size-4' />
                {mode === 'pricing' && (
                <span>Most Popular</span>
                )}
                {currentPlanId === tier.id && mode === 'billing' && (
                  <span>Current Plan</span>
                )}
              </Badge>
            </div>
          )}
          <CardHeader className='space-y-2 pt-8 text-center'>
            <CardTitle id={`${tier.id}-title`} className='text-2xl'>
              {tier.name}
            </CardTitle>
            <p className='text-muted-foreground text-sm text-balance'>{tier.description}</p>
          </CardHeader>
          <CardContent className='flex flex-1 flex-col space-y-6'>
            <div className='flex items-baseline justify-center'>
              <span className='text-4xl font-bold'>{tier.price}</span>
              <span className='text-muted-foreground text-sm'>{tier.frequency}</span>
            </div>
            <div className='space-y-2'>
              {tier.features.map(feature => (
                <div key={feature} className='flex items-center gap-2'>
                  <div className='bg-muted rounded-full p-1'>
                    <Check className='size-3.5' />
                  </div>
                  <span className='text-sm'>{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className='w-full cursor-pointer'
              size='lg'
              variant={getButtonVariant(tier)}
              disabled={isButtonDisabled(tier)}
              onClick={() => onPlanSelect?.(tier.id)}
              aria-label={`${getButtonText(tier)} - ${tier.name} plan`}
            >
              {getButtonText(tier)}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
