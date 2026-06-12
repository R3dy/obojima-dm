import { motion } from 'framer-motion';
import { ScrollText, BookOpen, Sparkles, AlertTriangle } from 'lucide-react';
import { ReadAloud, DMSecret } from '../components/DMCallouts';

/* ------------------------------------------------------------------ */
/*  ANIMATION VARIANTS                                                 */
/* ------------------------------------------------------------------ */

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

/* ------------------------------------------------------------------ */
/*  OVERVIEW PAGE                                                      */
/* ------------------------------------------------------------------ */

export default function Overview() {
  return (
    <div className="min-h-[100dvh] pt-16">
      {/* ============================================================ */}
      {/* HERO HEADER                                                   */}
      {/* ============================================================ */}
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-container-narrow mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <ScrollText size={22} color="#B87333" />
              <span className="text-label text-copper tracking-[0.12em]">
                ADVENTURE OVERVIEW
              </span>
            </div>
            <h1 className="text-display-md text-parchment">
              The Curious World Within
            </h1>
            <p
              className="font-body text-[1.05rem] mt-4 leading-relaxed"
              style={{ color: 'rgba(245,240,230,0.65)' }}
            >
              An adventure for 2nd-level characters. A simple favor becomes a
              perilous journey through a world where every bookshelf is a cliff
              face, every staircase a mountainside, and every beetle a
              terrifying monster.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-container-narrow mx-auto px-4 pb-24 space-y-12">
        {/* ============================================================ */}
        {/* PREMISE SECTION                                               */}
        {/* ============================================================ */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-2xl p-6 sm:p-8"
          style={{
            background: 'linear-gradient(135deg, #2D2016 0%, #1E1610 100%)',
            border: '1px solid rgba(184,115,51,0.15)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={18} color="#B87333" />
            <h2 className="text-heading-lg text-parchment">Premise</h2>
          </div>
          <p
            className="font-body text-[1rem] leading-relaxed"
            style={{ color: 'rgba(245,240,230,0.8)' }}
          >
            The adventurers decide to help out a young postal knight named Lomi
            and find themselves shrunk to Tiny size when they infiltrate Miss
            Lindley&apos;s witch workshop to retrieve a misdelivered letter.
            What began as a simple favor becomes a perilous journey through a
            world where every bookshelf is a cliff face, every staircase a
            mountainside, and every beetle a terrifying monster.
          </p>
          <p
            className="font-body text-[1rem] leading-relaxed mt-4"
            style={{ color: 'rgba(245,240,230,0.8)' }}
          >
            As they navigate the strange landscape at mouse-size, they&apos;ll
            fend off bora bugs, handle pixie tricksters, talk to a giant cat,
            and perhaps even fight a giant Venus fly rat — all while searching
            for a way to return to normal size and recover the missing letter.
          </p>
        </motion.section>

        {/* ============================================================ */}
        {/* THE HOOK — READ ALOUD + DM SECRET                             */}
        {/* ============================================================ */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          <motion.div variants={staggerItem} className="flex items-center gap-2 mb-2">
            <Sparkles size={18} color="#B87333" />
            <h2 className="text-heading-lg text-parchment">The Hook</h2>
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="font-body text-[1rem] leading-relaxed mb-4"
            style={{ color: 'rgba(245,240,230,0.75)' }}
          >
            As soon as the party enters Miss Lindley&apos;s workshop, the
            adventure truly begins. The cellar is the most likely entry point,
            and the moment they step inside, the magical trap activates.
          </motion.p>

          {/* ReadAloud: The cellar description */}
          <motion.div variants={staggerItem}>
            <ReadAloud>
              This shadowy cellar smells of damp earth and some pungent,
              unrecognizable odor — perhaps from the centuries of bubbling
              concoctions that now stain the earthen floor. Magic flames flicker
              within soot-caked lanterns that hang on the walls, each casting an
              eerie glow upon old wooden crates and rows of sagging shelves that
              hold all manner of dust-covered bottles and curios — some of which
              are covered in sackcloth. As the last of you steps off the
              staircase, the ground illuminates in sporadic arcane glyphs that
              cover the cellar floor. In an instant your perspective warps, your
              eyes blur before focusing once more on the world around you. As you
              look about you quickly conclude that you&apos;ve either shrunk down
              to the size of a mouse or this house is a lot more spacious inside
              than you initially anticipated.
            </ReadAloud>
          </motion.div>

          {/* DMSecret: Shrink trap mechanics */}
          <motion.div variants={staggerItem}>
            <DMSecret heading="The Shrink Trap Mechanics">
              As soon as <strong>all</strong> party members enter the house, they
              are shrunk down to{' '}
              <span style={{ color: '#C9A84C' }}>Tiny size</span> via a
              powerful magic trap left by Miss Lindley while she&apos;s away.
              When this happens, all the open doors and windows{' '}
              <strong>shut themselves</strong> and the house{' '}
              <strong>magically re-locks itself</strong>.
              <br />
              <br />
              If party members <strong>stay outside</strong> on guard, they will
              remain their normal size unless they decide to enter, at which
              time they will become Tiny sized. The stat blocks in this
              adventure are all designed to be relative to the character&apos;s
              Tiny size.
            </DMSecret>
          </motion.div>
        </motion.section>

        {/* ============================================================ */}
        {/* ADVENTURE STRUCTURE                                           */}
        {/* ============================================================ */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={staggerItem} className="flex items-center gap-2 mb-6">
            <AlertTriangle size={18} color="#B87333" />
            <h2 className="text-heading-lg text-parchment">
              Adventure Structure
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                step: '1',
                title: 'The Hook',
                desc: "Meet Lomi in Okiri Village and learn of his misdelivered letter to Miss Lindley's workshop.",
              },
              {
                step: '2',
                title: 'Entering the Workshop',
                desc: 'Find a way inside — through the cellar doors, a window, or the front door.',
              },
              {
                step: '3',
                title: 'The Shrink',
                desc: 'The magical trap activates. The party is reduced to Tiny size.',
              },
              {
                step: '4',
                title: 'The Cellar',
                desc: 'Explore the cellar, deal with bora bugs, and climb the massive staircase.',
              },
              {
                step: '5',
                title: 'Emerson the Cat',
                desc: 'Encounter the witch\'s cat — fight, flee, or bargain with him.',
              },
              {
                step: '6',
                title: 'The Main Floor',
                desc: 'Navigate the workshop proper, handle pixies, and search for the letter.',
              },
              {
                step: '7',
                title: 'The Work Table',
                desc: 'Climb the towering work table, face the Venus Fly Rat, and claim the letter.',
              },
              {
                step: '8',
                title: 'Return to Normal',
                desc: 'Find a way to reverse the shrinking and escape the workshop.',
              },
            ].map((phase) => (
              <motion.div
                key={phase.step}
                variants={staggerItem}
                className="flex items-start gap-4 rounded-xl p-4"
                style={{
                  background:
                    'linear-gradient(135deg, #2D2016 0%, #1E1610 100%)',
                  border: '1px solid rgba(184,115,51,0.1)',
                }}
              >
                <span
                  className="text-display-md shrink-0"
                  style={{
                    color: 'rgba(184,115,51,0.4)',
                    fontSize: '2rem',
                    lineHeight: 1,
                  }}
                >
                  {phase.step}
                </span>
                <div>
                  <h3 className="text-heading-lg text-parchment mb-1">
                    {phase.title}
                  </h3>
                  <p
                    className="font-body text-[0.9rem] leading-relaxed"
                    style={{ color: 'rgba(245,240,230,0.65)' }}
                  >
                    {phase.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/* ADVENTURE INFO BAR                                            */}
        {/* ============================================================ */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-5 rounded-xl"
          style={{
            background: 'rgba(62,74,94,0.15)',
            border: '1px solid rgba(107,127,160,0.15)',
          }}
        >
          {[
            { label: '2–4 Players', color: '#B87333' },
            { label: '2nd Level', color: '#8FA678' },
            { label: '~2–3 Hours', color: '#C9A84C' },
            { label: 'Obojima Setting', color: '#6B7FA0' },
          ].map((item) => (
            <span
              key={item.label}
              className="font-body text-sm"
              style={{ color: item.color }}
            >
              {item.label}
            </span>
          ))}
        </motion.section>
      </div>
    </div>
  );
}
