import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, MessageCircle, MapPin } from 'lucide-react';
import { ReadAloud, SkillCheck, DMSecret } from '../../components/DMCallouts';
import OptImage from '../../components/OptImage';

const ACCENT = '#3E7C6A';
const ACCENT_LIGHT = '#6FB3A0';
const GOLD = '#C9A84C';

interface NPC {
  id: string;
  name: string;
  role: string;
  description: string;
  traits: string[];
  location: string;
}

const npcs: NPC[] = [
  {
    id: 'arkin',
    name: 'Alda Arkin',
    role: 'Museum Curator · Antagonist',
    description:
      'The museum’s curator (neutral evil elf noble), a retired university professor who keeps the museum’s close ties to Varkenbluff University. She assumes the characters are wealthy donors and chitchats happily — until Dr. Dannell is mentioned, whom she despises for her occult interests. She is unarmed and unarmored at the gala. She is secretly the head of an illegal syndicate that fences stolen historical objects.',
    traits: [
      'Carries a fancy clutch behind her back: a map of the guards’ after-hours stations, a master key, and an alarm pass card',
      'Dismisses Dr. Dannell’s warnings out of hand and walks away',
      'Holds a master key to every locked door in the museum',
      'In an unsuccessful mission, she may steal the stone herself or block Dannell’s reinstatement',
    ],
    location: 'The opening gala (Gemstone Wing, area V13); her office is area V5',
  },
  {
    id: 'maryam',
    name: 'Maryam Bikram',
    role: 'Captain of Security',
    description:
      'A serious, by-the-book human guard (lawful neutral) and a veteran of the city watch — entry #12 on the Museum Guards table. She captains the museum’s security force. At the gala she stands at the entrance to the Gemstone Wing, admitting only properly dressed characters with tickets. After hours she is stationed at the entrance to the gala.',
    traits: [
      'Rigidly enforces the rules; turns away anyone without a ticket or formal dress',
      'Stationed at the gala entrance during and after the event',
      'A noisy fight summons 1d4 more guards each round until all are accounted for',
      'Caught or surrendered characters are hauled to the city watch headquarters',
    ],
    location: 'Entrance to the gala (Gemstone Wing)',
  },
  {
    id: 'marigold',
    name: 'Marigold, the Deadly Doll',
    role: 'Warded Sentinel',
    description:
      'A five-foot-tall vintage doll posed in an elaborate silk dress, its name sewn onto the hem, standing in the southeast corner of Curator Arkin’s office. After hours, Arkin enables the office’s defense: when any creature other than Alda enters, Marigold animates and attacks, fighting until destroyed. She uses the scarecrow stat block (see Bestiary).',
    traits: [
      'Looks like a harmless oversized collector’s doll until triggered',
      'Animates against anyone but Alda who enters the office',
      'Uses the scarecrow stat block; fights until destroyed',
      'A noisy fight may attract the guards patrolling area V1',
    ],
    location: 'The Curator’s Office (area V5)',
  },
  {
    id: 'guards',
    name: 'The Museum Guards',
    role: 'Obstacle · Twelve Strong',
    description:
      'Twelve guards (use the guard stat block) work the museum. During the gala they ignore well-behaved guests; after hours they patrol fixed posts. They’d rather escort or eject a troublemaker than fight — but a public incident or a restricted-area sighting brings one over, and a real fight brings 1d4 more each round. Each carries a key to their station’s doors and a pass card that bypasses alarms. Roll on the Museum Guards table below for personalities.',
    traits: [
      'During the gala, ignore the party unless they enter a restricted area or cause a scene',
      'A DC 10 Charisma (Deception, Intimidation, or Persuasion) check can wave one off before it shouts for backup',
      'After hours, each guard carries a station key and an alarm pass card (DC 14 Sleight of Hand to lift either while hidden)',
      'Incapacitated or surrendered characters are taken to the city watch; if all are caught, the mission fails',
    ],
    location: 'On patrol throughout the museum (see Guard Locations After Hours)',
  },
  {
    id: 'attendees',
    name: 'Gala Attendees',
    role: 'Background · Twenty Nobles',
    description:
      'Twenty unarmed, unarmored nobles in elaborate finery mingle at the gala, most of them long-time museum donors. They know nothing about the Murkmire Stone beyond its discovery — but a little charm loosens tongues. Roll on the Gala Attendees table for who the party meets.',
    traits: [
      'A successful DC 12 Charisma (Persuasion) check yields one random piece of Museum Gossip',
      'Gossip can hint at the basement’s gem stash, Arkin’s nervous clutch, hidden displays, or her giant doll',
      'Provide cover and crowd for the party to work the room',
    ],
    location: 'The opening gala (Gemstone Wing, area V13)',
  },
];

const guardTable: [string, string][] = [
  ['1', 'Darrison Blackwaters (neutral human), a former soldier who takes everything literally'],
  ['2', 'Franceena Van Lictor (neutral good elf), a sarcastic newbie who respects history'],
  ['3', 'Billie Quartermile (lawful neutral halfling), who loves policy and procedure'],
  ['4', 'Milanova Wumplestocking (lawful good gnome), very serious but loves a good pun'],
  ['5', 'Garent Millaneff (neutral evil human), a bully who loves money and bragging rights'],
  ['6', 'Violet Pendergilt (neutral good human), a wistful dreamer who plans to quit soon'],
  ['7', 'Sureth Dhanvhal (neutral human), a reserve soldier always pressed for time'],
  ['8', 'Brendara Valindril (lawful neutral elf), a graduate student in history'],
  ['9', 'Grendor Battleaxe (neutral good dwarf), a wanderer paying off a debt to the museum'],
  ['10', 'Clark Jonathan Vanth (lawful good human), young and naive'],
  ['11', 'Sareena Shu (chaotic neutral tiefling), an overeager lover of history'],
  ['12', 'Maryam Bikram (lawful neutral human), a city watch veteran who enforces the rules'],
];

const attendeeTable: [string, string][] = [
  ['1', 'Captain Frankheim Walters (chaotic neutral human), who never served but implies he did'],
  ['2', 'Georgina Lucina Vandylarahal (neutral evil elf), a sneering heir to a mining fortune'],
  ['3', 'Countess Helene Danforth (neutral good human), titled but with little actual wealth'],
  ['4', 'Dr. Horthnar Stonecrusher (lawful good dwarf), a surgeon who loves natural history'],
];

const gossipTable: [string, string][] = [
  ['1', 'The curator has fidgeted with her clutch all night — bad news? Maybe she’s about to fire someone.'],
  ['2', 'Sometimes the museum hides displays in the basement at night — she must fear her own guards stealing them.'],
  ['3', 'A fortune in ore and gem samples is kept in the basement; a shame they don’t sell it.'],
  ['4', 'The curator adores oversized vintage dolls — she keeps one as big as a grown human in her office.'],
];

function DannellPortrait({ name }: { name: string }) {
  const [errored, setErrored] = useState(false);
  return (
    <div
      className="md:col-span-1 relative flex items-end overflow-hidden"
      style={{ minHeight: '320px', background: `radial-gradient(120% 120% at 50% 20%, ${ACCENT}40 0%, #12100D 70%)` }}
    >
      {errored ? (
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <Users size={120} color={ACCENT_LIGHT} strokeWidth={1} />
        </div>
      ) : (
        <OptImage
          src="/murkmire/portrait_dannell.webp"
          alt={`${name}, the anthropologist who hires the party`}
          onError={() => setErrored(true)}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
      )}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(18,16,13,0) 45%, rgba(18,16,13,0.92) 100%)' }} />
      <div className="relative p-6">
        <span className="text-label text-[0.65rem] tracking-[0.12em] uppercase" style={{ color: ACCENT_LIGHT }}>Quest Giver</span>
        <h2 className="text-display-md text-parchment mt-1">{name}</h2>
      </div>
    </div>
  );
}

function RefTable({ title, columns, rows, accent }: { title: string; columns: [string, string]; rows: [string, string][]; accent: string }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #16241F 0%, #12100D 100%)', border: `1px solid ${ACCENT}26` }}>
      <div className="px-5 py-3 border-b" style={{ borderColor: `${accent}33` }}>
        <span className="text-label text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: accent }}>{title}</span>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 text-stat text-[0.7rem] w-12" style={{ color: ACCENT_LIGHT }}>{columns[0]}</th>
            <th className="px-4 py-2 text-stat text-[0.7rem]" style={{ color: ACCENT_LIGHT }}>{columns[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k} className="border-t" style={{ borderColor: 'rgba(245,240,230,0.06)' }}>
              <td className="px-4 py-2 text-stat text-[0.8rem] align-top" style={{ color: GOLD }}>{k}</td>
              <td className="px-4 py-2 font-body text-[0.85rem] leading-snug" style={{ color: 'rgba(245,240,230,0.78)' }}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

export default function NPCs() {
  const featured = {
    name: 'Dr. Cassee Dannell',
    traits: [
      'Neutral good human commoner with an Intelligence score of 18',
      'A secret occult scholar who hid her interest to build an anthropology career',
      'Fired and disavowed by the university after her own failed theft',
      'Waits in the alley between the museum and the Sage’s Quill to take the egg',
      'Seals the stone in her crystal box to neutralize it — and pays the reward',
    ],
    blurb:
      'A brilliant Varkenbluff University anthropologist who long ago learned to hide her interest in the occult. On a Murkmire dig she recognized the light-green “stone” as an eldritch creature’s egg. When the university dismissed her warnings as pseudoscience and the museum bought the egg, she tried to steal it herself, was caught, and was fired. With hours left before it hatches at midnight, she turns to the characters.',
    location: 'The Sage’s Quill, then the alley beside the museum',
  };

  return (
    <div className="min-h-[100dvh] pt-16">
      {/* HERO */}
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users size={22} color={ACCENT} />
              <span className="text-label tracking-[0.12em]" style={{ color: ACCENT_LIGHT }}>CHARACTERS</span>
            </div>
            <h1 className="text-display-md text-parchment">Faces of the Heist</h1>
            <p className="font-body text-[1.05rem] mt-4 max-w-[640px] mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
              The anthropologist who hires the crew, the curator who stands in their way, and the guards, guests,
              and guardian doll between them and the egg.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURED — DR. DANNELL */}
      <section className="px-4 pb-8">
        <div className="max-w-container mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #16241F 0%, #12100D 100%)', border: `1px solid ${ACCENT}33` }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <DannellPortrait name={featured.name} />

              <div className="md:col-span-2 p-6 sm:p-8">
                <motion.div variants={itemVariants}>
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle size={16} color={ACCENT} />
                    <span className="text-label text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: ACCENT_LIGHT }}>Background</span>
                  </div>
                  <p className="font-body text-[1rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.85)' }}>{featured.blurb}</p>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart size={16} color={ACCENT} />
                    <span className="text-label text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: ACCENT_LIGHT }}>Traits</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {featured.traits.map((trait, idx) => (
                      <li key={idx} className="flex items-start gap-2 font-body text-[0.9rem]" style={{ color: 'rgba(245,240,230,0.7)' }}>
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: ACCENT }} />
                        {trait}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} color={ACCENT} />
                    <span className="text-label text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: ACCENT_LIGHT }}>Location</span>
                  </div>
                  <p className="font-body text-[0.95rem]" style={{ color: 'rgba(245,240,230,0.7)' }}>{featured.location}</p>
                </motion.div>
              </div>
            </div>

            <div className="p-6 sm:p-8 border-t" style={{ borderColor: `${ACCENT}26` }}>
              <ReadAloud title="What Dr. Dannell Knows">
                &ldquo;You need to reconnoiter the museum, steal the Murkmire Stone at an opportune time, and bring it
                to me — I&rsquo;ll wait in the alley. The egg can&rsquo;t be damaged or destroyed; unearthing it only
                woke the thing inside. The one way to stop it now is to seal it in crystal. I&rsquo;ve made a box, but
                I still have cracks to close, so it must stay with me. Whatever hatches from that egg will be
                extremely dangerous.&rdquo;
              </ReadAloud>

              <SkillCheck
                dc="DC 13 Charisma (Persuasion) — Negotiate the Pay"
                pass="Dr. Dannell raises her offer from 20 to 30 gp per character, on top of her bag of holding."
                fail="She holds firm at her bag of holding plus 20 gp per character."
              />

              <DMSecret heading="Dr. Dannell Is the Heart of the Job">
                Everything the crew needs flows from her: gala tickets, formal attire, the loan of her bag of
                holding, and her hand-drawn (incomplete) map. She is genuinely good and genuinely desperate. If the
                stone is delivered before midnight, she seals it in her crystal box, neutralizing it instantly, and
                may later ask the party to help her reclaim her university post (see Getaway).
              </DMSecret>
            </div>
          </motion.div>
        </div>
      </section>

      {/* REMAINING NPCs */}
      <section className="px-4 pb-8">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {npcs.map((npc, i) => (
              <motion.div
                key={npc.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl p-6"
                style={{ background: 'linear-gradient(135deg, #16241F 0%, #12100D 100%)', border: `1px solid ${ACCENT}1F` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-label text-[0.65rem] tracking-[0.12em] uppercase" style={{ color: npc.id === 'arkin' ? '#C47171' : ACCENT_LIGHT }}>
                    {npc.role}
                  </span>
                </div>
                <h3 className="text-heading-lg text-parchment mb-3">{npc.name}</h3>
                <p className="font-body text-[0.95rem] leading-relaxed mb-4" style={{ color: 'rgba(245,240,230,0.75)' }}>{npc.description}</p>
                <div className="space-y-1.5 mb-4">
                  {npc.traits.map((trait, idx) => (
                    <div key={idx} className="flex items-start gap-2 font-body text-[0.85rem]" style={{ color: 'rgba(245,240,230,0.6)' }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: ACCENT }} />
                      {trait}
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t" style={{ borderColor: `${ACCENT}1A` }}>
                  <span className="text-stat text-[0.75rem]" style={{ color: 'rgba(245,240,230,0.45)' }}>📍 {npc.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REFERENCE TABLES */}
      <section className="px-4 pb-24">
        <div className="max-w-container mx-auto space-y-6">
          <RefTable title="Museum Guards (d12)" columns={['d12', 'Guard']} rows={guardTable} accent={ACCENT_LIGHT} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RefTable title="Gala Attendees (d4)" columns={['d4', 'Attendee']} rows={attendeeTable} accent="#6B7FA0" />
            <RefTable title="Museum Gossip (d4)" columns={['d4', 'Juicy Tidbit']} rows={gossipTable} accent={GOLD} />
          </div>
        </div>
      </section>
    </div>
  );
}
