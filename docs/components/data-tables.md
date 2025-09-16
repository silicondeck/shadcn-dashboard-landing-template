# Data Tables

The template includes a powerful data table component built with TanStack Table v8. It provides sorting, filtering, pagination, and selection features out of the box.

## Basic Usage

```typescript
import { DataTable } from '@/components/data-table'
import { columns } from './columns'

function UsersTable() {
  const [data, setData] = useState([])
  
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
      placeholder="Search users..."
    />
  )
}
```

## Column Definition

Define your table columns with TypeScript support:

```typescript
import { ColumnDef } from '@tanstack/react-table'
import { User } from '@/types'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.getValue("role")}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Edit user</DropdownMenuItem>
          <DropdownMenuItem>Delete user</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
```

## Features

### Sorting

Click column headers to sort data:

```typescript
// Sortable column
{
  accessorKey: "createdAt",
  header: ({ column }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      Created At
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }) => (
    <div>{format(new Date(row.getValue("createdAt")), "MMM dd, yyyy")}</div>
  ),
}
```

### Filtering

Global search and column-specific filters:

```typescript
// With global search
<DataTable
  columns={columns}
  data={data}
  searchKey="name"
  placeholder="Search by name..."
/>

// With column filters
{
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => (
    <Badge variant={getStatusVariant(row.getValue("status"))}>
      {row.getValue("status")}
    </Badge>
  ),
  filterFn: (row, id, value) => {
    return value.includes(row.getValue(id))
  },
}
```

### Pagination

Built-in pagination controls:

```typescript
// Pagination is included by default
// Customize page sizes
<DataTable
  columns={columns}
  data={data}
  pageSize={50}
  pageSizeOptions={[10, 20, 50, 100]}
/>
```

### Selection

Row selection with bulk actions:

```typescript
// Selection column
{
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
}

// Bulk actions
function BulkActions({ selectedRows }: { selectedRows: Row<User>[] }) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleBulkDelete(selectedRows)}
      >
        Delete Selected ({selectedRows.length})
      </Button>
    </div>
  )
}
```

## Advanced Features

### Column Visibility

Allow users to show/hide columns:

```typescript
// Column visibility toggle
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" className="ml-auto">
      Columns <ChevronDown className="ml-2 h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    {table
      .getAllColumns()
      .filter((column) => column.getCanHide())
      .map((column) => {
        return (
          <DropdownMenuCheckboxItem
            key={column.id}
            className="capitalize"
            checked={column.getIsVisible()}
            onCheckedChange={(value) =>
              column.toggleVisibility(!!value)
            }
          >
            {column.id}
          </DropdownMenuCheckboxItem>
        )
      })}
  </DropdownMenuContent>
</DropdownMenu>
```

### Export Data

Export table data to CSV or other formats:

```typescript
function exportToCSV(data: User[], filename: string) {
  const csv = data.map(row => 
    Object.values(row).join(',')
  ).join('\n')
  
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
}

// Export button
<Button
  variant="outline"
  onClick={() => exportToCSV(data, 'users.csv')}
>
  <Download className="mr-2 h-4 w-4" />
  Export
</Button>
```

## Responsive Design

The data table is mobile-friendly:

```typescript
// Hide columns on mobile
{
  accessorKey: "description",
  header: "Description",
  cell: ({ row }) => (
    <div className="hidden md:block">
      {row.getValue("description")}
    </div>
  ),
}

// Mobile card view
function MobileCard({ item }: { item: User }) {
  return (
    <Card className="md:hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.email}</p>
          </div>
          <Badge variant="outline">{item.role}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
```

## Performance Optimization

### Virtual Scrolling

For large datasets, implement virtual scrolling:

```typescript
import { useVirtualizer } from '@tanstack/react-virtual'

function VirtualizedTable({ data }: { data: User[] }) {
  const parentRef = useRef<HTMLDivElement>(null)
  
  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  })

  return (
    <div ref={parentRef} className="h-400 overflow-auto">
      {virtualizer.getVirtualItems().map((virtualRow) => (
        <div
          key={virtualRow.index}
          style={{
            height: `${virtualRow.size}px`,
            transform: `translateY(${virtualRow.start}px)`,
          }}
        >
          <TableRow data={data[virtualRow.index]} />
        </div>
      ))}
    </div>
  )
}
```

### Memoization

Optimize re-renders with React.memo:

```typescript
const MemoizedDataTable = React.memo(DataTable)

// Memoize column definitions
const columns = useMemo(() => [
  // ... column definitions
], [])

// Memoize filtered data
const filteredData = useMemo(() => 
  data.filter(item => item.name.includes(searchTerm))
, [data, searchTerm])
```
