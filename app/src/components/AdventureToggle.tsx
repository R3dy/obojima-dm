import { useNavigate } from 'react-router-dom';
import { ChevronsLeftRight } from 'lucide-react';
import { useAdventure } from '../context/AdventureContext';
import { adventures, adventureOrder } from '../adventures/registry';

/**
 * A compact segmented switch that flips the whole companion between adventures.
 * Because each adventure owns its own set of routes, switching always returns
 * the DM to that adventure's home page so they never land on a dead URL.
 */
export default function AdventureToggle({ compact = false }: { compact?: boolean }) {
  const { id, setAdventure } = useAdventure();
  const navigate = useNavigate();

  const choose = (next: typeof id) => {
    if (next === id) return;
    setAdventure(next);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full p-1"
      role="radiogroup"
      aria-label="Switch adventure"
      style={{
        background: 'rgba(26,20,16,0.6)',
        border: '1px solid rgba(245,240,230,0.12)',
      }}
    >
      {!compact && (
        <ChevronsLeftRight size={13} className="ml-1.5 mr-0.5 shrink-0" style={{ color: 'rgba(245,240,230,0.4)' }} />
      )}
      {adventureOrder.map((advId) => {
        const adv = adventures[advId];
        const active = advId === id;
        return (
          <button
            key={advId}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => choose(advId)}
            className="rounded-full px-3 py-1 text-[0.7rem] font-semibold tracking-wide transition-colors duration-200"
            style={{
              background: active ? adv.theme.accent : 'transparent',
              color: active ? '#1A1410' : 'rgba(245,240,230,0.65)',
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.color = '#F5F0E6';
            }}
            onMouseLeave={(e) => {
              if (!active) e.currentTarget.style.color = 'rgba(245,240,230,0.65)';
            }}
          >
            {adv.shortName}
          </button>
        );
      })}
    </div>
  );
}
