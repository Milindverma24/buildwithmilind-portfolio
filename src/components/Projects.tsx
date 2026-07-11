'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'carbonmitra',
    name: 'CarbonMitra – Sustainability Analytics Platform',
    category: 'Sustainability | AI | Full Stack',
    tagline: 'Full-stack sustainability platform to monitor, analyze, and reduce carbon footprints with AI-powered recommendations and interactive analytics.',
    stack: ['React', 'Spring Boot', 'PostgreSQL', 'Redis', 'Cohere AI'],
    image: '/projects/carbon_mitra.png',
    year: '2026',
    github: 'https://github.com/Milindverma24/carbon_tracker',
    deployed: 'https://carbon-tracker-nine-mu.vercel.app/',
    detailsLink: '/projects/carbonmitra',
  },
  {
    id: 'visitor-management',
    name: 'Enterprise Visitor Management System',
    category: 'Web App / Security / Full Stack',
    tagline: 'Modern visitor check-in, tracking, and authorization system designed for corporate enterprise environments.',
    stack: ['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'JWT'],
    image: '/projects/visitor_management.png',
    year: '2025',
    github: 'https://github.com/Milindverma24/visitor-management',
    deployed: 'https://visitor-management-iota-nine.vercel.app/',
  },
  {
    id: 'gis-urban-growth',
    name: 'GIS Urban Growth Analysis',
    category: 'GIS / Deep Learning',
    tagline: 'GIS-based urban growth analysis using semantic segmentation on satellite imagery. U-Net model for land-use classification.',
    stack: ['Python', 'Deep Learning', 'U-Net', 'OpenCV', 'Flask'],
    image: '/projects/gis_project.jpeg',
    year: '2026',
    github: 'https://github.com/Milindverma24',
    deployed: 'https://saturn-16-gis.hf.space/',
  },
  {
    id: 'mental-health',
    name: 'Mental Health Detection',
    category: 'AI / Computer Vision',
    tagline: 'Real-time facial emotion detection tool for mental health tracking. CNN-based deep learning model classifying 7 emotions from a webcam feed.',
    stack: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Streamlit'],
    image: '/projects/metal healthdetection.jpeg',
    year: '2025',
    github: 'https://github.com/Milindverma24/Mental-health-detection',
    deployed: 'https://mental-health-24.streamlit.app/',
  },
  {
    id: 'sumopy',
    name: 'SuMoPy',
    category: 'Optimization / Data',
    tagline: "Sustainable mobility route optimization system. Implementing Dijkstra's and A* algorithms considering distance, time, and CO2 emissions.",
    stack: ['Python', 'Data Analysis', 'NetworkX', 'Matplotlib'],
    image: '/projects/somopy.jpeg',
    year: '2024',
    github: 'https://github.com/Milindverma24/SuMoPy',
    deployed: 'https://sumopy.vercel.app',
  },
] as const;

type Project = (typeof PROJECTS)[number];

// ─── Cube geometry ─────────────────────────────────────────────────────────────
// Scene 0 = intro, scenes 1–16 = projects
const SCENE_COUNT = PROJECTS.length + 2;

// Which of the 6 cube faces is front-facing at each scroll stop
function faceAtStop(i: number): number {
  if (i < 6) return i;
  return 1 + ((i - 2) % 4);
}

// CSS 3D transforms for a 16:9 rectangular prism (depth = width).
// Side faces use --cw/2; top/bottom use --ch/2 so the box seals correctly.
const FACE_TRANSFORMS: string[] = [
  'rotateX(-90deg) translateZ(calc(var(--ch) / 2))', // 0 top
  'translateZ(calc(var(--cw) / 2))',                  // 1 front
  'rotateY(90deg) translateZ(calc(var(--cw) / 2))',   // 2 right
  'rotateY(180deg) translateZ(calc(var(--cw) / 2))',  // 3 back
  'rotateY(-90deg) translateZ(calc(var(--cw) / 2))',  // 4 left
  'rotateX(90deg) translateZ(calc(var(--ch) / 2))',   // 5 bottom
];

// Scroll stops: rotation state at each scene index
function buildStops(n: number): { rx: number; ry: number }[] {
  const base = [
    { rx: 90,  ry: 0 },
    { rx: 0,   ry: 0 },
    { rx: 0,   ry: -90 },
    { rx: 0,   ry: -180 },
    { rx: 0,   ry: -270 },
    { rx: -90, ry: -360 },
  ];
  const out = base.slice(0, Math.min(n, 6));
  for (let i = 6; i < n; i++) {
    out.push({ rx: 0, ry: -360 - (i - 6) * 90 });
  }
  return out;
}

const STOPS = buildStops(SCENE_COUNT);

const easeIO = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

function getCubeTransform(progress: number): { rx: number; ry: number } {
  const t = progress * (SCENE_COUNT - 1);
  const i = Math.min(Math.floor(t), SCENE_COUNT - 2);
  const f = easeIO(t - i);
  const a = STOPS[i];
  const b = STOPS[i + 1];
  return { rx: a.rx + (b.rx - a.rx) * f, ry: a.ry + (b.ry - a.ry) * f };
}

function sceneFromProgress(progress: number): number {
  return Math.min(SCENE_COUNT - 1, Math.floor(progress * SCENE_COUNT));
}

// Compute which project image belongs on each face, pre-loading nearby stops
const SWAP_RADIUS = 3;

function deriveFaceImages(stopIdx: number): (number | null)[] {
  const images: (number | null)[] = Array(6).fill(null);
  for (let offset = -SWAP_RADIUS; offset <= SWAP_RADIUS; offset++) {
    const si = stopIdx + offset;
    if (si < 0 || si >= SCENE_COUNT) continue;
    const fi = faceAtStop(si);
    const pi = si - 1; // scene 0 is intro (no project image)
    if (pi >= 0 && pi < PROJECTS.length) {
      images[fi] = pi;
    }
  }
  return images;
}

// ─── Background canvas — tiny drifting particles ──────────────────────────────
function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    interface Dot {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      a: number;
      aMin: number;
      aMax: number;
      aDir: number;
      aSpd: number;
    }

    const COUNT = 160;
    const make = (): Dot => {
      const isStar = Math.random() < 0.25;
      const aMax = isStar ? 0.12 + Math.random() * 0.1 : 0.04 + Math.random() * 0.06;
      const aMin = aMax * 0.15;
      return {
        x: Math.random() * (w || window.innerWidth),
        y: Math.random() * (h || window.innerHeight),
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.14 - 0.025, // slight upward float
        r: isStar ? 0.75 + Math.random() * 0.9 : 0.35 + Math.random() * 0.55,
        a: aMin + Math.random() * (aMax - aMin),
        aMin,
        aMax,
        aDir: Math.random() < 0.5 ? 1 : -1,
        aSpd: 0.00025 + Math.random() * 0.0005,
      };
    };

    const dots: Dot[] = Array.from({ length: COUNT }, make);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) return;
      ctx.clearRect(0, 0, w, h);

      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;

        if (d.x < -2) d.x = w + 2;
        else if (d.x > w + 2) d.x = -2;
        if (d.y < -2) d.y = h + 2;
        else if (d.y > h + 2) d.y = -2;

        d.a += d.aSpd * d.aDir;
        if (d.a >= d.aMax) { d.a = d.aMax; d.aDir = -1; }
        else if (d.a <= d.aMin) { d.a = d.aMin; d.aDir = 1; }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${d.a.toFixed(3)})`;
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function ProjectCard({ project, align }: { project: Project; align: 'left' | 'right' }) {
  const right = align === 'right';
  return (
    <div
      style={{
        padding: '1.75rem 1.5rem',
        background: 'rgba(12,12,12,0.92)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        borderLeft: right ? 'none' : '1px solid rgba(255,255,255,0.07)',
        borderRight: right ? '1px solid rgba(255,255,255,0.07)' : 'none',
      }}
    >
      {/* Accent line */}
      <div
        style={{
          width: '2rem',
          height: '1px',
          background: 'rgba(255,255,255,0.5)',
          marginBottom: '1.1rem',
          marginLeft: right ? 'auto' : 0,
        }}
      />

      {/* Category · year */}
      <p
        style={{
          fontFamily: 'Satoshi, system-ui, sans-serif',
          fontSize: '0.5rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.28)',
          marginBottom: '0.75rem',
          textAlign: right ? 'right' : 'left',
        }}
      >
        {project.category}&nbsp;·&nbsp;{project.year}
      </p>

      {/* Name */}
      <h3
        style={{
          fontFamily: 'Satoshi, system-ui, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
          letterSpacing: '-0.04em',
          lineHeight: 0.88,
          color: 'rgba(255,255,255,0.92)',
          marginBottom: '0.9rem',
          textAlign: right ? 'right' : 'left',
        }}
      >
        {project.name}
      </h3>

      {/* Tagline */}
      <p
        style={{
          fontFamily: 'Satoshi, system-ui, sans-serif',
          fontSize: '0.73rem',
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.32)',
          marginBottom: '1rem',
          textAlign: right ? 'right' : 'left',
        }}
      >
        {project.tagline}
      </p>

      {/* Stack pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.35rem',
          marginBottom: '1.2rem',
          justifyContent: right ? 'flex-end' : 'flex-start',
        }}
      >
        {project.stack.map((t) => (
          <span
            key={t}
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.28)',
              fontFamily: 'Satoshi, system-ui, sans-serif',
              fontSize: '0.48rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '0.18rem 0.5rem',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div
        style={{
          display: 'flex',
          gap: '0.6rem',
          justifyContent: right ? 'flex-end' : 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {'github' in project && project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.5)',
              background: 'rgba(255,255,255,0.02)',
              fontFamily: 'Satoshi, system-ui, sans-serif',
              fontSize: '0.5rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '0.5rem 0.9rem',
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = 'rgba(255,255,255,0.08)';
              el.style.color = 'rgba(255,255,255,0.95)';
              el.style.borderColor = 'rgba(255,255,255,0.4)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = 'rgba(255,255,255,0.02)';
              el.style.color = 'rgba(255,255,255,0.5)';
              el.style.borderColor = 'rgba(255,255,255,0.15)';
            }}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub
          </a>
        )}

        {'deployed' in project && project.deployed && (
          <a
            href={project.deployed}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              border: '1px solid rgba(16,185,129,0.25)',
              color: 'rgba(16,185,129,0.8)',
              background: 'rgba(16,185,129,0.03)',
              fontFamily: 'Satoshi, system-ui, sans-serif',
              fontSize: '0.5rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '0.5rem 0.9rem',
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = 'rgba(16,185,129,0.12)';
              el.style.color = 'rgba(52,211,153,1)';
              el.style.borderColor = 'rgba(16,185,129,0.65)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = 'rgba(16,185,129,0.03)';
              el.style.color = 'rgba(16,185,129,0.8)';
              el.style.borderColor = 'rgba(16,185,129,0.25)';
            }}
          >
            Live Demo
            <ArrowUpRight size={9} />
          </a>
        )}


      </div>
    </div>
  );
}

function GithubCTA({ align }: { align: 'left' | 'right' }) {
  const right = align === 'right';
  return (
    <div
      style={{
        padding: '1.75rem 1.5rem',
        background: 'rgba(12,12,12,0.92)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        borderLeft: right ? 'none' : '1px solid rgba(255,255,255,0.07)',
        borderRight: right ? '1px solid rgba(255,255,255,0.07)' : 'none',
        textAlign: right ? 'right' : 'left',
      }}
    >
      {/* Accent line */}
      <div
        style={{
          width: '2rem',
          height: '1px',
          background: 'rgba(255,255,255,0.5)',
          marginBottom: '1.1rem',
          marginLeft: right ? 'auto' : 0,
        }}
      />

      {/* GitHub Label */}
      <p
        style={{
          fontFamily: 'Satoshi, system-ui, sans-serif',
          fontSize: '0.5rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.28)',
          marginBottom: '0.75rem',
        }}
      >
        Open Source&nbsp;·&nbsp;Repositories
      </p>

      {/* Name */}
      <h3
        style={{
          fontFamily: 'Satoshi, system-ui, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
          letterSpacing: '-0.04em',
          lineHeight: 0.88,
          color: 'rgba(255,255,255,0.92)',
          marginBottom: '0.9rem',
        }}
      >
        More Projects
      </h3>

      {/* Tagline */}
      <p
        style={{
          fontFamily: 'Satoshi, system-ui, sans-serif',
          fontSize: '0.73rem',
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.32)',
          marginBottom: '1.5rem',
        }}
      >
        For more projects and full source code, please visit my GitHub repository.
      </p>

      {/* CTA Button */}
      <div style={{ display: 'flex', justifyContent: right ? 'flex-end' : 'flex-start' }}>
        <a
          href="https://github.com/Milindverma24"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.6)',
            background: 'rgba(255,255,255,0.02)',
            fontFamily: 'Satoshi, system-ui, sans-serif',
            fontSize: '0.5rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            padding: '0.5rem 0.9rem',
            textDecoration: 'none',
            transition: 'background 0.2s, color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = 'rgba(255,255,255,0.08)';
            el.style.color = '#FFF';
            el.style.borderColor = 'rgba(255,255,255,0.4)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = 'rgba(255,255,255,0.02)';
            el.style.color = 'rgba(255,255,255,0.6)';
            el.style.borderColor = 'rgba(255,255,255,0.15)';
          }}
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          Visit GitHub
          <ArrowUpRight size={9} />
        </a>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  // Direct DOM refs for HUD — avoids React re-renders on every scroll frame
  const hudPctRef = useRef<HTMLDivElement>(null);
  const hudFillRef = useRef<HTMLDivElement>(null);
  const hudSceneRef = useRef<HTMLDivElement>(null);
  const captionNumRef = useRef<HTMLDivElement>(null);
  const captionLabelRef = useRef<HTMLDivElement>(null);

  const [activeScene, setActiveScene] = useState(0);
  const activeSceneRef = useRef(0);
  const [faceImages, setFaceImages] = useState<(number | null)[]>(() => deriveFaceImages(0));

  useEffect(() => {
    if (!sectionRef.current || !cubeRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate(self) {
        const p = self.progress;

        // Cube rotation — direct DOM write, no React state
        const { rx, ry } = getCubeTransform(p);
        cubeRef.current!.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;

        // HUD percentage
        const pct = Math.round(p * 100);
        if (hudPctRef.current) {
          hudPctRef.current.textContent = String(pct).padStart(3, '0') + '%';
        }
        if (hudFillRef.current) {
          hudFillRef.current.style.width = `${pct}%`;
        }

        // Scene transition (fires only when crossing a scene boundary)
        const newScene = sceneFromProgress(p);
        if (newScene !== activeSceneRef.current) {
          activeSceneRef.current = newScene;

          const label =
            newScene === 0
              ? 'OVERVIEW'
              : newScene <= PROJECTS.length
              ? PROJECTS[newScene - 1].category.toUpperCase()
              : 'FOR MORE PROJECTS VISIT GITHUB';

          if (hudSceneRef.current) hudSceneRef.current.textContent = label;
          if (captionNumRef.current) {
            captionNumRef.current.textContent = String(newScene).padStart(2, '0');
          }
          if (captionLabelRef.current) captionLabelRef.current.textContent = label;

          setActiveScene(newScene);
          setFaceImages(deriveFaceImages(newScene));
        }
      },
    });

    return () => trigger.kill();
  }, []);

  const project = activeScene > 0 && activeScene <= PROJECTS.length ? PROJECTS[activeScene - 1] : null;
  // Odd scenes → left card, even scenes → right card
  const isRight = activeScene > 0 && activeScene % 2 === 0;

  return (
    <section
      ref={sectionRef}
      id="work"
      data-theme="dark"
      style={{ height: `${SCENE_COUNT * 100}vh`, background: '#0A0A0A', position: 'relative', cursor: 'default' }}
    >
      {/* ── Sticky viewport ─────────────────────────────────────────────────── */}
      <div data-cursor="view" style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', cursor: 'default' }}>

        {/* ── Background layer — no filter:blur so preserve-3d cube stays sharp ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <BackgroundCanvas />

          {/* Ambient orb 1 — top-left. Pure radial-gradient, no filter:blur. */}
          <motion.div
            aria-hidden
            style={{
              position: 'absolute',
              top: '-20%',
              left: '-15%',
              width: '75vw',
              height: '75vw',
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.032) 0%, rgba(255,255,255,0.01) 40%, transparent 70%)',
            }}
            animate={{ x: [0, 40, -25, 0], y: [0, 30, -40, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Ambient orb 2 — bottom-right */}
          <motion.div
            aria-hidden
            style={{
              position: 'absolute',
              bottom: '-25%',
              right: '-18%',
              width: '70vw',
              height: '70vw',
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.022) 0%, rgba(255,255,255,0.007) 45%, transparent 70%)',
            }}
            animate={{ x: [0, -35, 20, 0], y: [0, -25, 35, 0] }}
            transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Section label — top left */}
        <div className="absolute top-7 left-8 z-20 flex items-center gap-3">
          <span
            className="text-[0.52rem] tracking-[0.25em] uppercase font-medium"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif', color: 'rgba(255,255,255,0.18)' }}
          >
            02 / Work
          </span>
          <div style={{ width: '2rem', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <span
            className="text-[0.52rem] tracking-[0.25em] uppercase font-medium"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif', color: 'rgba(255,255,255,0.1)' }}
          >
            {PROJECTS.length} Projects
          </span>
        </div>

        {/* HUD — top right */}
        <div className="absolute top-7 right-8 z-20 text-right">
          <div
            ref={hudPctRef}
            style={{
              fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
              fontSize: '0.58rem',
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.22)',
            }}
          >
            000%
          </div>
          <div
            style={{
              width: '6rem',
              height: '1px',
              background: 'rgba(255,255,255,0.08)',
              marginTop: '0.4rem',
              marginLeft: 'auto',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              ref={hudFillRef}
              style={{
                position: 'absolute',
                inset: '0 auto 0 0',
                width: '0%',
                background: 'rgba(255,255,255,0.55)',
              }}
            />
          </div>
          <div
            ref={hudSceneRef}
            style={{
              fontFamily: 'Satoshi, system-ui, sans-serif',
              fontSize: '0.45rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.18)',
              marginTop: '0.3rem',
            }}
          >
            OVERVIEW
          </div>
        </div>

        {/* Nav dots — left (hidden on small screens) */}
        <div className="absolute left-7 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-2">
          {Array.from({ length: SCENE_COUNT }, (_, i) => (
            <div
              key={i}
              style={{
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                background: i === activeScene ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.18)',
                transform: i === activeScene ? 'scale(1.6)' : 'scale(1)',
                transition: 'background 0.3s, transform 0.3s',
              }}
            />
          ))}
        </div>

        {/* ── 3-D cube + mobile card ──────────────────────────────────────── */}
        <div
          className={`projects-cube-scene${activeScene > 0 ? ' scene-active' : ''}`}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1100px',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <div
            ref={cubeRef}
            style={
              {
                // 16:9 prism — depth equals width so all 4 side faces are 16:9
                '--cw': 'min(72vw, 700px)',
                '--ch': 'calc(var(--cw) * 9 / 16)',
                width: 'var(--cw)',
                height: 'var(--ch)',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transform: 'rotateX(90deg) rotateY(0deg)',
                flexShrink: 0,
              } as React.CSSProperties
            }
          >
            {([0, 1, 2, 3, 4, 5] as const).map((fi) => {
              // Top (0) & bottom (5) cap the box — they must be square (width × width)
              // so the prism seals without gaps. Side faces use inset:0 (16:9).
              const isCapFace = fi === 0 || fi === 5;
              return (
                <div
                  key={fi}
                  style={{
                    position: 'absolute',
                    overflow: 'hidden',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: FACE_TRANSFORMS[fi],
                    background: `
                      repeating-linear-gradient(0deg,   rgba(255,255,255,0.025) 0, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 48px),
                      repeating-linear-gradient(90deg,  rgba(255,255,255,0.025) 0, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 48px),
                      #0e0c0b
                    `,
                    // Cap faces: square (var(--cw) × var(--cw)), centered on the container
                    ...(isCapFace
                      ? {
                          left: 0,
                          right: 0,
                          top: 'calc(50% - var(--cw) / 2)',
                          width: 'var(--cw)',
                          height: 'var(--cw)',
                        }
                      : { inset: 0 }),
                  }}
                >
                  {faceImages[fi] !== null ? (
                    <>
                      {/* Fallback index number in the background */}
                      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
                        <span
                          style={{
                            fontFamily: 'Satoshi, system-ui, sans-serif',
                            fontWeight: 900,
                            fontSize: 'clamp(3rem, 10vw, 7rem)',
                            color: 'rgba(255,255,255,0.04)',
                            letterSpacing: '-0.05em',
                          }}
                        >
                          {String(faceImages[fi]! + 1).padStart(2, '0')}
                        </span>
                      </div>
                      
                      {/* Image layered on top */}
                      <Image
                        src={PROJECTS[faceImages[fi]!].image}
                        alt={PROJECTS[faceImages[fi]!].name}
                        fill
                        className="object-cover z-10"
                        quality={90}
                        sizes="(max-width: 768px) 90vw, 1400px"
                        priority
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0,0,0,0.28)',
                          zIndex: 15,
                        }}
                      />
                    </>
                  ) : fi === 5 ? (
                    <div 
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        userSelect: 'none',
                        padding: '1.5rem',
                        zIndex: 10,
                      }}
                    >
                      <div 
                        style={{
                          width: '3rem',
                          height: '3rem',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '0.8rem',
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'rgba(255,255,255,0.35)' }}>
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                      </div>
                      <span 
                        style={{
                          fontFamily: 'Satoshi, system-ui, sans-serif',
                          fontSize: '0.45rem',
                          letterSpacing: '0.25em',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          color: 'rgba(255,255,255,0.22)',
                        }}
                      >
                        Explore More on GitHub
                      </span>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Mobile card — directly below cube, hidden on md+ */}
          <div
            className="md:hidden"
            style={{
              marginTop: '0.75rem',
              width: 'min(72vw, 700px)',
              maxWidth: 'calc(100% - 2rem)',
              flexShrink: 0,
              pointerEvents: 'auto',
            }}
          >
            <AnimatePresence mode="wait">
              {activeScene > 0 && (
                project ? (
                  <motion.div
                    key={`mob-${activeScene}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.32 }}
                  >
                    <ProjectCard project={project} align="left" />
                  </motion.div>
                ) : activeScene === PROJECTS.length + 1 ? (
                  <motion.div
                    key="mob-github-cta"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.32 }}
                  >
                    <GithubCTA align="left" />
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Intro card — desktop (md+) fades out on scroll ───────────────── */}
        <AnimatePresence>
          {activeScene === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45 }}
              className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none"
              style={{ zIndex: 10 }}
            >
              <div style={{ textAlign: 'center', maxWidth: '32rem', padding: '0 1.5rem' }}>
                <p
                  style={{
                    fontFamily: 'Satoshi, system-ui, sans-serif',
                    fontSize: '0.52rem',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.2)',
                    marginBottom: '1.5rem',
                  }}
                >
                  Selected Work&nbsp;·&nbsp;{PROJECTS.length} Projects
                </p>
                <h2
                  style={{
                    fontFamily: 'Satoshi, system-ui, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
                    letterSpacing: '-0.05em',
                    lineHeight: 0.88,
                    color: 'rgba(255,255,255,0.92)',
                    marginBottom: '0.15em',
                  }}
                >
                  Selected{' '}
                  <span
                    style={{
                      fontFamily: 'var(--font-instrument), Georgia, serif',
                      fontStyle: 'italic',
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.18)',
                    }}
                  >
                    Work
                  </span>
                </h2>
                <p
                  style={{
                    fontFamily: 'Satoshi, system-ui, sans-serif',
                    fontSize: '0.65rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.15)',
                    marginTop: '2rem',
                  }}
                >
                  Scroll to explore
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Intro title — mobile: slides from center → top as user scrolls ── */}
        <div
          className="md:hidden absolute left-1/2 z-10 pointer-events-none"
          style={{
            top: activeScene === 0 ? '50%' : '3.5rem',
            transform: `translateX(-50%) translateY(${activeScene === 0 ? '-50%' : '0'})`,
            transition: 'top 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)',
            textAlign: 'center',
            maxWidth: 'calc(100vw - 4rem)',
            width: 'max-content',
          }}
        >
          <AnimatePresence mode="wait">
            {activeScene === 0 ? (
              <motion.div
                key="mob-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <p
                  style={{
                    fontFamily: 'Satoshi, system-ui, sans-serif',
                    fontSize: '0.52rem',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.2)',
                    marginBottom: '1.25rem',
                  }}
                >
                  Selected Work&nbsp;·&nbsp;{PROJECTS.length} Projects
                </p>
                <h2
                  style={{
                    fontFamily: 'Satoshi, system-ui, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(3rem, 9vw, 5.5rem)',
                    letterSpacing: '-0.05em',
                    lineHeight: 0.88,
                    color: 'rgba(255,255,255,0.92)',
                  }}
                >
                  Selected{' '}
                  <span
                    style={{
                      fontFamily: 'var(--font-instrument), Georgia, serif',
                      fontStyle: 'italic',
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.18)',
                    }}
                  >
                    Work
                  </span>
                </h2>
                <p
                  style={{
                    fontFamily: 'Satoshi, system-ui, sans-serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.15)',
                    marginTop: '1.75rem',
                  }}
                >
                  Scroll to explore
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="mob-compact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p
                  style={{
                    fontFamily: 'Satoshi, system-ui, sans-serif',
                    fontSize: '0.42rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.18)',
                    marginBottom: '0.3rem',
                  }}
                >
                  02 / Work
                </p>
                <h2
                  style={{
                    fontFamily: 'Satoshi, system-ui, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(2rem, 8vw, 3rem)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: 'rgba(255,255,255,0.5)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Selected{' '}
                  <span
                    style={{
                      fontFamily: 'var(--font-instrument), Georgia, serif',
                      fontStyle: 'italic',
                      fontWeight: 400,
                    }}
                  >
                    Work
                  </span>
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Project cards — desktop left slot ─────────────────────────────── */}
        <div
          className="absolute hidden md:block z-10"
          style={{
            left: 'clamp(4rem, 7vw, 7rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'min(21rem, 28%)',
          }}
        >
          <AnimatePresence mode="wait">
            {!isRight && activeScene > 0 && (
              project ? (
                <motion.div
                  key={`left-${activeScene}`}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  transition={{ duration: 0.38 }}
                >
                  <ProjectCard project={project} align="left" />
                </motion.div>
              ) : activeScene === PROJECTS.length + 1 ? (
                <motion.div
                  key="github-cta-left"
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  transition={{ duration: 0.38 }}
                >
                  <GithubCTA align="left" />
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>

        {/* ── Project cards — desktop right slot ────────────────────────────── */}
        <div
          className="absolute hidden md:block z-10"
          style={{
            right: 'clamp(4rem, 7vw, 7rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'min(21rem, 28%)',
          }}
        >
          <AnimatePresence mode="wait">
            {isRight && activeScene > 0 && (
              project ? (
                <motion.div
                  key={`right-${activeScene}`}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 14 }}
                  transition={{ duration: 0.38 }}
                >
                  <ProjectCard project={project} align="right" />
                </motion.div>
              ) : activeScene === PROJECTS.length + 1 ? (
                <motion.div
                  key="github-cta-right"
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 14 }}
                  transition={{ duration: 0.38 }}
                >
                  <GithubCTA align="right" />
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>

        {/* ── Scene counter — bottom right ──────────────────────────────────── */}
        <div
          className="absolute bottom-7 right-8 z-20"
          style={{ pointerEvents: 'none', textAlign: 'right' }}
        >
          <span
            style={{
              fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.18)',
            }}
          >
            {String(activeScene).padStart(2, '0')}&nbsp;/&nbsp;{String(PROJECTS.length + 1).padStart(2, '0')}
          </span>
        </div>

        {/* ── Face caption — bottom center ──────────────────────────────────── */}
        <div
          className="absolute bottom-7 left-1/2 z-20"
          style={{ transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none' }}
        >
          <div
            ref={captionNumRef}
            style={{
              fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
              fontSize: '0.45rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
              marginBottom: '0.2rem',
            }}
          >
            00
          </div>
          <div
            ref={captionLabelRef}
            style={{
              fontFamily: 'Satoshi, system-ui, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.06)',
            }}
          >
            OVERVIEW
          </div>
        </div>

      </div>
    </section>
  );
}
