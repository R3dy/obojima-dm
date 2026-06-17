import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Route,
  Home,
  ScrollText,
  Users,
  TreePine,
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
} from 'lucide-react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';

/** Public event other components (e.g. the navbar button) can dispatch to open search. */
export const OPEN_SEARCH_EVENT = 'open-command-palette';

interface Entry {
  title: string;
  subtitle?: string;
  /** Extra terms (DCs, synonyms) folded into the searchable value. */
  keywords?: string;
  route: string;
  anchor?: string;
  icon: React.ElementType;
}

const groups: { heading: string; entries: Entry[] }[] = [
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
      { title: 'Cauldron Effects (d6)', subtitle: 'Funny / Feather Fall / Pillar of Force', route: '/adventure', anchor: 'scene-5', icon: FlaskConical, keywords: 'cauldron roll d6 harness wind touch of nature' },
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
      { title: 'Home', route: '/', icon: Home },
      { title: 'Adventure Flow', subtitle: 'Run the session scene by scene', route: '/adventure', icon: Route, keywords: 'walkthrough run dm guide' },
      { title: 'Overview', route: '/overview', icon: ScrollText, keywords: 'summary premise' },
      { title: 'Okiri Village', route: '/okiri', icon: TreePine, keywords: 'setting lore' },
      { title: 'NPCs', subtitle: 'Lomi, Miss Lindley, Emerson, pixies', route: '/npcs', icon: Users, keywords: 'characters tabitha ashi' },
      { title: 'Workshop', route: '/workshop', icon: Home, keywords: 'rooms map' },
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
];

export default function SearchPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_SEARCH_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpen);
    };
  }, []);

  const go = useCallback(
    (entry: Entry) => {
      setOpen(false);
      navigate(entry.route);
      if (entry.anchor) {
        // Allow the (possibly lazy-loaded) page to mount before scrolling.
        window.setTimeout(() => {
          document.getElementById(entry.anchor!)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 350);
      }
    },
    [navigate],
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Search" description="Jump to any scene, rule, creature, or page">
      <CommandInput placeholder="Search scenes, DCs, creatures, pages…" />
      <CommandList>
        <CommandEmpty>No matches in the workshop.</CommandEmpty>
        {groups.map((group) => (
          <CommandGroup key={group.heading} heading={group.heading}>
            {group.entries.map((entry) => {
              const Icon = entry.icon;
              return (
                <CommandItem
                  key={`${group.heading}:${entry.title}`}
                  value={`${entry.title} ${entry.subtitle ?? ''} ${entry.keywords ?? ''}`}
                  onSelect={() => go(entry)}
                  className="gap-3"
                >
                  <Icon className="size-4 shrink-0 text-copper" />
                  <span className="flex flex-col">
                    <span className="text-parchment">{entry.title}</span>
                    {entry.subtitle && (
                      <span className="text-xs text-parchment/50">{entry.subtitle}</span>
                    )}
                  </span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
