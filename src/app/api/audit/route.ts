import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return new NextResponse("URL is required", { status: 400 });
    }

    // Add https if missing
    const targetUrl = url.startsWith("http") ? url : `https://${url}`;

    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "SEOForge-Bot/1.0",
      },
    });

    if (!response.ok) {
      return new NextResponse(`Failed to fetch URL: ${response.statusText}`, { status: 400 });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const results = [];
    let score = 100;
    const deduct = (points: number) => { score = Math.max(0, score - points); };

    // 1. Meta Title
    const title = $("title").text();
    if (!title) {
      results.push({ id: "meta-title", category: "Technical", title: "Missing Meta Title", description: "The page does not have a <title> tag.", status: "fail" });
      deduct(10);
    } else if (title.length < 30 || title.length > 60) {
      results.push({ id: "meta-title", category: "Technical", title: "Suboptimal Meta Title Length", description: `Current length is ${title.length} characters. Recommended is 30-60.`, status: "warning" });
      deduct(5);
    } else {
      results.push({ id: "meta-title", category: "Technical", title: "Meta Title Present", description: "The page has an optimized <title> tag.", status: "pass" });
    }

    // 2. Meta Description
    const description = $("meta[name='description']").attr("content");
    if (!description) {
      results.push({ id: "meta-desc", category: "Technical", title: "Missing Meta Description", description: "The page does not have a meta description.", status: "fail" });
      deduct(10);
    } else if (description.length < 120 || description.length > 160) {
      results.push({ id: "meta-desc", category: "Technical", title: "Suboptimal Meta Description Length", description: `Current length is ${description.length} characters. Recommended is 120-160.`, status: "warning" });
      deduct(5);
    } else {
      results.push({ id: "meta-desc", category: "Technical", title: "Meta Description Present", description: "The page has an optimized meta description.", status: "pass" });
    }

    // 3. H1 Tag
    const h1s = $("h1");
    if (h1s.length === 0) {
      results.push({ id: "h1-missing", category: "Content", title: "Missing H1 Tag", description: "The page does not have an H1 heading.", status: "fail" });
      deduct(10);
    } else if (h1s.length > 1) {
      results.push({ id: "h1-multiple", category: "Content", title: "Multiple H1 Tags", description: `Found ${h1s.length} H1 tags. Best practice is to have exactly one H1 per page.`, status: "warning" });
      deduct(5);
    } else {
      results.push({ id: "h1-ok", category: "Content", title: "Single H1 Tag Present", description: "The page has exactly one H1 heading.", status: "pass" });
    }

    // 4. Canonical Tag
    const canonical = $("link[rel='canonical']").attr("href");
    if (!canonical) {
      results.push({ id: "canonical", category: "Technical", title: "Missing Canonical Tag", description: "No canonical URL is defined, which can cause duplicate content issues.", status: "fail" });
      deduct(10);
    } else {
      results.push({ id: "canonical", category: "Technical", title: "Canonical Tag Present", description: "Canonical URL is properly defined.", status: "pass" });
    }

    // 5. Image Alts
    const images = $("img");
    let missingAlts = 0;
    images.each((_, el) => {
      if (!$(el).attr("alt")) missingAlts++;
    });

    if (missingAlts > 0) {
      results.push({ id: "img-alt", category: "Accessibility", title: "Missing Image Alt Attributes", description: `${missingAlts} out of ${images.length} images are missing alt text.`, status: "fail" });
      deduct(missingAlts * 2); // 2 points per missing alt
    } else if (images.length > 0) {
      results.push({ id: "img-alt", category: "Accessibility", title: "Image Alts Present", description: "All images have alt text.", status: "pass" });
    }

    // 6. JSON-LD Structured Data
    const scripts = $("script[type='application/ld+json']");
    if (scripts.length === 0) {
      results.push({ id: "json-ld", category: "Technical", title: "Missing Structured Data", description: "No JSON-LD structured data found on the page.", status: "warning" });
      deduct(5);
    } else {
      results.push({ id: "json-ld", category: "Technical", title: "Structured Data Present", description: `Found ${scripts.length} JSON-LD scripts.`, status: "pass" });
    }

    // 7. Open Graph Tags
    const ogTitle = $("meta[property='og:title']").attr("content");
    const ogImage = $("meta[property='og:image']").attr("content");
    if (!ogTitle || !ogImage) {
      results.push({ id: "og-tags", category: "Technical", title: "Missing Open Graph Tags", description: "Essential Open Graph tags (title, image) for social sharing are missing.", status: "warning" });
      deduct(5);
    } else {
      results.push({ id: "og-tags", category: "Technical", title: "Open Graph Tags Present", description: "Open Graph tags are properly configured.", status: "pass" });
    }

    // 8. Heading Sequence Check
    const headings = $("h1, h2, h3, h4, h5, h6");
    let sequenceValid = true;
    let outOfOrderDetails: string[] = [];
    let previousLevel = 0;

    headings.each((i, el) => {
      const tagName = el.tagName.toLowerCase();
      const currentLevel = parseInt(tagName.replace("h", ""), 10);

      if (previousLevel !== 0) {
        if (currentLevel - previousLevel > 1) {
          sequenceValid = false;
          outOfOrderDetails.push(`H${previousLevel} to H${currentLevel}`);
        }
      }
      previousLevel = currentLevel;
    });

    if (!sequenceValid) {
      results.push({
        id: "heading-sequence",
        category: "Content",
        title: "Improper Heading Sequence",
        description: `Headings should not skip levels. Skips found: ${outOfOrderDetails.slice(0, 3).join(", ")}${outOfOrderDetails.length > 3 ? "..." : ""}`,
        status: "warning"
      });
      deduct(5);
    } else if (headings.length > 0) {
      results.push({
        id: "heading-sequence",
        category: "Content",
        title: "Valid Heading Sequence",
        description: "All heading tags follow a logical, sequential order.",
        status: "pass"
      });
    }

    return NextResponse.json({
      url: targetUrl,
      score,
      results
    });

  } catch (error: any) {
    console.error("Audit error:", error);
    return new NextResponse(`Error: ${error.message}`, { status: 500 });
  }
}
