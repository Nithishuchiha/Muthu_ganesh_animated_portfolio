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

export default function Projects() {
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
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 sm:py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto"
    >
      {/* Section header */}
      <div ref={headingRef} className="mb-8 sm:mb-12 flex items-end justify-between gap-6">
        <div>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-[#00ffc8]/60 flex items-center gap-2 mb-3 sm:mb-4">
            <span className="w-5 sm:w-6 h-px bg-[#00ffc8]/60" />
            Selected Work
          </span>
          <h2 className="font-display text-[clamp(2.25rem,8vw,5.5rem)] leading-none tracking-tight text-white">
            Projects
          </h2>
        </div>
        <p className="hidden md:block font-mono text-sm text-white/30 max-w-xs text-right leading-relaxed">
          Embedded systems, PCB design, and IoT engineering — 2025.
        </p>
      </div>

      {/* ── Category filter bar ── */}
      <div className="mb-8 sm:mb-10 flex items-center gap-3">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {categories.map((cat) => {
            const active = cat === activeCategory;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="flex-shrink-0 font-mono text-[9px] sm:text-[10px] tracking-[0.22em] uppercase px-3 sm:px-3.5 py-1.5 rounded-sm border transition-all duration-200"
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
        <span className="ml-auto whitespace-nowrap font-mono text-[10px] text-white/20 tracking-widest">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              {featured.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          )}

          {/* ── Rest — 3-col grid ── */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
      <div className="mt-12 sm:mt-16 flex items-center gap-4 justify-center">
        <span className="w-10 sm:w-16 h-px bg-white/10" />
        <span className="font-mono text-[10px] sm:text-xs text-white/20 tracking-widest">
          {filtered.length} PROJECTS
        </span>
        <span className="w-10 sm:w-16 h-px bg-white/10" />
      </div>
    </section>
  );
}
