import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Eye,
  EyeOff,
  Dices,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Sparkles,
  AlertTriangle,
  ChevronDown,
  Volume2,
  Square,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const calloutVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const calloutTransition = {
  duration: 0.45,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

/* ------------------------------------------------------------------ */
/*  READ ALOUD  — boxed text the DM reads to players (with TTS)         */
/* ------------------------------------------------------------------ */

interface ReadAloudProps {
  children: React.ReactNode;
  title?: string;
}

export function ReadAloud({ children, title }: ReadAloudProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [speaking, setSpeaking] = useState(false);
  const [supported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window);

  useEffect(() => {
    // Stop narration if the DM scrolls away or navigates.
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeak = () => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const text = contentRef.current?.textContent?.trim();
    if (!text) return;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    synth.speak(utterance);
  };

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
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <BookOpen size={16} color="#A084B0" />
          <span
            className="text-label text-[0.7rem] tracking-[0.12em] uppercase"
            style={{ color: '#A084B0' }}
          >
            {title ?? 'Read Aloud'}
          </span>
        </div>
        {supported && (
          <button
            type="button"
            onClick={toggleSpeak}
            aria-label={speaking ? 'Stop narration' : 'Read this text aloud'}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[0.7rem] font-semibold transition-colors shrink-0"
            style={{
              background: speaking ? 'rgba(139,58,58,0.2)' : 'rgba(107,76,122,0.2)',
              color: speaking ? '#C47171' : '#A084B0',
              border: `1px solid ${speaking ? 'rgba(139,58,58,0.4)' : 'rgba(107,76,122,0.4)'}`,
            }}
          >
            {speaking ? <Square size={12} /> : <Volume2 size={13} />}
            {speaking ? 'Stop' : 'Narrate'}
          </button>
        )}
      </div>
      <div
        ref={contentRef}
        className="font-body text-[1.05rem] leading-relaxed italic"
        style={{ color: '#E8DFF0' }}
      >
        {children}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  DM SECRET  — DM-only guidance, collapsed by default (spoiler-safe)  */
/* ------------------------------------------------------------------ */

interface DMSecretProps {
  children: React.ReactNode;
  heading?: string;
  label?: string;
  /** Override the default-collapsed behaviour if ever needed. */
  defaultOpen?: boolean;
}

export function DMSecret({ children, heading, label, defaultOpen = false }: DMSecretProps) {
  const displayLabel = heading ?? label ?? 'DM Guidance';
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      variants={calloutVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={calloutTransition}
      className="relative rounded-xl my-6"
      style={{
        background: 'rgba(45, 32, 22, 0.6)',
        border: '1px dashed rgba(184, 115, 51, 0.4)',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 p-5 text-left"
      >
        <span className="flex items-center gap-2">
          {open ? <Eye size={15} color="#B87333" /> : <EyeOff size={15} color="#B87333" />}
          <span
            className="text-label text-[0.7rem] tracking-[0.12em] uppercase"
            style={{ color: '#D4956A' }}
          >
            {displayLabel}
          </span>
          {!open && (
            <span className="text-[0.65rem] tracking-wide" style={{ color: 'rgba(245,240,230,0.4)' }}>
              — tap to reveal
            </span>
          )}
        </span>
        <ChevronDown
          size={16}
          color="#B87333"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
          className="shrink-0"
        />
      </button>
      {open && (
        <div
          className="font-body text-[0.95rem] leading-relaxed px-5 pb-5"
          style={{ color: 'rgba(245, 240, 230, 0.8)' }}
        >
          {children}
        </div>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SKILL CHECK  — DC checks with pass / fail / advantage / critical    */
/* ------------------------------------------------------------------ */

interface SkillCheckProps {
  dc: string | number;
  pass?: string;
  fail?: string;
  advantage?: string;
  critical?: string;
  skill?: string;
  type?: string;
  title?: string;
}

export function SkillCheck({
  dc,
  pass,
  fail,
  advantage,
  critical,
  skill,
  title,
}: SkillCheckProps) {
  const displayDc =
    typeof dc === 'number'
      ? `DC ${dc}${skill ? ` ${skill}` : ''}${title ? ` — ${title}` : ''}`
      : dc;

  return (
    <motion.div
      variants={calloutVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={calloutTransition}
      className="relative rounded-xl p-5 my-5"
      style={{
        background: 'rgba(62, 74, 94, 0.2)',
        border: '1px solid rgba(107, 127, 160, 0.3)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Dices size={16} color="#6B7FA0" />
        <span className="text-label text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: '#6B7FA0' }}>
          Skill Check
        </span>
      </div>

      <p className="font-body text-[1rem] font-semibold mb-3" style={{ color: '#F5F0E6' }}>
        {displayDc}
      </p>

      <div className="space-y-2">
        {pass && <Outcome icon={CheckCircle2} color="#8FA678" label="Pass" text={pass} />}
        {fail && <Outcome icon={XCircle} color="#8B3A3A" label="Fail" text={fail} />}
        {advantage && <Outcome icon={Sparkles} color="#C9A84C" label="Advantage" text={advantage} />}
        {critical && <Outcome icon={Sparkles} color="#C9A84C" label="Critical" text={critical} />}
      </div>
    </motion.div>
  );
}

function Outcome({
  icon: Icon,
  color,
  label,
  text,
}: {
  icon: typeof CheckCircle2;
  color: string;
  label: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={15} color={color} className="mt-0.5 shrink-0" />
      <p className="font-body text-[0.9rem] leading-relaxed" style={{ color: 'rgba(245, 240, 230, 0.8)' }}>
        <span className="font-semibold" style={{ color }}>
          {label}:
        </span>{' '}
        {text}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TRAP WARNING  — trap name, trigger, effect, countermeasure          */
/* ------------------------------------------------------------------ */

interface TrapWarningProps {
  name: string;
  trigger: string;
  effect: string;
  countermeasure: string;
}

export function TrapWarning({ name, trigger, effect, countermeasure }: TrapWarningProps) {
  return (
    <motion.div
      variants={calloutVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={calloutTransition}
      className="relative rounded-xl p-5 my-5"
      style={{
        background: 'rgba(139, 58, 58, 0.12)',
        border: '1px solid rgba(139, 58, 58, 0.35)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <ShieldAlert size={16} color="#C47171" />
        <span className="text-label text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: '#C47171' }}>
          Trap
        </span>
      </div>

      <p
        className="font-display text-[1.1rem] font-semibold mb-3"
        style={{ color: '#F5F0E6', fontFamily: "'Cormorant Garamond', serif" }}
      >
        {name}
      </p>

      <div className="space-y-2.5">
        <TrapRow icon={AlertTriangle} color="#C47171" label="Trigger" text={trigger} />
        <TrapRow icon={AlertTriangle} color="#C47171" label="Effect" text={effect} />
        <TrapRow icon={ShieldAlert} color="#8FA678" label="Countermeasure" text={countermeasure} />
      </div>
    </motion.div>
  );
}

function TrapRow({
  icon: Icon,
  color,
  label,
  text,
}: {
  icon: typeof AlertTriangle;
  color: string;
  label: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={14} color={color} className="mt-1 shrink-0" />
      <p className="font-body text-[0.9rem] leading-relaxed" style={{ color: 'rgba(245, 240, 230, 0.8)' }}>
        <span className="font-semibold" style={{ color }}>
          {label}:
        </span>{' '}
        {text}
      </p>
    </div>
  );
}
