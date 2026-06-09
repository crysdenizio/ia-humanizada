import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CheckCheck, Phone, Video, MoreVertical } from "lucide-react";

const SCRIPT = [
  { from: "client", text: "Oi! Gostaria de agendar uma consulta 🙏" },
  { from: "ia", text: "Olá, Ana! 😊 Será um prazer te ajudar.\nQual período você prefere — manhã ou tarde?", typing: 1100 },
  { from: "client", text: "De manhã, por favor." },
  { from: "ia", text: "Perfeito! Tenho um horário às 9h30 com a Dra. Camila, na quinta-feira. Posso confirmar para você?", typing: 1300 },
  { from: "client", text: "Sim, pode confirmar! ✨" },
  { from: "ia", text: "Confirmado ✅\nVou te enviar um lembrete 1 dia antes.\nQuer que eu já adicione no seu Google Agenda?", typing: 1200 },
];

const Bubble = ({ from, text }) => {
  const isIA = from === "ia";
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`flex ${isIA ? "justify-start" : "justify-end"} mb-2 px-3`}
    >
      <div
        className={`max-w-[78%] px-3 py-2 rounded-lg text-[13px] leading-snug whitespace-pre-line shadow-md ${
          isIA
            ? "bg-white text-neutral-900 rounded-tl-sm"
            : "bg-[#dcf8c6] text-neutral-900 rounded-tr-sm"
        }`}
      >
        {text}
        <div className="flex justify-end items-center gap-0.5 mt-1 text-[10px] text-neutral-500">
          <span>{new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, "0")}</span>
          {!isIA && <CheckCheck size={12} className="text-[#34B7F1]" />}
        </div>
      </div>
    </motion.div>
  );
};

const TypingBubble = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex justify-start mb-2 px-3"
  >
    <div className="bg-white px-3 py-2 rounded-lg rounded-tl-sm flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-neutral-500"
          style={{ animation: `typing-dot 1.2s ease-in-out ${i * 0.18}s infinite` }}
        />
      ))}
    </div>
  </motion.div>
);

export const PhoneMockup = ({ autoplay = true, loop = true }) => {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!autoplay) return;
    let timer;
    const next = SCRIPT[step];
    if (!next) {
      if (loop) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        timer = setTimeout(() => setStep(0), 3500);
      }
      return () => clearTimeout(timer);
    }
    if (next.typing) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTyping(true);
      timer = setTimeout(() => {
        setTyping(false);
        setStep((s) => s + 1);
      }, next.typing);
    } else {
      timer = setTimeout(() => setStep((s) => s + 1), 900);
    }
    return () => clearTimeout(timer);
  }, [step, autoplay, loop]);

  const visible = SCRIPT.slice(0, step);

  return (
    <div className="relative mx-auto" style={{ width: 300, maxWidth: "100%" }} data-testid="phone-mockup">
      {/* Outer glow */}
      <div className="absolute -inset-6 bg-[#FFD700]/15 blur-3xl rounded-full" />

      {/* Phone frame */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-[44px] p-3 bg-gradient-to-b from-[#FFD700] via-[#B8860B] to-[#5c4408] shadow-[0_30px_60px_rgba(255,215,0,0.25)]"
      >
        <div className="relative bg-black rounded-[36px] overflow-hidden" style={{ aspectRatio: "9/19.5" }}>
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-20 border border-neutral-900" />

          {/* WhatsApp screen */}
          <div className="absolute inset-0 flex flex-col">
            {/* Header */}
            <div className="bg-[#075E54] text-white px-3 pt-9 pb-2 flex items-center gap-3">
              <img
                src="https://customer-assets.emergentagent.com/job_3b1f56ac-6f46-4259-b8ea-d33211c4462c/artifacts/cv7grtyj_image.png"
                alt="IA"
                className="w-9 h-9 rounded-full object-cover ring-1 ring-[#FFD700]"
              />
              <div className="flex-1">
                <div className="text-sm font-semibold">Denizio&apos;s IA</div>
                <div className="text-[10px] text-white/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full" /> online agora
                </div>
              </div>
              <Video size={16} />
              <Phone size={16} />
              <MoreVertical size={16} />
            </div>

            {/* Chat bg */}
            <div
              className="flex-1 py-3 overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, #0a141a 0%, #0e1b22 100%)",
              }}
            >
              <div className="flex flex-col justify-end h-full">
                <AnimatePresence>
                  {visible.map((m, i) => (
                    <Bubble key={i} {...m} />
                  ))}
                  {typing && <TypingBubble key="typing" />}
                </AnimatePresence>
              </div>
            </div>

            {/* Input bar */}
            <div className="bg-[#1f2c33] px-3 py-2 flex items-center gap-2">
              <div className="flex-1 bg-[#2a3942] rounded-full px-3 py-1.5 text-[11px] text-white/40">
                Digite uma mensagem...
              </div>
              <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PhoneMockup;
