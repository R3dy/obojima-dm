import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Users,
  Shield,
  Map,
  Clock,
  ScrollText,
  Sword,
  FlaskConical,
  BookOpen,
  PawPrint,
  Home as HomeIcon,
  ChevronDown,
  TreePine,
  Route,
  Sparkles,
  Backpack,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  PORTAL DATA                                                        */
/* ------------------------------------------------------------------ */

const portals = [
  {
    route: '/adventure',
    label: 'Adventure Flow',
    icon: Route,
    accent: '#C9A84C',
    description: 'Chronological scene-by-scene DM guide',
  },
  {
    route: '/overview',
    label: 'Adventure Overview',
    icon: ScrollText,
    accent: '#B87333',
    description: 'Premise, narrative arc, and key revelations',
  },
  {
    route: '/okiri',
    label: 'Okiri Village',
    icon: TreePine,
    accent: '#4A5D3F',
    description: 'Local lore, NPCs, points of interest, and hooks',
  },
  {
    route: '/npcs',
    label: 'Characters',
    icon: Users,
    accent: '#B87333',
    description: 'Six NPCs with bios, traits, and DM guidance',
  },
  {
    route: '/workshop',
    label: 'The Workshop',
    icon: HomeIcon,
    accent: '#B87333',
    description: 'Exterior, magical properties, and entry points',
  },
  {
    route: '/locations',
    label: 'Locations',
    icon: Map,
    accent: '#6B7FA0',
    description: 'Three areas with interactive battlemaps',
  },
  {
    route: '/encounters',
    label: 'Encounters',
    icon: Sword,
    accent: '#8B3A3A',
    description: 'Combat scenarios and environmental hazards',
  },
  {
    route: '/bestiary',
    label: 'Bestiary',
    icon: PawPrint,
    accent: '#4A5D3F',
    description: 'Three monster stat blocks with original art',
  },
  {
    route: '/potions',
    label: 'Potions',
    icon: FlaskConical,
    accent: '#6B4C7A',
    description: 'Nine magical brews across three categories',
  },
  {
    route: '/conclusion',
    label: 'Conclusion',
    icon: BookOpen,
    accent: '#C9A84C',
    description: 'Endings, hooks, and the letter\'s mystery',
  },
];

const playerOptionPortals = [
  {
    route: '/subclasses',
    label: 'Subclasses',
    icon: Sparkles,
    accent: '#C9A84C',
    description: 'New subclasses woven into Obojima\'s culture',
  },
  {
    route: '/feats',
    label: 'Feats & Conditions',
    icon: Shield,
    accent: '#8B3A3A',
    description: 'Island feats, skill uses, and local conditions',
  },
  {
    route: '/gear',
    label: 'Backgrounds & Gear',
    icon: Backpack,
    accent: '#4A5D3F',
    description: 'Backgrounds, starting wealth, and unique gear',
  },
];

const infoItems = [
  { icon: Users, label: '2\u20134 Players' },
  { icon: Shield, label: '2nd Level' },
  { icon: Map, label: 'Obojima Setting' },
  { icon: Clock, label: '~2\u20133 Hours' },
];

/* ------------------------------------------------------------------ */
/*  HOME COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const infoBarRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const portalsHeaderRef = useRef<HTMLDivElement>(null);
  const portalsGridRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [chevronVisible, setChevronVisible] = useState(true);

  /* ---- mouse parallax for hero background (rAF-throttled, no re-render) ---- */
  useEffect(() => {
    // Respect reduced-motion and skip parallax entirely on touch / coarse pointers.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReduced || isCoarse) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 15;
      targetY = (e.clientY / window.innerHeight - 0.5) * 15;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (heroBgRef.current) {
          heroBgRef.current.style.transform = `translate(${targetX}px, ${targetY}px) scale(1.05)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* ---- chevron scroll visibility ---- */
  useEffect(() => {
    const onScroll = () => {
      setChevronVisible(window.scrollY < 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---- GSAP animations ---- */
  useGSAP(() => {
    /* Reduced motion: reveal everything immediately, skip the timelines. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const revealTargets = gsap.utils.toArray<Element>([
        heroBgRef.current,
        subtitleRef.current,
        ctaRef.current?.querySelectorAll('.cta-btn'),
        titleRef.current?.querySelectorAll('.char'),
        infoBarRef.current?.querySelectorAll('.info-item'),
        summaryRef.current,
        summaryRef.current?.querySelectorAll('.reveal-child'),
        portalsHeaderRef.current,
        portalsGridRef.current?.querySelectorAll('.portal-card'),
        footerRef.current,
      ]);
      gsap.set(revealTargets, { opacity: 1, y: 0, scale: 1 });
      if (dividerRef.current) gsap.set(dividerRef.current, { scaleX: 1 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    /* Hero entrance sequence */
    if (heroBgRef.current) {
      tl.fromTo(heroBgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0);
    }

    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      tl.fromTo(
        chars,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.03 },
        0.3
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 1.0);
    }

    if (dividerRef.current) {
      tl.fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 1.2);
    }

    if (ctaRef.current) {
      const buttons = ctaRef.current.querySelectorAll('.cta-btn');
      tl.fromTo(
        buttons,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1 },
        1.4
      );
    }

    /* Info bar scroll reveal */
    if (infoBarRef.current) {
      const items = infoBarRef.current.querySelectorAll('.info-item');
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: infoBarRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    /* Adventure summary card */
    if (summaryRef.current) {
      const children = summaryRef.current.querySelectorAll('.reveal-child');
      gsap.fromTo(
        summaryRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: summaryRef.current, start: 'top 85%' },
        }
      );
      gsap.fromTo(
        children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.2,
          scrollTrigger: { trigger: summaryRef.current, start: 'top 85%' },
        }
      );
    }

    /* Portals section header */
    if (portalsHeaderRef.current) {
      gsap.fromTo(
        portalsHeaderRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: { trigger: portalsHeaderRef.current, start: 'top 80%' },
        }
      );
    }

    /* Portals grid staggered reveal */
    if (portalsGridRef.current) {
      const cards = portalsGridRef.current.querySelectorAll('.portal-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: portalsGridRef.current, start: 'top 75%' },
        }
      );
    }

    /* Footer */
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
        }
      );
    }
  }, { scope: containerRef });

  /* ---- smooth scroll to portals ---- */
  const scrollToPortals = useCallback(() => {
    portalsHeaderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  /* ---- split title into chars ---- */
  const titleText = 'THE CURIOUS WORLD WITHIN';
  const titleChars = titleText.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <div ref={containerRef}>
      {/* ============================================================ */}
      {/* HERO SECTION                                                  */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      >
        {/* Background image with parallax */}
        <div
          ref={heroBgRef}
          className="absolute inset-0 opacity-0"
          style={{ willChange: 'transform' }}
        >
          <img
            src="/cover_art.jpeg"
            alt="The Curious World Within cover art"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(26,20,16,0) 0%, rgba(26,20,16,0.7) 60%, rgba(26,20,16,1) 100%)',
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 max-w-[900px] mx-auto">
          <h1
            ref={titleRef}
            className="text-display-xl text-parchment"
            style={{ textShadow: '0 2px 40px rgba(0,0,0,0.6)' }}
          >
            {titleChars}
          </h1>

          <p
            ref={subtitleRef}
            className="font-body text-[1.15rem] mt-4 opacity-0"
            style={{
              color: '#D4956A',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Tales From The Tall Grass &middot; A DM&apos;s Companion
          </p>

          {/* Divider */}
          <div className="flex justify-center my-6">
            <div
              ref={dividerRef}
              className="w-[60px] h-px origin-center"
              style={{
                background:
                  'linear-gradient(90deg, rgba(184,115,51,0) 0%, rgba(184,115,51,0.6) 50%, rgba(184,115,51,0) 100%)',
              }}
            />
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              to="/adventure"
              className="cta-btn inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-body font-semibold text-sm opacity-0 transition-all duration-200 hover:scale-[1.03]"
              style={{
                backgroundColor: '#B87333',
                color: '#1A1410',
                letterSpacing: '0.05em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#D4956A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#B87333';
              }}
            >
              Begin Adventure
            </Link>
            <button
              onClick={scrollToPortals}
              className="cta-btn inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-body font-semibold text-sm opacity-0 transition-all duration-200 hover:scale-[1.03]"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(184,115,51,0.5)',
                color: '#D4956A',
                letterSpacing: '0.05em',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(184,115,51,1)';
                e.currentTarget.style.color = '#F5F0E6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(184,115,51,0.5)';
                e.currentTarget.style.color = '#D4956A';
              }}
            >
              Jump to Reference
            </button>
          </div>
        </div>

        {/* Scroll-down chevron */}
        {chevronVisible && (
          <div
            ref={chevronRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-pulse-chevron"
          >
            <ChevronDown size={28} color="#B87333" />
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* ADVENTURE INFO BAR                                            */}
      {/* ============================================================ */}
      <section
        ref={infoBarRef}
        className="w-full py-4 flex items-center justify-center flex-wrap gap-6 sm:gap-10 px-4"
        style={{
          backgroundColor: 'rgba(62,74,94,0.3)',
          borderTop: '1px solid rgba(107,127,160,0.2)',
          borderBottom: '1px solid rgba(107,127,160,0.2)',
        }}
      >
        {infoItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="info-item flex items-center gap-2 opacity-0"
            >
              <Icon size={18} color="#B87333" />
              <span
                className="font-body text-sm"
                style={{ color: 'rgba(245,240,230,0.8)' }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </section>

      {/* ============================================================ */}
      {/* ADVENTURE SUMMARY CARD                                        */}
      {/* ============================================================ */}
      <section className="relative px-4" style={{ backgroundColor: '#1A1410' }}>
        <div
          ref={summaryRef}
          className="relative -mt-[60px] mx-auto max-w-[800px] rounded-2xl p-8 sm:p-12 opacity-0"
          style={{
            background: 'rgba(45, 32, 22, 0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(184,115,51,0.2)',
            zIndex: 10,
          }}
        >
          <p className="reveal-child text-label text-center text-copper">
            ADVENTURE HOOK
          </p>
          <h2 className="reveal-child text-display-md text-parchment text-center mt-2">
            The Tiny Heroes
          </h2>
          <div className="mt-6 space-y-4">
            <p className="reveal-child font-body text-[1.15rem] leading-relaxed text-parchment" style={{ opacity: 0.9 }}>
              The adventurers decide to help out a young postal knight named Lomi
              and find themselves shrunk to Tiny size when they infiltrate Miss
              Lindley&apos;s witch workshop to retrieve a misdelivered letter. What
              began as a simple favor becomes a perilous journey through a world
              where every bookshelf is a cliff face, every staircase a mountainside,
              and every beetle a terrifying monster.
            </p>
            <p className="reveal-child font-body text-[1.15rem] leading-relaxed text-parchment" style={{ opacity: 0.9 }}>
              As they navigate the strange landscape at mouse-size, they&apos;ll
              fend off bora bugs, handle pixie tricksters, talk to a giant cat, and
              perhaps even fight a giant Venus fly rat &mdash; all while searching
              for a way to return to normal size and recover the missing letter.
            </p>
          </div>
          <div className="reveal-child mt-6 text-center">
            <Link
              to="/adventure"
              className="inline-flex items-center gap-2 font-body transition-colors duration-200 hover:underline"
              style={{ color: '#B87333' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#D4956A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#B87333';
              }}
            >
              Read the Full Story &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* NAVIGATION PORTALS GRID                                       */}
      {/* ============================================================ */}
      <section className="w-full px-4 py-24 sm:py-32" style={{ backgroundColor: '#1A1410' }}>
        <div className="max-w-container mx-auto">
          {/* Section header */}
          <div ref={portalsHeaderRef} className="text-center mb-12 opacity-0">
            <p className="text-label text-copper">QUICK ACCESS</p>
            <h2 className="text-display-md text-parchment mt-2">Choose Your Path</h2>
          </div>

          {/* Portal grid */}
          <div
            ref={portalsGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {portals.map((portal, idx) => {
              const Icon = portal.icon;
              return (
                <Link
                  key={idx}
                  to={portal.route}
                  className="portal-card group block rounded-xl p-6 text-center opacity-0 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #2D2016 0%, #1E1610 100%)',
                    border: '1px solid rgba(184,115,51,0.15)',
                    borderBottom: `3px solid ${portal.accent}4D`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${portal.accent}66`;
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = `0 8px 30px ${portal.accent}14`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(184,115,51,0.15)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 mb-3 transition-all duration-300 group-hover:scale-[1.15]"
                    style={{ color: portal.accent }}
                  >
                    <Icon size={40} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-heading-lg text-parchment mt-2">
                    {portal.label}
                  </h3>
                  <p
                    className="font-body text-sm mt-2 line-clamp-2"
                    style={{ color: 'rgba(245,240,230,0.6)' }}
                  >
                    {portal.description}
                  </p>
                </Link>
              );
            })}
          </div>

          {/* Player Options sub-section */}
          <div className="text-center mt-20 mb-10">
            <p className="text-label text-copper">FOR YOUR PLAYERS</p>
            <h2 className="text-display-md text-parchment mt-2">Player Options</h2>
            <p className="font-body text-sm mt-3 max-w-[560px] mx-auto" style={{ color: 'rgba(245,240,230,0.6)' }}>
              Obojima-specific character options to share with the table.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {playerOptionPortals.map((portal, idx) => {
              const Icon = portal.icon;
              return (
                <Link
                  key={idx}
                  to={portal.route}
                  className="group block rounded-xl p-6 text-center transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #2D2016 0%, #1E1610 100%)',
                    border: '1px solid rgba(184,115,51,0.15)',
                    borderBottom: `3px solid ${portal.accent}4D`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${portal.accent}66`;
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = `0 8px 30px ${portal.accent}14`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(184,115,51,0.15)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 mb-3 transition-all duration-300 group-hover:scale-[1.15]"
                    style={{ color: portal.accent }}
                  >
                    <Icon size={40} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-heading-lg text-parchment mt-2">
                    {portal.label}
                  </h3>
                  <p
                    className="font-body text-sm mt-2 line-clamp-2"
                    style={{ color: 'rgba(245,240,230,0.6)' }}
                  >
                    {portal.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER (extra - beyond global footer)                        */}
      {/* ============================================================ */}
      <div ref={footerRef} className="opacity-0" />
    </div>
  );
}
