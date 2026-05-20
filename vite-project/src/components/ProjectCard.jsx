import { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";

export default function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [videoReady, setVideoReady] = useState(false);
  const [hovered, setHovered] = useState(false);

  // 3D tilt via Framer Motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const springRX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    // Glint sweep
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
      style={{ rotateX: springRX, rotateY: springRY, transformPerspective: 1000 }}
      data-gsap-card
      className="group relative cursor-pointer overflow-hidden rounded-sm bg-[#0d0d14] border border-white/[0.06] transition-shadow duration-500 hover:shadow-[0_0_60px_-12px_var(--accent)]"
      style={{
        "--accent": project.color,
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 1000,
      }}
    >
      {/* Glint sweep overlay */}
      <div className="glint absolute inset-0 z-30 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />

      {/* Accent border glow on hover */}
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
        {/* Color tint overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-color"
          style={{ backgroundColor: project.color }}
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className="font-mono text-[10px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-sm"
            style={{ backgroundColor: project.color + "22", color: project.color, border: `1px solid ${project.color}44` }}
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