import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { products, categories } from "@/lib/products";
import heroBag from "@/assets/hero-bag.jpg";
import { ArrowRight, Truck, ShieldCheck, Headphones } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bee Store Fortaleza — Bags, capas e vestuário oficiais" },
      { name: "description", content: "Loja oficial Bee Delivery sede Fortaleza. Bags térmicas, capas, vestuário e acessórios para entregadores. Entrega rápida em todo o Ceará." },
      { property: "og:title", content: "Bee Store Fortaleza" },
      { property: "og:description", content: "Bags e equipamentos oficiais Bee Delivery — sede Fortaleza." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = products.slice(0, 4);
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, oklch(0.88 0.18 92 / 0.5), transparent 60%), radial-gradient(circle at 80% 80%, oklch(0.72 0.2 75 / 0.3), transparent 50%)",
          }}
        />
        <div className="container mx-auto grid gap-10 px-4 py-12 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
              Equipamento <span style={{ background: "var(--gradient-honey)", WebkitBackgroundClip: "text", color: "transparent" }}>oficial</span> para quem entrega.
            </h1>
            <p className="mt-5 max-w-md text-base sm:text-lg text-muted-foreground">
              Bags térmicas, capas, vestuário e acessórios Bee Delivery. Direto da sede Fortaleza.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/produtos"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-transform hover:scale-[1.02]"
                style={{ background: "var(--gradient-honey)", color: "oklch(0.18 0.02 60)", boxShadow: "var(--shadow-honey)" }}
              >
                Ver produtos <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted"
              >
                Falar com a loja
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 text-[11px] sm:text-xs text-muted-foreground">
              <div><div className="text-xl sm:text-2xl font-black text-foreground">+12k</div>entregadores no CE</div>
              <div><div className="text-xl sm:text-2xl font-black text-foreground">24h</div>despacho em Fortaleza</div>
              <div><div className="text-xl sm:text-2xl font-black text-foreground">5★</div>avaliação clientes</div>
            </div>
          </div>
          <div className="relative">
            <div
              className="absolute -inset-6 rounded-[2.5rem] -z-10"
              style={{ background: "var(--gradient-honey)", filter: "blur(60px)", opacity: 0.5 }}
            />
            <img
              src={heroBag}
              alt="Bag oficial Bee Delivery"
              width={1280}
              height={960}
              className="rounded-[2rem] shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c}
              to="/produtos"
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Categoria</div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-lg font-bold">{c}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" style={{ color: "var(--honey-deep)" }} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--honey-deep)" }}>Destaques</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black md:text-4xl">Mais pedidos da sede Fortaleza</h2>
          </div>
          <Link to="/produtos" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all">
            Ver tudo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="container mx-auto px-4 py-16">
        <div
          className="grid gap-6 rounded-3xl p-6 sm:p-10 md:grid-cols-3"
          style={{ background: "var(--gradient-dark)", color: "oklch(0.98 0.02 95)" }}
        >
          {[
            { Icon: Truck, t: "Entrega expressa no CE", d: "Despachamos em até 24h direto da sede em Fortaleza." },
            { Icon: ShieldCheck, t: "Garantia oficial Bee", d: "Produtos originais e suporte direto da fábrica." },
            { Icon: Headphones, t: "Atendimento dedicado", d: "Equipe local para entregadores e frotistas." },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ background: "var(--honey)", color: "oklch(0.18 0.02 60)" }}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-bold">{t}</div>
                <div className="text-sm opacity-80">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
