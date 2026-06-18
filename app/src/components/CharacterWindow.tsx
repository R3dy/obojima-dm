import { useState } from 'react';
import {
  Shield,
  Heart,
  Footprints,
  Quote,
  MessageCircleQuestion,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ScrollText,
  X,
  UserSquare2,
} from 'lucide-react';

/**
 * A floating "who is this NPC?" window the DM pins to the right margin while
 * running a scene. Each entry bundles a quick-reference bio, the NPC's persona,
 * signature catchphrases, the questions they'd lob at the party, and a compact
 * stat block — everything you need to drop into character on the fly.
 */

interface NPCAbilities {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

interface NPC {
  id: string;
  name: string;
  title: string;
  /** Optional portrait in /public; falls back to a lettered avatar. */
  portrait?: string;
  accent: string;
  /** A two or three sentence "who is this?" summary. */
  reference: string;
  /** How they talk and carry themselves. */
  persona: string;
  catchphrases: string[];
  questions: string[];
  stats: {
    ac: number;
    hp: string;
    speed: string;
    cr: string;
    abilities: NPCAbilities;
  };
}

/* ------------------------------------------------------------------ */
/*  NPC ROSTER  — Bernard the Drunker leads as the worked example.     */
/* ------------------------------------------------------------------ */

const npcs: NPC[] = [
  {
    id: 'bernard',
    name: 'Bernard the Drunker',
    title: 'Barkeep · The Sodden Sheep Tavern',
    accent: '#C9A84C',
    reference:
      'Bernard has been running this bar since his late father, Bernard the Drunk, passed away of old age (aka kidney failure). He inherited the apron, the debts, and the name — and is determined to out-drink the family legacy, hence "the Drunker." Warm, loud, and relentlessly cheerful, he treats every stranger like a long-lost cousin.',
    persona:
      'Plays him as Borat — beaming, thickly-accented, and earnestly delighted by absolutely everything. He claps a lot, leans in too close, and means every word.',
    catchphrases: ['"Very nice!"', '"Great success!"', '"Wa wa wee wa!"', '"High five!"', '"Is niiiice, yes?"'],
    questions: [
      '"You like the drink? Is my father recipe — he is dead now, very sad, but the ale, she lives on!"',
      '"What country you from, my friend? You look strong, like the sheep dragon!"',
      '"You want I should tell you the gossip? I know EVERYTHING in this town, hehe."',
      '"Why you so sad face? Drink! On the house — well, half the house. Quarter the house."',
    ],
    stats: {
      ac: 10,
      hp: '9 (2d8)',
      speed: '30 ft.',
      cr: '0',
      abilities: { str: 10, dex: 10, con: 12, int: 9, wis: 11, cha: 14 },
    },
  },
];

export default function CharacterWindow() {
  const [index, setIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const npc = npcs[index];
  const accent = npc.accent;
  const prev = () => setIndex((i) => (i - 1 + npcs.length) % npcs.length);
  const next = () => setIndex((i) => (i + 1) % npcs.length);

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        aria-label="Show character window"
        className="fixed right-2 top-1/2 -translate-y-1/2 z-30 hidden min-[1450px]:flex flex-col items-center gap-2 px-2 py-4 rounded-l-xl transition-colors"
        style={{
          background: 'rgba(45,32,22,0.92)',
          border: `1px solid ${accent}33`,
          borderRight: 'none',
        }}
      >
        <ChevronLeft size={16} color={accent} />
        <UserSquare2 size={16} color={accent} />
        <span
          className="text-[0.6rem] tracking-[0.15em] uppercase"
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            color: '#D4956A',
            writingMode: 'vertical-rl',
          }}
        >
          NPC
        </span>
      </button>
    );
  }

  return (
    <aside
      aria-label="Character reference window"
      className="fixed right-3 top-24 z-30 hidden min-[1450px]:block w-[17rem] max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl backdrop-blur-md"
      style={{
        background: 'rgba(26,20,16,0.9)',
        border: `1px solid ${accent}40`,
        boxShadow: '0 10px 40px rgba(0,0,0,0.45)',
      }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 flex items-center gap-2 px-3 py-2.5 border-b backdrop-blur-md"
        style={{ background: 'rgba(45,32,22,0.92)', borderColor: `${accent}33` }}
      >
        <UserSquare2 size={15} color={accent} className="shrink-0" />
        <span
          className="text-[0.7rem] tracking-[0.12em] uppercase"
          style={{ fontFamily: "'Cinzel Decorative', serif", color: '#D4956A' }}
        >
          Character
        </span>
        <div className="ml-auto flex items-center gap-1">
          {npcs.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous character"
                className="p-1 rounded-md transition-colors"
                style={{ color: 'rgba(245,240,230,0.45)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D4956A')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,230,0.45)')}
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-[0.62rem] tabular-nums" style={{ color: 'rgba(245,240,230,0.5)' }}>
                {index + 1}/{npcs.length}
              </span>
              <button
                type="button"
                onClick={next}
                aria-label="Next character"
                className="p-1 rounded-md transition-colors"
                style={{ color: 'rgba(245,240,230,0.45)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D4956A')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,230,0.45)')}
              >
                <ChevronRight size={14} />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            aria-label="Collapse character window"
            title="Collapse"
            className="p-1 rounded-md transition-colors"
            style={{ color: 'rgba(245,240,230,0.45)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D4956A')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,230,0.45)')}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="p-3">
        {/* Identity */}
        <div className="flex items-center gap-3 mb-3">
          {npc.portrait ? (
            <img
              src={npc.portrait}
              alt={npc.name}
              className="w-12 h-12 rounded-xl object-cover shrink-0"
              style={{ border: `1px solid ${accent}55` }}
            />
          ) : (
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-[1.3rem] font-bold"
              style={{
                background: `${accent}22`,
                border: `1px solid ${accent}55`,
                color: accent,
                fontFamily: "'Cinzel Decorative', serif",
              }}
            >
              {npc.name.charAt(0)}
            </div>
          )}
          <div className="min-w-0">
            <h3
              className="text-[1.05rem] font-semibold leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}
            >
              {npc.name}
            </h3>
            <p className="text-[0.7rem] mt-0.5" style={{ color: 'rgba(245,240,230,0.55)' }}>
              {npc.title}
            </p>
          </div>
        </div>

        {/* Quick reference */}
        <Section icon={ScrollText} label="Who Is This?" accent={accent}>
          <p className="text-[0.78rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.82)' }}>
            {npc.reference}
          </p>
        </Section>

        {/* Persona */}
        <Section icon={Sparkles} label="Persona" accent={accent}>
          <p className="text-[0.78rem] leading-relaxed italic" style={{ color: 'rgba(245,240,230,0.82)' }}>
            {npc.persona}
          </p>
        </Section>

        {/* Catchphrases */}
        <Section icon={Quote} label="Catchphrases" accent={accent}>
          <div className="flex flex-wrap gap-1.5">
            {npc.catchphrases.map((c) => (
              <span
                key={c}
                className="px-2 py-0.5 rounded-full text-[0.72rem]"
                style={{ background: `${accent}1A`, border: `1px solid ${accent}40`, color: '#F5F0E6' }}
              >
                {c}
              </span>
            ))}
          </div>
        </Section>

        {/* Questions */}
        <Section icon={MessageCircleQuestion} label="He Might Ask…" accent={accent}>
          <ul className="space-y-1.5">
            {npc.questions.map((q, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: accent }} />
                <span
                  className="text-[0.76rem] leading-relaxed italic"
                  style={{ color: 'rgba(245,240,230,0.8)' }}
                >
                  {q}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Stat block */}
        <div
          className="mt-3 rounded-xl p-2.5"
          style={{ background: 'rgba(45,32,22,0.5)', border: `1px solid ${accent}33` }}
        >
          <div className="grid grid-cols-3 gap-2 mb-2.5">
            <MiniStat icon={Shield} label="AC" value={String(npc.stats.ac)} />
            <MiniStat icon={Heart} label="HP" value={npc.stats.hp} />
            <MiniStat icon={Footprints} label="Speed" value={npc.stats.speed} />
          </div>
          <div className="grid grid-cols-6 gap-1">
            {(
              [
                ['STR', npc.stats.abilities.str],
                ['DEX', npc.stats.abilities.dex],
                ['CON', npc.stats.abilities.con],
                ['INT', npc.stats.abilities.int],
                ['WIS', npc.stats.abilities.wis],
                ['CHA', npc.stats.abilities.cha],
              ] as const
            ).map(([label, score]) => {
              const mod = Math.floor((score - 10) / 2);
              return (
                <div key={label} className="text-center">
                  <div
                    className="text-[0.52rem] tracking-wider uppercase"
                    style={{ color: 'rgba(245,240,230,0.5)' }}
                  >
                    {label}
                  </div>
                  <div className="text-[0.78rem] font-semibold tabular-nums" style={{ color: '#F5F0E6' }}>
                    {score}
                  </div>
                  <div className="text-[0.6rem] tabular-nums" style={{ color: accent }}>
                    {mod >= 0 ? `+${mod}` : mod}
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="mt-2 pt-2 text-center text-[0.62rem] tracking-wider uppercase border-t"
            style={{ borderColor: `${accent}26`, color: 'rgba(245,240,230,0.55)' }}
          >
            Challenge {npc.stats.cr}
          </div>
        </div>
      </div>
    </aside>
  );
}

function Section({
  icon: Icon,
  label,
  accent,
  children,
}: {
  icon: React.ElementType;
  label: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon size={12} color={accent} className="shrink-0" />
        <span
          className="text-[0.6rem] tracking-[0.12em] uppercase"
          style={{ fontFamily: "'Cinzel Decorative', serif", color: '#D4956A' }}
        >
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div
      className="rounded-lg px-1.5 py-1.5 text-center"
      style={{ background: 'rgba(26,20,16,0.6)', border: '1px solid rgba(184,115,51,0.2)' }}
    >
      <Icon size={12} color="#C9A84C" className="mx-auto mb-0.5" />
      <div className="text-[0.52rem] tracking-wider uppercase" style={{ color: 'rgba(245,240,230,0.5)' }}>
        {label}
      </div>
      <div className="text-[0.72rem] font-semibold tabular-nums" style={{ color: '#F5F0E6' }}>
        {value}
      </div>
    </div>
  );
}
