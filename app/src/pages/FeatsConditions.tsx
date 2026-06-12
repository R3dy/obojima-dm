import { motion } from 'framer-motion';

/* ──────────────────────── data ──────────────────────── */

interface Feat {
  id: string;
  name: string;
  prerequisite?: string;
  description: string;
}

const FEATS: Feat[] = [
  {
    id: 'belly-brewer-initiate',
    name: 'Belly Brewer Initiate',
    description:
      'You have dabbled in belly brewing. Learn one common potion recipe. You can identify potions by taste (DC 12 Intelligence check). Once per long rest, you can consume raw ingredients to gain the effect of your chosen common potion. The DC for any saving throw equals 8 + your proficiency bonus + your Constitution modifier.',
  },
  {
    id: 'first-age-tinkerer',
    name: 'First Age Tinkerer',
    description:
      'You gain proficiency with tinker\'s tools. You can repair broken First Age devices with a DC 15 Intelligence (Tinker\'s Tools) check over 1 hour. You can also jury-rig devices to work for 24 hours without a full repair, though they may behave unpredictably.',
  },
  {
    id: 'friend-of-the-spirits',
    name: 'Friend of the Spirits',
    description:
      'As an action (once per short rest), you can see into the Spirit Realm for 10 minutes. Spirits have advantage on checks to communicate with you, and you can perceive spirit creatures that would otherwise be invisible.',
  },
  {
    id: 'gale-touched',
    name: 'Gale-Touched',
    prerequisite: 'Fighter (Way of the Gale) or special permission',
    description:
      'If you are a fighter, you learn one additional gale maneuver. Otherwise, you gain resistance to thunder damage and cannot be knocked prone by wind effects or forced movement.',
  },
  {
    id: 'glyph-reader',
    name: 'Glyph Reader',
    description:
      "You can read dara glyphs (even if you are not dara) by spending 10 minutes studying them. You can identify simple messages but not complex skills encoded in the glyphs. Understanding requires a DC 14 Intelligence check; on a failure, you must complete a short rest before trying again.",
  },
  {
    id: 'obojiman-duelist',
    name: 'Obojiman Duelist',
    description:
      'When wielding a one-handed weapon with your off-hand empty: you gain +1 AC, and you can use a bonus action to add a superiority die (1d6) to your damage once per turn. You do not need to be a Battle Master fighter to use this superiority die.',
  },
  {
    id: 'potion-brewer',
    name: 'Potion Brewer',
    description:
      'Learn 3 common potion recipes. During a short rest, you can brew potions if you have the ingredients and 25gp worth of materials. Brewing takes 1 hour and requires a successful check: DC equals 8 + the rarity modifier of the potion (common +0, uncommon +2, rare +4).',
  },
  {
    id: 'sheep-dragon-rider',
    name: 'Sheep Dragon Rider',
    description:
      'You gain proficiency in Animal Handling if you do not already have it. You can mount and control sheep dragons. While riding a sheep dragon: your speed increases by 10ft, and you have advantage on checks to stay mounted and control the mount in difficult situations.',
  },
  {
    id: 'spirit-binder',
    name: 'Spirit Binder',
    description:
      'You can bind one beast spirit to an object through a 1-hour ritual. The spirit can communicate telepathically with you within 100ft and can cast Light at will. The spirit remains bound until you perform the ritual again or the object is destroyed.',
  },
  {
    id: 'storyteller',
    name: 'Storyteller',
    description:
      'You gain proficiency in Performance if you do not already have it. You can captivate an audience for 10 minutes \u2014 listeners have disadvantage on Wisdom (Perception) checks to notice things other than you. You can also convey hidden messages in your stories (DC 14 Insight to detect the hidden meaning).',
  },
];

interface SkillUse {
  skill: string;
  uses: string;
}

const SKILL_USES: SkillUse[] = [
  {
    skill: 'Arcana',
    uses: 'Identifying First Age technology, understanding spirit magic, recognizing magical effects tied to Obojima\'s unique magical properties.',
  },
  {
    skill: 'History',
    uses: 'Knowledge of the Nakudama Age, island legends, the Great Collapse, and the history of human settlement on Obojima.',
  },
  {
    skill: 'Nature',
    uses: 'Understanding Obojima\'s unique flora and fauna, identifying sheep dragons and their behaviors, navigating the island\'s ecosystems.',
  },
  {
    skill: 'Religion',
    uses: 'Knowledge of spirit worship practices, the Fish Head Coven\'s beliefs, the tenets of Okumi the Sunfish, and other spiritual traditions.',
  },
  {
    skill: 'Survival',
    uses: 'Island navigation, foraging for food and potion ingredients, tracking through jungles and grasslands, finding shelter.',
  },
];

interface Condition {
  id: string;
  name: string;
  severity: 'minor' | 'moderate' | 'severe';
  description: string;
  effects: string[];
  cure: string;
}

const CONDITIONS: Condition[] = [
  {
    id: 'spirit-touched',
    name: 'Spirit-Touched',
    severity: 'moderate',
    description:
      'Exposure to the Spirit Realm or spirit magic has caused you to involuntarily see into the Spirit Realm. Your vision flickers between the Physical and Spirit Realms unpredictably.',
    effects: [
      'Disadvantage on attack rolls against creatures in the Physical Realm.',
      'You can see spirit creatures without using an action.',
      'Physical realm creatures appear partially translucent to you.',
    ],
    cure:
      'Complete a short rest in a non-magical area, or receive magical healing from a source not tied to spirit magic.',
  },
  {
    id: 'first-age-corruption',
    name: 'First Age Corruption',
    severity: 'severe',
    description:
      'Mishandling First Age technology can cause a gradual physical and mental transformation as ancient energies rewrite your essence. This condition has 5 levels of increasing severity.',
    effects: [
      'Level 1 \u2014 Minor skin discoloration; occasional headaches when near First Age tech.',
      'Level 2 \u2014 Skin takes on metallic sheen; advantage on Int saves but disadvantage on Cha checks.',
      'Level 3 \u2014 One limb becomes partially mechanical; gain resistance to one damage type.',
      'Level 4 \u2014 Memory loss; must make Wis saves to recall recent events; immune to psychic damage.',
      'Level 5 \u2014 Full transformation; lose control of your character until cured by legendary magic.',
    ],
    cure:
      'A Greater Restoration spell removes one level of corruption. A Wish spell cures it entirely. Proper handling of First Age tech (DC 18 Arcana check) prevents gaining new levels.',
  },
  {
    id: 'brew-sickness',
    name: 'Brew Sickness',
    severity: 'minor',
    description:
      'A result of failed belly brewing. The brewer\'s stomach rebels against improperly mixed magical ingredients, causing nausea and unpredictable magical side effects.',
    effects: [
      'Disadvantage on Constitution checks and saves.',
      'At the start of each turn, roll a d6: on a 1, a random minor magical effect occurs (sparkles emit from your mouth, you float 1ft off the ground, your voice echoes, etc.).',
      'Cannot use Belly Concoction features while affected.',
    ],
    cure:
      'The sickness lasts for 1 hour. Drinking a Potion of Healing or consuming a mint leaf (common on Obojima) reduces the duration by 10 minutes.',
  },
];

/* ──────────────────────── helpers ──────────────────────── */

function severityColor(sev: Condition['severity']) {
  switch (sev) {
    case 'minor':
      return '#8FA678';
    case 'moderate':
      return '#C9A84C';
    case 'severe':
      return '#8B3A3A';
    default:
      return '#B87333';
  }
}

/* ──────────────────────── page ──────────────────────── */

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function FeatsConditions() {
  return (
    <div className="min-h-[100dvh]">
      {/* Hero */}
      <section className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 grad-gold-glow opacity-60" />
        <div className="max-w-container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-label text-copper text-xs tracking-[0.2em] uppercase">
              Player Options
            </span>
            <h1 className="text-display-lg text-parchment mt-3 mb-4">
              Feats, Skills & Conditions
            </h1>
            <p className="text-parchment/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              New feats inspired by Obojima&apos;s unique culture, island-specific skill uses,
              and conditions adventurers may face.
            </p>
            <div className="mt-6 h-px w-32 mx-auto grad-copper-border" />
          </motion.div>
        </div>
      </section>

      {/* Feats */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 sm:mb-10"
          >
            <h2 className="text-display-md text-gold mb-2">Feats</h2>
            <p className="text-parchment/60 text-sm sm:text-base max-w-2xl">
              Ten unique feats that connect your character to Obojima&apos;s magic, creatures, and traditions.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {FEATS.map(feat => (
              <motion.div
                key={feat.id}
                variants={cardVariants}
                className="glass-card rounded-xl border border-copper/20 p-5 sm:p-6 hover:border-copper/40 transition-colors"
              >
                <h3 className="font-display text-lg font-semibold text-parchment mb-1.5">
                  {feat.name}
                </h3>
                {feat.prerequisite && (
                  <p className="text-stat text-[0.65rem] text-parchment/40 uppercase tracking-wider mb-2.5">
                    Prerequisite: {feat.prerequisite}
                  </p>
                )}
                <p className="text-parchment/75 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="h-px grad-copper-border" />
      </div>

      {/* Skills */}
      <section className="py-16 sm:py-20">
        <div className="max-w-container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 sm:mb-10"
          >
            <h2 className="text-display-md text-gold mb-2">Island-Specific Skill Uses</h2>
            <p className="text-parchment/60 text-sm sm:text-base max-w-2xl">
              Certain skills take on additional meaning in the context of Obojima&apos;s unique environment.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="space-y-3"
          >
            {SKILL_USES.map(su => (
              <motion.div
                key={su.skill}
                variants={cardVariants}
                className="flex items-start gap-4 glass-card rounded-lg border border-copper/20 p-4 sm:p-5"
              >
                <div className="shrink-0 mt-0.5">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-moss/20 text-sage text-stat text-xs font-bold border border-moss/30">
                    {su.skill}
                  </span>
                </div>
                <p className="text-parchment/75 text-sm leading-relaxed">
                  {su.uses}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="h-px grad-copper-border" />
      </div>

      {/* Conditions */}
      <section className="py-16 sm:py-20 pb-24 sm:pb-32">
        <div className="max-w-container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 sm:mb-10"
          >
            <h2 className="text-display-md text-gold mb-2">Obojima-Specific Conditions</h2>
            <p className="text-parchment/60 text-sm sm:text-base max-w-2xl">
              Unique afflictions that adventurers may encounter on the island, from spirit exposure to technological corruption.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="space-y-5"
          >
            {CONDITIONS.map(cond => (
              <motion.div
                key={cond.id}
                variants={cardVariants}
                className="glass-card rounded-xl border border-copper/20 overflow-hidden"
              >
                {/* Header bar */}
                <div
                  className="px-5 py-3 sm:px-6 sm:py-4 flex items-center gap-3 border-b border-copper/20"
                  style={{ backgroundColor: `${severityColor(cond.severity)}15` }}
                >
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: severityColor(cond.severity) }}
                  />
                  <h3 className="font-display text-xl font-semibold text-parchment">
                    {cond.name}
                  </h3>
                  <span
                    className="ml-auto text-stat text-[0.6rem] uppercase tracking-widest px-2 py-0.5 rounded-full border"
                    style={{
                      color: severityColor(cond.severity),
                      borderColor: `${severityColor(cond.severity)}40`,
                      backgroundColor: `${severityColor(cond.severity)}15`,
                    }}
                  >
                    {cond.severity}
                  </span>
                </div>

                {/* Body */}
                <div className="px-5 py-4 sm:px-6 sm:py-5 space-y-4">
                  <p className="text-parchment/75 text-sm leading-relaxed">
                    {cond.description}
                  </p>

                  <div>
                    <span className="text-label text-[0.6rem] text-parchment/50 uppercase tracking-widest">
                      Effects
                    </span>
                    <ul className="mt-2 space-y-1.5">
                      {cond.effects.map((effect, i) => (
                        <li
                          key={i}
                          className="text-parchment/75 text-sm leading-relaxed pl-3 border-l-2 border-copper/20"
                        >
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg bg-ink/40 border border-copper/15 p-4">
                    <span className="text-label text-[0.6rem] text-sage uppercase tracking-widest">
                      Treatment / Cure
                    </span>
                    <p className="text-parchment/75 text-sm leading-relaxed mt-1.5">
                      {cond.cure}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
