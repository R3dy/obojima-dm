# Murkmire — maps, handouts & art

The Murkmire pages render images from this folder automatically. Until a file
exists, its slot shows a themed placeholder naming the file to drop in.

## Included assets

These ship with the app and render with no download — official *Keys from the
Golden Vault: The Murkmire Malevolence* art and maps:

| File | Used on | Slot |
| --- | --- | --- |
| `map_museum_dm.webp` | Museum | Map 1.2 — DM's map of the Varkenbluff Museum (labelled V1–V17, gridded) |
| `map_museum_player.webp` | Museum | Map 1.2 — player version (no labels) |
| `handout_players_map.webp` | Museum / Briefing | Map 1.1 — Dr. Dannell's hand-drawn sketch (player handout) |
| `scene_gala.webp` | Museum / Overview | Scene art — the opening gala, Murkmire Stone on its pedestal |
| `portrait_dannell.webp` | NPCs / Briefing | Portrait of Dr. Cassee Dannell, the quest giver |

> These are official *Keys from the Golden Vault* assets. Keep copies you have
> the right to use (e.g. from your own D&D Beyond / book purchase) for personal
> use at your table.

## Adding more slots

Wire any new image with `<Figure src="/murkmire/your_file.webp" … />` in any
Murkmire page — see `src/pages/murkmire/Figure.tsx`. `OptImage` passes `.webp`
paths through untouched and serves a `.webp` sibling for any `.jpg`/`.png`.
