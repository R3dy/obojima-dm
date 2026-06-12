import { motion } from 'framer-motion';
import { Home, Lock, Footprints, Eye, Sparkles } from 'lucide-react';
import {
  SkillCheck,
  ReadAloud,
  TrapWarning,
  DMSecret,
} from '../components/DMCallouts';

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
    transition: { staggerChildren: 0.1 },
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
/*  WORKSHOP PAGE                                                      */
/* ------------------------------------------------------------------ */

export default function Workshop() {
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
              <Home size={22} color="#B87333" />
              <span className="text-label text-copper tracking-[0.12em]">
                THE WORKSHOP
              </span>
            </div>
            <h1 className="text-display-md text-parchment">
              Miss Lindley&apos;s Workshop
            </h1>
            <p
              className="font-body text-[1.05rem] mt-4 leading-relaxed"
              style={{ color: 'rgba(245,240,230,0.65)' }}
            >
              A small, humble wooden house in Okiri Village that holds far more
              danger — and far more space — than its exterior suggests.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-container-narrow mx-auto px-4 pb-24 space-y-12">
        {/* ============================================================ */}
        {/* EXTERIOR DESCRIPTION + READ ALOUD                               */}
        {/* ============================================================ */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          <motion.div
            variants={staggerItem}
            className="rounded-2xl p-6 sm:p-8"
            style={{
              background:
                'linear-gradient(135deg, #2D2016 0%, #1E1610 100%)',
              border: '1px solid rgba(184,115,51,0.15)',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Home size={18} color="#B87333" />
              <h2 className="text-heading-lg text-parchment">
                Approaching the Workshop
              </h2>
            </div>

            <motion.p
              variants={staggerItem}
              className="font-body text-[1rem] leading-relaxed mb-4"
              style={{ color: 'rgba(245,240,230,0.8)' }}
            >
              Miss Lindley&apos;s workshop is a small and humble wooden house in
              Okiri Village. There is a little cobble path that leads to the
              front door, which is painted a bright green. A sign that hangs
              above the door reads &ldquo;closed&rdquo; written in faded cursive.
              On either side of the front entrance are Boom Beri bushes, which
              have been picked clean of fruit. The windows all across the house
              have been frosted over, and numerous birds have begun to nest on
              the tiled roof.
            </motion.p>

            <motion.div variants={staggerItem}>
              <ReadAloud>
                Miss Lindley&apos;s workshop is a small and humble wooden house
                in Okiri Village. There is a little cobble path that leads to
                the front door, which is painted a bright green. A sign that
                hangs above the door reads &ldquo;closed&rdquo; written in faded
                cursive. On either side of the front entrance are Boom Beri
                bushes, which have been picked clean of fruit. The windows all
                across the house have been frosted over, and numerous birds
                have begun to nest on the tiled roof.
              </ReadAloud>
            </motion.div>

            {/* Workshop facts */}
            <motion.div variants={staggerItem} className="mt-6 space-y-3">
              <p
                className="text-label text-[0.7rem] tracking-[0.12em] uppercase"
                style={{ color: 'rgba(184,115,51,0.7)' }}
              >
                Key Facts
              </p>
              {[
                'Although it looks seemingly mundane, the workshop is magical. Beside the fact that it is invulnerable, it has a variety of spells and enchantments that Miss Lindley has placed on it over the years.',
                'Besides the doors and windows there are no other entrances into the house. The house has no chimney or other small entrances.',
                "A powerful enchantment keeps the home's entrances fully locked. This enchantment only lifts when Miss Lindley is on the premises. This is true for all windows and doors besides the padlocked double door to the cellar, which is found in the back of the house.",
                "Many years ago Miss Lindley had heaps of potion ingredients delivered to her home regularly, letting them in through the cellar doors when she wasn't around. These deliveries stopped some time ago, which is why the cellar doors now see little use and are covered in ivy.",
              ].map((fact, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 font-body text-[0.9rem] leading-relaxed"
                  style={{ color: 'rgba(245,240,230,0.7)' }}
                >
                  <Sparkles
                    size={14}
                    color="#B87333"
                    className="mt-1 shrink-0"
                  />
                  {fact}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ============================================================ */}
        {/* THE SHRINK TRAP                                               */}
        {/* ============================================================ */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Lock size={18} color="#B87333" />
            <h2 className="text-heading-lg text-parchment">The Shrink Trap</h2>
          </div>
          <p
            className="font-body text-[1rem] leading-relaxed mb-4"
            style={{ color: 'rgba(245,240,230,0.75)' }}
          >
            The workshop&apos;s most dangerous defense — a powerful magic trap
            that activates as soon as all party members enter the house.
          </p>

          <TrapWarning
            name="The Shrink Trap"
            trigger="All party members enter the house"
            effect="Shrunk to Tiny size. All doors/windows shut and magically re-lock."
            countermeasure="Stay outside to remain normal size. Dispel Magic to temporarily bypass locks."
          />

          <DMSecret heading="DM Note: Dispel Magic">
            Clever adventurers may attempt to use{' '}
            <span style={{ color: '#C9A84C' }}>Dispel Magic</span> to bypass
            the magical locks on the windows or front door. If they succeed,
            they may skip past the cellar, staircase, and Emerson the cat,
            jumping straight to the workshop&apos;s Main Floor. Be prepared
            for this contingency and adjust encounters accordingly.
          </DMSecret>
        </motion.section>

        {/* ============================================================ */}
        {/* ENTRY METHODS + SKILL CHECKS                                  */}
        {/* ============================================================ */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          <motion.div variants={staggerItem} className="flex items-center gap-2 mb-2">
            <Lock size={18} color="#B87333" />
            <h2 className="text-heading-lg text-parchment">
              Entering the Workshop
            </h2>
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="font-body text-[1rem] leading-relaxed mb-4"
            style={{ color: 'rgba(245,240,230,0.75)' }}
          >
            There are three main ways to enter the workshop. The padlocked
            cellar doors are the easiest route inside.
          </motion.p>

          {/* Cellar Entry */}
          <motion.div variants={staggerItem}>
            <SkillCheck
              dc="Cellar Entry — DC 13 Dexterity (pick lock) or AC 13 (break door)"
              pass="Lock picks open or door splinters — access to the cellar stairs"
              fail="Lock remains sealed or attack bounces off the reinforced wood"
              advantage="Thieves' tools proficiency grants advantage on the Dexterity check"
            />
          </motion.div>

          {/* Windows Entry */}
          <motion.div variants={staggerItem}>
            <SkillCheck
              dc="Windows — Magically locked"
              pass="Dispel Magic temporarily suppresses the enchantment"
              fail="Window refuses to budge — the magical seal holds firm"
              advantage="Arcana proficiency may reveal the nature of the enchantment"
            />
          </motion.div>

          {/* Front Door Entry */}
          <motion.div variants={staggerItem}>
            <SkillCheck
              dc="Front Door — Magically locked"
              pass="Dispel Magic temporarily suppresses the enchantment"
              fail="Door handle won't turn — the house rejects all entry"
              advantage="Arcana proficiency may reveal the nature of the enchantment"
            />
          </motion.div>
        </motion.section>

        {/* ============================================================ */}
        {/* NAVIGATING AT TINY SIZE                                       */}
        {/* ============================================================ */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          <motion.div variants={staggerItem} className="flex items-center gap-2 mb-2">
            <Footprints size={18} color="#B87333" />
            <h2 className="text-heading-lg text-parchment">
              Navigating at Tiny Size
            </h2>
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="font-body text-[1rem] leading-relaxed mb-4"
            style={{ color: 'rgba(245,240,230,0.75)' }}
          >
            Once shrunk, ordinary features of the workshop become monumental
            obstacles. The DM should emphasize the dramatic change in scale.
          </motion.p>

          {/* Climbing the table */}
          <motion.div variants={staggerItem}>
            <SkillCheck
              dc="Climbing the Work Table — DC 14 Strength (Athletics)"
              pass="Successfully scramble up the table leg and reach the top"
              fail="Slip and fall, taking 1d6 bludgeoning damage from the impact"
              advantage="Rope or climbing gear may grant advantage at DM discretion"
            />
          </motion.div>

          {/* Noticing the Venus Fly Rat */}
          <motion.div variants={staggerItem}>
            <SkillCheck
              dc="Noticing the Venus Fly Rat — DC 14 Passive Perception"
              pass="Spot the creature lurking among the equipment before it attacks — the party is not surprised"
              fail="The Venus Fly Rat ambushes the party — everyone is surprised on the first round of combat"
              advantage="A character actively searching the area has advantage on the Perception check"
            />
          </motion.div>
        </motion.section>

        {/* ============================================================ */}
        {/* DM GUIDANCE — SKIPPING ENCOUNTERS                             */}
        {/* ============================================================ */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Eye size={18} color="#B87333" />
            <h2 className="text-heading-lg text-parchment">DM Guidance</h2>
          </div>

          <DMSecret heading="Skipping Encounters">
            Clever players who bypass the cellar entrance via{' '}
            <span style={{ color: '#C9A84C' }}>Dispel Magic</span> on the
            windows or front door will skip the following encounters entirely:
            <ul className="mt-2 space-y-1">
              <li className="flex items-start gap-2">
                <span
                  className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                  style={{ backgroundColor: '#B87333' }}
                />
                <span>
                  The cellar exploration and any bora bug encounters
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                  style={{ backgroundColor: '#B87333' }}
                />
                <span>
                  The staircase climb and potential bora bug ambush
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                  style={{ backgroundColor: '#B87333' }}
                />
                <span>Emerson the cat encounter in the hallway</span>
              </li>
            </ul>
            <p className="mt-3">
              This is a <strong>valid and clever approach</strong>. Reward the
              players for creative problem-solving. You may choose to have
              Emerson notice the intrusion from elsewhere in the house, or
              simply let the party explore the main floor unimpeded until they
              reach the work table.
            </p>
          </DMSecret>
        </motion.section>

        {/* ============================================================ */}
        {/* WORKSHOP MAP REFERENCE                                        */}
        {/* ============================================================ */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center py-8"
        >
          <p
            className="font-body text-[0.95rem]"
            style={{ color: 'rgba(245,240,230,0.5)' }}
          >
            Visit the{' '}
            <a
              href="/locations"
              className="transition-colors duration-200 hover:underline"
              style={{ color: '#B87333' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#D4956A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#B87333';
              }}
            >
              Locations page
            </a>{' '}
            to view the full HD battlemaps for the Cellar, Main Floor, and Work
            Table.
          </p>
        </motion.section>
      </div>
    </div>
  );
}
