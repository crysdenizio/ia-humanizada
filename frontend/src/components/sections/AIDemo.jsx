import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import { WHATSAPP_LINK } from "../../lib/constants";

const HIGHLIGHTS = [
  "Linguagem natural com emojis e personalidade",
  "Entende contexto e responde de forma humanizada",
  "Confirma agendamentos no Google Calendar",
  "Envia lembretes automáticos antes da consulta",
];

export const AIDemo = () => {
  return (
    <section id="demo" className="relative py-24 md:py-32 bg-black overflow-hidden" data-testid="demo-section">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFD700] opacity-[0.05] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#B8860B] opacity-[0.05] blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xs tracking-[0.25em] uppercase text-[#FFD700] mb-4 font-semibold" data-testid="demo-overline">
            Veja a IA em ação
          </div>
          <h2 className="font-['Outfit'] text-4xl md:text-5xl font-light text-white tracking-tighter leading-[1.05]" data-testid="demo-title">
            Uma conversa que parece <span className="text-gold-shine font-medium">100% humana.</span>
          </h2>
          <p className="mt-6 text-white/60 text-lg leading-relaxed">
            Assista ao lado uma simulação real do nosso atendimento.
            Cada palavra é pensada para vender, agendar e encantar.
          </p>

          <div className="mt-8 space-y-3">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3"
                data-testid={`demo-highlight-${i}`}
              >
                <CheckCircle2 size={20} className="text-[#FFD700] flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm md:text-base">{h}</span>
              </motion.div>
            ))}
          </div>

          <a
            href={WHATSAPP_LINK("Olá! Quero testar uma demonstração da IA da Denizio's.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine mt-10 inline-flex items-center gap-2 bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black font-semibold rounded-full px-7 py-4 hover:shadow-[0_0_30px_rgba(255,215,0,0.45)] transition-all"
            data-testid="demo-cta"
          >
            Quero testar agora →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
};

export default AIDemo;
