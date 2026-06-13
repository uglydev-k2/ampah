"use client";

import { motion } from "framer-motion";

const orbs = [
  { color: "bg-blue-400/20 dark:bg-blue-500/10", size: "h-72 w-72", x: "10%", y: "15%", duration: 22, delay: 0 },
  { color: "bg-emerald-400/20 dark:bg-emerald-500/10", size: "h-96 w-96", x: "70%", y: "10%", duration: 26, delay: 2 },
  { color: "bg-cyan-300/15 dark:bg-cyan-400/10", size: "h-64 w-64", x: "55%", y: "60%", duration: 20, delay: 4 },
  { color: "bg-blue-300/15 dark:bg-blue-400/10", size: "h-80 w-80", x: "5%", y: "70%", duration: 24, delay: 1 },
];

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${8 + ((i * 17) % 84)}%`,
  top: `${6 + ((i * 23) % 88)}%`,
  size: i % 3 === 0 ? 6 : 4,
  duration: 14 + (i % 5) * 3,
  delay: i * 0.4,
}));

export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden motion-reduce:hidden"
    >
      {/* Base gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-emerald-50/60 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />

      {/* Animated mesh gradient */}
      <div className="animate-mesh-shift absolute inset-0 opacity-60 dark:opacity-40">
        <div className="absolute -left-1/4 top-0 h-full w-1/2 bg-gradient-to-r from-blue-200/30 to-transparent blur-3xl dark:from-blue-900/20" />
        <div className="absolute -right-1/4 top-1/4 h-2/3 w-1/2 bg-gradient-to-l from-emerald-200/30 to-transparent blur-3xl dark:from-emerald-900/20" />
      </div>

      {/* Moving grid */}
      <div className="animate-grid-drift absolute inset-0 opacity-[0.35] dark:opacity-[0.12]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pharmacy-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-blue-300/40 dark:text-blue-700/30"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pharmacy-grid)" />
        </svg>
      </div>

      {/* Floating orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${orb.color} ${orb.size}`}
          style={{ left: orb.x, top: orb.y }}
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 20, -10, 0],
            scale: [1, 1.08, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {/* Soft floating particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-blue-400/30 dark:bg-blue-500/20"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -18, 0, 12, 0],
            opacity: [0.2, 0.6, 0.3, 0.5, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Top shimmer line */}
      <div className="animate-shimmer absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent dark:via-emerald-400/30" />

      {/* Vignette for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40 dark:from-gray-950/30 dark:to-gray-950/60" />
    </div>
  );
}
