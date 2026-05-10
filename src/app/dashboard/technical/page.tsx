import { SitemapGenerator } from "@/components/seo/SitemapGenerator";
import { RobotsGenerator } from "@/components/seo/RobotsGenerator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TechnicalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Technical SEO Generators</h2>
        <p className="text-muted-foreground">
          Generate fundamental technical configuration files for search engine crawlers.
        </p>
      </div>

      <Tabs defaultValue="sitemap" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="sitemap">Sitemap XML</TabsTrigger>
          <TabsTrigger value="robots">Robots.txt</TabsTrigger>
        </TabsList>
        <TabsContent value="sitemap" className="mt-6">
          <SitemapGenerator />
        </TabsContent>
        <TabsContent value="robots" className="mt-6">
          <RobotsGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
