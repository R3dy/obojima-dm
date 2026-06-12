import { motion } from 'framer-motion';
import {
  BookOpen,
  Eye,
  Dices,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Sparkles,
  AlertTriangle,
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
/*  READ ALOUD  — boxed text the DM reads to players                   */
/* ------------------------------------------------------------------ */

interface ReadAloudProps {
  children: React.ReactNode;
  title?: string;
}

export function ReadAloud({ children, title }: ReadAloudProps) {
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
        <span
          className="text-label text-[0.7rem] tracking-[0.12em] uppercase"
          style={{ color: '#A084B0' }}
        >
          {title ? title : 'Read Aloud'}
        </span>
      </div>
      <div
        className="font-body text-[1.05rem] leading-relaxed italic"
        style={{ color: '#E8DFF0' }}
      >
        {children}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  DM SECRET  — DM-only guidance                                       */
/* ------------------------------------------------------------------ */

interface DMSecretProps {
  children: React.ReactNode;
  heading?: string;
  label?: string;
}

export function DMSecret({ children, heading, label }: DMSecretProps) {
  const displayLabel = heading || label || 'DM Guidance';
  return (
    <motion.div
      variants={calloutVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={calloutTransition}
      className="relative rounded-xl p-5 my-6"
      style={{
        background: 'rgba(45, 32, 22, 0.6)',
        border: '1px dashed rgba(184, 115, 51, 0.4)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Eye size={15} color="#B87333" />
        <span
          className="text-label text-[0.7rem] tracking-[0.12em] uppercase"
          style={{ color: '#D4956A' }}
        >
          {displayLabel}
        </span>
      </div>
      <div
        className="font-body text-[0.95rem] leading-relaxed"
        style={{ color: 'rgba(245, 240, 230, 0.8)' }}
      >
        {children}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SKILL CHECK  — DC checks with pass / fail / advantage              */
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
  type: _type,
  title,
}: SkillCheckProps) {
  // Build display string from dc (number or string) + optional skill/title
  let displayDc: string;
  if (typeof dc === 'number') {
    displayDc = `DC ${dc}${skill ? ` ${skill}` : ''}${title ? ` — ${title}` : ''}${_type === 'check' ? '' : ''}`;
  } else {
    displayDc = dc;
  }

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
        <span
          className="text-label text-[0.7rem] tracking-[0.12em] uppercase"
          style={{ color: '#6B7FA0' }}
        >
          Skill Check
        </span>
      </div>

      <p
        className="font-body text-[1rem] font-semibold mb-3"
        style={{ color: '#F5F0E6' }}
      >
        {displayDc}
      </p>

      <div className="space-y-2">
        {pass && (
          <div className="flex items-start gap-2">
            <CheckCircle2
              size={15}
              color="#8FA678"
              className="mt-0.5 shrink-0"
            />
            <p
              className="font-body text-[0.9rem] leading-relaxed"
              style={{ color: 'rgba(245, 240, 230, 0.8)' }}
            >
              <span className="font-semibold" style={{ color: '#8FA678' }}>
                Pass:
              </span>{' '}
              {pass}
            </p>
          </div>
        )}
        {fail && (
          <div className="flex items-start gap-2">
            <XCircle
              size={15}
              color="#8B3A3A"
              className="mt-0.5 shrink-0"
            />
            <p
              className="font-body text-[0.9rem] leading-relaxed"
              style={{ color: 'rgba(245, 240, 230, 0.8)' }}
            >
              <span className="font-semibold" style={{ color: '#8B3A3A' }}>
                Fail:
              </span>{' '}
              {fail}
            </p>
          </div>
        )}
        {advantage && (
          <div className="flex items-start gap-2">
            <Sparkles
              size={15}
              color="#C9A84C"
              className="mt-0.5 shrink-0"
            />
            <p
              className="font-body text-[0.9rem] leading-relaxed"
              style={{ color: 'rgba(245, 240, 230, 0.8)' }}
            >
              <span className="font-semibold" style={{ color: '#C9A84C' }}>
                Advantage:
              </span>{' '}
              {advantage}
            </p>
          </div>
        )}
        {critical && (
          <div className="flex items-start gap-2">
            <Sparkles
              size={15}
              color="#C9A84C"
              className="mt-0.5 shrink-0"
            />
            <p
              className="font-body text-[0.9rem] leading-relaxed"
              style={{ color: 'rgba(245, 240, 230, 0.8)' }}
            >
              <span className="font-semibold" style={{ color: '#C9A84C' }}>
                Critical:
              </span>{' '}
              {critical}
            </p>
          </div>
        )}
      </div>
    </motion.div>
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

export function TrapWarning({
  name,
  trigger,
  effect,
  countermeasure,
}: TrapWarningProps) {
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
        <span
          className="text-label text-[0.7rem] tracking-[0.12em] uppercase"
          style={{ color: '#C47171' }}
        >
          Trap
        </span>
      </div>

      <p
        className="font-display text-[1.1rem] font-semibold mb-3"
        style={{ color: '#F5F0E6' }}
      >
        {name}
      </p>

      <div className="space-y-2.5">
        <div className="flex items-start gap-2">
          <AlertTriangle
            size={14}
            color="#C47171"
            className="mt-1 shrink-0"
          />
          <p
            className="font-body text-[0.9rem] leading-relaxed"
            style={{ color: 'rgba(245, 240, 230, 0.8)' }}
          >
            <span className="font-semibold" style={{ color: '#C47171' }}>
              Trigger:
            </span>{' '}
            {trigger}
          </p>
        </div>

        <div className="flex items-start gap-2">
          <AlertTriangle
            size={14}
            color="#C47171"
            className="mt-1 shrink-0"
          />
          <p
            className="font-body text-[0.9rem] leading-relaxed"
            style={{ color: 'rgba(245, 240, 230, 0.8)' }}
          >
            <span className="font-semibold" style={{ color: '#C47171' }}>
              Effect:
            </span>{' '}
            {effect}
          </p>
        </div>

        <div className="flex items-start gap-2">
          <ShieldAlert
            size={14}
            color="#8FA678"
            className="mt-1 shrink-0"
          />
          <p
            className="font-body text-[0.9rem] leading-relaxed"
            style={{ color: 'rgba(245, 240, 230, 0.8)' }}
          >
            <span className="font-semibold" style={{ color: '#8FA678' }}>
              Countermeasure:
            </span>{' '}
            {countermeasure}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
