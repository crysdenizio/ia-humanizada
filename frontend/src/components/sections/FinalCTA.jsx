import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { WHATSAPP_LINK } from "../../lib/constants";

export const FinalCTA = () => {
  return (
    <section className="relative py-28 md:py-36 bg-black overflow-hidden" data-testid="final-cta-section">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full bg-[#FFD700] opacity-[0.08] blur-[180px] animate-glow-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#B8860B] opacity-[0.1] blur-[140px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-gold mb-8"
        >
          <Sparkles size={14} className="text-[#FFD700]" />
          <span className="text-xs tracking-[0.2em] uppercase text-[#FFD700] font-medium">A hora é agora</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="font-['Outfit'] text-5xl md:text-7xl font-light text-white tracking-tighter leading-[1.02]"
          data-testid="final-cta-title"
        >
          Seu atendimento <br />
          <span className="text-gold-shine font-medium italic">nunca mais para.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Cada dia sem automação é um cliente perdido. Vamos transformar o seu atendimento
          em uma máquina de vendas — começando hoje.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12"
        >
          <a
            href={WHATSAPP_LINK("Olá! Quero falar com um especialista da Denizio's IA agora.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine group inline-flex items-center gap-3 bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] text-black font-bold rounded-full px-10 py-5 text-lg shadow-[0_0_60px_rgba(255,215,0,0.5)] hover:shadow-[0_0_80px_rgba(255,215,0,0.7)] transition-all"
            data-testid="final-cta-button"
          >
            Falar com especialista agora
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-xs text-white/40"
        >
          Resposta em menos de 5 minutos durante o horário comercial.
        </motion.p>
      </div>
    </section>
  );
};

export default FinalCTA;
