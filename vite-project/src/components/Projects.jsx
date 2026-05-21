import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

// ─── Filter categories ───────────────────────────────────────────────────────
const ALL = "All";
const categories = [ALL, ...Array.from(new Set(projects.map((p) => p.category)))];

// ─── Mobile Projects ─────────────────────────────────────────────────────────
function MobileProjects() {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const filterRef = useRef(null);

  const filtered =
    activeCategory === ALL ? projects : projects.filter((p) => p.category === activeCategory);

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 px-4">
      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#00ffc8]/60 flex items-center gap-2 mb-3">
          <span className="w-5 h-px bg-[#00ffc8]/60" />
          Selected Work
        </span>
        <div className="flex items-end justify-between">
          <h2 className="font-display text-[clamp(2rem,10vw,3.5rem)] leading-none tracking-tight text-white">
            Projects
          </h2>
          <span className="font-mono text-[10px] text-white/20 tracking-widest">
            {projects.length} TOTAL
          </span>
        </div>
      </motion.div>

      {/* ── Category filter pills (horizontal scroll) ── */}
      <div
        ref={filterRef}
        className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-6 -mx-4 px-4"
      >
        {categories.map((cat) => {
          const active = cat === activeCategory;
          return (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileTap={{ scale: 0.93 }}
              className="flex-shrink-0 font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm border transition-all duration-200"
              style={{
                backgroundColor: active ? "#00ffc822" : "transparent",
                color: active ? "#00ffc8" : "rgba(255,255,255,0.3)",
                borderColor: active ? "#00ffc844" : "rgba(255,255,255,0.08)",
              }}
            >
              {cat}
            </motion.button>
          );
        })}
      </div>

      {/* ── Featured cards (full-width stack) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {featured.length > 0 && (
            <div className="flex flex-col gap-4 mb-4">
              {featured.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          )}

          {/* ── Rest — 2-col grid on larger phones, 1-col on small ── */}
          {rest.length > 0 && (
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))" }}
            >
              {rest.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={featured.length + i} />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-mono text-xs text-white/20 tracking-widest">No projects in this category</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Count footer ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 flex items-center gap-3 justify-center"
      >
        <span className="w-10 h-px bg-white/10" />
        <span className="font-mono text-[10px] text-white/20 tracking-widest">
          {filtered.length} PROJECTS
        </span>
        <span className="w-10 h-px bg-white/10" />
      </motion.div>
    </section>
  );
}

// ─── Desktop Projects (original GSAP + grid) ─────────────────────────────────
function DesktopProjects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(ALL);

  const filtered =
    activeCategory === ALL ? projects : projects.filter((p) => p.category === activeCategory);
  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards stagger
      const cards = sectionRef.current.querySelectorAll("[data-gsap-card]");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: (i % 3) * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section ref={sectionRef} id="projects" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section header */}
      <div ref={headingRef} className="mb-12 flex items-end justify-between">
        <div>
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#00ffc8]/60 flex items-center gap-2 mb-4">
            <span className="w-6 h-px bg-[#00ffc8]/60" />
            Selected Work
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-none tracking-tight text-white">
            Projects
          </h2>
        </div>
        <p className="hidden md:block font-mono text-sm text-white/30 max-w-xs text-right leading-relaxed">
          Embedded systems, PCB design, and IoT engineering — 2025.
        </p>
      </div>

      {/* ── Category filter bar ── */}
      <div className="mb-10 flex items-center gap-3 flex-wrap">
        {categories.map((cat) => {
          const active = cat === activeCategory;
          return (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="font-mono text-[10px] tracking-[0.22em] uppercase px-3.5 py-1.5 rounded-sm border transition-all duration-200"
              style={{
                backgroundColor: active ? "#00ffc822" : "transparent",
                color: active ? "#00ffc8" : "rgba(255,255,255,0.3)",
                borderColor: active ? "#00ffc844" : "rgba(255,255,255,0.08)",
              }}
            >
              {cat}
            </motion.button>
          );
        })}
        <span className="ml-auto font-mono text-[10px] text-white/20 tracking-widest">
          {filtered.length} / {projects.length}
        </span>
      </div>

      {/* ── Featured — 2-col wide ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {featured.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {featured.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          )}

          {/* ── Rest — 3-col grid ── */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={featured.length + i} />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="py-32 text-center">
              <p className="font-mono text-xs text-white/20 tracking-widest">No projects in this category</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Count */}
      <div className="mt-16 flex items-center gap-4 justify-center">
        <span className="w-16 h-px bg-white/10" />
        <span className="font-mono text-xs text-white/20 tracking-widest">
          {projects.length} PROJECTS
        </span>
        <span className="w-16 h-px bg-white/10" />
      </div>
    </section>
  );
}

// ─── Unified responsive export ───────────────────────────────────────────────
export default function Projects() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsMobile(window.matchMedia("(pointer: coarse), (max-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile ? <MobileProjects /> : <DesktopProjects />;
}