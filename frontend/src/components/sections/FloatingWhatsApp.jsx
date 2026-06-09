import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { WHATSAPP_LINK, CONTACT, LOGO_URL } from "../../lib/constants";

export const FloatingWhatsApp = () => {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 8000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" data-testid="floating-whatsapp">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="w-[300px] sm:w-[340px] rounded-2xl overflow-hidden shadow-2xl border border-[#FFD700]/30"
              data-testid="whatsapp-popup"
            >
              <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                <img src={LOGO_URL} alt="" className="w-10 h-10 rounded-full ring-1 ring-[#FFD700]" />
                <div className="flex-1">
                  <div className="font-medium text-sm">Denizio&apos;s IA</div>
                  <div className="text-[10px] text-white/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full" /> respondemos em segundos
                  </div>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Fechar" data-testid="whatsapp-popup-close">
                  <X size={18} />
                </button>
              </div>

              <div className="bg-[#e5ddd5] px-4 py-5">
                <div className="bg-white rounded-lg rounded-tl-sm p-3 shadow text-[13px] text-neutral-800 max-w-[90%]">
                  Olá! 👋 Sou a IA da Denizio&apos;s. <br />
                  Como posso te ajudar hoje?
                </div>
              </div>

              <a
                href={WHATSAPP_LINK()}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#25D366] hover:bg-[#1eb352] text-white text-center font-semibold py-3 transition-colors"
                data-testid="whatsapp-popup-cta"
              >
                Iniciar conversa no WhatsApp
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(!open)}
          className={`relative w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.5)] ${
            pulse ? "animate-glow-pulse" : ""
          }`}
          aria-label="WhatsApp"
          data-testid="floating-whatsapp-btn"
        >
          {pulse && (
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
          )}
          <MessageCircle size={28} className="text-white relative z-10" fill="white" strokeWidth={0} />
        </motion.button>
      </div>
    </>
  );
};

export default FloatingWhatsApp;
