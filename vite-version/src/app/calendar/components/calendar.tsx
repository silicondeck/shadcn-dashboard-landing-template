"use client"

import { CalendarSidebar } from "./calendar-sidebar"
import { CalendarMain } from "./calendar-main"
import { EventForm } from "./event-form"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { type CalendarEvent } from "../types"
import { useCalendar } from "../use-calendar"

interface CalendarProps {
  events: CalendarEvent[]
  eventDates: Array<{ date: Date; count: number }>
}

export function Calendar({ events, eventDates }: CalendarProps) {
  const calendar = useCalendar(events)

  return (
    <>
      <div className="border rounded-lg bg-background relative">
        <div className="flex min-h-[800px]">
          {/* Desktop Sidebar - Hidden on mobile/tablet, shown on extra large screens */}
          <div className="hidden xl:block w-80 flex-shrink-0 border-r">
            <CalendarSidebar
              selectedDate={calendar.selectedDate}
              onDateSelect={calendar.handleDateSelect}
              onNewCalendar={calendar.handleNewCalendar}
              onNewEvent={calendar.handleNewEvent}
              events={eventDates}
              className="h-full"
            />
          </div>
          
          {/* Main Calendar Panel */}
          <div className="flex-1 min-w-0">
            <CalendarMain 
              selectedDate={calendar.selectedDate}
              onDateSelect={calendar.handleDateSelect}
              onMenuClick={() => calendar.setShowCalendarSheet(true)}
              events={calendar.events}
              onEventClick={calendar.handleEditEvent}
            />
          </div>
        </div>

        {/* Mobile/Tablet Sheet - Positioned relative to calendar container */}
        <Sheet open={calendar.showCalendarSheet} onOpenChange={calendar.setShowCalendarSheet}>
          <SheetContent side="left" className="w-80 p-0" style={{ position: 'absolute' }}>
            <SheetHeader className="p-4 pb-2">
              <SheetTitle>Calendar</SheetTitle>
              <SheetDescription>
                Browse dates and manage your calendar events
              </SheetDescription>
            </SheetHeader>
            <CalendarSidebar
              selectedDate={calendar.selectedDate}
              onDateSelect={calendar.handleDateSelect}
              onNewCalendar={calendar.handleNewCalendar}
              onNewEvent={calendar.handleNewEvent}
              events={eventDates}
              className="h-full"
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Event Form Dialog */}
      <EventForm
        event={calendar.editingEvent}
        open={calendar.showEventForm}
        onOpenChange={calendar.setShowEventForm}
        onSave={calendar.handleSaveEvent}
        onDelete={calendar.handleDeleteEvent}
      />
    </>
  )
}
