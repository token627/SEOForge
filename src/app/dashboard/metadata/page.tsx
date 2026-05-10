import { MetadataGenerator } from "@/components/seo/MetadataGenerator";

export default function MetadataPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Metadata Generator</h2>
        <p className="text-muted-foreground">
          Generate SEO-optimized metadata, Open Graph tags, and Twitter cards using AI.
        </p>
      </div>
      <MetadataGenerator />
    </div>
  );
}
