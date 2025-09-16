export interface CalendarEvent {
  id: number
  title: string
  date: Date
  time: string
  duration: string
  type: "meeting" | "event" | "personal" | "task" | "reminder"
  attendees: string[]
  location: string
  color: string
  description?: string
}

export interface Calendar {
  id: string
  name: string
  color: string
  visible: boolean
  type: "personal" | "work" | "shared"
}
