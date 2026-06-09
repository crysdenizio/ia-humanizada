import React from "react";
import { motion } from "framer-motion";
import { Stethoscope, BellRing, CalendarCheck, HeartPulse, MessageCircle } from "lucide-react";
import { IMAGES, WHATSAPP_LINK } from "../../lib/constants";

const FEATURES = [
  { icon: CalendarCheck, title: "Agendamentos automáticos", desc: "Paciente escolhe o horário 24h por dia, direto no WhatsApp." },
  { icon: BellRing, title: "Lembretes inteligentes", desc: "1 dia e 1 hora antes — reduzindo o no-show em até 60%." },
  { icon: HeartPulse, title: "Confirmação de consulta", desc: "Paciente confirma com 1 clique. A agenda fica sempre atualizada." },
  { icon: Stethoscope, title: "Atendimento humanizado", desc: "Conversa empática, cuidadosa e com a voz da sua clínica." },
];

export const Clinics = () => {
  return (
    <section id="clinicas" className="relative py-24 md:py-32 bg-black overflow-hidden" data-testid="clinics-section">
      <div className="absolute inset-0 circuit-bg opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-14 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden border border-[#FFD700]/20 shadow-[0_30px_80px_rgba(255,215,0,0.15)]"
          data-testid="clinics-image-wrapper"
        >
          <img
            src={IMAGES.clinics}
            alt="Clínica usando automação"
            className="w-full h-[520px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          {/* Floating stat card */}
          <div className="absolute bottom-6 left-6 right-6 glass-card-gold rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
              <MessageCircle size={22} className="text-white" />
            </div>
            <div>
              <div className="text-xs text-white/60 uppercase tracking-widest">Satisfação de pacientes</div>
              <div className="font-['Outfit'] text-2xl text-white font-medium">98% <span className="text-[#FFD700] text-sm">aprovam o atendimento por IA</span></div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs tracking-[0.25em] uppercase text-[#FFD700] mb-4 font-semibold">Para clínicas & consultórios</div>
            <h2 className="font-['Outfit'] text-4xl md:text-5xl font-light text-white tracking-tighter leading-[1.05]" data-testid="clinics-title">
              Sua clínica nunca mais <br />
              <span className="text-gold-shine font-medium">perde pacientes.</span>
            </h2>
            <p className="mt-6 text-white/60 text-lg leading-relaxed">
              Da pré-consulta ao pós-atendimento — uma IA que cuida da sua agenda
              com a delicadeza de uma recepcionista experiente.
            </p>
          </motion.div>

          <div className="mt-9 grid sm:grid-cols-2 gap-4">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass-card rounded-2xl p-5 hover-gold-border"
                  data-testid={`clinics-feature-${i}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#FFD700]/10 border border-[#FFD700]/25 flex items-center justify-center mb-3">
                    <Icon size={18} className="text-[#FFD700]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-['Outfit'] text-base font-medium text-white mb-1">{f.title}</h3>
                  <p className="text-xs text-white/55 leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <a
            href={WHATSAPP_LINK("Olá! Tenho uma clínica e quero saber sobre a IA para agendamentos.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine mt-9 inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold rounded-full px-7 py-4 hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all"
            data-testid="clinics-cta"
          >
            <MessageCircle size={18} /> Quero para minha clínica
          </a>
        </div>
      </div>
    </section>
  );
};

export default Clinics;
