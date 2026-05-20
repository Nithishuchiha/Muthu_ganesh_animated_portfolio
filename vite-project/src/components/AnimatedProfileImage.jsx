import { useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * AnimatedProfileImage
 * - Cinematic entrance: mask reveal + blur-to-sharp + depth scale.
 * - Hover: smooth tilt + magnetic drift for “camera follow” energy.
 * - Scroll: subtle parallax drift to add depth in the scene.
 *
 * Performance notes:
 * - All continuous motion is transform-based (GPU-friendly).
 * - Filters run only during entrance to avoid steady-state cost.
 */
export default function AnimatedProfileImage({
  src,
  alternateSrc,
  alt = "Profile photo",
  className = "",
  sizeClassName = "w-64 sm:w-72 lg:w-96",
  tilt = 10,
  magnetic = 14,
  parallax = 26,
}) {
  const rootRef = useRef(null);
  const [isHover, setIsHover] = useState(false);

  // Normalized cursor position inside the container: [-1..1]
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);

  // Apple-like response: quick, smooth, and slightly “weighted”.
  const spring = useMemo(
    () => ({ stiffness: 260, damping: 26, mass: 0.7 }),
    []
  );

  const rotateY = useSpring(useTransform(nx, [-1, 1], [-tilt, tilt]), spring);
  const rotateX = useSpring(useTransform(ny, [-1, 1], [tilt, -tilt]), spring);
  const driftX = useSpring(useTransform(nx, [-1, 1], [-magnetic, magnetic]), spring);
  const driftY = useSpring(useTransform(ny, [-1, 1], [-magnetic, magnetic]), spring);
  const hoverScale = useSpring(isHover ? 1.04 : 1, { stiffness: 220, damping: 22 });

  // Parallax based on element position in viewport.
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);
  const composedY = useTransform([driftY, parallaxY], ([dy, py]) => dy + py);

  const onPointerMove = (event) => {
    const el = rootRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    // Map to [-1..1] and clamp.
    const cx = Math.max(-1, Math.min(1, (x - 0.5) * 2));
    const cy = Math.max(-1, Math.min(1, (y - 0.5) * 2));

    nx.set(cx);
    ny.set(cy);
  };

  const onPointerLeave = () => {
    setIsHover(false);
    nx.set(0);
    ny.set(0);
  };

  return (
    <motion.div
      ref={rootRef}
      onPointerEnter={() => setIsHover(true)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onFocus={() => setIsHover(true)}
      onBlur={() => setIsHover(false)}
      tabIndex={0}
      // Cinematic entrance: slow mask reveal + depth.
      initial={{
        opacity: 0,
        y: 18,
        scale: 0.92,
        filter: "blur(10px)",
        clipPath: "inset(16% 16% 16% 16% round 9999px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        clipPath: "inset(0% 0% 0% 0% round 9999px)",
      }}
      transition={{
        opacity: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
        filter: { duration: 0.9, ease: "easeOut" },
        clipPath: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
      }}
      style={{
        // Camera feel: perspective + hover tilt + magnetic drift + scroll parallax.
        perspective: 900,
        rotateX,
        rotateY,
        x: driftX,
        y: composedY,
        scale: hoverScale,
        willChange: "transform",
      }}
      className={`relative aspect-square ${sizeClassName} ${className}`}
    >
      {/*
        Inner stack = what “breathes”.
        Keeping idle drift separate from hover/scroll transforms helps layering stay stable.
      */}
      <motion.div
        animate={{ y: [0, -8, 0], rotateZ: [0, 0.35, 0] }}
        transition={{ repeat: Infinity, duration: 6.2, ease: "easeInOut" }}
        className="relative h-full w-full"
        style={{ willChange: "transform" }}
      >
        {/* Depth shadow / ambient glow (behind everything) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 -z-10 rounded-full blur-2xl opacity-40 bg-accent/10"
        />

        {/* Rotating accent ring (premium framing) */}
        <motion.div
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="absolute -inset-4 rounded-full"
          style={{
            background:
              "conic-gradient(from 180deg, transparent, var(--accent), transparent)",
            filter: "blur(0.5px)",
            opacity: 0.75,
            willChange: "transform",
          }}
        />

        {/* Soft inner frame (subtle glass) */}
        <div
          aria-hidden="true"
          className="absolute -inset-1 rounded-full bg-bg/60 backdrop-blur-sm ring-1 ring-white/10"
        />

        {/* Image container */}
        <div className="relative z-10 h-full w-full overflow-hidden rounded-full border border-white/10 transform-gpu">
          {/* Primary image */}
          <motion.img
            src={src}
            alt={alt}
            loading="eager"
            draggable={false}
            className="absolute inset-0 h-full w-full select-none object-cover"
            // Micro-zoom on hover for “lens breathing”.
            animate={{ scale: isHover ? 1.06 : 1.0, opacity: alternateSrc && isHover ? 0 : 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
          />

          {/* Alternate image (optional) — crossfades in on hover/focus */}
          {alternateSrc ? (
            <motion.img
              src={alternateSrc}
              alt={alt}
              loading="eager"
              draggable={false}
              className="absolute inset-0 h-full w-full select-none object-cover"
              animate={{ scale: isHover ? 1.06 : 1.0, opacity: isHover ? 1 : 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: "transform, opacity" }}
            />
          ) : null}

          {/* Layout spacer for absolutely positioned images */}
          <div aria-hidden="true" className="h-full w-full" />
        </div>

        {/* Subtle shimmer / highlight (slow, non-distracting) */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.12, 0.22, 0.12] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/15"
        />
      </motion.div>
    </motion.div>
  );
}
