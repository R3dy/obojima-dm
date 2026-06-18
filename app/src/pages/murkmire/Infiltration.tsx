import { motion } from 'framer-motion';
import { Footprints } from 'lucide-react';
import { DMSecret, SkillCheck, TrapWarning } from '../../components/DMCallouts';
import Figure from './Figure';
import { SectionHero, SectionNav } from './SectionNav';

const ACCENT = '#3E7C6A';

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

function ApproachCard({
  tag,
  accent,
  title,
  children,
}: {
  tag: string;
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
      <span className="px-2 py-0.5 rounded text-[0.6rem] tracking-wider uppercase font-bold" style={{ background: `${accent}33`, color: accent }}>
        {tag}
      </span>
      <h3 className="text-[1.15rem] font-semibold mt-3 mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>
        {title}
      </h3>
      <div className="font-body text-[0.95rem] leading-relaxed space-y-2" style={{ color: 'rgba(245,240,230,0.8)' }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function Infiltration() {
  return (
    <div className="min-h-[100dvh] pt-16">
      <SectionHero
        num={3}
        subtitle="At 8 p.m. the museum closes and the staff arm its defenses — alarm spells, animated statues, and the Gemstone Wing’s arcane lock. The crew must already be inside, or find a way back in."
      />

      <div className="max-w-container-narrow mx-auto px-4 pb-24 space-y-10">
        <motion.p variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-body text-[1rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.85)' }}>
          There is no single correct route into the after-hours museum — present the options and let the crew
          improvise. Broadly, they either never leave, or they leave and break back in once it&apos;s dark and quiet.
          Full room-by-room detail lives on the <strong>Museum</strong> page; the security itself is broken down on the
          <strong> Encounters</strong> page.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ApproachCard tag="Quiet" accent={ACCENT} title="Hide Until It Closes">
            <p>
              Tuck into the cleaning-supply closets behind the secret doors in areas V3, V4, V8, V9, V12, and V13, or a
              privy stall in V15 (nominally checked, but a good hider goes unnoticed). The guards don&apos;t sweep the
              <strong> attic (V17)</strong> or <strong>basement (V16)</strong> before closing at all.
            </p>
          </ApproachCard>
          <ApproachCard tag="Bold" accent="#6B4C7A" title="Leave and Sneak Back">
            <p>
              By the gala&apos;s end it&apos;s dark enough to cross the roof or grounds unseen. Re-enter through the
              front doors, the attic skylight, or the basement loading docks — or the basement&apos;s secret tunnel from
              a nearby copse of trees. Grappling hooks and rope are needed to scale the building.
            </p>
          </ApproachCard>
        </div>

        <SkillCheck
          dc={16}
          skill="Dexterity (Thieves' Tools)"
          title="Pick the Front Doors (V1)"
          pass="The lock gives. Bypass the door's alarm with a pass card, mind the falling-net trap just inside, and stay clear of the two front-desk statues."
          fail="The lock holds for now; a noisy attempt risks drawing a patrol to the entrance."
        />

        <SkillCheck
          dc={14}
          skill="Dexterity (Thieves' Tools)"
          title="The Attic Skylight (V17)"
          pass="The skylight unlocks; a DC 12 Strength (Athletics) check then lifts it open. A loose roof brick can prop it for a clean exit later."
          fail="The latch resists, and a slip on the roof risks a fall or a noise that carries."
        />

        <SkillCheck
          dc={14}
          skill="Dexterity (Thieves' Tools)"
          title="The Basement Loading Docks (V16)"
          pass="The warehouse doors unlock; shoving them open is a DC 15 Strength (Athletics) check — and noisy enough to draw one guard from the grand entrance above."
          fail="The stiff hinges won't budge quietly; force it and the racket summons a guard."
        />

        <TrapWarning
          name="Falling Net (V1)"
          trigger="A creature steps on the rug-hidden pressure plate north of the front doors while the trap is armed"
          effect="A weighted net drops over the 10-ft square: creatures are restrained, and prone on a failed DC 10 Strength save. The net is AC 10, 12 HP; a DC 10 Strength check frees a creature."
          countermeasure="Lift the rug to reveal the plate, or flip the toggle hidden under the information desk to disarm it. The trap is armed only while the museum is closed."
        />

        <DMSecret heading="The Museum After Dark">
          Once the doors lock, the building&apos;s general features shape every plan:
          <ul className="mt-2 ml-4 list-disc space-y-1">
            <li><strong>Doors</strong> are closed and locked (except the V15 privies): DC 12 thieves&apos; tools to pick. Picking a door with an enabled <em>alarm</em> triggers it.</li>
            <li><strong>Lighting</strong> is mostly <em>continual flame</em> sconces; the grand entrance (V1), Prehistoric Predators (V12), basement, and attic are dim, and guards there carry hooded lanterns.</li>
            <li><strong>Secret doors</strong> take a DC 12 Wisdom (Perception) check to spot — and connect many galleries via cleaning-supply halls.</li>
            <li><strong>Ceilings</strong> are 30 feet high throughout.</li>
          </ul>
        </DMSecret>

        <Figure
          src="/murkmire/map_museum_dm.webp"
          alt="The Dungeon Master's map of the Varkenbluff Museum, showing secret doors, alarms, and patrol areas"
          caption="Map 1.2 · DM's Map (Areas V1–V17)"
          kind="map"
          className="h-[28rem]"
          fit="contain"
        />

        {/* DEPARTURE NOTE */}
        <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-start gap-3 p-5 rounded-xl" style={{ background: 'rgba(62,124,106,0.1)', border: `1px solid ${ACCENT}40` }}>
          <Footprints size={18} color={ACCENT} className="mt-0.5 shrink-0" />
          <p className="font-body text-[0.92rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.78)' }}>
            However they get in, the next problem is the same: eleven guards now hold fixed posts in the dark, and the
            wards are live. Move on to threading the galleries.
          </p>
        </motion.div>

        <SectionNav current={3} />
      </div>
    </div>
  );
}
