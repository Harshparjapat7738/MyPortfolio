"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useParticleColor } from "@/hooks/useParticleColor";
import styles from "./HeroCanvasBackground.module.css";

// WebGL/three.js needs the browser — loaded client-only and code-split so
// this fairly heavy dependency never blocks or bloats the initial page
// bundle for anyone (reduced-motion, mobile) who ends up not seeing it.
const HeroParticles = dynamic(() => import("./HeroParticles"), { ssr: false });

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_QUERY = "(max-width: 768px)";

// Whether the particle background should render at all — re-evaluated
// live via matchMedia (subscribed through useSyncExternalStore, not an
// effect+setState pair) so it responds if the OS motion preference or
// viewport crosses the threshold mid-session, e.g. a window resize or the
// user toggling reduced-motion without reloading the page.
function subscribe(onStoreChange: () => void) {
  const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  const mobileQuery = window.matchMedia(MOBILE_QUERY);
  reducedMotionQuery.addEventListener("change", onStoreChange);
  mobileQuery.addEventListener("change", onStoreChange);
  return () => {
    reducedMotionQuery.removeEventListener("change", onStoreChange);
    mobileQuery.removeEventListener("change", onStoreChange);
  };
}

function getSnapshot(): boolean {
  const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  const isMobile = window.matchMedia(MOBILE_QUERY).matches;
  return !reducedMotion && !isMobile;
}

// No window during SSR — stay disabled until the client can evaluate the
// real media queries, same "nothing renders yet" state as the dynamic
// import's own loading state.
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Ambient WebGL particle backdrop, scoped to the hero section only.
 *
 * Skipped entirely — not merely paused — when:
 * - the visitor has requested reduced motion (this is decorative motion
 *   with no informational content, so removing it is the correct reading
 *   of that preference, not just slowing it down), or
 * - the viewport is mobile-sized, where a continuous WebGL scene competes
 *   for battery/GPU against an already fairly dense hero layout (photo,
 *   orbiting tag ring, entrance animations) for comparatively little
 *   visual payoff.
 */
export function HeroCanvasBackground() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { color } = useParticleColor();

  if (!enabled) return null;

  return (
    <div className={styles.background} aria-hidden="true">
      <HeroParticles color={color} />
    </div>
  );
}
