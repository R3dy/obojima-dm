import { motion } from 'framer-motion';
import {
  Mountain,
  Waves,
  Users,
  Scroll,
  TreePine,
  Sword,
  Shield,
  Flame,
  ShoppingBag,
  PawPrint,
  Mail,
  MapPin,
  Sparkles,
  Trophy,
  Target,
  Package,
  Bike,
  UserX,
  Swords,
  Bug,
  Wrench,
} from 'lucide-react';
import {
  SkillCheck,
  ReadAloud,
  DMSecret,
} from '../components/DMCallouts';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: '-40px' },
};

const staggerChild = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const pointsOfInterest = [
  {
    title: 'The Commons',
    icon: TreePine,
    description:
      'A low mound with three stone pillars of different heights. The grass is overgrown until "grazing of the commons" when sheep dragons eat it down. The site hosts blotcher games.',
  },
  {
    title: 'The High Hall',
    icon: Shield,
    description:
      'A tall timber hall on a creek bank. Used for village meetings and as a winter feasting hall — the sturdiest building in Okiri and a defensive gathering point. The cellar holds a weapon cache for the militia.',
  },
  {
    title: 'Outdoor Hearths',
    icon: Flame,
    description:
      'Cooking sites beside the commons, each with a hearth in a gazebo. A derelict First Age food truck stands at center like a monument to outdoor dining.',
  },
  {
    title: "Bree's Mercantile",
    icon: ShoppingBag,
    description:
      "The only shop in Okiri. General goods, specializes in potion ingredients. Bree is a small roundish spirit with prickly skin like a Pyramid Melon exterior. Prefers trading over selling.",
  },
  {
    title: 'Sheep Dragon Grazing Grounds',
    icon: PawPrint,
    description:
      'Low hills beyond the orchards, dotted with rusted First Age vehicle husks. Dangers: hill dragons ambush travelers, and field giants occasionally range into the territory.',
  },
  {
    title: 'Courier Brigade Outpost',
    icon: Mail,
    description:
      'For travelers heading east, Okiri is the last settlement before the Gale Fields. The Courier Brigade maintains an outpost with a stable stocked with fresh mounts.',
  },
];

interface NPC {
  name: string;
  subtitle: string;
  description: string;
  secret?: string;
  icon: typeof Users;
}

const npcs: NPC[] = [
  {
    name: 'Broad Naldo',
    subtitle: 'Male Human — Village Helper',
    description:
      'Built like an ox, with a large muscled frame and thick arms. A boyish friendly face and easy smile. Always eager to help. Employs his hound companion "Block" to keep him on track — Naldo is a chatterbox and easily distracted.',
    icon: Users,
  },
  {
    name: 'Miss Lindley',
    subtitle: 'Female Human — Repair Specialist',
    description:
      "The village repair specialist. Not one to entertain guests — she expects visitors to be direct. Demands absurd components for repairs (\"blue glass shards and a turnip — and the glass had better be blue!\"). Objects repaired by her are better than new.",
    secret:
      "She's a witch, once one of the most powerful and politically influential in the Fish Head Coven as a member of the Council of Three and Thirty. Retired, she now uses transmutation magic for her trade.",
    icon: Wrench,
  },
  {
    name: 'The Torrelli Brothers',
    subtitle: 'Thim & Torrio, Male Humans — Adventurous Shepherds',
    description:
      "The most adventurous shepherds in Okiri. A great source of outside world information, though they lace their tales with humorous anecdotes. Formidable slingers who do well in blotcher matches.",
    icon: Users,
  },
  {
    name: 'Morna',
    subtitle: 'Female Nakudama — Village Informant',
    description:
      "A Nakudama child who loves spying on strangers. Appears in random hiding places. Not shy — she engages in conversation if discovered. Fearless, drawn to dangerous places. Has a small knife she likes to play with. The best informed person in the village.",
    icon: Target,
  },
  {
    name: 'Wenneth',
    subtitle: 'Female Human — Sanctioned Sword Champion',
    description:
      "A middle-aged farmer on the village outskirts. Sanctioned sword champion representing the island's sword schools. Aspiring students can challenge her to friendly duels. Ruthless with a blade but encouraging.",
    icon: Sword,
  },
  {
    name: 'Bree',
    subtitle: 'Spirit — Proprietor of Bree\'s Mercantile',
    description:
      "Proprietor of Bree's Mercantile. A small, roundish spirit with prickly Pyramid Melon-like skin. Happy to take money but prefers a good trade.",
    icon: ShoppingBag,
  },
];

const adventureHooks = [
  {
    title: 'Party Crashers',
    description:
      'Rowdy yokarios disrupt a vegetable festival, causing chaos and threatening to ruin the celebration.',
    icon: Bug,
  },
  {
    title: 'The Flying Bicycle',
    description:
      "A boy used a levitation potion on his bike spokes, flew up to join the flying jellyfish, and can't get down.",
    icon: Bike,
  },
  {
    title: 'Missing Shepherds',
    description:
      "The Torrelli brothers' sheep dragon was found alone in town. The brothers are missing — time to check the grazing grounds.",
    icon: UserX,
  },
  {
    title: 'Settle it on the Field',
    description:
      'Braggarts from a neighboring village pick fights. The locals challenge both groups to a blotcher match to settle the score.',
    icon: Swords,
  },
  {
    title: 'Deputy Couriers',
    description:
      'An injured courier brigadier deputizes the adventurers to deliver a parcel to the Graysteps on Mount Arbora.',
    icon: Package,
  },
];

/* ------------------------------------------------------------------ */
/*  Section Header Component                                           */
/* ------------------------------------------------------------------ */
function SectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="text-center mb-10 sm:mb-14">
      <motion.span
        {...fadeUp}
        className="inline-block font-label text-[0.75rem] text-copper tracking-[0.15em] uppercase mb-3"
      >
        {label}
      </motion.span>
      <motion.h2
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.1 }}
        className="text-display-md text-parchment mb-4"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="font-body text-parchment/60 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function OkiriVillage() {
  return (
    <div className="min-h-[100dvh]">
      {/* ============================================================ */}
      {/* HERO                                                          */}
      {/* ============================================================ */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Background gradient */}
        <div className="absolute inset-0 grad-hero" style={{ zIndex: 1 }} />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 30% 50%, rgba(74,93,63,0.3) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(201,168,76,0.15) 0%, transparent 50%)',
          }}
        />

        <div className="relative max-w-container mx-auto px-4 sm:px-6 text-center" style={{ zIndex: 2 }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block font-label text-[0.75rem] text-copper tracking-[0.15em] uppercase mb-4"
          >
            <MapPin size={14} className="inline-block -mt-0.5 mr-1.5" />
            The Gift of Shuritashi
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-display-lg text-parchment mb-4"
          >
            Okiri Village
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="font-display text-lg sm:text-xl text-parchment/70 italic mb-2"
          >
            A farming village in the Gift of Shuritashi
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-body text-sm text-sage/80 italic"
          >
            Warm, comforting, familiar, charming — like home
          </motion.p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* VILLAGE OVERVIEW                                               */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Village Overview"
            title="The Heart of the Gift"
          />

          <div className="max-w-3xl mx-auto space-y-8">
            <motion.div {...fadeUp} className="space-y-4">
              <div className="flex items-start gap-3">
                <TreePine size={20} className="text-sage flex-shrink-0 mt-1" />
                <p className="font-body text-parchment/80 leading-relaxed">
                  Okiri is a farming village nestled in rolling hills between a modest wood and a lazy river. Everyone knows everyone else. The river flows south from{' '}
                  <span className="text-parchment font-medium">Mount Arbora</span>, intersecting with an east-west road, placing Okiri on a crossroads.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Users size={20} className="text-sage flex-shrink-0 mt-1" />
                <p className="font-body text-parchment/80 leading-relaxed">
                  The village has a diverse population: <span className="text-parchment font-medium">Nakudama</span>, humans, and elves all making it home for generations. History stretches back to the earliest days of the Nakudama Age.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Scroll size={20} className="text-sage flex-shrink-0 mt-1" />
                <p className="font-body text-parchment/80 leading-relaxed">
                  Okiri is known for its{' '}
                  <span className="text-parchment font-medium">sheep dragon herders</span>{' '}
                  who shear wool to craft wooly hats, sweaters, cloth, and blankets. Other villagers grow vegetables, fish the river, or ply trades as craftspeople.
                </p>
              </div>
            </motion.div>

            {/* Skill check example */}
            <motion.div {...fadeUp}>
              <SkillCheck
                dc={14}
                skill="Intelligence"
                type="check"
                title="Know the Village Sigil"
                pass="You recognize the sigil — a sheep dragon, the emblem of Okiri Village and its herding tradition."
                fail="The sigil is unfamiliar to you. It depicts some kind of woolly winged creature."
                advantage="A character with the Nakudama background"
              />
            </motion.div>

            <motion.div {...fadeUp} className="flex items-center gap-2 text-parchment/40">
              <Waves size={16} />
              <Mountain size={16} />
              <span className="font-body text-xs">South of Mount Arbora &middot; On the crossroads</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="h-px grad-copper-border" />
      </div>

      {/* ============================================================ */}
      {/* LIFE IN OKIRI                                                  */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Daily Life"
            title="Life in Okiri"
          />

          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div {...fadeUp} className="space-y-4">
              <p className="font-body text-parchment/80 leading-relaxed">
                The village and surrounding farms and grazing lands reach to the edge of the{' '}
                <span className="text-parchment font-medium">Gale Fields</span>. Farmstead folk are considered villagers in every sense.
              </p>
              <p className="font-body text-parchment/80 leading-relaxed">
                Tradition guides day-to-day life. All trades are handed down through generations — shepherd to shepherd, farmer to farmer, crafter to crafter.
              </p>
              <p className="font-body text-parchment/80 leading-relaxed">
                There is a strong sense of community and light governance. Issues are handled among themselves. Major disputes go to the{' '}
                <span className="text-parchment font-medium">High Hearth hall</span>{' '}
                where representatives of farmers, shepherds, fishers, and crafters gather.
              </p>
            </motion.div>

            {/* Read Aloud block */}
            <motion.div {...fadeUp}>
              <ReadAloud title="Arriving in Okiri">
                As you crest the rolling hill, the village of Okiri spreads out before you —
                stone cottages with mossy thatch roofs curl smoke into the afternoon sky. You
                hear laughter from the commons, the distant bleating of sheep dragons, and
                the clatter of someone working a loom. The air smells of fresh bread, river
                water, and cut grass.
              </ReadAloud>
            </motion.div>

            {/* DM Secret */}
            <motion.div {...fadeUp}>
              <DMSecret>
                Okiri is a feel-good village — nothing catastrophic happens here. No matter
                what's going on in the world, the people seem unconcerned and unaware.
                Possibly to their detriment.
              </DMSecret>
            </motion.div>

            {/* Skill check example */}
            <motion.div {...fadeUp}>
              <SkillCheck
                dc={12}
                skill="Wisdom"
                type="check"
                title="Sense the Atmosphere"
                pass="You notice an almost uncanny sense of peace. The villagers here seem genuinely untouched by the troubles of the wider world."
                fail="The village seems pleasant enough — a quiet farming community like any other."
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="h-px grad-copper-border" />
      </div>

      {/* ============================================================ */}
      {/* POINTS OF INTEREST                                             */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Places"
            title="Points of Interest"
            description="Notable locations within and around Okiri Village"
          />

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {pointsOfInterest.map((poi, i) => {
              const Icon = poi.icon;
              return (
                <motion.div
                  key={poi.title}
                  {...staggerChild}
                  transition={{
                    ...staggerChild.transition,
                    delay: i * 0.08,
                  }}
                  className="rounded-xl border border-copper/20 glass-card p-5 sm:p-6 hover:border-copper/40 transition-colors duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-copper/15 border border-copper/30 flex items-center justify-center group-hover:bg-copper/25 transition-colors duration-300">
                      <Icon size={18} className="text-copper-light" />
                    </div>
                    <h3 className="font-display text-lg text-parchment leading-tight">
                      {poi.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm text-parchment/70 leading-relaxed">
                    {poi.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="h-px grad-copper-border" />
      </div>

      {/* ============================================================ */}
      {/* VILLAGE NPCs                                                   */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Characters"
            title="Village NPCs"
            description="The people who call Okiri home"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {npcs.map((npc, i) => {
              const Icon = npc.icon;
              return (
                <motion.div
                  key={npc.name}
                  {...staggerChild}
                  transition={{
                    ...staggerChild.transition,
                    delay: i * 0.08,
                  }}
                  className="rounded-xl border border-copper/20 glass-card p-5 sm:p-6"
                >
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-copper/15 border border-copper/30 flex items-center justify-center">
                      <Icon size={18} className="text-copper-light" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg text-parchment leading-tight">
                        {npc.name}
                      </h3>
                      <p className="font-label text-[0.6rem] text-copper-light/80 tracking-wider uppercase mt-0.5">
                        {npc.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="font-body text-sm text-parchment/75 leading-relaxed mb-3">
                    {npc.description}
                  </p>
                  {npc.secret && (
                    <DMSecret label="DM Secret">
                      {npc.secret}
                    </DMSecret>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Skill check for NPCs */}
          <motion.div {...fadeUp} className="max-w-2xl mx-auto mt-10">
            <SkillCheck
              dc={13}
              skill="Charisma"
              type="check"
              title="Learn Village Rumors"
              pass="A villager opens up and shares local gossip — Morna knows everything, the Torrelli brothers exaggerate, and Miss Lindley can fix anything if you bring the right components."
              fail="The villagers are friendly but tight-lipped. They smile and return to their work."
              advantage="Speaking with Morna, the Nakudama child"
            />
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="h-px grad-copper-border" />
      </div>

      {/* ============================================================ */}
      {/* FESTIVAL GAMES                                                 */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Festivities"
            title="Festival Games"
          />

          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div {...fadeUp} className="space-y-4">
              <p className="font-body text-parchment/80 leading-relaxed">
                Wrestling and accuracy tests are popular at Okiri festivals, but the main event is{' '}
                <span className="text-parchment font-medium">blotcher</span> — a beloved local sport.
              </p>
              <p className="font-body text-parchment/80 leading-relaxed">
                Teams use shepherd slings to hurl overripe produce at each other. Pot lids serve as shields. Players wear undyed wool tunics. The game is played in rounds with different projectiles — tomatoes, melons, squashes. Participants end covered in multi-colored stains worn proudly as badges of honor.
              </p>
            </motion.div>

            <motion.div {...fadeUp}>
              <ReadAloud title="A Blotcher Match Begins">
                The commons erupts in cheers as two teams take the field, shepherd slings
                dangling at their sides, pot-lid shields raised. A horn sounds — and the air
                fills with flying produce. A melon splatters against a shield. Laughter and
                battle-cries ring out across the meadow.
              </ReadAloud>
            </motion.div>

            <motion.div {...fadeUp}>
              <SkillCheck
                dc={12}
                skill="Dexterity"
                type="check"
                title="Blotcher Accuracy"
                pass="Your shot connects! A ripe tomato splatters squarely on your opponent's tunic — the crowd roars."
                fail="Your projectile sails wide, splattering a watching sheep dragon. It bleats indignantly."
                advantage="Proficiency with shepherd's sling"
                critical="Your shot knocks the pot-lid shield clean out of your opponent's hand. They surrender the round in good humor."
              />
            </motion.div>

            <motion.div {...fadeUp} className="flex items-center justify-center gap-6 text-parchment/30">
              <Trophy size={20} />
              <Sparkles size={20} />
              <Target size={20} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="h-px grad-copper-border" />
      </div>

      {/* ============================================================ */}
      {/* ADVENTURE HOOKS                                                */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Quests"
            title="Adventure Hooks"
            description="Trouble brewing in peaceful Okiri"
          />

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
          >
            {adventureHooks.map((hook, i) => {
              const Icon = hook.icon;
              return (
                <motion.div
                  key={hook.title}
                  {...staggerChild}
                  transition={{
                    ...staggerChild.transition,
                    delay: i * 0.08,
                  }}
                  className="rounded-xl border border-gold/20 glass-card p-5 sm:p-6 hover:border-gold/40 transition-colors duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center group-hover:bg-gold/25 transition-colors duration-300">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <h3 className="font-display text-lg text-parchment leading-tight">
                      {hook.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm text-parchment/70 leading-relaxed">
                    {hook.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Extra hook cards */}
          <motion.div {...fadeUp} className="max-w-2xl mx-auto mt-10 space-y-5">
            <SkillCheck
              dc={15}
              skill="Perception"
              type="check"
              title="Notice Something Amiss"
              pass="You spot Morna watching from a hayloft, scribbling in a tiny notebook. She gives you a conspiratorial wink."
              fail="The village seems entirely peaceful. Too peaceful, perhaps."
              advantage="Passive Perception 13 or higher"
            />

            <DMSecret label="Adventure Hook: The Bigger Picture">
              The seemingly unrelated incidents around Okiri — the missing shepherds,
              the yokario disruptions, even the flying bicycle — are all symptoms of
              increased magical instability in the region. Astute players may notice
              patterns connecting these events to greater forces at play in the
              Shuritashi region.
            </DMSecret>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER CTA                                                     */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            {...fadeUp}
            className="rounded-2xl border border-copper/20 glass-card p-8 sm:p-12 max-w-2xl mx-auto"
          >
            <h3 className="font-display text-2xl text-parchment mb-3">
              Welcome to Okiri
            </h3>
            <p className="font-body text-parchment/60 leading-relaxed mb-6">
              A place where traditions hold strong, neighbors look out for each other,
              and every visitor leaves with wool on their shoulders and warmth in their heart.
            </p>
            <div className="flex items-center justify-center gap-2 text-sage/60">
              <PawPrint size={16} />
              <span className="font-label text-[0.65rem] tracking-widest uppercase">
                Home of the Sheep Dragons
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
