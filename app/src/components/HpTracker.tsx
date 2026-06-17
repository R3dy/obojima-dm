import { useState } from 'react';
import { Heart, Minus, Plus, RotateCcw, Swords } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface HpTrackerProps {
  /** Stable id used as the localStorage key — keep unique per creature instance. */
  storageKey: string;
  name: string;
  maxHp: number;
  accent?: string;
}

/**
 * A small at-the-table HP counter. Persists current HP in localStorage so a
 * paused session survives a refresh or a dropped connection, and supports
 * arbitrary damage/heal amounts plus quick +/- steps.
 */
export default function HpTracker({ storageKey, name, maxHp, accent = '#B87333' }: HpTrackerProps) {
  const [current, setCurrent] = useLocalStorage<number>(`hp:${storageKey}`, maxHp);
  const [amount, setAmount] = useState('');

  const clamp = (v: number) => Math.max(0, Math.min(maxHp, v));
  const step = (delta: number) => setCurrent((c) => clamp(c + delta));
  const apply = (sign: 1 | -1) => {
    const n = parseInt(amount, 10);
    if (!Number.isNaN(n) && n > 0) {
      step(sign * n);
      setAmount('');
    }
  };

  const pct = maxHp > 0 ? (current / maxHp) * 100 : 0;
  const defeated = current <= 0;
  const barColor = defeated ? '#8B3A3A' : pct <= 33 ? '#C47171' : pct <= 66 ? '#C9A84C' : '#8FA678';

  return (
    <div
      className="rounded-xl p-4 my-4"
      style={{ background: 'rgba(26,20,16,0.6)', border: `1px solid ${accent}33` }}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <Heart size={15} color={barColor} className="shrink-0" />
          <span
            className="text-[0.7rem] tracking-[0.12em] uppercase truncate"
            style={{ fontFamily: "'Cinzel Decorative', serif", color: '#D4956A' }}
          >
            {name} HP
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-stat text-[0.95rem]" style={{ color: defeated ? '#C47171' : '#F5F0E6' }}>
            {defeated ? 'Defeated' : `${current} / ${maxHp}`}
          </span>
          <button
            type="button"
            onClick={() => setCurrent(maxHp)}
            aria-label={`Reset ${name} HP to full`}
            className="p-1 rounded-md transition-colors"
            style={{ color: 'rgba(245,240,230,0.5)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D4956A')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,230,0.5)')}
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* HP bar */}
      <div className="h-1.5 w-full rounded-full overflow-hidden mb-3" style={{ background: 'rgba(245,240,230,0.08)' }}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, background: barColor }}
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <StepButton label="-5" onClick={() => step(-5)} />
          <StepButton label={<Minus size={13} />} ariaLabel="Lose 1 HP" onClick={() => step(-1)} />
          <StepButton label={<Plus size={13} />} ariaLabel="Gain 1 HP" onClick={() => step(1)} />
          <StepButton label="+5" onClick={() => step(5)} />
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          <input
            type="number"
            inputMode="numeric"
            min={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') apply(-1);
            }}
            placeholder="Amt"
            aria-label={`Damage or heal amount for ${name}`}
            className="w-14 rounded-md px-2 py-1 text-stat text-[0.8rem] outline-none"
            style={{ background: 'rgba(26,20,16,0.8)', border: '1px solid rgba(184,115,51,0.25)', color: '#F5F0E6' }}
          />
          <button
            type="button"
            onClick={() => apply(-1)}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-[0.7rem] font-semibold transition-colors"
            style={{ background: 'rgba(139,58,58,0.2)', color: '#C47171', border: '1px solid rgba(139,58,58,0.35)' }}
          >
            <Swords size={12} /> Dmg
          </button>
          <button
            type="button"
            onClick={() => apply(1)}
            className="rounded-md px-2 py-1 text-[0.7rem] font-semibold transition-colors"
            style={{ background: 'rgba(74,93,63,0.2)', color: '#8FA678', border: '1px solid rgba(74,93,63,0.35)' }}
          >
            Heal
          </button>
        </div>
      </div>
    </div>
  );
}

function StepButton({
  label,
  onClick,
  ariaLabel,
}: {
  label: React.ReactNode;
  onClick: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex items-center justify-center min-w-[28px] h-7 px-1.5 rounded-md text-[0.75rem] font-semibold transition-colors"
      style={{ background: 'rgba(184,115,51,0.12)', color: '#D4956A', border: '1px solid rgba(184,115,51,0.2)' }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(184,115,51,0.22)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(184,115,51,0.12)')}
    >
      {label}
    </button>
  );
}
