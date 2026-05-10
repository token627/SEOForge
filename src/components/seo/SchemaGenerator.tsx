"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Plus, Trash } from "lucide-react";

export function SchemaGenerator() {
  const [schemaType, setSchemaType] = useState("Article");
  const [copied, setCopied] = useState(false);

  const form = useForm({
    defaultValues: {
      // Shared / General
      name: "",
      url: "",
      imageUrl: "",
      description: "",
      // Article
      headline: "",
      authorName: "",
      datePublished: "",
      // Organization / LocalBusiness
      logoUrl: "",
      sameAs: "", // Comma separated
      telephone: "",
      streetAddress: "",
      addressLocality: "",
      postalCode: "",
      openingHours: "", // e.g. Mo-Fr 09:00-17:00
      // Product
      brand: "",
      price: "",
      currency: "USD",
      availability: "InStock",
      // FAQ
      faqs: [{ question: "", answer: "" }],
      // Person
      jobTitle: "",
      worksFor: "",
    },
  });

  const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({
    control: form.control,
    name: "faqs",
  });

  const generateJsonLd = (values: Record<string, unknown>) => {
    switch (schemaType) {
      case "Article":
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
      case "Organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: values.name || "Company Name",
          url: values.url || "https://example.com",
          logo: values.logoUrl || "https://example.com/logo.png",
          sameAs: (values.sameAs as string)?.split(",").map(s => s.trim()).filter(Boolean) || []
        };
      case "LocalBusiness":
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: values.name || "Business Name",
          image: values.imageUrl || "https://example.com/image.jpg",
          telephone: values.telephone || "123-456-7890",
          address: {
            "@type": "PostalAddress",
            streetAddress: values.streetAddress || "123 Main St",
            addressLocality: values.addressLocality || "City",
            postalCode: values.postalCode || "12345"
          },
          openingHours: values.openingHours || "Mo-Fr 09:00-17:00"
        };
      case "Product":
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          name: values.name || "Product Name",
          image: values.imageUrl ? [values.imageUrl] : [],
          description: values.description || "Product description",
          brand: {
            "@type": "Brand",
            name: values.brand || "Brand Name"
          },
          offers: {
            "@type": "Offer",
            priceCurrency: values.currency || "USD",
            price: values.price || "10.00",
            availability: `https://schema.org/${values.availability || 'InStock'}`
          }
        };
      case "FAQPage":
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: (values.faqs as any[]).filter(f => f.question).map(f => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer
            }
          }))
        };
      case "Person":
        return {
          "@context": "https://schema.org",
          "@type": "Person",
          name: values.name || "John Doe",
          jobTitle: values.jobTitle || "Software Engineer",
          worksFor: {
            "@type": "Organization",
            name: values.worksFor || "Company Name"
          },
          url: values.url || "https://example.com"
        };
      default:
        return {};
    }
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
              <label className="text-sm font-medium leading-none">
                Schema Type
              </label>
              <Select value={schemaType} onValueChange={(val) => val && setSchemaType(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select schema type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Article">Article</SelectItem>
                  <SelectItem value="Organization">Organization</SelectItem>
                  <SelectItem value="LocalBusiness">Local Business</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="FAQPage">FAQ Page</SelectItem>
                  <SelectItem value="Person">Person</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Form {...form}>
              <form className="space-y-4">
                {schemaType === "Article" && (
                  <>
                    <FormField control={form.control} name="headline" render={({ field }) => (
                      <FormItem><FormLabel>Headline</FormLabel><FormControl><Input placeholder="Article Title" {...field} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="authorName" render={({ field }) => (
                      <FormItem><FormLabel>Author Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="datePublished" render={({ field }) => (
                      <FormItem><FormLabel>Date Published</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="imageUrl" render={({ field }) => (
                      <FormItem><FormLabel>Featured Image URL</FormLabel><FormControl><Input placeholder="https://example.com/image.jpg" {...field} /></FormControl></FormItem>
                    )} />
                  </>
                )}

                {schemaType === "Organization" && (
                  <>
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem><FormLabel>Organization Name</FormLabel><FormControl><Input placeholder="Company Inc" {...field} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="url" render={({ field }) => (
                      <FormItem><FormLabel>Website URL</FormLabel><FormControl><Input placeholder="https://example.com" {...field} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="logoUrl" render={({ field }) => (
                      <FormItem><FormLabel>Logo URL</FormLabel><FormControl><Input placeholder="https://example.com/logo.png" {...field} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="sameAs" render={({ field }) => (
                      <FormItem><FormLabel>Social Links (comma separated)</FormLabel><FormControl><Input placeholder="https://twitter.com/..., https://linkedin.com/..." {...field} /></FormControl></FormItem>
                    )} />
                  </>
                )}

                {schemaType === "LocalBusiness" && (
                  <>
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem><FormLabel>Business Name</FormLabel><FormControl><Input placeholder="Joe's Pizza" {...field} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="telephone" render={({ field }) => (
                      <FormItem><FormLabel>Telephone</FormLabel><FormControl><Input placeholder="123-456-7890" {...field} /></FormControl></FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="streetAddress" render={({ field }) => (
                        <FormItem><FormLabel>Street Address</FormLabel><FormControl><Input placeholder="123 Main St" {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={form.control} name="addressLocality" render={({ field }) => (
                        <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="New York" {...field} /></FormControl></FormItem>
                      )} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="postalCode" render={({ field }) => (
                        <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input placeholder="10001" {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={form.control} name="openingHours" render={({ field }) => (
                        <FormItem><FormLabel>Opening Hours</FormLabel><FormControl><Input placeholder="Mo-Fr 09:00-17:00" {...field} /></FormControl></FormItem>
                      )} />
                    </div>
                  </>
                )}

                {schemaType === "Product" && (
                  <>
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem><FormLabel>Product Name</FormLabel><FormControl><Input placeholder="Awesome Widget" {...field} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="description" render={({ field }) => (
                      <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Product description..." {...field} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="brand" render={({ field }) => (
                      <FormItem><FormLabel>Brand</FormLabel><FormControl><Input placeholder="WidgetCorp" {...field} /></FormControl></FormItem>
                    )} />
                    <div className="grid grid-cols-3 gap-4">
                      <FormField control={form.control} name="price" render={({ field }) => (
                        <FormItem><FormLabel>Price</FormLabel><FormControl><Input placeholder="19.99" {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={form.control} name="currency" render={({ field }) => (
                        <FormItem><FormLabel>Currency</FormLabel><FormControl><Input placeholder="USD" {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={form.control} name="availability" render={({ field }) => (
                        <FormItem><FormLabel>Availability</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="InStock">In Stock</SelectItem>
                              <SelectItem value="OutOfStock">Out of Stock</SelectItem>
                              <SelectItem value="PreOrder">Pre Order</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )} />
                    </div>
                  </>
                )}

                {schemaType === "FAQPage" && (
                  <div className="space-y-4">
                    {faqFields.map((item, index) => (
                      <div key={item.id} className="p-4 border rounded-md relative space-y-4">
                        <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 text-destructive" onClick={() => removeFaq(index)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                        <FormField control={form.control} name={`faqs.${index}.question`} render={({ field }) => (
                          <FormItem><FormLabel>Question</FormLabel><FormControl><Input placeholder="What is this?" {...field} /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name={`faqs.${index}.answer`} render={({ field }) => (
                          <FormItem><FormLabel>Answer</FormLabel><FormControl><Textarea placeholder="This is..." {...field} /></FormControl></FormItem>
                        )} />
                      </div>
                    ))}
                    <Button type="button" variant="outline" className="w-full" onClick={() => appendFaq({ question: "", answer: "" })}>
                      <Plus className="mr-2 h-4 w-4" /> Add Question
                    </Button>
                  </div>
                )}

                {schemaType === "Person" && (
                  <>
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="jobTitle" render={({ field }) => (
                      <FormItem><FormLabel>Job Title</FormLabel><FormControl><Input placeholder="Software Engineer" {...field} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="worksFor" render={({ field }) => (
                      <FormItem><FormLabel>Works For (Company)</FormLabel><FormControl><Input placeholder="Tech Inc" {...field} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="url" render={({ field }) => (
                      <FormItem><FormLabel>Personal URL</FormLabel><FormControl><Input placeholder="https://janedoe.com" {...field} /></FormControl></FormItem>
                    )} />
                  </>
                )}
              </form>
            </Form>
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
