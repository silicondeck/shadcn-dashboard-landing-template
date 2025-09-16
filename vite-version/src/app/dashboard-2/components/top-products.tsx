"use client"

import { Eye, Star, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const products = [
  {
    id: 1,
    name: "Premium Dashboard",
    sales: 2847,
    revenue: "$142,350",
    growth: "+23%",
    rating: 4.8,
    stock: 145,
    category: "Software",
  },
  {
    id: 2,
    name: "Analytics Pro",
    sales: 1923,
    revenue: "$96,150",
    growth: "+18%",
    rating: 4.6,
    stock: 67,
    category: "Tools",
  },
  {
    id: 3,
    name: "Mobile App Suite",
    sales: 1456,
    revenue: "$72,800",
    growth: "+12%",
    rating: 4.9,
    stock: 234,
    category: "Mobile",
  },
  {
    id: 4,
    name: "Enterprise License",
    sales: 892,
    revenue: "$178,400",
    growth: "+8%",
    rating: 4.7,
    stock: 12,
    category: "Enterprise",
  },
  {
    id: 5,
    name: "Basic Subscription",
    sales: 3421,
    revenue: "$68,420",
    growth: "+31%",
    rating: 4.4,
    stock: 999,
    category: "Subscription",
  },
]

export function TopProducts() {
  return (
    <Card className="cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Top Products</CardTitle>
          <CardDescription>Best performing products this month</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="cursor-pointer">
          <Eye className="h-4 w-4 mr-2" />
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.map((product, index) => (
          <div key={product.id} className="flex items-center p-3 rounded-lg border gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                #{index + 1}
              </div>
            <div className="flex gap-2 items-center justify-between space-x-3 flex-1 flex-wrap">
              <div className="">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">{product.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{product.sales} sales</span>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">{product.revenue}</p>
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-200 cursor-pointer"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {product.growth}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">Stock: {product.stock}</span>
                  <Progress
                    value={product.stock > 100 ? 100 : (product.stock / 100) * 100}
                    className="w-12 h-1"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
