import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, ExternalLink, MapPin, MessageCircle } from "lucide-react";
import Navbar from "../components/sections/Navbar";
import Footer from "../components/sections/Footer";
import FloatingWhatsApp from "../components/sections/FloatingWhatsApp";
import { WHATSAPP_LINK } from "../lib/constants";
import { useSeo } from "../lib/useSeo";
import seo from "../lib/seoPages.json";

const findPage = (slug) => seo.pages.find((p) => p.slug === slug);

export const ServicePage = ({ page }) => {
  useSeo({ title: page.title, description: page.description, path: `/${page.slug}` });

  const related = (page.related || []).map(findPage).filter(Boolean);
  const cta = WHATSAPP_LINK(page.ctaMessage);

  return (
    <main className="bg-black min-h-screen text-white" data-testid={`page-${page.slug}`}>
      <Navbar />

      {/* Topo */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 circuit-bg opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#FFD700] opacity-[0.05] blur-[140px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 md:px-12">
          <nav aria-label="Você está em" className="text-xs text-white/50 mb-8">
            <Link to="/" className="hover:text-[#FFD700] transition-colors">Início</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">{page.navLabel}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-gold mb-7">
              <MapPin size={14} className="text-[#FFD700]" />
              <span className="text-xs tracking-[0.15em] uppercase text-[#FFD700] font-medium">{page.eyebrow}</span>
            </div>

            <h1 className="font-['Outfit'] text-4xl md:text-6xl font-light text-white tracking-tighter leading-[1.08]">
              {page.h1}
            </h1>
            <p className="mt-7 text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl">{page.lead}</p>

            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <a
                href={cta}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine group inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold rounded-full px-7 py-4 text-base hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all"
                data-testid="service-cta-top"
              >
                <MessageCircle size={18} />
                {page.ctaLabel}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/#solucao"
                className="inline-flex items-center justify-center gap-2 border border-[#FFD700]/40 text-[#FFD700] font-semibold rounded-full px-7 py-4 text-base hover:bg-[#FFD700]/10 transition-all"
              >
                Conhecer a solução
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Telas do app (só nas páginas que têm `gallery`) */}
      {page.gallery && page.gallery.length > 0 && (
        <section className="relative pb-8 md:pb-12 bg-black" data-testid="service-gallery">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <ul className="flex flex-wrap justify-center gap-8 md:gap-12">
              {page.gallery.map((img) => (
                <li key={img.src} className="w-full max-w-[280px]">
                  <img
                    src={img.src}
                    alt={img.alt}
                    width="720"
                    height="1280"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto rounded-3xl border border-[#FFD700]/20 shadow-[0_0_40px_rgba(255,215,0,0.08)]"
                  />
                  {img.caption && <p className="mt-3 text-center text-xs text-white/50">{img.caption}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Benefícios */}
      {page.benefits && page.benefits.length > 0 && (
        <section className="relative py-16 md:py-20 bg-black">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <h2 className="font-['Outfit'] text-3xl md:text-4xl font-light tracking-tighter text-white">
              O que você ganha com <span className="text-gold-shine font-medium">{page.serviceName.toLowerCase()}</span>
            </h2>
            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {page.benefits.map((b) => (
                <div key={b.title} className="glass-card rounded-2xl p-7 hover-gold-border">
                  <div className="w-10 h-10 rounded-lg bg-[#FFD700]/10 border border-[#FFD700]/25 flex items-center justify-center mb-4">
                    <Check size={20} className="text-[#FFD700]" strokeWidth={2} />
                  </div>
                  <h3 className="font-['Outfit'] text-xl font-medium text-white mb-2">{b.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Conteúdo */}
      <section className="relative py-16 md:py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
          {page.sections.map((s) => (
            <article key={s.heading}>
              <h2 className="font-['Outfit'] text-2xl md:text-3xl font-light tracking-tighter text-white">{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="mt-4 text-white/65 text-base md:text-lg leading-relaxed">{p}</p>
              ))}
              {s.link && (
                <a
                  href={s.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-[#FFD700] font-medium hover:underline"
                >
                  {s.link.label}
                  <ExternalLink size={16} />
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Como funciona */}
      {page.showSteps && (
        <section className="relative py-16 md:py-20 bg-black">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <h2 className="font-['Outfit'] text-3xl md:text-4xl font-light tracking-tighter text-white">
              Como a gente <span className="text-gold-shine font-medium">trabalha</span>
            </h2>
            <ol className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {seo.steps.map((step, i) => (
                <li key={step.title} className="glass-card rounded-2xl p-7">
                  <div className="font-['Outfit'] text-3xl text-[#FFD700]/70 mb-3">0{i + 1}</div>
                  <h3 className="font-['Outfit'] text-lg font-medium text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Perguntas frequentes */}
      {page.faq && page.faq.length > 0 && (
        <section className="relative py-16 md:py-20 bg-black">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <h2 className="font-['Outfit'] text-3xl md:text-4xl font-light tracking-tighter text-white">
              Perguntas <span className="text-gold-shine font-medium">frequentes</span>
            </h2>
            <div className="mt-8 space-y-3">
              {page.faq.map((item) => (
                <details key={item.q} className="group glass-card rounded-2xl px-6 py-5">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-white font-medium">
                    {item.q}
                    <ChevronDown size={18} className="text-[#FFD700] flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-4 text-white/65 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Chamada final */}
      <section className="relative py-20 md:py-28 bg-black overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#FFD700] opacity-[0.06] blur-[160px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-['Outfit'] text-3xl md:text-5xl font-light text-white tracking-tighter leading-[1.1]">
            Vamos conversar sobre o <span className="text-gold-shine font-medium italic">seu negócio?</span>
          </h2>
          <p className="mt-6 text-white/65 text-lg">
            Conte como o seu atendimento funciona hoje e veja o que dá pra automatizar. Respondemos pelo WhatsApp o mais rápido possível.
          </p>
          <a
            href={cta}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine group mt-9 inline-flex items-center gap-3 bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] text-black font-bold rounded-full px-9 py-4 text-lg shadow-[0_0_50px_rgba(255,215,0,0.4)] hover:shadow-[0_0_70px_rgba(255,215,0,0.6)] transition-all"
            data-testid="service-cta-bottom"
          >
            Falar com especialista agora
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
          </a>
        </div>
      </section>

      {/* Outras páginas */}
      {related.length > 0 && (
        <section className="relative py-14 bg-black border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <h2 className="font-['Outfit'] text-xl text-white/80 mb-6">Veja também</h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/${r.slug}`}
                    className="block glass-card hover-gold-border rounded-xl px-5 py-4 text-sm text-white/80 hover:text-[#FFD700] transition-colors"
                  >
                    {r.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};

export default ServicePage;
