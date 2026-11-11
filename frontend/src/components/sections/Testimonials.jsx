import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Hammer, ShieldCheck, LifeBuoy, ExternalLink } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Conversa e diagnóstico",
    desc: "Entendemos como o seu negócio atende hoje e onde dá pra ganhar tempo e vender mais.",
  },
  {
    icon: Hammer,
    title: "Construção sob medida",
    desc: "Criamos a automação, o site ou o aplicativo com a cara e a linguagem do seu negócio.",
  },
  {
    icon: ShieldCheck,
    title: "Testes e ajustes",
    desc: "Testamos tudo com você antes de ir pro ar, para o atendimento sair certo desde o primeiro dia.",
  },
  {
    icon: LifeBuoy,
    title: "Entrega e suporte",
    desc: "Você recebe tudo funcionando e conta com a gente para ajustes e evoluções.",
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
          <div className="text-xs tracking-[0.25em] uppercase text-[#FFD700] mb-4 font-semibold">Como a gente trabalha</div>
          <h2 className="font-['Outfit'] text-4xl md:text-5xl font-light text-white tracking-tighter leading-[1.05]" data-testid="testimonials-title">
            Do primeiro contato até <br />
            <span className="text-gold-shine font-medium">o sistema funcionando.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative glass-card-gold rounded-3xl p-7 hover-gold-border flex flex-col"
                data-testid={`step-card-${i}`}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-lg bg-[#FFD700]/10 border border-[#FFD700]/25 flex items-center justify-center">
                    <Icon size={22} className="text-[#FFD700]" strokeWidth={1.5} />
                  </div>
                  <span className="font-['Outfit'] text-3xl font-light text-[#FFD700]/40">0{i + 1}</span>
                </div>
                <h3 className="font-['Outfit'] text-lg font-medium text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5 }}
          className="mt-14 glass-card-gold rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          data-testid="flowops-project-card"
        >
          <div className="max-w-2xl">
            <div className="text-xs tracking-[0.25em] uppercase text-[#FFD700] mb-3 font-semibold">Projeto nosso</div>
            <h3 className="font-['Outfit'] text-2xl md:text-3xl font-light text-white tracking-tight">
              FlowOps: aprovação de posts para social media
            </h3>
            <p className="mt-3 text-white/60 leading-relaxed">
              Um aplicativo que a própria Denizio's criou. O profissional envia o trabalho e o cliente aprova
              com um toque, tudo registrado num lugar só. É o tipo de sistema sob medida que a gente constrói para o seu negócio.
            </p>
          </div>
          <a
            href="https://site-flowops.deniziosglobal.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-flex items-center gap-2 bg-[#FFD700] text-black font-semibold rounded-full px-7 py-4 hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all whitespace-nowrap self-start md:self-auto"
            data-testid="flowops-project-link"
          >
            Conhecer o FlowOps <ExternalLink size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
