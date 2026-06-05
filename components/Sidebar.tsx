"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Users, PenLine, Medal } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/segments", label: "Segments", icon: Users },
  { href: "/copilot", label: "Campaigns", icon: PenLine },
  { href: "/loyalty", label: "Loyalty", icon: Medal },
] as const;

// The mark: 2×2 grid with one square offset upward-right — the signal in the noise.
function Mark({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-4 w-4 shrink-0", className)} aria-hidden>
      <span className="absolute left-0 top-0 h-[7px] w-[7px] bg-stone-900" />
      <span className="absolute -right-px -top-px h-[7px] w-[7px] bg-stone-900" />
      <span className="absolute bottom-0 left-0 h-[7px] w-[7px] bg-stone-900" />
      <span className="absolute bottom-0 right-px h-[7px] w-[7px] bg-stone-900" />
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-stone-200 bg-[#FAFAF9]">
      {/* Workspace block — quiet, not a hero */}
      <div className="flex items-center gap-2.5 px-4 pb-4 pt-5">
        <Mark />
        <span className="text-sm font-semibold tracking-tight text-stone-900">
          RetailIQ
        </span>
        <span className="ml-auto rounded border border-stone-200 px-1.5 py-px text-[10px] font-medium text-stone-500">
          Demo
        </span>
      </div>

      {/* Primary nav — single-line labels, soft neutral active fill */}
      <nav className="flex-1 space-y-px px-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px] transition-colors duration-150",
                active
                  ? "bg-stone-200/60 font-medium text-stone-900"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              )}
            >
              <Icon size={16} strokeWidth={1.5} className="shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer — data freshness, nothing else */}
      <div className="border-t border-stone-200 px-4 py-3">
        <p className="font-mono text-[11px] leading-4 text-stone-500">
          Data as of 1 Jun 2026
        </p>
        <p className="font-mono text-[11px] leading-4 text-stone-500">
          200 customers · demo
        </p>
      </div>
    </aside>
  );
}

// Mobile top bar
export function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 flex items-center gap-2.5 border-b border-stone-200 bg-[#FAFAF9] px-4 py-3 md:hidden">
      <Mark />
      <span className="text-sm font-semibold tracking-tight text-stone-900">
        RetailIQ
      </span>
    </header>
  );
}

// Mobile bottom navigation
export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-stone-200 bg-white md:hidden">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors",
              active ? "text-stone-900" : "text-stone-500"
            )}
          >
            <Icon size={18} strokeWidth={1.5} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
