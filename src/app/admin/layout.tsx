"use client";

import {
  BookOpen,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Tag,
  Users,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const sidebarLinks = [
  { label: "Blog Yönetimi", href: "/admin/blog", icon: BookOpen },
  { label: "Kategoriler", href: "/admin/categories", icon: Tag },
  { label: "Ana Sayfa", href: "/admin/homepage", icon: Home },
  { label: "Yöneticiler", href: "/admin/users", icon: Users },
  { label: "Profilim", href: "/admin/profile", icon: User },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((r) => r.json())
      .then((d) => setAuthenticated(d.authenticated))
      .catch(() => setAuthenticated(false));
  }, [pathname]);

  const handleLogout = useCallback(async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
    router.push("/admin");
  }, [router]);

  useEffect(() => {
    if (authenticated === false && pathname !== "/admin") {
      router.push("/admin");
    } else if (authenticated === true && pathname === "/admin") {
      router.push("/admin/blog");
    }
  }, [authenticated, pathname, router]);

  // Loading state
  if (authenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07130f]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d7f26f] border-t-transparent" />
      </div>
    );
  }

  // Not authenticated — show just the children if on login page, otherwise loading spinner while redirecting
  if (!authenticated) {
    if (pathname !== "/admin") {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#07130f]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d7f26f] border-t-transparent" />
        </div>
      );
    }
    return <>{children}</>;
  }

  // If authenticated and on login page, show spinner while redirecting to dashboard
  if (authenticated && pathname === "/admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07130f]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d7f26f] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#07130f]">
      {/* Sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#0a1a14] transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Link
            href="/admin/blog"
            className="flex items-center gap-2.5 text-white"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d7f26f]">
              <LayoutDashboard className="h-4 w-4 text-[#102015]" />
            </div>
            <span className="text-base font-semibold">Admin Panel</span>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-white/8 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#d7f26f]/12 text-[#d7f26f]"
                    : "text-stone-400 hover:bg-white/6 hover:text-white"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-400 transition-colors hover:bg-white/6 hover:text-white"
          >
            <Home className="h-[18px] w-[18px]" />
            Siteye Dön
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut className="h-[18px] w-[18px]" />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/10 bg-[#07130f]/90 px-4 backdrop-blur-xl lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-stone-400 hover:bg-white/8 hover:text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <span className="text-xs font-medium text-stone-500">
            Av Takip Admin
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
