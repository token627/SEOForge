"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center justify-center space-y-8 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center"
        >
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-slate-900 dark:text-white">
            SEOForge AI
          </h1>
          <p className="text-xl text-muted-foreground">
            The developer-first AI-powered SEO automation platform for modern web applications.
          </p>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto">
              Go to Dashboard
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Documentation
          </Button>
        </div>
      </main>
    </div>
  );
}
