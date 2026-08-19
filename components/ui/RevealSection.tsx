"use client";

import type { ReactNode } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";

interface RevealSectionProps {
  id: string;
  children: ReactNode;
  /** Alternates the page's background rhythm — see DESIGN_SPEC.md. */
  background?: "primary" | "secondary";
  className?: string;
}

/**
 * Shared section shell: fades + rises content into view the first time it
 * enters the viewport (matches the reference site's per-section reveal),
 * and applies the alternating primary/secondary background band. Every
 * section (About, Experience, Skills, ...) is wrapped in this instead of
 * re-implementing the observer — see useInViewOnce for the shared logic
 * (also used by the footer).
 */
export function RevealSection({ id, children, background = "primary", className = "" }: RevealSectionProps) {
  const { ref, isVisible } = useInViewOnce<HTMLElement>();

  const bgClass = background === "secondary" ? "bg-secondary" : "bg-primary";

  return (
    <section
      id={id}
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""} ${bgClass} ${className}`.trim()}
    >
      {children}
    </section>
  );
}
