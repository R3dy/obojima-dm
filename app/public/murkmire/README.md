# Murkmire — maps, handouts & art

The Murkmire pages render images from this folder automatically. Each `<Figure>`
slot falls back to a themed placeholder (naming the expected file) if the asset
is missing, so the app never looks broken.

## Files in use

| File | Used on | Slot |
| --- | --- | --- |
| `map_museum_dm.webp` | Museum | Official DM map (labelled V1–V17, gridded) |
| `map_museum_player.webp` | Museum | Official player map (no labels) |
| `handout_recon_map.webp` | Briefing | Player handout — the crew's hand-drawn recon map |
| `scene_gala.webp` | Overview | Scene art — the exhibition gala / stone on display |
| `portrait_curator.webp` | NPCs | Curator portrait (featured NPC panel) |

These are official *Keys from the Golden Vault* assets, added by the repo owner
for personal use at the table.

## Built-in schematics (original, ship with the app)

Original schematic floorplans drawn as SVGs — always available, no download:

- `map_museum_ground_floor.svg`
- `map_museum_upper_gallery.svg`
- `map_museum_basement.svg`

## Adding or moving slots

Wire any image with `<Figure src="/murkmire/your_file.webp" … />` in any
Murkmire page — see `src/pages/murkmire/Figure.tsx`. A `.webp`/`.jpg`/`.png`
all work; if you use `.jpg`/`.png`, an optional `.webp` sibling is preferred
automatically.
