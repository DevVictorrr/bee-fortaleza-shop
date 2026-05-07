import { Link } from "@tanstack/react-router";
import { ShoppingBag, MapPin, Menu, Search } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="bg-primary text-primary-foreground text-[11px] sm:text-xs">
        <div className="container mx-auto flex items-center justify-between gap-2 px-4 py-2">
          <span className="flex items-center gap-1.5 min-w-0">
            <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--honey)" }} />
            <span className="truncate">
              <span className="sm:hidden">Sede Fortaleza · Av. W. Soares</span>
              <span className="hidden sm:inline">Sede Fortaleza · Av. Washington Soares, 1321</span>
            </span>
          </span>
          <span className="hidden sm:block opacity-80 shrink-0">Frete grátis em CE acima de R$ 250</span>
        </div>
      </div>
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3 sm:py-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span
            className="grid h-10 w-10 place-items-center rounded-xl text-xl font-black"
            style={{ background: "var(--gradient-honey)", color: "oklch(0.18 0.02 60)" }}
          >
            🐝
          </span>
          <div className="leading-tight">
            <div className="text-base font-black tracking-tight">Bee Store</div>
            <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Fortaleza
            </div>
          </div>
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
          <Link to="/ajuda" className="text-muted-foreground hover:text-foreground transition-colors">Ajuda</Link>
          <Link to="/contato" className="text-muted-foreground hover:text-foreground transition-colors">Contato</Link>
        </nav>

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

        <button aria-label="Menu" onClick={() => setOpen(!open)} className="lg:hidden grid h-10 w-10 place-items-center rounded-full bg-secondary">
          <Menu className="h-4 w-4" />
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background px-4 py-3 flex flex-col gap-3 text-sm">
          <div className="md:hidden flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Buscar produtos..." className="flex-1 bg-transparent text-sm outline-none" />
          </div>
          <Link to="/produtos" onClick={() => setOpen(false)}>Produtos</Link>
          <Link to="/ajuda" onClick={() => setOpen(false)}>Ajuda</Link>
          <Link to="/contato" onClick={() => setOpen(false)}>Contato</Link>
        </div>
      )}
    </header>
  );
}