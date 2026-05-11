"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function SettingsPage() {
  const form = useForm({
    defaultValues: {
      openAiKey: "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      defaultBrand: "SEOForge AI",
      notificationEmail: "admin@example.com"
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings, API keys, and application preferences.
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Preferences</CardTitle>
              <CardDescription>
                Configure default values for the metadata generator.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-4">
                  <FormField control={form.control} name="defaultBrand" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Brand Name</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormDescription>Appended to generated titles automatically.</FormDescription>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="notificationEmail" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notification Email</FormLabel>
                      <FormControl><Input type="email" {...field} /></FormControl>
                      <FormDescription>Where to send automated audit reports.</FormDescription>
                    </FormItem>
                  )} />
                </form>
              </Form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Manage external service keys for AI and analytics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-4">
                  <FormField control={form.control} name="openAiKey" render={({ field }) => (
                    <FormItem>
                      <FormLabel>OpenAI API Key</FormLabel>
                      <FormControl><Input type="password" {...field} /></FormControl>
                      <FormDescription>Required for AI metadata and schema generation.</FormDescription>
                    </FormItem>
                  )} />
                </form>
              </Form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save API Keys</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
