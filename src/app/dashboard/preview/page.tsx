import { SocialPreviewer } from "@/components/seo/SocialPreviewer";

export default function PreviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Social Preview</h2>
        <p className="text-muted-foreground">
          See how your page will look when shared on Google, Twitter, and Facebook/LinkedIn.
        </p>
      </div>
      <SocialPreviewer />
    </div>
  );
}
