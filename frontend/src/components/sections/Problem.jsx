import React from "react";
import { motion } from "framer-motion";
import { Clock, UserX, MoonStar, ListX, Snail } from "lucide-react";

const PROBLEMS = [
  { icon: Clock, title: "Perda de clientes por demora", desc: "Cada minuto de espera é um lead pronto para procurar o concorrente." },
  { icon: UserX, title: "Recepcionista ausente", desc: "Folgas, atestados, intervalos — e o telefone toca sem ninguém atender." },
  { icon: MoonStar, title: "Atendimento limitado", desc: "Após as 18h, durante o almoço, fins de semana... seu negócio dorme." },
  { icon: ListX, title: "Falta de organização", desc: "Mensagens espalhadas em diferentes canais e nenhum follow-up." },
  { icon: Snail, title: "Respostas lentas", desc: "O cliente quer urgência. Demorou? Ele já saiu da sua página." },
];

export const Problem = () => {
  return (
    <section id="problema" className="relative py-24 md:py-32 bg-black overflow-hidden" data-testid="problem-section">
      {/* Red accent gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#C0392B] opacity-[0.08] blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="text-xs tracking-[0.25em] uppercase text-[#C0392B] mb-4 font-semibold" data-testid="problem-overline">
            O problema é silencioso
          </div>
          <h2 className="font-['Outfit'] text-4xl md:text-5xl font-light text-white tracking-tighter leading-[1.05]" data-testid="problem-title">
            Enquanto você dorme, <br />
            sua concorrência está <span className="text-[#C0392B] italic font-medium">atendendo seus clientes.</span>
          </h2>
          <p className="mt-6 text-white/60 text-lg max-w-2xl">
            Esses são os 5 erros que estão fazendo você perder dinheiro todos os dias — sem nem perceber.
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROBLEMS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative glass-card rounded-2xl p-7 hover-gold-border"
                data-testid={`problem-card-${i}`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="relative w-12 h-12 rounded-xl bg-[#C0392B]/10 border border-[#C0392B]/30 flex items-center justify-center">
                    <Icon size={22} className="text-[#C0392B]" strokeWidth={1.5} />
                  </div>
                  <span className="text-5xl font-['Outfit'] font-light text-white/[0.06] leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-['Outfit'] text-lg font-medium text-white mb-2">{p.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Problem;
