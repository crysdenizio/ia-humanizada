import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import seo from "../../lib/seoPages.json";

const FEATURED = [
  "automacao-whatsapp-clinicas",
  "cardapio-digital-restaurantes",
  "agente-ia-barbearias",
  "criacao-de-sites-sao-jose-dos-campos",
];

const SHORT_DESC = {
  "automacao-whatsapp-clinicas": "Agenda consultas, confirma horários e envia lembretes 24h.",
  "cardapio-digital-restaurantes": "Cardápio online com pedido direto pelo WhatsApp.",
  "agente-ia-barbearias": "Agenda horários, lembra o cliente e reativa quem sumiu.",
  "criacao-de-sites-sao-jose-dos-campos": "Sites e lojas virtuais prontos para o Google e para o celular.",
};

export const LocalServices = () => {
  const pages = FEATURED.map((slug) => seo.pages.find((p) => p.slug === slug)).filter(Boolean);

  return (
    <section id="atendimento-local" className="relative py-24 md:py-32 bg-black overflow-hidden" data-testid="local-services-section">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#FFD700] mb-4 font-semibold">
            <MapPin size={14} />
            São José dos Campos e região
          </div>
          <h2 className="font-['Outfit'] text-4xl md:text-5xl font-light text-white tracking-tighter leading-[1.05]">
            Automação com IA e sites para negócios de{" "}
            <span className="text-gold-shine font-medium">São José dos Campos.</span>
          </h2>
          <p className="mt-6 text-white/60 text-lg leading-relaxed">
            A Denizio&apos;s é de São José dos Campos e atende negócios da cidade e da região, além de empresas de todo o Brasil de
            forma remota. Escolha o seu tipo de negócio e veja como funciona.
          </p>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pages.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                to={`/${p.slug}`}
                className="group block h-full glass-card rounded-2xl p-7 hover-gold-border"
                data-testid={`local-service-${p.slug}`}
              >
                <h3 className="font-['Outfit'] text-xl font-medium text-white mb-2">{p.navLabel}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{SHORT_DESC[p.slug]}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-[#FFD700] font-medium">
                  Saiba mais
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-sm text-white/50">
          Quer saber quem somos?{" "}
          <Link to="/sobre" className="text-[#FFD700] hover:underline">
            Conheça a Denizio&apos;s IA
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default LocalServices;
