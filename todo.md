# AI SEO + Metadata Generator
## Product Requirements Document (PRD)

# Project Name
SEOForge AI

---

# Overview

SEOForge AI is a Next.js-based AI-powered SEO automation platform that helps developers, marketers, and content teams generate and validate SEO metadata, structured data, social previews, and technical SEO configurations automatically.

The platform focuses on:
- SEO metadata generation
- Structured data automation
- Social preview optimization
- Sitemap and robots.txt generation
- SEO auditing
- Web Vitals recommendations
- AI-assisted SEO improvements

The product is especially optimized for:
- Next.js applications
- Headless CMS projects
- Blogs
- Job portals
- SaaS products
- Marketing websites
- Dynamic pages

---

# Core Problem

Frontend developers spend significant time:
- Writing metadata manually
- Creating JSON-LD structured data
- Fixing SEO issues
- Debugging social previews
- Managing canonical URLs
- Handling sitemap updates
- Improving Lighthouse SEO scores
- Ensuring metadata consistency

This platform automates those tasks using AI and predefined SEO rules.

---

# Main Goals

- Reduce manual SEO work by 80%
- Improve SEO consistency
- Generate production-ready metadata
- Simplify structured data creation
- Detect technical SEO issues
- Improve Core Web Vitals
- Improve search engine indexing
- Improve social media sharing previews

---

# Tech Stack

## Frontend
- Next.js 15+
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod Validation
- Framer Motion

## Backend
- Next.js Route Handlers
- Node.js
- Prisma ORM

## Database
- PostgreSQL

## AI
- OpenAI API

## SEO Utilities
- schema-dts
- next-sitemap
- sitemap
- robots-parser

## Validation
- Google Rich Results validation
- Open Graph validator
- Twitter Card validator

## Deployment
- Vercel

---

# User Roles

## 1. Developer
Can:
- Generate metadata
- Generate schemas
- Audit SEO
- Export JSON-LD
- Test previews

## 2. Admin
Can:
- Manage templates
- Manage AI prompts
- Manage API keys
- View usage analytics

---

# Core Features

# 1. AI Metadata Generator

## Description
Generate SEO metadata automatically from content or URLs.

## Inputs
- Page title
- Keywords
- Page content
- Page type
- URL
- Brand name

## Outputs
- Meta title
- Meta description
- Keywords
- Canonical URL
- Open Graph tags
- Twitter Card tags
- Robots meta
- Alternate hreflang tags

## Generated Output Example

```tsx
export const metadata = {
  title: "Best CRM Software for Startups",
  description: "Discover the best CRM software...",
  openGraph: {
    title: "Best CRM Software",
    description: "...",
    images: ["/og-image.jpg"]
  }
}
Add:

Facebook debugger validator
Google Rich Results validator
Lighthouse recommendations