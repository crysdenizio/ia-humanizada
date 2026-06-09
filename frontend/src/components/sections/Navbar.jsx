import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LOGO_URL, WHATSAPP_LINK } from "../../lib/constants";

const links = [
  { label: "Solução", href: "#solucao" },
  { label: "Demonstração", href: "#demo" },
  { label: "Clínicas", href: "#clinicas" },
  { label: "Depoimentos", href: "#depoimentos" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <a href="#hero" className="flex items-center gap-3 group" data-testid="navbar-logo">
          <img src={LOGO_URL} alt="Denizios IA Global Solutions" className="h-12 w-12 rounded-full object-cover ring-1 ring-[#FFD700]/40 group-hover:ring-[#FFD700] transition-all" />
          <div className="hidden sm:block leading-tight">
            <div className="font-['Outfit'] text-base tracking-wide text-gold-gradient font-semibold">Denizio&apos;s</div>
            <div className="text-[10px] tracking-[0.25em] text-white/60 uppercase">IA Global Solutions</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/70 hover:text-[#FFD700] transition-colors relative group"
              data-testid={`nav-link-${l.href.replace("#", "")}`}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FFD700] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
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
          className="lg:hidden bg-black/95 border-t border-[#FFD700]/15"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-[#FFD700] transition-colors py-2"
                data-testid={`mobile-nav-link-${l.href.replace("#", "")}`}
              >
                {l.label}
              </a>
            ))}
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
