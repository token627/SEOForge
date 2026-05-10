"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check } from "lucide-react";

export function SchemaGenerator() {
  const [schemaType, setSchemaType] = useState("Article");
  const [copied, setCopied] = useState(false);

  const form = useForm({
    defaultValues: {
      headline: "",
      authorName: "",
      datePublished: "",
      imageUrl: "",
    },
  });

  const generateJsonLd = (values: Record<string, unknown>) => {
    if (schemaType === "Article") {
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: values.headline || "Example Headline",
        image: values.imageUrl ? [values.imageUrl] : [],
        datePublished: values.datePublished || new Date().toISOString(),
        author: [{
          "@type": "Person",
          name: values.authorName || "Author Name",
        }]
      };
    }
    return {};
  };

  const jsonLdString = JSON.stringify(generateJsonLd(form.watch()), null, 2);

  const copyToClipboard = () => {
    const code = `<script type="application/ld+json">\n${jsonLdString}\n</script>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Configure Schema</CardTitle>
          <CardDescription>
            Select a schema type and provide the necessary details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Schema Type
              </label>
              <Select value={schemaType} onValueChange={(val) => val && setSchemaType(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select schema type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Article">Article</SelectItem>
                  <SelectItem value="LocalBusiness">Local Business</SelectItem>
                  <SelectItem value="FAQPage">FAQ Page</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {schemaType === "Article" && (
              <Form {...form}>
                <form className="space-y-4">
                  <FormField
                    control={form.control}
                    name="headline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Headline</FormLabel>
                        <FormControl>
                          <Input placeholder="Article Title" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="authorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="datePublished"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date Published</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Featured Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="h-full flex flex-col">
        <CardHeader className="flex flex-row justify-between items-start space-y-0 pb-2">
          <div className="space-y-1.5">
            <CardTitle>JSON-LD Output</CardTitle>
            <CardDescription>Inject this script into your page head.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied" : "Copy Script"}
          </Button>
        </CardHeader>
        <CardContent className="flex-1">
          <Tabs defaultValue="json" className="w-full h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="json">Raw JSON</TabsTrigger>
              <TabsTrigger value="script">HTML Script</TabsTrigger>
            </TabsList>
            <TabsContent value="json" className="flex-1 mt-4">
              <div className="bg-slate-950 p-4 rounded-lg overflow-auto h-full">
                <pre className="text-sm text-yellow-300 font-mono">
                  {jsonLdString}
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="script" className="flex-1 mt-4">
              <div className="bg-slate-950 p-4 rounded-lg overflow-auto h-full">
                <pre className="text-sm text-sky-400 font-mono">
{`<script type="application/ld+json">
${jsonLdString}
</script>`}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
