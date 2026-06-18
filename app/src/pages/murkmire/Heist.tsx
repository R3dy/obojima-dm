import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, RotateCcw } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { murkmireSections } from './sections';

const ACCENT = '#3E7C6A';
const ACCENT_LIGHT = '#6FB3A0';
const GOLD = '#C9A84C';

const revealUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: (i ?? 0) * 0.06, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export default function Heist() {
  const [completed, setCompleted] = useLocalStorage<Record<string, boolean>>('murkmire-progress', {});
  const toggle = (route: string) => setCompleted((prev) => ({ ...prev, [route]: !prev[route] }));
  const reset = () => setCompleted({});
  const doneCount = murkmireSections.filter((s) => completed[s.route]).length;

  return (
    <div className="min-h-screen" style={{ background: '#1A1410', color: '#F5F0E6' }}>
      {/* HERO */}
      <section className="relative min-h-[52vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <div className="w-full h-full" style={{ background: `radial-gradient(120% 120% at 50% 0%, ${ACCENT}26 0%, #1A1410 55%, #100c0a 100%)` }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(26,20,16,0.3) 0%, rgba(26,20,16,0.8) 60%, #1A1410 100%)' }} />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[0.75rem] tracking-[0.2em] uppercase block mb-4" style={{ fontFamily: "'Cinzel Decorative', serif", color: ACCENT_LIGHT }}>
              The Heist · Run of Show
            </span>
            <h1 className="text-display-lg mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>
              One Night at the Museum
            </h1>
            <p className="text-[1.1rem] max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.7)' }}>
              The crew can crack this job a dozen ways — but the night runs through six beats, from Dr. Dannell&apos;s
              plea to the egg in her hands before midnight. Each beat has its own page; run them in order, or jump to
              whichever the table reaches next.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-8 flex justify-center">
            <ChevronDown size={20} color={ACCENT} className="animate-bounce" />
          </motion.div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-24">
        {/* TRACKER HEADER */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <span className="text-[0.7rem] tracking-[0.12em] uppercase" style={{ fontFamily: "'Cinzel Decorative', serif", color: ACCENT_LIGHT }}>
            Heist Tracker
          </span>
          <div className="flex items-center gap-2">
            <span className="text-stat text-[0.8rem]" style={{ color: 'rgba(143,166,120,0.9)' }}>
              {doneCount}/{murkmireSections.length} beats
            </span>
            {doneCount > 0 && (
              <button
                type="button"
                onClick={reset}
                aria-label="Reset progress"
                title="Reset progress"
                className="p-1 rounded-md transition-colors"
                style={{ color: 'rgba(245,240,230,0.4)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT_LIGHT)}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,230,0.4)')}
              >
                <RotateCcw size={13} />
              </button>
            )}
          </div>
        </div>

        {/* SECTION INDEX */}
        <div className="space-y-3">
          {murkmireSections.map((section, i) => {
            const Icon = section.icon;
            const done = !!completed[section.route];
            return (
              <motion.div
                key={section.route}
                variants={revealUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                className="group flex items-stretch gap-3 rounded-xl overflow-hidden transition-all duration-300"
                style={{ background: done ? 'rgba(62,124,106,0.12)' : 'rgba(245,240,230,0.04)', border: `1px solid ${done ? `${ACCENT_LIGHT}59` : 'rgba(245,240,230,0.1)'}` }}
              >
                <button
                  type="button"
                  onClick={() => toggle(section.route)}
                  aria-pressed={done}
                  aria-label={done ? `Mark beat ${section.num} incomplete` : `Mark beat ${section.num} complete`}
                  className="flex items-center justify-center px-4 shrink-0 transition-colors"
                  style={{ background: 'rgba(0,0,0,0.15)' }}
                >
                  {done ? <CheckCircle2 size={22} color={ACCENT_LIGHT} /> : <Circle size={22} color="rgba(245,240,230,0.35)" />}
                </button>

                <Link to={section.route} onClick={scrollTop} className="flex items-center gap-4 flex-1 py-4 pr-4 min-w-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${section.accent}22`, border: `1px solid ${section.accent}44` }}>
                    <Icon size={18} color={section.accent} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[0.62rem] tracking-[0.12em] uppercase" style={{ fontFamily: "'Cinzel Decorative', serif", color: section.accent }}>
                      Beat {section.num}
                    </span>
                    <h2 className="text-[1.2rem] font-semibold leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>
                      {section.title}
                    </h2>
                    <p className="text-[0.85rem] leading-snug mt-0.5 hidden sm:block" style={{ color: 'rgba(245,240,230,0.6)' }}>
                      {section.blurb}
                    </p>
                  </div>
                  <ChevronRight size={18} color={section.accent} className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* BEGIN CTA */}
        <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="flex justify-center mt-10">
          <Link
            to="/briefing"
            onClick={scrollTop}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${ACCENT}33 0%, rgba(22,36,31,0.6) 100%)`, border: `1px solid ${ACCENT}4D` }}
          >
            <div className="flex flex-col items-start">
              <span className="text-[0.65rem] tracking-[0.12em] uppercase" style={{ fontFamily: "'Cinzel Decorative', serif", color: ACCENT_LIGHT }}>
                Start Here
              </span>
              <span className="text-[0.95rem] font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>
                Beat 1 · The Briefing
              </span>
            </div>
            <ChevronRight size={20} color={GOLD} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
