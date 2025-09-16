"use client"

import { BaseLayout } from "@/components/layouts/base-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PricingPlans } from "@/components/pricing-plans"
import { CurrentPlanCard } from "./components/current-plan-card"
import { BillingHistoryCard } from "./components/billing-history-card"

// Import data
import currentPlanData from "./data/current-plan.json"
import billingHistoryData from "./data/billing-history.json"

export default function BillingSettings() {
  const handlePlanSelect = (planId: string) => {
    console.log('Plan selected:', planId)
    // Handle plan selection logic here
  }

  return (
    <BaseLayout>
      <div className="space-y-6 px-4 lg:px-6">
        <div>
          <h1 className="text-3xl font-bold">Plans & Billing</h1>
          <p className="text-muted-foreground">
            Manage your subscription and billing information.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <CurrentPlanCard plan={currentPlanData} />
          <BillingHistoryCard history={billingHistoryData} />
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Plans</CardTitle>
              <CardDescription>
                Choose a plan that works best for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PricingPlans 
                mode="billing" 
                currentPlanId="professional"
                onPlanSelect={handlePlanSelect}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  )
}
