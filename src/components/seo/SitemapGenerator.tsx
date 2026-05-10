"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check, Plus, Trash } from "lucide-react";

export function SitemapGenerator() {
  const [copied, setCopied] = useState(false);

  const form = useForm({
    defaultValues: {
      urls: [
        {
          loc: "https://example.com/",
          lastmod: new Date().toISOString().split("T")[0],
          changefreq: "daily",
          priority: "1.0"
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "urls"
  });

  const generateSitemap = (values: { urls: any[] }) => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    values.urls.forEach(url => {
      xml += `  <url>\n`;
      if (url.loc) xml += `    <loc>${url.loc}</loc>\n`;
      if (url.lastmod) xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      if (url.changefreq) xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      if (url.priority) xml += `    <priority>${url.priority}</priority>\n`;
      xml += `  </url>\n`;
    });
    
    xml += `</urlset>`;
    return xml;
  };

  const xmlOutput = generateSitemap(form.watch());

  const copyToClipboard = () => {
    navigator.clipboard.writeText(xmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Sitemap URLs</CardTitle>
          <CardDescription>Add pages to include in your sitemap.xml.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg relative space-y-4 bg-muted/20">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 h-8 w-8 text-destructive" 
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                  
                  <FormField control={form.control} name={`urls.${index}.loc`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page URL</FormLabel>
                      <FormControl><Input placeholder="https://example.com/page" {...field} /></FormControl>
                    </FormItem>
                  )} />
                  
                  <div className="grid grid-cols-3 gap-4">
                    <FormField control={form.control} name={`urls.${index}.lastmod`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Modified</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                      </FormItem>
                    )} />
                    
                    <FormField control={form.control} name={`urls.${index}.changefreq`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frequency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="always">Always</SelectItem>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )} />
                    
                    <FormField control={form.control} name={`urls.${index}.priority`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent>
                            {["1.0", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1", "0.0"].map(p => (
                              <SelectItem key={p} value={p}>{p}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )} />
                  </div>
                </div>
              ))}

              <Button 
                type="button" 
                variant="outline" 
                className="w-full border-dashed" 
                onClick={() => append({ loc: "", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.5" })}
              >
                <Plus className="mr-2 h-4 w-4" /> Add URL
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="h-full flex flex-col">
        <CardHeader className="flex flex-row justify-between items-start space-y-0 pb-2">
          <div className="space-y-1.5">
            <CardTitle>sitemap.xml</CardTitle>
            <CardDescription>Live generated XML format.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied" : "Copy XML"}
          </Button>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="bg-slate-950 p-4 rounded-lg h-full overflow-auto text-sm font-mono text-emerald-400 whitespace-pre">
            {xmlOutput}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
