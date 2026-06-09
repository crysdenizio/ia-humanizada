import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { WHATSAPP_LINK } from "../../lib/constants";

// Simple intent matcher (visual only — no LLM)
const RESPONSES = [
  { keywords: ["preço", "preco", "plano", "valor", "custa", "quanto"], reply: "Temos 3 planos premium a partir de R$ 297/mês. Quer que eu te chame um especialista no WhatsApp para um plano sob medida?" },
  { keywords: ["agendar", "demo", "demonstra", "teste"], reply: "Claro! Posso agendar uma demonstração ao vivo. Me chama no WhatsApp que eu escolho um horário com você 😊" },
  { keywords: ["clinica", "clínica", "consultorio", "consultório", "medic"], reply: "Perfeito! Atendemos clínicas e consultórios com agendamento automático, lembretes e confirmação de consultas. Quer ver na prática?" },
  { keywords: ["ola", "olá", "oi", "hey"], reply: "Olá! 👋 Sou a IA da Denizio's. Como posso te ajudar? Posso falar sobre planos, demonstração ou tirar dúvidas." },
  { keywords: ["como", "funciona"], reply: "A nossa IA é treinada para a sua marca. Ela atende no WhatsApp 24h, agenda, confirma consultas e recupera clientes que sumiram. Tudo automatizado." },
];

const DEFAULT_REPLY = "Ótima pergunta! Para te dar uma resposta personalizada, prefiro te conectar com um especialista no WhatsApp. Pode ser?";

export const FloatingAIChat = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "ia", text: "Olá! 👋 Sou a IA da Denizio's. Como posso te ajudar hoje?" },
  ]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      const match = RESPONSES.find((r) => r.keywords.some((k) => lower.includes(k)));
      const reply = match ? match.reply : DEFAULT_REPLY;
      setMessages((m) => [...m, { from: "ia", text: reply }]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3" data-testid="floating-ai-chat">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="w-[320px] sm:w-[360px] h-[460px] rounded-2xl overflow-hidden shadow-2xl border border-[#FFD700]/40 bg-black flex flex-col"
            data-testid="ai-chat-popup"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center">
                <Bot size={18} className="text-[#FFD700]" />
              </div>
              <div className="flex-1">
                <div className="font-['Outfit'] font-semibold text-sm">Assistente IA Premium</div>
                <div className="text-[10px] opacity-70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full" /> online
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Fechar" data-testid="ai-chat-close">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 bg-gradient-to-b from-black to-neutral-950 space-y-2">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "ia" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-[13px] leading-snug whitespace-pre-line ${
                      m.from === "ia"
                        ? "bg-[#FFD700]/10 border border-[#FFD700]/20 text-white rounded-tl-sm"
                        : "bg-[#25D366]/15 border border-[#25D366]/30 text-white rounded-tr-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-[#FFD700]/10 border border-[#FFD700]/20 px-3 py-2 rounded-lg rounded-tl-sm flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#FFD700]"
                        style={{ animation: `typing-dot 1.2s ease-in-out ${i * 0.18}s infinite` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA + input */}
            <div className="border-t border-[#FFD700]/15 p-2 bg-black">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#FFD700]/50"
                  data-testid="ai-chat-input"
                />
                <button
                  onClick={handleSend}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black flex items-center justify-center hover:scale-105 transition-transform"
                  aria-label="Enviar"
                  data-testid="ai-chat-send"
                >
                  <Send size={16} />
                </button>
              </div>
              <a
                href={WHATSAPP_LINK("Olá! Vim do chat IA do site.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-center text-[11px] text-[#25D366] hover:underline"
                data-testid="ai-chat-whatsapp-link"
              >
                Falar com humano no WhatsApp →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD700] to-[#B8860B] flex items-center justify-center shadow-[0_8px_30px_rgba(255,215,0,0.45)] animate-glow-pulse"
        aria-label="Chat IA"
        data-testid="floating-ai-chat-btn"
      >
        <Sparkles size={12} className="absolute top-2 right-2 text-black/70" />
        <Bot size={28} className="text-black" strokeWidth={1.8} />
      </motion.button>
    </div>
  );
};

export default FloatingAIChat;
