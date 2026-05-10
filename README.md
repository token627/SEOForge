# SEOForge AI

SEOForge AI is a developer-first, AI-powered SEO automation platform built with modern web technologies. It helps frontend developers, marketers, and content teams generate and validate SEO metadata, structured data, social previews, and technical SEO configurations automatically.

## 🚀 Core Features

### 1. Metadata Generator
Generate highly optimized SEO metadata automatically. Input a page topic or content, and SEOForge provides standard Next.js metadata objects along with Google Search preview mockups.

### 2. Structured Data (JSON-LD) Generator
Easily construct complex Schema.org structured data types to earn Rich Results in Google.
- Supported Types: `Article`, `Organization`, `LocalBusiness`, `Product`, `FAQPage`, `Person`.
- Dynamic forms adapt to the chosen schema, providing both raw JSON and ready-to-inject `<script>` tags.

### 3. Technical SEO Audit Tool
Analyze any public URL instantly for SEO health.
- Uses server-side HTML fetching and `cheerio` parsing to evaluate technical SEO factors.
- Checks include: `<title>` length/presence, meta description, H1 tags, canonical tags, Image Alt tags, Open Graph tags, and JSON-LD presence.
- Calculates an aggregate score out of 100 with actionable feedback.

### 4. Social Preview Tool
Visualize how your links will look when shared across the web.
- Input title, description, and OG image.
- Live, pixel-perfect mockups for **Google Search**, **Twitter Cards**, and **Facebook / LinkedIn** links.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Tailwind)
- **Forms & Validation**: `react-hook-form` & `zod`
- **Database / ORM**: [Prisma](https://www.prisma.io/) (configured with SQLite for quick local dev)
- **HTML Parsing**: `cheerio` (for the SEO Audit API)
- **Animations**: `framer-motion`
- **Theming**: `next-themes` (Dark/Light mode support)

---

## 🏗️ Architecture & Main Methods

### Application Structure
The application follows the Next.js App Router paradigm, strictly separating UI components from route handlers.

```text
src/
├── app/
│   ├── api/          # Serverless route handlers (e.g. /api/audit/route.ts)
│   ├── dashboard/    # Main application interface and tools
│   ├── page.tsx      # Public landing page
│   └── layout.tsx    # Root layout with ThemeProvider
├── components/
│   ├── layout/       # Sidebar, Header, etc.
│   ├── seo/          # Core tool components (SchemaGenerator, MetadataGenerator)
│   └── ui/           # Reusable shadcn UI components
└── lib/              # Utility functions (e.g., cn for Tailwind)
```

### Key Implementations

#### **SEO Audit Engine (`/api/audit/route.ts`)**
This server-side API route accepts a `url`, fetches the remote HTML document using standard `fetch()`, and loads the DOM into `cheerio`. It then runs an array of query-selectors to perform validations (e.g., `$('img:not([alt])').length`) and tallies a final score.

#### **Dynamic Schema Generation (`src/components/seo/SchemaGenerator.tsx`)**
Uses `react-hook-form` and its `useFieldArray` hook to manage complex, deeply nested state (like repeating FAQ questions). The `generateJsonLd()` switch statement maps form state to strict Schema.org compliant object graphs.

#### **Live Previews (`src/components/seo/SocialPreviewer.tsx`)**
The `SocialPreviewer` uses `form.watch()` from `react-hook-form` to deeply observe input fields. The UI components react instantly to map these strings into exact CSS replications of Facebook, Twitter, and Google search algorithms.

---

## 🚦 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Initialize Database**
   This project uses Prisma with a local SQLite file (`dev.db`) to get you up and running without complex setups.
   ```bash
   npx prisma db push
   npx prisma generate
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the landing page, and navigate to the **Dashboard** to try out the tools.
