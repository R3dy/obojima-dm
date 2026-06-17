import { motion } from 'framer-motion';
import { FlaskConical, Swords, Wrench, Sparkles, Flame, Dices, ScrollText } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  POTION DATA                                                        */
/* ------------------------------------------------------------------ */

interface PotionCategory {
  id: string;
  title: string;
  icon: typeof FlaskConical;
  accent: string;
  blurb: string;
  potions: { name: string; note: string }[];
}

const categories: PotionCategory[] = [
  {
    id: 'combat',
    title: 'Common Combat Potions',
    icon: Swords,
    accent: '#8B3A3A',
    blurb: 'Brews meant to give an edge in a fight.',
    potions: [
      { name: 'Candlecap', note: 'A combat brew on Miss Lindley\'s table.' },
      { name: 'Heroism', note: 'Bolsters the drinker for the battles ahead.' },
    ],
  },
  {
    id: 'utility',
    title: 'Common Utility Potions',
    icon: Wrench,
    accent: '#6B7FA0',
    blurb: 'Practical concoctions for exploration and problem-solving.',
    potions: [
      { name: 'Flip and Skip', note: 'A utility brew useful for traversal.' },
      { name: "Cat's Eye", note: 'Aids sight in the gloom of the workshop.' },
    ],
  },
  {
    id: 'whimsical',
    title: 'Common Whimsical Potions',
    icon: Sparkles,
    accent: '#6B4C7A',
    blurb: 'Playful, surprising elixirs — perfect for a lighthearted shrunken-heroes romp.',
    potions: [
      { name: 'Bubble Message', note: 'Send a message carried in a bubble.' },
      { name: 'Merriment', note: 'Spreads good cheer.' },
      { name: 'Melodious Bird Calls', note: 'Mimic the songs of birds.' },
      { name: 'Ladybug Kinship', note: 'Befriend the smallest of creatures.' },
      { name: 'Beard Brew', note: 'Grows a magnificent beard.' },
    ],
  },
];

/* The d6 effect table for the unidentified bubbling cauldron brew. */
const cauldronEffects = [
  {
    roll: '1',
    name: 'Everything is Funny',
    text: 'For the next hour the character can\'t stop laughing, taking disadvantage on rolls unless they pass a DC 13 Intelligence check to compose themselves.',
  },
  {
    roll: '2–4',
    name: 'Harness the Wind',
    text: 'Billowing gusts surround the character, usable like a feather fall spell to cushion a fall. Lasts 5 minutes.',
  },
  {
    roll: '5–6',
    name: 'Touch of Nature',
    text: 'Infused with the spirit of Obojima, the character can cast Pillar of Force once before the effect fades (spellcasting modifier is the higher of Intelligence, Wisdom, or Charisma).',
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Potions() {
  return (
    <div className="min-h-[100dvh] pt-16">
      {/* Hero header */}
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <FlaskConical size={22} color="#B87333" />
              <span className="text-label text-copper tracking-[0.12em]">POTIONS</span>
            </div>
            <h1 className="text-display-md text-parchment">Brews of the Workshop</h1>
            <p className="font-body text-[1.05rem] mt-4 max-w-[640px] mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
              Miss Lindley’s table is crowded with potions. Somewhere among
              them is the brew that will return the party to normal size — the
              key to the whole adventure.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="max-w-container-narrow mx-auto space-y-10">
          {/* The mystery brew / bubbling cauldron */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #2D2016 0%, #1E1610 100%)',
              border: '1px solid rgba(184,115,51,0.15)',
              borderTop: '3px solid #C9A84C',
            }}
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Flame size={18} color="#C9A84C" />
                <span className="text-label text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: '#C9A84C' }}>The Goal</span>
              </div>
              <h2 className="text-display-md text-parchment" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                The Restoring Potion
              </h2>
              <p className="font-body text-[0.95rem] leading-relaxed mt-3" style={{ color: 'rgba(245,240,230,0.78)' }}>
                The party must find and drink the correct potion to return to full
                size. The recipe for the <span className="text-copper-light">Elder Elixir</span> can be
                discovered in the cellar (ingredients: Spindle Leg Spider Webs, Origami
                Crane, and Brush Reed). Emerson the cat knows which brew on the table
                restores size, but he won’t share easily.
              </p>

              <div className="mt-5 rounded-xl p-4" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Dices size={15} color="#C9A84C" />
                  <span className="text-label text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: '#D4956A' }}>
                    Bubbling Cauldron — Mystery Brew (roll d6)
                  </span>
                </div>
                <p className="font-body text-[0.85rem] leading-relaxed mb-3" style={{ color: 'rgba(245,240,230,0.7)' }}>
                  If a character drinks from — or falls into — the cauldron of
                  ever-shifting brew, roll a d6 for the effect:
                </p>
                <div className="space-y-2.5">
                  {cauldronEffects.map((e) => (
                    <div key={e.roll} className="flex gap-3">
                      <span
                        className="text-stat text-sm shrink-0 w-12 text-center rounded-md py-1"
                        style={{ background: 'rgba(26,20,16,0.6)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)' }}
                      >
                        {e.roll}
                      </span>
                      <p className="font-body text-[0.85rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>
                        <span className="italic font-semibold text-parchment">{e.name}. </span>{e.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Potion categories */}
          <div>
            <h2 className="text-display-md text-parchment text-center mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Potions on the Table
            </h2>
            <p className="font-body text-[0.95rem] text-center mb-8 max-w-[560px] mx-auto" style={{ color: 'rgba(245,240,230,0.6)' }}>
              Nine common potions are scattered across Miss Lindley’s workspace,
              ready to be discovered, identified, and used.
            </p>

            <div className="space-y-6">
              {categories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    className="rounded-2xl p-6"
                    style={{
                      background: 'linear-gradient(135deg, #2D2016 0%, #1E1610 100%)',
                      border: '1px solid rgba(184,115,51,0.15)',
                      borderLeft: `3px solid ${cat.accent}`,
                    }}
                  >
                    <div className="flex items-center gap-2.5 mb-1">
                      <Icon size={18} color={cat.accent === '#6B7FA0' ? '#6B7FA0' : '#D4956A'} />
                      <h3 className="text-heading-lg text-parchment">{cat.title}</h3>
                    </div>
                    <p className="font-body text-[0.85rem] mb-4" style={{ color: 'rgba(245,240,230,0.6)' }}>{cat.blurb}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cat.potions.map((p) => (
                        <div
                          key={p.name}
                          className="rounded-lg p-3 flex items-start gap-3"
                          style={{ background: 'rgba(26,20,16,0.5)', border: '1px solid rgba(184,115,51,0.1)' }}
                        >
                          <FlaskConical size={16} color={cat.accent} className="shrink-0 mt-0.5" />
                          <div>
                            <p className="font-body text-[0.95rem] font-semibold text-parchment">{p.name}</p>
                            <p className="font-body text-[0.8rem] mt-0.5" style={{ color: 'rgba(245,240,230,0.55)' }}>{p.note}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Reference note */}
          <div className="rounded-xl p-5 flex gap-3" style={{ background: 'rgba(45,32,22,0.6)', border: '1px dashed rgba(184,115,51,0.4)' }}>
            <ScrollText size={18} color="#B87333" className="shrink-0 mt-0.5" />
            <p className="font-body text-[0.88rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.75)' }}>
              <span className="text-copper-light font-semibold">DM note: </span>
              Full recipes and mechanical effects for these named potions live in the
              <span className="italic"> Obojima: Tales From The Tall Grass</span> core rulebook. Use this
              page as a quick index of what the party can find on the table.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
