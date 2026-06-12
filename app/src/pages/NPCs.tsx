import { motion } from 'framer-motion';
import { Users, Heart, MessageCircle, Baby } from 'lucide-react';
import {
  ReadAloud,
  SkillCheck,
  DMSecret,
} from '../components/DMCallouts';

/* ------------------------------------------------------------------ */
/*  NPC DATA                                                           */
/* ------------------------------------------------------------------ */

interface NPC {
  id: string;
  name: string;
  role: string;
  age?: string;
  image?: string;
  description: string;
  traits: string[];
  location: string;
}

const npcs: NPC[] = [
  {
    id: 'lomi',
    name: 'Lomi',
    role: 'Postal Knight',
    age: '13 years old',
    image: '/npc_lomi.jpeg',
    description:
      'Lomi is the younger brother of Ashi, a knight of the Courier Brigade. All his young life, he\'s wanted to be a postal knight and impress his older sister. When one of the postal knights fell ill, Ashi entrusted her little brother to deliver their packages and letters as a first test of his commitment — it was Lomi\'s big chance.',
    traits: [
      'Eager to prove himself to his older sister Ashi',
      'Earnest and hardworking, but inexperienced',
      'Desperate to avoid failing his first delivery mission',
      'Willing to offer everything he has for help',
      'Carries sea petals and a few First Age trinkets',
    ],
    location: 'Okiri Village — sitting on a stone across from the workshop',
  },
  {
    id: 'miss-lindley',
    name: 'Miss Lindley',
    role: 'Witch & Fixer',
    description:
      'Miss Lindley is the local witch of Okiri Village and the resident fixer and mender of goods. Her workshop is a small wooden house filled with magical enchantments, potion ingredients, and arcane curios accumulated over many years. She is currently away from her workshop.',
    traits: [
      'Skilled witch with powerful protective enchantments',
      'The local fixer and mender of goods in Okiri Village',
      'Has a pet cat named Emerson who guards the workshop',
      'Her workshop is magically protected with shrink traps and locking enchantments',
      'Formerly received regular potion ingredient deliveries via the cellar',
    ],
    location: 'Okiri Village — her workshop (currently away)',
  },
  {
    id: 'ashi',
    name: 'Ashi',
    role: 'Courier Knight',
    description:
      'Ashi is a knight of the Courier Brigade and Lomi\'s older sister. She entrusted Lomi with delivering packages and letters when one of the postal knights fell ill, giving him his first real chance to prove himself worthy of the Courier Brigade.',
    traits: [
      'Dedicated knight of the Courier Brigade',
      'Trusts her younger brother enough to give him a chance',
      'Expects deliveries to be completed without mistakes',
    ],
    location: 'Away on courier duties',
  },
  {
    id: 'emerson',
    name: 'Emerson',
    role: 'The Witch\'s Cat',
    description:
      'Emerson is an imperious cat who boasts a portly paunch, crooked whiskers, and a coat of thick fur that sticks out at all angles which makes him always look as if he\'s just woken up. He has the run of the workshop but prefers the hallway and basement.',
    traits: [
      'Portly, crooked-whiskered, perpetually disheveled appearance',
      'Can be bargained with — especially if offered food',
      'May skulk over to investigate or wait lazily depending on hunger',
      'Serves as a guardian of the workshop against Tiny intruders',
    ],
    location: 'Miss Lindley\'s Workshop — hallway and basement',
  },
  {
    id: 'venus-fly-rat',
    name: 'The Venus Fly Rat',
    role: 'Workshop Predator',
    description:
      'A bizarre magical predator that calls the witch\'s workshop home. This creature lurks among the equipment on the work table, waiting for unsuspecting Tiny adventurers to wander too close.',
    traits: [
      'A hybrid creature blending features of a Venus flytrap and a rat',
      'Lurks on the work table among alchemical equipment',
      'Ambushes prey that come within range',
      'Magical in nature — a product of the witch\'s experiments',
    ],
    location: 'The Work Table',
  },
  {
    id: 'pixies',
    name: 'Giant Pixies',
    role: 'Workshop Tricksters',
    description:
      'Tiny winged tricksters that flit about the workshop, causing mischief and delighting in pranks. They are a nuisance to Miss Lindley but generally harmless — though they can be disruptive to adventurers at Tiny size.',
    traits: [
      'Mischievous and playful, love pranks',
      'Can be bargained with or distracted',
      'Leave pixie dust scattered across surfaces',
      'Avoid Emerson the cat, who finds them pesky',
    ],
    location: 'Main Floor of the Workshop',
  },
];

/* ------------------------------------------------------------------ */
/*  ANIMATION VARIANTS                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

/* ------------------------------------------------------------------ */
/*  NPCs PAGE                                                          */
/* ------------------------------------------------------------------ */

export default function NPCs() {
  return (
    <div className="min-h-[100dvh] pt-16">
      {/* ============================================================ */}
      {/* HERO HEADER                                                   */}
      {/* ============================================================ */}
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users size={22} color="#B87333" />
              <span className="text-label text-copper tracking-[0.12em]">
                CHARACTERS
              </span>
            </div>
            <h1 className="text-display-md text-parchment">
              Adventure NPCs
            </h1>
            <p
              className="font-body text-[1.05rem] mt-4 max-w-[640px] mx-auto leading-relaxed"
              style={{ color: 'rgba(245,240,230,0.65)' }}
            >
              Six key characters the party will encounter during their journey
              through Miss Lindley&apos;s workshop — from desperate postal
              knights to magical predators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* LOMI — FULL FEATURED NPC WITH PORTRAIT & CALLOUTS             */}
      {/* ============================================================ */}
      <section className="px-4 pb-8">
        <div className="max-w-container mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, #2D2016 0%, #1E1610 100%)',
              border: '1px solid rgba(184,115,51,0.2)',
            }}
          >
            {/* Lomi header with portrait */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Portrait image */}
              <div className="md:col-span-1 relative" style={{ minHeight: '320px' }}>
                <img
                  src="/npc_lomi.jpeg"
                  alt="Lomi, the 13-year-old postal knight"
                  className="w-full h-full object-cover"
                  style={{ maxHeight: '420px' }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(26,20,16,0) 50%, rgba(26,20,16,0.9) 100%)',
                  }}
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-label text-[0.65rem] tracking-[0.12em] text-copper-light uppercase">
                    Postal Knight
                  </span>
                  <h2 className="text-display-md text-parchment mt-1">Lomi</h2>
                  <span className="text-stat text-[0.8rem] text-parchment/60">
                    13 years old
                  </span>
                </div>
              </div>

              {/* Lomi details */}
              <div className="md:col-span-2 p-6 sm:p-8">
                <motion.div variants={itemVariants}>
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle size={16} color="#B87333" />
                    <span className="text-label text-[0.7rem] tracking-[0.12em] text-copper uppercase">
                      Background
                    </span>
                  </div>
                  <p
                    className="font-body text-[1rem] leading-relaxed"
                    style={{ color: 'rgba(245,240,230,0.85)' }}
                  >
                    Lomi is the younger brother of Ashi, a knight of the Courier
                    Brigade. All his young life, he&apos;s wanted to be a postal
                    knight and impress his older sister. When one of the postal
                    knights fell ill, Ashi entrusted her little brother to
                    deliver their packages and letters as a first test of his
                    commitment to the organization — it was Lomi&apos;s big
                    chance!
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart size={16} color="#B87333" />
                    <span className="text-label text-[0.7rem] tracking-[0.12em] text-copper uppercase">
                      Personality Traits
                    </span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {npcs[0].traits.map((trait, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 font-body text-[0.9rem]"
                        style={{ color: 'rgba(245,240,230,0.7)' }}
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: '#B87333' }}
                        />
                        {trait}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Baby size={16} color="#B87333" />
                    <span className="text-label text-[0.7rem] tracking-[0.12em] text-copper uppercase">
                      Location
                    </span>
                  </div>
                  <p
                    className="font-body text-[0.95rem]"
                    style={{ color: 'rgba(245,240,230,0.7)' }}
                  >
                    {npcs[0].location}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* DM Callouts section for Lomi */}
            <div
              className="p-6 sm:p-8 border-t"
              style={{ borderColor: 'rgba(184,115,51,0.15)' }}
            >
              {/* ReadAloud: Lomi encounter boxed text */}
              <ReadAloud>
                As they wander through Okiri Village, the party hears the sound
                of weeping. When they investigate, they find Lomi, a 13 year old
                boy, sitting on a stone across from a small, wooden house with
                his head in his hands. Next to him is a sad-looking pack mule
                loaded with several sacks, each marked with the insignia of the
                Courier Brigade.
              </ReadAloud>

              {/* SkillCheck: DC 14 Intelligence — Miss Lindley */}
              <SkillCheck
                dc="DC 14 Intelligence check"
                pass="Knows Miss Lindley is the local witch and fixer"
                fail="No prior knowledge"
                advantage="Witch/warlock in party has advantage"
              />

              {/* DMSecret: Lomi's desperation */}
              <DMSecret heading="Lomi's Desperation">
                Although Lomi has little to offer as a young boy away from his
                home, he&apos;s absolutely desperate and at this moment is
                willing to offer more than what he has. Lomi can&apos;t give the
                adventurers much besides a few{' '}
                <span style={{ color: '#C9A84C' }}>sea petals</span> and a
                couple of non-magical{' '}
                <span style={{ color: '#C9A84C' }}>First Age trinkets</span>.
                He will however offer his services as an assistant for a short
                time, and if he really needs to, the{' '}
                <span style={{ color: '#C9A84C' }}>gold flowers</span> he
                would earn for delivering the letter.
              </DMSecret>

              {/* SkillCheck: Social interactions with Lomi */}
              <SkillCheck
                dc="Social interactions with Lomi (Persuasion / Deception)"
                pass="Lomi shares everything he knows about the workshop and Miss Lindley"
                fail="Lomi is tight-lipped or misleads the party unintentionally"
                advantage="Offering to help earns his immediate trust"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* REMAINING NPCs — COMPACT CARDS                                  */}
      {/* ============================================================ */}
      <section className="px-4 pb-24">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {npcs.slice(1).map((npc, i) => (
              <motion.div
                key={npc.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl p-6"
                style={{
                  background:
                    'linear-gradient(135deg, #2D2016 0%, #1E1610 100%)',
                  border: '1px solid rgba(184,115,51,0.12)',
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-label text-[0.65rem] tracking-[0.12em] text-copper uppercase">
                    {npc.role}
                  </span>
                </div>
                <h3 className="text-heading-lg text-parchment mb-3">
                  {npc.name}
                </h3>
                <p
                  className="font-body text-[0.95rem] leading-relaxed mb-4"
                  style={{ color: 'rgba(245,240,230,0.75)' }}
                >
                  {npc.description}
                </p>

                {/* Traits */}
                <div className="space-y-1.5 mb-4">
                  {npc.traits.map((trait, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 font-body text-[0.85rem]"
                      style={{ color: 'rgba(245,240,230,0.6)' }}
                    >
                      <span
                        className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                        style={{ backgroundColor: '#B87333' }}
                      />
                      {trait}
                    </div>
                  ))}
                </div>

                {/* Location */}
                <div
                  className="pt-3 border-t"
                  style={{ borderColor: 'rgba(184,115,51,0.1)' }}
                >
                  <span
                    className="text-stat text-[0.75rem]"
                    style={{ color: 'rgba(245,240,230,0.45)' }}
                  >
                    📍 {npc.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
