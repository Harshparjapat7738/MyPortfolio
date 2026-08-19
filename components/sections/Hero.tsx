"use client";

import Image from "next/image";
import { HeroCanvasBackground } from "@/components/three/HeroCanvasBackground";
import { RevealSection } from "@/components/ui/RevealSection";
import { useRotatingText } from "@/hooks/useRotatingText";
import { heroContent } from "@/lib/content";
import styles from "./Hero.module.css";

export function Hero() {
  const role = useRotatingText(heroContent.roles);

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
          <div className={styles.frame}>
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
        </div>
      </div>
    </RevealSection>
  );
}
