import { motion } from 'framer-motion';
import { Sword, Bell, Skull, Footprints, Flame } from 'lucide-react';
import { TrapWarning, SkillCheck, DMSecret } from '../../components/DMCallouts';

const ACCENT = '#3E7C6A';
const ACCENT_LIGHT = '#6FB3A0';
const BLOOD = '#C47171';

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

function Block({
  icon: Icon,
  accent,
  tag,
  title,
  children,
}: {
  icon: React.ElementType;
  accent: string;
  tag: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      variants={fade}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="rounded-2xl p-6 sm:p-7"
      style={{ background: 'linear-gradient(135deg, #16241F 0%, #12100D 100%)', border: `1px solid ${ACCENT}26`, borderTop: `3px solid ${accent}` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accent}22`, border: `1px solid ${accent}44` }}>
          <Icon size={18} color={accent} />
        </div>
        <div>
          <span className="text-label text-[0.62rem] tracking-[0.12em] uppercase" style={{ color: accent }}>{tag}</span>
          <h2 className="text-heading-lg text-parchment">{title}</h2>
        </div>
      </div>
      <div className="font-body text-[0.95rem] leading-relaxed space-y-3" style={{ color: 'rgba(245,240,230,0.8)' }}>
        {children}
      </div>
    </motion.section>
  );
}

export default function Encounters() {
  return (
    <div className="min-h-[100dvh] pt-16">
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sword size={22} color={BLOOD} />
              <span className="text-label tracking-[0.12em]" style={{ color: BLOOD }}>ENCOUNTERS</span>
            </div>
            <h1 className="text-display-md text-parchment">Pressure & Peril</h1>
            <p className="font-body text-[1.05rem] mt-4 max-w-[640px] mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
              This job is won by tension, not bloodshed. These are the threats that turn a quiet heist loud —
              and the clocks that punish a crew who can&apos;t stay calm.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-container-narrow mx-auto px-4 pb-24 space-y-6">
        <Block icon={Bell} accent="#C9A84C" tag="The Master Clock" title="Raising the Alarm">
          <p>
            The single most important mechanic in the museum is the <strong style={{ color: '#C9A84C' }}>alarm</strong>.
            A guard who escapes to pull the bell-cord, a shattered display case, or a botched bluff all sound it.
          </p>
          <TrapWarning
            name="The Alarm Bell"
            trigger="A guard reaches the bell, a case is smashed, or a confrontation goes loud"
            effect="The town watch is summoned. Start a countdown: they arrive in 1d4 + 2 rounds and lock down the exits."
            countermeasure="Cut the bell-pull in advance, silence or avoid guards, or simply be gone before the watch arrives."
          />
          <DMSecret heading="Using the Clock">
            Don&apos;t end the adventure on an alarm — escalate it. Once the watch is coming, every round counts:
            guards converge, the curator panics, and the crew must commit to the grab and the getaway. It turns a
            cautious heist into a thrilling scramble.
          </DMSecret>
        </Block>

        <Block icon={Footprints} accent={ACCENT} tag="Stealth Challenge" title="Guards on Patrol">
          <p>
            One or two night guards walk a slow, predictable loop. Treat them as a stealth puzzle, not a combat
            encounter — they are ordinary people who would rather raise the alarm than fight.
          </p>
          <SkillCheck
            dc={13}
            skill="Dexterity (Stealth)"
            title="Slip a Patrol"
            pass="The crew threads past the guard&apos;s loop unseen."
            fail="The guard catches movement and investigates; if they confirm intruders, they break for the alarm."
          />
          <SkillCheck
            dc={12}
            skill="Charisma (Deception) / Dexterity (Sleight of Hand)"
            title="Distract or Lure"
            pass="A thrown sound, a forged note, or a bribe pulls the guard off their route for a round or two."
            fail="The guard grows wary and quickens their loop, tightening the timing windows."
          />
          <p className="text-[0.85rem]" style={{ color: 'rgba(245,240,230,0.55)' }}>
            <em>If a fight is truly unavoidable, a guard uses the Guard or Commoner stat block — but knocking one out quietly is always the better play, and killing one forfeits the Vault&apos;s bonus.</em>
          </p>
        </Block>

        <Block icon={Skull} accent={BLOOD} tag="The Wake" title="Animated Exhibits">
          <p>
            Once the Malevolence is exposed, the museum itself becomes the enemy. Each round the stone is
            uncovered, the nearest dead thing lurches to life. Run it as escalating waves — the goal is to make
            the crew <strong>run</strong>, not to grind out a victory.
          </p>
          <div className="rounded-xl p-4" style={{ background: 'rgba(139,58,58,0.08)', border: '1px solid rgba(139,58,58,0.2)' }}>
            <p className="text-[0.9rem]" style={{ color: 'rgba(245,240,230,0.8)' }}>
              <strong style={{ color: BLOOD }}>Necrotic Pulse:</strong> while the stone is exposed, at the start of
              each round one nearby specimen animates. Wrapping it in heavy cloth or a lead-lined case suppresses
              the pulse — animation pauses while the stone is muffled.
            </p>
          </div>
          <p>
            Stat blocks for the <strong>Animated Taxidermy Wolf</strong>, <strong>Stuffed Owlbear Trophy</strong>,
            and <strong>Specimen-Jar Swarm</strong> live on the <strong>Bestiary</strong> page. The animated
            horde collapses the instant the meteorite is carried out of the building — escape is victory.
          </p>
        </Block>

        <Block icon={Flame} accent="#3E4A5E" tag="Environmental Hazards" title="The Museum Fights Dirty">
          <p>Reward — and punish — clever use of the building itself:</p>
          <ul className="space-y-2 ml-4">
            {[
              <><strong>Display glass:</strong> shattering a case is loud (alarm risk) and scatters difficult, damaging shards across nearby squares.</>,
              <><strong>Spilled formaldehyde</strong> in the storeroom makes footing treacherous — and catches fire spectacularly if a flame is introduced.</>,
              <><strong>Toppling mounts:</strong> a heavy trophy can be shoved onto a pursuer or used to bar a door, buying a round of escape.</>,
              <><strong>The skylight &amp; drainpipes:</strong> a planned rooftop exit lets the crew vanish before the watch seals the ground floor.</>,
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[0.9rem]" style={{ color: 'rgba(245,240,230,0.72)' }}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#3E4A5E' }} />
                {item}
              </li>
            ))}
          </ul>
        </Block>

        <motion.section
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-xl p-6 text-center"
          style={{ background: 'rgba(62,124,106,0.1)', border: `1px solid ${ACCENT}33` }}
        >
          <p className="font-body text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>
            <span style={{ color: ACCENT_LIGHT }} className="font-semibold">Running it: </span>
            keep three clocks in view — the patrol, the alarm, and the necrotic pulse. A great session is the
            crew juggling all three and getting out by the skin of their teeth.
          </p>
        </motion.section>
      </div>
    </div>
  );
}
