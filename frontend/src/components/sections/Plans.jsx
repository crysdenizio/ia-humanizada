import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Crown, Rocket } from "lucide-react";
import { WHATSAPP_LINK } from "../../lib/constants";

const PLANS = [
  {
    name: "Starter",
    icon: Rocket,
    price: "297",
    period: "/mês",
    desc: "Para profissionais autônomos e pequenos negócios.",
    features: [
      "1 número de WhatsApp",
      "Até 500 atendimentos/mês",
      "Agendamentos automáticos",
      "Respostas inteligentes 24h",
      "Suporte por e-mail",
    ],
    cta: "Quero começar",
    highlight: false,
  },
  {
    name: "Business",
    icon: Sparkles,
    price: "597",
    period: "/mês",
    desc: "Para clínicas, consultórios e PMEs em crescimento.",
    features: [
      "Até 3 números de WhatsApp",
      "Atendimentos ilimitados",
      "IA humanizada treinada",
      "Integração Google Agenda",
      "Recuperação de leads",
      "Suporte prioritário",
    ],
    cta: "Quero o Business",
    highlight: true,
  },
  {
    name: "Premium IA",
    icon: Crown,
    price: "997",
    period: "/mês",
    desc: "Solução completa para empresas que escalam de verdade.",
    features: [
      "Múltiplos números & marcas",
      "Atendimentos ilimitados",
      "IA personalizada por área",
      "CRM integrado + relatórios",
      "Onboarding dedicado",
      "Gerente de sucesso exclusivo",
      "Suporte 24/7",
    ],
    cta: "Falar com especialista",
    highlight: false,
  },
];

const PlanCard = ({ plan, i }) => {
  const Icon = plan.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: i * 0.1 }}
      className={`relative rounded-3xl p-8 flex flex-col h-full transition-all ${
        plan.highlight
          ? "bg-gradient-to-b from-[#FFD700]/15 via-black/40 to-black border border-[#FFD700]/50 shadow-[0_0_60px_rgba(255,215,0,0.25)] lg:scale-105 lg:-translate-y-2"
          : "glass-card hover-gold-border"
      }`}
      data-testid={`plan-card-${plan.name.toLowerCase().replace(/\s/g, "-")}`}
    >
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black text-[10px] font-bold uppercase tracking-widest">
          Mais escolhido
        </div>
      )}

      <div className="flex items-center gap-3 mb-5">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
          plan.highlight
            ? "bg-gradient-to-br from-[#FFD700] to-[#B8860B] text-black"
            : "bg-[#FFD700]/10 border border-[#FFD700]/25 text-[#FFD700]"
        }`}>
          <Icon size={20} strokeWidth={1.6} />
        </div>
        <div className="font-['Outfit'] text-2xl font-medium text-white">{plan.name}</div>
      </div>

      <p className="text-sm text-white/55 mb-6 min-h-[2.5rem]">{plan.desc}</p>

      <div className="flex items-end gap-1 mb-7">
        <span className="text-xs text-white/50 mb-2">R$</span>
        <span className={`font-['Outfit'] text-6xl font-light leading-none ${plan.highlight ? "text-gold-shine" : "text-white"}`}>
          {plan.price}
        </span>
        <span className="text-sm text-white/50 mb-2">{plan.period}</span>
      </div>

      <ul className="space-y-3 mb-9 flex-1">
        {plan.features.map((f, j) => (
          <li key={j} className="flex items-start gap-2.5 text-sm text-white/75">
            <Check size={16} className="text-[#FFD700] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={WHATSAPP_LINK(`Olá! Quero contratar o plano ${plan.name} da Denizio's IA.`)}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn-shine block w-full text-center rounded-full px-6 py-4 font-semibold transition-all ${
          plan.highlight
            ? "bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]"
            : "border border-[#FFD700]/40 text-[#FFD700] hover:bg-[#FFD700]/10 hover:border-[#FFD700]"
        }`}
        data-testid={`plan-cta-${plan.name.toLowerCase().replace(/\s/g, "-")}`}
      >
        {plan.cta}
      </a>
    </motion.div>
  );
};

export const Plans = () => {
  return (
    <section id="planos" className="relative py-24 md:py-32 bg-black overflow-hidden" data-testid="plans-section">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFD700] opacity-[0.05] blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="text-xs tracking-[0.25em] uppercase text-[#FFD700] mb-4 font-semibold">Planos exclusivos</div>
          <h2 className="font-['Outfit'] text-4xl md:text-5xl font-light text-white tracking-tighter leading-[1.05]" data-testid="plans-title">
            Escolha o nível da sua <br />
            <span className="text-gold-shine font-medium">automação premium.</span>
          </h2>
          <p className="mt-6 text-white/60 text-lg">
            Sem fidelidade. Cancelamento a qualquer momento. ROI garantido em até 30 dias.
          </p>
        </motion.div>

        <div className="mt-16 grid lg:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((p, i) => (
            <PlanCard key={p.name} plan={p} i={i} />
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-white/40">
          * Valores ilustrativos. Personalizamos o plano conforme o seu segmento e volume.
        </p>
      </div>
    </section>
  );
};

export default Plans;
