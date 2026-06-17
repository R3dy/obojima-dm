
import { motion } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  MapPin,
  BookOpen,
  Eye,
  Dices,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Sparkles,
  AlertTriangle,
  Scroll,
  Home,
  Wand2,
  Star,
  Users,
  Compass,
  Volume2,
} from 'lucide-react';


/* ------------------------------------------------------------------ */
/*  DM CALLOUTS — local copies since the page must be self-contained   */
/*  (matches the style of ../components/DMCallouts.tsx exactly)       */
/* ------------------------------------------------------------------ */

const calloutVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const calloutTransition = {
  duration: 0.45,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

function ReadAloud({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <motion.div
      variants={calloutVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={calloutTransition}
      className="relative rounded-xl p-6 my-6 border-l-4"
      style={{
        background: 'rgba(107, 76, 122, 0.1)',
        borderLeftColor: '#6B4C7A',
        borderTop: '1px solid rgba(107, 76, 122, 0.2)',
        borderRight: '1px solid rgba(107, 76, 122, 0.2)',
        borderBottom: '1px solid rgba(107, 76, 122, 0.2)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <BookOpen size={16} color="#A084B0" />
        <span className="text-[0.7rem] tracking-[0.12em] uppercase" style={{ fontFamily: "'Cinzel Decorative', serif", color: '#A084B0' }}>
          {title ?? 'Read Aloud'}
        </span>
      </div>
      <div className="font-body text-[1.05rem] leading-relaxed italic" style={{ color: '#E8DFF0' }}>
        {children}
      </div>
    </motion.div>
  );
}

function DMSecret({ children, heading, label }: { children: React.ReactNode; heading?: string; label?: string }) {
  const displayLabel = heading ?? label ?? 'DM Guidance';
  return (
    <motion.div
      variants={calloutVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={calloutTransition}
      className="relative rounded-xl p-5 my-6"
      style={{ background: 'rgba(45, 32, 22, 0.6)', border: '1px dashed rgba(184, 115, 51, 0.4)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Eye size={15} color="#B87333" />
        <span className="text-[0.7rem] tracking-[0.12em] uppercase" style={{ fontFamily: "'Cinzel Decorative', serif", color: '#D4956A' }}>
          {displayLabel}
        </span>
      </div>
      <div className="font-body text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245, 240, 230, 0.8)' }}>
        {children}
      </div>
    </motion.div>
  );
}

function SkillCheck({
  dc,
  pass,
  fail,
  advantage,
  skill,
  title,
}: {
  dc: string | number;
  pass?: string;
  fail?: string;
  advantage?: string;
  skill?: string;
  title?: string;
}) {
  const displayDc =
    typeof dc === 'number'
      ? `DC ${dc}${skill ? ` ${skill}` : ''}${title ? ` \u2014 ${title}` : ''}`
      : dc;

  return (
    <motion.div
      variants={calloutVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={calloutTransition}
      className="relative rounded-xl p-5 my-5"
      style={{ background: 'rgba(62, 74, 94, 0.2)', border: '1px solid rgba(107, 127, 160, 0.3)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Dices size={16} color="#6B7FA0" />
        <span className="text-[0.7rem] tracking-[0.12em] uppercase" style={{ fontFamily: "'Cinzel Decorative', serif", color: '#6B7FA0' }}>
          Skill Check
        </span>
      </div>
      <p className="font-body text-[1rem] font-semibold mb-3" style={{ color: '#F5F0E6' }}>
        {displayDc}
      </p>
      <div className="space-y-2">
        {pass && (
          <div className="flex items-start gap-2">
            <CheckCircle2 size={15} color="#8FA678" className="mt-0.5 shrink-0" />
            <p className="font-body text-[0.9rem] leading-relaxed" style={{ color: 'rgba(245, 240, 230, 0.8)' }}>
              <span className="font-semibold" style={{ color: '#8FA678' }}>Pass:</span> {pass}
            </p>
          </div>
        )}
        {fail && (
          <div className="flex items-start gap-2">
            <XCircle size={15} color="#8B3A3A" className="mt-0.5 shrink-0" />
            <p className="font-body text-[0.9rem] leading-relaxed" style={{ color: 'rgba(245, 240, 230, 0.8)' }}>
              <span className="font-semibold" style={{ color: '#8B3A3A' }}>Fail:</span> {fail}
            </p>
          </div>
        )}
        {advantage && (
          <div className="flex items-start gap-2">
            <Sparkles size={15} color="#C9A84C" className="mt-0.5 shrink-0" />
            <p className="font-body text-[0.9rem] leading-relaxed" style={{ color: 'rgba(245, 240, 230, 0.8)' }}>
              <span className="font-semibold" style={{ color: '#C9A84C' }}>Advantage:</span> {advantage}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function TrapWarning({
  name,
  trigger,
  effect,
  countermeasure,
}: {
  name: string;
  trigger: string;
  effect: string;
  countermeasure: string;
}) {
  return (
    <motion.div
      variants={calloutVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={calloutTransition}
      className="relative rounded-xl p-5 my-5"
      style={{ background: 'rgba(139, 58, 58, 0.12)', border: '1px solid rgba(139, 58, 58, 0.35)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <ShieldAlert size={16} color="#C47171" />
        <span className="text-[0.7rem] tracking-[0.12em] uppercase" style={{ fontFamily: "'Cinzel Decorative', serif", color: '#C47171' }}>
          Trap
        </span>
      </div>
      <p className="font-display text-[1.1rem] font-semibold mb-3" style={{ color: '#F5F0E6', fontFamily: "'Cormorant Garamond', serif" }}>
        {name}
      </p>
      <div className="space-y-2.5">
        <div className="flex items-start gap-2">
          <AlertTriangle size={14} color="#C47171" className="mt-1 shrink-0" />
          <p className="font-body text-[0.9rem] leading-relaxed" style={{ color: 'rgba(245, 240, 230, 0.8)' }}>
            <span className="font-semibold" style={{ color: '#C47171' }}>Trigger:</span> {trigger}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <AlertTriangle size={14} color="#C47171" className="mt-1 shrink-0" />
          <p className="font-body text-[0.9rem] leading-relaxed" style={{ color: 'rgba(245, 240, 230, 0.8)' }}>
            <span className="font-semibold" style={{ color: '#C47171' }}>Effect:</span> {effect}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <ShieldAlert size={14} color="#8FA678" className="mt-1 shrink-0" />
          <p className="font-body text-[0.9rem] leading-relaxed" style={{ color: 'rgba(245, 240, 230, 0.8)' }}>
            <span className="font-semibold" style={{ color: '#8FA678' }}>Countermeasure:</span> {countermeasure}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SCENE DATA                                                         */
/* ------------------------------------------------------------------ */

interface SceneData {
  id: string;
  number: number;
  title: string;
  icon: React.ElementType;
  accent: string;
  bgTint: string;
}

const scenes: SceneData[] = [
  { id: 'scene-1', number: 1, title: 'Arrival in Okiri Village', icon: MapPin, accent: '#4A5D3F', bgTint: 'rgba(74, 93, 63, 0.04)' },
  { id: 'scene-2', number: 2, title: 'Meet the Quest Giver', icon: Users, accent: '#B87333', bgTint: 'rgba(184, 115, 51, 0.04)' },
  { id: 'scene-3', number: 3, title: 'Entering the Workshop', icon: Home, accent: '#6B4C7A', bgTint: 'rgba(107, 76, 122, 0.04)' },
  { id: 'scene-4', number: 4, title: 'The Cellar & The Stairs', icon: Compass, accent: '#3E4A5E', bgTint: 'rgba(62, 74, 94, 0.04)' },
  { id: 'scene-5', number: 5, title: 'The Workshop Floor', icon: Wand2, accent: '#8B3A3A', bgTint: 'rgba(139, 58, 58, 0.04)' },
  { id: 'scene-6', number: 6, title: 'Conclusion', icon: Star, accent: '#C9A84C', bgTint: 'rgba(201, 168, 76, 0.04)' },
];

/* ------------------------------------------------------------------ */
/*  ANIMATION VARIANTS                                                 */
/* ------------------------------------------------------------------ */

const revealUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

const revealScale = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

/* ------------------------------------------------------------------ */
/*  SCENE NAVIGATOR                                                    */
/* ------------------------------------------------------------------ */

function SceneNavigator() {
  return (
    <nav className="sticky top-0 z-50 glass-nav border-b" style={{ borderColor: 'rgba(184,115,51,0.15)' }}>
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <span
            className="text-[0.7rem] tracking-[0.12em] uppercase hidden sm:block"
            style={{ fontFamily: "'Cinzel Decorative', serif", color: '#D4956A' }}
          >
            Scene Navigator
          </span>
          <div className="flex items-center gap-2 flex-wrap justify-center w-full sm:w-auto">
            {scenes.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-300"
                style={{ background: 'rgba(184,115,51,0.08)', border: '1px solid rgba(184,115,51,0.15)' }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[0.65rem] font-bold transition-colors duration-300"
                  style={{ background: s.accent, color: '#1A1410' }}
                >
                  {s.number}
                </span>
                <span
                  className="text-[0.75rem] hidden md:block transition-colors duration-300 group-hover:text-white"
                  style={{ color: 'rgba(245,240,230,0.65)' }}
                >
                  {s.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  NEXT SCENE BUTTON                                                  */
/* ------------------------------------------------------------------ */

function NextSceneButton({ targetId, label }: { targetId: string; label: string }) {
  const scene = scenes.find((s) => s.id === targetId);
  if (!scene) return null;
  return (
    <div className="flex justify-center my-10">
      <a
        href={`#${targetId}`}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, rgba(184,115,51,0.2) 0%, rgba(45,32,22,0.6) 100%)',
          border: '1px solid rgba(184,115,51,0.3)',
        }}
      >
        <div className="flex flex-col items-start">
          <span className="text-[0.65rem] tracking-[0.12em] uppercase" style={{ fontFamily: "'Cinzel Decorative', serif", color: '#D4956A' }}>
            Next Scene
          </span>
          <span className="text-[0.95rem] font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>
            {label}
          </span>
        </div>
        <ChevronDown size={20} color="#B87333" className="transition-transform duration-300 group-hover:translate-y-0.5" />
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  STICKY SCENE HEADER                                                */
/* ------------------------------------------------------------------ */

function SceneHeader({ scene }: { scene: SceneData }) {
  const Icon = scene.icon;
  return (
    <div
      className="sticky top-[60px] z-40 py-4 px-4 sm:px-6 border-b border-t backdrop-blur-md"
      style={{
        background: `rgba(26, 20, 16, 0.92)`,
        borderColor: `${scene.accent}33`,
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${scene.accent}22`, border: `1px solid ${scene.accent}44` }}
        >
          <Icon size={18} color={scene.accent} />
        </div>
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="text-[1.2rem] font-bold shrink-0"
            style={{ fontFamily: "'Cinzel Decorative', serif", color: scene.accent }}
          >
            {scene.number}
          </span>
          <h2
            className="text-[1.3rem] sm:text-[1.6rem] font-semibold truncate"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}
          >
            {scene.title}
          </h2>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAP DISPLAY                                                        */
/* ------------------------------------------------------------------ */

function MapDisplay({ src, caption }: { src: string; caption: string }) {
  return (
    <motion.div
      variants={revealScale}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="my-6 rounded-xl overflow-hidden"
      style={{ border: '1px solid rgba(184,115,51,0.2)' }}
    >
      <img src={src} alt={caption} loading="lazy" decoding="async" className="w-full h-auto object-cover" />
      <div className="px-4 py-2.5 text-center" style={{ background: 'rgba(45,32,22,0.5)' }}>
        <span className="text-[0.75rem] tracking-wider uppercase" style={{ fontFamily: "'Cinzel Decorative', serif", color: '#D4956A' }}>
          {caption}
        </span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  CREATURE CARD                                                      */
/* ------------------------------------------------------------------ */

function CreatureCard({ src, name, subtitle }: { src: string; name: string; subtitle?: string }) {
  return (
    <motion.div
      variants={revealScale}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex items-center gap-4 p-4 rounded-xl my-5"
      style={{ background: 'rgba(45,32,22,0.5)', border: '1px solid rgba(184,115,51,0.2)' }}
    >
      <img src={src} alt={name} loading="lazy" decoding="async" className="w-20 h-20 rounded-lg object-cover shrink-0" style={{ border: '1px solid rgba(184,115,51,0.3)' }} />
      <div>
        <p className="text-[1.05rem] font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>
          {name}
        </p>
        {subtitle && (
          <p className="text-[0.85rem] mt-1" style={{ color: 'rgba(245,240,230,0.6)' }}>
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO SECTION                                                       */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="/cover_art.jpeg" alt="Adventure Cover" className="w-full h-full object-cover opacity-30" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(26,20,16,0.3) 0%, rgba(26,20,16,0.8) 60%, #1A1410 100%)' }}
        />
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span
            className="text-[0.75rem] tracking-[0.2em] uppercase block mb-4"
            style={{ fontFamily: "'Cinzel Decorative', serif", color: '#D4956A' }}
          >
            Adventure Flow
          </span>
          <h1
            className="text-display-lg mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}
          >
            The Witch&apos;s Workshop
          </h1>
          <p className="text-[1.1rem] max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.7)' }}>
            A step-by-step guide for the Dungeon Master. Follow these six scenes in order
            as your players journey from Okiri Village through Miss Lindley&apos;s enchanted workshop.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 flex justify-center"
        >
          <a
            href="#scene-1"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('scene-1')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center gap-2 group"
          >
            <span className="text-[0.7rem] tracking-widest uppercase" style={{ fontFamily: "'Cinzel Decorative', serif", color: '#B87333' }}>
              Begin
            </span>
            <ChevronDown size={20} color="#B87333" className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTENT WRAPPER                                                    */
/* ------------------------------------------------------------------ */

function Content({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-w-4xl mx-auto px-4 sm:px-6 py-8 ${className}`}>{children}</div>;
}

function SectionTitle({ children, color = '#F5F0E6' }: { children: React.ReactNode; color?: string }) {
  return (
    <motion.h3
      variants={revealUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={0}
      className="text-[1.4rem] font-semibold mt-10 mb-4"
      style={{ fontFamily: "'Cormorant Garamond', serif", color }}
    >
      {children}
    </motion.h3>
  );
}

function BodyText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.p
      variants={revealUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={0}
      className={`font-body text-[1rem] leading-relaxed my-4 ${className}`}
      style={{ color: 'rgba(245,240,230,0.85)' }}
    >
      {children}
    </motion.p>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <motion.ul
      variants={revealUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={0}
      className="space-y-2.5 my-5 ml-4"
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#B87333' }} />
          <span className="font-body text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>
            {item}
          </span>
        </li>
      ))}
    </motion.ul>
  );
}

/* ================================================================== */
/*  MAIN PAGE COMPONENT                                                */
/* ================================================================== */

export default function AdventureFlow() {
  return (
    <div className="min-h-screen" style={{ background: '#1A1410', color: '#F5F0E6' }}>
      <SceneNavigator />
      <HeroSection />

      {/* ======================== SCENE 1 ======================== */}
      <section id="scene-1" className="relative" style={{ background: scenes[0].bgTint }}>
        <SceneHeader scene={scenes[0]} />
        <Content>
          <ReadAloud title="Read Aloud">
            Quaint, charming, and idyllic, Okiri is a farming village nestled in rolling hills between a modest wood and a
            lazy river. It&apos;s a place where everyone knows everyone else. The river flows south from Mount Arbora,
            intersecting with an east-west road, placing Okiri on a crossroads. Travelers frequently pass through,
            bringing news from the outside world, but generally Okiri has remained somewhat insulated from the larger
            dangers that lurk in the vast expanse of the Gale Fields just beyond the farmland.
          </ReadAloud>

          <DMSecret>
            Set a warm, comforting tone. Okiri is a feel-good village — nothing catastrophic happens here. The people
            seem unconcerned with the world&apos;s troubles, possibly to their detriment. Let players explore and make
            connections with villagers. This can become a beloved home base they return to throughout the campaign.
          </DMSecret>

          <SectionTitle color="#8FA678">Village Details</SectionTitle>
          <BulletList
            items={[
              <>
                <strong>Population:</strong> Mixed Nakudama, humans, and elves
              </>,
              <>
                <strong>Known for:</strong> Sheep dragon wool (hats, sweaters, cloth, blankets)
              </>,
              <>The village sigil depicts a sheep dragon</>,
              <>Trades are handed down through generations</>,
              <>
                Light governance — issues handled among themselves, major disputes go to the{' '}
                <strong>High Hall</strong>
              </>,
              <>For travelers heading east, Okiri is the last settlement before the Gale Fields</>,
              <>Courier Brigade maintains an outpost here</>,
            ]}
          />

          <SkillCheck
            dc={12}
            skill="Intelligence (History)"
            title="Village Knowledge"
            pass="Knows about the sheep dragon wool trade and that Okiri is a crossroads village."
            fail="No particular knowledge."
          />

          <NextSceneButton targetId="scene-2" label="Scene 2: Meet the Quest Giver" />
        </Content>
      </section>

      {/* ======================== SCENE 2 ======================== */}
      <section id="scene-2" className="relative" style={{ background: scenes[1].bgTint }}>
        <SceneHeader scene={scenes[1]} />
        <Content>
          <ReadAloud title="Read Aloud">
            As they wander through Okiri Village, the party hears the sound of weeping. When they investigate, they find
            Lomi, a 13 year old boy, sitting on a stone across from a small, wooden house with his head in his hands.
            Next to him is a sad-looking pack mule loaded with several sacks, each marked with the insignia of the
            Courier Brigade.
          </ReadAloud>

          <div className="flex flex-col sm:flex-row gap-6 my-6">
            <div className="sm:w-1/3 shrink-0">
              <motion.img
                variants={revealScale}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                src="/npc_lomi.jpeg"
                alt="Lomi, the young courier"
                className="w-full rounded-xl object-cover"
                style={{ border: '1px solid rgba(184,115,51,0.3)' }}
              />
              <p className="text-center text-[0.8rem] mt-2" style={{ color: 'rgba(245,240,230,0.5)' }}>
                Lomi, the would-be postal knight
              </p>
            </div>
            <div className="sm:w-2/3">
              <SectionTitle color="#D4956A">Lomi&apos;s Dilemma</SectionTitle>
              <BulletList
                items={[
                  <>Lomi is the younger brother of <strong>Ashi</strong>, a knight of the Courier Brigade</>,
                  <>He&apos;s wanted to be a postal knight his whole life to impress his older sister</>,
                  <>One of the postal knights fell ill, so Ashi entrusted Lomi with deliveries as a first test</>,
                  <>
                    He delivered a letter to the <strong>WRONG address</strong> — Miss Lindley&apos;s workshop
                    instead of Mrs. Linfrey&apos;s
                  </>,
                  <>He can&apos;t get inside to retrieve it</>,
                  <>If he returns and admits the mistake, his dreams are over</>,
                ]}
              />
            </div>
          </div>

          <SkillCheck
            dc={14}
            skill="Intelligence"
            title="Know Miss Lindley"
            pass="Has heard of Miss Lindley — the local witch and fixer/mender of goods."
            fail="No prior knowledge."
            advantage="Witches/warlocks have advantage."
          />

          <DMSecret heading="Lomi's Offer">
            Lomi is desperate. He offers: a few sea petals, a couple of non-magical First Age trinkets, his services as
            an assistant, and the gold flowers he would earn for the delivery. He may offer more than he actually has.
          </DMSecret>

          <SectionTitle color="#D4956A">Negotiation Skill Checks</SectionTitle>
          <SkillCheck
            dc={12}
            skill="Charisma (Persuasion)"
            title="Convince Lomi to share what's in the letter"
            pass="He refuses, says it's dishonorable"
            fail="He refuses, says it's dishonorable"
          />
          <SkillCheck
            dc={14}
            skill="Charisma (Deception)"
            title="Convince Lomi you'll handle it quietly"
            pass="He agrees but insists on waiting outside"
            fail="He remains cautious"
          />
          <SkillCheck
            dc={10}
            skill="Wisdom (Insight)"
            title="Tell if Lomi is hiding something"
            pass="He's genuinely desperate, not hiding anything"
            fail="Uncertain"
          />

          <NextSceneButton targetId="scene-3" label="Scene 3: Entering the Workshop" />
        </Content>
      </section>

      {/* ======================== SCENE 3 ======================== */}
      <section id="scene-3" className="relative" style={{ background: scenes[2].bgTint }}>
        <SceneHeader scene={scenes[2]} />
        <Content>
          <motion.img
            variants={revealScale}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            src="/hero_workshop_interior.jpeg"
            alt="The Witch's Workshop Interior"
            className="w-full rounded-xl my-6 object-cover max-h-[300px]"
            style={{ border: '1px solid rgba(107,76,122,0.3)' }}
          />

          <ReadAloud title="Approaching the Workshop">
            Miss Lindley&apos;s workshop is a small and humble wooden house in Okiri Village. There is a little cobble
            path that leads to the front door, which is painted a bright green. A sign that hangs above the door reads
            &quot;closed&quot; written in faded cursive. On either side of the front entrance are Boom Beri bushes,
            which have been picked clean of fruit. The windows all across the house have been frosted over, and numerous
            birds have begun to nest on the tiled roof.
          </ReadAloud>

          <DMSecret heading="Workshop Facts">
            <BulletList
              items={[
                <>The workshop is <strong>magical and invulnerable</strong></>,
                <>It has various spells and enchantments Miss Lindley placed over the years</>,
                <>No chimney or other small entrances — only doors and windows</>,
                <>Entrances are magically locked when Miss Lindley is away</>,
                <>
                  The <strong>ONLY non-magical entrance</strong> is the padlocked cellar door in the back, covered in
                  ivy
                </>,
              ]}
            />
          </DMSecret>

          <TrapWarning
            name="The Shrink Trap"
            trigger="The instant the last party member enters the house"
            effect="All creatures are shrunk to Tiny size. All open doors and windows slam shut and magically re-lock."
            countermeasure="If party members stay outside, they remain normal size. They can enter later but will also shrink. A powerful Dispel Magic spell could temporarily unlock a window or door."
          />

          <SectionTitle color="#A084B0">Three Ways to Enter</SectionTitle>

          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="p-5 rounded-xl my-4"
            style={{ background: 'rgba(74,93,63,0.12)', border: '1px solid rgba(74,93,63,0.3)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="px-2 py-0.5 rounded text-[0.6rem] tracking-wider uppercase font-bold"
                style={{ background: 'rgba(74,93,63,0.3)', color: '#8FA678' }}
              >
                RECOMMENDED
              </span>
            </div>
            <h4 className="text-[1.1rem] font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>
              1. Cellar Doors
            </h4>
            <p className="text-[0.95rem] leading-relaxed mb-3" style={{ color: 'rgba(245,240,230,0.8)' }}>
              Non-magical, ivy-covered double door in the back. Leads directly to the cellar and staircase.
            </p>
            <SkillCheck
              dc={13}
              skill="Dexterity (Thieves' Tools)"
              title="Pick the cellar lock"
              pass="Lock opens"
              fail="Requires another attempt or force"
            />
          </motion.div>

          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="p-5 rounded-xl my-4"
            style={{ background: 'rgba(107,76,122,0.08)', border: '1px solid rgba(107,76,122,0.2)' }}
          >
            <h4 className="text-[1.1rem] font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>
              2. Windows
            </h4>
            <p className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>
              Magically locked — require <strong>Dispel Magic</strong> or similar to temporarily enter. Difficult at 2nd
              level but not impossible for clever players. Leads directly to the main floor (skips cellar, stairs, and
              Emerson).
            </p>
          </motion.div>

          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="p-5 rounded-xl my-4"
            style={{ background: 'rgba(107,76,122,0.08)', border: '1px solid rgba(107,76,122,0.2)' }}
          >
            <h4 className="text-[1.1rem] font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>
              3. Front Door
            </h4>
            <p className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>
              Magically locked — same as windows. Also leads directly to the main floor.
            </p>
          </motion.div>

          <DMSecret heading="Skipping Content">
            Be prepared if clever adventurers use <strong>Dispel Magic</strong> to skip past the cellar, staircase, and
            Emerson the cat. They would jump straight to the workshop&apos;s Main Floor. Have the pixies and Venus Fly
            Rat ready regardless.
          </DMSecret>

          <NextSceneButton targetId="scene-4" label="Scene 4: The Cellar & The Stairs" />
        </Content>
      </section>

      {/* ======================== SCENE 4 ======================== */}
      <section id="scene-4" className="relative" style={{ background: scenes[3].bgTint }}>
        <SceneHeader scene={scenes[3]} />
        <Content>
          <ReadAloud title="Entering the Cellar">
            This shadowy cellar smells of damp earth and some pungent, unrecognizable odor — perhaps from the centuries
            of bubbling concoctions that now stain the earthen floor. Magic flames flicker within soot-caked lanterns
            that hang on the walls, each casting an eerie glow upon old wooden crates and rows of sagging shelves that
            hold all manner of dust-covered bottles and curios — some of which are covered in sackcloth.
          </ReadAloud>

          <MapDisplay src="/map_cellar_faithful.jpeg" caption="Cellar Battlemap (3x3 Grid)" />

          <ReadAloud title="The Shrink">
            As the last of you steps off the staircase, the ground illuminates in sporadic arcane glyphs that cover the
            cellar floor. In an instant your perspective warps, your eyes blur before focusing once more on the world
            around you. As you look about you quickly conclude that you&apos;ve either shrunk down to the size of a
            mouse or this house is a lot more spacious inside than you initially anticipated.
          </ReadAloud>

          <DMSecret heading="Shrink Mechanics">
            <BulletList
              items={[
                <>All party members become <strong>Tiny size</strong> immediately</>,
                <>All doors and windows magically shut and lock</>,
                <>Dust falls from the ceiling as they slam</>,
                <>If anyone stayed outside, they remain normal size unless they enter</>,
                <>All stat blocks in this adventure are relative to Tiny size</>,
                <>Players may panic — give them a moment to process</>,
              ]}
            />
          </DMSecret>

          <SectionTitle color="#6B7FA0">Searching the Cellar</SectionTitle>
          <BodyText>
            A search of crates and shelves reveals: giant paw prints and claw marks from what appears to be a cat;
            spoiled and unfinished elixirs and potions; an uncommon ingredient from a region other than Gift of
            Shuritashi; and an old, broken First Age trinket.
          </BodyText>

          <SkillCheck
            dc={12}
            skill="Intelligence (Investigation)"
            title="Search the Cellar"
            pass="Finds one item of DM's choice plus a clue about the shrink glyphs."
            fail="Finds only dust and cobwebs."
          />

          <SkillCheck
            dc={13}
            skill="Dexterity (Stealth)"
            title="Avoid alerting Emerson"
            pass="Emerson remains asleep."
            fail="Emerson is alerted and skulks over to investigate."
          />

          <DMSecret heading="Alerting Emerson">
            If adventurers make a ruckus (failed Stealth check, loud spell, etc.), their activity alerts Emerson the
            cat.
          </DMSecret>

          <SectionTitle color="#6B7FA0">The Staircase</SectionTitle>
          <ReadAloud>
            What would ordinarily be a normal staircase is now a series of towering steps, each one about 15 feet tall
            that lead up to a landing piled with books and boxes.
          </ReadAloud>

          <div className="p-5 rounded-xl my-5" style={{ background: 'rgba(62,74,94,0.12)', border: '1px solid rgba(107,127,160,0.2)' }}>
            <h4 className="text-[0.8rem] tracking-[0.12em] uppercase mb-3" style={{ fontFamily: "'Cinzel Decorative', serif", color: '#6B7FA0' }}>
              Stair Mechanics
            </h4>
            <BulletList
              items={[
                <>Each step is ~15 feet tall relative to Tiny characters</>,
                <>Normal climbing speed or DC 14 Strength (Athletics) to scale each step</>,
                <>The staircase is rickety and wooden</>,
                <>At the top: the hallway and Emerson&apos;s cushion</>,
              ]}
            />
            <SkillCheck
              dc={14}
              skill="Strength (Athletics)"
              title="Scale the giant stairs"
              pass="Climb successfully."
              fail="Slip and fall, take 1d6 bludgeoning, must retry."
            />
          </div>

          <SectionTitle color="#C47171">BUG ATTACK! (Optional Encounter)</SectionTitle>
          <BodyText>
            While adventurers strenuously climb the stairs, they are ambushed by bora bugs. They crawl from cracks in
            the walls — bioluminescent, emitting dim light in 10ft radius.
          </BodyText>

          <CreatureCard
            src="/creature_bora_bug.jpeg"
            name="Giant Bora Bug"
            subtitle="1d4+1 creatures · AC 12 · HP 22 · Horn Strike +3/5(1d8+1)"
          />

          <div className="p-5 rounded-xl my-5" style={{ background: 'rgba(139,58,58,0.08)', border: '1px solid rgba(139,58,58,0.2)' }}>
            <h4 className="text-[0.8rem] tracking-[0.12em] uppercase mb-3" style={{ fontFamily: "'Cinzel Decorative', serif", color: '#C47171' }}>
              Bora Bug Quick Reference
            </h4>
            <div className="grid grid-cols-2 gap-3 text-[0.85rem]" style={{ color: 'rgba(245,240,230,0.8)' }}>
              <div>
                <strong style={{ color: '#C9A84C' }}>AC</strong> 12
              </div>
              <div>
                <strong style={{ color: '#C9A84C' }}>HP</strong> 22
              </div>
              <div className="col-span-2">
                <strong style={{ color: '#C9A84C' }}>Horn Strike:</strong> +3 to hit, 5(1d8+1) piercing
              </div>
              <div className="col-span-2">
                <strong style={{ color: '#C9A84C' }}>Spike Flurry:</strong> DC 12 Dex save, 7(2d6) piercing
              </div>
            </div>
            <p className="text-[0.85rem] mt-3" style={{ color: 'rgba(245,240,230,0.6)' }}>
              <em>Alternative: If you skip the stair ambush, the bora bugs can attack after an avalanche in the hallway.</em>
            </p>
          </div>

          <SectionTitle color="#D4956A">Emerson, the Witch&apos;s Cat</SectionTitle>
          <BodyText>
            An imperious cat with a portly paunch, crooked whiskers, and thick fur sticking out at all angles. Uses{' '}
            <strong>Lion stats with Intelligence 11</strong>. Found sleeping atop a cushion embroidered with
            &quot;Emerson.&quot; Guards the stairs like a dragon guarding its lair.
          </BodyText>

          <BulletList
            items={[
              <>
                <strong>If alerted and hungry:</strong> Skulks over to investigate
              </>,
              <>
                <strong>If alerted and lazy:</strong> Waits atop his cushion, idly licking a paw
              </>,
              <>
                Can be <strong>befriended</strong> with DC 13 Charisma (Animal Handling) or offering food
              </>,
              <>
                <strong>If befriended:</strong> Barters knowledge (see below)
              </>,
            ]}
          />

          <DMSecret heading="What Emerson Knows">
            <BulletList
              items={[
                <>Knows which potion on the work table restores size</>,
                <>May know what some other items in the workshop do</>,
                <>
                  <strong>If he trusts the party:</strong> Gives info upfront, wants treats retrieved from bookcase
                </>,
                <>
                  <strong>If he doesn&apos;t trust:</strong> Holds back knowledge until treats are delivered
                </>,
                <>His treats were hidden atop the bookcase by the pixies</>,
              ]}
            />
          </DMSecret>

          <SkillCheck
            dc={13}
            skill="Charisma (Animal Handling)"
            title="Befriend Emerson"
            pass="Emerson offers information in exchange for treats."
            fail="Emerson remains aloof and suspicious."
          />

          <NextSceneButton targetId="scene-5" label="Scene 5: The Workshop Floor" />
        </Content>
      </section>

      {/* ======================== SCENE 5 ======================== */}
      <section id="scene-5" className="relative" style={{ background: scenes[4].bgTint }}>
        <SceneHeader scene={scenes[4]} />
        <Content>
          <MapDisplay src="/map_main_floor_faithful.jpeg" caption="Main Floor Battlemap (4x3 Grid)" />

          <SectionTitle color="#C47171">The Hallway</SectionTitle>
          <ReadAloud>
            The narrow hallway is piled with old books, papers, jars, and other various clutter. To a tiny creature,
            traveling along here would be a perilous affair, like crossing through a canyon with unstable cliffs.
          </ReadAloud>

          <TrapWarning
            name="Book Avalanche"
            trigger="Pixies angered or Emerson startled in hallway"
            effect="Creatures in area fall prone. DC 15 Strength save or take 1d10 bludgeoning damage and become Restrained. Success: Half damage, not Restrained."
            countermeasure="Avoid angering pixies or startling Emerson. Move carefully through the hallway."
          />

          <SectionTitle color="#D4956A">The Bookcase</SectionTitle>
          <BodyText>
            A tall bookcase filled with papers, notebooks, dusty tomes about witchcraft. It contains hidden secrets
            among its shelves.
          </BodyText>

          <SkillCheck
            dc={13}
            skill="Intelligence (Investigation)"
            title="Find the Letter in the bookcase"
            pass="Finds the letter in 1 minute."
            fail="Takes 10 minutes, may attract pixie attention."
          />
          <SkillCheck
            dc={12}
            skill="Dexterity (Acrobatics)"
            title="Climb the bookcase for Emerson's treats"
            pass="Reaches the top and retrieves the treats."
            fail="Knocks books loose (potential avalanche)."
          />

          <DMSecret heading="Bookcase Contents">
            <ol className="space-y-2 my-4 ml-4 list-decimal list-inside">
              <li className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>
                A cassette with the spell <strong style={{ color: '#C9A84C' }}>&quot;Vegetable Blade&quot;</strong>{' '}
                stored inside (functions as a scroll)
              </li>
              <li className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>
                Potion recipe for <strong style={{ color: '#C9A84C' }}>Elder Elixir</strong> (Ingredients: Spindle
                Leg Spider Webs, Origami Crane, Brush Reed)
              </li>
              <li className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>
                <strong style={{ color: '#8FA678' }}>Mrs. Linfrey&apos;s letter</strong> — hidden here by the pixies!
              </li>
              <li className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>
                At the top: A sachet embroidered with &quot;Emerson&quot; containing pungent cat treats
              </li>
            </ol>
          </DMSecret>

          <SectionTitle color="#A084B0">Pesky Pixies — Tina and Meena</SectionTitle>

          <CreatureCard
            src="/creature_giant_pixie.jpeg"
            name="Giant Pixie (Tina & Meena)"
            subtitle="AC 14 · HP 22 · Magic Resistance · Innate Spellcasting"
          />

          <BodyText>
            Two giant pixies overjoyed to discover Tiny adventurers. They immediately invent &quot;games&quot; —
            casting spells at the party. Tina and Meena may take bets on who Emerson will eat or who reaches the table
            first. They can magically close shutters and douse candles, plunging the workshop into darkness.
          </BodyText>

          <div className="p-5 rounded-xl my-5" style={{ background: 'rgba(107,76,122,0.08)', border: '1px solid rgba(107,76,122,0.2)' }}>
            <h4 className="text-[0.8rem] tracking-[0.12em] uppercase mb-3" style={{ fontFamily: "'Cinzel Decorative', serif", color: '#A084B0' }}>
              Pixie Spell List
            </h4>
            <p className="text-[0.9rem] mb-2" style={{ color: 'rgba(245,240,230,0.8)' }}>
              <strong style={{ color: '#C9A84C' }}>At will:</strong> Druidcraft, Jolt, Root Grab, Transparency
            </p>
            <p className="text-[0.9rem]" style={{ color: 'rgba(245,240,230,0.8)' }}>
              <strong style={{ color: '#C9A84C' }}>1/day each:</strong> Confusion, Control Animal, Detect Thoughts,
              Entangle, Obscure Object, Pacify Person, Sleep, Whelm Weapon
            </p>
            <p className="text-[0.85rem] mt-2" style={{ color: '#6B7FA0' }}>
              <em>Spell save DC 13 (Charisma-based)</em>
            </p>
          </div>

          <DMSecret heading="Pixie Tactics">
            <BulletList
              items={[
                <>Lead party astray with false directions</>,
                <>Cast <strong>Confusion</strong> on clustered party members</>,
                <>Use <strong>Entangle</strong> to trap adventurers</>,
                <>Use <strong>Sleep</strong> on the weakest-looking character</>,
                <>
                  <strong>If befriended:</strong> May help identify magic items (make stuff up half the time)
                </>,
                <>
                  <strong>If angered:</strong> Book avalanches, doused lights, maximum chaos
                </>,
              ]}
            />
          </DMSecret>

          <SkillCheck
            dc={15}
            skill="Charisma (Persuasion/Performance)"
            title="Befriend the Pixies"
            pass="They become helpful (if unreliable)."
            fail="They double the mischief."
          />

          <SectionTitle color="#8FA678">Tabitha Turnip</SectionTitle>
          <BodyText>
            A turnip spirit, chronically grumpy. Only reveals herself to clean spills, put out fires, or deal with chaos.
            Responds with eye rolls, sighs, and sidelong glances.
          </BodyText>
          <DMSecret>
            She is the <strong>ONLY one who knows every magic item in the workshop for certain</strong>. Getting her to
            help identify items is &quot;a task worthy of the greatest of heroes.&quot;
          </DMSecret>

          <SectionTitle color="#D4956A">The Witch&apos;s Work Table</SectionTitle>
          <ReadAloud title="Getting on the Table">
            To get on to the table where the elixir is, the party will have to climb up the 60-foot tall wooden table
            legs and navigate the overhang to get onto the surface of the table top.
          </ReadAloud>

          <div className="p-5 rounded-xl my-5" style={{ background: 'rgba(184,115,51,0.08)', border: '1px solid rgba(184,115,51,0.2)' }}>
            <h4 className="text-[0.8rem] tracking-[0.12em] uppercase mb-3" style={{ fontFamily: "'Cinzel Decorative', serif", color: '#D4956A' }}>
              Table Climb Mechanics
            </h4>
            <BulletList
              items={[
                <>Climbing speed: Can reach top without issue</>,
                <>Others: DC 14 Strength (Athletics)</>,
                <>Pixies may cause mayhem during the climb</>,
              ]}
            />
          </div>

          <SkillCheck
            dc={14}
            skill="Strength (Athletics)"
            title="Climb the table"
            pass="Reaches tabletop."
            fail="Falls, takes 1d6 bludgeoning, must retry."
          />

          <MapDisplay src="/map_work_table_faithful.jpeg" caption="Work Table Battlemap" />

          <SectionTitle color="#C47171">The Venus Fly Rat</SectionTitle>
          <CreatureCard
            src="/creature_venus_fly_rat.jpeg"
            name="Venus Fly Rat"
            subtitle="AC 14 · HP 34 · Snap Jaw (grapple) · Pollen Burst (Confusion)"
          />

          <BodyText>
            Hiding amongst the mess on the work table. Originally intended as a potion ingredient, now freed and
            dangerous.
          </BodyText>

          <SkillCheck
            dc={14}
            skill="Wisdom (Perception)"
            title="Spot the Fly Rat"
            pass="Notice it before it attacks."
            fail="It attacks when someone gets close to the table center."
          />

          <div className="p-5 rounded-xl my-5" style={{ background: 'rgba(139,58,58,0.08)', border: '1px solid rgba(139,58,58,0.2)' }}>
            <h4 className="text-[0.8rem] tracking-[0.12em] uppercase mb-3" style={{ fontFamily: "'Cinzel Decorative', serif", color: '#C47171' }}>
              Combat Notes
            </h4>
            <BulletList
              items={[
                <>
                  <strong>Snap Jaw:</strong> Grapples (escape DC 12) and deals damage each turn
                </>,
                <>
                  <strong>Tail Strike:</strong> Reach 10ft
                </>,
                <>
                  <strong>Pollen Burst (recharge 5-6):</strong> Causes Confusion in 15ft cone
                </>,
                <>
                  <strong>Resistance:</strong> Resistant to nonmagical damage — low-level parties may struggle
                </>,
              ]}
            />
          </div>

          <SectionTitle color="#C9A84C">The Bubbling Cauldron</SectionTitle>
          <BodyText>
            A small iron cauldron over a First Age propane burner, containing an arcane mixture of herbs, liquids, and
            magic. The rim is 15 feet (relative) off the tabletop.
          </BodyText>

          <DMSecret heading="Cauldron Effects (d6)">
            <div className="grid grid-cols-1 gap-2 my-3">
              {[
                { roll: '1', effect: 'Everything is Funny — disadvantage on all rolls for 1 hour (DC 13 Int to resist laughing)' },
                { roll: '2-4', effect: 'Harness the Wind — feather fall effect for 5 minutes' },
                { roll: '5-6', effect: 'Touch of Nature — can cast Pillar of Force once (uses highest of Int/Wis/Cha)' },
              ].map((r) => (
                <div key={r.roll} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'rgba(201,168,76,0.08)' }}>
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[0.8rem] font-bold shrink-0"
                    style={{ background: 'rgba(201,168,76,0.2)', color: '#C9A84C' }}
                  >
                    {r.roll}
                  </span>
                  <p className="text-[0.9rem] leading-relaxed pt-1" style={{ color: 'rgba(245,240,230,0.8)' }}>
                    {r.effect}
                  </p>
                </div>
              ))}
            </div>
          </DMSecret>

          <SectionTitle color="#8FA678">Potions on the Table</SectionTitle>
          <BodyText>
            The correct potion to restore normal size is somewhere on the table. Finding it requires trial and error
            (risky), Emerson&apos;s knowledge (if befriended), pixie &quot;help&quot; (they make stuff up half the time),
            or Tabitha (if somehow convinced to help).
          </BodyText>

          <div className="p-5 rounded-xl my-5" style={{ background: 'rgba(74,93,63,0.08)', border: '1px solid rgba(74,93,63,0.2)' }}>
            <h4 className="text-[0.8rem] tracking-[0.12em] uppercase mb-3" style={{ fontFamily: "'Cinzel Decorative', serif", color: '#8FA678' }}>
              Other Potions Found
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[0.85rem]" style={{ color: 'rgba(245,240,230,0.8)' }}>
              <div>
                <strong style={{ color: '#C47171' }}>Combat:</strong> Candlecap, Heroism
              </div>
              <div>
                <strong style={{ color: '#6B7FA0' }}>Utility:</strong> Flip and Skip, Cat&apos;s Eye
              </div>
              <div className="sm:col-span-2">
                <strong style={{ color: '#A084B0' }}>Whimsical:</strong> Bubble Message, Merriment, Melodious Bird
                Calls, Ladybug Kinship, Beard Brew
              </div>
            </div>
          </div>

          <NextSceneButton targetId="scene-6" label="Scene 6: Conclusion" />
        </Content>
      </section>

      {/* ======================== SCENE 6 ======================== */}
      <section id="scene-6" className="relative" style={{ background: scenes[5].bgTint }}>
        <SceneHeader scene={scenes[5]} />
        <Content>
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-center py-8"
          >
            <Volume2 size={32} color="#C9A84C" className="mx-auto mb-4" />
            <h3
              className="text-[1.8rem] font-semibold mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A84C' }}
            >
              Escape!
            </h3>
            <p className="text-[1rem] max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.7)' }}>
              If all goes well, the adventurers drink the correct potion, return to normal size, retrieve Mrs.
              Linfrey&apos;s letter, and escape the workshop.
            </p>
          </motion.div>

          <div className="p-5 rounded-xl my-6" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)' }}>
            <h4 className="text-[0.8rem] tracking-[0.12em] uppercase mb-4" style={{ fontFamily: "'Cinzel Decorative', serif", color: '#C9A84C' }}>
              What Happens Next
            </h4>
            <ol className="space-y-3 ml-4 list-decimal list-inside">
              <li className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.85)' }}>
                Drink the correct potion and return to <strong>normal size</strong>
              </li>
              <li className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.85)' }}>
                Retrieve <strong>Mrs. Linfrey&apos;s letter</strong>
              </li>
              <li className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.85)' }}>
                <em>(Optional)</em> Grab the <strong>Vegetable Blade</strong> cassette and{' '}
                <strong>Elder Elixir</strong> recipe
              </li>
              <li className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.85)' }}>
                <strong>Escape</strong> the workshop
              </li>
            </ol>
          </div>

          <SectionTitle color="#C9A84C">Lomi&apos;s Reaction</SectionTitle>
          <BodyText>
            Overjoyed, thanks the party profusely. May accompany them as an NPC. He makes a useful (if inexperienced)
            ally.
          </BodyText>

          <DMSecret heading="Mrs. Linfrey's Letter">
            <BulletList
              items={[
                <>
                  If the party opens the letter: <strong>Lomi is HORRIFIED</strong>, tries to dissuade them
                </>,
                <>Opening it is a dishonorable act</>,
                <>Lomi will report them to the Courier Brigade (consequences in later adventures)</>,
                <>
                  Possible contents (DM&apos;s choice): a hook into the next adventure; a confession (of love or a
                  misdeed); an invitation to a secret witch&apos;s costume ball
                </>,
              ]}
            />
          </DMSecret>

          <SectionTitle color="#D4956A">Continuing the Adventure</SectionTitle>

          <div className="space-y-4 my-6">
            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="p-5 rounded-xl"
              style={{ background: 'rgba(184,115,51,0.08)', border: '1px solid rgba(184,115,51,0.2)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Scroll size={16} color="#B87333" />
                <h4 className="text-[1rem] font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#D4956A' }}>
                  Hook 1 — Deliver the Letter
                </h4>
              </div>
              <p className="text-[0.9rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>
                Lomi mentions the letter still needs delivering. Mrs. Linfrey may live in another city. This can lead to
                travel adventures across Obojima.
              </p>
            </motion.div>

            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="p-5 rounded-xl"
              style={{ background: 'rgba(74,93,63,0.08)', border: '1px solid rgba(74,93,63,0.2)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} color="#8FA678" />
                <h4 className="text-[1rem] font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#8FA678' }}>
                  Hook 2 — Lomi as Companion
                </h4>
              </div>
              <p className="text-[0.9rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>
                Lomi accompanies the party until the letter is delivered. He makes a useful (if inexperienced) NPC ally.
              </p>
            </motion.div>

            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              className="p-5 rounded-xl"
              style={{ background: 'rgba(107,76,122,0.08)', border: '1px solid rgba(107,76,122,0.2)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Wand2 size={16} color="#A084B0" />
                <h4 className="text-[1rem] font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#A084B0' }}>
                  Hook 3 — Miss Lindley&apos;s Return
                </h4>
              </div>
              <p className="text-[0.9rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.8)' }}>
                What happens if Miss Lindley returns while the party is still in her workshop? A potentially awkward —
                or dangerous — social encounter with a retired but powerful witch.
              </p>
            </motion.div>
          </div>

          <SectionTitle color="#C9A84C">Rewards Summary</SectionTitle>
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="p-6 rounded-xl my-6"
            style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.25)' }}
          >
            <ul className="space-y-2.5">
              {[
                <>
                  <strong style={{ color: '#C9A84C' }}>Quest Item:</strong> Mrs. Linfrey&apos;s letter
                </>,
                <>
                  <strong style={{ color: '#8FA678' }}>From Lomi:</strong> Sea petals and First Age trinkets
                </>,
                <>
                  <strong style={{ color: '#A084B0' }}>Spell:</strong> Vegetable Blade spell cassette
                </>,
                <>
                  <strong style={{ color: '#6B7FA0' }}>Recipe:</strong> Elder Elixir recipe
                </>,
                <>
                  <strong style={{ color: '#D4956A' }}>Potions:</strong> Any potions they successfully identified and
                  pocketed
                </>,
                <>
                  <strong style={{ color: '#C9A84C' }}>Ally:</strong> Lomi&apos;s loyalty and friendship
                </>,
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ChevronRight size={14} color="#C9A84C" className="mt-1 shrink-0" />
                  <span className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.85)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-center py-12"
          >
            <Star size={28} color="#C9A84C" className="mx-auto mb-4" />
            <h3
              className="text-[1.5rem] font-semibold mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A84C' }}
            >
              End of Adventure
            </h3>
            <p className="text-[1rem] max-w-xl mx-auto" style={{ color: 'rgba(245,240,230,0.5)' }}>
              Congratulations, Dungeon Master. The adventure is complete — but the story of Obojima is just beginning.
            </p>
          </motion.div>
        </Content>
      </section>
    </div>
  );
}
