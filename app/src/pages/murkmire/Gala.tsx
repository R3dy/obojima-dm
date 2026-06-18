import { motion } from 'framer-motion';
import { Users, Gem, ClipboardList } from 'lucide-react';
import { ReadAloud, DMSecret, SkillCheck } from '../../components/DMCallouts';
import Figure from './Figure';
import { SectionHero, SectionNav, DataTable } from './SectionNav';

const ACCENT = '#3E7C6A';
const GOLD = '#C9A84C';

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const attendees: [string, string][] = [
  ['1', 'Captain Frankheim Walters (chaotic neutral human), who never served in the military but heavily implies he did.'],
  ['2', 'Georgina Lucina Vandylarahal (neutral evil elf), a sneering heir to a mining fortune.'],
  ['3', 'Countess Helene Danforth (neutral good human), of an ancient, titled family with little actual wealth.'],
  ['4', 'Dr. Horthnar Stonecrusher (lawful good dwarf), a surgeon who loves natural history and gemstones.'],
];

const gossip: [string, string][] = [
  ['1', 'The curator keeps fidgeting with her clutch all night. Bad news? Maybe she’s about to fire someone.'],
  ['2', 'Sometimes the museum hides displays in the basement at night — as if the curator fears her own guards.'],
  ['3', 'The museum has fallen on hard times. They keep a fortune in ore and gem samples down in the basement.'],
  ['4', 'The curator adores oversized vintage dolls — she keeps one in her office as big as a grown human!'],
];

export default function Gala() {
  return (
    <div className="min-h-[100dvh] pt-16">
      <SectionHero
        num={2}
        subtitle="The crew’s one chance to see the Murkmire Stone — and its security — before the heist. The gala runs 6–8 p.m. in the second-floor Gemstone Wing; the rest of the museum is open to the public."
      />

      <div className="max-w-container-narrow mx-auto px-4 pb-24 space-y-10">
        <ReadAloud title="Arriving at the Museum">
          The facade of the Varkenbluff Museum of Natural History boasts enormous columns and elegant archways hewn
          from marble. Cosmopolitan visitors bustle about the entrance, including some clad in sleek formal wear.
        </ReadAloud>

        <motion.p variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-body text-[1rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.85)' }}>
          The museum is open to the public today; only the Gemstone Wing on the second floor is closed for the
          ticketed gala, and the Murkmire Stone sits at its center. <strong>Maryam Bikram</strong> (lawful neutral
          human <strong>guard</strong>), captain of the security force, admits only guests who carry a ticket and are
          dressed for the occasion. Weapons and visible armor aren&apos;t permitted inside — the crew must stash their
          adventuring gear in Dr. Dannell&apos;s <em>bag of holding</em>. Keep track of who is carrying it.
        </motion.p>

        <Figure
          src="/murkmire/scene_gala.webp"
          alt="The opening gala in the museum's second-floor Gemstone Wing"
          caption="The Opening Gala · Gemstone Wing (V13)"
          kind="handout"
          className="h-96"
          fit="cover"
        />

        <ReadAloud title="Inside the Gala">
          The Gemstone Wing&apos;s oak doors open into a luxuriously appointed ballroom. Crimson tablecloths and fine
          china adorn dining tables, and chandeliers sparkle overhead. Cabinets with glittering gemstones surround the
          space. At the wing&apos;s center is a marble pedestal bearing a peculiar, light-green stone.
        </ReadAloud>

        <DMSecret heading="Two Hours to Case the Job">
          The characters have roughly two hours before the museum closes at 8 p.m. Everything is public except the
          offices (areas V5–V7), the basement (V16), and the attic (V17). As long as the crew isn&apos;t caught
          entering a restricted area or causing a scene, the guards ignore them — though they&apos;ll periodically
          nudge formally-dressed guests toward the Gemstone Wing. If a character is spotted somewhere they
          shouldn&apos;t be, roll on the Gala Attendees and Museum Guards tables in the source as needed: a guard in
          formal dress is escorted back to the gala, while anyone improperly dressed is told to leave. Protest and the
          guard turns hostile, shouting for backup (1d4 more guards arrive each round). A character can wave off a
          single pre-backup guard with a <strong>DC 10 Charisma (Deception, Intimidation, or Persuasion)</strong>
          check — but only once per guard.
        </DMSecret>

        {/* WORKING THE ROOM */}
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-2xl p-6 sm:p-7" style={{ background: 'linear-gradient(135deg, #16241F 0%, #12100D 100%)', border: `1px solid ${ACCENT}26`, borderTop: '3px solid #6B7FA0' }}>
          <div className="flex items-center gap-2 mb-3">
            <Users size={18} color="#6B7FA0" />
            <h2 className="text-heading-lg text-parchment">Working the Room</h2>
          </div>
          <p className="font-body text-[0.95rem] leading-relaxed mb-2" style={{ color: 'rgba(245,240,230,0.8)' }}>
            Twenty unarmed, unarmored <strong>nobles</strong> mill about in finery — mostly long-time donors. They know
            nothing about the stone beyond its discovery, but a little charm loosens tongues.
          </p>
          <DataTable columns={['d4', 'Gala Attendee']} rows={attendees} />
          <SkillCheck
            dc={12}
            skill="Charisma (Persuasion)"
            title="Fish for Information"
            pass="An attendee shares one random piece of Museum Gossip below."
            fail="The attendee deflects with small talk and reveals nothing useful."
          />
          <DataTable columns={['d4', 'Museum Gossip']} rows={gossip} />
        </motion.section>

        <DMSecret heading="Curator Alda Arkin">
          Mingling among the guests is <strong>Alda Arkin</strong> (neutral evil elf <strong>noble</strong>), the
          museum&apos;s curator and a retired university professor. She assumes the characters are wealthy donors and
          makes chitchat. Alda knows Dr. Dannell and <em>despises</em> her for her occult leanings; mention the
          anthropologist&apos;s fears about the stone and Alda snorts, dismisses them, and walks off to mingle
          elsewhere. Characters who watch her closely notice a fancy <strong>clutch</strong> she keeps behind her back.
          Inside it: a map of the guards&apos; after-hours stations, a <strong>master key</strong>, and an alarm
          <strong> pass card</strong>.
        </DMSecret>

        <SkillCheck
          dc={14}
          skill="Dexterity (Sleight of Hand)"
          title="Lift Arkin's Clutch"
          pass="The crew secures the patrol map, master key, and pass card in one stroke — an enormous edge after hours."
          fail="Arkin feels the brush of a hand and grows wary; the clutch stays with her. (If they miss it, a copy of the patrol routes still sits on her office desk in V5.)"
        />

        <DMSecret heading="Examining the Murkmire Stone">
          The stone rests on a marble pedestal flanked by placards about its discovery and theories of its use — though
          Dr. Dannell&apos;s occult theory is conspicuously absent. A character who spends at least one minute studying
          the pedestal realizes it has an elaborate defense mechanism (the rigged pedestal detailed in Beat 5). This is
          the moment to learn that lifting the stone carelessly will lock down the entire wing.
        </DMSecret>

        {/* INTEL CHECKLIST */}
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-6 rounded-xl" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.25)' }}>
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList size={18} color={GOLD} />
            <h2 className="text-heading-lg text-parchment">Worth Walking Away With</h2>
          </div>
          <ul className="space-y-2.5">
            {[
              <>The <strong>pedestal&apos;s defense mechanism</strong> — and the plan to swap in a fake or open it carefully.</>,
              <>The guards&apos; <strong>after-hours patrol routes</strong>, from Arkin&apos;s clutch or her office desk (V5).</>,
              <>A <strong>pass card</strong> and <strong>master key</strong> lifted from Arkin — or the spare pass cards stashed in the break room (V7).</>,
              <>The <strong>jade fake</strong> in the Underground Wonders exhibit (V9), a near-match for the egg in size and weight.</>,
              <>Good <strong>hiding spots</strong> for staying inside past closing, and the <strong>entry routes</strong> for sneaking back in.</>,
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Gem size={14} color={GOLD} className="mt-1 shrink-0" />
                <span className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.85)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <SectionNav current={2} />
      </div>
    </div>
  );
}
