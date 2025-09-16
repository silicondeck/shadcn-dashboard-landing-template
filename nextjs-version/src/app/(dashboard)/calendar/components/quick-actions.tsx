"use client"

import { 
  Clock,
  Users,
  Plus,
  Settings,
  Download,
  Share,
  Bell
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface QuickActionsProps {
  onNewEvent?: () => void
  onNewMeeting?: () => void
  onNewReminder?: () => void
  onSettings?: () => void
}

export function QuickActions({ 
  onNewEvent, 
  onNewMeeting, 
  onNewReminder, 
  onSettings 
}: QuickActionsProps) {
  const quickStats = [
    { label: "Today's Events", value: "3", color: "bg-blue-500" },
    { label: "This Week", value: "12", color: "bg-green-500" },
    { label: "Pending", value: "2", color: "bg-orange-500" }
  ]

  return (
    <div className="space-y-4">
      {/* Quick Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <Badge variant="secondary">{stat.value}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-start cursor-pointer" 
            onClick={onNewEvent}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start cursor-pointer" 
            onClick={onNewMeeting}
          >
            <Users className="w-4 h-4 mr-2" />
            Schedule Meeting
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start cursor-pointer" 
            onClick={onNewReminder}
          >
            <Bell className="w-4 h-4 mr-2" />
            Set Reminder
          </Button>

          <Separator className="my-3" />

          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start cursor-pointer" 
          >
            <Share className="w-4 h-4 mr-2" />
            Share Calendar
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start cursor-pointer" 
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start cursor-pointer" 
            onClick={onSettings}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Next Up
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Team Standup</p>
                <p className="text-xs text-muted-foreground">9:00 AM • Conference Room A</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Design Review</p>
                <p className="text-xs text-muted-foreground">2:00 PM • Virtual</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
