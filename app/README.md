# The Curious World Within — Obojima DM Reference

A digital companion for **"The Curious World Within,"** a shrunken-heroes
adventure for *Obojima: Tales From The Tall Grass*. The party is shrunk to Tiny
size inside Miss Lindley's witch workshop and must recover a misdelivered letter
and a potion to restore their size.

This is a single-page React app that gives the Dungeon Master everything needed
to run the session: a scene-by-scene flow, NPCs, interactive battlemaps,
encounters, a bestiary, potions, and Obojima player options.

## Tech stack

- **React 19** + **TypeScript** + **Vite**
- **React Router** (browser routing)
- **Tailwind CSS** + **shadcn/ui** components
- **Framer Motion** + **GSAP** for animation (motion respects
  `prefers-reduced-motion`)

## Getting started

```bash
npm install
npm run dev      # start the dev server on http://localhost:3000
npm run build    # type-check and build to dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Project structure

```
src/
  components/        Navbar, Footer, Layout, shared UI (shadcn)
  pages/             One component per route
  hooks/             Custom hooks
  index.css          Global styles + theme tokens
  main.tsx           Entry point (BrowserRouter)
  App.tsx            Routes + page transitions
public/              Images served at the site root (maps, art, favicon)
```

### Routes

| Path | Page | Notes |
| --- | --- | --- |
| `/` | Home | Hero + navigation portals |
| `/adventure` | Adventure Flow | Scene-by-scene DM guide |
| `/overview` | Overview | Premise and narrative arc |
| `/okiri` | Okiri Village | Local lore, NPCs, hooks |
| `/npcs` | NPCs | The six key characters |
| `/workshop` | The Workshop | Exterior and entry points |
| `/locations` | Locations | Interactive battlemaps |
| `/encounters` | Encounters | Combat, social, and hazards |
| `/bestiary` | Bestiary | Creature stat blocks |
| `/potions` | Potions | Brews on the table |
| `/conclusion` | Conclusion | Endings and hooks |
| `/subclasses` | Subclasses | Player option |
| `/feats` | Feats & Conditions | Player option |
| `/gear` | Backgrounds & Gear | Player option |

## Deployment

Deployed on **Vercel**. Build configuration lives in `../vercel.json` at the
repository root:

- Build command: `cd app && npm install && npm run build`
- Output directory: `app/dist`
- A catch-all rewrite to `/index.html` supports client-side routing.

## Credits

*Obojima: Tales From The Tall Grass* is the work of its respective publisher.
This is a fan-made DM reference tool for running the adventure at the table.
