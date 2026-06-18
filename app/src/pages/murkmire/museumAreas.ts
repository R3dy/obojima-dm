import {
  DoorOpen,
  Gem,
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
  type LucideIcon,
} from 'lucide-react';

const ACCENT = '#3E7C6A';
const ACCENT_LIGHT = '#6FB3A0';
const GOLD = '#C9A84C';

export interface AreaLink {
  label: string;
  route: string;
}

export interface AreaCheck {
  dc: number;
  skill: string;
  title: string;
  pass: string;
  fail: string;
}

export interface MuseumArea {
  id: string;
  /** Keyed label as it appears on the map, e.g. "V1". */
  pin: string;
  /** Room name without the key prefix, e.g. "Grand Entrance". */
  shortName: string;
  tag: string;
  icon: LucideIcon;
  accent: string;
  /** Approximate centre of the area on the DM map, as a percentage (0–100). */
  coords: { x: number; y: number };
  /** Boxed text to read to the players, straight from the adventure. */
  readAloud?: string;
  /** DM-facing summary of what's going on in the room. */
  description: string;
  /** Quick-reference game notes: alarms, exits, treasure, DCs. */
  features: string[];
  check?: AreaCheck;
  /** Related pages worth jumping to (stat blocks, security rules, beats). */
  links?: AreaLink[];
}

export const museumAreas: MuseumArea[] = [
  {
    id: 'v1',
    pin: 'V1',
    shortName: 'Grand Entrance',
    tag: 'Public · 2 Guards After Hours',
    icon: DoorOpen,
    accent: '#6B7FA0',
    coords: { x: 51, y: 81 },
    readAloud:
      'Statues depicting robed human women flank the sides of this public mingling space, which boasts a marble column in the center. The museum’s information desk is situated just inside the front doors. To the north is a grand staircase draped in rich carpet.',
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
    links: [
      { label: 'Animated Statues — stat block', route: '/bestiary' },
      { label: 'Falling Net & alarms', route: '/encounters' },
    ],
  },
  {
    id: 'v2',
    pin: 'V2',
    shortName: 'Museum Shops',
    tag: 'Public · Treasure',
    icon: ShoppingBag,
    accent: '#8FA678',
    coords: { x: 42, y: 70 },
    readAloud:
      'Display racks here are filled with tunics, bandannas, books, and bric-a-brac, most emblazoned with the museum’s logo. Plush benches serve as seating areas.',
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
    pin: 'V3',
    shortName: 'Ancient Plants Exhibit',
    tag: 'Public · 1 Guard',
    icon: Leaf,
    accent: ACCENT,
    coords: { x: 31, y: 75 },
    readAloud:
      'Artificial plants made of wood, silk, and other materials sprout from artfully arranged planters. Tall ferns, bushes with strange berries, and slender trees are represented alongside placards about ancient plant life.',
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
    pin: 'V4',
    shortName: 'Ancient Cultures Exhibit',
    tag: 'Public · 1 Guard',
    icon: Amphora,
    accent: ACCENT,
    coords: { x: 22, y: 88 },
    readAloud:
      'Glass display cases boast objects related to life in ancient Varkenbluff. Clay pots, stone tools, and scraps of leather clothes are interspersed with informational placards about their historical use.',
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
    pin: 'V5',
    shortName: 'Curator’s Office',
    tag: 'Restricted · Marigold the Doll',
    icon: ScrollText,
    accent: '#6B4C7A',
    coords: { x: 79, y: 76 },
    readAloud:
      'A solid oak desk stands on a plush carpet in the center of this office. In the southeast corner, a strange, human-sized doll is posed in an elaborate silk dress.',
    description:
      'Alda Arkin’s office: an oak desk on plush carpet, and in the southeast corner a five-foot vintage doll, “Marigold,” in a silk dress. After hours, anyone but Alda who enters triggers Marigold to animate (scarecrow stat block) and fight until destroyed. A noisy fight may draw the V1 guards.',
    features: [
      'Alarm spell on the door connecting to the grand entrance (V1)',
      'If the party didn’t take Alda’s clutch at the gala, the guards’ after-hours patrol routes are on the desk',
      'Studying that document for 1 minute grants advantage on Stealth to sneak past guards',
      'Marigold uses the scarecrow stat block (see Bestiary)',
    ],
    links: [
      { label: 'Marigold (Scarecrow) — stat block', route: '/bestiary' },
      { label: 'Curator Alda Arkin', route: '/npcs' },
    ],
  },
  {
    id: 'v6',
    pin: 'V6',
    shortName: 'Records Room',
    tag: 'Restricted · Intel',
    icon: Archive,
    accent: '#6B7FA0',
    coords: { x: 79, y: 76 },
    readAloud: 'Filing cabinets stand in this records room.',
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
    pin: 'V7',
    shortName: 'Break Room & Storage',
    tag: 'Restricted · Pass Cards',
    icon: PackageOpen,
    accent: GOLD,
    coords: { x: 80, y: 71 },
    readAloud:
      'Boxes of display supplies are stacked into this room’s corners. Chairs surround a circular table in the middle.',
    description:
      'Display-supply boxes stacked in the corners around a circular table. A minute of searching turns up the spare alarm pass cards — the cleanest way past the museum’s alarms.',
    features: [
      'Alarm spell on the door connecting to the grand entrance (V1)',
      'A box in the southwest corner holds three pass cards labeled “spare alarm pass cards”',
      'Each pass card bypasses any of the museum’s alarms',
      'Treasure: a potion of vitality tucked between boxes in the northwest corner',
    ],
    links: [{ label: 'Bypassing alarms', route: '/encounters' }],
  },
  {
    id: 'v8',
    pin: 'V8',
    shortName: 'Creatures of the Past Exhibit',
    tag: 'Public · 1 Guard',
    icon: Bone,
    accent: ACCENT,
    coords: { x: 30, y: 56 },
    readAloud:
      'Fossils of small prehistoric creatures are arranged here, some as fully reconstructed skeletons. The exhibit includes microraptors, ornithopods, dwarf elephants, and an ancestor of the cockatrice. Informational placards tell the stories of these creatures and their bones’ discovery.',
    description:
      'Reconstructed skeletons of small prehistoric creatures — microraptors, ornithopods, dwarf elephants, and an ancestor of the cockatrice — with story placards.',
    features: [
      'A secret door between two exhibit rooms opens into a cleaning-supply hall heading north',
      'The hall’s far secret door opens directly into area V12 (Prehistoric Predators)',
    ],
  },
  {
    id: 'v9',
    pin: 'V9',
    shortName: 'Underground Wonders Exhibit',
    tag: 'Public · 2 Roving Guards',
    icon: Gem,
    accent: '#6B7FA0',
    coords: { x: 64, y: 56 },
    readAloud:
      'Glittering ore and gemstones are arranged in velvet-backed display cases. Informational placards explain local geologic history.',
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
    links: [{ label: 'The jade swap — Beat 5', route: '/the-stone' }],
  },
  {
    id: 'v10',
    pin: 'V10',
    shortName: 'Archaeology Display',
    tag: 'Public · 2 Roving Guards',
    icon: Pickaxe,
    accent: '#8FA678',
    coords: { x: 78, y: 55 },
    readAloud:
      'Picks, trowels, brushes, and other archaeological tools are on display here. Informational placards label them as tools famous local experts used to dig up the wonders found in the museum. Murals along the south wall depict famous digs.',
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
    pin: 'V11',
    shortName: 'Unearthed Café',
    tag: 'Public · 1 Guard',
    icon: Coffee,
    accent: ACCENT,
    coords: { x: 23, y: 45 },
    readAloud:
      'This space holds a mix of cafeteria-style tables and lounge furniture. A counter in the northeast corner sits underneath a sign that reads, “Unearthed Café.”',
    description: 'Cafeteria tables and lounge furniture beneath the “Unearthed Café” sign in the northeast corner.',
    features: [
      'Treasure: a lockbox under the counter — DC 14 Dexterity (thieves’ tools)',
      'The lockbox holds 15 gp, 7 sp, and 24 cp',
    ],
  },
  {
    id: 'v12',
    pin: 'V12',
    shortName: 'Prehistoric Predators Exhibit',
    tag: 'Public · 2 Guards · Dim Light',
    icon: Skull,
    accent: '#8B3A3A',
    coords: { x: 51, y: 41 },
    readAloud:
      'The intact skeletons of several large prehistoric monsters are on display here, including the museum’s most famous display: the beautifully preserved body of an allosaurus, its leathery skin appearing supple to the touch. An informational placard next to the dinosaur explains it died in the Murkmire millennia ago and was naturally preserved. Display cases along the room’s walls hold fossils of other ancient local predators.',
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
    links: [
      { label: 'Animated Statue — stat block', route: '/bestiary' },
      { label: 'Through the Galleries — Beat 4', route: '/galleries' },
    ],
  },
  {
    id: 'v13',
    pin: 'V13',
    shortName: 'Gemstone Wing',
    tag: 'The Objective · 2 Guards',
    icon: Gem,
    accent: GOLD,
    coords: { x: 77, y: 40 },
    readAloud:
      'Chairs surround several tables cluttered with crystal and silver tableware. Against the east wall, a light-green stone rests atop a marble pedestal.',
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
    links: [
      { label: 'Taking the Stone — Beat 5', route: '/the-stone' },
      { label: 'The rigged pedestal & the pulse', route: '/encounters' },
    ],
  },
  {
    id: 'v14',
    pin: 'V14',
    shortName: 'Access Hallway',
    tag: 'Connector',
    icon: ArrowLeftRight,
    accent: '#6B7FA0',
    coords: { x: 33, y: 34 },
    description:
      'A plain hallway linking the Unearthed Café (V11) to the Prehistoric Predators exhibit (V12) and the privies (V15).',
    features: ['Connects V11, V12, and V15', 'A quiet route between the café and the predators hall'],
  },
  {
    id: 'v15',
    pin: 'V15',
    shortName: 'Privies',
    tag: 'Hiding Spot · Unlocked',
    icon: Bath,
    accent: ACCENT,
    coords: { x: 72, y: 34 },
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
    pin: 'V16',
    shortName: 'Basement',
    tag: 'Restricted · Mimic · Dim Light',
    icon: PackageOpen,
    accent: '#8B3A3A',
    coords: { x: 72, y: 22 },
    readAloud:
      'Boxes and crates are piled here in groups. Enormous warehouse doors take up much of the basement’s northern wall.',
    description:
      'Stored displays and crates, with great warehouse loading-dock doors in the north wall. A mimic has taken up residence in the centermost pile of boxes; it waits until a creature comes within 5 feet, then fights until destroyed. Dim light.',
    features: [
      'Loading docks: DC 14 thieves’ tools to unlock, then DC 15 Athletics to shove open (noisy — draws one V1 guard)',
      'A secret door in the northwest corner opens a 50-ft tunnel to a copse of trees outside',
      'Treasure: 20 lb of local gems and silver ore (southeast crates) worth 150 gp total',
      'The mimic uses the mimic stat block (see Bestiary)',
    ],
    links: [{ label: 'Mimic — stat block', route: '/bestiary' }],
  },
  {
    id: 'v17',
    pin: 'V17',
    shortName: 'Attic',
    tag: 'Entry · Skylight · Dim Light',
    icon: Sparkles,
    accent: ACCENT_LIGHT,
    coords: { x: 29, y: 25 },
    readAloud:
      'A winding staircase leads up to this cramped space filled with haphazardly stacked boxes. Starlight pours into the space through a large skylight.',
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
    links: [{ label: 'Into the Museum — Beat 3', route: '/infiltration' }],
  },
];
