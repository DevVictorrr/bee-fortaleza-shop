import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { products } from "@/lib/products";
import { useCart } from "@/contexts/cart-context";
import { ShoppingBag, ArrowLeft } from "lucide-react";

const fmt = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const Route = createFileRoute("/produtos/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Bee Store Fortaleza` },
          { name: "description", content: `${loaderData.product.name} — ${loaderData.product.category}. Bee Store Fortaleza.` },
          { property: "og:title", content: `${loaderData.product.name} — Bee Store Fortaleza` },
          { property: "og:description", content: `${loaderData.product.name} — ${loaderData.product.category}.` },
          { property: "og:type", content: "product" },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-black">Produto não encontrado</h1>
        <Link to="/produtos" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
          <ArrowLeft className="h-4 w-4" /> Voltar ao catálogo
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { addItem } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <Link to="/produtos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="overflow-hidden rounded-3xl border border-border bg-muted">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--honey-deep)" }}>
              {product.category}
            </span>
            <h1 className="mt-2 text-3xl font-black md:text-4xl">{product.name}</h1>
            {product.badge && (
              <span className="mt-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                style={{ background: "var(--honey)", color: "oklch(0.18 0.02 60)" }}>
                {product.badge}
              </span>
            )}
            <div className="mt-6">
              {product.oldPrice && (
                <div aria-label={`Preço original: ${fmt(product.oldPrice)}`} className="text-sm text-muted-foreground line-through">
                  {fmt(product.oldPrice)}
                </div>
              )}
              <div aria-label={`Preço atual: ${fmt(product.price)}`} className="text-4xl font-black">
                {fmt(product.price)}
              </div>
              <div className="text-sm text-muted-foreground">
                ou 12x de {fmt(product.price / 12)} sem juros
              </div>
            </div>
            <button
              type="button"
              onClick={() => addItem(product)}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold transition-transform hover:scale-[1.01] sm:w-auto"
              style={{ background: "var(--gradient-honey)", color: "oklch(0.18 0.02 60)", boxShadow: "var(--shadow-honey)" }}
            >
              <ShoppingBag className="h-4 w-4" /> Adicionar ao carrinho
            </button>
            <div className="mt-8 grid gap-3 text-sm text-muted-foreground">
              <p>✓ Produto oficial Bee Delivery</p>
              <p>✓ Despacho em até 24h da sede Fortaleza</p>
              <p>✓ Garantia de fábrica</p>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}