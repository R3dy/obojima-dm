import { motion } from 'framer-motion';
import { ScrollText, BookOpen, Gem, AlertTriangle } from 'lucide-react';
import { ReadAloud, DMSecret } from '../../components/DMCallouts';

const ACCENT = '#3E7C6A';
const ACCENT_LIGHT = '#6FB3A0';
const GOLD = '#C9A84C';

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export default function Overview() {
  return (
    <div className="min-h-[100dvh] pt-16">
      {/* HERO */}
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-container-narrow mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <ScrollText size={22} color={ACCENT} />
              <span className="text-label tracking-[0.12em]" style={{ color: ACCENT_LIGHT }}>
                HEIST OVERVIEW
              </span>
            </div>
            <h1 className="text-display-md text-parchment">The Murkmire Malevolence</h1>
            <p className="font-body text-[1.05rem] mt-4 leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
              An adventure for 1st-level characters. Archaeologists pulled a strange, light-green stone from the
              swamp called the Murkmire — but it is no stone. It is the egg of an eldritch horror, and it will
              hatch at midnight tonight. The party must infiltrate the Varkenbluff Museum of Natural History,
              steal the egg, and return it to Dr. Cassee Dannell to be neutralized before it hatches.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-container-narrow mx-auto px-4 pb-24 space-y-12">
        {/* PREMISE */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-2xl p-6 sm:p-8"
          style={{ background: 'linear-gradient(135deg, #16241F 0%, #12100D 100%)', border: `1px solid ${ACCENT}26` }}
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={18} color={ACCENT} />
            <h2 className="text-heading-lg text-parchment">Background</h2>
          </div>
          <p className="font-body text-[1rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>
            On a recent dig in the Murkmire, a Varkenbluff University expedition unearthed an opaque, light-green,
            gemstone-sheened ovoid covered in strange furrows. The crew dubbed it the <strong style={{ color: ACCENT_LIGHT }}>Murkmire
            Stone</strong>, and the Varkenbluff Museum of Natural History paid a generous price to display it. The
            anthropologist <strong style={{ color: ACCENT_LIGHT }}>Dr. Cassee Dannell</strong>, a secret student of the
            occult, recognized it from her tomes: it is an eldritch creature&apos;s egg. Such eggs lie dormant for
            generations, but once unearthed the creature inside rapidly develops, hatches, and grows ravenous —
            eventually overwhelming whole villages.
          </p>
          <p className="font-body text-[1rem] leading-relaxed mt-4" style={{ color: 'rgba(245,240,230,0.8)' }}>
            The eggs are nearly indestructible, but encasing one in crystal neutralizes it. Dannell warned the
            university; they dismissed her work as pseudoscience. She tried to steal the egg herself, was caught,
            and was fired. With the museum&apos;s exhibition gala tonight and the egg due to hatch at midnight,
            Dr. Dannell is nearly out of options — so she has turned to the characters.
          </p>
        </motion.section>

        {/* THE HOOK */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
          <motion.div variants={staggerItem} className="flex items-center gap-2 mb-2">
            <Gem size={18} color={ACCENT} />
            <h2 className="text-heading-lg text-parchment">A Cry for Help</h2>
          </motion.div>

          <motion.p variants={staggerItem} className="font-body text-[1rem] leading-relaxed mb-4" style={{ color: 'rgba(245,240,230,0.75)' }}>
            A grave halfling messenger hands each character a sealed note summoning them to the Sage&apos;s Quill —
            the plush tavern beside the museum where Dr. Dannell waits in a purple hooded robe. (Decide with your
            players how they know her: a friend of the Dannell family, an admirer of her published work, or a
            former student of her occult-tinged lectures.)
          </motion.p>

          <motion.div variants={staggerItem}>
            <ReadAloud title="Dr. Dannell's Plea">
              &ldquo;Thank you for coming so quickly. A few weeks ago, I attended a dig in the Murkmire that
              unearthed a furrowed, light-green stone. The bottom line is that it isn&rsquo;t a stone at all — it&rsquo;s
              the egg of an eldritch horror, and my research indicates it&rsquo;ll hatch at midnight tonight. No one
              will listen to me. The university ignored me; I was caught trying to steal the egg; now I&rsquo;ve been
              fired and the Murkmire Stone display opens tomorrow. You&rsquo;ve got to steal the Murkmire Stone and
              bring it back so I can save the city!&rdquo;
            </ReadAloud>
          </motion.div>

          <motion.div variants={staggerItem}>
            <DMSecret heading="Using the Golden Vault (Optional Patron)">
              You can frame this job for the Golden Vault. A golden key is delivered to the characters; when they
              use it to open their music box, a soothing voice briefs them on the egg, names Dr. Dannell, and asks
              them to infiltrate the museum, steal the egg, and return it to her before it hatches. Closing the box
              makes the key vanish. If you use this patron, the Vault rewards a successful, on-time delivery with an
              uncommon magic item of the characters&apos; choice (subject to your approval), delivered the next day.
            </DMSecret>
          </motion.div>
        </motion.section>

        {/* STRUCTURE */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <motion.div variants={staggerItem} className="flex items-center gap-2 mb-6">
            <AlertTriangle size={18} color={ACCENT} />
            <h2 className="text-heading-lg text-parchment">How the Night Unfolds</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { step: '1', title: 'Meet Dr. Dannell', desc: 'At the Sage’s Quill she explains the egg, lends her bag of holding, and provides gala tickets, formal attire, and her hand-drawn map.' },
              { step: '2', title: 'The Opening Gala', desc: 'From 6 to 8 p.m. the party can attend the gala in the Gemstone Wing to glimpse the stone, study its rigged pedestal, and meet Curator Alda Arkin.' },
              { step: '3', title: 'Scout the Museum', desc: 'Case the public galleries, find pass cards, keys, and the guards’ patrol routes, and decide whether to hide inside or sneak back after hours.' },
              { step: '4', title: 'The Heist After Hours', desc: 'The museum closes at 8 p.m. and its alarms, animated statues, and arcane lock activate. Reach area V13 and take the Murkmire Stone.' },
              { step: '5', title: 'The Clock Runs Out', desc: 'At 10:30 p.m. the egg turns translucent and pulses dangerous magic; at midnight it hatches into an eldritch horror.' },
              { step: '6', title: 'Deliver the Egg', desc: 'Escape and bring the stone to Dr. Dannell in the alley. She seals it in her crystal box, neutralizing it, and pays the reward.' },
            ].map((phase) => (
              <motion.div
                key={phase.step}
                variants={staggerItem}
                className="flex items-start gap-4 rounded-xl p-4"
                style={{ background: 'linear-gradient(135deg, #16241F 0%, #12100D 100%)', border: `1px solid ${ACCENT}1A` }}
              >
                <span className="text-display-md shrink-0" style={{ color: `${ACCENT_LIGHT}66`, fontSize: '2rem', lineHeight: 1 }}>
                  {phase.step}
                </span>
                <div>
                  <h3 className="text-heading-lg text-parchment mb-1">{phase.title}</h3>
                  <p className="font-body text-[0.9rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
                    {phase.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* INFO BAR */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-5 rounded-xl"
          style={{ background: 'rgba(62,124,106,0.12)', border: `1px solid ${ACCENT}26` }}
        >
          {[
            { label: '1st-Level Party', color: ACCENT_LIGHT },
            { label: 'Varkenbluff', color: '#8FA678' },
            { label: 'Hatches at Midnight', color: GOLD },
            { label: 'A Golden Vault Heist', color: '#6B7FA0' },
          ].map((item) => (
            <span key={item.label} className="font-body text-sm" style={{ color: item.color }}>
              {item.label}
            </span>
          ))}
        </motion.section>
      </div>
    </div>
  );
}
