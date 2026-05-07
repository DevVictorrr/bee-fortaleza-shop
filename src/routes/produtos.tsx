import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { products, categories } from "@/lib/products";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Produtos — Bee Store Fortaleza" },
      { name: "description", content: "Catálogo completo de bags, capas, vestuário e acessórios oficiais Bee Delivery na sede Fortaleza." },
      { property: "og:title", content: "Produtos — Bee Store Fortaleza" },
      { property: "og:description", content: "Bags térmicas, capas e acessórios para entregadores." },
    ],
  }),
  component: ProdutosPage,
});

function ProdutosPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const list = filter ? products.filter((p) => p.category === filter) : products;
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container mx-auto px-4 py-10 sm:py-16">
        <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--honey-deep)" }}>Catálogo</span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-black md:text-5xl">Todos os produtos</h1>
        <p className="mt-3 max-w-xl text-sm sm:text-base text-muted-foreground">Equipamentos oficiais Bee Delivery — sede Fortaleza.</p>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:flex-wrap sm:overflow-visible sm:mx-0 sm:px-0">
          <button
            onClick={() => setFilter(null)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              !filter ? "border-transparent" : "border-border bg-card hover:bg-muted"
            }`}
            style={!filter ? { background: "var(--gradient-honey)", color: "oklch(0.18 0.02 60)" } : {}}
          >
            Todos
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                filter === c ? "border-transparent" : "border-border bg-card hover:bg-muted"
              }`}
              style={filter === c ? { background: "var(--gradient-honey)", color: "oklch(0.18 0.02 60)" } : {}}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}