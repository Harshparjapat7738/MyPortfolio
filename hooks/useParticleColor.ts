"use client";

import { useCallback, useSyncExternalStore } from "react";

// Bright and saturated enough to read clearly with bloom against both the
// light and dark hero backgrounds — same blue used as the site's own
// accent color everywhere else, so it's the sane default before anyone
// picks something else.
export const DEFAULT_PARTICLE_COLOR = "#3b82f6";

const STORAGE_KEY = "hero-particle-color";
const CHANGE_EVENT = "particle-color-change";

// No React Context needed — localStorage *is* the shared store, and every
// caller of this hook (the picker in the header, the Canvas in Hero) just
// subscribes to it directly via useSyncExternalStore. Setting a value
// dispatches a same-tab custom event (storage only fires in *other* tabs)
// so every subscriber re-reads and stays in sync immediately.
function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_PARTICLE_COLOR;
  } catch {
    return DEFAULT_PARTICLE_COLOR;
  }
}

function getServerSnapshot(): string {
  return DEFAULT_PARTICLE_COLOR;
}

export function useParticleColor() {
  const color = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setColor = useCallback((next: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage may be unavailable — the color still applies for the
      // session via the dispatched event below, it just won't persist.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const resetColor = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // See above.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { color, setColor, resetColor };
}
