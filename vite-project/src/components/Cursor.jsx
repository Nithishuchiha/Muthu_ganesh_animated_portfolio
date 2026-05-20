import { useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringSpring = useMemo(() => ({ stiffness: 220, damping: 24, mass: 0.6 }), []);
  const dotSpring = useMemo(() => ({ stiffness: 520, damping: 34, mass: 0.35 }), []);

  const ringX = useSpring(x, ringSpring);
  const ringY = useSpring(y, ringSpring);
  const dotX = useSpring(x, dotSpring);
  const dotY = useSpring(y, dotSpring);

  useEffect(() => {
    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="cursor-ring fixed top-0 left-0 z-[9999] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 pointer-events-none"
        style={{ x: ringX, y: ringY, willChange: "transform" }}
      />

      {/* Inner dot */}
      <motion.div
        className="cursor-dot fixed top-0 left-0 z-[10000] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent pointer-events-none"
        style={{ x: dotX, y: dotY, willChange: "transform" }}
      />
    </>
  );
}