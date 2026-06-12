import { motion } from 'framer-motion';

/* ──────────────────────── data ──────────────────────── */

interface Background {
  id: string;
  name: string;
  accent: string;
  skills: string[];
  equipment: string[];
  feature: {
    name: string;
    description: string;
  };
}

const BACKGROUNDS: Background[] = [
  {
    id: 'blotcher-champion',
    name: 'Blotcher Champion',
    accent: '#C9A84C',
    skills: ['Athletics', 'Performance'],
    equipment: [
      'Blotcher stick (club)',
      'Jersey from your favorite team',
      'Set of common clothes',
      'Belt pouch containing 15gp',
    ],
    feature: {
      name: "The People's Champion",
      description:
        'You are recognized at festivals and sporting events across Obojima. You can gather a crowd of spectators who are friendly toward you, and you can often secure free lodging and food from fans.',
    },
  },
  {
    id: 'courier-brigadier',
    name: 'Courier Brigadier',
    accent: '#3E4A5E',
    skills: ['Survival', 'Stealth'],
    equipment: [
      'Courier satchel (waterproof)',
      'Riding horse or rowboat',
      'Set of traveler\'s clothes',
      'Belt pouch containing 10gp',
    ],
    feature: {
      name: 'Trusted Delivery',
      description:
        "As a member of the postal knight service, you can get messages and small packages delivered to any settlement on the island. Your deliveries are trusted and protected by the courier's code.",
    },
  },
  {
    id: 'fish-head-acolyte',
    name: 'Fish Head Acolyte',
    accent: '#3E6090',
    skills: ['Arcana', 'Religion'],
    equipment: [
      'Coven token (amulet)',
      'A bottle of mysterious ink',
      'Set of dark common clothes',
      'Belt pouch containing 12gp',
    ],
    feature: {
      name: 'Coven Contact',
      description:
        'You trained with the Fish Head Coven and can find their safe houses and hidden meeting places. The coven will provide you with shelter and basic assistance if you are in good standing.',
    },
  },
  {
    id: 'first-age-scavenger',
    name: 'First Age Scavenger',
    accent: '#6B4C7A',
    skills: ['Investigation', 'Perception'],
    equipment: [
      'First Age trinket (unidentified)',
      "Tinker's tools",
      'Set of sturdy common clothes',
      'Belt pouch containing 15gp',
    ],
    feature: {
      name: 'Tech Sense',
      description:
        'You can identify First Age technology and intuit its general purpose by spending 10 minutes examining it. You have a sense for where ancient tech might be hidden.',
    },
  },
  {
    id: 'sheep-dragon-shepherd',
    name: 'Sheep Dragon Shepherd',
    accent: '#4A5D3F',
    skills: ['Animal Handling', 'Nature'],
    equipment: [
      "Shepherd's crook (quarterstaff)",
      'Bag of sheep dragon treats',
      'Set of common clothes',
      'Belt pouch containing 10gp',
    ],
    feature: {
      name: 'Flock Leader',
      description:
        'You can calm and direct sheep dragons and similar beasts. You have advantage on Animal Handling checks with these creatures, and they will not attack you unless provoked.',
    },
  },
  {
    id: 'spirit-whisperer',
    name: 'Spirit Whisperer',
    accent: '#8B73A0',
    skills: ['Insight', 'Persuasion'],
    equipment: [
      'Spirit charm (small fetish)',
      'Book of spirit lore',
      'Set of common clothes',
      'Belt pouch containing 10gp',
    ],
    feature: {
      name: "Spirit's Ear",
      description:
        'Spirits are more willing to talk to you and share information. You can sense the presence of spirits within 60ft, and they tend to view you as a neutral party.',
    },
  },
  {
    id: 'tea-house-regular',
    name: 'Tea House Regular',
    accent: '#2F8B5A',
    skills: ['Insight', 'Persuasion'],
    equipment: [
      'Favorite tea set (ceramic)',
      'Tea sampler (5 varieties)',
      'Set of fine clothes',
      'Pouch containing 20gp',
    ],
    feature: {
      name: 'Local Gossip',
      description:
        'Tea houses are great sources of information. You can learn local rumors, recent events, and the general mood of a settlement by spending an hour at a tea house. The staff and regulars are friendly toward you.',
    },
  },
  {
    id: 'wandering-merchant',
    name: 'Wandering Merchant',
    accent: '#B87333',
    skills: ['Persuasion', 'Insight'],
    equipment: [
      'Sample goods (various, worth 25gp)',
      'Ledger and ink',
      "Merchant's scale",
      'Set of traveler\'s clothes',
      'Belt pouch containing 25gp',
    ],
    feature: {
      name: 'Trade Network',
      description:
        'You can find buyers and sellers for goods, and you get fair prices. You have connections in most settlements and can secure basic supplies and information through your trade contacts.',
    },
  },
];

interface GearItem {
  name: string;
  cost: string;
  weight: string;
  description: string;
}

const ADVENTURING_GEAR: GearItem[] = [
  {
    name: 'Boom Beri',
    cost: '5gp',
    weight: '\u2014',
    description: 'A fruit that explodes when thrown. Deals 1d4 fire damage in a 5ft radius on impact. DC 12 Dex save for half.',
  },
  {
    name: 'Shepherd Sling',
    cost: '2gp',
    weight: '1 lb',
    description: 'A blotcher weapon. 1d6 bludgeoning damage, range 30/120. Favored by sheep dragon shepherds.',
  },
  {
    name: 'Spirit Lantern',
    cost: '50gp',
    weight: '2 lb',
    description: 'Reveals hidden spirits within 30ft. Spirits appear as faint glows while the lantern is lit. Burns for 6 hours on 1 pint of oil.',
  },
  {
    name: 'First Age Device Kit',
    cost: '40gp',
    weight: '5 lb',
    description: 'Tools for repairing and studying ancient First Age technology. Includes calipers, spirit-energy detectors, and fine manipulators.',
  },
  {
    name: 'Waterproof Satchel',
    cost: '8gp',
    weight: '1 lb',
    description: 'Keeps items completely dry even when submerged. Holds up to 20 lbs of gear. Essential for coastal travel.',
  },
  {
    name: "Traveler's Tea Set",
    cost: '15gp',
    weight: '3 lb',
    description: 'Compact set for making tea anywhere. If you share tea with someone during a short rest, you both gain advantage on Cha checks for the next hour.',
  },
  {
    name: 'Potion Recipe Book',
    cost: '25gp',
    weight: '2 lb',
    description: 'Contains 5 common potion recipes. Required reference for brewing potions during downtime.',
  },
  {
    name: 'Parchment Paper',
    cost: '1gp',
    weight: '\u2014',
    description: 'Specially treated paper used for creating dara talismans. One sheet is consumed per talisman.',
  },
  {
    name: 'Pouch of Sea Salt',
    cost: '2gp',
    weight: '1 lb',
    description: 'Used in many Nakudama recipes and potions. Can also be used to preserve food or as a minor abrasive.',
  },
];

/* ──────────────────────── page ──────────────────────── */

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function BackgroundsGear() {
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
              Backgrounds & Equipment
            </h1>
            <p className="text-parchment/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Character backgrounds rooted in Obojima&apos;s culture, plus unique equipment
              and adventuring gear found across the island.
            </p>
            <div className="mt-6 h-px w-32 mx-auto grad-copper-border" />
          </motion.div>
        </div>
      </section>

      {/* Backgrounds */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 sm:mb-10"
          >
            <h2 className="text-display-md text-gold mb-2">Backgrounds</h2>
            <p className="text-parchment/60 text-sm sm:text-base max-w-2xl">
              Eight unique backgrounds that tie your character to the people, places, and traditions of Obojima.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
          >
            {BACKGROUNDS.map(bg => (
              <motion.div
                key={bg.id}
                variants={cardVariants}
                className="glass-card rounded-xl border border-copper/20 p-5 sm:p-6 hover:border-copper/40 transition-colors"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-1.5 h-10 rounded-full shrink-0 mt-0.5"
                    style={{ backgroundColor: bg.accent }}
                  />
                  <div>
                    <h3 className="font-display text-xl font-semibold text-parchment">
                      {bg.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      {bg.skills.map(skill => (
                        <span
                          key={skill}
                          className="text-stat text-[0.65rem] px-2 py-0.5 rounded-full bg-copper/15 text-copper-light border border-copper/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-label text-[0.6rem] text-parchment/50 uppercase tracking-widest">
                    Equipment
                  </span>
                  <ul className="mt-1.5 space-y-0.5">
                    {bg.equipment.map((item, i) => (
                      <li
                        key={i}
                        className="text-parchment/70 text-sm leading-relaxed pl-3 border-l-2 border-copper/15"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg bg-ink/40 border border-copper/15 p-4">
                  <span className="text-label text-[0.6rem] text-gold uppercase tracking-widest">
                    Feature
                  </span>
                  <h4 className="font-display text-base font-semibold text-parchment mt-1 mb-1.5">
                    {bg.feature.name}
                  </h4>
                  <p className="text-parchment/70 text-sm leading-relaxed">
                    {bg.feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="h-px grad-copper-border" />
      </div>

      {/* Starting Wealth */}
      <section className="py-16 sm:py-20">
        <div className="max-w-container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 sm:mb-10"
          >
            <h2 className="text-display-md text-gold mb-2">Starting Wealth</h2>
            <p className="text-parchment/60 text-sm sm:text-base max-w-2xl">
              Standard 5e starting wealth applies. Obojima uses local currency alongside standard coinage.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="glass-card rounded-xl border border-copper/20 p-5 text-center">
              <div className="text-display-md text-gold mb-1">gp</div>
              <h4 className="font-display text-lg font-semibold text-parchment mb-2">Gold Flowers</h4>
              <p className="text-parchment/60 text-sm">
                The standard gold piece. Gold flowers are minted with a pressed floral design from Nakudama.
              </p>
            </div>
            <div className="glass-card rounded-xl border border-copper/20 p-5 text-center">
              <div className="text-display-md text-copper-light mb-1">sp</div>
              <h4 className="font-display text-lg font-semibold text-parchment mb-2">Sea Petals</h4>
              <p className="text-parchment/60 text-sm">
                Silver pieces shaped like petals. Commonly used in coastal trade and tea house transactions.
              </p>
            </div>
            <div className="glass-card rounded-xl border border-copper/20 p-5 text-center">
              <div className="text-display-md text-slate-light mb-1">cp</div>
              <h4 className="font-display text-lg font-semibold text-parchment mb-2">Moon Stones</h4>
              <p className="text-parchment/60 text-sm">
                Copper pieces with a crescent stamp. The smallest denomination for everyday goods.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="h-px grad-copper-border" />
      </div>

      {/* Adventuring Gear */}
      <section className="py-16 sm:py-20 pb-24 sm:pb-32">
        <div className="max-w-container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 sm:mb-10"
          >
            <h2 className="text-display-md text-gold mb-2">Obojima-Specific Gear</h2>
            <p className="text-parchment/60 text-sm sm:text-base max-w-2xl">
              Unique items found across the island that reflect its culture, creatures, and magical properties.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {ADVENTURING_GEAR.map((item, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="glass-card rounded-xl border border-copper/20 p-5 hover:border-copper/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="font-display text-lg font-semibold text-parchment">
                    {item.name}
                  </h4>
                  <span className="text-stat text-xs text-copper-light bg-copper/15 px-2 py-0.5 rounded-full">
                    {item.cost}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-stat text-[0.6rem] text-parchment/40 uppercase tracking-wider">
                    Weight: {item.weight}
                  </span>
                </div>
                <p className="text-parchment/70 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
