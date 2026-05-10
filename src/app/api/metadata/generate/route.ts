import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, keywords } = body;

    // Simulate AI delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock AI response
    // In a real app, this would call OpenAI API
    const mockMetaTitle = `${title} - Ultimate Guide | SEOForge`;
    const mockMetaDescription = `Learn everything about ${title}. ${
      content.substring(0, 100)
    }... Discover the best strategies and tools for your workflow.`;

    return NextResponse.json({
      metaTitle: mockMetaTitle,
      metaDescription: mockMetaDescription,
      keywords: keywords || "seo, automation",
    });
  } catch (error) {
    console.error("Error generating metadata:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
