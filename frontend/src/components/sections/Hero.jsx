import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MessageCircle, Calendar } from "lucide-react";
import { WHATSAPP_LINK } from "../../lib/constants";
import CircuitBackground from "../CircuitBackground";
import PhoneMockup from "./PhoneMockup";

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 overflow-hidden" data-testid="hero-section">
      <CircuitBackground />

      {/* Center radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#FFD700] opacity-[0.06] blur-[180px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-10 items-center">
        {/* Left content */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-gold mb-7"
            data-testid="hero-badge"
          >
            <Sparkles size={14} className="text-[#FFD700]" />
            <span className="text-xs tracking-[0.2em] uppercase text-[#FFD700] font-medium">
              Inteligência que transforma
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-['Outfit'] text-[2.6rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-[4.2rem] font-light text-white tracking-tighter"
            data-testid="hero-headline"
          >
            Sua empresa merece <br />
            <span className="text-gold-shine font-medium">atendimento inteligente</span>
            <br />
            <span className="text-white/90">24h por dia.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-7 max-w-xl text-base md:text-lg text-white/70 leading-relaxed"
            data-testid="hero-subheadline"
          >
            Automação com <span className="text-[#FFD700]">IA humanizada</span> para atender clientes,
            agendar consultas e aumentar vendas sem depender de recepcionistas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-col sm:flex-row gap-4"
          >
            <a
              href={WHATSAPP_LINK("Olá! Quero falar com um especialista da Denizio's IA.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine group inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold rounded-full px-7 py-4 text-base hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all"
              data-testid="hero-whatsapp-cta"
            >
              <MessageCircle size={18} />
              Falar no WhatsApp
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#demo"
              className="btn-shine inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black font-semibold rounded-full px-7 py-4 text-base hover:shadow-[0_0_30px_rgba(255,215,0,0.45)] transition-all"
              data-testid="hero-demo-cta"
            >
              <Calendar size={18} />
              Agendar demonstração
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-white/50"
            data-testid="hero-trust-bar"
          >
            <div className="flex items-center gap-2"><span className="w-1 h-1 bg-[#FFD700] rounded-full" /> +500 negócios atendidos</div>
            <div className="flex items-center gap-2"><span className="w-1 h-1 bg-[#FFD700] rounded-full" /> Resposta em segundos</div>
            <div className="flex items-center gap-2"><span className="w-1 h-1 bg-[#FFD700] rounded-full" /> IA treinada com sua marca</div>
          </motion.div>
        </div>

        {/* Phone mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center"
        >
          <PhoneMockup />
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className="absolute w-1 h-1 bg-[#FFD700] rounded-full animate-particle pointer-events-none"
          style={{
            top: `${20 + (i * 9) % 70}%`,
            left: `${(i * 11) % 90}%`,
            animationDelay: `${i * 0.7}s`,
            opacity: 0.5,
          }}
        />
      ))}
    </section>
  );
};

export default Hero;
