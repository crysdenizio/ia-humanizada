import React from "react";

/**
 * Animated subtle circuit board lines in the background.
 * Renders SVG paths with a slowly flowing gold gradient stroke.
 */
export const CircuitBackground = ({ className = "" }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.18]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8860B" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFD700" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#B8860B" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Horizontal circuit lines */}
        <path d="M 0 120 L 280 120 L 320 160 L 600 160 L 640 120 L 1200 120" stroke="url(#goldGrad)" strokeWidth="1" fill="none" strokeDasharray="6 6" className="animate-circuit-flow" />
        <path d="M 0 300 L 200 300 L 240 260 L 480 260 L 520 300 L 800 300 L 840 340 L 1200 340" stroke="url(#goldGrad)" strokeWidth="1" fill="none" strokeDasharray="4 8" className="animate-circuit-flow" style={{ animationDelay: '-2s' }} />
        <path d="M 0 520 L 360 520 L 400 480 L 720 480 L 760 520 L 1200 520" stroke="url(#goldGrad)" strokeWidth="1" fill="none" strokeDasharray="6 6" className="animate-circuit-flow" style={{ animationDelay: '-4s' }} />
        <path d="M 0 700 L 240 700 L 280 660 L 560 660 L 600 700 L 1200 700" stroke="url(#goldGrad)" strokeWidth="1" fill="none" strokeDasharray="4 8" className="animate-circuit-flow" style={{ animationDelay: '-1s' }} />

        {/* Vertical accents */}
        <path d="M 320 0 L 320 160" stroke="url(#goldGrad)" strokeWidth="1" fill="none" />
        <path d="M 880 340 L 880 800" stroke="url(#goldGrad)" strokeWidth="1" fill="none" />

        {/* Circuit nodes */}
        {[
          [280, 120], [320, 160], [600, 160], [640, 120],
          [240, 260], [480, 260], [800, 300], [840, 340],
          [360, 520], [400, 480], [720, 480], [760, 520],
          [280, 660], [560, 660]
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="14" fill="url(#goldGlow)" />
            <circle cx={cx} cy={cy} r="2.5" fill="#FFD700" />
          </g>
        ))}
      </svg>

      {/* Soft gold radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] rounded-full bg-[#FFD700] opacity-[0.05] blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-[#B8860B] opacity-[0.07] blur-[120px]" />
    </div>
  );
};

export default CircuitBackground;
