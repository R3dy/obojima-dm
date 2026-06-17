import { createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  KeyRound,
  Eye,
  DoorOpen,
  Landmark,
  Skull,
  Gem,
  CheckCircle2,
  Circle,
  RotateCcw,
  Star,
} from 'lucide-react';
import { ReadAloud, DMSecret, SkillCheck, TrapWarning } from '../../components/DMCallouts';
import HpTracker from '../../components/HpTracker';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const ACCENT = '#3E7C6A';
const ACCENT_LIGHT = '#6FB3A0';
const GOLD = '#C9A84C';

/* ------------------------------------------------------------------ */
/*  BEAT DATA                                                          */
/* ------------------------------------------------------------------ */

interface BeatData {
  id: string;
  number: number;
  title: string;
  icon: React.ElementType;
  accent: string;
  bgTint: string;
}

const beats: BeatData[] = [
  { id: 'scene-1', number: 1, title: 'The Briefing', icon: KeyRound, accent: GOLD, bgTint: 'rgba(201,168,76,0.04)' },
  { id: 'scene-2', number: 2, title: 'Casing Varkenbluff', icon: Eye, accent: '#6B7FA0', bgTint: 'rgba(107,127,160,0.04)' },
  { id: 'scene-3', number: 3, title: 'Breaking In', icon: DoorOpen, accent: ACCENT, bgTint: 'rgba(62,124,106,0.05)' },
  { id: 'scene-4', number: 4, title: 'The Galleries', icon: Landmark, accent: '#6B4C7A', bgTint: 'rgba(107,76,122,0.05)' },
  { id: 'scene-5', number: 5, title: 'The Malevolence Wakes', icon: Skull, accent: '#8B3A3A', bgTint: 'rgba(139,58,58,0.05)' },
  { id: 'scene-6', number: 6, title: 'The Getaway', icon: Gem, accent: GOLD, bgTint: 'rgba(201,168,76,0.04)' },
];

const revealUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

/* ------------------------------------------------------------------ */
/*  PROGRESS TRACKING                                                  */
/* ------------------------------------------------------------------ */

interface BeatProgress {
  completed: Record<string, boolean>;
  toggle: (id: string) => void;
  reset: () => void;
}

const BeatProgressContext = createContext<BeatProgress>({ completed: {}, toggle: () => {}, reset: () => {} });
const useBeatProgress = () => useContext(BeatProgressContext);

function BeatNavigator() {
  const { completed, reset } = useBeatProgress();
  const doneCount = beats.filter((b) => completed[b.id]).length;

  return (
    <nav className="sticky top-0 z-50 glass-nav border-b" style={{ borderColor: `${ACCENT}26` }}>
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="text-[0.7rem] tracking-[0.12em] uppercase" style={{ fontFamily: "'Cinzel Decorative', serif", color: ACCENT_LIGHT }}>
              Heist Tracker
            </span>
            <span className="text-stat text-[0.7rem]" style={{ color: 'rgba(143,166,120,0.9)' }}>
              {doneCount}/{beats.length}
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
                <RotateCcw size={12} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center w-full sm:w-auto">
            {beats.map((b) => {
              const done = !!completed[b.id];
              return (
                <a
                  key={b.id}
                  href={`#${b.id}`}
                  className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-300"
                  style={{
                    background: done ? 'rgba(62,124,106,0.18)' : 'rgba(245,240,230,0.05)',
                    border: `1px solid ${done ? `${ACCENT_LIGHT}66` : 'rgba(245,240,230,0.12)'}`,
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(b.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  {done ? (
                    <CheckCircle2 size={20} color={ACCENT_LIGHT} className="shrink-0" />
                  ) : (
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[0.65rem] font-bold"
                      style={{ background: b.accent, color: '#1A1410' }}
                    >
                      {b.number}
                    </span>
                  )}
                  <span className="text-[0.75rem] hidden md:block transition-colors duration-300 group-hover:text-white" style={{ color: 'rgba(245,240,230,0.65)' }}>
                    {b.title}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NextBeatButton({ targetId, label }: { targetId: string; label: string }) {
  return (
    <div className="flex justify-center my-10">
      <a
        href={`#${targetId}`}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
        style={{ background: `linear-gradient(135deg, ${ACCENT}33 0%, rgba(22,36,31,0.6) 100%)`, border: `1px solid ${ACCENT}4D` }}
      >
        <div className="flex flex-col items-start">
          <span className="text-[0.65rem] tracking-[0.12em] uppercase" style={{ fontFamily: "'Cinzel Decorative', serif", color: ACCENT_LIGHT }}>
            Next Beat
          </span>
          <span className="text-[0.95rem] font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>
            {label}
          </span>
        </div>
        <ChevronDown size={20} color={ACCENT} className="transition-transform duration-300 group-hover:translate-y-0.5" />
      </a>
    </div>
  );
}

function BeatHeader({ beat }: { beat: BeatData }) {
  const Icon = beat.icon;
  const { completed, toggle } = useBeatProgress();
  const done = !!completed[beat.id];
  return (
    <div className="sticky top-[60px] z-40 py-4 px-4 sm:px-6 border-b border-t backdrop-blur-md" style={{ background: 'rgba(26, 20, 16, 0.92)', borderColor: `${beat.accent}33` }}>
      <div className="max-w-6xl mx-auto flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${beat.accent}22`, border: `1px solid ${beat.accent}44` }}>
          <Icon size={18} color={beat.accent} />
        </div>
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[1.2rem] font-bold shrink-0" style={{ fontFamily: "'Cinzel Decorative', serif", color: beat.accent }}>
            {beat.number}
          </span>
          <h2 className="text-[1.3rem] sm:text-[1.6rem] font-semibold truncate" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>
            {beat.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => toggle(beat.id)}
          aria-pressed={done}
          className="ml-auto flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[0.7rem] font-semibold transition-colors shrink-0"
          style={{
            background: done ? 'rgba(62,124,106,0.2)' : 'rgba(245,240,230,0.06)',
            color: done ? ACCENT_LIGHT : 'rgba(245,240,230,0.6)',
            border: `1px solid ${done ? `${ACCENT_LIGHT}66` : 'rgba(245,240,230,0.15)'}`,
          }}
        >
          {done ? <CheckCircle2 size={14} /> : <Circle size={14} />}
          <span className="hidden sm:inline">{done ? 'Beat complete' : 'Mark complete'}</span>
        </button>
      </div>
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">{children}</div>;
}

function SectionTitle({ children, color = '#F5F0E6' }: { children: React.ReactNode; color?: string }) {
  return (
    <motion.h3 variants={revealUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-[1.4rem] font-semibold mt-10 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color }}>
      {children}
    </motion.h3>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <motion.p variants={revealUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="font-body text-[1rem] leading-relaxed my-4" style={{ color: 'rgba(245,240,230,0.85)' }}>
      {children}
    </motion.p>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <motion.ul variants={revealUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="space-y-2.5 my-5 ml-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
          <span className="font-body text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>{item}</span>
        </li>
      ))}
    </motion.ul>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="w-full h-full" style={{ background: `radial-gradient(120% 120% at 50% 0%, ${ACCENT}26 0%, #1A1410 55%, #100c0a 100%)` }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(26,20,16,0.3) 0%, rgba(26,20,16,0.8) 60%, #1A1410 100%)' }} />
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-[0.75rem] tracking-[0.2em] uppercase block mb-4" style={{ fontFamily: "'Cinzel Decorative', serif", color: ACCENT_LIGHT }}>
            Heist Flow
          </span>
          <h1 className="text-display-lg mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>
            One Night at the Museum
          </h1>
          <p className="text-[1.1rem] max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.7)' }}>
            A beat-by-beat guide for the Dungeon Master. The crew can solve this job a dozen ways — these six
            beats keep the night moving from the briefing to the getaway.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-8 flex justify-center">
          <a href="#scene-1" onClick={(e) => { e.preventDefault(); document.getElementById('scene-1')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex flex-col items-center gap-2 group">
            <span className="text-[0.7rem] tracking-widest uppercase" style={{ fontFamily: "'Cinzel Decorative', serif", color: ACCENT }}>Begin</span>
            <ChevronDown size={20} color={ACCENT} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */

export default function AdventureFlow() {
  const [completed, setCompleted] = useLocalStorage<Record<string, boolean>>('murkmire-progress', {});
  const progress: BeatProgress = {
    completed,
    toggle: (id) => setCompleted((prev) => ({ ...prev, [id]: !prev[id] })),
    reset: () => setCompleted({}),
  };

  return (
    <BeatProgressContext.Provider value={progress}>
      <div className="min-h-screen" style={{ background: '#1A1410', color: '#F5F0E6' }}>
        <BeatNavigator />
        <HeroSection />

        {/* BEAT 1 */}
        <section id="scene-1" className="relative" style={{ background: beats[0].bgTint }}>
          <BeatHeader beat={beats[0]} />
          <Content>
            <ReadAloud title="The Puzzle Box Opens">
              The little brass box folds open like a flower and a hooded figure of golden light leans toward
              you. &ldquo;A dangerous thing sleeps in the Vermeulen-Voss Museum,&rdquo; it says, &ldquo;and
              every night it sleeps a little less. Bring it to us before it wakes the town. Take nothing else.
              Hurt no one you do not have to.&rdquo;
            </ReadAloud>

            <DMSecret heading="Setting the Tone">
              This is a heist, not a brawl. Make the patron calm, generous, and a little eerie. Let the players
              ask questions and start scheming. Emphasize the two things the Vault rewards: getting the stone,
              and keeping the night quiet. The full intel package lives on the <strong>Briefing</strong> page.
            </DMSecret>

            <SectionTitle color={GOLD}>What the Crew Knows</SectionTitle>
            <BulletList
              items={[
                <>Target: the <strong>Murkmire Malevolence</strong>, a small meteorite on the museum&apos;s upper floor.</>,
                <>The museum closes at dusk; a curator and a thin night staff remain.</>,
                <>The Vault pays well — and pays a <strong>bonus</strong> for a clean, bloodless lift.</>,
                <>The stone is dangerous and getting more so. Speed matters.</>,
              ]}
            />

            <NextBeatButton targetId="scene-2" label="Beat 2: Casing Varkenbluff" />
          </Content>
        </section>

        {/* BEAT 2 */}
        <section id="scene-2" className="relative" style={{ background: beats[1].bgTint }}>
          <BeatHeader beat={beats[1]} />
          <Content>
            <ReadAloud title="Arriving in Varkenbluff">
              Varkenbluff hunches over its river like an old man over a card table. Fog pools in the lanes,
              gaslamps wear soft yellow halos, and somewhere a foghorn lows out on the water. Up the hill, the
              Vermeulen-Voss Museum sits behind iron railings — all tall windows, copper gutters gone green,
              and a great domed skylight catching the last grey light.
            </ReadAloud>

            <DMSecret heading="The Recon Phase">
              Give the players a scene or two to gather information before the break-in. Reward legwork: each
              good idea (chatting up a guard at the pub, watching the building at dusk, posing as scholars for a
              daytime tour) earns a concrete advantage in Beat 3 — a known patrol gap, an unlatched window, the
              curator&apos;s schedule.
            </DMSecret>

            <SectionTitle color="#6B7FA0">Things They Can Learn</SectionTitle>
            <BulletList
              items={[
                <>The museum has <strong>three plausible ways in</strong>: the domed skylight, a flooded service tunnel from the riverbank, and the front doors.</>,
                <>One or two night guards walk a slow, predictable loop of the galleries.</>,
                <><strong>Curator Alda Arkin</strong> works late in her office almost every night.</>,
                <>Locals whisper that the museum&apos;s &ldquo;new rock&rdquo; gives them the shivers, and that the stuffed animals &ldquo;look wrong&rdquo; after dark.</>,
              ]}
            />

            <SkillCheck
              dc={13}
              skill="Charisma (Persuasion) or Wisdom (Insight)"
              title="Loosen a Local's Tongue"
              pass="Learn one extra detail — the guard rotation, the curator’s late hours, or the warded wing — that grants advantage on the chosen entry approach."
              fail="Rumors only; the contact gets nervous and the crew earns no special edge."
            />

            <NextBeatButton targetId="scene-3" label="Beat 3: Breaking In" />
          </Content>
        </section>

        {/* BEAT 3 */}
        <section id="scene-3" className="relative" style={{ background: beats[2].bgTint }}>
          <BeatHeader beat={beats[2]} />
          <Content>
            <BodyText>
              There is no &ldquo;correct&rdquo; way in. Present the three approaches as a menu and let the crew
              improvise. Each leads to a different part of the museum and carries its own risk. Detailed
              room-by-room notes live on the <strong>Museum</strong> page.
            </BodyText>

            <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="p-5 rounded-xl my-4" style={{ background: 'rgba(62,124,106,0.12)', border: `1px solid ${ACCENT}4D` }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded text-[0.6rem] tracking-wider uppercase font-bold" style={{ background: `${ACCENT}4D`, color: ACCENT_LIGHT }}>QUIET</span>
              </div>
              <h4 className="text-[1.1rem] font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>1. The Domed Skylight</h4>
              <p className="text-[0.95rem] leading-relaxed mb-3" style={{ color: 'rgba(245,240,230,0.8)' }}>
                A climb up the copper drainpipes to the roof, then through the great glass dome straight down
                into the upper gallery — close to the meteorite, far from the guards.
              </p>
              <SkillCheck dc={14} skill="Strength (Athletics) / Dexterity (Acrobatics)" title="Scale the Roof & Rappel In" pass="The crew descends into the upper gallery unseen." fail="A slip rattles the glass; the nearest guard rolls a Perception check to investigate." />
            </motion.div>

            <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} className="p-5 rounded-xl my-4" style={{ background: 'rgba(107,76,122,0.08)', border: '1px solid rgba(107,76,122,0.2)' }}>
              <h4 className="text-[1.1rem] font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>2. The Service Tunnel</h4>
              <p className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>
                A grated culvert at the waterline drains the museum&apos;s flooded sub-basement. Cold, dark, and
                smelling of the Murkmire itself — and it comes up beside the specimen storeroom, where the
                necrotic field is strongest. Spooky, but unguarded.
              </p>
            </motion.div>

            <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} className="p-5 rounded-xl my-4" style={{ background: 'rgba(107,76,122,0.08)', border: '1px solid rgba(107,76,122,0.2)' }}>
              <h4 className="text-[1.1rem] font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>3. The Front Doors</h4>
              <p className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>
                For the bold: forged credentials, a bribed guard, or a confident bluff past the night staff.
                Drops the crew in the grand foyer — the most watched room in the building.
              </p>
            </motion.div>

            <TrapWarning
              name="The Alarm Bell"
              trigger="A failed entry, a smashed case, or a guard who escapes to pull the cord"
              effect="A brass bell summons the town watch. Start a countdown: the watch arrives in 1d4 + 2 rounds, after which escape becomes far harder."
              countermeasure="Cut the bell-pull, silence guards before they shout, or move fast enough to be gone before the watch arrives."
            />

            <NextBeatButton targetId="scene-4" label="Beat 4: The Galleries" />
          </Content>
        </section>

        {/* BEAT 4 */}
        <section id="scene-4" className="relative" style={{ background: beats[3].bgTint }}>
          <BeatHeader beat={beats[3]} />
          <Content>
            <ReadAloud title="The Hall of Beasts">
              The gallery is a forest of frozen animals. A great mounted bear rears in the gloom; wolves prowl a
              diorama mid-stride; glass eyes catch your lantern and throw it back. Everything is very still — too
              still, the way a room is still when something in it is pretending not to move.
            </ReadAloud>

            <DMSecret heading="Foreshadowing the Wake">
              Seed dread before any monster appears. A stuffed fox&apos;s head turns a few degrees when no one
              watches. A jar of preserved frogs taps against its glass. The closer the crew gets to the
              meteorite, the worse it gets. Reward players who notice and stay calm; this is the calm before
              Beat 5.
            </DMSecret>

            <SectionTitle color="#6B7FA0">Patrols & The Curator</SectionTitle>
            <BulletList
              items={[
                <>One or two <strong>night guards</strong> walk a slow loop. Use them as a stealth puzzle, not a fight — they&apos;d rather raise the alarm than trade blows.</>,
                <><strong>Curator Alda Arkin</strong> is awake in her office. She is not a combatant, but she is sharp, protective of her collection, and her wing is warded.</>,
                <>The meteorite sits under glass in the <strong>upper gallery</strong>, in a case wired to the alarm.</>,
              ]}
            />

            <SkillCheck dc={13} skill="Dexterity (Stealth)" title="Slip the Patrol" pass="The crew threads past the guard&apos;s loop unseen." fail="A guard catches movement; they investigate and will shout for the watch if they confirm intruders." />
            <SkillCheck dc={15} skill="Dexterity (Thieves’ Tools) / Arcana" title="Defeat the Display Case" pass="The case opens silently and the alarm wire is bypassed." fail="The case can still be forced — but doing so trips the alarm and spikes the meteorite&apos;s pulse, jumping straight to Beat 5." />

            <NextBeatButton targetId="scene-5" label="Beat 5: The Malevolence Wakes" />
          </Content>
        </section>

        {/* BEAT 5 */}
        <section id="scene-5" className="relative" style={{ background: beats[4].bgTint }}>
          <BeatHeader beat={beats[4]} />
          <Content>
            <ReadAloud title="The Stone Comes Free">
              The instant the meteorite leaves its cradle the cold deepens, the lanterns gutter, and a low pulse
              rolls out of the stone like a heartbeat felt in the teeth. All around the gallery, glass eyes
              snap open. Stitched jaws creak apart. The bear lowers its head, and a hundred dead things remember
              how to be hungry.
            </ReadAloud>

            <DMSecret heading="The Necrotic Pulse">
              Removing the stone (or forcing the case) triggers the wake. Each round the meteorite is exposed,
              the nearest unanimated specimen lurches to life. Keep it tense but survivable for level 1: a wolf
              or two, a swarm of jarred specimens, and the stuffed owlbear as the centerpiece. Full stat blocks
              are on the <strong>Bestiary</strong> page. Wrapping the stone in heavy cloth or a lead-lined case
              (a clever prep) muffles the pulse and slows the wake.
            </DMSecret>

            <SectionTitle color="#C47171">The Wake — Suggested Waves</SectionTitle>
            <BulletList
              items={[
                <><strong>Round 1:</strong> a single <strong>Animated Taxidermy Wolf</strong> lunges from the diorama.</>,
                <><strong>Round 2:</strong> a <strong>Specimen-Jar Swarm</strong> bursts its glass nearby.</>,
                <><strong>Round 3+:</strong> the <strong>Stuffed Owlbear Trophy</strong> tears free of its mount — the room&apos;s big threat.</>,
              ]}
            />

            <div className="p-5 rounded-xl my-5" style={{ background: 'rgba(139,58,58,0.08)', border: '1px solid rgba(139,58,58,0.2)' }}>
              <h4 className="text-[0.8rem] tracking-[0.12em] uppercase mb-3" style={{ fontFamily: "'Cinzel Decorative', serif", color: '#C47171' }}>Run the Wake</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <HpTracker storageKey="murk-wolf-1" name="Taxidermy Wolf" maxHp={19} accent="#C47171" />
                <HpTracker storageKey="murk-swarm" name="Specimen Swarm" maxHp={22} accent="#C47171" />
              </div>
              <HpTracker storageKey="murk-owlbear" name="Owlbear Trophy" maxHp={45} accent="#C47171" />
              <p className="text-[0.85rem] mt-2" style={{ color: 'rgba(245,240,230,0.6)' }}>
                <em>The smart play is to flee, not to win. The animated horde is endless while the stone is exposed — escaping ends the fight.</em>
              </p>
            </div>

            <NextBeatButton targetId="scene-6" label="Beat 6: The Getaway" />
          </Content>
        </section>

        {/* BEAT 6 */}
        <section id="scene-6" className="relative" style={{ background: beats[5].bgTint }}>
          <BeatHeader beat={beats[5]} />
          <Content>
            <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center py-8">
              <Gem size={32} color={GOLD} className="mx-auto mb-4" />
              <h3 className="text-[1.8rem] font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD }}>Out Into the Fog</h3>
              <p className="text-[1rem] max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.7)' }}>
                With the stone in hand and the gallery coming alive behind them, the crew runs for whichever
                exit they prepared. The fog of Varkenbluff swallows them — and the museum falls still the
                moment the Malevolence is carried beyond its walls.
              </p>
            </motion.div>

            <SectionTitle color={GOLD}>Resolving the Escape</SectionTitle>
            <BulletList
              items={[
                <>The animated specimens <strong>collapse back into dead trophies</strong> once the stone is gone — they don&apos;t pursue into the street.</>,
                <>The watch, the curator, and the town&apos;s memory of the night are the real loose ends.</>,
                <>The <strong>Golden Vault</strong> makes contact again to take delivery and pay out — more for a clean job.</>,
              ]}
            />

            <DMSecret heading="Payout & Fallout">
              Full payout tables, complications, and follow-up hooks live on the <strong>Getaway</strong> page.
              In short: a quiet, bloodless lift earns the bonus and the Vault&apos;s future business; a loud,
              violent night still pays, but leaves a trail — and maybe an angry curator — for later.
            </DMSecret>

            <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center py-12">
              <Star size={28} color={GOLD} className="mx-auto mb-4" />
              <h3 className="text-[1.5rem] font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD }}>End of the Job</h3>
              <p className="text-[1rem] max-w-xl mx-auto inline-flex flex-col" style={{ color: 'rgba(245,240,230,0.5)' }}>
                <span>The stone is contained, the crew is paid, and the Golden Vault remembers a job well done.</span>
                <a href="/conclusion" className="mt-3 inline-flex items-center justify-center gap-1" style={{ color: GOLD }}>
                  See the full Getaway <ChevronRight size={14} />
                </a>
              </p>
            </motion.div>
          </Content>
        </section>
      </div>
    </BeatProgressContext.Provider>
  );
}
