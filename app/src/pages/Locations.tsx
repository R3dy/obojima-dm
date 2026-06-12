import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, X, ZoomIn } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  LOCATION DATA                                                      */
/* ------------------------------------------------------------------ */

interface LocationMap {
  id: string;
  name: string;
  description: string;
  image: string;
  gridScale: string;
  details: string[];
}

const locations: LocationMap[] = [
  {
    id: 'cellar',
    name: 'The Cellar',
    description:
      'A shadowy cellar that serves as Miss Lindley\'s catch-all room, storing old projects, spare supplies, and potion ingredients she rarely uses. The first point of entry for most adventurers.',
    image: '/map_cellar_faithful.png',
    gridScale: '1 square = 5 feet',
    details: [
      'Paw prints and claw marks from what appears to be a cat — which at Tiny size seem massive',
      'Spoiled and unfinished elixirs and potions on sagging shelves',
      'An uncommon ingredient from a region other than the Gift of Shuritashi',
      'An old, broken First Age trinket among the crates',
      'Arcane glyphs on the floor that trigger the shrink trap',
    ],
  },
  {
    id: 'main-floor',
    name: 'Main Floor',
    description:
      'The workshop\'s main floor where Miss Lindley conducts her magical experiments. Bookshelves become cliff faces and every surface holds new dangers at Tiny size.',
    image: '/map_main_floor_faithful.jpeg',
    gridScale: '1 square = 5 feet',
    details: [
      'Towering bookshelves filled with centuries of arcane tomes',
      'Work benches cluttered with bubbling concoctions and magical reagents',
      'Pixie dust scattered across tabletops — evidence of pixie tricksters',
      'The witch\'s writing desk where the misdelivered letter may be found',
      'Various potions and magical brews waiting to be discovered',
    ],
  },
  {
    id: 'work-table',
    name: 'The Work Table',
    description:
      'A massive work table that dominates the workshop floor. At Tiny size it becomes a sprawling plateau of scattered papers, inkwells, and alchemical equipment.',
    image: '/map_work_table_faithful.jpeg',
    gridScale: '1 square = 5 feet',
    details: [
      'Scattered papers and parchment scrolls — some with magical writings',
      'Inkwells that appear as dark pools at Tiny size',
      'Alchemical equipment: mortars, pestles, and distillation apparatus',
      'Climbing the table requires a DC 14 Strength (Athletics) check',
      'The Venus Fly Rat may be lurking among the equipment',
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  ANIMATION CONFIG                                                   */
/* ------------------------------------------------------------------ */

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

/* ------------------------------------------------------------------ */
/*  LOCATIONS PAGE                                                     */
/* ------------------------------------------------------------------ */

export default function Locations() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeMap, setActiveMap] = useState<LocationMap | null>(null);

  const openLightbox = useCallback((loc: LocationMap) => {
    setActiveMap(loc);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => setActiveMap(null), 300);
  }, []);

  return (
    <div className="min-h-[100dvh] pt-16">
      {/* ============================================================ */}
      {/* HERO HEADER                                                   */}
      {/* ============================================================ */}
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Map size={22} color="#B87333" />
              <span className="text-label text-copper tracking-[0.12em]">
                BATTLEMAPS
              </span>
            </div>
            <h1 className="text-display-md text-parchment">
              Adventure Locations
            </h1>
            <p
              className="font-body text-[1.05rem] mt-4 max-w-[640px] mx-auto leading-relaxed"
              style={{ color: 'rgba(245,240,230,0.65)' }}
            >
              Three tactical battlemaps rendered in high resolution (2K) for
              the key areas of Miss Lindley&apos;s workshop. Click any map to
              view it full size.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MAP CARDS GRID                                                */}
      {/* ============================================================ */}
      <section className="px-4 pb-24">
        <div className="max-w-container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="group rounded-2xl overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, #2D2016 0%, #1E1610 100%)',
                border: '1px solid rgba(184,115,51,0.15)',
              }}
            >
              {/* Map thumbnail — 2K images, display responsive */}
              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() => openLightbox(loc)}
                style={{ aspectRatio: '1 / 1' }}
              >
                <img
                  src={loc.image}
                  alt={`${loc.name} battlemap`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-4 py-2 rounded-full bg-ink/60 backdrop-blur-sm">
                    <ZoomIn size={18} color="#F5F0E6" />
                    <span className="font-body text-sm text-parchment">
                      View Full Size
                    </span>
                  </div>
                </div>
                {/* Grid scale badge */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-ink/60 backdrop-blur-sm">
                  <span className="text-stat text-[0.75rem] text-parchment/80">
                    {loc.gridScale}
                  </span>
                </div>
              </div>

              {/* Info section */}
              <div className="p-6">
                <h2 className="text-heading-lg text-parchment mb-2">
                  {loc.name}
                </h2>
                <p
                  className="font-body text-[0.95rem] leading-relaxed mb-4"
                  style={{ color: 'rgba(245,240,230,0.7)' }}
                >
                  {loc.description}
                </p>

                {/* Notable features list */}
                <div className="space-y-2">
                  <p
                    className="text-label text-[0.65rem] tracking-[0.12em] uppercase"
                    style={{ color: 'rgba(184,115,51,0.7)' }}
                  >
                    Notable Features
                  </p>
                  <ul className="space-y-1.5">
                    {loc.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 font-body text-[0.85rem] leading-relaxed"
                        style={{ color: 'rgba(245,240,230,0.6)' }}
                      >
                        <span
                          className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                          style={{ backgroundColor: '#B87333' }}
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* View button */}
                <button
                  onClick={() => openLightbox(loc)}
                  className="mt-5 w-full py-2.5 rounded-lg font-body text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: 'rgba(184,115,51,0.15)',
                    color: '#D4956A',
                    border: '1px solid rgba(184,115,51,0.25)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(184,115,51,0.25)';
                    e.currentTarget.style.borderColor = 'rgba(184,115,51,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(184,115,51,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(184,115,51,0.25)';
                  }}
                >
                  Open Full Map
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* LIGHTBOX — handles 2K HD images                                */}
      {/* ============================================================ */}
      <AnimatePresence>
        {lightboxOpen && activeMap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 glass-modal flex items-center justify-center"
            style={{ zIndex: 100, padding: '1.5rem' }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors duration-200 hover:bg-white/10"
              aria-label="Close lightbox"
            >
              <X size={24} color="#F5F0E6" />
            </button>

            {/* Map info header */}
            <div className="absolute top-4 left-4 z-10">
              <h3 className="text-heading-lg text-parchment">
                {activeMap.name}
              </h3>
              <p className="text-stat text-[0.8rem] text-parchment/60 mt-1">
                {activeMap.gridScale} &middot; 2K Resolution
              </p>
            </div>

            {/* HD Image container — responsive sizing for 2K */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full h-full flex items-center justify-center"
              style={{ paddingTop: '3rem', paddingBottom: '1rem' }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeMap.image}
                alt={`${activeMap.name} battlemap — full size`}
                className="max-w-full max-h-full object-contain rounded-lg"
                style={{
                  boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
