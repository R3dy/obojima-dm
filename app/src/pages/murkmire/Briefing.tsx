import { motion } from 'framer-motion';
import { KeyRound, Target, ShieldCheck, Coins, Map as MapIcon } from 'lucide-react';
import { ReadAloud, DMSecret, SkillCheck } from '../../components/DMCallouts';
import Figure from './Figure';
import { SectionNav } from './SectionNav';

const ACCENT = '#3E7C6A';
const ACCENT_LIGHT = '#6FB3A0';
const GOLD = '#C9A84C';

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

function IntelCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fade}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="rounded-xl p-6"
      style={{ background: 'linear-gradient(135deg, #16241F 0%, #12100D 100%)', border: `1px solid ${ACCENT}26` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon size={17} color={ACCENT} />
        <h3 className="text-heading-lg text-parchment">{title}</h3>
      </div>
      <div className="font-body text-[0.95rem] leading-relaxed space-y-2" style={{ color: 'rgba(245,240,230,0.8)' }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function Briefing() {
  return (
    <div className="min-h-[100dvh] pt-16">
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-container-narrow mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <KeyRound size={22} color={GOLD} />
              <span className="text-label tracking-[0.12em]" style={{ color: GOLD }}>
                THE HEIST · BEAT 1 OF 6
              </span>
            </div>
            <h1 className="text-display-md text-parchment">Meeting Dr. Dannell</h1>
            <p className="font-body text-[1.05rem] mt-4 leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
              At the Sage&apos;s Quill, the disgraced anthropologist lays out the job — and hands the crew the
              tickets, tools, and map they&apos;ll need to pull it off.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-container-narrow mx-auto px-4 pb-24 space-y-10">
        <ReadAloud title="The Clock Is Ticking">
          As you enter the Sage&apos;s Quill, soft light reveals mahogany furniture and luxurious carpets. A few
          genteel patrons murmur in the lounge. You soon notice a purple-hooded figure tucked into a corner booth.
          Dr. Dannell gestures for you to sit. You notice lines of worry etched into her normally cheerful face.
        </ReadAloud>

        <Figure
          src="/murkmire/portrait_dannell.webp"
          alt="Dr. Cassee Dannell, the anthropologist who hires the party"
          caption="Dr. Cassee Dannell · The Quest Giver"
          kind="portrait"
          className="h-96"
          fit="contain"
        />

        <DMSecret heading="Running Dr. Dannell">
          Dr. Cassee Dannell is a neutral good human <strong>commoner</strong> with an Intelligence score of 18 — a
          brilliant academic, not a fighter. She is anxious, exhausted, and out of official options. She answers
          every question the characters have about the egg and the museum honestly, because their success is the
          only thing standing between Varkenbluff and an eldritch horror. She will wait in the alley between the
          museum and the Sage&apos;s Quill to receive the egg.
        </DMSecret>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <IntelCard icon={Target} title="The Target">
            <p>
              The <strong style={{ color: ACCENT_LIGHT }}>Murkmire Stone</strong> — an opaque, light-green, furrowed
              ovoid that weighs 10 pounds. It is the egg of an eldritch creature. It <strong>can&apos;t be damaged or
              destroyed</strong>, and unearthing it has triggered the creature within to rapidly develop.
            </p>
            <p>It sits on a marble pedestal in the second-floor Gemstone Wing. Steal it and bring it back — nothing else.</p>
          </IntelCard>

          <IntelCard icon={MapIcon} title="The Place">
            <p>
              The <strong style={{ color: ACCENT_LIGHT }}>Varkenbluff Museum of Natural History</strong>, beside the
              Sage&apos;s Quill and less than a mile from Varkenbluff University.
            </p>
            <p>
              The Murkmire Stone display opens to the public tomorrow. A private gala celebrating it runs tonight
              from 6 p.m. in the Gemstone Wing; the museum closes at 8 p.m.
            </p>
          </IntelCard>

          <IntelCard icon={ShieldCheck} title="Containing the Egg">
            <p>
              The only way to keep the egg from hatching is to encase it in specially prepared crystal. Dr. Dannell
              has built a <strong>crystal box</strong> for exactly this — but she still needs to seal cracks in it,
              so the characters can&apos;t take it on the heist.
            </p>
            <p>By her research, the egg hatches at <strong style={{ color: GOLD }}>midnight tonight</strong>. Deliver it before then.</p>
          </IntelCard>

          <IntelCard icon={Coins} title="The Reward">
            <p>
              For bringing back the Murkmire Stone, Dr. Dannell offers her heirloom <strong style={{ color: GOLD }}>bag
              of holding</strong> plus <strong>20 gp per character</strong>.
            </p>
            <p>If the crew is using the Golden Vault as a patron, the organization also pays an uncommon magic item of their choice on success.</p>
          </IntelCard>
        </div>

        <SkillCheck
          dc={13}
          skill="Charisma (Persuasion)"
          title="Negotiate the Pay"
          pass="Dr. Dannell increases her offer to 30 gp per character (in addition to the bag of holding)."
          fail="She holds at her original offer: the bag of holding plus 20 gp per character."
        />

        <DMSecret heading="Dr. Dannell's Tools">
          Before her own failed attempt, Dr. Dannell scouted the museum as a patron and sketched its layout. At the
          meeting she provides each character with:
          <ul className="mt-2 ml-4 list-disc space-y-1">
            <li>A <strong>gala ticket</strong> — the only way to glimpse the stone and its security before the heist.</li>
            <li><strong>Formal attire</strong> from her heirloom <em>bag of holding</em> (weapons and visible armor aren&apos;t allowed inside).</li>
            <li>The loan of the <strong>bag of holding</strong> itself, to stash adventuring gear for sneaking about after hours.</li>
            <li>Her hand-drawn <strong>map of the museum</strong> (Map 1.1) — incomplete, based on the public exhibit map, and lacking the locations of the museum&apos;s after-hours alarms.</li>
          </ul>
          <p className="mt-2">
            She also knows the museum keeps <strong>twelve guards</strong>, and that the curator — the elf
            <strong> Alda Arkin</strong> — likely keeps a record of the guards&apos; night patrols in her office in
            the eastern wing of the first floor. Arkin will be at the gala.
          </p>
        </DMSecret>

        <Figure
          src="/murkmire/handout_players_map.webp"
          alt="Dr. Dannell's hand-drawn sketch of the museum — hand this to your players"
          caption="Map 1.1 · Dr. Dannell's Sketch (Player Handout)"
          kind="handout"
          className="h-96"
          fit="contain"
        />

        <SectionNav current={1} />
      </div>
    </div>
  );
}
