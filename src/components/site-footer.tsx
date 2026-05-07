import { Instagram, Mail, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl text-xl" style={{ background: "var(--gradient-honey)", color: "oklch(0.18 0.02 60)" }}>🐝</span>
            <div>
              <div className="text-base font-black">Bee Store</div>
              <div className="text-[10px] uppercase tracking-[0.2em] opacity-70">Fortaleza</div>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-80">
            Loja oficial de bags, capas e vestuário Bee Delivery — sede Fortaleza.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--honey)" }}>Loja</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li>Bags e Mochilas</li>
            <li>Capas e Acessórios</li>
            <li>Vestuário</li>
            <li>Canecas e Garrafas</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--honey)" }}>Contato</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /><span>(85) 99999-0000</span></li>
            <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /><span className="break-all">fortaleza@beestore.com.br</span></li>
            <li className="flex items-center gap-2"><Instagram className="h-3.5 w-3.5" /><span>@beestore.fortaleza</span></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--honey)" }}>Receba ofertas</h4>
          <form className="mt-4 flex overflow-hidden rounded-full bg-white/10 p-1">
            <input placeholder="seu@email.com" className="flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-white/60" />
            <button className="rounded-full px-4 py-2 text-xs font-bold" style={{ background: "var(--honey)", color: "oklch(0.18 0.02 60)" }}>Assinar</button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-6 text-xs opacity-70 md:flex-row">
          <span>© 2026 Bee Store Fortaleza. Todos os direitos reservados.</span>
          <span>CNPJ fictício · site demo</span>
        </div>
      </div>
    </footer>
  );
}