"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle, AlertCircle, Search, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
});

type AuditResult = {
  id: string;
  category: string;
  title: string;
  description: string;
  status: "pass" | "fail" | "warning";
};

type AuditData = {
  url: string;
  score: number;
  results: AuditResult[];
};

export default function AuditPage() {
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsAuditing(true);
    setError(null);
    setAuditData(null);
    
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      
      if (!response.ok) {
        throw new Error(await response.text());
      }
      
      const data = await response.json();
      setAuditData(data);
    } catch (err: any) {
      setError(err.message || "Failed to audit URL");
    } finally {
      setIsAuditing(false);
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">SEO Audit Tool</h2>
        <p className="text-muted-foreground">
          Enter a URL to perform an instant technical SEO analysis.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isAuditing}>
                {isAuditing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                Analyze
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900">
          <CardContent className="pt-6 text-red-600 dark:text-red-400">
            {error}
          </CardContent>
        </Card>
      )}

      {auditData && (
        <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <CardHeader className="p-0 mb-4">
              <CardTitle>SEO Score</CardTitle>
              <CardDescription className="line-clamp-1">{auditData.url}</CardDescription>
            </CardHeader>
            <div className={cn("text-7xl font-bold tracking-tighter", getScoreColor(auditData.score))}>
              {auditData.score}
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              out of 100
            </div>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Audit Results</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.open(`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(auditData.url)}`, "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Lighthouse Recommendations
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditData.results.map((result, i) => (
                  <div key={i} className="flex items-start space-x-4 p-4 rounded-lg border bg-card">
                    <div className="mt-0.5">
                      {result.status === "pass" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                      {result.status === "fail" && <XCircle className="h-5 w-5 text-red-500" />}
                      {result.status === "warning" && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">{result.title}</p>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground px-2 py-0.5 bg-muted rounded-full">
                          {result.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {result.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
