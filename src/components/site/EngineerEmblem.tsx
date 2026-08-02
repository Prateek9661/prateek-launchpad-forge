import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { CheckCircle2, GitCommit, Zap } from "lucide-react";

const LINES = [
  "$ git commit -m 'ship it'",
  "> compiling modules…",
  "> tests: 24 passed",
  "> deploy: success ✔",
];

const LAYERS = [
  { z: 0, label: "ui", w: "88%", tint: "from-primary/20" },
  { z: 42, label: "logic", w: "78%", tint: "from-secondary/20" },
  { z: 84, label: "data", w: "68%", tint: "from-primary/12" },
];

function useTypedLoop() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  useEffect(() => {
    const line = LINES[i % LINES.length] ?? "";
    if (n < line.length) {
      const t = setTimeout(() => setN((v) => v + 1), 45);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setN(0);
      setI((v) => v + 1);
    }, 1300);
    return () => clearTimeout(t);
  }, [i, n]);
  return (LINES[i % LINES.length] ?? "").slice(0, n);
}

export function EngineerEmblem() {
  const wrap = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 120, damping: 16 });
  const typed = useTypedLoop();

  const rain = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: `${(i * 7.4 + 3) % 97}%`,
        delay: (i % 7) * 0.6,
        dur: 4 + (i % 5),
        text: Array.from({ length: 12 }, () => (Math.random() > 0.5 ? "1" : "0")).join(" "),
      })),
    [],
  );

  return (
    <div
      ref={wrap}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="scene-3d absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* binary rain */}
      <div className="absolute inset-0 opacity-[0.16]">
        {rain.map((r, i) => (
          <motion.span
            key={i}
            initial={{ y: "-40%" }}
            animate={{ y: "130%" }}
            transition={{ duration: r.dur, delay: r.delay, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 font-mono text-[9px] leading-3 text-primary"
            style={{ left: r.left, writingMode: "vertical-rl" }}
          >
            {r.text}
          </motion.span>
        ))}
      </div>

      <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

      {/* tilting 3D stack */}
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="relative h-[190px] w-[230px]"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(56deg) rotateZ(-42deg)" }}
        >
          {LAYERS.map((l, i) => (
            <motion.div
              key={l.label}
              initial={{ opacity: 0, z: l.z - 40 }}
              animate={{ opacity: 1, z: [l.z, l.z + 12, l.z] }}
              transition={{
                opacity: { duration: 0.6, delay: i * 0.15 },
                z: { duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
              }}
              className={`absolute left-1/2 top-1/2 aspect-square w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-primary/35 bg-linear-to-br ${l.tint} to-transparent backdrop-blur-[2px]`}
              style={{ transformStyle: "preserve-3d", boxShadow: "0 0 40px -12px var(--glow-cyan)" }}
            >
              {/* grid on layer */}
              <div className="absolute inset-0 rounded-2xl opacity-40 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:22px_22px]" />
              <span className="absolute -top-4 left-2 font-mono text-[9px] tracking-widest text-primary/80">
                {l.label}
              </span>
              {/* travelling packet */}
              <motion.span
                animate={{ x: ["6%", "82%"], y: ["78%", "12%"] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
                className="absolute h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_currentColor]"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* live terminal strip */}
      <div className="absolute inset-x-3 bottom-16 rounded-lg border border-border/70 bg-background/80 px-3 py-2 backdrop-blur-md">
        <p className="truncate font-mono text-[10px] text-primary">
          {typed}
          <span className="caret">▌</span>
        </p>
      </div>

      {/* status chips */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-3 top-4 flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-2.5 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur-md"
      >
        <CheckCircle2 className="h-3 w-3 text-primary" /> build passing
      </motion.div>
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-3 top-14 flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-2.5 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur-md"
      >
        <GitCommit className="h-3 w-3 text-secondary" /> main
      </motion.div>
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 right-4 flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-2.5 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur-md"
      >
        <Zap className="h-3 w-3 text-primary" /> 60 fps
      </motion.div>

      {/* signature monogram */}
      <span className="absolute bottom-3 left-4 font-display text-sm font-semibold tracking-[0.4em] text-gradient">
        PKS
      </span>
    </div>
  );
}
