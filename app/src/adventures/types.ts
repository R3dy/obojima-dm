import type { LazyExoticComponent, ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';

/** Every adventure bundled into the companion is keyed by a stable id. */
export type AdventureId = 'obojima' | 'murkmire';

export interface NavLink {
  path: string;
  label: string;
  icon: LucideIcon;
}

export interface PortalDef {
  route: string;
  label: string;
  icon: LucideIcon;
  accent: string;
  description: string;
}

export interface InfoItem {
  icon: LucideIcon;
  label: string;
}

export interface SearchEntry {
  title: string;
  subtitle?: string;
  /** Extra terms (DCs, synonyms) folded into the searchable value. */
  keywords?: string;
  route: string;
  anchor?: string;
  icon: LucideIcon;
}

export interface SearchGroup {
  heading: string;
  entries: SearchEntry[];
}

/** Colours that re-skin the shared chrome (navbar, home, footer) per adventure. */
export interface AdventureTheme {
  accent: string;
  accentLight: string;
  /** Soft tint used behind the home info bar. */
  infoBarBg: string;
  infoBarBorder: string;
}

export interface AdventureRoute {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element: LazyExoticComponent<ComponentType<any>>;
}

export interface AdventureConfig {
  id: AdventureId;
  /** Label shown on the adventure toggle. */
  shortName: string;
  /** Brand text in the navbar. */
  navTitle: string;
  /** Large hero title on the home page. */
  heroTitle: string;
  heroTagline: string;
  /** Optional cover image for the hero; falls back to a themed gradient. */
  heroImage?: string;
  heroImagePosition?: string;
  footerTitle: string;
  footerSubtitle: string;
  infoItems: InfoItem[];
  summary: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    ctaLabel: string;
    ctaRoute: string;
  };
  portalsEyebrow: string;
  portalsTitle: string;
  portals: PortalDef[];
  playerOptions?: {
    eyebrow: string;
    title: string;
    blurb: string;
    links: NavLink[];
    portals: PortalDef[];
  };
  theme: AdventureTheme;
  navLinks: NavLink[];
  searchGroups: SearchGroup[];
  routes: AdventureRoute[];
}
