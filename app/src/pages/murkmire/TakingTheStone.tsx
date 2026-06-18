import { motion } from 'framer-motion';
import { Hourglass, Swords, RefreshCw, Hand } from 'lucide-react';
import { ReadAloud, DMSecret, SkillCheck } from '../../components/DMCallouts';
import HpTracker from '../../components/HpTracker';
import { SectionHero, SectionNav } from './SectionNav';

const ACCENT = '#3E7C6A';
const GOLD = '#C9A84C';
const BLOOD = '#C47171';

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

function PlayCard({
  icon: Icon,
  accent,
  title,
  children,
}: {
  icon: React.ElementType;
  accent: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fade}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="p-5 rounded-xl"
      style={{ background: 'linear-gradient(135deg, #16241F 0%, #12100D 100%)', border: `1px solid ${ACCENT}26`, borderLeft: `3px solid ${accent}` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} color={accent} />
        <h3 className="text-[1.1rem] font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>{title}</h3>
      </div>
      <div className="font-body text-[0.93rem] leading-relaxed space-y-2" style={{ color: 'rgba(245,240,230,0.8)' }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function TakingTheStone() {
  return (
    <div className="min-h-[100dvh] pt-16">
      <SectionHero
        num={5}
        subtitle="The egg is on its pedestal — but lifting it wrong slams the wing shut, and after 10:30 it begins to pulse. The clock, not the guards, is the real enemy."
      />

      <div className="max-w-container-narrow mx-auto px-4 pb-24 space-y-10">
        <ReadAloud title="The Egg in Hand">
          Up close, the light-green stone is faintly warm and threaded with strange furrows. After 10:30 it has turned
          translucent — and something inside shifts. Lift it wrong and a low magical pulse rolls outward, every locked
          door in the wing slamming shut with a sound like a held breath.
        </ReadAloud>

        <DMSecret heading="The Rigged Pedestal">
          A <strong>DC 12 Intelligence (Arcana)</strong> check on the pedestal reads tiny glyphs warning that removing
          the stone activates <em>arcane lock</em> on every door leading to the room, including the secret doors.
          Opening a locked door then takes a <strong>DC 20</strong> thieves&apos; tools check or DC 20 Strength
          (Athletics) check — but the curator and guards open them freely, so a lockdown is a race against responders.
          The pedestal is fixed to the floor and can&apos;t be moved.
        </DMSecret>

        {/* SWAP VS GRAB */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PlayCard icon={RefreshCw} accent={ACCENT} title="The Careful Swap">
            <p>
              Replace the stone with the <strong>jade fake</strong> from V9. A successful <strong>DC 10 Dexterity
              (Sleight of Hand)</strong> check makes the switch without ever tripping the <em>arcane lock</em> — the
              cleanest exit in the adventure.
            </p>
          </PlayCard>
          <PlayCard icon={Hand} accent={BLOOD} title="The Snatch and Run">
            <p>
              Simply take it. The wing locks down (DC 20 doors), and now the crew must escape a sealed room while guards
              and Arkin converge through doors that open only for them. Loud, fast, and dangerous.
            </p>
          </PlayCard>
        </div>

        <SkillCheck
          dc={12}
          skill="Intelligence (Arcana)"
          title="Read the Pedestal"
          pass="The character spots the glyphs and understands the lockdown before lifting the stone — time to fetch the fake or brace for a sealed-room escape."
          fail="The defense goes unnoticed; lifting the stone triggers the arcane lock unexpectedly."
        />

        {/* THE PULSE */}
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-2xl p-6 sm:p-7" style={{ background: 'linear-gradient(135deg, #16241F 0%, #12100D 100%)', border: `1px solid ${ACCENT}26`, borderTop: `3px solid ${GOLD}` }}>
          <div className="flex items-center gap-2 mb-3">
            <Hourglass size={18} color={GOLD} />
            <h2 className="text-heading-lg text-parchment">The Pulse &amp; the Deadline</h2>
          </div>
          <p className="font-body text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>
            Independently of the heist, at <strong>10:30 p.m.</strong> the egg&apos;s shell turns translucent and it
            begins emitting a pulse of magic every 10 minutes. Each creature within 20 feet must make a
            <strong> DC 10 Wisdom save</strong> (disadvantage while holding the egg) or suffer a random effect until the
            next pulse — see the <strong>Murkmire Stone Effects</strong> table on the Encounters page. Stowing the egg in
            the <em>bag of holding</em> makes the pulse radiate from the bag instead. It all ends the instant Dr. Dannell
            seals the egg in crystal — or at <strong style={{ color: GOLD }}>midnight</strong>, when it hatches.
          </p>
        </motion.section>

        {/* IF IT GOES LOUD */}
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-6 rounded-xl" style={{ background: 'rgba(139,58,58,0.08)', border: '1px solid rgba(139,58,58,0.25)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Swords size={18} color={BLOOD} />
            <h2 className="text-heading-lg text-parchment">If It Goes Loud</h2>
          </div>
          <ul className="space-y-2.5 mb-5">
            {[
              <>A fight or alarm brings <strong>1d4 guards each round</strong> until all eleven are accounted for.</>,
              <>Incapacitated or surrendered characters are hauled to the city watch; if every character is caught, the mission fails.</>,
              <><strong>The clock is the real enemy:</strong> the egg hatches at midnight no matter what. Keep one eye on the time and favor escape over a stand-up fight.</>,
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: BLOOD }} />
                <span className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.85)' }}>{item}</span>
              </li>
            ))}
          </ul>
          <h3 className="text-[0.8rem] tracking-[0.12em] uppercase mb-3" style={{ fontFamily: "'Cinzel Decorative', serif", color: BLOOD }}>
            Guardians, If Drawn Into a Fight
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <HpTracker storageKey="murk-statue-1" name="Animated Statue" maxHp={33} accent={BLOOD} />
            <HpTracker storageKey="murk-marigold" name="Marigold (Scarecrow)" maxHp={36} accent={BLOOD} />
          </div>
          <HpTracker storageKey="murk-mimic" name="Basement Mimic" maxHp={58} accent={BLOOD} />
          <p className="text-[0.85rem] mt-2" style={{ color: 'rgba(245,240,230,0.6)' }}>
            <em>Full stat blocks are on the Bestiary page. None of these need to be fought — the smart play is to avoid them and get out.</em>
          </p>
        </motion.section>

        <SectionNav current={5} />
      </div>
    </div>
  );
}
