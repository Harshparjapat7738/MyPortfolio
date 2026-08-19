"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { HeroCanvasBackground } from "@/components/three/HeroCanvasBackground";
import { RevealSection } from "@/components/ui/RevealSection";
import { useOrbitLayout } from "@/hooks/useOrbitLayout";
import { useRotatingText } from "@/hooks/useRotatingText";
import { heroContent } from "@/lib/content";
import styles from "./Hero.module.css";

// How long one full lap of the orbit takes — every node shares this
// duration and the same 0%->100% keyframes, and only differs by a
// negative animation-delay (see below), so they all move together in a
// fixed arrangement rather than each running its own independent loop.
const ORBIT_DURATION_S = 44;

// The ring has real, fairly tight geometric limits — the photo it circles
// and the column it has to stay inside are both fixed sizes, so beyond a
// handful of pills there just isn't room to keep them legible no matter how
// the layout algorithm shrinks or spaces them (see MIN_SCALE in
// useOrbitLayout). Capping what the *ring* carries, rather than trying to
// fit the whole badge list on it, is what keeps it readable regardless of
// how long heroContent.techBadges grows — every badge is still shown in
// full in the flat row above the description either way, so nothing here
// is actually hidden from anyone, just not repeated a second time.
const MAX_ORBIT_BADGES = 6;

export function Hero() {
  const role = useRotatingText(heroContent.roles);
  const orbitBadges = heroContent.techBadges.slice(0, MAX_ORBIT_BADGES);
  const orbitCount = orbitBadges.length;
  const { containerRef: nodesRef, centerRef: frameRef, itemRefs: nodeRefs, layout: orbitLayout } =
    useOrbitLayout(orbitCount);

  return (
    <RevealSection id="home" background="primary" className={styles.hero}>
      <HeroCanvasBackground />
      <div className={styles.inner}>
        {/* Each line cascades in on its own slight delay on first load —
            the section-level reveal (from RevealSection) still owns the
            overall fade, this just staggers the content inside it. */}
        <div className={styles.content}>
          <p className={`${styles.greeting} enter-up`} style={{ animationDelay: "0ms" }}>
            {heroContent.greeting}
          </p>
          <h1 className={`${styles.name} enter-up`} style={{ animationDelay: "90ms" }}>
            {heroContent.name}
          </h1>
          <div className={`${styles.role} enter-up`} style={{ animationDelay: "170ms" }} aria-live="polite">
            <span key={role} className="role-transition">
              {role}
            </span>
          </div>
          {/* Same keywords as the description below, surfaced as scannable
              badges — the fastest possible confirmation of a tech match. */}
          <div className={`${styles.techBadges} enter-up`} style={{ animationDelay: "230ms" }}>
            {heroContent.techBadges.map((tech) => (
              <span className={styles.pill} key={tech}>
                {tech}
              </span>
            ))}
          </div>
          <p className={`${styles.description} enter-up`} style={{ animationDelay: "300ms" }}>
            {heroContent.description}
          </p>
          <div className={`${styles.actions} enter-up`} style={{ animationDelay: "380ms" }}>
            <a href={heroContent.primaryCta.href} className="btn btn-primary">
              {heroContent.primaryCta.label}
            </a>
            <a href={heroContent.secondaryCta.href} className="btn btn-secondary">
              {heroContent.secondaryCta.label}
            </a>
          </div>
        </div>

        <div className={`${styles.portrait} ${styles.portraitEnter}`}>
          <div className={styles.orbit}>
            <div className={styles.frame} ref={frameRef}>
              <div className={`${styles.glow} animate-pulse-glow`} aria-hidden="true" />
              <div className={`${styles.avatar} animate-float`}>
                <Image
                  src="/images/profile_image.jpg"
                  alt={heroContent.name}
                  fill
                  sizes="(max-width: 768px) 220px, 360px"
                  className={styles.avatarImage}
                  priority
                />
              </div>
            </div>

            {/* Decorative echo of the tech badges above, slowly orbiting the
                photo — hidden below --orbit-breakpoint (see module CSS) and
                from assistive tech, since the same keywords are already
                announced as real text in the badge row and description.
                Each pill travels a circular CSS motion path (offset-path)
                with offset-rotate held at a fixed 0deg, so it keeps its
                own upright orientation the entire lap — no separate
                counter-rotating element to keep in sync, so it can't
                drift out of phase the way a second, opposite-direction
                animation could.

                Ring radius, per-pill scale, and each pill's position on
                the ring all come from useOrbitLayout, which measures the
                pills' real rendered widths so they never overlap — no
                matter how many tags heroContent.techBadges ends up with or
                how long their labels are. Until that first measurement
                lands, --orbit-radius/--orbit-scale fall back to the fixed
                defaults in Hero.module.css and distance falls back to
                naive even spacing, so there's a sane layout to measure
                from (never a visibly broken one — see the hook). A
                negative animation-delay derived from each pill's own
                position is what keeps it there while still moving the
                whole ring together, the same trick as before. */}
            <div
              className={styles.nodes}
              aria-hidden="true"
              ref={nodesRef}
              style={
                orbitLayout
                  ? ({
                      "--orbit-radius": `${orbitLayout.radiusPx}px`,
                      "--orbit-scale": orbitLayout.scale,
                    } as CSSProperties)
                  : undefined
              }
            >
              {orbitBadges.map((tech, index) => {
                const distance = orbitLayout?.distances[index] ?? (index / orbitCount) * 100;
                const delay = (distance / 100) * -ORBIT_DURATION_S;
                return (
                  <span
                    className={styles.node}
                    key={tech}
                    ref={(el) => {
                      nodeRefs.current[index] = el;
                    }}
                    style={
                      {
                        "--orbit-delay": `${delay}s`,
                        // Reduced-motion fallback (see module CSS): a
                        // negative animation-delay only actually gets
                        // consumed once an animation has run, so pausing
                        // one that was *never* running freezes every pill
                        // at the same spot instead of each one's own —
                        // this is what reduced-motion uses instead.
                        "--orbit-static-distance": `${distance}%`,
                      } as CSSProperties
                    }
                  >
                    {tech}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
