import { motion } from 'framer-motion';
import { PawPrint, Shield, Heart, Wind, Sparkles, Swords, AlertTriangle } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  CREATURE DATA — stat blocks scaled for a Tiny-size party           */
/* ------------------------------------------------------------------ */

interface Action {
  name: string;
  recharge?: string;
  text: string;
}

interface Creature {
  id: string;
  name: string;
  image: string;
  type: string;
  accent: string;
  description: string;
  ac: string;
  hp: string;
  speed: string;
  abilities: { str: string; dex: string; con: string; int: string; wis: string; cha: string };
  meta: { label: string; value: string }[];
  cr: string;
  traits: { name: string; text: string }[];
  actions: Action[];
  dmTip: string;
}

const creatures: Creature[] = [
  {
    id: 'bora-bug',
    name: 'Giant Bora Bug',
    image: '/creature_bora_bug.jpeg',
    type: 'Medium Beast, Unaligned',
    accent: '#8B3A3A',
    description:
      'Bora bugs are forest engineers that carve winding trails with their horns and spiked wing casings. To a Tiny-size party they swarm out of wall cracks in the cellar stairwell, glowing softly in the dark. They attack in numbers (1d4+1) but are not especially tough individually.',
    ac: '12 (natural armor)',
    hp: '22 (4d8 + 4)',
    speed: '30 ft., climb 20 ft., fly 30 ft.',
    abilities: { str: '12 (+1)', dex: '14 (+2)', con: '13 (+1)', int: '4 (-3)', wis: '12 (+1)', cha: '6 (-2)' },
    meta: [
      { label: 'Skills', value: 'Perception +3' },
      { label: 'Senses', value: 'Darkvision 60 ft., Passive Perception 13' },
      { label: 'Languages', value: '—' },
    ],
    cr: 'Challenge 1/2 (100 XP) · Proficiency Bonus +2',
    traits: [
      {
        name: 'Bioluminescent Glow',
        text: 'The bora bug emits a soft light from its spiked wing casing, shedding dim light in a 10-foot radius.',
      },
    ],
    actions: [
      {
        name: 'Horn Strike',
        text: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage.',
      },
      {
        name: 'Spike Flurry',
        recharge: 'Recharge 5–6',
        text: 'The bora bug releases a flurry of spikes. Each creature within 10 feet must make a DC 12 Dexterity saving throw, taking 7 (2d6) piercing damage on a failed save, or half as much on a success.',
      },
    ],
    dmTip:
      'Use bora bugs as the optional stairwell ambush. Their glow is handy for lighting a dark scene — and you can skip the encounter entirely if the party is low on resources.',
  },
  {
    id: 'giant-pixie',
    name: 'Giant Pixie',
    image: '/creature_giant_pixie.jpeg',
    type: 'Large Spirit, Neutral Good',
    accent: '#6B4C7A',
    description:
      'The workshop pixies (Tina and Meena) are sweet around Miss Lindley but turn into relentless tricksters the moment she leaves. They rarely want to kill the party — they want to play. Lean into mischief: closing shutters, dousing candles, and casting spells like party games.',
    ac: '14 (natural armor)',
    hp: '22 (4d10)',
    speed: '30 ft., fly 30 ft.',
    abilities: { str: '10 (+0)', dex: '18 (+4)', con: '10 (+0)', int: '14 (+2)', wis: '15 (+2)', cha: '16 (+3)' },
    meta: [
      { label: 'Skills', value: 'Perception +4, Stealth +8' },
      { label: 'Senses', value: 'Passive Perception 14' },
      { label: 'Languages', value: 'Sylvan, Common' },
    ],
    cr: 'Challenge 1/2 (100 XP) · Proficiency Bonus +2',
    traits: [
      {
        name: 'Magic Resistance',
        text: 'The pixie has advantage on saving throws against spells and other magical effects.',
      },
      {
        name: 'Innate Spellcasting',
        text:
          'Spellcasting ability is Charisma (spell save DC 13, +5 to hit). At will: Druidcraft, Jolt, Root Grab, Transparency. 1/day each: Confusion, Control Animal, Detect Thoughts, Entangle, Obscure Object, Pacify Person, Sleep, Whelm Weapon.',
      },
    ],
    actions: [
      {
        name: 'Gift of Flight',
        text:
          'The pixie magically grants a creature it can see a flying speed of 30 feet for as long as the pixie holds its breath (a number of minutes equal to 1 + its Constitution modifier, minimum 30 seconds). Only one creature at a time; after the effect ends it must wait 1 minute before using it again.',
      },
    ],
    dmTip:
      'Play the pixies for laughs before combat. They may bet on who Emerson will eat first or who reaches the table first — and can be talked down, bribed, or out-tricked rather than fought.',
  },
  {
    id: 'venus-fly-rat',
    name: 'Giant Venus Fly Rat',
    image: '/creature_venus_fly_rat.jpeg',
    type: 'Large Beast, Unaligned',
    accent: '#4A5D3F',
    description:
      'A bizarre blend of rodent and carnivorous plant, originally kept as a potion ingredient and now loose among the clutter of the work table. It is the adventure\'s main threat — it grapples isolated characters and sows chaos with a confusion-inducing pollen burst.',
    ac: '14 (natural armor)',
    hp: '34 (4d10 + 12)',
    speed: '30 ft., climb 20 ft.',
    abilities: { str: '15 (+2)', dex: '15 (+2)', con: '12 (+1)', int: '12 (+1)', wis: '14 (+2)', cha: '7 (-2)' },
    meta: [
      { label: 'Skills', value: 'Stealth +5' },
      { label: 'Damage Resistances', value: 'Poison; Bludgeoning, Piercing, and Slashing from nonmagical attacks' },
      { label: 'Condition Immunities', value: 'Blinded, Charmed, Frightened' },
      { label: 'Senses', value: 'Blindsight 30 ft., Darkvision 60 ft., Passive Perception 11' },
      { label: 'Languages', value: '—' },
    ],
    cr: 'Challenge 1/2 (100 XP) · Proficiency Bonus +2',
    traits: [],
    actions: [
      {
        name: 'Snap Jaw',
        text:
          'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage, and a creature is Grappled (escape DC 12). While grappled this way, the target takes 4 (1d4 + 2) piercing damage at the start of each of its turns.',
      },
      {
        name: 'Tail Strike',
        text: 'Melee Weapon Attack: +4 to hit, reach 10 ft., one target. Hit: 5 (1d6 + 2) bludgeoning damage.',
      },
      {
        name: 'Pollen Burst',
        recharge: 'Recharge 5–6',
        text:
          'The fly rat releases pollen in a 15-foot cone. Each creature in that area must succeed on a DC 11 Wisdom saving throw or be affected by the Confusion spell for 1 minute. An affected creature can repeat the save at the end of each of its turns, ending the effect on a success.',
      },
    ],
    dmTip:
      'A DC 14 Wisdom (Perception) check lets the party spot it before it strikes. Without that, it ambushes the first character to reach the center of the table. Its damage resistances mean Tiny mundane weapons feel weak — reward clever play.',
  },
];

/* ------------------------------------------------------------------ */
/*  STAT BLOCK COMPONENT                                               */
/* ------------------------------------------------------------------ */

const ABILITY_LABELS: [keyof Creature['abilities'], string][] = [
  ['str', 'STR'],
  ['dex', 'DEX'],
  ['con', 'CON'],
  ['int', 'INT'],
  ['wis', 'WIS'],
  ['cha', 'CHA'],
];

function Stat({ icon: Icon, label, value }: { icon: typeof Shield; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={16} color="#B87333" className="shrink-0" />
      <div>
        <span className="text-label text-[0.6rem] tracking-[0.12em] block" style={{ color: 'rgba(184,115,51,0.8)' }}>{label}</span>
        <span className="text-stat text-[0.85rem] text-parchment">{value}</span>
      </div>
    </div>
  );
}

function StatBlock({ creature, index }: { creature: Creature; index: number }) {
  const isMoss = creature.accent === '#4A5D3F';
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2D2016 0%, #1E1610 100%)',
        border: '1px solid rgba(184,115,51,0.15)',
        borderTop: `3px solid ${creature.accent}`,
      }}
    >
      {/* Header with art */}
      <div className="flex flex-col sm:flex-row gap-5 p-6 pb-4">
        <img
          src={creature.image}
          alt={creature.name}
          loading="lazy"
          decoding="async"
          className="w-full sm:w-40 h-48 sm:h-40 rounded-xl object-cover shrink-0"
          style={{ border: `1px solid ${creature.accent}66` }}
        />
        <div className="min-w-0">
          <h2 className="text-display-md text-parchment" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {creature.name}
          </h2>
          <p className="text-sm italic mt-1" style={{ color: isMoss ? '#8FA678' : '#D4956A' }}>
            {creature.type}
          </p>
          <p className="font-body text-[0.95rem] leading-relaxed mt-3" style={{ color: 'rgba(245,240,230,0.75)' }}>
            {creature.description}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="h-px w-full grad-copper-border mb-4" />

        {/* Core stats */}
        <div className="flex flex-wrap gap-x-8 gap-y-2 mb-4">
          <Stat icon={Shield} label="Armor Class" value={creature.ac} />
          <Stat icon={Heart} label="Hit Points" value={creature.hp} />
          <Stat icon={Wind} label="Speed" value={creature.speed} />
        </div>

        {/* Ability scores */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
          {ABILITY_LABELS.map(([key, label]) => (
            <div
              key={key}
              className="text-center rounded-lg py-2.5"
              style={{ background: 'rgba(26,20,16,0.5)', border: '1px solid rgba(184,115,51,0.12)' }}
            >
              <div className="text-label text-[0.6rem] tracking-[0.15em]" style={{ color: '#B87333' }}>{label}</div>
              <div className="text-stat text-sm text-parchment mt-1">{creature.abilities[key]}</div>
            </div>
          ))}
        </div>

        {/* Meta rows */}
        <div className="space-y-1.5 mb-4">
          {creature.meta.map((m) => (
            <p key={m.label} className="font-body text-[0.85rem]" style={{ color: 'rgba(245,240,230,0.7)' }}>
              <span className="text-copper-light font-semibold">{m.label}</span> {m.value}
            </p>
          ))}
          <p className="text-stat text-[0.8rem] pt-1" style={{ color: 'rgba(201,168,76,0.8)' }}>{creature.cr}</p>
        </div>

        {/* Traits */}
        {creature.traits.length > 0 && (
          <div className="mb-4">
            {creature.traits.map((t) => (
              <p key={t.name} className="font-body text-[0.88rem] leading-relaxed mb-2" style={{ color: 'rgba(245,240,230,0.8)' }}>
                <span className="italic font-semibold text-parchment">{t.name}.</span> {t.text}
              </p>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="rounded-xl p-4" style={{ background: 'rgba(139,58,58,0.06)', border: '1px solid rgba(184,115,51,0.12)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Swords size={15} color={isMoss ? '#8FA678' : '#C47171'} />
            <span className="text-label text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: '#D4956A' }}>Actions</span>
          </div>
          {creature.actions.map((a) => (
            <p key={a.name} className="font-body text-[0.88rem] leading-relaxed mb-2.5" style={{ color: 'rgba(245,240,230,0.8)' }}>
              <span className="italic font-semibold text-parchment">{a.name}</span>
              {a.recharge && <span className="text-[0.75rem] ml-1" style={{ color: '#C9A84C' }}>({a.recharge})</span>}
              <span className="italic font-semibold text-parchment">.</span> {a.text}
            </p>
          ))}
        </div>

        {/* DM tip */}
        <div className="mt-4 rounded-xl p-4 flex gap-3" style={{ background: 'rgba(45,32,22,0.6)', border: '1px dashed rgba(184,115,51,0.4)' }}>
          <Sparkles size={16} color="#B87333" className="shrink-0 mt-0.5" />
          <p className="font-body text-[0.85rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.75)' }}>
            <span className="text-copper-light font-semibold">Running it: </span>{creature.dmTip}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Bestiary() {
  return (
    <div className="min-h-[100dvh] pt-16">
      {/* Hero header */}
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <PawPrint size={22} color="#B87333" />
              <span className="text-label text-copper tracking-[0.12em]">BESTIARY</span>
            </div>
            <h1 className="text-display-md text-parchment">Creatures of the Workshop</h1>
            <p className="font-body text-[1.05rem] mt-4 max-w-[640px] mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
              Three stat blocks scaled for a Tiny-size party, each with original
              art and quick guidance for running them at the table.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}>
              <AlertTriangle size={13} color="#C9A84C" />
              <span className="text-stat text-[0.72rem]" style={{ color: 'rgba(201,168,76,0.9)' }}>
                Stats are adjusted relative to the shrunken party
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stat blocks */}
      <section className="px-4 pb-24">
        <div className="max-w-container-narrow mx-auto space-y-8">
          {creatures.map((c, i) => (
            <StatBlock key={c.id} creature={c} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
