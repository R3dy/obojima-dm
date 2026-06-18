import { KeyRound, Eye, DoorOpen, Landmark, Skull, Gem, type LucideIcon } from 'lucide-react';

const ACCENT = '#3E7C6A';
const GOLD = '#C9A84C';

/* ------------------------------------------------------------------ */
/*  The heist, broken into six standalone sections.                    */
/*  Beat 1 lives on the Briefing page; Beat 6 on the Getaway page.     */
/* ------------------------------------------------------------------ */

export interface MurkmireSection {
  num: number;
  route: string;
  /** Full page title. */
  title: string;
  /** Short label for nav steppers and the run-of-show index. */
  navLabel: string;
  blurb: string;
  icon: LucideIcon;
  accent: string;
}

export const murkmireSections: MurkmireSection[] = [
  {
    num: 1,
    route: '/briefing',
    title: 'The Briefing',
    navLabel: 'The Briefing',
    icon: KeyRound,
    accent: GOLD,
    blurb: 'Meet Dr. Dannell at the Sage’s Quill — the job, the tickets, the tools, and the reward.',
  },
  {
    num: 2,
    route: '/gala',
    title: 'The Opening Gala',
    navLabel: 'The Gala',
    icon: Eye,
    accent: '#6B7FA0',
    blurb: 'Scout the museum under cover of the party, read the curator, and study the stone.',
  },
  {
    num: 3,
    route: '/infiltration',
    title: 'Into the Museum',
    navLabel: 'Into the Museum',
    icon: DoorOpen,
    accent: ACCENT,
    blurb: 'The museum closes at 8 p.m. and arms its defenses — hide inside or slip back in after hours.',
  },
  {
    num: 4,
    route: '/galleries',
    title: 'Through the Galleries',
    navLabel: 'The Galleries',
    icon: Landmark,
    accent: '#6B4C7A',
    blurb: 'Thread the after-hours patrols, alarms, and animated statues to reach the Gemstone Wing.',
  },
  {
    num: 5,
    route: '/the-stone',
    title: 'Taking the Stone',
    navLabel: 'Taking the Stone',
    icon: Skull,
    accent: '#8B3A3A',
    blurb: 'The rigged pedestal, the jade swap, the pulse — and what happens if it all goes loud.',
  },
  {
    num: 6,
    route: '/conclusion',
    title: 'The Getaway',
    navLabel: 'The Getaway',
    icon: Gem,
    accent: GOLD,
    blurb: 'Deliver the egg before midnight, collect the payout, and set up what comes next.',
  },
];

export const sectionByNum = (num: number) => murkmireSections.find((s) => s.num === num);
