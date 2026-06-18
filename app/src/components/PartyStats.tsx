import { useState } from 'react';
import {
  Shield,
  Eye,
  Heart,
  Minus,
  Plus,
  Users,
  RotateCcw,
  UserPlus,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

/**
 * A floating, scroll-following roster the DM keeps pinned to the left margin
 * while running a session. Each party member tracks the three numbers that
 * actually come up every round — AC, Passive Perception, and current HP — and
 * everything persists in localStorage so a refresh never loses the table state.
 */

interface PartyMember {
  id: string;
  name: string;
  ac: number;
  pp: number;
  hp: number;
  maxHp: number;
}

const ACCENT = '#B87333';

const defaultParty: PartyMember[] = [
  { id: 'pc-1', name: 'Fighter', ac: 16, pp: 11, hp: 12, maxHp: 12 },
  { id: 'pc-2', name: 'Rogue', ac: 14, pp: 14, hp: 9, maxHp: 9 },
  { id: 'pc-3', name: 'Wizard', ac: 12, pp: 12, hp: 8, maxHp: 8 },
  { id: 'pc-4', name: 'Cleric', ac: 15, pp: 13, hp: 10, maxHp: 10 },
];

function newId() {
  return `pc-${Date.now().toString(36)}`;
}

export default function PartyStats() {
  const [party, setParty] = useLocalStorage<PartyMember[]>('party-roster', defaultParty);
  const [collapsed, setCollapsed] = useLocalStorage<boolean>('party-roster-collapsed', false);

  const update = (id: string, patch: Partial<PartyMember>) =>
    setParty((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const stepHp = (id: string, delta: number) =>
    setParty((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, hp: Math.max(0, Math.min(m.maxHp, m.hp + delta)) } : m,
      ),
    );

  const addMember = () =>
    setParty((prev) => [
      ...prev,
      { id: newId(), name: `Hero ${prev.length + 1}`, ac: 13, pp: 12, hp: 10, maxHp: 10 },
    ]);

  const removeMember = (id: string) => setParty((prev) => prev.filter((m) => m.id !== id));

  const resetHp = () => setParty((prev) => prev.map((m) => ({ ...m, hp: m.maxHp })));

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        aria-label="Show party stats"
        className="fixed left-2 top-1/2 -translate-y-1/2 z-30 hidden min-[1450px]:flex flex-col items-center gap-2 px-2 py-4 rounded-r-xl transition-colors"
        style={{
          background: 'rgba(45,32,22,0.92)',
          border: `1px solid ${ACCENT}33`,
          borderLeft: 'none',
        }}
      >
        <ChevronRight size={16} color={ACCENT} />
        <Users size={16} color={ACCENT} />
        <span
          className="text-[0.6rem] tracking-[0.15em] uppercase"
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            color: '#D4956A',
            writingMode: 'vertical-rl',
          }}
        >
          Party
        </span>
      </button>
    );
  }

  return (
    <aside
      aria-label="Party stat chart"
      className="fixed left-3 top-24 z-30 hidden min-[1450px]:block w-[15rem] max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl backdrop-blur-md"
      style={{
        background: 'rgba(26,20,16,0.9)',
        border: `1px solid ${ACCENT}33`,
        boxShadow: '0 10px 40px rgba(0,0,0,0.45)',
      }}
    >
      {/* Header */}
      <div
        className="sticky top-0 flex items-center gap-2 px-3 py-2.5 border-b backdrop-blur-md"
        style={{ background: 'rgba(45,32,22,0.92)', borderColor: `${ACCENT}26` }}
      >
        <Users size={15} color={ACCENT} className="shrink-0" />
        <span
          className="text-[0.7rem] tracking-[0.12em] uppercase"
          style={{ fontFamily: "'Cinzel Decorative', serif", color: '#D4956A' }}
        >
          Party Stats
        </span>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={resetHp}
            aria-label="Reset all party HP to full"
            title="Reset all HP"
            className="p-1 rounded-md transition-colors"
            style={{ color: 'rgba(245,240,230,0.45)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D4956A')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,230,0.45)')}
          >
            <RotateCcw size={13} />
          </button>
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            aria-label="Collapse party stats"
            title="Collapse"
            className="p-1 rounded-md transition-colors"
            style={{ color: 'rgba(245,240,230,0.45)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D4956A')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,230,0.45)')}
          >
            <ChevronLeft size={14} />
          </button>
        </div>
      </div>

      {/* Members */}
      <div className="p-2.5 space-y-2.5">
        {party.map((m) => {
          const pct = m.maxHp > 0 ? (m.hp / m.maxHp) * 100 : 0;
          const defeated = m.hp <= 0;
          const barColor = defeated
            ? '#8B3A3A'
            : pct <= 33
              ? '#C47171'
              : pct <= 66
                ? '#C9A84C'
                : '#8FA678';
          return (
            <div
              key={m.id}
              className="group rounded-xl p-2.5"
              style={{ background: 'rgba(45,32,22,0.5)', border: `1px solid ${ACCENT}26` }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <input
                  value={m.name}
                  onChange={(e) => update(m.id, { name: e.target.value })}
                  aria-label="Character name"
                  className="min-w-0 flex-1 bg-transparent text-[0.9rem] font-semibold outline-none truncate"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}
                />
                <button
                  type="button"
                  onClick={() => removeMember(m.id)}
                  aria-label={`Remove ${m.name}`}
                  className="p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  style={{ color: 'rgba(196,113,113,0.8)' }}
                >
                  <X size={13} />
                </button>
              </div>

              {/* AC + Passive Perception */}
              <div className="flex items-center gap-2 mb-2">
                <StatField icon={Shield} label="AC" value={m.ac} onChange={(v) => update(m.id, { ac: v })} />
                <StatField icon={Eye} label="PP" value={m.pp} onChange={(v) => update(m.id, { pp: v })} />
              </div>

              {/* HP bar */}
              <div
                className="h-1.5 w-full rounded-full overflow-hidden mb-1.5"
                style={{ background: 'rgba(245,240,230,0.08)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${pct}%`, background: barColor }}
                />
              </div>

              <div className="flex items-center gap-1">
                <Heart size={12} color={barColor} className="shrink-0" />
                <button
                  type="button"
                  onClick={() => stepHp(m.id, -1)}
                  aria-label={`Damage ${m.name}`}
                  className="flex items-center justify-center w-5 h-5 rounded-md transition-colors"
                  style={{ background: 'rgba(139,58,58,0.2)', color: '#C47171' }}
                >
                  <Minus size={11} />
                </button>
                <span
                  className="text-stat text-[0.78rem] tabular-nums text-center flex-1"
                  style={{ color: defeated ? '#C47171' : '#F5F0E6' }}
                >
                  <input
                    type="number"
                    value={m.hp}
                    onChange={(e) =>
                      update(m.id, {
                        hp: Math.max(0, Math.min(m.maxHp, parseInt(e.target.value, 10) || 0)),
                      })
                    }
                    aria-label={`${m.name} current HP`}
                    className="w-7 bg-transparent text-right outline-none tabular-nums"
                    style={{ color: defeated ? '#C47171' : '#F5F0E6' }}
                  />
                  <span style={{ color: 'rgba(245,240,230,0.4)' }}> / </span>
                  <input
                    type="number"
                    value={m.maxHp}
                    onChange={(e) => {
                      const max = Math.max(1, parseInt(e.target.value, 10) || 1);
                      update(m.id, { maxHp: max, hp: Math.min(m.hp, max) });
                    }}
                    aria-label={`${m.name} max HP`}
                    className="w-7 bg-transparent text-left outline-none tabular-nums"
                    style={{ color: 'rgba(245,240,230,0.55)' }}
                  />
                </span>
                <button
                  type="button"
                  onClick={() => stepHp(m.id, 1)}
                  aria-label={`Heal ${m.name}`}
                  className="flex items-center justify-center w-5 h-5 rounded-md transition-colors"
                  style={{ background: 'rgba(74,93,63,0.2)', color: '#8FA678' }}
                >
                  <Plus size={11} />
                </button>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          onClick={addMember}
          className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-[0.72rem] font-semibold transition-colors"
          style={{
            background: 'rgba(184,115,51,0.1)',
            color: '#D4956A',
            border: `1px dashed ${ACCENT}44`,
          }}
        >
          <UserPlus size={13} /> Add Member
        </button>
      </div>
    </aside>
  );
}

function StatField({
  icon: Icon,
  label,
  value,
  onChange,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className="flex items-center gap-1 flex-1 rounded-lg px-1.5 py-1 transition-colors"
      style={{
        background: 'rgba(26,20,16,0.6)',
        border: `1px solid ${focused ? 'rgba(184,115,51,0.5)' : 'rgba(184,115,51,0.2)'}`,
      }}
    >
      <Icon size={11} color="#C9A84C" className="shrink-0" />
      <span className="text-[0.58rem] tracking-wider uppercase" style={{ color: 'rgba(245,240,230,0.5)' }}>
        {label}
      </span>
      <input
        type="number"
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
        aria-label={label}
        className="w-full min-w-0 bg-transparent text-right text-stat text-[0.8rem] tabular-nums outline-none"
        style={{ color: '#F5F0E6' }}
      />
    </div>
  );
}
