import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Landmark,
  Map as MapIcon,
  BookOpen,
  X,
  ChevronLeft,
  ChevronRight,
  MousePointerClick,
  ArrowUpRight,
} from 'lucide-react';
import { SkillCheck } from '../../components/DMCallouts';
import Figure from './Figure';
import OptImage from '../../components/OptImage';
import { museumAreas, type MuseumArea } from './museumAreas';

const ACCENT = '#3E7C6A';
const ACCENT_LIGHT = '#6FB3A0';

const generalFeatures = [
  'Ceilings are 30 feet high throughout.',
  'Interior doors are closed and locked (except the privies, V15) — DC 12 Dexterity (thieves’ tools); a door with an enabled alarm sounds it if picked.',
  'Most areas are lit by continual flame sconces; V1, V12, V16, and V17 are dim light.',
  'Secret doors are found with a DC 12 Wisdom (Perception) check; the matching door inside a supply hall needs no check.',
];

/* ------------------------------------------------------------------ */
/*  Interactive DM map — numbered pins open each area's modal.         */
/* ------------------------------------------------------------------ */

function InteractiveMap({ activeId, onSelect }: { activeId: string | null; onSelect: (id: string) => void }) {
  return (
    <figure className="my-2 rounded-xl overflow-hidden" style={{ border: `1px solid ${ACCENT}33`, background: 'rgba(16,12,10,0.5)' }}>
      <div className="relative">
        <OptImage
          src="/murkmire/map_museum_dm.webp"
          alt="Map 1.2 — DM's map of the museum, labelled V1–V17"
          className="w-full h-auto block select-none"
          style={{ display: 'block' }}
        />
        {museumAreas.map((area) => {
          const isActive = activeId === area.id;
          return (
            <button
              key={area.id}
              type="button"
              onClick={() => onSelect(area.id)}
              aria-label={`Open ${area.pin} · ${area.shortName}`}
              title={`${area.pin} · ${area.shortName}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full font-bold transition-all duration-200 hover:scale-125 focus:outline-none focus:scale-125"
              style={{
                left: `${area.coords.x}%`,
                top: `${area.coords.y}%`,
                width: 'clamp(20px, 4.4vw, 30px)',
                height: 'clamp(20px, 4.4vw, 30px)',
                fontSize: 'clamp(8px, 1.6vw, 11px)',
                background: isActive ? area.accent : 'rgba(26,20,16,0.82)',
                color: isActive ? '#1A1410' : '#F5F0E6',
                border: `2px solid ${area.accent}`,
                boxShadow: isActive ? `0 0 0 4px ${area.accent}55` : '0 2px 6px rgba(0,0,0,0.5)',
              }}
            >
              {area.pin}
            </button>
          );
        })}
      </div>
      <figcaption className="px-4 py-2.5 flex items-center justify-center gap-2 text-center" style={{ background: 'rgba(22,36,31,0.6)' }}>
        <MousePointerClick size={14} color={ACCENT_LIGHT} />
        <span className="text-[0.75rem] tracking-wider uppercase" style={{ fontFamily: "'Cinzel Decorative', serif", color: ACCENT_LIGHT }}>
          Map 1.2 · DM Map — tap a key for room details
        </span>
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Area modal — full content for a single keyed area.                 */
/* ------------------------------------------------------------------ */

function AreaModal({
  area,
  onClose,
  onPrev,
  onNext,
}: {
  area: MuseumArea;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const Icon = area.icon;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'ArrowLeft') onPrev();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ zIndex: 60 }} role="dialog" aria-modal="true" aria-labelledby="area-modal-title">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0"
        style={{ background: 'rgba(8,6,5,0.78)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[88dvh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
        style={{ background: 'linear-gradient(160deg, #16241F 0%, #100c0a 100%)', border: `1px solid ${area.accent}55`, boxShadow: '0 -8px 40px rgba(0,0,0,0.5)' }}
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10 flex items-start gap-3 px-5 sm:px-7 py-4 backdrop-blur-md" style={{ background: 'rgba(16,12,10,0.85)', borderBottom: `1px solid ${area.accent}33` }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${area.accent}22`, border: `1px solid ${area.accent}44` }}>
            <Icon size={20} color={area.accent} />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-label text-[0.62rem] tracking-[0.12em] uppercase" style={{ color: area.accent }}>{area.tag}</span>
            <h2 id="area-modal-title" className="text-heading-lg text-parchment leading-tight">
              <span style={{ color: area.accent }}>{area.pin}</span> · {area.shortName}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 p-2 rounded-lg transition-colors"
            style={{ color: 'rgba(245,240,230,0.6)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F0E6')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,230,0.6)')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 sm:px-7 py-5">
          {area.readAloud && (
            <div className="relative rounded-xl p-5 mb-5 border-l-4" style={{ background: 'rgba(107, 76, 122, 0.1)', borderLeftColor: '#6B4C7A', borderTop: '1px solid rgba(107, 76, 122, 0.2)', borderRight: '1px solid rgba(107, 76, 122, 0.2)', borderBottom: '1px solid rgba(107, 76, 122, 0.2)' }}>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={15} color="#A084B0" />
                <span className="text-label text-[0.68rem] tracking-[0.12em] uppercase" style={{ color: '#A084B0' }}>Read Aloud</span>
              </div>
              <p className="font-body text-[1.02rem] leading-relaxed italic" style={{ color: '#E8DFF0' }}>{area.readAloud}</p>
            </div>
          )}

          <h3 className="text-label text-[0.66rem] tracking-[0.12em] uppercase mb-2" style={{ color: area.accent }}>Running the Room</h3>
          <p className="font-body text-[0.97rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.82)' }}>{area.description}</p>

          <h3 className="text-label text-[0.66rem] tracking-[0.12em] uppercase mt-6 mb-2" style={{ color: area.accent }}>Notes &amp; Features</h3>
          <ul className="space-y-2">
            {area.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 font-body text-[0.9rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.78)' }}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: area.accent }} />
                {f}
              </li>
            ))}
          </ul>

          {area.check && (
            <SkillCheck dc={area.check.dc} skill={area.check.skill} title={area.check.title} pass={area.check.pass} fail={area.check.fail} />
          )}

          {area.links && area.links.length > 0 && (
            <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(245,240,230,0.08)' }}>
              <h3 className="text-label text-[0.66rem] tracking-[0.12em] uppercase mb-2" style={{ color: ACCENT_LIGHT }}>Jump To</h3>
              <div className="flex flex-wrap gap-2">
                {area.links.map((link) => (
                  <Link
                    key={link.route + link.label}
                    to={link.route}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.82rem] font-body transition-colors"
                    style={{ background: 'rgba(245,240,230,0.05)', border: `1px solid ${ACCENT}40`, color: 'rgba(245,240,230,0.85)' }}
                  >
                    {link.label}
                    <ArrowUpRight size={13} color={ACCENT_LIGHT} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div className="sticky bottom-0 flex items-center justify-between gap-3 px-5 sm:px-7 py-3 backdrop-blur-md" style={{ background: 'rgba(16,12,10,0.85)', borderTop: `1px solid ${area.accent}33` }}>
          <button type="button" onClick={onPrev} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.82rem] font-body transition-colors" style={{ color: 'rgba(245,240,230,0.7)' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F0E6')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,230,0.7)')}>
            <ChevronLeft size={16} /> Prev
          </button>
          <span className="text-[0.7rem] tracking-wider" style={{ color: 'rgba(245,240,230,0.4)' }}>{area.pin}</span>
          <button type="button" onClick={onNext} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.82rem] font-body transition-colors" style={{ color: 'rgba(245,240,230,0.7)' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F0E6')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,230,0.7)')}>
            Next <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */

export default function Museum() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIndex = museumAreas.findIndex((a) => a.id === activeId);
  const activeArea = activeIndex >= 0 ? museumAreas[activeIndex] : null;

  const close = useCallback(() => setActiveId(null), []);
  const prev = useCallback(() => {
    setActiveId((cur) => {
      const i = museumAreas.findIndex((a) => a.id === cur);
      if (i < 0) return cur;
      return museumAreas[(i - 1 + museumAreas.length) % museumAreas.length].id;
    });
  }, []);
  const next = useCallback(() => {
    setActiveId((cur) => {
      const i = museumAreas.findIndex((a) => a.id === cur);
      if (i < 0) return cur;
      return museumAreas[(i + 1) % museumAreas.length].id;
    });
  }, []);

  return (
    <div className="min-h-[100dvh] pt-16">
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Landmark size={22} color={ACCENT} />
              <span className="text-label tracking-[0.12em]" style={{ color: ACCENT_LIGHT }}>THE MUSEUM</span>
            </div>
            <h1 className="text-display-md text-parchment">Varkenbluff Museum of Natural History</h1>
            <p className="font-body text-[1.05rem] mt-4 max-w-[640px] mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
              Two floors, a basement, and an attic — seventeen keyed areas, all on Map 1.2. Tap any key on the map or in
              the directory below to pull up that room&apos;s read-aloud text, DM notes, and checks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* INTERACTIVE DM MAP */}
      <section className="px-4 pb-4">
        <div className="max-w-container-narrow mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <MapIcon size={18} color={ACCENT} />
            <h2 className="text-heading-lg text-parchment">Interactive Map</h2>
          </div>
          <InteractiveMap activeId={activeId} onSelect={setActiveId} />
        </div>
      </section>

      {/* AREA DIRECTORY */}
      <section className="px-4 pb-4 pt-4">
        <div className="max-w-container-narrow mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <MousePointerClick size={18} color={ACCENT} />
            <h2 className="text-heading-lg text-parchment">Area Directory</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {museumAreas.map((area) => {
              const Icon = area.icon;
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => setActiveId(area.id)}
                  className="group flex items-center gap-3 rounded-xl p-3 text-left transition-all duration-200 hover:scale-[1.03]"
                  style={{ background: 'linear-gradient(135deg, #16241F 0%, #12100D 100%)', border: `1px solid ${ACCENT}26`, borderLeft: `3px solid ${area.accent}` }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${area.accent}22`, border: `1px solid ${area.accent}44` }}>
                    <Icon size={17} color={area.accent} />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-stat text-[0.72rem] font-bold" style={{ color: area.accent }}>{area.pin}</span>
                    <span className="block text-[0.85rem] leading-tight truncate" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>{area.shortName}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* OTHER MAPS & HANDOUTS */}
      <section className="px-4 pb-4 pt-6">
        <div className="max-w-container-narrow mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <MapIcon size={18} color={ACCENT} />
            <h2 className="text-heading-lg text-parchment">Player Maps &amp; Handouts</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Figure src="/murkmire/map_museum_player.webp" alt="Map 1.2 — player version with no labels" caption="Map 1.2 · Player Map" kind="map" className="h-72" fit="contain" />
            <Figure src="/murkmire/handout_players_map.webp" alt="Map 1.1 — Dr. Dannell's hand-drawn sketch of the museum" caption="Map 1.1 · Dr. Dannell's Sketch" kind="handout" className="h-72" fit="contain" />
            <Figure src="/murkmire/scene_gala.webp" alt="The opening gala — the Murkmire Stone on its pedestal" caption="Scene · The Opening Gala" kind="handout" className="h-72" fit="cover" />
          </div>
        </div>
      </section>

      {/* GENERAL FEATURES */}
      <section className="px-4 pb-24 pt-2">
        <div className="max-w-container-narrow mx-auto">
          <div className="rounded-2xl p-6 sm:p-7" style={{ background: 'rgba(62,124,106,0.1)', border: `1px solid ${ACCENT}33` }}>
            <h2 className="text-heading-lg text-parchment mb-3">General Features</h2>
            <ul className="space-y-2">
              {generalFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-[0.92rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.78)' }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: ACCENT_LIGHT }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeArea && <AreaModal key="area-modal" area={activeArea} onClose={close} onPrev={prev} onNext={next} />}
      </AnimatePresence>
    </div>
  );
}
