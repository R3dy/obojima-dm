# Murkmire — maps, handouts & art

The Murkmire pages render images from this folder automatically. Until a file
exists, its slot shows a themed placeholder naming the file to drop in. Add a
`.jpg`/`.png` (an optional `.webp` sibling will be preferred if present), then
rebuild — no code changes needed.

## Drop-in files

Save each asset with the exact filename below.

| File | Used on | Slot |
| --- | --- | --- |
| `map_museum_dm.jpg` | Museum | Official DM map (labelled, gridded) |
| `map_museum_player.jpg` | Museum | Official player map (no labels) |
| `handout_recon_map.jpg` | Museum | Player handout — the crew's hand-drawn recon map |
| `scene_gala.jpg` | Museum | Scene art — the exhibition gala / stone on display |
| `portrait_curator.jpg` | NPCs | Curator portrait (featured NPC panel) |
| `handout_golden_vault_briefing.jpg` | Briefing | Optional player briefing card |

### Mapping for the images supplied in chat

- Frightened scholar holding books → **`portrait_curator.jpg`**
- "Varkenbluff Museum of Natural History" with room labels + grid → **`map_museum_dm.jpg`**
- The same museum map without labels/grid → **`map_museum_player.jpg`**
- The hand-drawn "Doctor Dannell" floorplan → **`handout_recon_map.jpg`**
- The ballroom/gala scene with the green stone on a pedestal → **`scene_gala.jpg`**

> These are official *Keys from the Golden Vault* assets. They are **not bundled**
> in the repo — add the copies you have the right to use (e.g. from your own
> D&D Beyond / book purchase) for personal use at your table.

## Built-in schematics (already included)

These ship with the app and render with no download — original, schematic
floorplans drawn as SVGs:

- `map_museum_ground_floor.svg`
- `map_museum_upper_gallery.svg`
- `map_museum_basement.svg`

## Adding more slots

Wire any new image with `<Figure src="/murkmire/your_file.jpg" … />` in any
Murkmire page — see `src/pages/murkmire/Figure.tsx`.
