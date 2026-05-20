import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/[0.06] py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
        <div>
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#00ffc8]/60 flex items-center gap-2 mb-4">
            <span className="w-6 h-px bg-[#00ffc8]/60" />
            Contact
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-none tracking-tight text-white">
            Let's build<br />
            <span className="text-[#00ffc8]">something</span><br />
            remarkable.
          </h2>
          <a
            href="mailto:hello@yourname.dev"
            className="mt-8 inline-flex items-center gap-3 font-mono text-sm text-white/50 hover:text-white transition-colors duration-300 group"
          >
            hello@yourname.dev
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </a>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-6">
          <div className="flex gap-6">
            {[
              { label: "GitHub", href: "https://github.com/MuthuGanesh-dev/" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/muthu-ganesh-405a35320/" },
              { label: "Twitter", href: "https://twitter.com" },
              { label: "Résumé", href: "/resume.pdf" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs tracking-widest uppercase text-white/30 hover:text-white transition-colors duration-300"
              >
                {label}
              </a>
            ))}
          </div>
          <p className="font-mono text-[10px] text-white/15 tracking-widest">
            © {new Date().getFullYear()} — Built with React + Three.js + GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}