"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True once the attached element has entered the viewport — stays true
 * afterward (reveal-once, not a toggle). Shared by every "fade up on
 * scroll" element (RevealSection, Footer) instead of each owning its own
 * IntersectionObserver.
 *
 * Also fires immediately if the element is already scrolled past when
 * first observed (a `#hash` deep link, a side-nav dot clicked ahead of it,
 * scroll restoration) — otherwise "entering" the viewport is exactly what
 * never happens for it, and it would sit invisible forever.
 */
export function useInViewOnce<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const alreadyScrolledPast = entry.boundingClientRect.bottom < 0;
        if (entry.isIntersecting || alreadyScrolledPast) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
