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
              A heist for 1st-level characters. A secretive benefactor hires the party to steal a fallen
              meteorite from a museum before its slow leak of grave-magic stirs the building&apos;s
              taxidermy collection — and the town beyond — to restless, hungry life.
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
            <h2 className="text-heading-lg text-parchment">Premise</h2>
          </div>
          <p className="font-body text-[1rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>
            Weeks ago, a meteorite fell into the brackish swamp known as the Murkmire and was dragged out,
            crated up, and sold to the Vermeulen-Voss Museum of Natural History in the fog-bound town of
            Varkenbluff. The curators call it a prize specimen. They are wrong. The stone is suffused with
            necrotic energy, and it has begun to seep into everything dead nearby — and a natural history
            museum is full of dead things.
          </p>
          <p className="font-body text-[1rem] leading-relaxed mt-4" style={{ color: 'rgba(245,240,230,0.8)' }}>
            A clandestine organization called the Golden Vault recruits the party to lift the meteorite and
            spirit it away to be safely contained, before its corruption spreads. The job is a heist first
            and a dungeon crawl only if it goes wrong — and the party gets to decide how it goes.
          </p>
        </motion.section>

        {/* THE HOOK */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
          <motion.div variants={staggerItem} className="flex items-center gap-2 mb-2">
            <Gem size={18} color={ACCENT} />
            <h2 className="text-heading-lg text-parchment">The Hook</h2>
          </motion.div>

          <motion.p variants={staggerItem} className="font-body text-[1rem] leading-relaxed mb-4" style={{ color: 'rgba(245,240,230,0.75)' }}>
            The Golden Vault makes contact the way it always does: with a small, locked puzzle box delivered
            to each operative. When the box is solved, the briefing begins.
          </motion.p>

          <motion.div variants={staggerItem}>
            <ReadAloud title="The Briefing">
              The lid of the little brass box folds open like a flower, and a soft golden light hums up out of
              it to sketch a figure in the air — a calm, hooded silhouette you cannot quite focus on. &ldquo;Thank
              you for accepting,&rdquo; it says. &ldquo;A dangerous thing sleeps in the Vermeulen-Voss Museum, and
              every night it sleeps a little less. Bring it to us before it wakes the town. Take nothing else.
              Hurt no one you do not have to. The how is yours to choose.&rdquo;
            </ReadAloud>
          </motion.div>

          <motion.div variants={staggerItem}>
            <DMSecret heading="What the Patron Won't Say">
              The Golden Vault never reveals what it is or where its members are. It cares about outcomes, not
              methods, but it strongly prefers a clean job — needless violence or a body count sours the
              relationship and the bonus pay. The patron genuinely believes the Malevolence is a public danger,
              and that part is true: the necrotic field is already animating small specimens after dark.
            </DMSecret>
          </motion.div>
        </motion.section>

        {/* STRUCTURE */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <motion.div variants={staggerItem} className="flex items-center gap-2 mb-6">
            <AlertTriangle size={18} color={ACCENT} />
            <h2 className="text-heading-lg text-parchment">Heist Structure</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { step: '1', title: 'The Briefing', desc: 'The Golden Vault delivers the puzzle box, the target, and the intel package.' },
              { step: '2', title: 'Casing Varkenbluff', desc: 'Scout the foggy town, the museum exterior, guard routines, and rumors of the stone.' },
              { step: '3', title: 'Breaking In', desc: 'Pick an approach — rooftop skylight, the flooded service tunnel, or a brazen front-door bluff.' },
              { step: '4', title: 'The Galleries', desc: 'Slip past patrols and wards, avoid Curator Arkin, and reach the meteorite’s display.' },
              { step: '5', title: 'The Malevolence Wakes', desc: 'Lifting the stone spikes its necrotic pulse; the taxidermy collection stirs to life.' },
              { step: '6', title: 'The Getaway', desc: 'Escape Varkenbluff with the stone, deliver it to the Vault, and collect the payout.' },
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
            { label: '2–5 Players', color: ACCENT_LIGHT },
            { label: '1st Level', color: '#8FA678' },
            { label: '~3–4 Hours', color: GOLD },
            { label: 'A Golden Vault Job', color: '#6B7FA0' },
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
