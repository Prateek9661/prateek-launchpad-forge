import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Braces, Cpu, GitBranch, Terminal } from "lucide-react";

const FACES = [
  { label: "PKS", tz: 78, ry: 0 },
  { label: "</>", tz: 78, ry: 90 },
  { label: "{ }", tz: 78, ry: 180 },
  { label: "01", tz: 78, ry: 270 },
];

const CHIPS = [
  { icon: Terminal, label: "C", cls: "left-3 top-8" },
  { icon: Braces, label: "Java", cls: "right-3 top-16" },
  { icon: GitBranch, label: "Git", cls: "left-5 bottom-24" },
  { icon: Cpu, label: "AI", cls: "right-5 bottom-16" },
];

export function EngineerEmblem() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setTilt({
          y: ((e.clientX - r.left) / r.width - 0.5) * 26,
          x: -((e.clientY - r.top) / r.height - 0.5) * 20,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="scene-3d absolute inset-0 flex items-center justify-center overflow-hidden"
      aria-hidden
    >
      {/* glow pool */}
      <div className="absolute h-56 w-56 rounded-full bg-primary/20 blur-3xl" />

      {/* scan line */}
      <div className="scan-line pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-transparent via-primary/12 to-transparent" />

      {/* orbit rings */}
      <div className="orbit-ring absolute h-64 w-64 rounded-full border border-primary/25 [transform:rotateX(72deg)]">
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_currentColor]" />
      </div>
      <div className="orbit-ring-slow absolute h-80 w-80 rounded-full border border-secondary/20 [transform:rotateX(76deg)_rotateZ(18deg)]">
        <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-secondary shadow-[0_0_10px_currentColor]" />
      </div>

      {/* rotating cube */}
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="float-soft relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="cube-3d relative h-[156px] w-[156px]">
          {FACES.map((f) => (
            <div
              key={f.label}
              className="cube-face rounded-xl"
              style={{ transform: `rotateY(${f.ry}deg) translateZ(${f.tz}px)` }}
            >
              <span className="font-display text-4xl font-semibold text-gradient">{f.label}</span>
            </div>
          ))}
          <div
            className="cube-face rounded-xl"
            style={{ transform: `rotateX(90deg) translateZ(78px)` }}
          />
          <div
            className="cube-face rounded-xl"
            style={{ transform: `rotateX(-90deg) translateZ(78px)` }}
          />
        </div>
      </motion.div>

      {/* floating tech chips */}
      {CHIPS.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: 0.3 + i * 0.12, duration: 0.5 },
            y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
          }}
          className={`absolute ${c.cls} flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-2.5 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur-md`}
        >
          <c.icon className="h-3 w-3 text-primary" />
          {c.label}
        </motion.div>
      ))}
    </div>
  );
}
