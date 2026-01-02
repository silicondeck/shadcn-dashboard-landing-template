"use client"

import type { Table } from "@tanstack/react-table"
import { RefreshCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DataTableViewOptions } from "@/app/tasks/components/data-table-view-options"
import { AddTaskModal } from "./add-task-modal"

import { categories, priorities, statuses } from "../data/data"
import type { Task } from "../data/schema"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  onAddTask?: (task: Task) => void
}

export function DataTableToolbar<TData>({
  table,
  onAddTask,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const handleStatusChange = (value: string) => {
    const column = table.getColumn("status")
    if (value === "all") {
      column?.setFilterValue(undefined)
    } else {
      column?.setFilterValue(value)
    }
  }

  const handleCategoryChange = (value: string) => {
    const column = table.getColumn("category")
    if (value === "all") {
      column?.setFilterValue(undefined)
    } else {
      column?.setFilterValue(value)
    }
  }

  const handlePriorityChange = (value: string) => {
    const column = table.getColumn("priority")
    if (value === "all") {
      column?.setFilterValue(undefined)
    } else {
      column?.setFilterValue(value)
    }
  }

  const statusFilter = table.getColumn("status")?.getFilterValue() as string | undefined
  const categoryFilter = table.getColumn("category")?.getFilterValue() as string | undefined
  const priorityFilter = table.getColumn("priority")?.getFilterValue() as string | undefined

  return (
    <div className="space-y-4">
      {/* Filter Section */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* Status Filter */}
          <Select
            value={statusFilter || "all"}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="cursor-pointer">All Status</SelectItem>
              {statuses.map((status) => (
                <SelectItem
                  key={status.value}
                  value={status.value}
                  className="cursor-pointer"
                >
                  <div className="flex items-center">
                    {status.icon && (
                      <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    {status.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select
            value={categoryFilter || "all"}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="cursor-pointer">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem
                  key={category.value}
                  value={category.value}
                  className="cursor-pointer"
                >
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Priority Filter */}
          <Select
            value={priorityFilter || "all"}
            onValueChange={handlePriorityChange}
          >
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="cursor-pointer">All Priorities</SelectItem>
              {priorities.map((priority) => (
                <SelectItem
                  key={priority.value}
                  value={priority.value}
                  className="cursor-pointer"
                >
                  <div className="flex items-center">
                    {priority.icon && (
                      <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    {priority.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search and Actions Section */}
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search Task"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className=" w-[200px] lg:w-[300px] cursor-text"
          />
          <Button
            variant="outline"
            onClick={() => table.resetColumnFilters()}
            className="px-3 cursor-pointer"
            disabled={!isFiltered}
          >
            <RefreshCcw className="h-4 w-4" />
            <span className="hidden lg:block">Reset Filters</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <DataTableViewOptions table={table} />
          <AddTaskModal onAddTask={onAddTask} />
        </div>
      </div>
    </div>
  )
}
