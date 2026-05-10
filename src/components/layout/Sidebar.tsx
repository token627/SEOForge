"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Search,
  Code,
  Share2,
  Settings,
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Metadata Generator",
    icon: FileText,
    href: "/dashboard/metadata",
    color: "text-violet-500",
  },
  {
    label: "Schema Generator",
    icon: Code,
    href: "/dashboard/schema",
    color: "text-pink-700",
  },
  {
    label: "SEO Audit",
    icon: Search,
    href: "/dashboard/audit",
    color: "text-orange-700",
  },
  {
    label: "Social Preview",
    icon: Share2,
    href: "/dashboard/preview",
    color: "text-emerald-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Search className="text-slate-900 w-5 h-5" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">SEOForge AI</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
