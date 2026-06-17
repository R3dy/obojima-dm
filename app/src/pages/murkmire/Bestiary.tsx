import { motion } from 'framer-motion';
import { Skull, Shield, Heart, Wind, Sparkles, Swords, AlertTriangle } from 'lucide-react';
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
    id: 'taxidermy-wolf',
    name: 'Animated Taxidermy Wolf',
    icon: Skull,
    type: 'Small Construct (Animated), Unaligned',
    accent: '#6B7FA0',
    description:
      'A mounted wolf jerked off its diorama by the meteorite’s necrotic field. It moves in stuttering lunges, sawdust leaking from its seams, glass eyes glinting. Alone it is a nuisance; in a pack it harries a fleeing crew.',
    ac: '12 (preserved hide)',
    hp: '19 (3d6 + 9)',
    hpValue: 19,
    speed: '40 ft.',
    abilities: { str: '13 (+1)', dex: '14 (+2)', con: '16 (+3)', int: '2 (-4)', wis: '8 (-1)', cha: '3 (-4)' },
    meta: [
      { label: 'Damage Vulnerabilities', value: 'Fire' },
      { label: 'Damage Immunities', value: 'Poison, Psychic' },
      { label: 'Condition Immunities', value: 'Charmed, Exhaustion, Frightened, Poisoned' },
      { label: 'Senses', value: 'Darkvision 60 ft., Passive Perception 9' },
      { label: 'Languages', value: '—' },
    ],
    cr: 'Challenge 1/4 (50 XP) · Proficiency Bonus +2',
    traits: [
      { name: 'Pack Tactics', text: 'The wolf has advantage on an attack roll against a creature if at least one of the wolf’s allies is within 5 feet of the creature and isn’t incapacitated.' },
      { name: 'Unnatural Stillness', text: 'While motionless, the wolf is indistinguishable from an ordinary museum mount (DC 13 Investigation to tell it apart before it moves).' },
    ],
    actions: [
      { name: 'Bite', text: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 2) piercing damage plus 2 (1d4) necrotic damage. If the target is a creature, it must succeed on a DC 11 Strength save or be knocked prone.' },
    ],
    dmTip:
      'Lead with one wolf, then add a second if the crew lingers. They’re fast — perfect for chasing a fleeing party toward the exit. Remember the fire vulnerability; a thrown lantern is a satisfying answer.',
  },
  {
    id: 'owlbear-trophy',
    name: 'Stuffed Owlbear Trophy',
    icon: Skull,
    type: 'Large Construct (Animated), Unaligned',
    accent: '#8B3A3A',
    description:
      'The Hall of Beasts’ centerpiece: a towering owlbear mount that tears free of its plinth when the Malevolence wakes, splinters and stuffing raining down. Slower than it looks, but a single swat can drop a level-1 hero. This is the encounter the crew should flee, not fight.',
    ac: '13 (natural mount)',
    hp: '45 (6d10 + 12)',
    hpValue: 45,
    speed: '30 ft.',
    abilities: { str: '18 (+4)', dex: '10 (+0)', con: '15 (+2)', int: '2 (-4)', wis: '10 (+0)', cha: '3 (-4)' },
    meta: [
      { label: 'Damage Vulnerabilities', value: 'Fire' },
      { label: 'Damage Immunities', value: 'Poison, Psychic' },
      { label: 'Condition Immunities', value: 'Charmed, Exhaustion, Frightened, Poisoned' },
      { label: 'Senses', value: 'Darkvision 60 ft., Passive Perception 10' },
      { label: 'Languages', value: '—' },
    ],
    cr: 'Challenge 2 (450 XP) · Proficiency Bonus +2',
    traits: [
      { name: 'Lumbering Wake', text: 'On the round it animates, the owlbear can’t take reactions and its speed is halved as it wrenches free of its mount — a window for the crew to run.' },
    ],
    actions: [
      { name: 'Multiattack', text: 'The owlbear trophy makes two attacks: one with its beak and one with its claws.' },
      { name: 'Beak', text: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 4) piercing damage.' },
      { name: 'Claws', text: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.' },
    ],
    dmTip:
      'Telegraph it: stuffing and splinters fly before it fully rises. Its damage is brutal for level 1, so use the Lumbering Wake round to let the party choose flight. If they stand and fight, fudge toward drama, not a TPK — fire and toppled scenery should feel like winning moves.',
  },
  {
    id: 'specimen-swarm',
    name: 'Specimen-Jar Swarm',
    icon: Skull,
    type: 'Medium Swarm of Tiny Constructs, Unaligned',
    accent: ACCENT,
    description:
      'A storeroom shelf of preserved frogs, insects, and eels bursts its jars and pours across the floor in a glistening, formaldehyde-reeking tide. Individually harmless; together, a smothering, biting wave that flows under doors and through grates.',
    ac: '12',
    hp: '22 (5d8)',
    hpValue: 22,
    speed: '20 ft., climb 20 ft.',
    abilities: { str: '6 (-2)', dex: '15 (+2)', con: '10 (+0)', int: '1 (-5)', wis: '7 (-2)', cha: '2 (-4)' },
    meta: [
      { label: 'Damage Resistances', value: 'Bludgeoning, Piercing, Slashing' },
      { label: 'Damage Immunities', value: 'Poison, Psychic' },
      { label: 'Condition Immunities', value: 'Charmed, Frightened, Grappled, Prone, Restrained, Stunned' },
      { label: 'Senses', value: 'Blindsight 30 ft., Passive Perception 8' },
      { label: 'Languages', value: '—' },
    ],
    cr: 'Challenge 1/2 (100 XP) · Proficiency Bonus +2',
    traits: [
      { name: 'Swarm', text: 'The swarm can occupy another creature’s space and vice versa, and can move through any opening large enough for a Tiny construct. It can’t regain hit points or gain temporary hit points.' },
    ],
    actions: [
      { name: 'Smother', text: 'Melee Weapon Attack: +4 to hit, reach 0 ft., one creature in the swarm’s space. Hit: 10 (4d4) necrotic damage, or 5 (2d4) necrotic damage if the swarm has half its hit points or fewer.' },
    ],
    dmTip:
      'Great for ratcheting tension in the storeroom or the flooded sub-basement. Its resistance to weapon damage rewards area effects, fire, and simply running. Spilled formaldehyde plus a torch clears it dramatically.',
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
            <h1 className="text-display-md text-parchment">When the Exhibits Wake</h1>
            <p className="font-body text-[1.05rem] mt-4 max-w-[640px] mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
              Three animated-taxidermy stat blocks for the wake in Beat 5. They share fire vulnerability and
              collapse the moment the meteorite leaves the building.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}>
              <AlertTriangle size={13} color="#C9A84C" />
              <span className="text-stat text-[0.72rem]" style={{ color: 'rgba(201,168,76,0.9)' }}>
                Tuned for a 1st-level party — escape is the intended “win”
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
