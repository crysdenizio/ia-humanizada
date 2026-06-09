import React from "react";
import { motion } from "framer-motion";
import { Clock4, Zap, CalendarCheck2, MessageSquareMore, Brain, Users, RefreshCcw, TrendingUp } from "lucide-react";

const CARDS = [
  { icon: Clock4, title: "Atendimento 24h", desc: "Madrugada, feriado ou domingo — sua IA continua respondendo." },
  { icon: Zap, title: "Respostas instantâneas", desc: "Cliente nunca espera. Cada mensagem recebe atenção em segundos." },
  { icon: CalendarCheck2, title: "Agendamento automático", desc: "A IA verifica a agenda, sugere horários e confirma sem intervenção." },
  { icon: MessageSquareMore, title: "Integração WhatsApp", desc: "Roda diretamente no canal que o seu cliente já usa todo dia." },
  { icon: Brain, title: "IA humanizada", desc: "Treinada com a voz da sua marca — emojis, tom e gírias incluídos." },
  { icon: Users, title: "Organização de leads", desc: "Cada conversa vira contato, com histórico e etapa do funil." },
  { icon: RefreshCcw, title: "Recuperação de clientes", desc: "A IA reativa quem sumiu, com mensagem certa na hora certa." },
  { icon: TrendingUp, title: "Escalável", desc: "Atende 10, 100 ou 10.000 clientes simultâneos — sem perder qualidade." },
];

export const Solution = () => {
  return (
    <section id="solucao" className="relative py-24 md:py-32 bg-black overflow-hidden" data-testid="solution-section">
      <div className="absolute inset-0 circuit-bg pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-full gold-divider opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="text-xs tracking-[0.25em] uppercase text-[#FFD700] mb-4 font-semibold" data-testid="solution-overline">
            A solução definitiva
          </div>
          <h2 className="font-['Outfit'] text-4xl md:text-5xl font-light text-white tracking-tighter leading-[1.05]" data-testid="solution-title">
            Atendimento automatizado <br />
            com <span className="text-gold-shine font-medium">inteligência humana.</span>
          </h2>
          <p className="mt-6 text-white/60 text-lg">
            Tecnologia premium, treinada para sua operação. Atende, agenda, fideliza — e vende.
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="group relative glass-card rounded-2xl p-7 hover-gold-border h-full"
                data-testid={`solution-card-${i}`}
              >
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFD700]/15 to-[#B8860B]/10 border border-[#FFD700]/25 flex items-center justify-center mb-5 group-hover:shadow-[0_0_20px_rgba(255,215,0,0.25)] transition-shadow">
                  <Icon size={22} className="text-[#FFD700]" strokeWidth={1.5} />
                </div>
                <h3 className="font-['Outfit'] text-lg font-medium text-white mb-2 group-hover:text-[#FFD700] transition-colors">
                  {c.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">{c.desc}</p>
                <div className="absolute bottom-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solution;
