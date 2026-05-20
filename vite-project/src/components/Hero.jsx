import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import * as THREE from "three";
import AnimatedProfileImage from "./AnimatedProfileImage";

export default function Hero() {
  const canvasRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);

  /* ── Three.js particle field ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 4;

    // Particle geometry
    const count = 2200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#00ffc8"),
      new THREE.Color("#4f9eff"),
      new THREE.Color("#c084fc"),
      new THREE.Color("#ffffff"),
    ];
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({ size: 0.018, vertexColors: true, transparent: true, opacity: 0.75 });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    let raf;
    const clock = new THREE.Clock();

    const onResize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);
    onResize();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      particles.rotation.y = t * 0.04;
      particles.rotation.x = Math.sin(t * 0.02) * 0.12;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  /* ── GSAP text scramble reveal ── */
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";
    const scramble = (el, finalText, delay = 0) => {
      let iteration = 0;
      const maxIter = finalText.length * 3;
      setTimeout(() => {
        const id = setInterval(() => {
          el.textContent = finalText
            .split("")
            .map((char, i) =>
              i < iteration / 3
                ? char
                : char === " "
                ? " "
                : chars[Math.floor(Math.random() * chars.length)]
            )
            .join("");
          if (++iteration > maxIter) { el.textContent = finalText; clearInterval(id); }
        }, 28);
      }, delay);
    };

    if (headlineRef.current) scramble(headlineRef.current, "CRAFTING DIGITAL", 300);
    if (subRef.current) scramble(subRef.current, "EXPERIENCES", 800);
  }, []);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/20 via-transparent to-[#050508]" />

      {/* Left gradient accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00ffc8]/6 blur-[120px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-[#00ffc8]" />
              <span className="font-mono text-xs tracking-[0.3em] text-[#00ffc8]/80 uppercase">
                Embedded · Hardware Dev
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.div variants={itemVariants}>
              <h1 className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-[-0.03em] text-white">
                <span ref={headlineRef} className="block">CRAFTING DIGITAL</span>
                <span ref={subRef} className="block text-stroke">EXPERIENCES</span>
              </h1>
            </motion.div>

            {/* Sub text */}
            <motion.p
              variants={itemVariants}
              className="mt-10 max-w-md text-[#8899aa] font-mono text-sm leading-relaxed"
            >
              Embedded Systems Engineer specializing in PCB design, microcontroller programming, and IoT solutions.
              Experienced with PIC MCUs, Eagle, MPLAB X IDE, and A7672C GSM modules. Skilled in hardware design, UART debugging, PCB repair, and Python automation, focused on building smart, connected embedded systems.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="mt-12 flex items-center gap-6">
              <a
                href="#projects"
                className="group relative px-8 py-3.5 bg-[#00ffc8] text-[#050508] font-mono text-sm font-bold tracking-widest uppercase overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">View Work</span>
                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
              <a
                href="#contact"
                className="font-mono text-sm tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300 flex items-center gap-2"
              >
                Get in Touch
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          </div>

          {/* Right-side animated profile image */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center lg:justify-end"
          >
            <AnimatedProfileImage
              src="/anime_img.jpg"
              alternateSrc="/image.png"
              alt="Profile image"
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-12 left-6 lg:left-12 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase rotate-90 origin-center mb-4">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}