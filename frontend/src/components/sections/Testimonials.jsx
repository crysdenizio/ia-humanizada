import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { IMAGES } from "../../lib/constants";

const TESTIMONIALS = [
  {
    name: "Dra. Carla Mendes",
    role: "Clínica Vitalis — São Paulo",
    avatar: IMAGES.testimonial2,
    text: "Depois da automação da Denizio's, nossa clínica começou a responder pacientes em segundos. O número de agendamentos cresceu 73% em 2 meses.",
  },
  {
    name: "Rafael Andrade",
    role: "CEO — Andrade Estética",
    avatar: IMAGES.testimonial3,
    text: "Demiti a sensação de perder cliente por falta de atendimento. A IA fala como nós, agenda no horário certo e ainda reativa pacientes antigos.",
  },
  {
    name: "Marcos Lopes",
    role: "Dir. Comercial — Imobiliária Lopes",
    avatar: IMAGES.testimonial1,
    text: "Os corretores chegavam às 9h e já tinham 30 leads pré-qualificados pela IA. O ROI no primeiro mês foi simplesmente absurdo.",
  },
];

export const Testimonials = () => {
  return (
    <section id="depoimentos" className="relative py-24 md:py-32 bg-black overflow-hidden" data-testid="testimonials-section">
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#FFD700] opacity-[0.04] blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="text-xs tracking-[0.25em] uppercase text-[#FFD700] mb-4 font-semibold">Quem já transformou</div>
          <h2 className="font-['Outfit'] text-4xl md:text-5xl font-light text-white tracking-tighter leading-[1.05]" data-testid="testimonials-title">
            Histórias reais de quem <br />
            <span className="text-gold-shine font-medium">multiplicou resultados.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative glass-card-gold rounded-3xl p-7 hover-gold-border flex flex-col"
              data-testid={`testimonial-card-${i}`}
            >
              <Quote size={28} className="text-[#FFD700]/50 mb-4" />

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={16} className="text-[#FFD700]" fill="#FFD700" />
                ))}
              </div>

              <p className="text-white/85 text-sm md:text-base leading-relaxed flex-1 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-white/10">
                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover ring-1 ring-[#FFD700]/40" />
                <div>
                  <div className="font-['Outfit'] text-white font-medium text-sm">{t.name}</div>
                  <div className="text-white/50 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
