import React from "react";
import { Mail, Phone, Instagram, MessageCircle, MapPin } from "lucide-react";
import { CONTACT, LOGO_URL, WHATSAPP_LINK } from "../../lib/constants";

const QUICK_LINKS = [
  { label: "Solução", href: "#solucao" },
  { label: "Demonstração", href: "#demo" },
  { label: "Clínicas", href: "#clinicas" },
  { label: "Depoimentos", href: "#depoimentos" },
];

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-black border-t border-[#FFD700]/15 overflow-hidden" data-testid="footer">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FFD700] opacity-[0.04] blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <a href="#hero" className="flex items-center gap-3" data-testid="footer-logo">
              <img src={LOGO_URL} alt="Denizios IA Global Solutions" className="w-14 h-14 rounded-full object-cover ring-1 ring-[#FFD700]/40" />
              <div>
                <div className="font-['Outfit'] text-xl text-gold-gradient font-semibold leading-tight">Denizio&apos;s</div>
                <div className="text-[10px] tracking-[0.25em] text-white/60 uppercase">IA Global Solutions</div>
              </div>
            </a>
            <p className="mt-5 text-white/55 text-sm leading-relaxed max-w-md">
              Automação inteligente com IA humanizada para clínicas, consultórios e
              empresas que querem escalar atendimento sem perder a essência.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={WHATSAPP_LINK()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="WhatsApp"
                data-testid="footer-social-whatsapp"
              >
                <MessageCircle size={18} className="text-white" />
              </a>
              <a
                href={`https://instagram.com/${CONTACT.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B8860B] to-[#FFD700] flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Instagram"
                data-testid="footer-social-instagram"
              >
                <Instagram size={18} className="text-black" />
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="w-10 h-10 rounded-full border border-[#FFD700]/30 flex items-center justify-center hover:bg-[#FFD700]/10 hover:scale-110 transition-all"
                aria-label="E-mail"
                data-testid="footer-social-email"
              >
                <Mail size={18} className="text-[#FFD700]" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h4 className="font-['Outfit'] text-white font-medium mb-5 text-sm uppercase tracking-widest">Links rápidos</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/55 hover:text-[#FFD700] transition-colors text-sm"
                    data-testid={`footer-link-${l.href.replace("#", "")}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-['Outfit'] text-white font-medium mb-5 text-sm uppercase tracking-widest">Contato</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={WHATSAPP_LINK()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/65 hover:text-[#25D366] transition-colors group"
                  data-testid="footer-whatsapp"
                >
                  <MessageCircle size={18} className="text-[#25D366] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-white/40">WhatsApp</div>
                    <div className="group-hover:underline">{CONTACT.whatsappDisplay}</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-3 text-white/65 hover:text-[#FFD700] transition-colors group"
                  data-testid="footer-email"
                >
                  <Mail size={18} className="text-[#FFD700] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-white/40">E-mail</div>
                    <div className="break-all group-hover:underline">{CONTACT.email}</div>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/65">
                <Instagram size={18} className="text-[#FFD700] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-white/40">Instagram</div>
                  <a
                    href={`https://instagram.com/${CONTACT.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FFD700] transition-colors"
                  >
                    @{CONTACT.instagram}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40" data-testid="footer-copyright">
            © {year} Denizio&apos;s IA Global Solutions. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/30">
            Automação com inteligência que transforma.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
