import { motion } from 'framer-motion';
import { Shield, Heart, Wind, Sparkles, Swords, AlertTriangle, Box, Wheat, Ghost, Bug, Skull } from 'lucide-react';
import HpTracker from '../../components/HpTracker';

const ACCENT = '#3E7C6A';
const ACCENT_LIGHT = '#6FB3A0';

interface Action {
  name: string;
  recharge?: string;
  text: string;
}

interface Creature {
  id: string;
  name: string;
  icon: React.ElementType;
  type: string;
  accent: string;
  description: string;
  ac: string;
  hp: string;
  hpValue: number;
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
    id: 'animated-armor',
    name: 'Animated Armor',
    icon: Shield,
    type: 'Medium Construct, Unaligned',
    accent: '#6B7FA0',
    description:
      'The robed statues flanking the front desk (V1) and the winged-satyr statue by the stairs (V12). They stand inert until a creature comes within 5 feet, then animate and fight until destroyed. A detect magic spell reveals their transmutation aura.',
    ac: '18 (natural armor)',
    hp: '33 (6d8 + 6)',
    hpValue: 33,
    speed: '25 ft.',
    abilities: { str: '14 (+2)', dex: '11 (+0)', con: '13 (+1)', int: '1 (-5)', wis: '3 (-4)', cha: '1 (-5)' },
    meta: [
      { label: 'Damage Immunities', value: 'Poison, Psychic' },
      { label: 'Condition Immunities', value: 'Blinded, Charmed, Deafened, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned' },
      { label: 'Senses', value: 'Blindsight 60 ft. (blind beyond), Passive Perception 6' },
      { label: 'Languages', value: '—' },
    ],
    cr: 'Challenge 1 (200 XP) · Proficiency Bonus +2',
    traits: [
      { name: 'Antimagic Susceptibility', text: 'The armor is incapacitated while in the area of an antimagic field. If targeted by dispel magic, it must succeed on a Constitution save against the caster’s DC or fall unconscious for 1 minute.' },
      { name: 'False Appearance', text: 'While motionless, the armor is indistinguishable from a normal suit of armor or statue.' },
    ],
    actions: [
      { name: 'Multiattack', text: 'The armor makes two melee attacks.' },
      { name: 'Slam', text: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) bludgeoning damage.' },
    ],
    dmTip:
      'Causing a statue to animate alerts any guards in that area, so these are as much an alarm as a threat. Remind players that staying 5+ feet away keeps the statues inert — avoidance is the intended “win,” not a slugfest.',
  },
  {
    id: 'scarecrow',
    name: 'Scarecrow (Marigold)',
    icon: Wheat,
    type: 'Medium Construct, Chaotic Evil',
    accent: '#8B7A3A',
    description:
      'The five-foot vintage doll in Curator Arkin’s office (V5). After hours, when any creature but Alda enters, “Marigold” lurches off her stand and attacks, fighting until destroyed. A noisy fight may attract the V1 guards.',
    ac: '11',
    hp: '36 (8d8)',
    hpValue: 36,
    speed: '30 ft.',
    abilities: { str: '11 (+0)', dex: '13 (+1)', con: '11 (+0)', int: '10 (+0)', wis: '10 (+0)', cha: '13 (+1)' },
    meta: [
      { label: 'Damage Vulnerabilities', value: 'Fire' },
      { label: 'Damage Immunities', value: 'Poison' },
      { label: 'Condition Immunities', value: 'Charmed, Exhaustion, Frightened, Paralyzed, Poisoned, Unconscious' },
      { label: 'Senses', value: 'Darkvision 60 ft., Passive Perception 10' },
      { label: 'Languages', value: 'Understands its creator’s languages but can’t speak' },
    ],
    cr: 'Challenge 1 (200 XP) · Proficiency Bonus +2',
    traits: [
      { name: 'False Appearance', text: 'While the scarecrow remains motionless, it is indistinguishable from an ordinary, inanimate doll.' },
    ],
    actions: [
      { name: 'Multiattack', text: 'The scarecrow makes two claw attacks.' },
      { name: 'Claw', text: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 6 (2d4 + 1) slashing damage. If the target is a creature, it must succeed on a DC 11 Wisdom saving throw or be frightened until the end of its next turn.' },
      { name: 'Terrifying Glare', text: 'The scarecrow targets one creature it can see within 30 ft. If the target can see it, the target must succeed on a DC 11 Wisdom saving throw or be frightened until the end of its next turn. If the target is already frightened, it is instead paralyzed until the end of its next turn.' },
    ],
    dmTip:
      'Marigold’s frighten-then-paralyze loop is nasty for level 1, but she has no ranged option and is vulnerable to fire. The office isn’t required for the heist — a savvy crew avoids Marigold entirely or burns her down fast.',
  },
  {
    id: 'mimic',
    name: 'Mimic',
    icon: Box,
    type: 'Medium Monstrosity (Shapechanger), Neutral',
    accent: '#8B3A3A',
    description:
      'Squatting in the centermost pile of boxes in the basement (V16), disguised as ordinary crates. It waits until a character moves within 5 feet, then attacks, fighting until destroyed.',
    ac: '12 (natural armor)',
    hp: '58 (9d8 + 18)',
    hpValue: 58,
    speed: '15 ft.',
    abilities: { str: '17 (+3)', dex: '12 (+1)', con: '15 (+2)', int: '5 (-3)', wis: '13 (+1)', cha: '8 (-1)' },
    meta: [
      { label: 'Skills', value: 'Stealth +5' },
      { label: 'Damage Immunities', value: 'Acid' },
      { label: 'Condition Immunities', value: 'Prone' },
      { label: 'Senses', value: 'Darkvision 60 ft., Passive Perception 11' },
      { label: 'Languages', value: '—' },
    ],
    cr: 'Challenge 2 (450 XP) · Proficiency Bonus +2',
    traits: [
      { name: 'Shapechanger', text: 'The mimic can use its action to polymorph into an object or back into its true, amorphous form. Its statistics are the same in each form. Any equipment it is wearing or carrying isn’t transformed. It reverts to its true form if it dies.' },
      { name: 'Adhesive (Object Form Only)', text: 'The mimic adheres to anything that touches it. A Huge or smaller creature adhered to it is also grappled (escape DC 13). Ability checks made to escape this grapple have disadvantage.' },
      { name: 'False Appearance (Object Form Only)', text: 'While motionless, the mimic is indistinguishable from an ordinary object.' },
      { name: 'Grappler', text: 'The mimic has advantage on attack rolls against any creature grappled by it.' },
    ],
    actions: [
      { name: 'Pseudopod', text: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) bludgeoning damage. If the mimic is in object form, the target is subjected to its Adhesive trait.' },
      { name: 'Bite', text: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 4 (1d8) acid damage.' },
    ],
    dmTip:
      'The basement is optional (it’s an entry/exit and a 150 gp gem stash). Telegraph “these crates feel wrong” to reward caution. A grappled level-1 hero is in real danger — let allies focus fire to free them.',
  },
  {
    id: 'hatchling',
    name: 'Eldritch Hatchling',
    icon: Bug,
    type: 'Large Monstrosity, Unaligned · Further Adventures',
    accent: ACCENT,
    description:
      'If the egg ever hatches, this is what crawls out: an eight-foot horror that uses the ankheg stat block, except its bite deals poison damage instead of acid damage. Featured in the “mission unsuccessful” and follow-up hooks — not in the heist itself, which exists to prevent this.',
    ac: '14 (natural armor), 11 while prone',
    hp: '39 (6d10 + 6)',
    hpValue: 39,
    speed: '30 ft., burrow 10 ft.',
    abilities: { str: '17 (+3)', dex: '11 (+0)', con: '13 (+1)', int: '1 (-5)', wis: '13 (+1)', cha: '6 (-2)' },
    meta: [
      { label: 'Senses', value: 'Darkvision 60 ft., Tremorsense 60 ft., Passive Perception 11' },
      { label: 'Languages', value: '—' },
      { label: 'Egg Variant', value: 'Its bite deals poison damage instead of acid damage' },
    ],
    cr: 'Challenge 2 (450 XP) · Proficiency Bonus +2',
    traits: [],
    actions: [
      { name: 'Bite', text: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 10 (2d6 + 3) slashing damage plus 3 (1d6) poison damage. If the target is a Large or smaller creature, it is grappled (escape DC 13). Until the grapple ends, the hatchling can bite only the grappled target and has advantage on the attack.' },
      { name: 'Acid Spray', recharge: 'Recharge 6', text: 'The hatchling spits acid in a 30-foot line that is 5 feet wide, provided it has no creature grappled. Each creature in that line must make a DC 13 Dexterity saving throw, taking 10 (3d6) acid damage on a failed save, or half as much on a success.' },
    ],
    dmTip:
      'Use this for the follow-up adventures (a second dig’s hatched egg, the zoo creature, or the museum feeding frenzy). It grows fast as it feeds — start it pony-sized and let the threat escalate between sessions.',
  },
  {
    id: 'juvenile',
    name: 'Juvenile Eldritch Horror',
    icon: Ghost,
    type: 'Huge Monstrosity, Unaligned · Further Adventures',
    accent: '#6B4C7A',
    description:
      'If a hatchling is left to gorge for days, it grows enormous and bolts for Varkenbluff University. It uses the behir stat block but speaks no languages, has an Intelligence of 18, and can cast spells. A campaign-scale threat — far beyond the 1st-level heist.',
    ac: '17 (natural armor)',
    hp: '168 (16d12 + 64)',
    hpValue: 168,
    speed: '50 ft., climb 40 ft.',
    abilities: { str: '23 (+6)', dex: '16 (+3)', con: '18 (+4)', int: '18 (+4)', wis: '14 (+2)', cha: '12 (+1)' },
    meta: [
      { label: 'Skills', value: 'Perception +6, Stealth +7' },
      { label: 'Damage Immunities', value: 'Lightning' },
      { label: 'Senses', value: 'Darkvision 90 ft., Passive Perception 16' },
      { label: 'Languages', value: '— (speaks none, but has Int 18)' },
    ],
    cr: 'Challenge 11 (7,200 XP) · Proficiency Bonus +4',
    traits: [
      { name: 'Spellcasting', text: 'The horror casts one of the following spells, requiring no components and using Intelligence as the spellcasting ability (save DC 14): 2/day each — blindness/deafness, blur; 1/day — project image.' },
    ],
    actions: [
      { name: 'Multiattack', text: 'The horror makes two attacks: one with its bite and one to constrict.' },
      { name: 'Bite', text: 'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 22 (3d10 + 6) piercing damage.' },
      { name: 'Constrict', text: 'Melee Weapon Attack: +10 to hit, reach 5 ft., one Large or smaller creature. Hit: 17 (2d10 + 6) bludgeoning damage plus 17 (2d10 + 6) slashing damage. The target is grappled (escape DC 16) if the horror isn’t already constricting a creature, and is restrained until the grapple ends.' },
      { name: 'Lightning Breath', recharge: 'Recharge 5–6', text: 'The horror exhales lightning in a 20-foot line that is 5 feet wide. Each creature in the line must make a DC 16 Dexterity saving throw, taking 66 (12d10) lightning damage on a failed save, or half as much on a success.' },
    ],
    dmTip:
      'This is the “the city needs heroes” payoff if the egg is never contained — a high-level set piece, not a level-1 fight. Lean on its new Intelligence and spells to make it a cunning, terrifying adversary.',
  },
];

const ABILITY_LABELS: [keyof Creature['abilities'], string][] = [
  ['str', 'STR'], ['dex', 'DEX'], ['con', 'CON'], ['int', 'INT'], ['wis', 'WIS'], ['cha', 'CHA'],
];

function Stat({ icon: Icon, label, value }: { icon: typeof Shield; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={16} color={ACCENT} className="shrink-0" />
      <div>
        <span className="text-label text-[0.6rem] tracking-[0.12em] block" style={{ color: `${ACCENT_LIGHT}CC` }}>{label}</span>
        <span className="text-stat text-[0.85rem] text-parchment">{value}</span>
      </div>
    </div>
  );
}

function StatBlock({ creature, index }: { creature: Creature; index: number }) {
  const Icon = creature.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #16241F 0%, #12100D 100%)', border: `1px solid ${ACCENT}26`, borderTop: `3px solid ${creature.accent}` }}
    >
      <div className="flex flex-col sm:flex-row gap-5 p-6 pb-4">
        <div
          className="w-full sm:w-40 h-40 rounded-xl shrink-0 flex items-center justify-center"
          style={{ background: `radial-gradient(120% 120% at 50% 30%, ${creature.accent}33 0%, #100c0a 80%)`, border: `1px solid ${creature.accent}66` }}
        >
          <Icon size={56} color={creature.accent} strokeWidth={1.25} />
        </div>
        <div className="min-w-0">
          <h2 className="text-display-md text-parchment" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{creature.name}</h2>
          <p className="text-sm italic mt-1" style={{ color: ACCENT_LIGHT }}>{creature.type}</p>
          <p className="font-body text-[0.95rem] leading-relaxed mt-3" style={{ color: 'rgba(245,240,230,0.75)' }}>{creature.description}</p>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="h-px w-full mb-4" style={{ background: `linear-gradient(90deg, ${ACCENT}00, ${ACCENT}66, ${ACCENT}00)` }} />

        <div className="flex flex-wrap gap-x-8 gap-y-2 mb-4">
          <Stat icon={Shield} label="Armor Class" value={creature.ac} />
          <Stat icon={Heart} label="Hit Points" value={creature.hp} />
          <Stat icon={Wind} label="Speed" value={creature.speed} />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
          {ABILITY_LABELS.map(([key, label]) => (
            <div key={key} className="text-center rounded-lg py-2.5" style={{ background: 'rgba(16,12,10,0.6)', border: `1px solid ${ACCENT}1F` }}>
              <div className="text-label text-[0.6rem] tracking-[0.15em]" style={{ color: ACCENT }}>{label}</div>
              <div className="text-stat text-sm text-parchment mt-1">{creature.abilities[key]}</div>
            </div>
          ))}
        </div>

        <div className="space-y-1.5 mb-4">
          {creature.meta.map((m) => (
            <p key={m.label} className="font-body text-[0.85rem]" style={{ color: 'rgba(245,240,230,0.7)' }}>
              <span className="font-semibold" style={{ color: ACCENT_LIGHT }}>{m.label}</span> {m.value}
            </p>
          ))}
          <p className="text-stat text-[0.8rem] pt-1" style={{ color: 'rgba(201,168,76,0.85)' }}>{creature.cr}</p>
        </div>

        {creature.traits.length > 0 && (
          <div className="mb-4">
            {creature.traits.map((t) => (
              <p key={t.name} className="font-body text-[0.88rem] leading-relaxed mb-2" style={{ color: 'rgba(245,240,230,0.8)' }}>
                <span className="italic font-semibold text-parchment">{t.name}.</span> {t.text}
              </p>
            ))}
          </div>
        )}

        <div className="rounded-xl p-4" style={{ background: 'rgba(139,58,58,0.06)', border: `1px solid ${ACCENT}1F` }}>
          <div className="flex items-center gap-2 mb-3">
            <Swords size={15} color={creature.accent} />
            <span className="text-label text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: ACCENT_LIGHT }}>Actions</span>
          </div>
          {creature.actions.map((a) => (
            <p key={a.name} className="font-body text-[0.88rem] leading-relaxed mb-2.5" style={{ color: 'rgba(245,240,230,0.8)' }}>
              <span className="italic font-semibold text-parchment">{a.name}</span>
              {a.recharge && <span className="text-[0.75rem] ml-1" style={{ color: '#C9A84C' }}>({a.recharge})</span>}
              <span className="italic font-semibold text-parchment">.</span> {a.text}
            </p>
          ))}
        </div>

        <div className="mt-4 rounded-xl p-4 flex gap-3" style={{ background: 'rgba(22,36,31,0.6)', border: `1px dashed ${ACCENT}66` }}>
          <Sparkles size={16} color={ACCENT} className="shrink-0 mt-0.5" />
          <p className="font-body text-[0.85rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.75)' }}>
            <span className="font-semibold" style={{ color: ACCENT_LIGHT }}>Running it: </span>{creature.dmTip}
          </p>
        </div>

        <HpTracker storageKey={`murk-bestiary-${creature.id}`} name={creature.name} maxHp={creature.hpValue} accent={creature.accent} />
      </div>
    </motion.article>
  );
}

export default function Bestiary() {
  return (
    <div className="min-h-[100dvh] pt-16">
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Skull size={22} color={ACCENT} />
              <span className="text-label tracking-[0.12em]" style={{ color: ACCENT_LIGHT }}>BESTIARY</span>
            </div>
            <h1 className="text-display-md text-parchment">Stat Blocks</h1>
            <p className="font-body text-[1.05rem] mt-4 max-w-[640px] mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
              The guardians of the heist — animated statues, Marigold, and the basement mimic — plus the eldritch
              horror the egg becomes if it is ever allowed to hatch.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}>
              <AlertTriangle size={13} color="#C9A84C" />
              <span className="text-stat text-[0.72rem]" style={{ color: 'rgba(201,168,76,0.9)' }}>
                Guards, nobles, and the curator use the standard guard / noble / commoner stat blocks
              </span>
            </div>
          </motion.div>
        </div>
      </section>

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
