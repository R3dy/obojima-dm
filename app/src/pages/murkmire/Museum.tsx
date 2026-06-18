import { motion } from 'framer-motion';
import {
  Landmark,
  DoorOpen,
  Gem,
  Map as MapIcon,
  ShoppingBag,
  Leaf,
  Amphora,
  ScrollText,
  Archive,
  Bone,
  Pickaxe,
  Coffee,
  Skull,
  ArrowLeftRight,
  Bath,
  PackageOpen,
  Sparkles,
} from 'lucide-react';
import { SkillCheck } from '../../components/DMCallouts';
import Figure from './Figure';

const ACCENT = '#3E7C6A';
const ACCENT_LIGHT = '#6FB3A0';
const GOLD = '#C9A84C';

interface Area {
  id: string;
  name: string;
  tag: string;
  icon: React.ElementType;
  accent: string;
  description: string;
  features: string[];
  check?: { dc: number; skill: string; title: string; pass: string; fail: string };
}

const areas: Area[] = [
  {
    id: 'v1',
    name: 'V1 · Grand Entrance',
    tag: 'Public · 2 Guards After Hours',
    icon: DoorOpen,
    accent: '#6B7FA0',
    description:
      'A marble mingling space with a central column, the information desk just inside the front doors, and a carpeted grand staircase north. Two statues of robed human women flank the desk. They animate (animated armor) if a creature comes within 5 feet, and fight until destroyed; staying 5+ feet away keeps them inert. Dim light; guards here carry hooded lanterns.',
    features: [
      'Alarm spells on the front doors and at the bottom of the staircase',
      'Front doors locked from inside — DC 16 Dexterity (thieves’ tools) to pick',
      'A pressure-plate net trap (T) hidden under a rug north of the doors',
      'A toggle under the information desk arms/disarms the trap',
    ],
    check: {
      dc: 16,
      skill: 'Dexterity (Thieves’ Tools)',
      title: 'Pick the Front Doors',
      pass: 'The lock gives. (Bypass the door alarm first with a pass card, or it sounds.)',
      fail: 'The doors hold; try the attic skylight or the basement loading docks instead.',
    },
  },
  {
    id: 'v2',
    name: 'V2 · Museum Shops',
    tag: 'Public · Treasure',
    icon: ShoppingBag,
    accent: '#8FA678',
    description:
      'Two gift shops: “The Historian’s Gifts” (cheap souvenirs, east) and “The Archaeologist’s Spade” (books and artifact replicas, west). Plush benches and racks of logo-stamped bric-a-brac give cover.',
    features: [
      'Each shop has a locked back room — DC 16 Dexterity (thieves’ tools)',
      'Each till holds 1d6 gp, 2d6 sp, and 3d6 cp',
      'One set of thieves’ tools can be cobbled together from the back-room supplies',
    ],
  },
  {
    id: 'v3',
    name: 'V3 · Ancient Plants Exhibit',
    tag: 'Public · 1 Guard',
    icon: Leaf,
    accent: ACCENT,
    description:
      'Artificial ferns, berry bushes, and slender trees among placards on ancient plant life. Hallways north and south connect to area V4.',
    features: [
      'Alarm spells on the short hallways connecting to the grand entrance (V1)',
      'Secret doors in the west wall of the north and central rooms hide cleaning-supply halls',
      'Those halls connect through to matching rooms in area V4',
    ],
  },
  {
    id: 'v4',
    name: 'V4 · Ancient Cultures Exhibit',
    tag: 'Public · 1 Guard',
    icon: Amphora,
    accent: ACCENT,
    description:
      'Glass cases of clay pots, stone tools, and leather scraps from ancient Varkenbluff, with historical placards. Hallways north and south connect to area V3.',
    features: [
      'Secret doors in the east wall of the north and central rooms hide cleaning-supply halls',
      'Those halls connect through to matching rooms in area V3',
      'Good hiding spot while the museum closes',
    ],
  },
  {
    id: 'v5',
    name: 'V5 · Curator’s Office',
    tag: 'Restricted · Marigold the Doll',
    icon: ScrollText,
    accent: '#6B4C7A',
    description:
      'Alda Arkin’s office: an oak desk on plush carpet, and in the southeast corner a five-foot vintage doll, “Marigold,” in a silk dress. After hours, anyone but Alda who enters triggers Marigold to animate (scarecrow stat block) and fight until destroyed. A noisy fight may draw the V1 guards.',
    features: [
      'Alarm spell on the door connecting to the grand entrance (V1)',
      'If the party didn’t take Alda’s clutch at the gala, the guards’ after-hours patrol routes are on the desk',
      'Studying that document for 1 minute grants advantage on Stealth to sneak past guards',
      'Marigold uses the scarecrow stat block (see Bestiary)',
    ],
  },
  {
    id: 'v6',
    name: 'V6 · Records Room',
    tag: 'Restricted · Intel',
    icon: Archive,
    accent: '#6B7FA0',
    description:
      'Filing cabinets of exhibit and financial records. Searching the room reveals where the museum paid to place its alarm spells.',
    features: [
      'Alarm spell on the door connecting to the grand entrance (V1)',
      'Records pinpoint the locations of the building’s alarm spells',
      'Alarms can otherwise be found with detect magic',
    ],
  },
  {
    id: 'v7',
    name: 'V7 · Break Room & Storage',
    tag: 'Restricted · Pass Cards',
    icon: PackageOpen,
    accent: GOLD,
    description:
      'Display-supply boxes stacked in the corners around a circular table. A minute of searching turns up the spare alarm pass cards — the cleanest way past the museum’s alarms.',
    features: [
      'Alarm spell on the door connecting to the grand entrance (V1)',
      'A box in the southwest corner holds three pass cards labeled “spare alarm pass cards”',
      'Each pass card bypasses any of the museum’s alarms',
      'Treasure: a potion of vitality tucked between boxes in the northwest corner',
    ],
  },
  {
    id: 'v8',
    name: 'V8 · Creatures of the Past Exhibit',
    tag: 'Public · 1 Guard',
    icon: Bone,
    accent: ACCENT,
    description:
      'Reconstructed skeletons of small prehistoric creatures — microraptors, ornithopods, dwarf elephants, and an ancestor of the cockatrice — with story placards.',
    features: [
      'A secret door between two exhibit rooms opens into a cleaning-supply hall heading north',
      'The hall’s far secret door opens directly into area V12 (Prehistoric Predators)',
    ],
  },
  {
    id: 'v9',
    name: 'V9 · Underground Wonders Exhibit',
    tag: 'Public · 2 Roving Guards',
    icon: Gem,
    accent: '#6B7FA0',
    description:
      'Ore and gemstones in velvet-backed cases (low value — the precious stones are in the Gemstone Wing). Two guards patrol V9 and V10, swapping rooms every 5 minutes. The easternmost room hides a chunk of jade the size and weight of the Murkmire Stone — the perfect decoy.',
    features: [
      'Fake Murkmire Stone (jade) in the central case — DC 10 Dexterity (thieves’ tools) to open',
      'Smashing the case attracts the patrolling guards',
      'A secret door between V9 and V10 leads via a cleaning-supply hall into area V13',
    ],
    check: {
      dc: 10,
      skill: 'Dexterity (Thieves’ Tools)',
      title: 'Lift the Decoy Jade',
      pass: 'The case opens quietly and the fake is yours — swap it for the real egg to foil the pedestal trap.',
      fail: 'The case resists; forcing it by smashing the glass brings the V9–V10 patrol running.',
    },
  },
  {
    id: 'v10',
    name: 'V10 · Archaeology Display',
    tag: 'Public · 2 Roving Guards',
    icon: Pickaxe,
    accent: '#8FA678',
    description:
      'Picks, trowels, and brushes from famous local digs, with murals of the infamous Rogerson dig (placards dismiss the “curse” legends). Two guards patrol here and V9, swapping every 5 minutes.',
    features: [
      'Treasure: a +1 dagger and a +1 handaxe in a glass case with a jammed lock',
      'Spotting them takes a DC 10 Wisdom (Perception) check',
      'The case must be broken to reach them — which attracts the patrolling guards',
    ],
    check: {
      dc: 10,
      skill: 'Wisdom (Perception)',
      title: 'Spot the Flawless Weapons',
      pass: 'The crew notices the +1 dagger and +1 handaxe among the display tools.',
      fail: 'They pass as ordinary museum-piece tools.',
    },
  },
  {
    id: 'v11',
    name: 'V11 · Unearthed Café',
    tag: 'Public · 1 Guard',
    icon: Coffee,
    accent: ACCENT,
    description:
      'Cafeteria tables and lounge furniture beneath the “Unearthed Café” sign in the northeast corner.',
    features: [
      'Treasure: a lockbox under the counter — DC 14 Dexterity (thieves’ tools)',
      'The lockbox holds 15 gp, 7 sp, and 24 cp',
    ],
  },
  {
    id: 'v12',
    name: 'V12 · Prehistoric Predators Exhibit',
    tag: 'Public · 2 Guards · Dim Light',
    icon: Skull,
    accent: '#8B3A3A',
    description:
      'Towering skeletons and the museum’s pride: a beautifully preserved allosaurus said to have died in the Murkmire. A statue of a winged satyr west of the stairs animates (animated armor) within 5 feet. Dim light; guards carry hooded lanterns.',
    features: [
      'Alarm spells in the hall to the café (V11) and on the east-wall door to V13',
      'The allosaurus is a rock-gnome animatronic — a control panel hides under a hatch in its base',
      'Overload it (DC 10 Intelligence (Arcana), tinker’s or thieves’ tools) and it rampages for 10 minutes',
      'A 10-ft-high air vent in the east wall leads to V13 — DC 10 Athletics to reach',
    ],
    check: {
      dc: 10,
      skill: 'Intelligence (Arcana)',
      title: 'Overload the Animatronic Allosaurus',
      pass: 'It breaks free and rampages through V12, down to V1 — chaos and cover (Construct; immune to poison/psychic and several conditions).',
      fail: 'The controls hold; merely switching it on alerts the guards in V11, V12, and V13.',
    },
  },
  {
    id: 'v13',
    name: 'V13 · Gemstone Wing',
    tag: 'The Objective · 2 Guards',
    icon: Gem,
    accent: GOLD,
    description:
      'The gala ballroom: crystal-cluttered tables and, against the east wall, the light-green Murkmire Stone on a marble pedestal. (The normal gemstone displays are stored in the basement.) Removing the egg carelessly springs the pedestal’s trap.',
    features: [
      'Rigged pedestal radiates transmutation magic; tiny glyphs warn a DC 12 Arcana check',
      'Removing the stone triggers arcane lock on every door (even secret ones)',
      'Locked doors: DC 20 thieves’ tools or DC 20 Strength (Athletics) — guards/curator open them freely',
      'Swapping in the V9 fake avoids the trap — DC 10 Dexterity (Sleight of Hand)',
      'An air vent in the west wall leads to V12; a south-wall secret door leads toward V9/V10',
    ],
    check: {
      dc: 12,
      skill: 'Intelligence (Arcana)',
      title: 'Read the Rigged Pedestal',
      pass: 'The crew realizes all doors will lock if the stone is lifted — time to plan a fake swap or an exit.',
      fail: 'The glyphs’ purpose stays hidden; lifting the egg may slam every door shut.',
    },
  },
  {
    id: 'v14',
    name: 'V14 · Access Hallway',
    tag: 'Connector',
    icon: ArrowLeftRight,
    accent: '#6B7FA0',
    description:
      'A plain hallway linking the Unearthed Café (V11) to the Prehistoric Predators exhibit (V12) and the privies (V15).',
    features: ['Connects V11, V12, and V15', 'A quiet route between the café and the predators hall'],
  },
  {
    id: 'v15',
    name: 'V15 · Privies',
    tag: 'Hiding Spot · Unlocked',
    icon: Bath,
    accent: ACCENT,
    description:
      'Five stalls, each latchable from inside. Guards nominally check here before closing, but anyone hiding inside avoids detection. East of the privies, a staircase climbs to the attic (V17).',
    features: [
      'The only interior doors left unlocked',
      'Hide here to avoid the after-hours sweep',
      'Stairs east lead up to the attic (V17)',
    ],
  },
  {
    id: 'v16',
    name: 'V16 · Basement',
    tag: 'Restricted · Mimic · Dim Light',
    icon: PackageOpen,
    accent: '#8B3A3A',
    description:
      'Stored displays and crates, with great warehouse loading-dock doors in the north wall. A mimic has taken up residence in the centermost pile of boxes; it waits until a creature comes within 5 feet, then fights until destroyed. Dim light.',
    features: [
      'Loading docks: DC 14 thieves’ tools to unlock, then DC 15 Athletics to shove open (noisy — draws one V1 guard)',
      'A secret door in the northwest corner opens a 50-ft tunnel to a copse of trees outside',
      'Treasure: 20 lb of local gems and silver ore (southeast crates) worth 150 gp total',
      'The mimic uses the mimic stat block (see Bestiary)',
    ],
  },
  {
    id: 'v17',
    name: 'V17 · Attic',
    tag: 'Entry · Skylight · Dim Light',
    icon: Sparkles,
    accent: ACCENT_LIGHT,
    description:
      'A cramped space of haphazard event-supply boxes — lecterns, linens, tableware — lit by starlight through a large skylight. By the end of the gala it is dark enough to enter here unseen.',
    features: [
      'Locked skylight: DC 14 thieves’ tools to unlock, then DC 12 Athletics to lift open',
      'Grappling hooks and rope are needed to scale the building to the roof',
      'Loose roof bricks can prop the skylight open',
    ],
    check: {
      dc: 14,
      skill: 'Dexterity (Thieves’ Tools)',
      title: 'Unlock the Skylight',
      pass: 'The latch gives; a DC 12 Athletics check then lifts the skylight to drop into the attic.',
      fail: 'The skylight stays sealed — prop it with a roof brick or try another way in.',
    },
  },
];

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const generalFeatures = [
  'Ceilings are 30 feet high throughout.',
  'Interior doors are closed and locked (except the privies, V15) — DC 12 Dexterity (thieves’ tools); a door with an enabled alarm sounds it if picked.',
  'Most areas are lit by continual flame sconces; V1, V12, V16, and V17 are dim light.',
  'Secret doors are found with a DC 12 Wisdom (Perception) check; the matching door inside a supply hall needs no check.',
];

export default function Museum() {
  return (
    <div className="min-h-[100dvh] pt-16">
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Landmark size={22} color={ACCENT} />
              <span className="text-label tracking-[0.12em]" style={{ color: ACCENT_LIGHT }}>THE MUSEUM</span>
            </div>
            <h1 className="text-display-md text-parchment">Varkenbluff Museum of Natural History</h1>
            <p className="font-body text-[1.05rem] mt-4 max-w-[640px] mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
              A room-by-room guide to the museum&apos;s three floors, basement, and attic — keyed to Map 1.2. The
              descriptions assume the characters are exploring after closing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* OFFICIAL MAPS & ART */}
      <section className="px-4 pb-4">
        <div className="max-w-container-narrow mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <MapIcon size={18} color={ACCENT} />
            <h2 className="text-heading-lg text-parchment">Maps & Handouts</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Figure src="/murkmire/map_museum_dm.webp" alt="Map 1.2 — DM's map of the museum, labelled V1–V17 with a grid" caption="Map 1.2 · DM Map" kind="map" className="h-80" fit="contain" />
            <Figure src="/murkmire/map_museum_player.webp" alt="Map 1.2 — player version with no labels" caption="Map 1.2 · Player Map" kind="map" className="h-80" fit="contain" />
            <Figure src="/murkmire/handout_players_map.webp" alt="Map 1.1 — Dr. Dannell's hand-drawn sketch of the museum" caption="Map 1.1 · Dr. Dannell's Sketch" kind="handout" className="h-80" fit="contain" />
            <Figure src="/murkmire/scene_gala.webp" alt="The opening gala — the Murkmire Stone on its pedestal" caption="Scene · The Opening Gala" kind="handout" className="h-80" fit="cover" />
          </div>
        </div>
      </section>

      {/* GENERAL FEATURES */}
      <section className="px-4 pb-2 pt-6">
        <div className="max-w-container-narrow mx-auto">
          <div className="rounded-2xl p-6 sm:p-7" style={{ background: 'rgba(62,124,106,0.1)', border: `1px solid ${ACCENT}33` }}>
            <h2 className="text-heading-lg text-parchment mb-3">General Features</h2>
            <ul className="space-y-2">
              {generalFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-[0.92rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.78)' }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: ACCENT_LIGHT }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 pt-8">
        <div className="max-w-container-narrow mx-auto space-y-6">
          {areas.map((area) => {
            const Icon = area.icon;
            return (
              <motion.article
                key={area.id}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="rounded-2xl p-6 sm:p-7"
                style={{ background: 'linear-gradient(135deg, #16241F 0%, #12100D 100%)', border: `1px solid ${ACCENT}26`, borderLeft: `3px solid ${area.accent}` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${area.accent}22`, border: `1px solid ${area.accent}44` }}>
                    <Icon size={20} color={area.accent} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-label text-[0.62rem] tracking-[0.12em] uppercase" style={{ color: area.accent }}>{area.tag}</span>
                    <h2 className="text-heading-lg text-parchment">{area.name}</h2>
                  </div>
                </div>

                <p className="font-body text-[0.97rem] leading-relaxed mt-4" style={{ color: 'rgba(245,240,230,0.8)' }}>{area.description}</p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  {area.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 font-body text-[0.88rem]" style={{ color: 'rgba(245,240,230,0.65)' }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: area.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {area.check && (
                  <div className="mt-2">
                    <SkillCheck dc={area.check.dc} skill={area.check.skill} title={area.check.title} pass={area.check.pass} fail={area.check.fail} />
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
