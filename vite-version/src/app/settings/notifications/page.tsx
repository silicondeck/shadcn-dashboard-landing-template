"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { BaseLayout } from "@/components/layouts/base-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bell, Mail, MessageSquare } from "lucide-react"

const notificationsFormSchema = z.object({
  emailSecurity: z.boolean(),
  emailUpdates: z.boolean(),
  emailMarketing: z.boolean(),
  pushMessages: z.boolean(),
  pushMentions: z.boolean(),
  pushTasks: z.boolean(),
  emailFrequency: z.string(),
  quietHoursStart: z.string(),
  quietHoursEnd: z.string(),
  channelEmail: z.boolean(),
  channelPush: z.boolean(),
  channelSms: z.boolean(),
  // New notification table fields
  orderUpdatesEmail: z.boolean(),
  orderUpdatesBrowser: z.boolean(),
  orderUpdatesApp: z.boolean(),
  invoiceRemindersEmail: z.boolean(),
  invoiceRemindersBrowser: z.boolean(),
  invoiceRemindersApp: z.boolean(),
  promotionalOffersEmail: z.boolean(),
  promotionalOffersBrowser: z.boolean(),
  promotionalOffersApp: z.boolean(),
  systemMaintenanceEmail: z.boolean(),
  systemMaintenanceBrowser: z.boolean(),
  systemMaintenanceApp: z.boolean(),
  notificationTiming: z.string(),
})

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

export default function NotificationSettings() {
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailSecurity: false,
      emailUpdates: true,
      emailMarketing: false,
      pushMessages: true,
      pushMentions: true,
      pushTasks: false,
      emailFrequency: "instant",
      quietHoursStart: "22:00",
      quietHoursEnd: "06:00",
      channelEmail: true,
      channelPush: true,
      channelSms: false,
      // New notification table defaults
      orderUpdatesEmail: true,
      orderUpdatesBrowser: true,
      orderUpdatesApp: true,
      invoiceRemindersEmail: true,
      invoiceRemindersBrowser: false,
      invoiceRemindersApp: true,
      promotionalOffersEmail: false,
      promotionalOffersBrowser: true,
      promotionalOffersApp: false,
      systemMaintenanceEmail: true,
      systemMaintenanceBrowser: true,
      systemMaintenanceApp: false,
      notificationTiming: "online",
    },
  })

  function onSubmit(data: NotificationsFormValues) {
    console.log("Notifications settings submitted:", data)
    // Here you would typically save the settings
  }

  return (
    <BaseLayout>
      <div className="space-y-6 px-4 lg:px-6">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Configure how you receive notifications.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>
                    Choose what email notifications you want to receive.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="emailSecurity"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel>Security alerts</FormLabel>
                            <p className="text-sm text-muted-foreground">
                              Get notified when there are security events on your account.
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="emailUpdates"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel>Product updates</FormLabel>
                            <p className="text-sm text-muted-foreground">
                              Receive updates about new features and improvements.
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="emailMarketing"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel>Marketing emails</FormLabel>
                            <p className="text-sm text-muted-foreground">
                              Receive emails about our latest offers and promotions.
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Push Notifications</CardTitle>
                  <CardDescription>
                    Configure browser and mobile push notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="pushMessages"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel>New messages</FormLabel>
                            <p className="text-sm text-muted-foreground">
                              Get notified when you receive new messages.
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pushMentions"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel>Mentions</FormLabel>
                            <p className="text-sm text-muted-foreground">
                              Get notified when someone mentions you.
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pushTasks"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel>Task updates</FormLabel>
                            <p className="text-sm text-muted-foreground">
                              Get notified about task assignments and updates.
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Notification Frequency</CardTitle>
                <CardDescription>
                  Control how often you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="emailFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Frequency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="instant">Instant</SelectItem>
                          <SelectItem value="hourly">Hourly digest</SelectItem>
                          <SelectItem value="daily">Daily digest</SelectItem>
                          <SelectItem value="weekly">Weekly digest</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem>
                  <FormLabel>Quiet Hours</FormLabel>
                  <div className="flex space-x-2">
                    <FormField
                      control={form.control}
                      name="quietHoursStart"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-50">
                              <SelectValue placeholder="Start" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="22:00">10:00 PM</SelectItem>
                            <SelectItem value="23:00">11:00 PM</SelectItem>
                            <SelectItem value="00:00">12:00 AM</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <span className="self-center">to</span>
                    <FormField
                      control={form.control}
                      name="quietHoursEnd"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-50">
                              <SelectValue placeholder="End" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="06:00">6:00 AM</SelectItem>
                            <SelectItem value="07:00">7:00 AM</SelectItem>
                            <SelectItem value="08:00">8:00 AM</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </FormItem>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  We need permission from your browser to show notifications.{" "}
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Request Permission
                  </Button>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">TYPE</TableHead>
                        <TableHead className="text-center">EMAIL</TableHead>
                        <TableHead className="text-center">BROWSER</TableHead>
                        <TableHead className="text-center">APP</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Order updates</TableCell>
                        <TableCell className="text-center">
                          <FormField
                            control={form.control}
                            name="orderUpdatesEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <FormField
                            control={form.control}
                            name="orderUpdatesBrowser"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <FormField
                            control={form.control}
                            name="orderUpdatesApp"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Invoice reminders</TableCell>
                        <TableCell className="text-center">
                          <FormField
                            control={form.control}
                            name="invoiceRemindersEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <FormField
                            control={form.control}
                            name="invoiceRemindersBrowser"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <FormField
                            control={form.control}
                            name="invoiceRemindersApp"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Promotional offers</TableCell>
                        <TableCell className="text-center">
                          <FormField
                            control={form.control}
                            name="promotionalOffersEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <FormField
                            control={form.control}
                            name="promotionalOffersBrowser"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <FormField
                            control={form.control}
                            name="promotionalOffersApp"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">System maintenance</TableCell>
                        <TableCell className="text-center">
                          <FormField
                            control={form.control}
                            name="systemMaintenanceEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <FormField
                            control={form.control}
                            name="systemMaintenanceBrowser"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <FormField
                            control={form.control}
                            name="systemMaintenanceApp"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="notificationTiming"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>When should we send you notifications?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full max-w-sm">
                                <SelectValue placeholder="Select timing" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="online">Only When I'm online</SelectItem>
                              <SelectItem value="always">Always</SelectItem>
                              <SelectItem value="never">Never</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />


                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
                <CardDescription>
                  Choose your preferred notification channels for different types of alerts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="channelEmail"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <FormLabel className="font-medium mb-1">Email</FormLabel>
                            <div className="text-sm text-muted-foreground">Receive notifications via email</div>
                          </div>
                        </div>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <FormField
                    control={form.control}
                    name="channelPush"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Bell className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <FormLabel className="font-medium mb-1">Push Notifications</FormLabel>
                            <div className="text-sm text-muted-foreground">Receive browser push notifications</div>
                          </div>
                        </div>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <FormField
                    control={form.control}
                    name="channelSms"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <MessageSquare className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <FormLabel className="font-medium mb-1">SMS</FormLabel>
                            <div className="text-sm text-muted-foreground">Receive notifications via SMS</div>
                          </div>
                        </div>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-2">
              <Button type="submit" className="cursor-pointer">Save Preferences</Button>
              <Button variant="outline" type="reset" className="cursor-pointer">Cancel</Button>
            </div>
          </form>
        </Form>
      </div>
    </BaseLayout>
  )
}
