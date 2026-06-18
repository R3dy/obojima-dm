import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { sectionByNum } from './sections';

const ACCENT = '#3E7C6A';
const ACCENT_LIGHT = '#6FB3A0';
const GOLD = '#C9A84C';

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

/* ------------------------------------------------------------------ */
/*  Section hero — the consistent header atop every section page.      */
/* ------------------------------------------------------------------ */

export function SectionHero({ num, subtitle }: { num: number; subtitle: React.ReactNode }) {
  const section = sectionByNum(num);
  if (!section) return null;
  const Icon = section.icon;

  return (
    <section className="relative py-16 sm:py-20 px-4">
      <div className="max-w-container-narrow mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon size={22} color={section.accent} />
            <span className="text-label tracking-[0.12em]" style={{ color: section.accent }}>
              THE HEIST · BEAT {num} OF 6
            </span>
          </div>
          <h1 className="text-display-md text-parchment">{section.title}</h1>
          <p className="font-body text-[1.05rem] mt-4 leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Prev / next stepper that chains the six section pages together.    */
/* ------------------------------------------------------------------ */

export function SectionNav({ current }: { current: number }) {
  const prev = sectionByNum(current - 1);
  const next = sectionByNum(current + 1);

  return (
    <nav className="mt-14 pt-8 border-t" style={{ borderColor: `${ACCENT}26` }} aria-label="Heist sections">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prev ? (
          <Link
            to={prev.route}
            onClick={scrollTop}
            className="group flex items-center gap-3 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
            style={{ background: 'rgba(245,240,230,0.04)', border: `1px solid ${prev.accent}40` }}
          >
            <ChevronLeft size={20} color={prev.accent} className="shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5" />
            <div className="min-w-0">
              <span className="block text-[0.6rem] tracking-[0.14em] uppercase" style={{ fontFamily: "'Cinzel Decorative', serif", color: ACCENT_LIGHT }}>
                Beat {prev.num} · Previous
              </span>
              <span className="block text-[0.95rem] font-semibold truncate" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>
                {prev.navLabel}
              </span>
            </div>
          </Link>
        ) : (
          <span aria-hidden className="hidden sm:block" />
        )}

        {next && (
          <Link
            to={next.route}
            onClick={scrollTop}
            className="group flex items-center justify-end gap-3 rounded-xl p-4 text-right transition-all duration-300 hover:scale-[1.02] sm:col-start-2"
            style={{ background: `linear-gradient(135deg, ${next.accent}1f 0%, rgba(22,36,31,0.5) 100%)`, border: `1px solid ${next.accent}59` }}
          >
            <div className="min-w-0">
              <span className="block text-[0.6rem] tracking-[0.14em] uppercase" style={{ fontFamily: "'Cinzel Decorative', serif", color: ACCENT_LIGHT }}>
                Beat {next.num} · Next
              </span>
              <span className="block text-[0.95rem] font-semibold truncate" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>
                {next.navLabel}
              </span>
            </div>
            <ChevronRight size={20} color={next.accent} className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Small reusable roll/reference table.                               */
/* ------------------------------------------------------------------ */

export function DataTable({
  columns,
  rows,
  accent = ACCENT_LIGHT,
  align,
}: {
  columns: [string, string];
  rows: [string, string][];
  accent?: string;
  align?: 'center';
}) {
  return (
    <div className="rounded-xl overflow-hidden my-4" style={{ border: `1px solid ${ACCENT}26` }}>
      <table className="w-full text-left">
        <thead>
          <tr style={{ background: 'rgba(22,36,31,0.8)' }}>
            <th className={`px-4 py-2 text-stat text-[0.7rem] ${align === 'center' ? 'text-center w-24' : 'w-12'}`} style={{ color: accent }}>
              {columns[0]}
            </th>
            <th className={`px-4 py-2 text-stat text-[0.7rem] ${align === 'center' ? 'text-center' : ''}`} style={{ color: accent }}>
              {columns[1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k} className="border-t" style={{ borderColor: 'rgba(245,240,230,0.06)' }}>
              <td className={`px-4 py-2 text-stat text-[0.8rem] align-top ${align === 'center' ? 'text-center' : ''}`} style={{ color: GOLD }}>
                {k}
              </td>
              <td className={`px-4 py-2 font-body text-[0.85rem] leading-snug ${align === 'center' ? 'text-center' : ''}`} style={{ color: 'rgba(245,240,230,0.78)' }}>
                {v}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
