"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  // Define our navigation links in an array to keep the code DRY (Don't Repeat Yourself)
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "Containers", href: "/containers", icon: "local_shipping" },
    { name: "Users", href: "/users", icon: "group" },
    { name: "Settings", href: "/settings", icon: "settings" },
  ];

  return (
    <aside className="left-0 h-screen w-64 bg-tertiary dark:bg-black shadow-2xl flex flex-col py-6 shrink-0 z-50">
      {/* Brand Header */}
      <div className="px-6 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded">
            <span className="material-symbols-outlined text-white">local_shipping</span>
          </div>
          <div>
            <h1 className="text-white font-headline font-extrabold text-2xl tracking-tighter">KARGO</h1>
          </div>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 space-y-1 pr-4">
        {navItems.map((item) => {
          // Check if the current URL matches the link's destination
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center py-3 px-6 font-headline text-sm font-semibold uppercase tracking-widest transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white rounded-r-lg border-l-4 border-red-500 translate-x-1"
                  : "text-slate-400 hover:bg-secondary hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined mr-4">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* CTA & Footer */}
      <div className="px-6 mt-auto">
        <div className="border-t border-slate-700/50 pt-6">
          <Link
            href="/login"
            className="flex items-center text-slate-400 py-2 font-headline text-sm font-semibold uppercase tracking-widest hover:text-red-400 transition-colors"
          >
            <span className="material-symbols-outlined mr-4">logout</span>
            Logout
          </Link>
        </div>
      </div>
    </aside>
  );
}