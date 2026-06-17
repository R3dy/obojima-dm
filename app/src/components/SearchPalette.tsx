import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { useAdventure } from '../context/AdventureContext';
import type { SearchEntry } from '../adventures/types';

/** Public event other components (e.g. the navbar button) can dispatch to open search. */
export const OPEN_SEARCH_EVENT = 'open-command-palette';

export default function SearchPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { config } = useAdventure();
  const groups = config.searchGroups;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_SEARCH_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpen);
    };
  }, []);

  const go = useCallback(
    (entry: SearchEntry) => {
      setOpen(false);
      navigate(entry.route);
      if (entry.anchor) {
        // Allow the (possibly lazy-loaded) page to mount before scrolling.
        window.setTimeout(() => {
          document.getElementById(entry.anchor!)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 350);
      }
    },
    [navigate],
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Search" description="Jump to any scene, rule, creature, or page">
      <CommandInput placeholder="Search scenes, DCs, creatures, pages…" />
      <CommandList>
        <CommandEmpty>No matches found.</CommandEmpty>
        {groups.map((group) => (
          <CommandGroup key={group.heading} heading={group.heading}>
            {group.entries.map((entry) => {
              const Icon = entry.icon;
              return (
                <CommandItem
                  key={`${group.heading}:${entry.title}`}
                  value={`${entry.title} ${entry.subtitle ?? ''} ${entry.keywords ?? ''}`}
                  onSelect={() => go(entry)}
                  className="gap-3"
                >
                  <Icon className="size-4 shrink-0 text-copper" />
                  <span className="flex flex-col">
                    <span className="text-parchment">{entry.title}</span>
                    {entry.subtitle && (
                      <span className="text-xs text-parchment/50">{entry.subtitle}</span>
                    )}
                  </span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
