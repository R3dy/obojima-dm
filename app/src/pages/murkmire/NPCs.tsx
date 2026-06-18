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
    id: 'patron',
    name: 'The Golden Vault',
    role: 'The Patron',
    description:
      'A secretive organization that hires capable operatives for heists that, in its judgment, serve the greater good. It contacts the crew through a brass puzzle box that projects a calm, hooded figure of golden light. It never reveals its members, its location, or its true reach — only the job, the terms, and the pay.',
    traits: [
      'Speaks in calm, economical sentences; deflects all questions about itself',
      'Rewards clean, bloodless jobs with a bonus',
      'Genuinely believes the meteorite is a danger to the town',
      'Pays promptly on delivery and remembers reliable crews',
    ],
    location: 'Everywhere and nowhere — reaches the crew through the puzzle box',
  },
  {
    id: 'night-guard',
    name: 'Museum Night Guard',
    role: 'Obstacle',
    description:
      'One or two tired watchmen walk the galleries after dark, lantern in hand, more bored than brave. They are ordinary people doing a dull job — the kind of obstacle a good crew slips past rather than cuts down. Their first instinct on spotting trouble is to run for the alarm bell, not to fight.',
    traits: [
      'Predictable, slow patrol loop through the halls',
      'Will shout for the watch and pull the alarm cord if alarmed',
      'Can be bribed, distracted, lured, or avoided entirely',
      'Killing one sours the job and forfeits the Golden Vault’s bonus',
    ],
    location: 'The galleries — on patrol',
  },
  {
    id: 'guardian-doll',
    name: 'The Guardian Doll',
    role: 'Warded Sentinel',
    description:
      'Curator Arkin keeps a small porcelain doll in her office, a charming antique that is anything but. Bound with a protective enchantment, it sits perfectly still until the wing is disturbed — then it animates to defend the curator and her records, raising the alarm in its thin, sing-song voice.',
    traits: [
      'Looks like a harmless collector’s doll until triggered',
      'Animates to protect the curator’s office and ledgers',
      'Can sound the alarm on its own',
      'Detect Magic or a careful eye reveals the binding before it strikes',
    ],
    location: 'The Curator’s Office',
  },
  {
    id: 'malevolence',
    name: 'The Murkmire Malevolence',
    role: 'The Prize & The Threat',
    description:
      'The meteorite itself — a cold, dark stone the size of a fist, threaded with veins that catch no light. It is not alive, but something clings to it: a slow necrotic field that strengthens nightly, seeping into anything dead nearby and teaching it to move again. It is both the objective and the adventure’s central hazard.',
    traits: [
      'Radiates an unnatural chill and a sense of wrongness',
      'Animates nearby dead specimens while exposed',
      'The pulse grows stronger the longer it sits in the museum',
      'Muffled by heavy cloth or a lead-lined case — a clever prep slows the wake',
    ],
    location: 'A glass display case, upper gallery',
  },
  {
    id: 'fence',
    name: 'A Local Contact',
    role: 'Optional Ally',
    description:
      'An optional friendly face in Varkenbluff — a dockside fence, a disgruntled museum porter, or a Golden Vault sympathizer who can sell the crew gear, a rumor, or a back way in. Use them to reward players who do their legwork during the casing phase.',
    traits: [
      'Trades information and small favors for coin or goodwill',
      'Knows at least one useful detail the official intel missed',
      'Nervous about the museum’s “new rock” and the rumors around it',
    ],
    location: 'The docks and taverns of Varkenbluff',
  },
];

function CuratorPortrait({ name }: { name: string }) {
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
          src="/murkmire/portrait_curator.webp"
          alt={`${name}, the museum curator`}
          onError={() => setErrored(true)}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
      )}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(18,16,13,0) 45%, rgba(18,16,13,0.92) 100%)' }} />
      <div className="relative p-6">
        <span className="text-label text-[0.65rem] tracking-[0.12em] uppercase" style={{ color: ACCENT_LIGHT }}>Museum Curator</span>
        <h2 className="text-display-md text-parchment mt-1">{name}</h2>
      </div>
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
    name: 'Alda Arkin',
    role: 'Museum Curator',
    blurb:
      'Alda Arkin runs the Vermeulen-Voss Museum with fierce, fussy devotion. She works late almost every night, cataloguing, restoring, and guarding her collection — including its dangerous new acquisition, whose true nature she does not fully grasp. She is no warrior, but she is clever, observant, and absolutely unwilling to let anyone harm her life’s work.',
    traits: [
      'Proud, meticulous, and protective of every specimen',
      'Works late in a warded office, a guardian doll at her side',
      'Underestimates the meteorite — to everyone’s peril',
      'Can be deceived, avoided, or (rarely) convinced the stone is dangerous',
      'Not a combatant — her defenses are wards, the doll, and the alarm',
    ],
    location: 'The Curator’s Office, Vermeulen-Voss Museum',
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
            <h1 className="text-display-md text-parchment">Faces of the Job</h1>
            <p className="font-body text-[1.05rem] mt-4 max-w-[640px] mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
              The patron who hires the crew, the curator who stands in their way, and the strange things that
              wake when the Malevolence stirs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURED — CURATOR ARKIN */}
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
              {/* Portrait panel — renders /murkmire/portrait_curator.jpg if present */}
              <CuratorPortrait name={featured.name} />

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
              <ReadAloud title="Meeting the Curator">
                A lamp burns late in the corner office. Inside, a slight woman in an ink-stained smock bends over
                a ledger, muttering to a row of glass-eyed specimens as if they were colleagues. On the shelf
                beside her sits a porcelain doll, prim and patient, its painted eyes following the doorway.
              </ReadAloud>

              <SkillCheck
                dc="DC 15 Charisma (Deception) — Talk Past Arkin"
                pass="She accepts a plausible cover (a late-working scholar, a hired inspector) long enough for the crew to move on."
                fail="She grows suspicious, reaches for the alarm, and the guardian doll begins to stir."
              />

              <DMSecret heading="Arkin Is Not a Villain">
                Played well, Arkin is sympathetic — a custodian who has no idea she is sitting on a curse. A crew
                that convinces her the stone is dangerous (hard, but possible) might walk out with her blessing
                instead of her alarm bell. Never force a fight with her; her defenses are the wards, the doll,
                and her ability to summon the watch.
              </DMSecret>
            </div>
          </motion.div>
        </div>
      </section>

      {/* REMAINING NPCs */}
      <section className="px-4 pb-24">
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
                  <span className="text-label text-[0.65rem] tracking-[0.12em] uppercase" style={{ color: npc.id === 'patron' || npc.id === 'malevolence' ? GOLD : ACCENT_LIGHT }}>
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
    </div>
  );
}
