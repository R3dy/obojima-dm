import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ──────────────────────── data ──────────────────────── */

interface Feature {
  level: number;
  title: string;
  text: string | string[];
}

interface Subclass {
  id: string;
  className: string;
  name: string;
  accent: string;
  description: string;
  features: Feature[];
}

const SUBCLASSES: Subclass[] = [
  {
    id: 'belly-brewer',
    className: 'Barbarian',
    name: 'Path of the Belly Brewer',
    accent: '#8B3A3A',
    description:
      'Masters of brewing potions in their guts. They swallow, mix, and brew magical concoctions inside their stomachs, creating potent effects in the heat of battle. A generation ago, adventurous eaters with unappeasable appetites discovered that certain morsels consumed together yielded potion-like effects.',
    features: [
      {
        level: 3,
        title: 'Belly Concoction',
        text: [
          'When you enter rage, choose combat, utility, or whimsy. You gain the effects of the chosen belly concoction until your rage ends. You can change your belly concoction each time you rage.',
          '',
          'COMBAT — Your body becomes rubbery and elastic. Reaction when hit by a ranged attack: reduce damage by 1d12 + Con modifier + barbarian level. Bonus action before a melee attack: stretch your arms (+5ft reach), the first hit deals an extra 1d6 damage of the weapon\'s type.',
          '',
          'UTILITY — As a bonus action, consume any object you can fit in your mouth. Expend one Hit Die to heal (roll + Con modifier, minimum 1). Swallowing destroys the object if it is nonmagical. Usable a number of times equal to your proficiency bonus per long rest.',
          '',
          'WHIMSY — Random effect at the start of each turn: teleport to an unoccupied space within 10ft, OR take 1d4 necrotic damage and your next ability check gains a bonus equal to the number rolled, OR take the Help action as a bonus action. Plus a random visual effect (hair turns to moss, spectral bird circles you, etc.).',
        ],
      },
      {
        level: 3,
        title: 'Side Effects',
        text: 'You learn the Prestidigitation and Thaumaturgy cantrips from the countless magical ingredients you\'ve ingested.',
      },
      {
        level: 6,
        title: 'Quick Brew',
        text: 'Choose one common potion. You can activate its effects as a bonus action once per long rest. If the potion requires a saving throw, the DC equals 8 + your proficiency bonus + your Constitution modifier. Each time you gain a level, you can swap your chosen potion with a different one.',
      },
      {
        level: 10,
        title: 'Lingering Effects',
        text: 'After a long rest, choose one condition: blinded, charmed, exhaustion, frightened, paralyzed, petrified, poisoned, prone, restrained, or stunned. You have advantage on saving throws against that condition until you choose a different one with this feature.',
      },
      {
        level: 14,
        title: 'Mighty Quick Brew',
        text: 'You learn one additional common potion and one uncommon potion using your Quick Brew feature. Each time you gain a level in this class, you can swap one of your chosen potions with a different one.',
      },
    ],
  },
  {
    id: 'college-of-masks',
    className: 'Bard',
    name: 'College of Masks',
    accent: '#B87333',
    description:
      'Theater actors who use magical masks to transform themselves. Through these masks, bards can mimic others and take on attributes of the personas their masks depict. The College of Masks refers to both the bardic tradition and an Obojiman theater tradition where a solitary masked actor plays out stories from the island\'s myths.',
    features: [
      {
        level: 3,
        title: 'Tools of Performance',
        text: [
          'Craft 2 masks of your choice from the list below. You craft additional masks at 7th, 11th, and 15th level. You can don or swap masks as an action or bonus action. If a mask ability requires a saving throw, the DC equals your bard spell save DC.',
          '',
          '\u2022 The Old Man \u2014 Cast Detect Magic and Identify at will.',
          '\u2022 The Fish \u2014 Swimming speed equals walking speed; breathe underwater. Know Water Bullet and Whelm Weapon spells.',
          '\u2022 The Demon (7th) \u2014 Arcane Memory: learn if a creature/object was within 20ft in past 24 hours. Demon Eye: see through solid objects to 15ft.',
          '\u2022 The Protagonist \u2014 Gain temp HP equal to half bard level when rolling initiative. Bonus action: mark a creature as your antagonist for 1 minute; you have advantage on checks involving them and can use a Bardic Inspiration die to reduce their attack rolls.',
          '\u2022 The Fox \u2014 Move through hostile creature\'s spaces; AC +1; reaction to gain advantage on Dex saves.',
          '\u2022 The Golem (7th) \u2014 Weapon attacks deal extra 1d8 damage; double damage to objects and structures.',
          '\u2022 The Spirit (7th) \u2014 Know Speak with Dead. Expend Bardic Inspiration to step through the Spirit Realm while moving until end of turn.',
          '\u2022 The Harpy (11th) \u2014 Flying speed 30ft; resistance to psychic damage.',
          '\u2022 The Sea Urchin \u2014 Bonus action: expend Bardic Inspiration to heal (roll + half bard level). Action: attempt to restrain a creature within 30ft (Con save).',
          '\u2022 Stone Mask \u2014 Proficiency in Athletics; nonmagical B/P/S damage reduced by 2; advantage on checks/saves vs being pushed, pulled, or knocked prone.',
        ],
      },
      {
        level: 3,
        title: 'Copycat',
        text: [
          'As an action, expend one use of Bardic Inspiration to cast Alter Self (Change Appearance option) to become a humanoid you\'ve seen. Doesn\'t require concentration. You gain 5 temporary hit points and nonmagical equipment of the target. Once per long rest.',
        ],
      },
      {
        level: 6,
        title: 'Many-Masked Performance',
        text: 'Over 1 minute, captivate creatures within 60ft (up to your bard level). Each must succeed on a Wis save or become charmed, frightened, or fall unconscious (your choice).',
      },
      {
        level: 14,
        title: 'Gift of Theatre',
        text: 'Give a mask to an ally within 5ft as an action. The ally can use the mask\'s features for 1 minute. You cannot use that mask while it is lent. Once per short or long rest.',
      },
    ],
  },
  {
    id: 'oath-of-the-sunfish',
    className: 'Paladin',
    name: 'Oath of the Sunfish',
    accent: '#C9A84C',
    description:
      'Paladins devoted to Okumi the Sunfish, a spirit of protection and warmth. They channel Okumi\'s protective light to shield their communities and be a beacon in darkness. Their tenets are: Warmth (share comfort), Luminescence (be a beacon), Circle (protect the community), and Tide (adapt to change).',
    features: [
      {
        level: 3,
        title: 'Oath Spells',
        text: [
          '3rd: Shield of Faith, Guiding Bolt',
          '5th: Spiritual Weapon, Calm Emotions',
          '9th: Daylight, Beacon of Hope',
          '13th: Guardian of Faith, Death Ward',
          '17th: Wall of Light, Mass Cure Wounds',
        ],
      },
      {
        level: 3,
        title: "Channel Divinity: Okumi's Warmth",
        text: '30ft radius aura for 1 minute. You and friendly creatures gain temporary HP equal to your Cha modifier + paladin level at the start of each of your turns.',
      },
      {
        level: 3,
        title: 'Channel Divinity: Blinding Light',
        text: '15ft cone. Creatures must succeed on a Con save or be blinded until the end of your next turn.',
      },
      {
        level: 7,
        title: 'Sunfish Shield',
        text: 'When you or an ally within 10ft takes damage, you can use your reaction to reduce the damage by 1d8 + your Cha modifier. The range increases to 30ft at 18th level.',
      },
      {
        level: 15,
        title: 'Luminous Tide',
        text: 'Gain swimming speed 30ft and can breathe underwater. While submerged, you emit bright light 30ft and dim light 30ft. Hostile creatures in your bright light have disadvantage on attacks against you.',
      },
      {
        level: 20,
        title: "Okumi's Embrace",
        text: '1-minute transformation (action, once per long rest). Gain bright light 60ft/dim 30ft aura. You and allies in the aura: resistance to radiant and cold damage. Enemies in the bright light take 2d8 radiant damage at the start of each of their turns. You gain a flying (swim) speed of 60ft.',
      },
    ],
  },
  {
    id: 'dancing-leaf',
    className: 'Monk',
    name: 'Way of the Dancing Leaf',
    accent: '#4A5D3F',
    description:
      'Monks who move like leaves on the wind. Their unpredictable, flowing combat style makes them difficult to pin down. They harness the gentle force of the breeze to evade attacks and redirect momentum.',
    features: [
      {
        level: 3,
        title: 'Dancing Leaf Stance',
        text: 'Bonus action to enter stance for 1 minute. While in stance: +10ft movement speed; can use Step of the Wind without spending ki; when you use Flurry of Blows, you can choose to push the target 10ft or knock them prone instead of making the second strike.',
      },
      {
        level: 6,
        title: 'Leaf on the Wind',
        text: 'When hit by an attack, spend 1 ki point as a reaction to reduce damage by 1d10 + monk level + Wis modifier. If reduced to 0, you can move up to half your speed without provoking opportunity attacks.',
      },
      {
        level: 11,
        title: "Autumn's Descent",
        text: 'When you fall, reduce damage by 5 \u00d7 monk level. If you take no damage from the fall, you can immediately make an unarmed strike against a creature within 5ft of you when you land.',
      },
      {
        level: 17,
        title: 'Whirlwind of Leaves',
        text: 'Action + 5 ki points. All creatures within 30ft must make a Dex save or take 10d10 bludgeoning damage, half on success. You can then teleport to any unoccupied space within 30ft.',
      },
    ],
  },
  {
    id: 'circle-of-tall-grass',
    className: 'Druid',
    name: 'Circle of the Tall Grass',
    accent: '#2F8B5A',
    description:
      'Druids connected to the unique flora of Obojima. They channel the spirit of the island\'s grasslands and form a bond with a spirit companion that manifests as a Small plant creature.',
    features: [
      {
        level: 2,
        title: 'Tall Grass Companion',
        text: 'Summon a spirit companion as a bonus action (Small plant creature). HP = druid level + Wis modifier. Can occupy the same space as you. While within 30ft: add Wis mod to AC; can use reaction to halve damage from an attack. The companion can use a bonus action to Help, Dash, or Disengage. If destroyed, resummon after a short rest.',
      },
      {
        level: 2,
        title: 'Grasswalk',
        text: 'Ignore difficult terrain in natural environments. You can hide in tall grass or plants even without cover.',
      },
      {
        level: 6,
        title: 'Spirit of the Plains',
        text: 'While your companion is active: gain temporary HP equal to your druid level at the start of each of your turns. You and your companion have advantage on saves vs being frightened or charmed.',
      },
      {
        level: 10,
        title: 'Wrath of the Wilds',
        text: 'Action \u2014 your companion transforms into a Large plant creature for 1 minute. It gains 60 temporary HP, its attacks deal an extra 2d8 necrotic damage, and enemies within 10ft have disadvantage on saves vs your spells.',
      },
      {
        level: 14,
        title: 'One with the Grassland',
        text: 'While in a natural environment: you can cast spells without verbal or somatic components. Once per long rest, when reduced to 0 HP, instead drop to 1 HP and regain HP equal to druid level \u00d7 Wis modifier.',
      },
    ],
  },
  {
    id: 'fish-head-coven',
    className: 'Warlock',
    name: 'Pact of the Fish Head Coven',
    accent: '#3E6090',
    description:
      'Warlocks who made pacts with the mysterious Fish Head Coven, witches of the sea. They gain oceanic powers and the ability to brew magical concoctions.',
    features: [
      {
        level: 1,
        title: 'Expanded Spell List',
        text: [
          '1st: Charm Person, Thunderwave',
          '2nd: Misty Step, Silence',
          '3rd: Counterspell, Tidal Wave',
          '4th: Control Water, Confusion',
          '5th: Dominate Person, Maelstrom',
        ],
      },
      {
        level: 1,
        title: 'Oceanborn',
        text: 'Gain swimming speed 30ft and can breathe air and water. You learn the Aquan language.',
      },
      {
        level: 1,
        title: "Witch's Brew",
        text: 'After a long rest, concoct a brew (choose one): Healing (creature regains 2d8+Con HP), Harmful (Con save or 2d8 poison damage + poisoned for 1 minute), or Helpful (grant water breathing for 8 hours or swim speed 30ft for 1 hour).',
      },
      {
        level: 6,
        title: 'Grasp of the Deep',
        text: 'When you cast a spell that deals damage, you can change the damage type to cold. When you deal cold damage, the target\'s speed is reduced by 10ft until the end of their next turn. Reaction when hit: spend a spell slot to deal 2d8 cold damage to the attacker and push them 10ft.',
      },
      {
        level: 10,
        title: "Deep One's Blessing",
        text: 'Gain resistance to cold damage. While submerged, you can become invisible as a bonus action. The invisibility ends if you attack or cast a spell.',
      },
      {
        level: 14,
        title: 'Master of the Tides',
        text: 'Can cast Control Water once per long rest without using a spell slot. When you cast a spell of 1st level or higher that deals cold damage, choose one creature hit \u2014 it must succeed on a Con save or be stunned until the end of your next turn.',
      },
    ],
  },
  {
    id: 'school-of-first-age',
    className: 'Wizard',
    name: 'School of First Age',
    accent: '#6B4C7A',
    description:
      'Wizards who study the mysterious First Age technology scattered across Obojima. They blend arcane magic with ancient technological devices, learning to channel spirit energy through forgotten relics.',
    features: [
      {
        level: 2,
        title: 'First Age Savant',
        text: 'When making an Arcana check about First Age technology, add double your proficiency bonus. You can identify the magical properties of First Age objects by spending 10 minutes studying them.',
      },
      {
        level: 2,
        title: 'Technomagic',
        text: 'Learn 2 spells from any class list (they count as wizard spells). They must be related to technology or magic. You learn an additional technomagic spell at 6th, 10th, and 14th level.',
      },
      {
        level: 6,
        title: 'Channel Spirit Energy',
        text: 'You can use a First Age device as a spellcasting focus. When casting through the device, you can reroll one damage die once per turn.',
      },
      {
        level: 10,
        title: 'Reverse Engineering',
        text: 'During a short rest, you can disassemble a nonmagical First Age device to create a temporary spell scroll (1st\u20133rd level wizard spell you know). The scroll becomes inert after 24 hours.',
      },
      {
        level: 14,
        title: 'Ageless Mind',
        text: 'Advantage on Int saves and checks to resist being charmed, frightened, or confused. You can cast Detect Thoughts at will without using a spell slot.',
      },
    ],
  },
  {
    id: 'harbinger-domain',
    className: 'Cleric',
    name: 'Harbinger Domain',
    accent: '#C9A84C',
    description:
      'Clerics who serve as messengers and prophets of spiritual omens. They divine the future and manipulate fate to protect their allies and steer events toward prophesied outcomes.',
    features: [
      {
        level: 1,
        title: 'Harbinger Spells',
        text: [
          '1st: Comprehend Languages, Feather Fall',
          '3rd: Augury, Misty Step',
          '5th: Clairvoyance, Sending',
          '7th: Divination, Freedom of Movement',
          '9th: Commune, Dream',
        ],
      },
      {
        level: 1,
        title: 'Portent',
        text: 'After a long rest, roll two d20s and record the results. You can replace any attack roll, save, or ability check made by you or a creature you can see with one of these foretelling rolls. Each roll can be used only once and expires after your next long rest.',
      },
      {
        level: 1,
        title: 'Omen Reader',
        text: 'You can cast Augury without material components. Number of times = Wis modifier (minimum 1). Regain uses after a long rest.',
      },
      {
        level: 2,
        title: 'Channel Divinity: Prophecy',
        text: 'Replace any creature\'s attack roll, save, or ability check with your Channel Divinity roll (roll d20 + Wis modifier). You can use this after the creature rolls.',
      },
      {
        level: 6,
        title: 'Channel Divinity: Foreseen Strike',
        text: 'When you hit with an attack, add 2d8 psychic damage. The next attack against the target before your next turn has advantage.',
      },
      {
        level: 8,
        title: 'Visions of the Future',
        text: 'Add your Wis modifier to the damage of your cantrips and weapon attacks.',
      },
      {
        level: 17,
        title: 'Fateweaver',
        text: 'When you or an ally within 30ft would be reduced to 0 HP, you can use your reaction to spend a spell slot \u2014 the creature instead drops to 1 HP and regains 5 \u00d7 spell slot level HP.',
      },
    ],
  },
  {
    id: 'wildroot-patron',
    className: 'Sorcerer',
    name: 'Wildroot Patron',
    accent: '#2F8B5A',
    description:
      'Sorcerers whose magic stems from Obojima\'s living island spirit. Their power grows from the island itself, manifesting as plant magic and a deep bond with the natural world.',
    features: [
      {
        level: 1,
        title: "Island's Blessing",
        text: 'Learn one druid cantrip (uses Cha). Gain temporary HP equal to your sorcerer level when you finish a short rest in a natural environment.',
      },
      {
        level: 1,
        title: 'Root Magic',
        text: 'When casting a spell, you can spend 1 sorcery point to cause plant growth. Creatures of your choice within 10ft must make a Dex save or be restrained by roots until the end of your next turn.',
      },
      {
        level: 6,
        title: 'Spirit Tether',
        text: 'Bonus action + 2 sorcery points \u2014 bond with a creature within 30ft for 1 minute. When the bonded creature takes damage, you can use your reaction to take half that damage (they take the other half). When you cast a spell that heals, the bonded creature also regains HP equal to your Cha modifier.',
      },
      {
        level: 14,
        title: "Nature's Avatar",
        text: 'Action + 3 sorcery points \u2014 for 1 minute: gain temp HP equal to sorcerer level; resistance to poison damage; ignore difficult terrain; spells don\'t require somatic components; unarmed strikes deal 1d8 + Cha bludgeoning damage.',
      },
      {
        level: 18,
        title: "Island's Wrath",
        text: 'Action + 5 sorcery points \u2014 all creatures within 60ft must make a Con save or take 10d10 force damage (half on success). You and your allies in the area instead regain 5d10 HP.',
      },
    ],
  },
  {
    id: 'way-of-the-gale',
    className: 'Fighter',
    name: 'Way of the Gale',
    accent: '#3E4A5E',
    description:
      'Fighters who harness the power of Obojima\'s fierce winds. They use gale-force techniques to control the battlefield, pushing foes about and riding the wind themselves.',
    features: [
      {
        level: 3,
        title: 'Gale Strike',
        text: 'When you hit with a weapon attack, expend a superiority die to add wind damage. The target must make a Str save or be pushed 15ft and knocked prone. Extra damage equals the superiority die roll. Save DC = 8 + proficiency + Str or Dex.',
      },
      {
        level: 3,
        title: 'Wind Step',
        text: 'Bonus action + superiority die \u2014 gain flying speed 30ft for 1 minute. You can hover.',
      },
      {
        level: 3,
        title: 'Gale Techniques',
        text: [
          'Learn 3 gale maneuvers. Learn an additional maneuver at 7th, 10th, and 15th.',
          '',
          '\u2022 Cutting Wind \u2014 Add superiority die to damage + push target 10ft.',
          '\u2022 Eye of the Storm \u2014 Reaction when ally is hit: impose disadvantage; if the attack misses, you can move half speed and make an attack.',
          '\u2022 Tailwind \u2014 Bonus action: ally within 30ft gains +10ft speed and +superiority die to damage for 1 minute.',
          '\u2022 Updraft \u2014 When falling: take no damage and can fly half your speed.',
          '\u2022 Whispering Wind \u2014 Bonus action: gain blindsight 30ft for 1 minute.',
        ],
      },
      {
        level: 7,
        title: "Storm's Eye",
        text: 'Gain resistance to lightning and thunder damage. You cannot be pushed against your will.',
      },
      {
        level: 10,
        title: 'Howling Strike',
        text: 'Action + superiority die \u2014 make a weapon attack against all creatures in a 15ft line. Each hit deals normal damage + superiority die thunder damage. DC 15 Str save or deafened for 1 minute.',
      },
      {
        level: 15,
        title: 'Master of Winds',
        text: 'Wind Step no longer costs a superiority die. You can use Gale Strike twice per Attack action.',
      },
    ],
  },
  {
    id: 'beast-friend',
    className: 'Ranger',
    name: 'Beast Friend',
    accent: '#4A5D3F',
    description:
      'Rangers who form deep bonds with Obojima\'s beast spirits rather than traditional animals. Their spirit companion aids them in combat and scouting, sharing senses and fighting as one.',
    features: [
      {
        level: 3,
        title: 'Spirit Companion',
        text: [
          'Gain a beast spirit companion (choose one):',
          '\u2022 Spirit Bear \u2014 Aura grants temp HP to nearby allies at the start of each turn.',
          '\u2022 Spirit Falcon \u2014 Grants flying speed for scouting; advantage on Perception checks.',
          '\u2022 Spirit Wolf \u2014 Pack tactics (advantage when ally is adjacent); advantage on tracking checks.',
          'The companion is an incorporeal beast using your proficiency bonus. HP = 5 \u00d7 ranger level. Resistant to nonmagical damage.',
        ],
      },
      {
        level: 3,
        title: 'Shared Senses',
        text: 'You can see and hear through your companion\'s senses (action to switch, bonus action to return). While using companion senses, your body is blind and deaf.',
      },
      {
        level: 7,
        title: 'Spirit Strike',
        text: 'When you hit with a weapon attack, your companion can use its reaction to make a spectral attack. Deals 1d8 + Wis mod force damage. You can expend a spell slot to add an extra 1d8.',
      },
      {
        level: 11,
        title: 'Bond of the Wild',
        text: 'You and your companion within 30ft of each other: advantage on saves vs frightened or charmed. Companion\'s attacks count as magical. Can communicate telepathically with companion within 1 mile.',
      },
      {
        level: 15,
        title: 'Beast Spirit Awakening',
        text: 'Action \u2014 companion becomes fully material for 1 minute. Size Large, AC equals your AC, HP doubled, attacks deal extra 2d8 force damage. Can use companion\'s special ability once during transformation.',
      },
    ],
  },
];

/* ──────────────────────── components ──────────────────────── */

function LevelBadge({ level }: { level: number }) {
  return (
    <span className="inline-flex items-center justify-center min-w-[2.5rem] h-7 px-2 rounded-md bg-copper/20 text-copper-light text-stat text-xs font-bold border border-copper/30">
      {level}
      <span className="text-[0.6rem] ml-0.5 opacity-70">th</span>
    </span>
  );
}

function SubclassCard({ subclass, isOpen, onToggle, index }: {
  subclass: Subclass;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="rounded-xl border border-copper/20 overflow-hidden bg-walnut/60 backdrop-blur-sm"
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 sm:px-6 sm:py-5 flex items-center gap-4 hover:bg-copper/5 transition-colors"
      >
        <div
          className="w-2 h-12 rounded-full shrink-0"
          style={{ backgroundColor: subclass.accent }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-label text-[0.65rem] text-copper tracking-widest uppercase">
              {subclass.className}
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-parchment mt-0.5">
            {subclass.name}
          </h3>
        </div>
        <div className="shrink-0 ml-2">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-copper"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </div>
      </button>

      {/* Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 sm:px-6 sm:pb-8 pt-1 border-t border-copper/10">
              {/* Description */}
              <p className="text-parchment/80 text-sm sm:text-base leading-relaxed mb-6 italic">
                {subclass.description}
              </p>

              {/* Features */}
              <div className="space-y-4">
                {subclass.features.map((feature, fi) => (
                  <div
                    key={fi}
                    className="rounded-lg border border-copper/15 bg-ink/40 p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <LevelBadge level={feature.level} />
                      <h4 className="font-display text-lg font-semibold text-gold">
                        {feature.title}
                      </h4>
                    </div>
                    {Array.isArray(feature.text) ? (
                      <div className="space-y-1.5">
                        {feature.text.map((line, li) =>
                          line === '' ? (
                            <div key={li} className="h-1" />
                          ) : line.startsWith('\u2022') ? (
                            <p key={li} className="text-parchment/80 text-sm leading-relaxed pl-3 border-l-2 border-copper/20 ml-1">
                              {line}
                            </p>
                          ) : (
                            <p key={li} className="text-parchment/80 text-sm leading-relaxed">
                              {line}
                            </p>
                          )
                        )}
                      </div>
                    ) : (
                      <p className="text-parchment/80 text-sm leading-relaxed">
                        {feature.text}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ──────────────────────── page ──────────────────────── */

export default function Subclasses() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));

  return (
    <div className="min-h-[100dvh]">
      {/* Hero */}
      <section className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 grad-gold-glow opacity-60" />
        <div className="max-w-container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-label text-copper text-xs tracking-[0.2em] uppercase">
              Player Options
            </span>
            <h1 className="text-display-lg text-parchment mt-3 mb-4">
              Subclasses
            </h1>
            <p className="text-parchment/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Eleven new subclasses intertwined with Obojima&apos;s culture and creatures.
              Each offers a playstyle that feels uniquely Obojiman.
            </p>
            <div className="mt-6 h-px w-32 mx-auto grad-copper-border" />
          </motion.div>
        </div>
      </section>

      {/* Subclass list */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-container mx-auto px-4 sm:px-6">
          {/* Class legend */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-3 justify-center mb-8 sm:mb-10"
          >
            {Array.from(new Set(SUBCLASSES.map(s => s.className))).map(cls => {
              const sc = SUBCLASSES.find(s => s.className === cls)!;
              return (
                <span
                  key={cls}
                  className="text-stat text-xs px-3 py-1.5 rounded-full border border-copper/20 bg-walnut/50 text-parchment/70"
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: sc.accent }}
                  />
                  {cls}
                </span>
              );
            })}
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {SUBCLASSES.map((subclass, i) => (
              <SubclassCard
                key={subclass.id}
                subclass={subclass}
                isOpen={openId === subclass.id}
                onToggle={() => toggle(subclass.id)}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
