import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Phone, Mail, Instagram, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Bee Store Fortaleza" },
      { name: "description", content: "Fale com a sede Bee Delivery em Fortaleza. WhatsApp, e-mail e atendimento presencial." },
      { property: "og:title", content: "Contato — Bee Store Fortaleza" },
      { property: "og:description", content: "Atendimento da sede Bee Fortaleza." },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const [loading, setLoading] = useState(false);
  const inputCls = "mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container mx-auto grid gap-8 px-4 py-12 sm:py-20 lg:grid-cols-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--honey-deep)" }}>Fale com a gente</span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-black md:text-5xl">Atendimento sede Fortaleza</h1>
          <p className="mt-4 text-muted-foreground">Tire dúvidas sobre produtos, pedidos ou parcerias para frotas e empresas.</p>
          <div className="mt-8 grid gap-3">
            {[
              { Icon: MessageCircle, t: "WhatsApp", d: "(85) 99999-0000" },
              { Icon: Phone, t: "Telefone", d: "(85) 3333-4444" },
              { Icon: Mail, t: "E-mail", d: "fortaleza@beestore.com.br" },
              { Icon: Instagram, t: "Instagram", d: "@beestore.fortaleza" },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 min-w-0">
                <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "var(--gradient-honey)", color: "oklch(0.18 0.02 60)" }}>
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{t}</div>
                  <div className="font-semibold break-all">{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <form className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-xl font-black">Envie sua mensagem</h2>
          <div>
            <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nome</label>
            <input id="contact-name" name="name" autoComplete="name" className={inputCls} />
          </div>
          <div>
            <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">E-mail</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" className={inputCls} />
          </div>
          <div>
            <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mensagem</label>
            <textarea id="contact-message" name="message" rows={5} className={inputCls} />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-transform hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
            style={{ background: "var(--gradient-honey)", color: "oklch(0.18 0.02 60)", boxShadow: "var(--shadow-honey)" }}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Enviando..." : "Enviar mensagem"}
          </button>
        </form>
      </section>
      <SiteFooter />
    </div>
  );
}