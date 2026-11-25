import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { LOGO_URL, WHATSAPP_LINK } from "../../lib/constants";
import seo from "../../lib/seoPages.json";

// Links com "/#" funcionam tanto na home quanto nas páginas internas.
const anchorLinks = {
  before: [
    { label: "Solução", id: "solucao" },
    { label: "Demonstração", id: "demo" },
  ],
  after: [{ label: "Como funciona", id: "depoimentos" }],
};
const toHref = (l) => ({ ...l, href: `/#${l.id}` });
const before = anchorLinks.before.map(toHref);
const after = anchorLinks.after.map(toHref);

// Páginas de serviço (tudo menos "sobre") entram no menu "Serviços".
const services = seo.pages.filter((p) => p.slug !== "sobre");
const about = seo.pages.find((p) => p.slug === "sobre");

const linkClass = "text-sm text-white/70 hover:text-[#FFD700] transition-colors relative group";
const underline = (
  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FFD700] group-hover:w-full transition-all duration-300" />
);

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderAnchor = (l) => (
    <a key={l.href} href={l.href} className={linkClass} data-testid={`nav-link-${l.id}`}>
      {l.label}
      {underline}
    </a>
  );

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/70 backdrop-blur-xl border-b border-[#FFD700]/15" : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <a href="/#hero" className="flex items-center gap-3 group" data-testid="navbar-logo">
          <img src={LOGO_URL} alt="Denizios IA Global Solutions" className="h-12 w-12 rounded-full object-cover ring-1 ring-[#FFD700]/40 group-hover:ring-[#FFD700] transition-all" />
          <div className="hidden sm:block leading-tight">
            <div className="font-['Outfit'] text-base tracking-wide text-gold-gradient font-semibold">Denizio&apos;s</div>
            <div className="text-[10px] tracking-[0.25em] text-white/60 uppercase">IA Global Solutions</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {before.map(renderAnchor)}

          {/* Menu "Serviços" com as páginas de cada serviço */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              className="flex items-center gap-1 text-sm text-white/70 hover:text-[#FFD700] transition-colors"
              data-testid="nav-services-toggle"
            >
              Serviços
              <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3" data-testid="nav-services-menu">
                <div className="min-w-[250px] rounded-2xl bg-black/95 backdrop-blur-xl border border-[#FFD700]/20 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
                  {services.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/${p.slug}`}
                      onClick={() => setServicesOpen(false)}
                      className="block rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-[#FFD700]/10 hover:text-[#FFD700] transition-colors"
                      data-testid={`nav-service-${p.slug}`}
                    >
                      {p.navLabel}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {after.map(renderAnchor)}

          {about && (
            <Link to={`/${about.slug}`} className={linkClass} data-testid="nav-link-sobre">
              {about.navLabel}
              {underline}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_LINK()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black font-semibold rounded-full px-6 py-2.5 text-sm hover:shadow-[0_0_24px_rgba(255,215,0,0.4)] transition-all"
            data-testid="navbar-whatsapp-cta"
          >
            Falar no WhatsApp
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-[#FFD700]"
            aria-label="Menu"
            data-testid="mobile-menu-toggle"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-black/95 border-t border-[#FFD700]/15 max-h-[80vh] overflow-y-auto"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {before.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-[#FFD700] transition-colors py-2"
                data-testid={`mobile-nav-link-${l.id}`}
              >
                {l.label}
              </a>
            ))}

            <div className="border-l border-[#FFD700]/30 pl-4 flex flex-col gap-1">
              <div className="text-[11px] tracking-[0.2em] uppercase text-[#FFD700]/80 mb-1">Serviços</div>
              {services.map((p) => (
                <Link
                  key={p.slug}
                  to={`/${p.slug}`}
                  onClick={() => setOpen(false)}
                  className="text-white/80 hover:text-[#FFD700] transition-colors py-2"
                  data-testid={`mobile-nav-service-${p.slug}`}
                >
                  {p.navLabel}
                </Link>
              ))}
            </div>

            {after.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-[#FFD700] transition-colors py-2"
                data-testid={`mobile-nav-link-${l.id}`}
              >
                {l.label}
              </a>
            ))}
            {about && (
              <Link
                to={`/${about.slug}`}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-[#FFD700] transition-colors py-2"
                data-testid="mobile-nav-link-sobre"
              >
                {about.navLabel}
              </Link>
            )}

            <a
              href={WHATSAPP_LINK()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black font-semibold rounded-full px-6 py-3 text-center"
              data-testid="mobile-whatsapp-cta"
            >
              Falar no WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
