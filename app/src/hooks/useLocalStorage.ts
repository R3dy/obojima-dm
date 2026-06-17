import { useCallback, useEffect, useState } from 'react';

/**
 * Persist a piece of React state in localStorage.
 *
 * Safe for an at-the-table tool: reads are lazy, writes are best-effort
 * (a full or unavailable storage never throws into the render tree), and
 * changes sync across tabs/components via the `storage` event plus a custom
 * same-tab event so multiple widgets sharing a key stay in agreement.
 */
const SAME_TAB_EVENT = 'local-storage-write';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
          window.dispatchEvent(new CustomEvent(SAME_TAB_EVENT, { detail: key }));
        } catch {
          /* storage unavailable or full — keep the in-memory value */
        }
        return next;
      });
    },
    [key],
  );

  // Keep widgets that share a key in sync, within and across tabs.
  useEffect(() => {
    const sync = (e: Event) => {
      if (e instanceof StorageEvent && e.key !== null && e.key !== key) return;
      if (e instanceof CustomEvent && e.detail !== key) return;
      setStoredValue(readValue());
    };
    window.addEventListener('storage', sync);
    window.addEventListener(SAME_TAB_EVENT, sync as EventListener);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener(SAME_TAB_EVENT, sync as EventListener);
    };
  }, [key, readValue]);

  return [storedValue, setValue] as const;
}
