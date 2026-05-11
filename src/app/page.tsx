"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 text-center sm:p-20 font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <ParticlesBackground />
      <main className="relative z-10 flex flex-col items-center justify-center space-y-8 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center"
        >
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-violet-600 drop-shadow-sm pb-2">
            SEOForge AI
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 font-medium">
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
