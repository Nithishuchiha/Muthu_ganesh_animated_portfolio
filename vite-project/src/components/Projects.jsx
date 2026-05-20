import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

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
  }, []);

  // Split into featured (top 2) and rest
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section ref={sectionRef} id="projects" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section header */}
      <div ref={headingRef} className="mb-20 flex items-end justify-between">
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
          A cross-section of engineering, design, and research spanning 2022–2024.
        </p>
      </div>

      {/* Featured — 2-col wide */}
      {featured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      )}

      {/* Rest — 3-col grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={featured.length + i} />
        ))}
      </div>

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