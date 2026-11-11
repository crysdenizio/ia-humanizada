import React from "react";
import { motion } from "framer-motion";
import { Globe, UtensilsCrossed, Smartphone, MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "../../lib/constants";

const ITEMS = [
  {
    icon: Globe,
    title: "Sites institucionais e lojas virtuais",
    desc: "Seu negócio com presença profissional na internet: site rápido, bonito no celular e preparado para aparecer nas buscas do Google.",
  },
  {
    icon: UtensilsCrossed,
    title: "Cardápios digitais",
    desc: "Cardápio online com pedido pelo WhatsApp, para restaurantes, lanchonetes e delivery receberem pedidos sem se enrolar.",
  },
  {
    icon: Smartphone,
    title: "Aplicativos e MicroSaaS",
    desc: "Sistemas sob medida para organizar o seu atendimento, agendamentos e clientes, criados do zero para o seu tipo de negócio.",
  },
];

export const SitesApps = () => {
  return (
    <section id="sites-e-apps" className="relative py-24 md:py-32 bg-black overflow-hidden" data-testid="sitesapps-section">
      <div className="absolute inset-0 circuit-bg opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="text-xs tracking-[0.25em] uppercase text-[#FFD700] mb-4 font-semibold">Sites & aplicativos</div>
          <h2 className="font-['Outfit'] text-4xl md:text-5xl font-light text-white tracking-tighter leading-[1.05]" data-testid="sitesapps-title">
            Sites e aplicativos que trabalham junto com a{" "}
            <span className="text-gold-shine font-medium">sua automação.</span>
          </h2>
          <p className="mt-6 text-white/60 text-lg leading-relaxed">
            Atender bem no WhatsApp é só o começo. A Denizio's também cria o site e o aplicativo do seu negócio,
            para o cliente te encontrar no Google, fazer o pedido ou agendar, e tudo ficar conectado.
          </p>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-7 hover-gold-border"
                data-testid={`sitesapps-item-${i}`}
              >
                <div className="w-12 h-12 rounded-lg bg-[#FFD700]/10 border border-[#FFD700]/25 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-[#FFD700]" strokeWidth={1.5} />
                </div>
                <h3 className="font-['Outfit'] text-xl font-medium text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-10 text-white/60 text-base leading-relaxed max-w-3xl">
          Para restaurantes, clínicas, barbearias, cabeleireiros, pet shops e outros negócios que querem vender e atender melhor.
        </p>

        <a
          href={WHATSAPP_LINK("Olá! Quero saber mais sobre site ou aplicativo para o meu negócio.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shine mt-8 inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold rounded-full px-7 py-4 hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all"
          data-testid="sitesapps-cta"
        >
          <MessageCircle size={18} /> Falar no WhatsApp
        </a>
      </div>
    </section>
  );
};

export default SitesApps;
