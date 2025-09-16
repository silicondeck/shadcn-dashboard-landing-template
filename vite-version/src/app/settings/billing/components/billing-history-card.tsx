import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface BillingHistoryItem {
  id: number
  month: string
  plan: string
  amount: string
  status: string
}

interface BillingHistoryCardProps {
  history: BillingHistoryItem[]
}

export function BillingHistoryCard({ history }: BillingHistoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
        <CardDescription>
          View your past invoices and payments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="font-medium">{item.month}</div>
                  <div className="text-sm text-muted-foreground">{item.plan}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{item.amount}</div>
                  <Badge variant="secondary">{item.status}</Badge>
                </div>
              </div>
              {index < history.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
