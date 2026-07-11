'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: 'Projects Built', target: 12,   suffix: '+' },
  { label: 'Hackathons',    target: 5,  suffix: '+' },
  { label: 'Certifications',      target: 4, suffix: '+' },
  { label: 'Technologies',    target: 15,   suffix: '+'  },
];

const QUOTE_WORDS = [
  'I', 'build', 'systems', 'that', "blend", 'deep', 'learning', 'with',
  'high', 'performance', 'web', 'applications', 'seamlessly.'
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* Smooth count-up, fires once on scroll into view */
function CountUp({
  target,
  suffix,
  inView,
  delay = 0,
}: {
  target: number;
  suffix: string;
  inView: boolean;
  delay?: number;
}) {
  const [display, setDisplay] = useState(0);
  const count   = useMotionValue(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const ctrl = animate(count, target, {
      duration: 2.2,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [inView, target, count, delay]);

  return <>{display}{suffix}</>;
}

/* Word-by-word animated pull quote */
function AnimatedQuote({ inView }: { inView: boolean }) {
  return (
    <p
      style={{
        fontFamily:    'var(--font-instrument), Georgia, serif',
        fontStyle:     'italic',
        fontSize:      'clamp(1.8rem, 3.5vw, 3.5rem)',
        letterSpacing: '-0.01em',
        lineHeight:    1.2,
        color:         '#0A0A0A',
      }}
    >
      &ldquo;
      {QUOTE_WORDS.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.55, delay: 0.05 + i * 0.045, ease: EASE }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
      &rdquo;
    </p>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: '-10%' });
  const statsInView   = useInView(statsRef,   { once: true, margin: '-5%'  });

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {

      /* Horizontal rule draw-in */
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: lineRef.current, start: 'top 85%' },
          }
        );
      }

      /* Image clip-path reveal */
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.4,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: imageRef.current, start: 'top 78%' },
          }
        );
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full bg-white border-t border-black/[0.08]"
    >
      <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)] py-[clamp(5rem,10vw,11rem)]">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-[clamp(2rem,4vw,4rem)]">
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-[0.6rem] tracking-[0.22em] uppercase text-black/30 font-medium"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
          >
            01 / About
          </motion.span>
          <div ref={lineRef} className="flex-1 h-px bg-black/10" />
        </div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
          className="font-black text-black tracking-tighter leading-[0.88] mb-[clamp(3rem,6vw,7rem)]"
          style={{
            fontFamily: 'Satoshi, system-ui, sans-serif',
            fontWeight: 900,
            fontSize:   'clamp(4rem, 10vw, 13rem)',
          }}
        >
          About{' '}
          <span
            style={{
              fontFamily: 'var(--font-instrument), Georgia, serif',
              fontStyle:  'italic',
              fontWeight: 400,
              color:      'rgba(10,10,10,0.30)',
            }}
          >
            Me
          </span>
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(3rem,6vw,8rem)]">

          {/* Left: stats */}
          <div ref={statsRef} className="grid grid-cols-2 gap-x-8 gap-y-12 content-start">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 28, clipPath: 'inset(100% 0 0 0)' }}
                animate={statsInView ? { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              >
                <p
                  className="font-black text-black leading-none tracking-tighter tabular-nums"
                  style={{
                    fontFamily: 'Satoshi, system-ui, sans-serif',
                    fontWeight: 900,
                    fontSize:   'clamp(3.5rem, 7vw, 9rem)',
                  }}
                >
                  <CountUp
                    target={stat.target}
                    suffix={stat.suffix}
                    inView={statsInView}
                    delay={i * 0.12}
                  />
                </p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={statsInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: EASE }}
                  className="mt-2 text-[0.75rem] font-semibold tracking-[0.14em] uppercase text-black/40"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  {stat.label}
                </motion.p>

                {/* Underline draws in after the number settles */}
                <motion.div
                  className="mt-4 h-px bg-black/10"
                  initial={{ scaleX: 0, transformOrigin: 'left' }}
                  animate={statsInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: EASE }}
                />
              </motion.div>
            ))}
          </div>

          {/* Right: quote + body + image */}
          <div className="flex flex-col justify-between gap-10">

            <AnimatedQuote inView={sectionInView} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              className="space-y-5"
            >
              <p
                className="text-black/55 leading-relaxed"
                style={{
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontWeight: 400,
                  fontSize:   'clamp(1.05rem, 1.5vw, 1.3rem)',
                }}
              >
                Pursuing a B.Tech in Computer Science Engineering at VIT Bhopal. 
                I specialize in full-stack web development and machine learning, 
                building robust platforms and intelligent AI models from the ground up.
              </p>
              <p
                className="text-black/40 leading-relaxed"
                style={{
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontWeight: 400,
                  fontSize:   'clamp(1rem, 1.3vw, 1.15rem)',
                }}
              >
                I have built impactful projects including an AI-driven Mental Health Detection tool using CNNs, a GIS-based Urban Growth Analyzer leveraging U-Net, and SuMoPy for sustainable mobility optimization. My core stack includes React, Node.js, Python, TensorFlow, and AWS.
              </p>

              <motion.div
                className="flex gap-4 pt-2"
                initial={{ opacity: 0 }}
                animate={sectionInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
              >
                <a
                  href="https://github.com/Milindverma24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.65rem] tracking-[0.18em] uppercase font-medium text-black/40 hover:text-black border-b border-black/20 hover:border-black pb-px transition-colors"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/milind-verma-8aa10a308/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.65rem] tracking-[0.18em] uppercase font-medium text-black/40 hover:text-black border-b border-black/20 hover:border-black pb-px transition-colors"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  LinkedIn
                </a>
              </motion.div>
            </motion.div>


          </div>
        </div>
      </div>
    </section>
  );
}
