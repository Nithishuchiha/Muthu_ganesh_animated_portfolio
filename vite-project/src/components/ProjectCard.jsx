import { useRef, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import gsap from "gsap";

// ─── Hook: detect mobile (touch-first devices) ──────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsMobile(window.matchMedia("(pointer: coarse), (max-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ─── Mobile Card ─────────────────────────────────────────────────────────────
function MobileProjectCard({ project, index }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Auto-play video when card scrolls into viewport (IntersectionObserver)
  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setPlaying(true);
        } else {
          videoRef.current?.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleTap = () => {
    setTapped(true);
    // Glint on tap
    gsap.fromTo(
      cardRef.current?.querySelector(".glint"),
      { x: "-120%", opacity: 1 },
      { x: "220%", duration: 0.55, ease: "power2.inOut" }
    );
    setTimeout(() => navigate(`/project/${project.id}`), 180);
  };

  return (
    <motion.article
      ref={cardRef}
      onClick={handleTap}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.07 }}
      whileTap={{ scale: 0.977 }}
      style={{ "--accent": project.color }}
      className="relative cursor-pointer overflow-hidden rounded-xl bg-[#0d0d14] border border-white/[0.06]"
    >
      {/* Glint sweep */}
      <div className="glint absolute inset-0 z-30 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />

      {/* Accent glow on tap */}
      <AnimatePresence>
        {tapped && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-xl pointer-events-none z-20"
            style={{ boxShadow: `inset 0 0 0 1.5px ${project.color}66` }}
          />
        )}
      </AnimatePresence>

      {/* ── Thumbnail + Video ── */}
      <div className="relative overflow-hidden bg-[#0a0a10]" style={{ height: "clamp(160px, 45vw, 220px)" }}>
        <img
          src={project.thumbnail}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          style={{ transition: "opacity 0.6s ease", opacity: playing && videoReady ? 0 : 0.7 }}
          loading="lazy"
        />
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover",
            opacity: playing && videoReady ? 0.85 : 0,
            transition: "opacity 0.6s ease",
          }}
        />

        {/* Color tint */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-color"
          style={{ backgroundColor: project.color }}
        />

        {/* Bottom fade for text legibility */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d0d14] to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="font-mono text-[9px] tracking-[0.22em] uppercase px-2 py-1 rounded-sm"
            style={{
              backgroundColor: project.color + "22",
              color: project.color,
              border: `1px solid ${project.color}44`,
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Year */}
        <div className="absolute top-3 right-3 z-10">
          <span className="font-mono text-[9px] text-white/30">{project.year}</span>
        </div>

        {/* Live indicator when video plays */}
        {playing && videoReady && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: project.color }} />
            <span className="font-mono text-[8px] text-white/40 tracking-widest uppercase">Live</span>
          </motion.div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="p-4">
        <h3
          className="font-display text-lg text-white tracking-tight leading-tight"
          style={{ transition: "color 0.3s", color: tapped ? project.color : "white" }}
        >
          {project.title}
        </h3>
        <p className="mt-0.5 font-mono text-[10px] text-white/40 tracking-wide">{project.tagline}</p>
        <p className="mt-3 text-sm text-[#667788] leading-relaxed line-clamp-2">{project.description}</p>

        {/* Tech stack — scrollable row on mobile */}
        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[9px] text-white/30 tracking-widest uppercase whitespace-nowrap flex-shrink-0"
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-4 flex items-center justify-between">
          <span
            className="font-mono text-[11px] tracking-widest uppercase flex items-center gap-1.5"
            style={{ color: project.color }}
          >
            View Project
            <motion.span animate={{ x: tapped ? 4 : 0 }} transition={{ duration: 0.2 }}>
              →
            </motion.span>
          </span>
          {project.featured && (
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/20 bg-white/5 px-2 py-0.5 rounded-sm">
              Featured
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Desktop Card (original 3D tilt + hover video) ──────────────────────────
function DesktopProjectCard({ project, index }) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [videoReady, setVideoReady] = useState(false);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const springRX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback(
    (e) => {
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [x, y]
  );

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    gsap.fromTo(
      ref.current.querySelector(".glint"),
      { x: "-120%", opacity: 1 },
      { x: "220%", duration: 0.65, ease: "power2.inOut" }
    );
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
    if (videoRef.current) videoRef.current.pause();
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/project/${project.id}`)}
      data-gsap-card
      style={{
        "--accent": project.color,
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 1000,
      }}
      className="group relative cursor-pointer overflow-hidden rounded-sm bg-[#0d0d14] border border-white/[0.06] transition-shadow duration-500 hover:shadow-[0_0_60px_-12px_var(--accent)]"
    >
      {/* Glint sweep */}
      <div className="glint absolute inset-0 z-30 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />

      {/* Accent border glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 rounded-sm pointer-events-none z-20"
        style={{ boxShadow: `inset 0 0 0 1px ${project.color}55` }}
      />

      {/* Thumbnail + Video */}
      <div className="relative h-52 overflow-hidden bg-[#0a0a10]">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-0 transition-opacity duration-500"
          loading="lazy"
        />
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            hovered && videoReady ? "opacity-80" : "opacity-0"
          }`}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-color"
          style={{ backgroundColor: project.color }}
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className="font-mono text-[10px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-sm"
            style={{
              backgroundColor: project.color + "22",
              color: project.color,
              border: `1px solid ${project.color}44`,
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Year */}
        <div className="absolute top-4 right-4 z-10">
          <span className="font-mono text-[10px] text-white/30">{project.year}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-2xl text-white tracking-tight group-hover:text-[var(--accent)] transition-colors duration-300">
          {project.title}
        </h3>
        <p className="mt-1 font-mono text-xs text-white/40 tracking-wide">{project.tagline}</p>
        <p className="mt-4 text-sm text-[#667788] leading-relaxed line-clamp-2">{project.description}</p>

        {/* Tech stack */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
              {t}
            </span>
          ))}
        </div>

        {/* Arrow CTA */}
        <div className="mt-6 flex items-center justify-between">
          <motion.span
            animate={{ x: hovered ? 4 : 0 }}
            className="font-mono text-xs tracking-widest uppercase text-[var(--accent)] flex items-center gap-2"
          >
            View Project <span>→</span>
          </motion.span>
          {project.featured && (
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/20 bg-white/5 px-2 py-0.5 rounded-sm">
              Featured
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Unified Export ──────────────────────────────────────────────────────────
export default function ProjectCard({ project, index }) {
  const isMobile = useIsMobile();
  return isMobile ? (
    <MobileProjectCard project={project} index={index} />
  ) : (
    <DesktopProjectCard project={project} index={index} />
  );
}