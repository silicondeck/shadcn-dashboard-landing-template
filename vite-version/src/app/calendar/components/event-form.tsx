"use client"

import { useState } from "react"
import { CalendarIcon, Clock, MapPin, Users, Type, Tag } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle 
} from "@/components/ui/dialog"
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { type CalendarEvent } from "../types"

interface EventFormProps {
  event?: CalendarEvent | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (event: Partial<CalendarEvent>) => void
  onDelete?: (eventId: number) => void
}

const eventTypes = [
  { value: "meeting", label: "Meeting", color: "bg-blue-500" },
  { value: "event", label: "Event", color: "bg-green-500" },
  { value: "personal", label: "Personal", color: "bg-pink-500" },
  { value: "task", label: "Task", color: "bg-orange-500" },
  { value: "reminder", label: "Reminder", color: "bg-purple-500" }
]

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"
]

const durationOptions = [
  "15 min", "30 min", "45 min", "1 hour", "1.5 hours", "2 hours", "3 hours", "All day"
]

export function EventForm({ event, open, onOpenChange, onSave, onDelete }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: event?.title || "",
    date: event?.date || new Date(),
    time: event?.time || "9:00 AM",
    duration: event?.duration || "1 hour",
    type: event?.type || "meeting",
    location: event?.location || "",
    description: event?.description || "",
    attendees: event?.attendees || [],
    allDay: false,
    reminder: true
  })

  const [showCalendar, setShowCalendar] = useState(false)
  const [newAttendee, setNewAttendee] = useState("")

  const handleSave = () => {
    const eventData: Partial<CalendarEvent> = {
      ...formData,
      id: event?.id,
      color: eventTypes.find(t => t.value === formData.type)?.color || "bg-blue-500"
    }
    onSave(eventData)
    onOpenChange(false)
  }

  const handleDelete = () => {
    if (event?.id && onDelete) {
      onDelete(event.id)
      onOpenChange(false)
    }
  }

  const addAttendee = () => {
    if (newAttendee.trim() && !formData.attendees.includes(newAttendee.trim())) {
      setFormData(prev => ({
        ...prev,
        attendees: [...prev.attendees, newAttendee.trim()]
      }))
      setNewAttendee("")
    }
  }

  const removeAttendee = (attendee: string) => {
    setFormData(prev => ({
      ...prev,
      attendees: prev.attendees.filter(a => a !== attendee)
    }))
  }

  const selectedEventType = eventTypes.find(t => t.value === formData.type)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className={cn("w-3 h-3 rounded-full", selectedEventType?.color)} />
            {event ? "Edit Event" : "Create New Event"}
          </DialogTitle>
          <DialogDescription>
            {event ? "Make changes to this event" : "Add a new event to your calendar"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Event Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Event Title
            </Label>
            <Input
              id="title"
              placeholder="Enter event title..."
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="text-lg font-medium"
            />
          </div>

          {/* Event Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Event Type
              </Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as CalendarEvent["type"] }))}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <div className={cn("w-3 h-3 rounded-full", type.color)} />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Date
              </Label>
              <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    {format(formData.date, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => {
                      if (date) {
                        setFormData(prev => ({ ...prev, date }))
                        setShowCalendar(false)
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Time
              </Label>
              <Select value={formData.time} onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Duration and All Day */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Duration</Label>
              <Select value={formData.duration} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map(duration => (
                    <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Options</Label>
              <div className="flex items-center space-x-4 h-10">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="all-day"
                    checked={formData.allDay}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, allDay: checked }))}
                  />
                  <Label htmlFor="all-day" className="text-sm">All day</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="reminder"
                    checked={formData.reminder}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, reminder: checked }))}
                  />
                  <Label htmlFor="reminder" className="text-sm">Reminder</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Input
              id="location"
              placeholder="Add location..."
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>

          {/* Attendees */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Attendees
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add attendee..."
                value={newAttendee}
                onChange={(e) => setNewAttendee(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addAttendee()}
              />
              <Button onClick={addAttendee} variant="outline" className="cursor-pointer">Add</Button>
            </div>
            {formData.attendees.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.attendees.map((attendee, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-2 px-2 py-1">
                    <Avatar className="w-5 h-5">
                      <AvatarFallback className="text-[10px] font-medium">
                        {attendee.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{attendee}</span>
                    <button
                      onClick={() => removeAttendee(attendee)}
                      className="text-muted-foreground hover:text-foreground cursor-pointer"
                      type="button"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add description..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6">
            <Button onClick={handleSave} className="flex-1 cursor-pointer">
              {event ? "Update Event" : "Create Event"}
            </Button>
            {event && onDelete && (
              <Button onClick={handleDelete} variant="destructive" className="cursor-pointer">
                Delete
              </Button>
            )}
            <Button onClick={() => onOpenChange(false)} variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
