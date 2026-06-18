# Murkmire — maps & handouts

The Murkmire pages render images from this folder automatically. Until a file
exists, its slot shows a themed placeholder naming the file to drop in. Add a
`.jpg`/`.png` (an optional `.webp` sibling will be preferred if present), then
rebuild — no code changes needed.

## Expected files

| File | Used on | Slot |
| --- | --- | --- |
| `map_varkenbluff_town.jpg` | Museum | Town overview |
| `map_museum_exterior.jpg` | Museum | Exterior & approaches |
| `map_museum_first_floor.jpg` | Museum | Ground floor & galleries |
| `map_museum_upper_gallery.jpg` | Museum | Upper gallery / meteorite display |
| `map_museum_basement.jpg` | Museum | Sub-basement & service tunnel |
| `handout_malevolence_item.jpg` | Museum | The meteorite, as an item card |
| `handout_golden_vault_briefing.jpg` | Briefing | Player-facing briefing card |

(You can wire more slots by adding `<Figure src="/murkmire/your_file.jpg" … />`
in any Murkmire page — see `src/pages/murkmire/Figure.tsx`.)

## Where to get DM-friendly art

These are **not bundled** here: the official maps/handouts are copyrighted, and
the popular fan packs are free for personal use but not licensed for
redistribution in a public repo. Download what you have the right to use and
place the files here yourself:

- **Skankan's Map Market** (free fan pack — maps with/without grid + tokens):
  https://www.patreon.com/posts/murkmire-92788103
- **DM Dale Battlemaps — Varkenbluff Museum**:
  https://www.patreon.com/posts/varkenbluff-of-109131122
- **Official "Keys from the Golden Vault Map Pack 01" (paid)**:
  https://www.dmsguild.com/en/product/439746
- The original adventure (text, item art, handouts) is on D&D Beyond / 5e.tools
  if you own *Keys from the Golden Vault*.

> ⚠️ Only add assets you have the right to use. "Free to download" usually means
> free for personal use at your table — not free to redistribute. If you publish
> this site, prefer assets explicitly licensed for redistribution (CC0 / CC-BY
> with attribution) or art you commissioned/made yourself.
