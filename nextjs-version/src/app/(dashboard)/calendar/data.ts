import { type CalendarEvent, type Calendar } from "./types"

// Import JSON data
import eventsData from "./data/events.json"
import eventDatesData from "./data/event-dates.json"
import calendarsData from "./data/calendars.json"

// Convert JSON events to CalendarEvent objects with proper Date objects
// Always use current month and year, but preserve day and time from JSON
export const events: CalendarEvent[] = eventsData.map(event => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() // 0-based month

  // Parse the day from the date string (format: "11T09:00:00.000Z")
  const dayAndTime = event.date.split('T')
  const day = parseInt(dayAndTime[0])
  const timeStr = dayAndTime[1] // "09:00:00.000Z"

  // Parse hours and minutes from time string
  const timeParts = timeStr.split(':')
  const hours = parseInt(timeParts[0])
  const minutes = parseInt(timeParts[1])

  // Create date with current year/month but original day and time
  const eventDate = new Date(currentYear, currentMonth, day, hours, minutes)

  return {
    ...event,
    date: eventDate,
    type: event.type as "meeting" | "event" | "personal" | "task" | "reminder"
  }
})

// Convert event dates for calendar picker - also use current month/year
export const eventDates = eventDatesData.map(item => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  // Parse day from date string
  const day = parseInt(item.date.split('T')[0])
  const eventDate = new Date(currentYear, currentMonth, day)

  return {
    date: eventDate,
    count: item.count
  }
})

// Calendars data
export const calendars: Calendar[] = calendarsData as Calendar[]

// Export individual collections for convenience
export { eventsData, eventDatesData, calendarsData }
