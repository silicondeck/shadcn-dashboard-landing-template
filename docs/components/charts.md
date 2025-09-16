# Charts

The template integrates Recharts for data visualization with custom shadcn/ui theming. All charts are responsive and support both light and dark themes.

## Available Chart Types

### Area Chart

Display data trends over time:

```typescript
import { AreaChart } from '@/components/charts'

<AreaChart
  data={chartData}
  categories={["revenue", "profit"]}
  index="month"
  colors={["blue", "green"]}
  className="h-80"
/>
```

### Bar Chart

Compare values across categories:

```typescript
import { BarChart } from '@/components/charts'

<BarChart
  data={salesData}
  categories={["sales", "target"]}
  index="product"
  colors={["blue", "red"]}
  className="h-96"
/>
```

### Line Chart

Show trends and patterns:

```typescript
import { LineChart } from '@/components/charts'

<LineChart
  data={performanceData}
  categories={["users", "sessions"]}
  index="date"
  colors={["primary", "secondary"]}
  className="h-80"
/>
```

### Pie Chart

Display proportional data:

```typescript
import { PieChart } from '@/components/charts'

<PieChart
  data={distributionData}
  category="value"
  index="name"
  colors={["blue", "green", "yellow", "red"]}
  className="h-80"
/>
```

### Radial Bar Chart

Circular progress visualization:

```typescript
import { RadialBarChart } from '@/components/charts'

<RadialBarChart
  data={progressData}
  categories={["completion"]}
  index="task"
  colors={["primary"]}
  className="h-80"
/>
```

## Chart Configuration

### Basic Configuration

```typescript
const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  profit: {
    label: "Profit",
    color: "hsl(var(--chart-2))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-3))",
  },
}
```

### Advanced Configuration

```typescript
const advancedConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
    theme: {
      light: "#3b82f6",
      dark: "#60a5fa"
    }
  },
  showGrid: true,
  showLegend: true,
  showTooltip: true,
  animationDuration: 1000,
}
```

## Data Format

### Time Series Data

```typescript
const timeSeriesData = [
  { month: "Jan", revenue: 4000, profit: 2400 },
  { month: "Feb", revenue: 3000, profit: 1398 },
  { month: "Mar", revenue: 2000, profit: 9800 },
  { month: "Apr", revenue: 2780, profit: 3908 },
  { month: "May", revenue: 1890, profit: 4800 },
  { month: "Jun", revenue: 2390, profit: 3800 },
]
```

### Categorical Data

```typescript
const categoricalData = [
  { category: "Desktop", value: 45, fill: "hsl(var(--chart-1))" },
  { category: "Mobile", value: 35, fill: "hsl(var(--chart-2))" },
  { category: "Tablet", value: 20, fill: "hsl(var(--chart-3))" },
]
```

## Custom Chart Components

### Custom Tooltip

```typescript
import { Tooltip, TooltipContent } from '@/components/ui/tooltip'

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {label}
            </span>
            <span className="font-bold text-muted-foreground">
              {payload[0].value}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

// Usage
<AreaChart
  data={data}
  tooltip={<CustomTooltip />}
/>
```

### Custom Legend

```typescript
function CustomLegend({ payload }: any) {
  return (
    <div className="flex items-center justify-center gap-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}
```

## Responsive Charts

### Mobile Optimization

```typescript
function ResponsiveChart({ data }: { data: any[] }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768)
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return (
    <AreaChart
      data={data}
      categories={["revenue", "profit"]}
      index="month"
      className={isMobile ? "h-64" : "h-80"}
      showLegend={!isMobile}
      showGrid={!isMobile}
    />
  )
}
```

### Container Queries

```typescript
<div className="@container">
  <AreaChart
    data={data}
    categories={["revenue", "profit"]}
    index="month"
    className="h-80 @lg:h-96"
    showLegend="@md:true"
  />
</div>
```

## Animation and Interactions

### Loading States

```typescript
function ChartWithLoading({ data, loading }: { data: any[], loading: boolean }) {
  if (loading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <AreaChart
      data={data}
      categories={["revenue", "profit"]}
      index="month"
      className="h-80"
    />
  )
}
```

### Interactive Features

```typescript
function InteractiveChart({ data }: { data: any[] }) {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [highlightedSeries, setHighlightedSeries] = useState<string | null>(null)

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <Button
          variant={selectedPeriod === 'month' ? 'default' : 'outline'}
          onClick={() => setSelectedPeriod('month')}
        >
          Monthly
        </Button>
        <Button
          variant={selectedPeriod === 'quarter' ? 'default' : 'outline'}
          onClick={() => setSelectedPeriod('quarter')}
        >
          Quarterly
        </Button>
      </div>
      
      <AreaChart
        data={data}
        categories={["revenue", "profit"]}
        index={selectedPeriod}
        onSeriesHover={setHighlightedSeries}
        highlightedSeries={highlightedSeries}
        className="h-80"
      />
    </div>
  )
}
```

## Theme Integration

### CSS Variables

Charts use CSS variables for consistent theming:

```css
:root {
  --chart-1: 12 76% 61%;
  --chart-2: 173 58% 39%;
  --chart-3: 197 37% 24%;
  --chart-4: 43 74% 66%;
  --chart-5: 27 87% 67%;
}

.dark {
  --chart-1: 220 70% 50%;
  --chart-2: 160 60% 45%;
  --chart-3: 30 80% 55%;
  --chart-4: 280 65% 60%;
  --chart-5: 340 75% 55%;
}
```

### Dynamic Theming

```typescript
function ThemedChart({ data, theme }: { data: any[], theme: 'light' | 'dark' }) {
  const chartColors = theme === 'dark' 
    ? ['#60a5fa', '#34d399', '#fbbf24']
    : ['#3b82f6', '#10b981', '#f59e0b']

  return (
    <AreaChart
      data={data}
      categories={["revenue", "profit", "expenses"]}
      index="month"
      colors={chartColors}
      className="h-80"
    />
  )
}
```

## Performance Optimization

### Data Memoization

```typescript
function OptimizedChart({ rawData }: { rawData: any[] }) {
  const processedData = useMemo(() => {
    return rawData.map(item => ({
      ...item,
      revenue: item.revenue / 1000, // Convert to thousands
      profit: item.profit / 1000,
    }))
  }, [rawData])

  return (
    <AreaChart
      data={processedData}
      categories={["revenue", "profit"]}
      index="month"
      className="h-80"
    />
  )
}
```

### Lazy Loading

```typescript
const LazyAreaChart = lazy(() => import('@/components/charts/area-chart'))

function ChartContainer({ data }: { data: any[] }) {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <LazyAreaChart
        data={data}
        categories={["revenue", "profit"]}
        index="month"
        className="h-80"
      />
    </Suspense>
  )
}
```

## Accessibility

Charts include accessibility features:

- **Screen Reader Support** - Proper ARIA labels and descriptions
- **Keyboard Navigation** - Tab through chart elements
- **High Contrast** - Alternative styling for accessibility
- **Data Tables** - Alternative data presentation

```typescript
<AreaChart
  data={data}
  categories={["revenue", "profit"]}
  index="month"
  aria-label="Revenue and profit trends over time"
  aria-describedby="chart-description"
  className="h-80"
/>
<p id="chart-description" className="sr-only">
  This chart shows revenue and profit trends from January to June.
  Revenue peaked in March at $9,800, while profit was highest in May at $4,800.
</p>
```
