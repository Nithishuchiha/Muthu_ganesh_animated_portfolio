import { useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { getProjectById, projects } from "../data/projects";
import Navbar from "../components/Navbar";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(id);
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!project) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-detail-enter]",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    });
    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="bg-[#050508] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-white/30 mb-6">Project not found.</p>
          <Link to="/" className="font-mono text-sm text-[#00ffc8]">← Back home</Link>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.id === id);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  return (
    <div className="bg-[#050508] min-h-screen">
      <Navbar />

      {/* Hero */}
      <div ref={heroRef} className="relative pt-16 overflow-hidden">
        {/* Video / image backdrop */}
        <div className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
          <video
            ref={videoRef}
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <img
            src={project.thumbnail}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          {/* Color wash */}
          <div
            className="absolute inset-0 opacity-10"
            style={{ background: `radial-gradient(ellipse at 30% 50%, ${project.color}, transparent 70%)` }}
          />
          {/* Bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/60" />

          {/* Title overlay */}
          <div className="absolute inset-0 flex items-end px-6 lg:px-12 pb-16 max-w-7xl mx-auto">
            <div>
              <motion.div
                data-detail-enter
                initial={{ opacity: 0, y: 30 }}
                className="flex items-center gap-3 mb-4"
              >
                <span
                  className="font-mono text-[10px] tracking-[0.3em] uppercase px-2.5 py-1 rounded-sm"
                  style={{
                    backgroundColor: project.color + "22",
                    color: project.color,
                    border: `1px solid ${project.color}44`,
                  }}
                >
                  {project.category}
                </span>
                <span className="font-mono text-[10px] text-white/30">{project.year}</span>
              </motion.div>
              <h1
                data-detail-enter
                className="font-display text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-white"
              >
                {project.title}
              </h1>
              <p data-detail-enter className="mt-3 font-mono text-sm text-white/40 tracking-wide">
                {project.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Long description */}
          <div className="lg:col-span-2 space-y-8" data-detail-enter>
            <div className="h-px bg-white/10" />
            <p className="text-[#99aabb] text-lg leading-relaxed">{project.longDescription}</p>
          </div>

          {/* Sidebar */}
          <div className="space-y-8" data-detail-enter>
            {/* Tech stack */}
            <div>
              <h4 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-3 py-1.5 rounded-sm bg-white/5 text-white/50 border border-white/[0.08]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">Links</h4>
              <div className="space-y-2">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between font-mono text-xs text-white/50 hover:text-white transition-colors duration-200 group"
                  >
                    GitHub Repository
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between font-mono text-xs text-[#00ffc8]/70 hover:text-[#00ffc8] transition-colors duration-200 group"
                  >
                    Live Demo
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </a>
                )}
                {project.links.docs && (
                  <a
                    href={project.links.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between font-mono text-xs text-white/50 hover:text-white transition-colors duration-200 group"
                  >
                    Documentation
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Prev / Next */}
        <div className="mt-24 border-t border-white/[0.06] pt-12 grid grid-cols-2 gap-8">
          {prevProject ? (
            <Link to={`/project/${prevProject.id}`} className="group">
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/20 block mb-2">← Previous</span>
              <span className="font-display text-xl text-white group-hover:text-[#00ffc8] transition-colors duration-300">
                {prevProject.title}
              </span>
            </Link>
          ) : <div />}
          {nextProject ? (
            <Link to={`/project/${nextProject.id}`} className="group text-right">
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/20 block mb-2">Next →</span>
              <span className="font-display text-xl text-white group-hover:text-[#00ffc8] transition-colors duration-300">
                {nextProject.title}
              </span>
            </Link>
          ) : <div />}
        </div>

        {/* Back */}
        <div className="mt-16 text-center">
          <Link
            to="/"
            className="font-mono text-xs tracking-widest uppercase text-white/30 hover:text-white transition-colors duration-300"
          >
            ← All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}