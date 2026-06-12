# Plan V3: Chronological Adventure Flow Page

## Goal
Create a new "Adventure Flow" page that presents the entire adventure as a chronological, scene-by-scene DM guide. This is the primary page a DM uses while running the game.

## Scene Structure
1. **Scene 1: Arrival in Okiri Village** - Village atmosphere, context, tone
2. **Scene 2: Meet the Quest Giver** - Finding Lomi, his dilemma, negotiation
3. **Scene 3: Entering the Workshop** - Exterior, 3 entry methods, the shrink trap
4. **Scene 4: The Cellar** - Descending, shrink effect, searching, cat encounter, staircase
5. **Scene 5: The Workshop Floor** - Hallway, bookcase/pixies, getting on table, cauldron, fly rat
6. **Scene 6: Conclusion** - Restore size, retrieve letter, escape, continuation hooks

## Each Scene Contains
- Scene header with number and title
- ReadAloud component for boxed text
- DM-only guidance in DMSecret components
- SkillCheck components for all DCs
- TrapWarning for hazards
- Inline creature stat summaries
- Relevant maps displayed inline
- Navigation to next/previous scene

## Integration
- Add to Navbar as primary link (replace "Overview" prominence)
- Add to Home page as featured portal
- Wire route in App.tsx

## Build & Deploy
- Create page, wire routes, build, deploy
