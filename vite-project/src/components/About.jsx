import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { label: "Hardware", items: ["Circuit Design", "PCB Layout", "PCB Repair", "Prototyping", "IoT Hardware"] },
  { label: "Embedded", items: ["PIC MCUs", "Firmware Development", "UART Debugging", "Peripherals", "Optimization"] },
  { label: "Tools", items: ["Eagle", "MPLAB X IDE", "Debugging", "Datasheets", "Bring-up"] },
  { label: "IoT", items: ["A7672C GSM", "AT Commands", "Connectivity", "Telemetry", "Python Automation"] },
];

export default function About() {
  const lineRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: lineRef.current, start: "top 80%" },
        }
      );

      gsap.utils.toArray("[data-skill-col]").forEach((col, i) => {
        gsap.fromTo(
          col,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: col, start: "top 88%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <div ref={lineRef} className="h-px bg-white/10 mb-24 origin-left" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Bio */}
        <div>
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#00ffc8]/60 flex items-center gap-2 mb-4">
            <span className="w-6 h-px bg-[#00ffc8]/60" />
            About
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight tracking-tight text-white mb-8">
            Engineer by discipline,<br />
            <span className="text-stroke-sm">designer by obsession.</span>
          </h2>
          <div className="space-y-4 text-[#667788] text-sm leading-relaxed max-w-lg">
            <p>
              I'm an electronics enthusiast and embedded systems engineer who enjoys turning ideas into working hardware.
              I focus on circuit design, microcontroller firmware, and IoT development—building functional prototypes that hold up in the real world.
            </p>
            <p>
              Hardware Innovation — Designing custom circuits and PCBs for purpose-built solutions, from quick revisions to production-ready layouts.
            </p>
            <p>
              Embedded Programming & Problem Solving — Writing efficient firmware for microcontrollers and embedded systems, and debugging tough issues with a practical, creative engineering approach.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { num: "1+", label: "Years building" },
              { num: "5+", label: "Projects shipped" },
              { num: "∞", label: "Curiosity" },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="font-display text-3xl text-white">{num}</div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-white/30 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-2 gap-6">
          {SKILLS.map((group) => (
            <div key={group.label} data-skill-col>
              <h4 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#00ffc8]/60 mb-4">
                {group.label}
              </h4>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors duration-200">
                    <span className="w-1 h-1 rounded-full bg-[#00ffc8]/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}