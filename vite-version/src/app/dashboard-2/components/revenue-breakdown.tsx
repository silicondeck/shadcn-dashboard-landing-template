"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import type { PieSectorDataItem } from "recharts/types/polar/Pie"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const revenueData = [
  { category: "subscriptions", value: 45, amount: 24500, fill: "var(--color-subscriptions)" },
  { category: "sales", value: 30, amount: 16300, fill: "var(--color-sales)" },
  { category: "services", value: 15, amount: 8150, fill: "var(--color-services)" },
  { category: "partnerships", value: 10, amount: 5430, fill: "var(--color-partnerships)" },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
  },
  amount: {
    label: "Amount",
  },
  subscriptions: {
    label: "Subscriptions",
    color: "var(--chart-1)",
  },
  sales: {
    label: "One-time Sales", 
    color: "var(--chart-2)",
  },
  services: {
    label: "Services",
    color: "var(--chart-3)",
  },
  partnerships: {
    label: "Partnerships",
    color: "var(--chart-4)",
  },
}

export function RevenueBreakdown() {
  const id = "revenue-breakdown"
  const [activeCategory, setActiveCategory] = React.useState("sales")

  const activeIndex = React.useMemo(
    () => revenueData.findIndex((item) => item.category === activeCategory),
    [activeCategory]
  )
  
  const categories = React.useMemo(() => revenueData.map((item) => item.category), [])

  return (
    <Card data-chart={id} className="flex flex-col cursor-pointer">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-2">
        <div>
          <CardTitle>Revenue Breakdown</CardTitle>
          <CardDescription>Revenue distribution by source</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={activeCategory} onValueChange={setActiveCategory}>
            <SelectTrigger
              className="w-[175px] rounded-lg cursor-pointer"
              aria-label="Select a category"
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-lg">
              {categories.map((key) => {
                const config = chartConfig[key as keyof typeof chartConfig]

                if (!config) {
                  return null
                }

                return (
                  <SelectItem
                    key={key}
                    value={key}
                    className="rounded-md [&_span]:flex cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="flex h-3 w-3 shrink-0 "
                        style={{
                          backgroundColor: `var(--color-${key})`,
                        }}
                      />
                      {config?.label}
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          <Button variant="outline" className="cursor-pointer">
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <div className="flex justify-center">
            <ChartContainer
              id={id}
              config={chartConfig}
              className="mx-auto aspect-square w-full max-w-[300px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={revenueData}
                  dataKey="amount"
                  nameKey="category"
                  innerRadius={60}
                  strokeWidth={5}
                  activeIndex={activeIndex}
                  activeShape={({
                    outerRadius = 0,
                    ...props
                  }: PieSectorDataItem) => (
                    <g>
                      <Sector {...props} outerRadius={outerRadius + 10} />
                      <Sector
                        {...props}
                        outerRadius={outerRadius + 25}
                        innerRadius={outerRadius + 12}
                      />
                    </g>
                  )}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              ${(revenueData[activeIndex].amount / 1000).toFixed(0)}K
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Revenue
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
          
          <div className="flex flex-col justify-center space-y-4">
            {revenueData.map((item, index) => {
              const config = chartConfig[item.category as keyof typeof chartConfig]
              const isActive = index === activeIndex
              
              return (
                <div 
                  key={item.category}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                    isActive ? 'bg-muted' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setActiveCategory(item.category)}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-full"
                      style={{
                        backgroundColor: `var(--color-${item.category})`,
                      }}
                    />
                    <span className="font-medium">{config?.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${(item.amount / 1000).toFixed(1)}K</div>
                    <div className="text-sm text-muted-foreground">{item.value}%</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
