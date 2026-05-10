"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Copy, Check } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  keywords: z.string(),
  url: z.string().url({ message: "Please enter a valid URL." }),
});

export function MetadataGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<Record<string, string> | null>(null);
  const [copied, setCopied] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      keywords: "",
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/metadata/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  }

  const copyToClipboard = () => {
    if (!result) return;
    
    const nextjsCode = `export const metadata = {
  title: "${result.metaTitle}",
  description: "${result.metaDescription}",
  openGraph: {
    title: "${result.metaTitle}",
    description: "${result.metaDescription}",
    url: "${form.getValues().url}",
  },
  twitter: {
    card: "summary_large_image",
    title: "${result.metaTitle}",
    description: "${result.metaDescription}",
  }
};`;

    navigator.clipboard.writeText(nextjsCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Input Context</CardTitle>
          <CardDescription>
            Provide details about your page to generate optimized metadata.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Title / Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Best CRM Software for Startups" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/blog/best-crm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Keywords</FormLabel>
                    <FormControl>
                      <Input placeholder="crm, startup, sales tools" {...field} />
                    </FormControl>
                    <FormDescription>Comma separated</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Content / Summary</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Briefly describe what this page is about..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isGenerating}>
                {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Metadata
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="h-full flex flex-col">
        <CardHeader className="flex flex-row justify-between items-start space-y-0 pb-2">
          <div className="space-y-1.5">
            <CardTitle>Generated Result</CardTitle>
            <CardDescription>Review and copy your metadata.</CardDescription>
          </div>
          {result && (
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy Code"}
            </Button>
          )}
        </CardHeader>
        <CardContent className="flex-1">
          {!result ? (
            <div className="h-full flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg p-12 text-center">
              Submit the form to generate optimized metadata.
            </div>
          ) : (
            <Tabs defaultValue="nextjs" className="w-full h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="nextjs">Next.js Object</TabsTrigger>
                <TabsTrigger value="preview">Google Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="nextjs" className="flex-1 mt-4">
                <div className="bg-slate-950 p-4 rounded-lg overflow-auto h-full">
                  <pre className="text-sm text-green-400 font-mono">
{`export const metadata = {
  title: "${result.metaTitle}",
  description: "${result.metaDescription}",
  openGraph: {
    title: "${result.metaTitle}",
    description: "${result.metaDescription}",
    url: "${form.getValues().url}",
  },
  twitter: {
    card: "summary_large_image",
    title: "${result.metaTitle}",
    description: "${result.metaDescription}",
  }
};`}
                  </pre>
                </div>
              </TabsContent>
              <TabsContent value="preview" className="mt-4">
                <div className="bg-white dark:bg-slate-950 p-6 rounded-lg border">
                  <div className="text-sm text-[#202124] dark:text-[#dadce0] font-sans">
                    <div className="flex items-center space-x-2 text-[#4d5156] dark:text-[#bdc1c6] mb-1">
                      <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">
                        {form.getValues().url ? new URL(form.getValues().url).hostname[0].toUpperCase() : 'E'}
                      </div>
                      <div>
                        <span className="block text-[14px] leading-[20px] whitespace-nowrap overflow-hidden text-ellipsis max-w-[280px]">
                          {form.getValues().url ? new URL(form.getValues().url).hostname : 'example.com'}
                        </span>
                        <span className="block text-[12px] leading-[18px] whitespace-nowrap overflow-hidden text-ellipsis max-w-[280px]">
                          {form.getValues().url || 'https://example.com'}
                        </span>
                      </div>
                    </div>
                    <div className="text-[20px] text-[#1a0dab] dark:text-[#8ab4f8] leading-[26px] mb-1 font-medium hover:underline cursor-pointer">
                      {result.metaTitle}
                    </div>
                    <div className="text-[14px] leading-[22px] text-[#4d5156] dark:text-[#bdc1c6] max-w-[600px]">
                      {result.metaDescription}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
