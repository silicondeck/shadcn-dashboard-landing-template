"use client"

import { useEffect, useState } from "react"
import { z } from "zod"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { taskSchema, type Task } from "./data/schema"
import tasksData from "./data/tasks.json"

// Use static import for tasks data (works in both Vite and Next.js)
async function getTasks() {
  return z.array(taskSchema).parse(tasksData)
}

export default function TaskPage() {
  const [tasks, setTasks] = useState<z.infer<typeof taskSchema>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const taskList = await getTasks()
        setTasks(taskList)
      } catch (error) {
        console.error("Failed to load tasks:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  const handleAddTask = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev])
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-muted-foreground">Loading tasks...</div>
      </div>
    )
  }

  return (
    <>
      {/* Mobile view placeholder - shows message instead of images */}
      <div className="md:hidden">
        <div className="flex items-center justify-center h-96 border rounded-lg bg-muted/20">
          <div className="text-center p-8">
            <h3 className="text-lg font-semibold mb-2">Tasks Dashboard</h3>
            <p className="text-muted-foreground">
              Please use a larger screen to view the full tasks interface.
            </p>
          </div>
        </div>
      </div>
      
      {/* Desktop view */}
      <div className="hidden h-full flex-1 flex-col px-4 md:px-6 md:flex">
        <DataTable data={tasks} columns={columns} onAddTask={handleAddTask} />
      </div>
    </>
  )
}
