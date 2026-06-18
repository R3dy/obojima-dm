import { motion } from 'framer-motion';
import { Landmark, DoorOpen, Waves, Sparkles, Building2, FlaskConical, Gem, Map as MapIcon } from 'lucide-react';
import { SkillCheck } from '../../components/DMCallouts';
import Figure from './Figure';

const ACCENT = '#3E7C6A';
const ACCENT_LIGHT = '#6FB3A0';
const GOLD = '#C9A84C';

interface Area {
  id: string;
  name: string;
  tag: string;
  icon: React.ElementType;
  accent: string;
  description: string;
  features: string[];
  check?: { dc: number; skill: string; title: string; pass: string; fail: string };
}

const areas: Area[] = [
  {
    id: 'foyer',
    name: 'The Grand Foyer',
    tag: 'Entry · High Traffic',
    icon: Building2,
    accent: '#6B7FA0',
    description:
      'A marble hall under the great dome, ringed by ticket desks and a sweeping staircase. By night it is the most watched room in the building — and the worst place to be caught. The front doors open here.',
    features: [
      'Sweeping stair up to the gallery level',
      'A guard station with the alarm bell-pull',
      'Coat racks, signage, and a donation plinth for cover',
    ],
  },
  {
    id: 'hall-of-beasts',
    name: 'The Hall of Beasts',
    tag: 'Taxidermy · Cover & Danger',
    icon: Landmark,
    accent: ACCENT,
    description:
      'The museum’s pride: rank upon rank of mounted animals, dioramas, and glass display cases. Wonderful cover for a sneaking crew — and a powder keg once the Malevolence wakes, because every exhibit here is a potential monster.',
    features: [
      'Dense cover from mounts, plinths, and cases',
      'A mounted owlbear trophy as the centerpiece',
      'Patrol route threads the main aisle',
      'Closest gallery to the meteorite display',
    ],
    check: {
      dc: 13,
      skill: 'Dexterity (Stealth)',
      title: 'Move Through the Exhibits',
      pass: 'The crew uses the mounts as cover and crosses unseen.',
      fail: 'A bumped plinth or rattled case draws a guard to investigate.',
    },
  },
  {
    id: 'upper-gallery',
    name: 'Upper Gallery & The Display',
    tag: 'The Objective',
    icon: Gem,
    accent: GOLD,
    description:
      'Up beneath the dome, the museum’s curiosities sit in a ring of cases. At the center, alone on a velvet cradle under glass, rests the Murkmire Malevolence. The skylight overhead is the quietest way in — and straight out.',
    features: [
      'The meteorite’s display case is wired to the alarm',
      'The domed skylight opens directly above',
      'The chill and the “wrongness” are strongest here',
      'Lifting or forcing the stone begins the wake (see Heist Flow, Beat 5)',
    ],
    check: {
      dc: 15,
      skill: 'Dexterity (Thieves’ Tools) or Arcana',
      title: 'Open the Display Case',
      pass: 'The glass lifts silently and the alarm wire is bypassed — a clean lift.',
      fail: 'The case can still be forced, but it trips the alarm and spikes the necrotic pulse.',
    },
  },
  {
    id: 'curators-office',
    name: 'The Curator’s Office',
    tag: 'Warded · Optional',
    icon: Sparkles,
    accent: '#6B4C7A',
    description:
      'Curator Arkin’s lamp-lit sanctum, lined with ledgers and restoration tools. The wing is warded, and a guardian doll watches from the shelf. There’s nothing here the job requires — but acquisition records, keys, and the curator’s own knowledge of the stone reward the curious.',
    features: [
      'Arkin works here late most nights',
      'A protective ward and a guardian doll defend the room',
      'Ledgers reveal where the meteorite came from and who sold it',
      'A ring of keys opens display cases without picking them',
    ],
    check: {
      dc: 14,
      skill: 'Intelligence (Arcana) / Wisdom (Perception)',
      title: 'Spot the Ward & the Doll',
      pass: 'The crew notices the binding before it triggers and can disarm or avoid it.',
      fail: 'The first disturbance wakes the doll, which animates and reaches for the alarm.',
    },
  },
  {
    id: 'service-tunnel',
    name: 'The Service Tunnel & Sub-Basement',
    tag: 'Entry · Unguarded',
    icon: Waves,
    accent: '#3E4A5E',
    description:
      'A grated culvert at the riverbank drains a half-flooded sub-basement that smells of the Murkmire itself. No guards come down here — but it’s dark, cold, and unsettlingly close to the storeroom, where small specimens already twitch in their jars.',
    features: [
      'Waterline grate can be pried or picked open',
      'Cold, knee-deep water and poor footing',
      'Comes up beside the specimen storeroom',
      'The necrotic field is felt strongly here after dark',
    ],
    check: {
      dc: 13,
      skill: 'Strength (Athletics) / Dexterity (Thieves’ Tools)',
      title: 'Breach the Culvert Grate',
      pass: 'The grate gives way quietly and the crew wades in unseen.',
      fail: 'The grate shrieks on its hinges — a guard upstairs may come to check the noise.',
    },
  },
  {
    id: 'storeroom',
    name: 'The Specimen Storeroom',
    tag: 'Atmosphere · Hazard',
    icon: FlaskConical,
    accent: '#8B3A3A',
    description:
      'Shelf after shelf of jarred and crated specimens awaiting display — and the room where the Malevolence’s influence first showed. Use it to build dread: tapping glass, clouded jars clearing to reveal open eyes, a smell of formaldehyde and rot.',
    features: [
      'Endless shelves of preserved creatures (a Specimen-Jar Swarm waits here)',
      'Spilled formaldehyde makes squares slippery and flammable',
      'A back stair connects to the Hall of Beasts',
    ],
  },
  {
    id: 'rooftop',
    name: 'The Roof & Domed Skylight',
    tag: 'Entry · Quiet',
    icon: DoorOpen,
    accent: ACCENT_LIGHT,
    description:
      'Copper drainpipes climb to a flat lead roof and the great glass dome above the upper gallery. The quietest approach in the building drops the crew almost on top of the prize — and offers the fastest way back out when things go wrong.',
    features: [
      'Climb the drainpipes or grapple to the parapet',
      'A latched skylight panel opens onto the upper gallery',
      'Far from the guards’ patrol loop',
      'Doubles as a rapid escape route in Beat 6',
    ],
    check: {
      dc: 14,
      skill: 'Strength (Athletics) / Dexterity (Acrobatics)',
      title: 'Scale to the Dome',
      pass: 'The crew reaches the skylight and slips inside without a sound.',
      fail: 'A loose tile clatters into the gutter; the noise risks drawing attention below.',
    },
  },
];

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

export default function Museum() {
  return (
    <div className="min-h-[100dvh] pt-16">
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Landmark size={22} color={ACCENT} />
              <span className="text-label tracking-[0.12em]" style={{ color: ACCENT_LIGHT }}>THE MUSEUM</span>
            </div>
            <h1 className="text-display-md text-parchment">Vermeulen-Voss Museum</h1>
            <p className="font-body text-[1.05rem] mt-4 max-w-[640px] mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
              A room-by-room guide to the museum of natural history — three ways in, the galleries between, and
              the prize beneath the dome.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FLOORPLANS */}
      <section className="px-4 pb-4">
        <div className="max-w-container-narrow mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <MapIcon size={18} color={ACCENT} />
            <h2 className="text-heading-lg text-parchment">Floorplans</h2>
          </div>
          <p className="font-body text-[0.9rem] leading-relaxed mb-2" style={{ color: 'rgba(245,240,230,0.6)' }}>
            Drop your battlemaps into <code style={{ color: ACCENT_LIGHT }}>public/murkmire/</code> and they
            appear here automatically. See that folder&apos;s README for filenames and some free, DM-friendly
            sources.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Figure src="/murkmire/map_varkenbluff_town.jpg" alt="Varkenbluff — the foggy river town" caption="Varkenbluff" kind="map" className="h-56" />
            <Figure src="/murkmire/map_museum_exterior.jpg" alt="Vermeulen-Voss Museum — exterior & approaches" caption="Museum Exterior" kind="map" className="h-56" />
            <Figure src="/murkmire/map_museum_first_floor.jpg" alt="Museum ground floor — foyer & galleries" caption="Ground Floor & Galleries" kind="map" className="h-56" />
            <Figure src="/murkmire/map_museum_upper_gallery.jpg" alt="Upper gallery — the meteorite display & skylight" caption="Upper Gallery" kind="map" className="h-56" />
            <Figure src="/murkmire/map_museum_basement.jpg" alt="Sub-basement & service tunnel" caption="Sub-Basement" kind="map" className="h-56" />
            <Figure src="/murkmire/handout_malevolence_item.jpg" alt="The Murkmire Malevolence — item handout" caption="The Malevolence (Item)" kind="handout" className="h-56" fit="contain" />
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 pt-8">
        <div className="max-w-container-narrow mx-auto space-y-6">
          {areas.map((area) => {
            const Icon = area.icon;
            return (
              <motion.article
                key={area.id}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="rounded-2xl p-6 sm:p-7"
                style={{ background: 'linear-gradient(135deg, #16241F 0%, #12100D 100%)', border: `1px solid ${ACCENT}26`, borderLeft: `3px solid ${area.accent}` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${area.accent}22`, border: `1px solid ${area.accent}44` }}>
                    <Icon size={20} color={area.accent} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-label text-[0.62rem] tracking-[0.12em] uppercase" style={{ color: area.accent }}>{area.tag}</span>
                    <h2 className="text-heading-lg text-parchment">{area.name}</h2>
                  </div>
                </div>

                <p className="font-body text-[0.97rem] leading-relaxed mt-4" style={{ color: 'rgba(245,240,230,0.8)' }}>{area.description}</p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  {area.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 font-body text-[0.88rem]" style={{ color: 'rgba(245,240,230,0.65)' }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: area.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {area.check && (
                  <div className="mt-2">
                    <SkillCheck dc={area.check.dc} skill={area.check.skill} title={area.check.title} pass={area.check.pass} fail={area.check.fail} />
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
