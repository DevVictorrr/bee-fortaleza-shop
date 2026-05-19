import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/use-auth";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Lock, User as UserIcon, ArrowRight } from "lucide-react";
import logoBee from "@/assets/logo-bee.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — Bee Delivery Fortaleza" },
      { name: "description", content: "Acesse sua conta ou crie um cadastro na Bee Delivery Fortaleza." },
      { property: "og:title", content: "Entrar — Bee Delivery Fortaleza" },
      { property: "og:description", content: "Acesse sua conta ou crie um cadastro na Bee Delivery Fortaleza." },
    ],
  }),
  component: LoginPage,
});

const signInSchema = z.object({
  email: z.string().trim().email("E-mail inválido").max(255),
  password: z.string().min(6, "Mínimo 6 caracteres").max(72),
});

const signUpSchema = signInSchema.extend({
  name: z.string().trim().min(2, "Informe seu nome").max(80),
});

function LoginPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/" });
  }, [user, loading, navigate]);

  const handleEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const raw = {
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      ...(mode === "signup" ? { name: String(form.get("name") ?? "") } : {}),
    };

    const schema = mode === "signup" ? signUpSchema : signInSchema;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Dados inválidos");
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { display_name: (parsed.data as { name: string }).name },
          },
        });
        if (error) throw error;
        toast.success("Conta criada! Verifique seu e-mail para confirmar.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
        toast.success("Bem-vindo de volta!");
        navigate({ to: "/" });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Algo deu errado";
      const friendly =
        msg.includes("Invalid login") ? "E-mail ou senha incorretos" :
        msg.includes("already registered") ? "Este e-mail já está cadastrado" :
        msg;
      toast.error(friendly);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error("Não foi possível entrar com o Google");
        setGoogleLoading(false);
        return;
      }
      if (result.redirected) return;
      navigate({ to: "/" });
    } catch {
      toast.error("Erro ao entrar com o Google");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto grid gap-10 px-4 py-10 sm:py-16 lg:grid-cols-2 lg:items-center">
          {/* Brand side */}
          <div className="hidden lg:flex flex-col gap-6 p-10 rounded-3xl" style={{ background: "var(--gradient-dark)", color: "oklch(0.98 0.02 95)" }}>
            <img src={logoBee} alt="Bee Delivery" className="h-12 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
            <h2 className="text-4xl font-bold leading-tight">
              O time Bee em <span style={{ color: "var(--honey)" }}>Fortaleza</span>.
            </h2>
            <p className="text-base opacity-80 max-w-md">
              Entre na sua conta para acompanhar pedidos, salvar favoritos e receber as novidades direto da nossa sede.
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              {["Frete grátis no CE acima de R$ 250", "Suporte direto pelo WhatsApp", "Lançamentos antes de todo mundo"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full" style={{ background: "var(--honey)", color: "oklch(0.18 0.02 60)" }}>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Form side */}
          <div className="mx-auto w-full max-w-md">
            <div className="lg:hidden mb-6 flex flex-col items-center gap-3 text-center">
              <div className="grid place-items-center h-16 w-16 rounded-2xl" style={{ background: "var(--gradient-honey)" }}>
                <img src={logoBee} alt="" className="h-9 w-auto" />
              </div>
              <h1 className="text-2xl font-bold">
                {mode === "signin" ? "Bem-vindo de volta" : "Crie sua conta"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {mode === "signin" ? "Entre para continuar" : "Junte-se ao time Bee"}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <div className="hidden lg:block mb-6">
                <h1 className="text-2xl font-bold">
                  {mode === "signin" ? "Entrar" : "Criar conta"}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {mode === "signin" ? "Acesse sua conta Bee" : "É rápido e gratuito"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-secondary mb-6">
                <button
                  onClick={() => setMode("signin")}
                  className={`rounded-full py-2 text-sm font-semibold transition-all ${mode === "signin" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
                >
                  Entrar
                </button>
                <button
                  onClick={() => setMode("signup")}
                  className={`rounded-full py-2 text-sm font-semibold transition-all ${mode === "signup" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
                >
                  Cadastrar
                </button>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-11 rounded-xl"
                onClick={handleGoogle}
                disabled={googleLoading || submitting}
              >
                {googleLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <GoogleIcon /> Continuar com Google
                  </>
                )}
              </Button>

              <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
                <div className="h-px flex-1 bg-border" />
                ou com e-mail
                <div className="h-px flex-1 bg-border" />
              </div>

              <form onSubmit={handleEmail} className="flex flex-col gap-4">
                {mode === "signup" && (
                  <div className="grid gap-1.5">
                    <Label htmlFor="name">Nome</Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="name" name="name" required maxLength={80} placeholder="Como podemos te chamar?" className="h-11 pl-9 rounded-xl" />
                    </div>
                  </div>
                )}
                <div className="grid gap-1.5">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" name="email" type="email" required maxLength={255} placeholder="voce@email.com" className="h-11 pl-9 rounded-xl" />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password" name="password" type="password" required minLength={6} maxLength={72} placeholder="Mínimo 6 caracteres" className="h-11 pl-9 rounded-xl" />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={submitting || googleLoading}
                  className="h-11 rounded-xl text-base font-semibold mt-2"
                  style={{ background: "var(--gradient-honey)", color: "oklch(0.18 0.02 60)" }}
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : mode === "signin" ? "Entrar" : "Criar conta"}
                </Button>
              </form>

              <p className="mt-5 text-center text-xs text-muted-foreground">
                Ao continuar, você concorda com nossos termos.{" "}
                <Link to="/contato" className="underline hover:text-foreground">Precisa de ajuda?</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.4 14.7 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12s4.2 9.5 9.4 9.5c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z" />
    </svg>
  );
}