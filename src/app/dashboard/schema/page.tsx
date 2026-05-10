import { SchemaGenerator } from "@/components/seo/SchemaGenerator";

export default function SchemaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Structured Data Generator</h2>
        <p className="text-muted-foreground">
          Generate valid JSON-LD structured data for Google Rich Results.
        </p>
      </div>
      <SchemaGenerator />
    </div>
  );
}
