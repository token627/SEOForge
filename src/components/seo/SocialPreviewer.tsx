"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function SocialPreviewer() {
  const form = useForm({
    defaultValues: {
      title: "The Ultimate Guide to Next.js SEO in 2026",
      description: "Learn how to optimize your Next.js application for search engines with dynamic metadata, sitemaps, and structured data.",
      url: "https://example.com/blog/nextjs-seo",
      siteName: "SEOForge Blog",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&h=630&auto=format&fit=crop"
    }
  });

  const values = form.watch();

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return "example.com";
    }
  };

  const domain = getDomain(values.url);
  const letter = domain ? domain.charAt(0).toUpperCase() : "E";

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Metadata Inputs</CardTitle>
          <CardDescription>Update the fields to see live previews.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Meta Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Meta Description</FormLabel><FormControl><Textarea className="h-24" {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="url" render={({ field }) => (
                <FormItem><FormLabel>Canonical URL</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="siteName" render={({ field }) => (
                <FormItem><FormLabel>Site Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="imageUrl" render={({ field }) => (
                <FormItem><FormLabel>OG Image URL (1200x630)</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Tabs defaultValue="google" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="google">Google</TabsTrigger>
            <TabsTrigger value="twitter">Twitter</TabsTrigger>
            <TabsTrigger value="facebook">Facebook / LinkedIn</TabsTrigger>
          </TabsList>
          
          <TabsContent value="google" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="bg-white dark:bg-slate-950 p-6 rounded-lg border max-w-2xl mx-auto">
                  <div className="text-sm text-[#202124] dark:text-[#dadce0] font-sans">
                    <div className="flex items-center space-x-3 text-[#4d5156] dark:text-[#bdc1c6] mb-2">
                      <div className="w-7 h-7 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                        {letter}
                      </div>
                      <div className="leading-tight">
                        <span className="block text-[14px] text-[#202124] dark:text-[#dadce0] whitespace-nowrap overflow-hidden text-ellipsis max-w-[280px]">
                          {values.siteName || domain}
                        </span>
                        <span className="block text-[12px] whitespace-nowrap overflow-hidden text-ellipsis max-w-[280px]">
                          {values.url || 'https://example.com'}
                        </span>
                      </div>
                    </div>
                    <div className="text-[20px] text-[#1a0dab] dark:text-[#8ab4f8] leading-[26px] mb-1 font-medium hover:underline cursor-pointer">
                      {values.title || "Page Title"}
                    </div>
                    <div className="text-[14px] leading-[22px] text-[#4d5156] dark:text-[#bdc1c6]">
                      {values.description || "Page description snippet goes here."}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="twitter" className="mt-4">
            <Card>
              <CardContent className="p-6 flex justify-center">
                <div className="w-[500px] border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-black font-sans">
                  {values.imageUrl ? (
                    <div className="w-full h-[260px] bg-slate-100 dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={values.imageUrl} alt="Twitter Card" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-full h-[260px] bg-slate-100 dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center text-slate-400">
                      No Image Provided
                    </div>
                  )}
                  <div className="p-3 bg-white dark:bg-black">
                    <div className="text-[15px] text-[#536471] dark:text-[#71767b] mb-0.5 line-clamp-1">
                      {domain}
                    </div>
                    <div className="text-[15px] text-[#0f1419] dark:text-[#e7e9ea] line-clamp-1">
                      {values.title || "Page Title"}
                    </div>
                    <div className="text-[15px] text-[#536471] dark:text-[#71767b] line-clamp-2 mt-0.5">
                      {values.description || "Page description"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facebook" className="mt-4">
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="w-[500px] border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E1E1E] font-sans">
                  {values.imageUrl ? (
                    <div className="w-full h-[260px] bg-slate-100 dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={values.imageUrl} alt="Facebook Shared Link" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-full h-[260px] bg-slate-100 dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center text-slate-400">
                      No Image Provided
                    </div>
                  )}
                  <div className="px-4 py-3 bg-[#f2f3f5] dark:bg-[#242526]">
                    <div className="text-[12px] uppercase text-[#606770] dark:text-[#b0b3b8] mb-1 line-clamp-1">
                      {domain}
                    </div>
                    <div className="text-[16px] font-semibold text-[#1d2129] dark:text-[#e4e6eb] line-clamp-1 mb-1">
                      {values.title || "Page Title"}
                    </div>
                    <div className="text-[14px] text-[#606770] dark:text-[#b0b3b8] line-clamp-1">
                      {values.description || "Page description"}
                    </div>
                  </div>
                </div>
                {values.url && (
                  <div className="mt-6 flex w-[500px] justify-end">
                    <Button 
                      variant="outline" 
                      onClick={() => window.open(`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(values.url)}`, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Test in Facebook Debugger
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
