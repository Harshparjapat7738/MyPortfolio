"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through `words` on a fixed interval (mirrors the reference hero's
 * rotating role text). The fade/rise transition itself is a CSS animation
 * (`.role-transition` in globals.css) which is already neutralized by the
 * global prefers-reduced-motion rule, so no extra branching is needed here.
 */
export function useRotatingText(words: string[], intervalMs = 2600): string {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [words, intervalMs]);

  return words[index] ?? "";
}
