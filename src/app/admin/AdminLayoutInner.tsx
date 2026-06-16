'use client';

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthChange, signOutAdmin } from "@/lib/auth/admin-auth";
import type { User } from "firebase/auth";
import Button from "@/components/ui/Button";

export default function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login" || pathname === "/admin/login/";

  useEffect(() => {
    const unsubscribe = onAuthChange((u) => {
      setUser(u);
      setLoading(false);
      if (!u && !isLoginPage) {
        router.push("/admin/login");
      }
    });
    return () => unsubscribe();
  }, [isLoginPage, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOutAdmin();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-secondary-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-lg font-bold">Admin Dashboard</h1>
            <nav className="hidden md:flex gap-4">
              <a href="/admin" className="hover:text-primary-300 transition">
                Bookings
              </a>
              <a href="/admin/settings" className="hover:text-primary-300 transition">
                Settings
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <nav className="md:hidden flex gap-4">
              <a href="/admin" className="text-sm hover:text-primary-300 transition">
                Bookings
              </a>
              <a href="/admin/settings" className="text-sm hover:text-primary-300 transition">
                Settings
              </a>
            </nav>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="border-white text-white hover:bg-white hover:text-secondary-800"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
