// projects.js — edit this file to add/update your projects

export const projects = [
  {
    id: "neural-canvas",
    title: "Neural Canvas",
    tagline: "AI-driven generative art engine",
    category: "AI / Creative",
    year: "2024",
    tech: ["Python", "PyTorch", "React", "WebGL"],
    description:
      "An interactive generative art platform powered by a custom diffusion model. Users sculpt abstract visuals in real-time by manipulating latent vectors through an intuitive 3D interface.",
    longDescription:
      "Neural Canvas bridges the gap between machine learning and artistic expression. The backend runs a fine-tuned latent diffusion model exposed via a FastAPI endpoint. The React frontend uses Three.js to visualize the latent space as an interactive 3D manifold — drag any point to steer the generation. Features include style transfer, animation export, and a community gallery backed by Supabase.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    links: { github: "#", live: "#", docs: "#" },
    color: "#00ffc8",
    featured: true,
  },
  {
    id: "orbit-os",
    title: "Orbit OS",
    tagline: "Modular space-ops dashboard",
    category: "Systems / UI",
    year: "2024",
    tech: ["React", "Three.js", "WebSocket", "Rust"],
    description:
      "A real-time telemetry dashboard for small satellite operators. Renders orbital paths in 3D, plots ground-station windows, and streams sensor data over WebSocket.",
    longDescription:
      "Orbit OS was built to replace clunky legacy GUIs used by university CubeSat teams. A Rust binary handles the low-level serial interface and pipes clean JSON over WebSocket. The React/Three.js frontend renders the SGP4 orbital propagator output live. Custom shader work gives the globe a cinematic look while keeping it under 60ms per frame on mid-range hardware.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800",
    links: { github: "#", live: "#" },
    color: "#4f9eff",
    featured: true,
  },
  {
    id: "echo-lang",
    title: "Echo Lang",
    tagline: "Compiled language with a human-readable IR",
    category: "PL / Compilers",
    year: "2023",
    tech: ["Rust", "LLVM", "WASM"],
    description:
      "A statically-typed compiled language that emits readable LLVM IR as a first-class artifact, designed for teaching compiler internals.",
    longDescription:
      "Echo is a toy-but-serious language: it has a full type system with inference, closures, algebraic data types, and pattern matching. What makes it unusual is that the 'debug IR' mode emits lovingly annotated LLVM IR you can actually read and learn from. Ships with a WASM target so you can run Echo programs in the browser playground.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    links: { github: "#", docs: "#" },
    color: "#ff6b35",
    featured: false,
  },
  {
    id: "synapse-ui",
    title: "Synapse UI",
    tagline: "Component library for data-heavy apps",
    category: "Design Systems",
    year: "2023",
    tech: ["React", "TypeScript", "Storybook", "Radix"],
    description:
      "A headless + styled component library optimized for dashboards: charts, tables, filters, and form primitives all in one cohesive design system.",
    longDescription:
      "Synapse UI started as internal tooling for a fintech project and grew into a standalone library. It sits on top of Radix UI for accessibility primitives and layers opinionated styling via CSS-in-JS tokens. Every component ships with a Storybook story, full TypeScript generics, and a11y tests baked into CI.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    links: { github: "#", live: "#", docs: "#" },
    color: "#c084fc",
    featured: false,
  },
  {
    id: "driftwave",
    title: "Driftwave",
    tagline: "Spatial audio engine for the browser",
    category: "Audio / WebAPI",
    year: "2023",
    tech: ["Web Audio API", "TypeScript", "WebAssembly"],
    description:
      "A library that wraps the Web Audio API with a physics-based 3D sound model — Doppler shift, room acoustics, and HRTF spatialization included.",
    longDescription:
      "Driftwave gives web games and XR experiences first-class spatial audio without a server. The HRTF convolver is implemented in a WASM module for near-native performance. The TypeScript surface API mirrors Three.js conventions so audio sources feel as natural as 3D objects. Demo scene features a procedurally generated jazz ensemble drifting around the listener.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
    links: { github: "#", live: "#" },
    color: "#ffd166",
    featured: false,
  },
  {
    id: "terrarium",
    title: "Terrarium",
    tagline: "Multiplayer procedural world builder",
    category: "Games / Networking",
    year: "2022",
    tech: ["Godot", "GDScript", "WebSocket", "Go"],
    description:
      "A browser-playable multiplayer sandbox where players collaboratively shape a procedurally generated planet in real time.",
    longDescription:
      "Terrarium uses Godot 4 exported to web. The Go backend handles room state, runs the authoritative physics tick, and broadcasts delta snapshots at 20Hz. World generation uses multi-octave domain-warped noise for organic continents. Up to 16 players can sculpt terrain, plant biomes, and drop structures simultaneously.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    links: { github: "#", live: "#" },
    color: "#06d6a0",
    featured: false,
  },
];

export const getProjectById = (id) => projects.find((p) => p.id === id);