import { motion } from 'framer-motion';
import { Footprints, Bone } from 'lucide-react';
import { ReadAloud, DMSecret, SkillCheck } from '../../components/DMCallouts';
import { SectionHero, SectionNav, DataTable } from './SectionNav';

const ACCENT = '#3E7C6A';
const ACCENT_LIGHT = '#6FB3A0';

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const guardLocations: [string, string][] = [
  ['V1', '2'],
  ['V3', '1'],
  ['V4', '1'],
  ['V8', '1'],
  ['V9–V10', '2'],
  ['V11', '1'],
  ['V12', '2'],
  ['V13', '2'],
];

export default function Galleries() {
  return (
    <div className="min-h-[100dvh] pt-16">
      <SectionHero
        num={4}
        subtitle="By night the galleries become a maze of frozen predators and warded doors. Eleven guards walk fixed posts between the crew and the Gemstone Wing — treat the whole floor as a stealth challenge."
      />

      <div className="max-w-container-narrow mx-auto px-4 pb-24 space-y-10">
        <ReadAloud title="The Darkened Halls">
          By night the museum is a maze of frozen things — skeletal predators rearing in the dark, glass cases glinting
          under continual-flame sconces, the preserved allosaurus looming over the predators&apos; hall. Lanterns bob in
          the distance where the guards walk their slow, fixed rounds.
        </ReadAloud>

        <DMSecret heading="Running the Patrols & Wards">
          After hours, <strong>Maryam Bikram</strong> holds the gala entrance while eleven other guards take the posts
          in the table below. Each carries a key to their station&apos;s doors and an alarm pass card. Studying the
          curator&apos;s patrol document for one minute grants <strong>advantage on Stealth</strong> to sneak past them.
          <em> Alarm</em> spells ward key doors and squares — a pass card bypasses any of them. The two front-desk
          statues (V1) and the satyr statue (V12) animate within 5 feet. A noisy fight brings 1d4 more guards each
          round until all eleven are accounted for, and <strong>getting every character caught ends the mission</strong>.
        </DMSecret>

        <DataTable columns={['Area', 'Guards on Post']} rows={guardLocations} accent={ACCENT_LIGHT} align="center" />

        {/* REACHING THE STONE */}
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-2xl p-6 sm:p-7" style={{ background: 'linear-gradient(135deg, #16241F 0%, #12100D 100%)', border: `1px solid ${ACCENT}26`, borderTop: '3px solid #6B4C7A' }}>
          <div className="flex items-center gap-2 mb-3">
            <Footprints size={18} color="#6B4C7A" />
            <h2 className="text-heading-lg text-parchment">Reaching the Gemstone Wing</h2>
          </div>
          <ul className="space-y-2.5">
            {[
              <>The Murkmire Stone sits in the <strong>Gemstone Wing (V13)</strong>, reached via the second floor, the V9 secret cleaning hall, or the V12 air vent (DC 10 Athletics to reach it, 10 ft up).</>,
              <>Lift a guard&apos;s <strong>key or pass card</strong> with a hidden DC 14 Sleight of Hand check, or grab the spare pass cards in the break room (V7).</>,
              <>For a diversion, overload the <strong>animatronic allosaurus</strong> (DC 10 Arcana) for a 10-minute rampage that stomps through V12 and down into V1, drawing guards away.</>,
              <>Detour to the Underground Wonders exhibit (V9) to grab the <strong>jade fake</strong> (DC 10 thieves&apos; tools) if the crew means to swap it for the egg.</>,
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#6B4C7A' }} />
                <span className="font-body text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <SkillCheck
          dc={13}
          skill="Dexterity (Stealth)"
          title="Slip the Patrol"
          pass="The crew threads past a guard's post unseen — with advantage if they studied the patrol document."
          fail="A guard catches movement and investigates; a confirmed intruder triggers alarms and a fight, with 1d4 guards arriving each round."
        />

        <DMSecret heading="Recognizing the Statues">
          A character who clocks the statues&apos; magical nature (via <em>detect magic</em> or just suspicion) can make
          a <strong>DC 10 Intelligence (Arcana)</strong> check to realize they animate within 5 feet — and then simply
          give them a wide berth. The same goes for the satyr by the V12 stairs. None of these guardians need to be
          fought; the smart play is to never wake them. Full stat blocks are on the <strong>Bestiary</strong> page, and
          every ward and bypass is detailed on the <strong>Encounters</strong> page.
        </DMSecret>

        {/* TRANSITION */}
        <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-start gap-3 p-5 rounded-xl" style={{ background: 'rgba(139,58,58,0.08)', border: '1px solid rgba(139,58,58,0.25)' }}>
          <Bone size={18} color="#C47171" className="mt-0.5 shrink-0" />
          <p className="font-body text-[0.92rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.78)' }}>
            Past the last patrol waits the pedestal itself — and the stone has its own defenses, on its own schedule.
          </p>
        </motion.div>

        <SectionNav current={4} />
      </div>
    </div>
  );
}
