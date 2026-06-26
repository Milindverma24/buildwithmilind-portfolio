'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

const INTERNSHIPS = [
  {
    year: '2026',
    role: 'Software Engineering Intern',
    company: 'India Glycols Limited (IGL)',
    type: 'Internship · On-site',
    bullets: [
      'Developed and optimized internal web applications to streamline industrial operations and monitoring.',
      'Designed clean, highly responsive user interfaces using React and modern CSS systems.',
      'Integrated relational databases and optimized queries to handle real-time logging and operational telemetry.',
    ],
    stack: ['React', 'Node.js', 'SQL', 'CSS'],
  },
];

const S = {
  label: {
    fontFamily: 'Satoshi, system-ui, sans-serif',
    fontSize: '0.5rem',
    letterSpacing: '0.3em',
    textTransform: 'uppercase' as const,
    fontWeight: 600,
  },
  micro: {
    fontFamily: 'Satoshi, system-ui, sans-serif',
    fontSize: '0.48rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase' as const,
    fontWeight: 500,
  },
};

/* ── Mobile card ──────────────────────────────────────────────────── */
function MobileCard({ exp, index }: { exp: (typeof INTERNSHIPS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      ref={ref}
      className="relative border-b border-black/8"
      style={{ padding: 'clamp(2.5rem,8vw,4.5rem) clamp(1.5rem,6vw,3rem)' }}
    >
      {/* Meta */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <span style={{ ...S.label, color: 'rgba(10,10,10,0.28)' }}>{num}</span>
        <span style={{ ...S.micro, color: 'rgba(10,10,10,0.22)' }}>{exp.type}</span>
      </motion.div>

      {/* Year */}
      <motion.div
        className="leading-none select-none"
        style={{
          fontFamily: 'var(--font-instrument), Georgia, serif',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(5.5rem,27vw,11rem)',
          color: 'rgba(10,10,10,0.35)',
          letterSpacing: '-0.045em',
          lineHeight: 0.85,
          marginBottom: '1.25rem',
        }}
        initial={{ opacity: 0, x: -24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
      >
        {exp.year}
      </motion.div>

      {/* Hairline */}
      <motion.div
        style={{ height: '1px', background: 'rgba(10,10,10,0.1)', marginBottom: '1.5rem', transformOrigin: 'left' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
      />

      {/* Company */}
      <motion.p
        style={{ fontFamily: 'Satoshi, system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.36em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.42)', fontWeight: 700, marginBottom: '0.65rem' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {exp.company}
      </motion.p>

      {/* Role — clip reveal */}
      <div style={{ overflow: 'hidden', marginBottom: '1.75rem' }}>
        <motion.h3
          style={{
            fontFamily: 'Satoshi, system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(1.9rem,9vw,3.2rem)',
            color: 'rgba(10,10,10,0.92)',
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
          }}
          initial={{ y: '106%' }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.75, ease: EASE, delay: 0.18 }}
        >
          {exp.role}
        </motion.h3>
      </div>

      {/* Bullets */}
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
        {exp.bullets.map((b, i) => (
          <motion.li
            key={i}
            style={{ display: 'flex', gap: '0.65rem', fontFamily: 'Satoshi, system-ui, sans-serif', fontSize: 'clamp(0.84rem,3.2vw,0.94rem)', color: 'rgba(10,10,10,0.62)', fontWeight: 500, lineHeight: 1.65 }}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.3 + i * 0.07 }}
          >
            <span style={{ marginTop: '0.6em', width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(10,10,10,0.22)', flexShrink: 0 }} />
            {b}
          </motion.li>
        ))}
      </ul>

      {/* Stack */}
      <motion.div
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.48 }}
      >
        {exp.stack.map((t) => (
          <span
            key={t}
            style={{
              border: '1px solid rgba(10,10,10,0.14)',
              background: 'rgba(10,10,10,0.025)',
              color: 'rgba(10,10,10,0.48)',
              fontFamily: 'Satoshi, system-ui, sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
              padding: '0.35rem 0.75rem',
            }}
          >
            {t}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ── Desktop panel ────────────────────────────────────────────────── */
function DesktopPanel({
  exp,
  index,
  total,
}: {
  exp: (typeof INTERNSHIPS)[0];
  index: number;
  total: number;
}) {
  const num = String(index + 1).padStart(2, '0');
  const tot = String(total).padStart(2, '0');

  return (
    <div
      data-panel-index={index}
      className="panel relative shrink-0 h-full flex flex-col border-r border-black/6"
      style={{ width: '100vw', padding: 'clamp(2rem,3.5vw,4.5rem) clamp(2.5rem,5vw,6rem)' }}
    >
      {/* Top row */}
      <div
        className="panel-top flex items-center justify-between shrink-0 pb-4"
        style={{ borderBottom: '1px solid rgba(10,10,10,0.07)' }}
      >
        <span style={{ ...S.label, color: 'rgba(10,10,10,0.25)' }}>
          {num}&nbsp;·&nbsp;{exp.type}
        </span>
        <span style={{ ...S.micro, color: 'rgba(10,10,10,0.16)', fontVariantNumeric: 'tabular-nums' }}>
          {num}&nbsp;/&nbsp;{tot}
        </span>
      </div>

      {/* Middle — fills remaining height */}
      <div className="flex items-stretch flex-1 mt-10 mb-10">
        {/* Year */}
        <div
          className="flex items-center shrink-0"
          style={{ width: 'clamp(220px,36vw,520px)' }}
        >
          <span
            className="panel-year block leading-none select-none"
            style={{
              fontFamily: 'var(--font-instrument), Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(7rem,18vw,24rem)',
              color: 'rgba(10,10,10,0.38)',
              letterSpacing: '-0.045em',
              lineHeight: 0.85,
            }}
          >
            {exp.year}
          </span>
        </div>

        {/* Vertical divider */}
        <div
          className="panel-divider w-px bg-black/10 self-stretch shrink-0"
          style={{ margin: '0 clamp(2rem,4vw,5.5rem)' }}
        />

        {/* Content */}
        <div className="flex flex-col justify-center gap-7 flex-1 min-w-0" style={{ maxWidth: '52ch' }}>
          <p
            className="panel-company"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif', fontSize: '0.62rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.42)', fontWeight: 700 }}
          >
            {exp.company}
          </p>

          <h3
            className="panel-role"
            style={{
              fontFamily: 'Satoshi, system-ui, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.2rem,4.5vw,5.8rem)',
              color: 'rgba(10,10,10,0.92)',
              letterSpacing: '-0.042em',
              lineHeight: 0.93,
            }}
          >
            {exp.role}
          </h3>

          <ul className="panel-bullets flex flex-col gap-2.5">
            {exp.bullets.map((b, i) => (
              <li
                key={i}
                className="flex gap-3 leading-relaxed"
                style={{ fontFamily: 'Satoshi, system-ui, sans-serif', fontSize: 'clamp(0.82rem,1vw,0.95rem)', color: 'rgba(10,10,10,0.62)', fontWeight: 500 }}
              >
                <span style={{ marginTop: '0.55em', width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(10,10,10,0.22)', flexShrink: 0 }} />
                {b}
              </li>
            ))}
          </ul>

          <div className="panel-stack flex flex-wrap gap-2">
            {exp.stack.map((t) => (
              <span
                key={t}
                className="transition-all duration-300 hover:bg-black hover:text-white hover:border-black cursor-default"
                style={{
                  border: '1px solid rgba(10,10,10,0.15)',
                  background: 'rgba(10,10,10,0.03)',
                  color: 'rgba(10,10,10,0.48)',
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  padding: '0.35rem 0.75rem',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────── */
export function Internship() {
  const sectionRef  = useRef<HTMLElement>(null);
  const pinRef      = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLSpanElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-12%' });

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const pin      = pinRef.current;
    const track    = trackRef.current;
    const progress = progressRef.current;
    if (!pin || !track) return;

    const ctx = gsap.context(() => {
      const getScrollDist = () => track.scrollWidth - window.innerWidth;

      /* ── Main horizontal tween ── */
      const scrollAnim = gsap.to(track, {
        x: () => -getScrollDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${getScrollDist()}`,
          scrub: 1,
          pin: INTERNSHIPS.length > 1, // Only pin and scrub horizontal if there's more than 1 item
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            /* Velocity skew */
            const vel = self.getVelocity();
            gsap.to(track, {
              skewX: gsap.utils.clamp(-4, 4, vel * 0.00045),
              duration: 0.55,
              ease: 'power3.out',
              overwrite: 'auto',
            });

            /* Live panel label */
            const idx = Math.min(INTERNSHIPS.length - 1, Math.floor(self.progress * INTERNSHIPS.length));
            if (labelRef.current) {
              labelRef.current.textContent =
                `${String(idx + 1).padStart(2, '0')} · ${INTERNSHIPS[idx].role} · ${INTERNSHIPS[idx].company}`;
            }
          },
        },
      });

      /* ── Progress bar ── */
      if (progress && INTERNSHIPS.length > 1) {
        gsap.to(progress, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${getScrollDist()}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      /* ── Per-panel reveal animations ── */
      const panels = Array.from(track.querySelectorAll('.panel'));

      panels.forEach((panel, i) => {
        const year    = panel.querySelector('.panel-year');
        const divider = panel.querySelector('.panel-divider');
        const company = panel.querySelector('.panel-company');
        const role    = panel.querySelector('.panel-role');
        const bullets = Array.from(panel.querySelectorAll('.panel-bullets li'));
        const stack   = panel.querySelector('.panel-stack');
        const topRow  = panel.querySelector('.panel-top');

        if (!year || !divider || !company || !role || !stack || !topRow) return;

        /* Set hidden initial state */
        gsap.set(topRow,   { opacity: 0, y: -10 });
        gsap.set(year,     { opacity: 0, x: -40 });
        gsap.set(divider,  { scaleY: 0, transformOrigin: 'top center' });
        gsap.set(company,  { opacity: 0, y: 10 });
        gsap.set(role,     { opacity: 0, y: 28 });
        gsap.set(bullets,  { opacity: 0, x: -12 });
        gsap.set(stack,    { opacity: 0, y: 10 });

        const stConfig = i === 0
          ? { trigger: pin,                  start: 'top 80%',  toggleActions: 'play none none none' }
          : { trigger: panel as Element, containerAnimation: scrollAnim, start: 'left 90%', toggleActions: 'play none none none' };

        const tl = gsap.timeline({ scrollTrigger: stConfig, defaults: { ease: 'power3.out' } });
        tl.to(topRow,  { opacity: 1, y: 0,  duration: 0.5 })
          .to(year,    { opacity: 1, x: 0,  duration: 0.95 }, '-=0.35')
          .to(divider, { scaleY: 1,         duration: 0.8  }, '-=0.7')
          .to(company, { opacity: 1, y: 0,  duration: 0.45 }, '-=0.45')
          .to(role,    { opacity: 1, y: 0,  duration: 0.75 }, '-=0.3')
          .to(bullets, { opacity: 1, x: 0,  duration: 0.5, stagger: 0.07 }, '-=0.45')
          .to(stack,   { opacity: 1, y: 0,  duration: 0.4  }, '-=0.25');
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Shared header ── */
  const Header = (
    <div className="px-[clamp(1.25rem,5vw,5rem)] pt-[clamp(4rem,8vw,10rem)] pb-[clamp(2rem,4vw,4rem)]">
      <div className="flex items-center gap-4 mb-[clamp(2rem,4vw,4rem)]">
        <motion.span
          style={{ fontFamily: 'Satoshi, system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.3)', fontWeight: 500 }}
          className="shrink-0"
          initial={{ opacity: 0, x: -16 }}
          animate={sectionInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          04 / Internship
        </motion.span>
        <motion.div
          className="flex-1 h-px bg-black/10"
          style={{ transformOrigin: 'left' }}
          initial={{ scaleX: 0 }}
          animate={sectionInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
        />
      </div>

      <h2
        style={{ fontFamily: 'Satoshi, system-ui, sans-serif', fontWeight: 900, fontSize: 'clamp(2.4rem,7vw,8rem)', letterSpacing: '-0.04em', lineHeight: 0.9 }}
      >
        {(['Internship'] as const).map((word, i) => (
          <span key={word} className="inline-block overflow-hidden mr-[0.22em]">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={sectionInView ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05 + i * 0.1, ease: EASE }}
            >
              {word}
            </motion.span>
          </span>
        ))}
        {' '}
        <span className="inline-block overflow-hidden">
          <motion.span
            className="block"
            style={{ fontFamily: 'var(--font-instrument), Georgia, serif', fontStyle: 'italic', fontWeight: 400, color: 'rgba(10,10,10,0.28)' }}
            initial={{ y: '110%' }}
            animate={sectionInView ? { y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
          >
            Section
          </motion.span>
        </span>
      </h2>
    </div>
  );

  return (
    <section ref={sectionRef} id="internship" className="w-full border-t border-black/8 bg-white">

      {/* ── Mobile (< lg) ─────────────────────────────────────────── */}
      <div className="block lg:hidden relative overflow-hidden bg-white">
        <div className="relative z-10">
          {Header}
          <div>
            {INTERNSHIPS.map((exp, i) => (
              <MobileCard key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Desktop (≥ lg) ────────────────────────────────────────── */}
      <div className="hidden lg:block">
        {/* Header above the pin — plain white */}
        <div className="bg-white">{Header}</div>

        {/* Pinned horizontal scroll */}
        <div ref={pinRef} className="h-screen overflow-hidden relative bg-white">

          {/* Top progress bar */}
          {INTERNSHIPS.length > 1 && (
            <div className="absolute top-0 left-0 right-0 h-px z-20 pointer-events-none" style={{ background: 'rgba(10,10,10,0.07)' }}>
              <div
                ref={progressRef}
                className="h-full origin-left"
                style={{ transform: 'scaleX(0)', background: 'rgba(10,10,10,0.4)' }}
              />
            </div>
          )}

          {/* Bottom label strip */}
          <div
            className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none flex items-center justify-between"
            style={{
              borderTop: '1px solid rgba(10,10,10,0.07)',
              padding: 'clamp(0.75rem,1.4vw,1.1rem) clamp(2.5rem,5vw,6rem)',
            }}
          >
            <span ref={labelRef} style={{ ...S.label, color: 'rgba(10,10,10,0.25)' }}>
              {`01 · ${INTERNSHIPS[0].role} · ${INTERNSHIPS[0].company}`}
            </span>
            {INTERNSHIPS.length > 1 && (
              <span style={{ ...S.micro, color: 'rgba(10,10,10,0.18)' }}>
                ← Drag to navigate →
              </span>
            )}
          </div>

          {/* Scrolling track */}
          <div
            ref={trackRef}
            className="relative z-10 flex h-full bg-white"
            style={{ width: `${INTERNSHIPS.length * 100}vw`, willChange: 'transform' }}
          >
            {INTERNSHIPS.map((exp, i) => (
              <DesktopPanel key={i} exp={exp} index={i} total={INTERNSHIPS.length} />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
