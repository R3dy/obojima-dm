import { motion } from 'framer-motion';
import { Sword, Bell, Skull, Footprints, KeyRound, Gem, Hourglass } from 'lucide-react';
import { TrapWarning, SkillCheck, DMSecret } from '../../components/DMCallouts';

const ACCENT = '#3E7C6A';
const ACCENT_LIGHT = '#6FB3A0';
const GOLD = '#C9A84C';
const BLOOD = '#C47171';

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

function Block({
  icon: Icon,
  accent,
  tag,
  title,
  children,
}: {
  icon: React.ElementType;
  accent: string;
  tag: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      variants={fade}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="rounded-2xl p-6 sm:p-7"
      style={{ background: 'linear-gradient(135deg, #16241F 0%, #12100D 100%)', border: `1px solid ${ACCENT}26`, borderTop: `3px solid ${accent}` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accent}22`, border: `1px solid ${accent}44` }}>
          <Icon size={18} color={accent} />
        </div>
        <div>
          <span className="text-label text-[0.62rem] tracking-[0.12em] uppercase" style={{ color: accent }}>{tag}</span>
          <h2 className="text-heading-lg text-parchment">{title}</h2>
        </div>
      </div>
      <div className="font-body text-[0.95rem] leading-relaxed space-y-3" style={{ color: 'rgba(245,240,230,0.8)' }}>
        {children}
      </div>
    </motion.section>
  );
}

const guardLocations: [string, string][] = [
  ['V1', '2'],
  ['V3', '1'],
  ['V4', '1'],
  ['V8', '1'],
  ['V9–V10', '2'],
  ['V11', '1'],
  ['V12', '2'],
  ['V13', '2'],
];

const stoneEffects: [string, string][] = [
  ['1', 'Harsh whispers: vulnerability to psychic damage; can’t maintain concentration on spells.'],
  ['2', 'Adrenaline: advantage on Strength checks and Strength saving throws.'],
  ['3', 'Leaden limbs: disadvantage on Dexterity checks and Dexterity saving throws.'],
  ['4', 'Weird sheen: resistance to piercing and slashing damage.'],
  ['5', 'Walking speed increases by 5 feet.'],
  ['6', 'Scattered mind: disadvantage on attack rolls.'],
  ['7', 'Skittering flesh: disadvantage on Charisma checks and Charisma saving throws.'],
  ['8', 'Stiff joints: disadvantage on Dexterity checks and Dexterity saving throws.'],
  ['9', 'Premonitions: attack rolls against you have disadvantage.'],
  ['10', 'Sluggish thoughts: disadvantage on Intelligence checks and Intelligence saving throws.'],
  ['11', 'Dulled senses: disadvantage on Wisdom (Perception) checks.'],
  ['12', 'A shimmery film: +2 bonus to AC.'],
];

function Table({ columns, rows, accent, align }: { columns: [string, string]; rows: [string, string][]; accent: string; align?: 'center' }) {
  return (
    <div className="rounded-xl overflow-hidden my-2" style={{ border: `1px solid ${ACCENT}26` }}>
      <table className="w-full text-left">
        <thead>
          <tr style={{ background: 'rgba(22,36,31,0.8)' }}>
            <th className={`px-4 py-2 text-stat text-[0.7rem] ${align === 'center' ? 'text-center w-24' : 'w-12'}`} style={{ color: accent }}>{columns[0]}</th>
            <th className={`px-4 py-2 text-stat text-[0.7rem] ${align === 'center' ? 'text-center' : ''}`} style={{ color: accent }}>{columns[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k} className="border-t" style={{ borderColor: 'rgba(245,240,230,0.06)' }}>
              <td className={`px-4 py-2 text-stat text-[0.8rem] align-top ${align === 'center' ? 'text-center' : ''}`} style={{ color: GOLD }}>{k}</td>
              <td className={`px-4 py-2 font-body text-[0.85rem] leading-snug ${align === 'center' ? 'text-center' : ''}`} style={{ color: 'rgba(245,240,230,0.78)' }}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Encounters() {
  return (
    <div className="min-h-[100dvh] pt-16">
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sword size={22} color={BLOOD} />
              <span className="text-label tracking-[0.12em]" style={{ color: BLOOD }}>SECURITY & HAZARDS</span>
            </div>
            <h1 className="text-display-md text-parchment">After the Museum Closes</h1>
            <p className="font-body text-[1.05rem] mt-4 max-w-[640px] mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
              At 8 p.m. the staff arm the museum&apos;s defenses: alarm spells, animated statues, the pedestal&apos;s
              arcane lock, and twelve guards on patrol. Here&apos;s how each works — and how a clever crew slips past.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-container-narrow mx-auto px-4 pb-24 space-y-6">
        <Block icon={Bell} accent={GOLD} tag="Audible Alarm Spells" title="The Alarms">
          <p>
            Audible <em>alarm</em> spells (areas marked “A” on Map 1.2) cover doors and 5-foot squares. Touching a
            warded door or entering a warded square sets it off; the front-door alarm spans the whole 10-foot
            doorway. When one sounds, any guards in the area <strong>plus 1d3 more from that floor</strong> come to
            investigate. The alarms are off while the museum is open.
          </p>
          <p className="text-[0.88rem]" style={{ color: 'rgba(245,240,230,0.6)' }}>
            Warded spots: the front doors and the foot of the stairs (V1); the halls from V1 to V3; the doors from
            V1 to V5, V6, and V7; the hall from V11 to V12; and the door from V12 to the V13 hallway.
          </p>
          <DMSecret heading="Bypassing the Alarms">
            Guards and the curator each carry a palm-sized <strong>pass card</strong> (an aura of divination magic)
            that bypasses any alarm. Three spare pass cards sit in the break room (V7). A character within reach of
            a guard and hidden can lift a card with a DC 14 Dexterity (Sleight of Hand) check. The records room
            (V6) and <em>detect magic</em> both reveal where the alarms are.
          </DMSecret>
        </Block>

        <Block icon={Gem} accent="#6B7FA0" tag="Living Statues" title="Animated Statues">
          <p>
            The two statues flanking the front desk (V1) and the winged-satyr statue by the stairs (V12) animate
            after hours to attack intruders. They use the <strong>animated armor</strong> stat block and fight
            until destroyed; causing one to animate alerts any guards in that area.
          </p>
          <SkillCheck
            dc={10}
            skill="Intelligence (Arcana)"
            title="Recognize a Trapped Statue"
            pass="Detect magic shows a transmutation aura; the character realizes the statue can animate — stay 5+ feet away to keep it inert."
            fail="The statue seems like ordinary stone until something steps within 5 feet of it."
          />
        </Block>

        <Block icon={Footprints} accent={ACCENT} tag="Twelve Guards" title="Guards After Hours">
          <p>
            Maryam Bikram holds the gala entrance; eleven other guards take the posts below. Each carries a key to
            their station&apos;s doors and an alarm pass card. Sneak past them with Stealth — studying the curator&apos;s
            patrol document (from her clutch or the V5 desk) for a minute grants advantage.
          </p>
          <Table columns={['Area', 'Guards']} rows={guardLocations} accent={ACCENT_LIGHT} align="center" />
          <p>
            A noisy fight brings <strong>1d4 more guards each round</strong> until all are accounted for. A guard
            within reach can be relieved of their key or pass card with a hidden DC 14 Sleight of Hand check.
          </p>
          <DMSecret heading="Getting Caught">
            If the guards incapacitate a character or a character surrenders, the guards haul them to the nearby
            city watch headquarters. <strong>If every character is caught, the mission fails and the adventure
            ends.</strong> During the gala, a pre-backup guard can be waved off with a DC 10 Charisma (Deception,
            Intimidation, or Persuasion) check.
          </DMSecret>
        </Block>

        <Block icon={Skull} accent="#8B3A3A" tag="Traps & Guardians" title="Other Hazards">
          <TrapWarning
            name="Falling Net (V1)"
            trigger="A creature steps on the rug-hidden pressure plate north of the front doors while the trap is armed"
            effect="A weighted net drops over the 10-ft square. Creatures are restrained; those that fail a DC 10 Strength save are also knocked prone. The net is AC 10, 12 HP; a DC 10 Strength check frees a creature."
            countermeasure="Lift the rug to reveal the plate, or flip the toggle hidden under the information desk to disarm it."
          />
          <TrapWarning
            name="The Rigged Pedestal (V13)"
            trigger="The Murkmire Stone is lifted from its pedestal without precautions"
            effect="Arcane lock seals every door to the room (including secret doors). Opening one takes a DC 20 thieves’ tools or DC 20 Strength (Athletics) check; guards and the curator open them freely."
            countermeasure="A DC 12 Arcana check reads the glyphs in advance; swapping in the V9 jade fake (DC 10 Sleight of Hand) prevents the trap entirely."
          />
          <p>
            <strong style={{ color: BLOOD }}>Marigold (V5)</strong> animates against anyone but Alda who enters the
            curator&apos;s office, and the <strong style={{ color: BLOOD }}>mimic (V16)</strong> lurks in the
            basement&apos;s central crates — both use their stat blocks on the Bestiary page and fight until
            destroyed.
          </p>
        </Block>

        <Block icon={Hourglass} accent={GOLD} tag="The Ticking Egg" title="The Murkmire Stone Awakens">
          <p>
            Starting at <strong>10:30 p.m.</strong>, the egg&apos;s shell turns translucent and emits a pulse of
            magic every 10 minutes. Each creature within 20 feet must make a <strong>DC 10 Wisdom save</strong>
            (disadvantage if holding the egg); failure inflicts a random effect below until a new pulse replaces it.
            Stowing the egg in a <em>bag of holding</em> makes the effect radiate from the container instead. The
            effects end when the egg hatches at <strong>midnight</strong> — or when Dr. Dannell seals it in crystal.
          </p>
          <Table columns={['d12', 'Effect on a Failed Save']} rows={stoneEffects} accent={ACCENT_LIGHT} />
        </Block>

        <Block icon={KeyRound} accent={ACCENT_LIGHT} tag="Player Tools" title="Circumventing Security">
          <ul className="space-y-2 ml-1">
            {[
              <><strong>Avoid the statues</strong> by staying more than 5 feet from them.</>,
              <><strong>Bypass alarms</strong> with a pass card from a guard (DC 14 Sleight of Hand) or the spare stash in V7.</>,
              <><strong>Sneak past guards</strong> using the curator’s patrol document (advantage on Stealth after 1 minute of study).</>,
              <><strong>Steal keys:</strong> each guard’s key opens their station’s doors; V1 guards also hold a key to the break room (V7). The curator carries a master key.</>,
              <><strong>Swap the egg</strong> for the V9 jade fake to keep the pedestal from locking the doors.</>,
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[0.9rem]" style={{ color: 'rgba(245,240,230,0.78)' }}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: ACCENT_LIGHT }} />
                {item}
              </li>
            ))}
          </ul>
        </Block>
      </div>
    </div>
  );
}
