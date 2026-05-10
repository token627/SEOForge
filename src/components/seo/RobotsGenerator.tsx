"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check, Plus, Trash } from "lucide-react";

export function RobotsGenerator() {
  const [copied, setCopied] = useState(false);

  const form = useForm({
    defaultValues: {
      sitemapUrl: "https://example.com/sitemap.xml",
      rules: [
        {
          userAgent: "*",
          allow: "",
          disallow: "/admin, /private"
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rules"
  });

  const generateRobots = (values: { sitemapUrl: string, rules: any[] }) => {
    let txt = "";
    
    values.rules.forEach(rule => {
      if (rule.userAgent) txt += `User-agent: ${rule.userAgent}\n`;
      
      const allows = rule.allow.split(",").map((s: string) => s.trim()).filter(Boolean);
      allows.forEach((p: string) => { txt += `Allow: ${p}\n`; });
      
      const disallows = rule.disallow.split(",").map((s: string) => s.trim()).filter(Boolean);
      disallows.forEach((p: string) => { txt += `Disallow: ${p}\n`; });
      
      txt += "\\n";
    });
    
    if (values.sitemapUrl) {
      txt += `Sitemap: ${values.sitemapUrl}\n`;
    }
    
    return txt.trim();
  };

  const txtOutput = generateRobots(form.watch());

  const copyToClipboard = () => {
    navigator.clipboard.writeText(txtOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Robots.txt Rules</CardTitle>
          <CardDescription>Configure crawler access to your site.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              
              <FormField control={form.control} name="sitemapUrl" render={({ field }) => (
                <FormItem>
                  <FormLabel>Global Sitemap URL (Optional)</FormLabel>
                  <FormControl><Input placeholder="https://example.com/sitemap.xml" {...field} /></FormControl>
                </FormItem>
              )} />
              
              <div className="space-y-4">
                <div className="text-sm font-semibold">User Agent Rules</div>
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
                    
                    <FormField control={form.control} name={`rules.${index}.userAgent`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>User-agent</FormLabel>
                        <FormControl><Input placeholder="*" {...field} /></FormControl>
                      </FormItem>
                    )} />
                    
                    <FormField control={form.control} name={`rules.${index}.allow`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allow Paths (comma separated)</FormLabel>
                        <FormControl><Input placeholder="/public, /assets" {...field} /></FormControl>
                      </FormItem>
                    )} />
                    
                    <FormField control={form.control} name={`rules.${index}.disallow`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Disallow Paths (comma separated)</FormLabel>
                        <FormControl><Input placeholder="/admin, /private" {...field} /></FormControl>
                      </FormItem>
                    )} />
                  </div>
                ))}

                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full border-dashed" 
                  onClick={() => append({ userAgent: "Googlebot", allow: "", disallow: "" })}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Rule Block
                </Button>
              </div>

            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="h-full flex flex-col">
        <CardHeader className="flex flex-row justify-between items-start space-y-0 pb-2">
          <div className="space-y-1.5">
            <CardTitle>robots.txt</CardTitle>
            <CardDescription>Live generated text format.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied" : "Copy Text"}
          </Button>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="bg-slate-950 p-4 rounded-lg h-full overflow-auto text-sm font-mono text-slate-300 whitespace-pre">
            {txtOutput || "# Empty robots.txt"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
