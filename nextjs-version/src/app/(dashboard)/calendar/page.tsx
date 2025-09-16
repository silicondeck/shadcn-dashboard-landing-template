import { Calendar } from "./components/calendar"
import { events, eventDates } from "./data"

export default function CalendarPage() {
  return (
    <div className="px-4 lg:px-6">
      <Calendar events={events} eventDates={eventDates} />
    </div>
  )
}
