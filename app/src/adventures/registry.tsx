import { lazy } from 'react';
import {
  Home as HomeIcon,
  Route,
  ScrollText,
  TreePine,
  Users,
  Map,
  Sword,
  PawPrint,
  FlaskConical,
  BookOpen,
  Sparkles,
  Shield,
  Backpack,
  Dices,
  ShieldAlert,
  Landmark,
  KeyRound,
  Skull,
  Gem,
  Clock,
} from 'lucide-react';
import type { AdventureConfig, AdventureId } from './types';

/* ------------------------------------------------------------------ */
/*  OBOJIMA PAGES                                                      */
/* ------------------------------------------------------------------ */

const ObojimaAdventureFlow = lazy(() => import('../pages/AdventureFlow'));
const ObojimaOverview = lazy(() => import('../pages/Overview'));
const ObojimaNPCs = lazy(() => import('../pages/NPCs'));
const ObojimaWorkshop = lazy(() => import('../pages/Workshop'));
const ObojimaLocations = lazy(() => import('../pages/Locations'));
const ObojimaEncounters = lazy(() => import('../pages/Encounters'));
const ObojimaBestiary = lazy(() => import('../pages/Bestiary'));
const ObojimaPotions = lazy(() => import('../pages/Potions'));
const ObojimaConclusion = lazy(() => import('../pages/Conclusion'));
const ObojimaOkiri = lazy(() => import('../pages/OkiriVillage'));
const ObojimaSubclasses = lazy(() => import('../pages/Subclasses'));
const ObojimaFeats = lazy(() => import('../pages/FeatsConditions'));
const ObojimaGear = lazy(() => import('../pages/BackgroundsGear'));

/* ------------------------------------------------------------------ */
/*  MURKMIRE PAGES                                                     */
/* ------------------------------------------------------------------ */

const MurkmireOverview = lazy(() => import('../pages/murkmire/Overview'));
const MurkmireBriefing = lazy(() => import('../pages/murkmire/Briefing'));
const MurkmireAdventureFlow = lazy(() => import('../pages/murkmire/AdventureFlow'));
const MurkmireNPCs = lazy(() => import('../pages/murkmire/NPCs'));
const MurkmireMuseum = lazy(() => import('../pages/murkmire/Museum'));
const MurkmireEncounters = lazy(() => import('../pages/murkmire/Encounters'));
const MurkmireBestiary = lazy(() => import('../pages/murkmire/Bestiary'));
const MurkmireConclusion = lazy(() => import('../pages/murkmire/Conclusion'));

/* ================================================================== */
/*  OBOJIMA — The Curious World Within                                 */
/* ================================================================== */

const obojima: AdventureConfig = {
  id: 'obojima',
  shortName: 'Obojima',
  navTitle: 'The Curious World Within',
  heroTitle: 'THE CURIOUS WORLD WITHIN',
  heroTagline: 'Tales From The Tall Grass · A DM’s Companion',
  heroImage: '/cover_art.jpeg',
  heroImagePosition: 'center 30%',
  footerTitle: 'The Curious World Within',
  footerSubtitle: 'Obojima: Tales From The Tall Grass · A Digital Companion for Dungeon Masters',
  infoItems: [
    { icon: Users, label: '2–4 Players' },
    { icon: Shield, label: '2nd Level' },
    { icon: Map, label: 'Obojima Setting' },
    { icon: Clock, label: '~2–3 Hours' },
  ],
  summary: {
    eyebrow: 'ADVENTURE HOOK',
    title: 'The Tiny Heroes',
    paragraphs: [
      'The adventurers decide to help out a young postal knight named Lomi and find themselves shrunk to Tiny size when they infiltrate Miss Lindley’s witch workshop to retrieve a misdelivered letter. What began as a simple favor becomes a perilous journey through a world where every bookshelf is a cliff face, every staircase a mountainside, and every beetle a terrifying monster.',
      'As they navigate the strange landscape at mouse-size, they’ll fend off bora bugs, handle pixie tricksters, talk to a giant cat, and perhaps even fight a giant Venus fly rat — all while searching for a way to return to normal size and recover the missing letter.',
    ],
    ctaLabel: 'Read the Full Story →',
    ctaRoute: '/adventure',
  },
  portalsEyebrow: 'QUICK ACCESS',
  portalsTitle: 'Choose Your Path',
  portals: [
    { route: '/adventure', label: 'Adventure Flow', icon: Route, accent: '#C9A84C', description: 'Chronological scene-by-scene DM guide' },
    { route: '/overview', label: 'Adventure Overview', icon: ScrollText, accent: '#B87333', description: 'Premise, narrative arc, and key revelations' },
    { route: '/okiri', label: 'Okiri Village', icon: TreePine, accent: '#4A5D3F', description: 'Local lore, NPCs, points of interest, and hooks' },
    { route: '/npcs', label: 'Characters', icon: Users, accent: '#B87333', description: 'Six NPCs with bios, traits, and DM guidance' },
    { route: '/workshop', label: 'The Workshop', icon: HomeIcon, accent: '#B87333', description: 'Exterior, magical properties, and entry points' },
    { route: '/locations', label: 'Locations', icon: Map, accent: '#6B7FA0', description: 'Three areas with interactive battlemaps' },
    { route: '/encounters', label: 'Encounters', icon: Sword, accent: '#8B3A3A', description: 'Combat scenarios and environmental hazards' },
    { route: '/bestiary', label: 'Bestiary', icon: PawPrint, accent: '#4A5D3F', description: 'Three monster stat blocks with original art' },
    { route: '/potions', label: 'Potions', icon: FlaskConical, accent: '#6B4C7A', description: 'Nine magical brews across three categories' },
    { route: '/conclusion', label: 'Conclusion', icon: BookOpen, accent: '#C9A84C', description: 'Endings, hooks, and the letter’s mystery' },
  ],
  playerOptions: {
    eyebrow: 'FOR YOUR PLAYERS',
    title: 'Player Options',
    blurb: 'Obojima-specific character options to share with the table.',
    links: [
      { path: '/subclasses', label: 'Subclasses', icon: Sparkles },
      { path: '/feats', label: 'Feats & Conditions', icon: Shield },
      { path: '/gear', label: 'Backgrounds & Gear', icon: Backpack },
    ],
    portals: [
      { route: '/subclasses', label: 'Subclasses', icon: Sparkles, accent: '#C9A84C', description: 'New subclasses woven into Obojima’s culture' },
      { route: '/feats', label: 'Feats & Conditions', icon: Shield, accent: '#8B3A3A', description: 'Island feats, skill uses, and local conditions' },
      { route: '/gear', label: 'Backgrounds & Gear', icon: Backpack, accent: '#4A5D3F', description: 'Backgrounds, starting wealth, and unique gear' },
    ],
  },
  theme: {
    accent: '#B87333',
    accentLight: '#D4956A',
    infoBarBg: 'rgba(62,74,94,0.3)',
    infoBarBorder: 'rgba(107,127,160,0.2)',
  },
  navLinks: [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/adventure', label: 'Adventure Flow', icon: Route },
    { path: '/okiri', label: 'Okiri Village', icon: TreePine },
    { path: '/npcs', label: 'NPCs', icon: Users },
    { path: '/workshop', label: 'Workshop', icon: HomeIcon },
    { path: '/locations', label: 'Locations', icon: Map },
    { path: '/encounters', label: 'Encounters', icon: Sword },
    { path: '/bestiary', label: 'Bestiary', icon: PawPrint },
    { path: '/potions', label: 'Potions', icon: FlaskConical },
    { path: '/conclusion', label: 'Conclusion', icon: BookOpen },
  ],
  searchGroups: [
    {
      heading: 'Adventure Scenes',
      entries: [
        { title: 'Scene 1 — Arrival in Okiri Village', route: '/adventure', anchor: 'scene-1', icon: Route, keywords: 'start village history dc 12' },
        { title: 'Scene 2 — Meet the Quest Giver', subtitle: 'Lomi, negotiation', route: '/adventure', anchor: 'scene-2', icon: Route, keywords: 'lomi letter persuasion deception insight' },
        { title: 'Scene 3 — Entering the Workshop', subtitle: 'Shrink trap, three entrances', route: '/adventure', anchor: 'scene-3', icon: Route, keywords: 'shrink trap dispel magic cellar door dc 13' },
        { title: 'Scene 4 — The Cellar & The Stairs', subtitle: 'Bora bugs, Emerson', route: '/adventure', anchor: 'scene-4', icon: Route, keywords: 'cellar stairs emerson cat bora bug climb dc 14' },
        { title: 'Scene 5 — The Workshop Floor', subtitle: 'Pixies, table, fly rat', route: '/adventure', anchor: 'scene-5', icon: Route, keywords: 'hallway bookcase pixies tina meena tabitha cauldron venus fly rat' },
        { title: 'Scene 6 — Conclusion', subtitle: 'Escape, hooks, rewards', route: '/adventure', anchor: 'scene-6', icon: Route, keywords: 'escape rewards hooks letter mrs linfrey' },
      ],
    },
    {
      heading: 'Quick Rules & Hazards',
      entries: [
        { title: 'Shrink Trap', subtitle: 'Tiny size on entry; doors re-lock', route: '/adventure', anchor: 'scene-3', icon: ShieldAlert, keywords: 'trap shrink tiny dispel magic' },
        { title: 'Book Avalanche', subtitle: 'DC 15 Strength save · 1d10, restrained', route: '/adventure', anchor: 'scene-5', icon: ShieldAlert, keywords: 'avalanche hallway prone restrained dc 15' },
        { title: 'Befriend Emerson', subtitle: 'DC 13 Charisma (Animal Handling)', route: '/adventure', anchor: 'scene-4', icon: Dices, keywords: 'cat treats knowledge potion dc 13' },
        { title: 'Climb the Work Table', subtitle: 'DC 14 Strength (Athletics)', route: '/adventure', anchor: 'scene-5', icon: Dices, keywords: 'table legs climb dc 14 athletics' },
      ],
    },
    {
      heading: 'Creatures',
      entries: [
        { title: 'Giant Bora Bug', subtitle: 'AC 12 · HP 22 · Spike Flurry DC 12 Dex', route: '/bestiary', icon: PawPrint, keywords: 'beetle horn strike bioluminescent stairs' },
        { title: 'Giant Pixie', subtitle: 'AC 14 · HP 22 · Spell save DC 13', route: '/bestiary', icon: PawPrint, keywords: 'tina meena confusion sleep entangle magic resistance' },
        { title: 'Giant Venus Fly Rat', subtitle: 'AC 14 · HP 34 · Pollen Burst DC 11 Wis', route: '/bestiary', icon: PawPrint, keywords: 'snap jaw grapple tail strike confusion table' },
      ],
    },
    {
      heading: 'Reference Pages',
      entries: [
        { title: 'Home', route: '/', icon: HomeIcon },
        { title: 'Adventure Flow', subtitle: 'Run the session scene by scene', route: '/adventure', icon: Route, keywords: 'walkthrough run dm guide' },
        { title: 'Overview', route: '/overview', icon: ScrollText, keywords: 'summary premise' },
        { title: 'Okiri Village', route: '/okiri', icon: TreePine, keywords: 'setting lore' },
        { title: 'NPCs', subtitle: 'Lomi, Miss Lindley, Emerson, pixies', route: '/npcs', icon: Users, keywords: 'characters tabitha ashi' },
        { title: 'Workshop', route: '/workshop', icon: HomeIcon, keywords: 'rooms map' },
        { title: 'Locations', route: '/locations', icon: Map, keywords: 'cellar hallway table' },
        { title: 'Encounters', route: '/encounters', icon: Sword, keywords: 'combat' },
        { title: 'Bestiary', route: '/bestiary', icon: PawPrint, keywords: 'monsters stat blocks' },
        { title: 'Potions', route: '/potions', icon: FlaskConical, keywords: 'candlecap heroism cats eye merriment' },
        { title: 'Conclusion', route: '/conclusion', icon: BookOpen, keywords: 'ending hooks' },
        { title: 'Subclasses', route: '/subclasses', icon: Sparkles, keywords: 'player options class' },
        { title: 'Feats & Conditions', route: '/feats', icon: Shield, keywords: 'player options' },
        { title: 'Backgrounds & Gear', route: '/gear', icon: Backpack, keywords: 'player options equipment' },
      ],
    },
  ],
  routes: [
    { path: '/adventure', element: ObojimaAdventureFlow },
    { path: '/overview', element: ObojimaOverview },
    { path: '/okiri', element: ObojimaOkiri },
    { path: '/npcs', element: ObojimaNPCs },
    { path: '/workshop', element: ObojimaWorkshop },
    { path: '/locations', element: ObojimaLocations },
    { path: '/encounters', element: ObojimaEncounters },
    { path: '/bestiary', element: ObojimaBestiary },
    { path: '/potions', element: ObojimaPotions },
    { path: '/conclusion', element: ObojimaConclusion },
    { path: '/subclasses', element: ObojimaSubclasses },
    { path: '/feats', element: ObojimaFeats },
    { path: '/gear', element: ObojimaGear },
  ],
};

/* ================================================================== */
/*  MURKMIRE — The Murkmire Malevolence                                */
/* ================================================================== */

const murkmire: AdventureConfig = {
  id: 'murkmire',
  shortName: 'Murkmire',
  navTitle: 'The Murkmire Malevolence',
  heroTitle: 'THE MURKMIRE MALEVOLENCE',
  heroTagline: 'A Golden Vault Heist · A DM’s Companion',
  heroImagePosition: 'center',
  footerTitle: 'The Murkmire Malevolence',
  footerSubtitle: 'Keys from the Golden Vault · A Digital Companion for Dungeon Masters',
  infoItems: [
    { icon: Users, label: '2–5 Players' },
    { icon: Shield, label: '1st Level' },
    { icon: Landmark, label: 'Varkenbluff' },
    { icon: KeyRound, label: '~3–4 Hours' },
  ],
  summary: {
    eyebrow: 'THE JOB',
    title: 'One Night. One Meteorite.',
    paragraphs: [
      'A mysterious patron — the Golden Vault — recruits the party for a heist with a conscience. A fallen meteorite called the Murkmire Malevolence sits on display in the Vermeulen-Voss Museum of Natural History, and its slow leak of necrotic energy is stirring the museum’s taxidermy collection to twitching, hungry life.',
      'The crew has one night to break in, slip past guards and wards, lift the stone before it wakes the whole gallery, and vanish into the fog of Varkenbluff — ideally without ever drawing a blade. How they get in, and how they get out, is entirely up to them.',
    ],
    ctaLabel: 'Plan the Heist →',
    ctaRoute: '/adventure',
  },
  portalsEyebrow: 'QUICK ACCESS',
  portalsTitle: 'Case the Job',
  portals: [
    { route: '/adventure', label: 'Heist Flow', icon: Route, accent: '#C9A84C', description: 'Beat-by-beat DM guide from briefing to getaway' },
    { route: '/overview', label: 'Overview', icon: ScrollText, accent: '#6FB3A0', description: 'Premise, the Malevolence, and the stakes' },
    { route: '/briefing', label: 'The Briefing', icon: KeyRound, accent: '#C9A84C', description: 'The Golden Vault, the puzzle box, and intel' },
    { route: '/npcs', label: 'Characters', icon: Users, accent: '#6FB3A0', description: 'The patron, the curator, guards, and a doll' },
    { route: '/museum', label: 'The Museum', icon: Landmark, accent: '#6B7FA0', description: 'Floor-by-floor guide to Vermeulen-Voss' },
    { route: '/encounters', label: 'Encounters', icon: Sword, accent: '#8B3A3A', description: 'Alarms, patrols, and animated exhibits' },
    { route: '/bestiary', label: 'Bestiary', icon: Skull, accent: '#3E7C6A', description: 'Animated taxidermy stat blocks' },
    { route: '/conclusion', label: 'Getaway', icon: Gem, accent: '#C9A84C', description: 'Payouts, complications, and follow-up jobs' },
  ],
  theme: {
    accent: '#3E7C6A',
    accentLight: '#6FB3A0',
    infoBarBg: 'rgba(62,124,106,0.16)',
    infoBarBorder: 'rgba(111,179,160,0.22)',
  },
  navLinks: [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/adventure', label: 'Heist Flow', icon: Route },
    { path: '/overview', label: 'Overview', icon: ScrollText },
    { path: '/briefing', label: 'Briefing', icon: KeyRound },
    { path: '/npcs', label: 'NPCs', icon: Users },
    { path: '/museum', label: 'Museum', icon: Landmark },
    { path: '/encounters', label: 'Encounters', icon: Sword },
    { path: '/bestiary', label: 'Bestiary', icon: Skull },
    { path: '/conclusion', label: 'Getaway', icon: Gem },
  ],
  searchGroups: [
    {
      heading: 'Heist Beats',
      entries: [
        { title: 'Beat 1 — The Briefing', subtitle: 'Golden Vault, puzzle box', route: '/adventure', anchor: 'scene-1', icon: Route, keywords: 'patron intel puzzle box reward varkenbluff' },
        { title: 'Beat 2 — Casing Varkenbluff', subtitle: 'Recon, the foggy town', route: '/adventure', anchor: 'scene-2', icon: Route, keywords: 'scout museum guards schedule rumors' },
        { title: 'Beat 3 — Breaking In', subtitle: 'Rooftop, sewer, front door', route: '/adventure', anchor: 'scene-3', icon: Route, keywords: 'entrance skylight lock dc 13 stealth' },
        { title: 'Beat 4 — The Galleries', subtitle: 'Patrols, wards, the curator', route: '/adventure', anchor: 'scene-4', icon: Route, keywords: 'taxidermy guard arkin doll alarm' },
        { title: 'Beat 5 — The Malevolence', subtitle: 'The meteorite wakes the dead', route: '/adventure', anchor: 'scene-5', icon: Route, keywords: 'meteorite necrotic animate owlbear escape' },
        { title: 'Beat 6 — The Getaway', subtitle: 'Escape, payout, fallout', route: '/adventure', anchor: 'scene-6', icon: Route, keywords: 'escape reward complications follow up' },
      ],
    },
    {
      heading: 'Quick Rules & Hazards',
      entries: [
        { title: 'The Alarm Bell', subtitle: 'Raises the guard; clock starts', route: '/encounters', icon: ShieldAlert, keywords: 'alarm tripwire bell guards reinforcements' },
        { title: 'Necrotic Pulse', subtitle: 'Meteorite animates nearby corpses', route: '/encounters', icon: ShieldAlert, keywords: 'meteorite radius animate taxidermy round' },
        { title: 'Pick the Service Door', subtitle: 'DC 13 Dexterity (Thieves’ Tools)', route: '/museum', icon: Dices, keywords: 'lock pick entrance dc 13' },
        { title: 'Slip the Patrol', subtitle: 'DC 13 Dexterity (Stealth)', route: '/encounters', icon: Dices, keywords: 'guard patrol sneak hide dc 13' },
      ],
    },
    {
      heading: 'Creatures',
      entries: [
        { title: 'Animated Taxidermy Wolf', subtitle: 'AC 12 · HP 19 · Pack tactics', route: '/bestiary', icon: Skull, keywords: 'stuffed wolf necrotic construct bite' },
        { title: 'Stuffed Owlbear Trophy', subtitle: 'AC 13 · HP 45 · Multiattack', route: '/bestiary', icon: Skull, keywords: 'owlbear taxidermy centerpiece beak claws' },
        { title: 'Specimen-Jar Swarm', subtitle: 'AC 12 · HP 22 · Necrotic swarm', route: '/bestiary', icon: Skull, keywords: 'preserved insects swarm jar formaldehyde' },
      ],
    },
    {
      heading: 'Reference Pages',
      entries: [
        { title: 'Home', route: '/', icon: HomeIcon },
        { title: 'Heist Flow', subtitle: 'Run the job beat by beat', route: '/adventure', icon: Route, keywords: 'walkthrough run dm guide' },
        { title: 'Overview', route: '/overview', icon: ScrollText, keywords: 'summary premise meteorite' },
        { title: 'The Briefing', route: '/briefing', icon: KeyRound, keywords: 'golden vault patron intel reward' },
        { title: 'NPCs', subtitle: 'The patron, Curator Arkin, guards', route: '/npcs', icon: Users, keywords: 'characters doll guard' },
        { title: 'The Museum', route: '/museum', icon: Landmark, keywords: 'vermeulen voss galleries floors' },
        { title: 'Encounters', route: '/encounters', icon: Sword, keywords: 'combat alarm patrol' },
        { title: 'Bestiary', route: '/bestiary', icon: Skull, keywords: 'monsters stat blocks taxidermy' },
        { title: 'Getaway', route: '/conclusion', icon: Gem, keywords: 'ending reward complications' },
      ],
    },
  ],
  routes: [
    { path: '/adventure', element: MurkmireAdventureFlow },
    { path: '/overview', element: MurkmireOverview },
    { path: '/briefing', element: MurkmireBriefing },
    { path: '/npcs', element: MurkmireNPCs },
    { path: '/museum', element: MurkmireMuseum },
    { path: '/encounters', element: MurkmireEncounters },
    { path: '/bestiary', element: MurkmireBestiary },
    { path: '/conclusion', element: MurkmireConclusion },
  ],
};

/* ------------------------------------------------------------------ */

export const adventures: Record<AdventureId, AdventureConfig> = {
  obojima,
  murkmire,
};

/** Toggle order. */
export const adventureOrder: AdventureId[] = ['obojima', 'murkmire'];

export const DEFAULT_ADVENTURE: AdventureId = 'obojima';
