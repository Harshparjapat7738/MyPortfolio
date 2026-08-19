"use client";

import { useEffect, useState } from "react";
import { scrollToId } from "@/lib/scroll";
import type { SectionLink } from "@/lib/sections";
import styles from "./SideNav.module.css";

interface SideNavProps {
  sections: SectionLink[];
}

/**
 * Minimalist scroll-spy dot nav (desktop only — hidden under 768px with no
 * hamburger replacement, matching the reference site's mobile behavior of
 * scroll-only navigation).
 */
export function SideNav({ sections }: SideNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible?.target.id) {
          setActiveId(mostVisible.target.id);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav className={styles.nav} aria-label="Section navigation">
      {sections.map((section) => (
        <div className={styles.dotWrap} key={section.id}>
          <span className={styles.tooltip} aria-hidden="true">
            {section.label}
          </span>
          <button
            type="button"
            onClick={() => scrollToId(section.id)}
            aria-label={`Go to ${section.label}`}
            aria-current={activeId === section.id ? "true" : undefined}
            className={`${styles.dot} ${activeId === section.id ? styles.active : ""}`.trim()}
          />
        </div>
      ))}
    </nav>
  );
}
