import { Link } from "@tanstack/react-router";
import { ShoppingBag, Search, X, Package, Phone, Home, User as UserIcon, LogOut } from "lucide-react";
import { useState } from "react";
import logoBee from "@/assets/logo-bee.png";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Você saiu da sua conta");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3 sm:py-4">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Bee Delivery Fortaleza">
          <img src={logoBee} alt="Bee Delivery" className="h-9 w-auto sm:h-10" />
        </Link>

        <div className="hidden md:flex flex-1 max-w-xl items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Buscar bags, capas, vestuário..."
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <Link to="/produtos" activeProps={{ className: "text-foreground" }} className="text-muted-foreground hover:text-foreground transition-colors">Produtos</Link>
          <Link to="/contato" className="text-muted-foreground hover:text-foreground transition-colors">Contato</Link>
          {user ? (
            <button onClick={handleLogout} className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5">
              <LogOut className="h-4 w-4" /> Sair
            </button>
          ) : (
            <Link to="/login" className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-foreground font-semibold" style={{ background: "var(--gradient-honey)" }}>
              <UserIcon className="h-4 w-4" /> Entrar
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <button
              onClick={handleLogout}
              aria-label="Sair"
              className="lg:hidden relative grid h-10 w-10 place-items-center rounded-full bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          ) : (
            <Link
              to="/login"
              aria-label="Entrar"
              className="lg:hidden relative grid h-10 w-10 place-items-center rounded-full text-foreground hover:opacity-90 transition"
              style={{ background: "var(--gradient-honey)" }}
            >
              <UserIcon className="h-4 w-4" />
            </Link>
          )}
          <button
            aria-label="Carrinho"
            className="relative grid h-10 w-10 place-items-center rounded-full bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            <span
              className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold"
              style={{ background: "var(--honey-deep)", color: "oklch(0.18 0.02 60)" }}
            >
              0
            </span>
          </button>

          <button
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="lg:hidden relative grid h-10 w-10 place-items-center rounded-full transition-all"
            style={{ background: open ? "var(--gradient-honey)" : "var(--secondary)" }}
          >
            <span className="relative block h-3.5 w-5">
              <span
                className="absolute left-0 right-0 h-[2px] rounded-full bg-foreground transition-all duration-300"
                style={{ top: open ? "50%" : "0", transform: open ? "translateY(-50%) rotate(45deg)" : "none" }}
              />
              <span
                className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-foreground transition-all duration-300"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="absolute left-0 right-0 h-[2px] rounded-full bg-foreground transition-all duration-300"
                style={{ bottom: open ? "auto" : "0", top: open ? "50%" : "auto", transform: open ? "translateY(-50%) -rotate(45deg)" : "none" }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      >
        <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      </div>
      <aside
        className={`lg:hidden fixed right-0 top-0 z-50 h-full w-[82%] max-w-sm transform transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{ background: "var(--gradient-dark)", color: "oklch(0.98 0.02 95)" }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <img src={logoBee} alt="Bee Delivery" className="h-8 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
          <button onClick={() => setOpen(false)} aria-label="Fechar" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-4">
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5">
            <Search className="h-4 w-4 opacity-70" />
            <input placeholder="Buscar produtos..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/60" />
          </div>
        </div>

        <nav className="flex flex-col px-3 py-2 text-base font-semibold">
          {[
            { to: "/", label: "Início", Icon: Home },
            { to: "/produtos", label: "Produtos", Icon: Package },
            { to: "/contato", label: "Contato", Icon: Phone },
          ].map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/10"
              activeOptions={{ exact: true }}
              activeProps={{ style: { background: "rgba(255,255,255,0.08)" } }}
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "var(--honey)", color: "oklch(0.18 0.02 60)" }}>
                <Icon className="h-4 w-4" />
              </span>
              <span>{label}</span>
            </Link>
          ))}
          {user ? (
            <button
              onClick={() => { setOpen(false); handleLogout(); }}
              className="group flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-white/10"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "var(--honey)", color: "oklch(0.18 0.02 60)" }}>
                <LogOut className="h-4 w-4" />
              </span>
              <span>Sair</span>
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/10"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "var(--honey)", color: "oklch(0.18 0.02 60)" }}>
                <UserIcon className="h-4 w-4" />
              </span>
              <span>Entrar / Cadastrar</span>
            </Link>
          )}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 px-5 py-6 border-t border-white/10">
          <div className="text-[10px] uppercase tracking-[0.2em] opacity-60">Sede Fortaleza</div>
          <div className="mt-1 text-sm opacity-90">Frete grátis no CE acima de R$ 250</div>
        </div>
      </aside>
    </header>
  );
}