import { BaseLayout } from "@/components/layouts/base-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Github, Slack, Twitter, Zap, Globe, Database, Apple, Chrome, Facebook, Instagram, Dribbble } from "lucide-react"
import { useState } from "react"


export default function ConnectionSettings() {
  // Controlled state for switches
  const [appleConnected, setAppleConnected] = useState(true)
  const [googleConnected, setGoogleConnected] = useState(false)
  const [githubConnected, setGithubConnected] = useState(true)
  const [slackConnected, setSlackConnected] = useState(false)
  const [zapierConnected, setZapierConnected] = useState(true)
  const [webhooksConnected, setWebhooksConnected] = useState(false)
  const [dbConnected, setDbConnected] = useState(true)

  return (
    <BaseLayout>
      <div className="space-y-6 px-4 lg:px-6">
        <div>
          <h1 className="text-3xl font-bold">Connections</h1>
          <p className="text-muted-foreground">
            Connect your account with third-party services and integrations.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>
                Display content from your connected accounts on your site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Apple className="h-8 w-8" />
                    <div>
                      <div className="font-medium">Apple</div>
                      <div className="text-sm text-muted-foreground">Calendar and contacts</div>
                    </div>
                  </div>
                  <Switch
                    className="cursor-pointer"
                    checked={appleConnected}
                    onCheckedChange={setAppleConnected}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Chrome className="h-8 w-8" />
                    <div>
                      <div className="font-medium">Google</div>
                      <div className="text-sm text-muted-foreground">Calendar and contacts</div>
                    </div>
                  </div>
                  <Switch
                    className="cursor-pointer"
                    checked={googleConnected}
                    onCheckedChange={setGoogleConnected}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Github className="h-8 w-8" />
                    <div>
                      <div className="font-medium">Github</div>
                      <div className="text-sm text-muted-foreground">Manage your Git repositories</div>
                    </div>
                  </div>
                  <Switch
                    className="cursor-pointer"
                    checked={githubConnected}
                    onCheckedChange={setGithubConnected}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Slack className="h-8 w-8" />
                    <div>
                      <div className="font-medium">Slack</div>
                      <div className="text-sm text-muted-foreground">Communication</div>
                    </div>
                  </div>
                  <Switch
                    className="cursor-pointer"
                    checked={slackConnected}
                    onCheckedChange={setSlackConnected}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Accounts</CardTitle>
              <CardDescription>
                Display content from your connected accounts on your site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Facebook className="h-8 w-8" />
                    <div>
                      <div className="font-medium">
                        Facebook
                        <Badge variant="outline" className="ml-2">Not Connected</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Share updates on Facebook</div>
                    </div>
                  </div>
                  <Button variant="outline" size="icon" className="cursor-pointer">
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Twitter className="h-8 w-8" />
                    <div>
                      <div className="font-medium">
                        Twitter
                        <Badge variant="secondary" className="ml-2">connected</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Share updates on Twitter</div>
                    </div>
                  </div>
                  <Button variant="outline" size="icon" className="cursor-pointer text-destructive">
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Instagram className="h-8 w-8" />
                    <div>
                      <div className="font-medium">
                        Instagram
                        <Badge variant="secondary" className="ml-2">connected</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Stay connected at Instagram</div>
                    </div>
                  </div>
                  <Button variant="outline" size="icon" className="cursor-pointer text-destructive">
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Dribbble className="h-8 w-8" />
                    <div>
                      <div className="font-medium">
                        Dribbble
                        <Badge variant="outline" className="ml-2">Not Connected</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Stay connected at Dribbble</div>
                    </div>
                  </div>
                  <Button variant="outline" size="icon" className="cursor-pointer">
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>API Integrations</CardTitle>
              <CardDescription>
                Configure API connections and webhooks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-8 w-8" />
                    <div>
                      <div className="font-medium">Zapier</div>
                      <div className="text-sm text-muted-foreground">Automate workflows with Zapier</div>
                    </div>
                  </div>
                  <Switch
                    className="cursor-pointer"
                    checked={zapierConnected}
                    onCheckedChange={setZapierConnected}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-8 w-8" />
                    <div>
                      <div className="font-medium">Webhooks</div>
                      <div className="text-sm text-muted-foreground">Configure custom webhook endpoints</div>
                    </div>
                  </div>
                  <Switch
                    className="cursor-pointer"
                    checked={webhooksConnected}
                    onCheckedChange={setWebhooksConnected}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Database className="h-8 w-8" />
                    <div>
                      <div className="font-medium">Database Sync</div>
                      <div className="text-sm text-muted-foreground">Sync data with external databases</div>
                    </div>
                  </div>
                  <Switch
                    className="cursor-pointer"
                    checked={dbConnected}
                    onCheckedChange={setDbConnected}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage your API keys and access tokens.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="font-medium">Production API Key</div>
                    <div className="text-sm text-muted-foreground font-mono">sk_live_••••••••••••••••••••••••4234</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="cursor-pointer">
                      Regenerate
                    </Button>
                    <Button variant="outline" size="sm" className="cursor-pointer">
                      Copy
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="font-medium">Development API Key</div>
                    <div className="text-sm text-muted-foreground font-mono">sk_test_••••••••••••••••••••••••5678</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="cursor-pointer">
                      Regenerate
                    </Button>
                    <Button variant="outline" size="sm" className="cursor-pointer">
                      Copy
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="pt-4">
                  <Button variant="outline" className="cursor-pointer">Add New API Key</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  )
}
