"use client"

import { useState } from "react"
import { Check, ChevronRight, Plus, Eye, EyeOff, MoreHorizontal } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface CalendarItem {
  id: string
  name: string
  color: string
  visible: boolean
  type: "personal" | "work" | "shared"
}

interface CalendarGroup {
  name: string
  items: CalendarItem[]
}

interface CalendarsProps {
  calendars?: {
    name: string
    items: string[]
  }[]
  onCalendarToggle?: (calendarId: string, visible: boolean) => void
  onCalendarEdit?: (calendarId: string) => void
  onCalendarDelete?: (calendarId: string) => void
  onNewCalendar?: () => void
}

// Enhanced calendar data with colors and visibility
const enhancedCalendars: CalendarGroup[] = [
  {
    name: "My Calendars",
    items: [
      { id: "personal", name: "Personal", color: "bg-blue-500", visible: true, type: "personal" },
      { id: "work", name: "Work", color: "bg-green-500", visible: true, type: "work" },
      { id: "family", name: "Family", color: "bg-pink-500", visible: true, type: "personal" }
    ]
  },
  {
    name: "Favorites",
    items: [
      { id: "holidays", name: "Holidays", color: "bg-red-500", visible: true, type: "shared" },
      { id: "birthdays", name: "Birthdays", color: "bg-purple-500", visible: true, type: "personal" }
    ]
  },
  {
    name: "Other",
    items: [
      { id: "travel", name: "Travel", color: "bg-orange-500", visible: false, type: "personal" },
      { id: "reminders", name: "Reminders", color: "bg-yellow-500", visible: true, type: "personal" },
      { id: "deadlines", name: "Deadlines", color: "bg-red-600", visible: true, type: "work" }
    ]
  }
]

export function Calendars({
  onCalendarToggle,
  onCalendarEdit,
  onCalendarDelete,
  onNewCalendar
}: CalendarsProps) {
  const [calendarData, setCalendarData] = useState(enhancedCalendars)

  const handleToggleVisibility = (calendarId: string) => {
    setCalendarData(prev => prev.map(group => ({
      ...group,
      items: group.items.map(item => 
        item.id === calendarId 
          ? { ...item, visible: !item.visible }
          : item
      )
    })))
    
    const calendar = calendarData.flatMap(g => g.items).find(c => c.id === calendarId)
    if (calendar) {
      onCalendarToggle?.(calendarId, !calendar.visible)
    }
  }

  return (
    <div className="space-y-4">
      {calendarData.map((calendar, index) => (
        <div key={calendar.name}>
          <Collapsible
            defaultOpen={index === 0}
            className="group/collapsible"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
              <span className="text-sm font-medium">{calendar.name}</span>
              <div className="flex items-center gap-1">
                {index === 0 && (
                  <div
                    className="h-5 w-5 flex items-center justify-center opacity-0 group-hover/collapsible:opacity-100 cursor-pointer hover:bg-accent rounded-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onNewCalendar?.()
                    }}
                  >
                    <Plus className="h-3 w-3" />
                  </div>
                )}
                <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="mt-2 space-y-1">
                {calendar.items.map((item) => (
                  <div key={item.id} className="group/calendar-item">
                    <div className="flex items-center justify-between p-2 hover:bg-accent/50 rounded-md">
                      <div className="flex items-center gap-3 flex-1">
                        {/* Calendar Color & Visibility Toggle */}
                        <button
                          onClick={() => handleToggleVisibility(item.id)}
                          className={cn(
                            "flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border transition-all cursor-pointer",
                            item.visible 
                              ? cn("border-transparent text-white", item.color)
                              : "border-border bg-transparent"
                          )}
                        >
                          {item.visible && <Check className="size-3" />}
                        </button>

                        {/* Calendar Name */}
                        <span 
                          className={cn(
                            "flex-1 truncate text-sm cursor-pointer",
                            !item.visible && "text-muted-foreground"
                          )}
                          onClick={() => handleToggleVisibility(item.id)}
                        >
                          {item.name}
                        </span>

                        {/* Visibility Icon */}
                        <div className="opacity-0 group-hover/calendar-item:opacity-100">
                          {item.visible ? (
                            <Eye className="h-3 w-3 text-muted-foreground" />
                          ) : (
                            <EyeOff className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>

                        {/* More Options */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div
                              className="h-5 w-5 flex items-center justify-center p-0 opacity-0 group-hover/calendar-item:opacity-100 cursor-pointer hover:bg-accent rounded-sm"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-3 w-3" />
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" side="right">
                            <DropdownMenuItem 
                              onClick={() => onCalendarEdit?.(item.id)}
                              className="cursor-pointer"
                            >
                              Edit calendar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleToggleVisibility(item.id)}
                              className="cursor-pointer"
                            >
                              {item.visible ? "Hide" : "Show"} calendar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => onCalendarDelete?.(item.id)}
                              className="cursor-pointer text-destructive"
                            >
                              Delete calendar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  )
}
