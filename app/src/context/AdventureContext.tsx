import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { adventures, DEFAULT_ADVENTURE } from '../adventures/registry';
import type { AdventureConfig, AdventureId } from '../adventures/types';

interface AdventureContextValue {
  id: AdventureId;
  config: AdventureConfig;
  setAdventure: (id: AdventureId) => void;
}

const AdventureContext = createContext<AdventureContextValue | null>(null);

const STORAGE_KEY = 'active-adventure';

export function AdventureProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useLocalStorage<AdventureId>(STORAGE_KEY, DEFAULT_ADVENTURE);

  // Guard against a stale/unknown id lingering in localStorage.
  const safeId: AdventureId = adventures[id] ? id : DEFAULT_ADVENTURE;

  const value = useMemo<AdventureContextValue>(
    () => ({
      id: safeId,
      config: adventures[safeId],
      setAdventure: setId,
    }),
    [safeId, setId],
  );

  return <AdventureContext.Provider value={value}>{children}</AdventureContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAdventure(): AdventureContextValue {
  const ctx = useContext(AdventureContext);
  if (!ctx) {
    throw new Error('useAdventure must be used within an AdventureProvider');
  }
  return ctx;
}
