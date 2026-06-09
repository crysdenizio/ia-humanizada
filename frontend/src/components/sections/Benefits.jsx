import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 70, suffix: "%", prefix: "+", label: "mais agendamentos", desc: "média de aumento em clínicas após 60 dias." },
  { value: 24, suffix: "h", prefix: "", label: "atendimento ininterrupto", desc: "todos os dias, inclusive feriados." },
  { value: 8, suffix: "s", prefix: "<", label: "tempo de resposta", desc: "cliente nunca fica esperando." },
  { value: 90, suffix: "%", prefix: "-", label: "perda de leads", desc: "redução em conversas abandonadas." },
];

const Counter = ({ end, prefix = "", suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();
    const raf = (t) => {
      const progress = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(raf);
      else setVal(end);
    };
    requestAnimationFrame(raf);
  }, [inView, end]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{val}{suffix}
    </span>
  );
};

export const Benefits = () => {
  return (
    <section id="beneficios" className="relative py-24 md:py-32 bg-black overflow-hidden" data-testid="benefits-section">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#FFD700] opacity-[0.07] blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="text-xs tracking-[0.25em] uppercase text-[#FFD700] mb-4 font-semibold">Resultados reais</div>
          <h2 className="font-['Outfit'] text-4xl md:text-5xl font-light text-white tracking-tighter leading-[1.05]" data-testid="benefits-title">
            Os números falam por <span className="text-gold-shine font-medium">si mesmos.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative glass-card rounded-2xl p-8 hover-gold-border text-center"
              data-testid={`benefits-stat-${i}`}
            >
              <div className="font-['Outfit'] text-6xl md:text-7xl font-light text-gold-shine leading-none mb-3">
                <Counter end={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="text-white text-sm font-medium uppercase tracking-wider mb-2">{s.label}</div>
              <p className="text-white/50 text-xs leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
