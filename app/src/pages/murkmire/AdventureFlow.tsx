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
  { id: 'scene-1', number: 1, title: 'Meet Dr. Dannell', icon: KeyRound, accent: GOLD, bgTint: 'rgba(201,168,76,0.04)' },
  { id: 'scene-2', number: 2, title: 'The Opening Gala', icon: Eye, accent: '#6B7FA0', bgTint: 'rgba(107,127,160,0.04)' },
  { id: 'scene-3', number: 3, title: 'Into the Museum', icon: DoorOpen, accent: ACCENT, bgTint: 'rgba(62,124,106,0.05)' },
  { id: 'scene-4', number: 4, title: 'Through the Galleries', icon: Landmark, accent: '#6B4C7A', bgTint: 'rgba(107,76,122,0.05)' },
  { id: 'scene-5', number: 5, title: 'Taking the Stone', icon: Skull, accent: '#8B3A3A', bgTint: 'rgba(139,58,58,0.05)' },
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
            A beat-by-beat guide for the Dungeon Master. The crew can crack this job a dozen ways — these six beats
            carry the night from Dr. Dannell&apos;s plea to the egg in her hands before midnight.
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
            <ReadAloud title="A Cry for Help">
              No matter your business this morning, a grave halfling messenger finds you and hands you a sealed
              parchment. &ldquo;Meet me at the Sage&rsquo;s Quill today as soon as you can,&rdquo; the missive reads.
              &ldquo;I beg your help in a delicate matter whose importance cannot be overstated. I shall await you in
              a purple hooded robe.&rdquo; It is signed, &ldquo;Dr. Cassee Dannell.&rdquo; When you look up, the
              halfling has wandered off.
            </ReadAloud>

            <DMSecret heading="Setting the Tone">
              This is a heist against the clock, not a brawl. Dr. Dannell (neutral good human commoner, Int 18) is
              honest and desperate. Decide with players how they know her — family friend, fan of her work, or former
              student. The full meeting, including her negotiable reward, lives on the <strong>Briefing</strong>
              page. If you&apos;re framing this for the Golden Vault, a golden key and music box deliver the job
              instead, naming Dr. Dannell as the contact.
            </DMSecret>

            <SectionTitle color={GOLD}>What Dr. Dannell Provides</SectionTitle>
            <BulletList
              items={[
                <>The job: steal the <strong>Murkmire Stone</strong> (an eldritch egg) from the museum and bring it to her in the alley before it hatches at <strong>midnight</strong>.</>,
                <>A <strong>gala ticket</strong> and <strong>formal attire</strong> for each character (weapons and visible armor are banned inside).</>,
                <>The loan of her heirloom <strong>bag of holding</strong> to stash adventuring gear.</>,
                <>Her hand-drawn <strong>map</strong> (incomplete; no alarm locations) and what she knows: twelve guards, and Curator Alda Arkin keeps the patrol routes in her office.</>,
                <>Reward: the bag of holding plus 20 gp each (30 gp on a DC 13 Persuasion check).</>,
              ]}
            />

            <NextBeatButton targetId="scene-2" label="Beat 2: The Opening Gala" />
          </Content>
        </section>

        {/* BEAT 2 */}
        <section id="scene-2" className="relative" style={{ background: beats[1].bgTint }}>
          <BeatHeader beat={beats[1]} />
          <Content>
            <ReadAloud title="Inside the Gala">
              The Gemstone Wing&rsquo;s oak doors open into a luxuriously appointed ballroom. Crimson tablecloths and
              fine china adorn dining tables, and chandeliers sparkle overhead. Cabinets with glittering gemstones
              surround the space. At the wing&rsquo;s center is a marble pedestal bearing a peculiar, light-green
              stone.
            </ReadAloud>

            <DMSecret heading="Scouting Under Cover of the Party">
              The gala runs 6–8 p.m. on the second-floor Gemstone Wing (V13); the rest of the museum is open to the
              public. This is the crew&apos;s one chance to see the stone and its security before the heist. Maryam
              Bikram admits only ticketed guests in formal dress. Twenty nobles mingle — a DC 12 Persuasion check
              earns one piece of Museum Gossip. Guards ignore well-behaved guests but escort or eject anyone in a
              restricted area; a pre-backup guard can be waved off with a DC 10 Charisma check.
            </DMSecret>

            <SectionTitle color="#6B7FA0">Key Opportunities</SectionTitle>
            <BulletList
              items={[
                <><strong>Curator Alda Arkin</strong> chitchats with “donors,” but holds a clutch behind her back containing the guards&apos; patrol map, a master key, and an alarm pass card.</>,
                <>Mention Dr. Dannell&apos;s fears and Arkin snorts, dismisses them, and walks off — she despises the anthropologist.</>,
                <>A minute studying the pedestal reveals it has an elaborate defense mechanism (the rigged pedestal in V13).</>,
                <>The party can scout the public galleries for pass cards (V7), keys, the fake jade (V9), and hiding spots before 8 p.m.</>,
              ]}
            />

            <SkillCheck dc={14} skill="Dexterity (Sleight of Hand)" title="Lift Arkin's Clutch" pass="The crew secures the patrol map, master key, and pass card in one stroke — a huge edge after hours." fail="Arkin notices the brush of a hand and grows wary; the clutch stays with her." />

            <NextBeatButton targetId="scene-3" label="Beat 3: Into the Museum" />
          </Content>
        </section>

        {/* BEAT 3 */}
        <section id="scene-3" className="relative" style={{ background: beats[2].bgTint }}>
          <BeatHeader beat={beats[2]} />
          <Content>
            <BodyText>
              The museum closes at 8 p.m., and the staff arm its defenses — alarm spells, animated statues, and the
              Gemstone Wing&apos;s arcane lock. The crew must already be inside or find a way back in. There is no
              single correct route; present the options and let them improvise. Room details are on the
              <strong> Museum</strong> page.
            </BodyText>

            <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="p-5 rounded-xl my-4" style={{ background: 'rgba(62,124,106,0.12)', border: `1px solid ${ACCENT}4D` }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded text-[0.6rem] tracking-wider uppercase font-bold" style={{ background: `${ACCENT}4D`, color: ACCENT_LIGHT }}>QUIET</span>
              </div>
              <h4 className="text-[1.1rem] font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>Hide Inside Until It Closes</h4>
              <p className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>
                Slip into the cleaning-supply closets behind the secret doors (V3, V4, V8, V9, V12, V13), a privy
                stall (V15), or the attic or basement — the guards don&apos;t sweep V16 or V17 before closing.
              </p>
            </motion.div>

            <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} className="p-5 rounded-xl my-4" style={{ background: 'rgba(107,76,122,0.08)', border: '1px solid rgba(107,76,122,0.2)' }}>
              <h4 className="text-[1.1rem] font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>Leave and Sneak Back After Hours</h4>
              <p className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>
                Pick the front doors (DC 16) and bypass their alarm with a pass card — minding the net trap and the
                statues. Scale the building and unlock the <strong>attic skylight</strong> (DC 14, then DC 12 to
                lift). Or pry open the <strong>basement loading docks</strong> (DC 14, then DC 15 Athletics) or use
                the basement&apos;s secret tunnel from a copse of trees outside.
              </p>
            </motion.div>

            <TrapWarning
              name="Falling Net (V1)"
              trigger="Stepping on the rug-hidden pressure plate north of the front doors while it’s armed"
              effect="A weighted net drops over the 10-ft square: restrained, and prone on a failed DC 10 Strength save. Net AC 10, 12 HP; DC 10 Strength to free a creature."
              countermeasure="Lift the rug to find the plate, or flip the toggle hidden under the information desk to disarm it."
            />

            <NextBeatButton targetId="scene-4" label="Beat 4: Through the Galleries" />
          </Content>
        </section>

        {/* BEAT 4 */}
        <section id="scene-4" className="relative" style={{ background: beats[3].bgTint }}>
          <BeatHeader beat={beats[3]} />
          <Content>
            <ReadAloud title="The Darkened Halls">
              By night the museum is a maze of frozen things — skeletal predators rearing in the dark, glass cases
              glinting under continual-flame sconces, the preserved allosaurus looming over the predators&apos; hall.
              Lanterns bob in the distance where the guards walk their slow, fixed rounds.
            </ReadAloud>

            <DMSecret heading="Running the Patrols & Wards">
              Eleven guards hold fixed posts after hours (Maryam keeps the gala entrance); see the Guard Locations
              table on the <strong>Encounters</strong> page. Treat them as a stealth challenge — studying the
              curator&apos;s patrol document for a minute grants advantage on Stealth. Alarm spells guard key doors
              and squares; a pass card bypasses them. The two front-desk statues (V1) and the satyr statue (V12)
              animate within 5 feet. Getting every character caught ends the mission.
            </DMSecret>

            <SectionTitle color="#6B7FA0">Reaching the Stone</SectionTitle>
            <BulletList
              items={[
                <>The Murkmire Stone sits in the <strong>Gemstone Wing (V13)</strong>, reached via the second floor, the V9 secret hall, or the V12 air vent.</>,
                <>Lift a guard&apos;s <strong>key or pass card</strong> with a hidden DC 14 Sleight of Hand check, or grab spare pass cards in the break room (V7).</>,
                <>Optional chaos: overload the <strong>animatronic allosaurus</strong> (DC 10 Arcana) for a 10-minute rampage that draws guards away.</>,
                <>Grab the <strong>jade fake</strong> from V9 (DC 10) if the crew means to swap it for the egg.</>,
              ]}
            />

            <SkillCheck dc={13} skill="Dexterity (Stealth)" title="Slip the Patrol" pass="The crew threads past a guard&apos;s post unseen (advantage if they studied the patrol document)." fail="A guard catches movement and investigates; confirmed intruders trigger alarms and 1d4 guards per round in a fight." />

            <NextBeatButton targetId="scene-5" label="Beat 5: Taking the Stone" />
          </Content>
        </section>

        {/* BEAT 5 */}
        <section id="scene-5" className="relative" style={{ background: beats[4].bgTint }}>
          <BeatHeader beat={beats[4]} />
          <Content>
            <ReadAloud title="The Egg in Hand">
              Up close, the light-green stone is faintly warm and threaded with strange furrows. After 10:30 it has
              turned translucent — and something inside shifts. Lift it wrong and a low magical pulse rolls outward,
              every locked door in the wing slamming shut with a sound like a held breath.
            </ReadAloud>

            <DMSecret heading="The Rigged Pedestal & the Pulse">
              A DC 12 Arcana check on the pedestal warns that removing the stone triggers arcane lock on every door
              (escape: DC 20 thieves&apos; tools or DC 20 Athletics; guards and Arkin open them freely). Swapping in
              the V9 jade fake (DC 10 Sleight of Hand) avoids it entirely. Independently, at 10:30 p.m. the egg
              begins pulsing every 10 minutes — a DC 10 Wisdom save within 20 feet or a random effect (see the
              Murkmire Stone Effects table on Encounters). Stowing it in the bag of holding makes the pulse radiate
              from the bag instead.
            </DMSecret>

            <SectionTitle color="#C47171">If It Goes Loud</SectionTitle>
            <BulletList
              items={[
                <>A fight or alarm brings <strong>1d4 guards each round</strong> until all eleven are accounted for.</>,
                <>Incapacitated or surrendered characters are dragged to the city watch; if all are caught, the mission fails.</>,
                <><strong>The clock is the real enemy:</strong> the egg hatches at midnight no matter what. Keep one eye on the time.</>,
              ]}
            />

            <div className="p-5 rounded-xl my-5" style={{ background: 'rgba(139,58,58,0.08)', border: '1px solid rgba(139,58,58,0.2)' }}>
              <h4 className="text-[0.8rem] tracking-[0.12em] uppercase mb-3" style={{ fontFamily: "'Cinzel Decorative', serif", color: '#C47171' }}>Guardians, If Drawn Into a Fight</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <HpTracker storageKey="murk-statue-1" name="Animated Statue" maxHp={33} accent="#C47171" />
                <HpTracker storageKey="murk-marigold" name="Marigold (Scarecrow)" maxHp={36} accent="#C47171" />
              </div>
              <HpTracker storageKey="murk-mimic" name="Basement Mimic" maxHp={58} accent="#C47171" />
              <p className="text-[0.85rem] mt-2" style={{ color: 'rgba(245,240,230,0.6)' }}>
                <em>Full stat blocks are on the Bestiary page. None of these need to be fought — the smart play is to avoid them and get out.</em>
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
              <h3 className="text-[1.8rem] font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD }}>The Egg to Dr. Dannell</h3>
              <p className="text-[1rem] max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.7)' }}>
                With the stone in hand, the crew slips out and crosses to the alley between the museum and the
                Sage&apos;s Quill, where Dr. Dannell waits. She locks the egg in her crystal box; the stone goes
                inert and its effects stop at once. The city is safe — for now.
              </p>
            </motion.div>

            <SectionTitle color={GOLD}>Resolving the Heist</SectionTitle>
            <BulletList
              items={[
                <>Deliver the egg <strong>before midnight</strong> and Dr. Dannell neutralizes it; she pays the reward (bag of holding plus 20–30 gp each).</>,
                <>If the crew works for the <strong>Golden Vault</strong>, the organization sends an uncommon magic item of their choice the next day.</>,
                <>Miss the deadline and the egg <strong>hatches into an eldritch horror</strong> — and Arkin may be revealed as a syndicate head (see Getaway).</>,
              ]}
            />

            <DMSecret heading="Rewards & Further Adventures">
              Full reward details, the success and failure outcomes, and follow-up hooks (another stone, the zoo
              hatchling, reinstating Dr. Dannell, or the museum feeding frenzy) live on the <strong>Getaway</strong>
              page.
            </DMSecret>

            <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center py-12">
              <Star size={28} color={GOLD} className="mx-auto mb-4" />
              <h3 className="text-[1.5rem] font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD }}>End of the Heist</h3>
              <p className="text-[1rem] max-w-xl mx-auto inline-flex flex-col" style={{ color: 'rgba(245,240,230,0.5)' }}>
                <span>The egg is contained, the crew is paid, and Varkenbluff sleeps on, none the wiser.</span>
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
