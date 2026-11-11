import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, ROLE_HOME, type AppRole } from "@/lib/auth";
import { Logo } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authImg from "@/assets/rawa_buntu_road.jpg";

export const Route = createFileRoute("/auth/signup")({
  head: () => ({
    meta: [
      { title: "Daftar" },
      { name: "description", content: "Buat akun pengelola AURA." },
    ],
  }),
  component: SignupPage,
});

const schema = z.object({
  full_name: z.string().trim().min(2, "Minimal 2 karakter").max(100),
  email: z.string().trim().email("Email tidak valid").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  password: z.string().min(6, "Minimal 6 karakter").max(128),
});

function SignupPage() {
  const navigate = useNavigate();
  const { user, role: currentRole, loading } = useAuth();
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    if (!loading && user && currentRole) navigate({ to: ROLE_HOME[currentRole] });
  }, [user, currentRole, loading, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: parsed.data.full_name,
          phone: parsed.data.phone || null,
          role: (parsed.data.email === "atmint@gmail.com" || parsed.data.email === "admin@aura.com" || parsed.data.email === "super@aura.com") ? "admin" : "warga",
        },
      },
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Akun berhasil dibuat! Silakan masuk.");
    navigate({ to: "/auth/login" });
  };

  return (
    <div className="grid min-h-screen bg-sage-soft p-3 lg:grid-cols-[1fr_1.1fr] lg:gap-3 lg:p-4 dark:bg-background">
      <div className="relative hidden overflow-hidden rounded-[36px] bg-forest p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <img src={authImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/70 to-forest/30" />
        <Link to="/" className="relative flex items-center gap-2">
          <Logo tone="dark" />
        </Link>
        <div className="relative">
          <h2 className="text-4xl font-extrabold leading-tight text-balance">
            Bergabung mengelola kota cerdas.
          </h2>
          <p className="mt-3 max-w-sm text-white/80">
            Buat akun untuk mulai memantau laporan infrastruktur dan mengelola penanganannya secara transparan.
          </p>
        </div>
        <p className="relative text-xs text-white/60">© {new Date().getFullYear()} AURA</p>
      </div>

      <div className="flex items-center justify-center rounded-[36px] bg-card p-6 md:p-10">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <Logo />
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage px-4 py-1.5 text-xs font-bold text-forest">
            <ShieldCheck className="h-3.5 w-3.5" /> Pengelola
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight">Buat akun</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link to="/auth/login" className="font-bold text-forest underline-offset-4 hover:underline dark:text-primary">
              Masuk
            </Link>
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="full_name" className="font-bold">Nama lengkap</Label>
              <Input id="full_name" placeholder="Nathan" value={form.full_name} onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="font-bold">Email</Label>
              <Input id="email" type="email" autoComplete="email" placeholder="nama@gmail.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="font-bold">Password</Label>
              <div className="relative">
                <Input id="password" type={showPw ? "text" : "password"} autoComplete="new-password" placeholder="Minimal 6 karakter" className="pr-12" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} required />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Sembunyikan password" : "Tampilkan password"}
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-sage hover:text-forest"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" disabled={submitting} className="w-full">
              {submitting ? "Memproses…" : "Daftar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
