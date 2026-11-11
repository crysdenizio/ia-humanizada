import React from "react";
import { motion } from "framer-motion";
import { Clock, Zap, CalendarCheck, MessagesSquare } from "lucide-react";

const BENEFITS = [
  {
    icon: Clock,
    label: "Atendimento 24h",
    desc: "Seu negócio responde à noite, no fim de semana e em feriados, sem ninguém de plantão.",
  },
  {
    icon: Zap,
    label: "Resposta em segundos",
    desc: "O cliente não fica esperando. A IA responde na hora e já encaminha o que ele precisa.",
  },
  {
    icon: CalendarCheck,
    label: "Agenda e pedidos organizados",
    desc: "Agendamentos e pedidos chegam organizados, sem se perder no meio da conversa.",
  },
  {
    icon: MessagesSquare,
    label: "Menos conversa abandonada",
    desc: "Quem pergunta é atendido, em vez de ficar sem resposta até desistir.",
  },
];

export const Benefits = () => {
  return (
    <section id="beneficios" className="relative py-24 md:py-32 bg-black overflow-hidden" data-testid="benefits-section">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#FFD700] opacity-[0.07] blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="text-xs tracking-[0.25em] uppercase text-[#FFD700] mb-4 font-semibold">O que muda no seu atendimento</div>
          <h2 className="font-['Outfit'] text-4xl md:text-5xl font-light text-white tracking-tighter leading-[1.05]" data-testid="benefits-title">
            Atendimento rápido, organizado e{" "}
            <span className="text-gold-shine font-medium">sempre disponível.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative glass-card rounded-2xl p-8 hover-gold-border text-center"
                data-testid={`benefits-stat-${i}`}
              >
                <div className="w-14 h-14 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/25 flex items-center justify-center mx-auto mb-5">
                  <Icon size={26} className="text-[#FFD700]" strokeWidth={1.5} />
                </div>
                <div className="text-white text-base font-medium mb-2">{b.label}</div>
                <p className="text-white/55 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
