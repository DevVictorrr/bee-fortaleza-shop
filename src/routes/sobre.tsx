import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MapPin, Clock, Users } from "lucide-react";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Bee Store Fortaleza" },
      { name: "description", content: "Conheça a sede Bee Delivery em Fortaleza: equipe local, atendimento dedicado e logística para todo o Ceará." },
      { property: "og:title", content: "Sobre — Bee Store Fortaleza" },
      { property: "og:description", content: "A sede Bee Delivery em Fortaleza." },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container mx-auto grid gap-12 px-4 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--honey-deep)" }}>Sede Fortaleza</span>
          <h1 className="mt-3 text-4xl font-black md:text-6xl leading-tight">
            A casa dos entregadores Bee no <span style={{ background: "var(--gradient-honey)", WebkitBackgroundClip: "text", color: "transparent" }}>Ceará</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Inaugurada em 2024 na Av. Washington Soares, a sede Fortaleza é o centro de distribuição
            e ponto de apoio oficial para mais de 12 mil entregadores Bee no estado.
          </p>
          <p className="mt-4 text-muted-foreground">
            Aqui você encontra todo o catálogo oficial de bags, capas e vestuário, com retirada na loja
            ou entrega expressa para todo o Ceará.
          </p>
        </div>
        <div className="grid gap-4">
          {[
            { Icon: MapPin, t: "Av. Washington Soares, 1321 — Edson Queiroz", d: "Fortaleza · CE · 60811-341" },
            { Icon: Clock, t: "Seg a Sex 9h–18h · Sáb 9h–13h", d: "Atendimento presencial e retirada de pedidos" },
            { Icon: Users, t: "Equipe 100% local", d: "Suporte direto para entregadores e frotistas no Ceará" },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="flex gap-4 rounded-3xl border border-border bg-card p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ background: "var(--gradient-honey)", color: "oklch(0.18 0.02 60)" }}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-bold">{t}</div>
                <div className="text-sm text-muted-foreground">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}