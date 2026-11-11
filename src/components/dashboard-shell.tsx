import { Link, useLocation } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { ArrowLeft, Bell, LogOut } from "lucide-react";
import { Logo } from "@/components/site-chrome";
import { useAuth, ROLE_LABEL } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardShell({
  children,
  nav,
  title,
}: {
  children: ReactNode;
  title: string;
  nav: { to: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
}) {
  const { profile, role, signOut, user } = useAuth();
  const loc = useLocation();
  const initials = (profile?.full_name ?? user?.email ?? "AU")
    .split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();

  const isActive = (to: string) => {
    const isRootLink = ["/admin", "/petugas", "/warga", "/"].includes(to);
    return isRootLink
      ? loc.pathname === to
      : loc.pathname === to || loc.pathname.startsWith(to + "/");
  };

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="flex min-h-screen gap-4 bg-sage-soft p-0 md:p-4 dark:bg-background">
      <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-64 shrink-0 flex-col rounded-[28px] bg-sidebar p-4 text-sidebar-foreground shadow-elev md:flex">
        <Link to="/" className="mb-8 block px-2 pt-1" aria-label="AURA — Beranda"><Logo tone="dark" /></Link>
        <nav className="flex flex-1 flex-col gap-1" aria-label="Menu dashboard">
          {nav.map((n) => {
            const active = isActive(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-white"
                }`}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        {user && (
          <div className="mt-4 rounded-3xl bg-sidebar-accent p-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                {(profile?.resolved_avatar_url || profile?.avatar_url) && (
                  <AvatarImage src={profile.resolved_avatar_url || profile.avatar_url || ""} className="object-cover" />
                )}
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">{initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-white">{profile?.full_name ?? "Pengguna"}</p>
                <p className="truncate text-xs text-sidebar-foreground/70">{role && ROLE_LABEL[role]}</p>
              </div>
            </div>
            <Button
              onClick={() => signOut()}
              variant="ghost"
              size="sm"
              className="mt-2 w-full justify-start text-sidebar-foreground hover:bg-white/10 hover:text-white"
            >
              <LogOut className="mr-2 h-4 w-4" /> Keluar
            </Button>
          </div>
        )}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between rounded-none border-b border-border/60 bg-card px-4 backdrop-blur md:top-4 md:rounded-full md:border md:px-6 md:shadow-soft">
          <div className="flex items-center gap-3">
            {(() => {
              const backUrl = loc.pathname.startsWith("/admin") && loc.pathname !== "/admin" ? "/admin" : "/";
              return (
                <Link
                  to={backUrl}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-sage hover:text-foreground"
                  title="Kembali"
                  aria-label="Kembali"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              );
            })()}
            <div>
              <h1 className="text-base font-extrabold tracking-tight md:text-lg">{title}</h1>
              <p className="hidden text-[11px] text-muted-foreground md:block">{today}</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button type="button" aria-label="Notifikasi" className="relative flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-forest transition-colors hover:bg-sage">
              <Bell className="h-4 w-4" />
              <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-orange ring-2 ring-card" aria-hidden />
            </button>
            {user && (
              <Avatar className="h-11 w-11">
                {(profile?.resolved_avatar_url || profile?.avatar_url) && (
                  <AvatarImage src={profile.resolved_avatar_url || profile.avatar_url || ""} className="object-cover" />
                )}
                <AvatarFallback className="bg-primary text-xs text-primary-foreground">{initials}</AvatarFallback>
              </Avatar>
            )}
          </div>
          <div className="flex items-center gap-3 md:hidden">
            {user && (
              <>
                <Avatar className="h-8 w-8">
                  {(profile?.resolved_avatar_url || profile?.avatar_url) && (
                    <AvatarImage src={profile.resolved_avatar_url || profile.avatar_url || ""} className="object-cover" />
                  )}
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">{initials}</AvatarFallback>
                </Avatar>
                <Button onClick={() => signOut()} variant="ghost" size="icon" aria-label="Keluar">
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </header>

        {/* Mobile nav */}
        <nav className="flex gap-2 overflow-x-auto bg-card px-4 py-2 md:hidden" aria-label="Menu dashboard">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                isActive(n.to) ? "bg-forest text-white" : "bg-secondary text-muted-foreground"
              }`}
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </Link>
          ))}
        </nav>

        <main className="flex-1 px-4 py-4 md:px-2 md:py-6">{children}</main>
      </div>
    </div>
  );
}
