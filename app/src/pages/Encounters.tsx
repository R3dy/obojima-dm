import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sword, Cat, Sparkles, Mountain, Bug, PawPrint, Dices, Eye, ArrowRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  ENCOUNTER DATA                                                     */
/* ------------------------------------------------------------------ */

type Kind = 'combat' | 'social' | 'hazard' | 'climax';

interface Encounter {
  id: string;
  name: string;
  location: string;
  kind: Kind;
  icon: typeof Sword;
  summary: string;
  mechanics: string[];
  optional?: boolean;
}

const KIND_META: Record<Kind, { label: string; accent: string }> = {
  combat: { label: 'Combat', accent: '#8B3A3A' },
  social: { label: 'Social', accent: '#6B7FA0' },
  hazard: { label: 'Hazard', accent: '#C9A84C' },
  climax: { label: 'Climax', accent: '#4A5D3F' },
};

const encounters: Encounter[] = [
  {
    id: 'bug-attack',
    name: 'Bug Attack on the Stairs',
    location: 'The Staircase',
    kind: 'combat',
    icon: Bug,
    optional: true,
    summary:
      'As the shrunken party strains up the towering, 15-foot-tall steps, 1d4+1 Giant Bora Bugs crawl from cracks in the walls and ambush them. A light, mobile fight on precarious terrain.',
    mechanics: [
      'Each step is ~15 ft tall: climbing speed, or a DC 14 Strength (Athletics) check per step',
      'A slip deals 1d6 bludgeoning and forces a retry',
      '1d4+1 Giant Bora Bugs · AC 12 · HP 22 · Spike Flurry (DC 12 Dex, 2d6)',
      'Optional — if skipped here, the bugs can instead strike after the hallway avalanche',
    ],
  },
  {
    id: 'emerson',
    name: 'Emerson, the Witch’s Cat',
    location: 'Top of the Stairs',
    kind: 'social',
    icon: Cat,
    summary:
      'An imperious, portly cat who rules the hallway from his embroidered cushion. To the Tiny party he is a lion-sized power broker. Befriend him and he reveals which potion restores their size — for a price.',
    mechanics: [
      'Uses Lion stats with Intelligence 11',
      'Knows which brew on the work table restores size',
      'Barters: recover his treats (atop the bookcase) in exchange for knowledge',
      'A loud, careless search of the cellar alerts him early',
    ],
  },
  {
    id: 'pixies',
    name: 'Pesky Pixies — Tina & Meena',
    location: 'Workshop Main Floor',
    kind: 'social',
    icon: Sparkles,
    summary:
      'Two giant pixies treat the Tiny adventurers as living toys, inventing cruel little games and casting spells for fun. They can help identify magic items (and lie half the time) or lead the party astray.',
    mechanics: [
      'Two Giant Pixies · AC 14 · HP 22 · Magic Resistance · Innate Spellcasting (Confusion, Sleep, Entangle…)',
      'Can close every shutter and douse the candles, plunging the room into darkness',
      'May trigger a book avalanche for sport, or harass the party during the table climb',
      'Better run as mischief than a fight — bribery, tricks, and charm all work',
    ],
  },
  {
    id: 'avalanche',
    name: 'Avalanche!',
    location: 'The Hallway',
    kind: 'hazard',
    icon: Mountain,
    summary:
      'The narrow hallway is a canyon of stacked books, jars, and papers. A pixie prank — or a startled Emerson — can bring the whole unstable pile crashing down on the party.',
    mechanics: [
      'Creatures in the area fall prone',
      'DC 15 Strength saving throw — 1d10 bludgeoning damage and restrained on a failure',
      'A natural place to spring the bora bugs if you skipped the stairwell ambush',
    ],
  },
  {
    id: 'fly-rat',
    name: 'The Venus Fly Rat',
    location: 'The Work Table',
    kind: 'climax',
    icon: PawPrint,
    summary:
      'The adventure’s climax. The size-restoring elixir sits atop the work table — guarded by a recently freed Giant Venus Fly Rat lurking in the clutter. The party must climb, search, and survive.',
    mechanics: [
      'Climb the ~60-ft table legs: climbing speed, or DC 14 Strength (Athletics)',
      'Passive Perception 14+ spots the rat first; otherwise it ambushes anyone nearing the table’s center',
      'Giant Venus Fly Rat · AC 14 · HP 34 · Snap Jaw (grapple) · Pollen Burst (DC 11 Wis, Confusion)',
      'Resists nonmagical bludgeoning/piercing/slashing — Tiny mundane weapons feel weak',
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  ENVIRONMENTAL HAZARDS (quick reference)                            */
/* ------------------------------------------------------------------ */

const hazards = [
  { name: 'The Shrink Trap', text: 'Arcane glyphs on the cellar floor shrink the party to Tiny; the doors magically lock behind them.' },
  { name: 'Giant Staircase', text: 'Each step is ~15 ft tall — climbing speed or a DC 14 Strength (Athletics) check; a fall deals 1d6.' },
  { name: 'Doused in Darkness', text: 'The pixies can close the shutters and snuff the candles, leaving the party fighting blind.' },
  { name: 'The Bubbling Cauldron', text: 'A 15-ft-tall cauldron of ever-shifting brew; drinking or falling in triggers a random d6 effect (see Potions).' },
];

/* ------------------------------------------------------------------ */
/*  COMPONENTS                                                         */
/* ------------------------------------------------------------------ */

function EncounterCard({ enc, index }: { enc: Encounter; index: number }) {
  const meta = KIND_META[enc.kind];
  const Icon = enc.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, delay: (index % 2) * 0.08 }}
      className="rounded-2xl p-6"
      style={{
        background: 'linear-gradient(135deg, #2D2016 0%, #1E1610 100%)',
        border: '1px solid rgba(184,115,51,0.15)',
        borderLeft: `3px solid ${meta.accent}`,
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${meta.accent}1f` }}>
            <Icon size={20} color={meta.accent === '#C9A84C' ? '#C9A84C' : meta.accent === '#4A5D3F' ? '#8FA678' : meta.accent === '#6B7FA0' ? '#6B7FA0' : '#C47171'} />
          </div>
          <div>
            <h2 className="text-heading-lg text-parchment leading-tight">{enc.name}</h2>
            <p className="text-stat text-[0.75rem] mt-0.5" style={{ color: 'rgba(245,240,230,0.5)' }}>{enc.location}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span
            className="text-label text-[0.6rem] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
            style={{ color: meta.accent === '#C9A84C' ? '#C9A84C' : '#F5F0E6', background: `${meta.accent}26`, border: `1px solid ${meta.accent}55` }}
          >
            {meta.label}
          </span>
          {enc.optional && (
            <span className="text-stat text-[0.6rem] uppercase tracking-wide" style={{ color: 'rgba(245,240,230,0.45)' }}>Optional</span>
          )}
        </div>
      </div>

      <p className="font-body text-[0.95rem] leading-relaxed mb-4" style={{ color: 'rgba(245,240,230,0.78)' }}>
        {enc.summary}
      </p>

      <ul className="space-y-2">
        {enc.mechanics.map((m, i) => (
          <li key={i} className="flex items-start gap-2.5 font-body text-[0.85rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.7)' }}>
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: meta.accent }} />
            {m}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Encounters() {
  return (
    <div className="min-h-[100dvh] pt-16">
      {/* Hero header */}
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sword size={22} color="#B87333" />
              <span className="text-label text-copper tracking-[0.12em]">ENCOUNTERS</span>
            </div>
            <h1 className="text-display-md text-parchment">Encounters &amp; Hazards</h1>
            <p className="font-body text-[1.05rem] mt-4 max-w-[640px] mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
              Every combat, social beat, and environmental danger the shrunken
              party can face on their way to the work table — with the
              checks, DCs, and stat references you need to run them.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="max-w-container-narrow mx-auto space-y-6">
          {encounters.map((e, i) => (
            <EncounterCard key={e.id} enc={e} index={i} />
          ))}
        </div>
      </section>

      {/* Environmental hazards quick list */}
      <section className="px-4 pb-12">
        <div className="max-w-container-narrow mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <Mountain size={18} color="#C9A84C" />
            <h2 className="text-display-md text-parchment" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Environmental Hazards</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hazards.map((h) => (
              <div
                key={h.name}
                className="rounded-xl p-4"
                style={{ background: 'rgba(45,32,22,0.6)', border: '1px solid rgba(201,168,76,0.18)' }}
              >
                <p className="font-body text-[0.95rem] font-semibold text-parchment mb-1">{h.name}</p>
                <p className="font-body text-[0.85rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="px-4 pb-24">
        <div className="max-w-container-narrow mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/bestiary"
            className="group rounded-xl p-5 flex items-center justify-between transition-all duration-200"
            style={{ background: 'rgba(45,32,22,0.6)', border: '1px solid rgba(184,115,51,0.2)' }}
          >
            <span className="flex items-center gap-3">
              <Eye size={18} color="#B87333" />
              <span className="font-body text-parchment">Full creature stat blocks</span>
            </span>
            <ArrowRight size={18} color="#D4956A" className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/adventure"
            className="group rounded-xl p-5 flex items-center justify-between transition-all duration-200"
            style={{ background: 'rgba(45,32,22,0.6)', border: '1px solid rgba(184,115,51,0.2)' }}
          >
            <span className="flex items-center gap-3">
              <Dices size={18} color="#B87333" />
              <span className="font-body text-parchment">See encounters in the scene flow</span>
            </span>
            <ArrowRight size={18} color="#D4956A" className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
