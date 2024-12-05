import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  return (
    <main className="p-8 max-w-6xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Shadcn UI Components Demo</CardTitle>
          <CardDescription>A showcase of various shadcn-ui components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Basic Components Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Basic Components</h2>
              <div className="flex gap-4 items-center">
                <Button variant="default">Default Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              
              <div className="flex gap-4 items-center">
                <Input placeholder="Type something..." className="max-w-sm" />
                <Badge>New</Badge>
                <Badge variant="secondary">Secondary Badge</Badge>
              </div>
            </section>

            {/* Avatar Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Avatars</h2>
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
              </div>
            </section>

            {/* Tabs Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Tabs</h2>
              <Tabs defaultValue="account" className="w-full">
                <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account</CardTitle>
                      <CardDescription>
                        Make changes to your account here.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Input placeholder="Email" className="max-w-sm" />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
                <TabsContent value="settings">Manage your settings.</TabsContent>
              </Tabs>
            </section>

            {/* Alert Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Alerts</h2>
              <Alert>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  This is an example alert using shadcn-ui components.
                </AlertDescription>
              </Alert>
            </section>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
