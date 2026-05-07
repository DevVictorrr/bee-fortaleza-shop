import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MessageCircle, Mail, Clock, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/ajuda")({
  head: () => ({
    meta: [
      { title: "Ajuda — Bee Store Fortaleza" },
      { name: "description", content: "Central de ajuda da Bee Store Fortaleza. Fale conosco pelo WhatsApp ou e-mail e tire suas dúvidas." },
      { property: "og:title", content: "Ajuda — Bee Store Fortaleza" },
      { property: "og:description", content: "Suporte rápido por WhatsApp e e-mail." },
    ],
  }),
  component: AjudaPage,
});

const channels = [
  {
    Icon: MessageCircle,
    title: "WhatsApp Vendas",
    desc: "Pedidos, produtos e estoque",
    label: "(85) 99999-0000",
    href: "https://wa.me/5585999990000?text=Olá!%20Preciso%20de%20ajuda%20com%20um%20pedido.",
  },
  {
    Icon: MessageCircle,
    title: "WhatsApp Suporte",
    desc: "Trocas, devoluções e pós-venda",
    label: "(85) 98888-1111",
    href: "https://wa.me/5585988881111?text=Olá!%20Preciso%20de%20suporte.",
  },
  {
    Icon: Mail,
    title: "E-mail",
    desc: "Atendimento geral em até 24h úteis",
    label: "ajuda@beestore.com.br",
    href: "mailto:ajuda@beestore.com.br",
  },
];

function AjudaPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container mx-auto px-4 py-12 sm:py-20">
        <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--honey-deep)" }}>Central de Ajuda</span>
        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
          Como podemos te <span style={{ background: "var(--gradient-honey)", WebkitBackgroundClip: "text", color: "transparent" }}>ajudar</span>?
        </h1>
        <p className="mt-4 max-w-xl text-sm sm:text-base text-muted-foreground">
          Nossa equipe da sede Fortaleza está pronta para responder pelo canal que você preferir.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {channels.map(({ Icon, title, desc, label, href }) => (
            <a
              key={title}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-col gap-3 rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
            >
              <span
                className="grid h-12 w-12 place-items-center rounded-xl"
                style={{ background: "var(--gradient-honey)", color: "oklch(0.18 0.02 60)" }}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-base font-bold">{title}</div>
                <div className="text-xs text-muted-foreground">{desc}</div>
              </div>
              <div className="mt-auto pt-2 text-sm font-semibold break-all" style={{ color: "var(--honey-deep)" }}>
                {label}
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="flex gap-4 rounded-3xl border border-border bg-card p-6">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: "var(--gradient-honey)", color: "oklch(0.18 0.02 60)" }}>
              <Clock className="h-4 w-4" />
            </span>
            <div>
              <div className="font-bold">Horário de atendimento</div>
              <div className="text-sm text-muted-foreground">Seg a Sex · 9h às 18h<br />Sábado · 9h às 13h</div>
            </div>
          </div>
          <div className="flex gap-4 rounded-3xl border border-border bg-card p-6">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: "var(--gradient-honey)", color: "oklch(0.18 0.02 60)" }}>
              <HelpCircle className="h-4 w-4" />
            </span>
            <div>
              <div className="font-bold">Antes de falar com a gente</div>
              <div className="text-sm text-muted-foreground">Tenha em mãos seu número de pedido para um atendimento mais rápido.</div>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}