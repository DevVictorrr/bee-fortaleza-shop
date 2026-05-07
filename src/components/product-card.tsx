import type { Product } from "@/lib/products";
import { ShoppingBag } from "lucide-react";

const fmt = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
      {product.badge && (
        <span
          className="absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
          style={{ background: "var(--honey)", color: "oklch(0.18 0.02 60)" }}
        >
          {product.badge}
        </span>
      )}
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {product.category}
        </span>
        <h3 className="text-base font-semibold leading-snug text-foreground">{product.name}</h3>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            {product.oldPrice && (
              <div className="text-xs text-muted-foreground line-through">{fmt(product.oldPrice)}</div>
            )}
            <div className="text-lg font-black text-foreground">{fmt(product.price)}</div>
            <div className="text-[11px] text-muted-foreground">
              ou 12x de {fmt(product.price / 12)}
            </div>
          </div>
          <button
            aria-label="Adicionar ao carrinho"
            className="grid h-11 w-11 place-items-center rounded-full transition-transform hover:scale-110"
            style={{ background: "var(--gradient-honey)", color: "oklch(0.18 0.02 60)" }}
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}