import { CheckCircle2 } from "lucide-react";
import { CompanyLogoRotator } from "@/components/ui/CompanyLogoRotator";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experienceContent } from "@/lib/content";
import styles from "./Experience.module.css";

export function Experience() {
  return (
    <RevealSection id="experience" background="primary" className={styles.experience}>
      <div className={styles.inner}>
        <SectionHeading title={experienceContent.heading} subtitle={experienceContent.subtitle} />

        <div className={styles.timeline}>
          <div className={styles.line} aria-hidden="true" />

          {experienceContent.entries.map((entry, index) => {
            // Exactly two entries today, so "the other one" is always the
            // rotator's back face — this also just works if a third entry
            // is added later (each one pairs with its neighbor).
            const otherEntry =
              experienceContent.entries[(index + 1) % experienceContent.entries.length];

            return (
              <div className={styles.item} key={`${entry.company}-${entry.role}`}>
                <div className={styles.dot} aria-hidden="true" />
                <div className={`card ${styles.card}`}>
                  <div className={styles.logoWrap}>
                    <CompanyLogoRotator
                      frontSrc={entry.logo.src}
                      frontAlt={entry.logo.alt}
                      backSrc={otherEntry.logo.src}
                      backAlt={otherEntry.logo.alt}
                    />
                  </div>
                  <div className={styles.duration}>{entry.duration}</div>
                  <h3 className={styles.role}>{entry.role}</h3>
                  <h4 className={styles.company}>{entry.company}</h4>
                  <div className={styles.tech}>
                    {entry.tech.map((tech) => (
                      <span className="tag-chip" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ul className={styles.highlights}>
                    {entry.highlights.map((highlight) => (
                      <li className={styles.highlightRow} key={highlight.slice(0, 32)}>
                        <CheckCircle2 size={16} className={styles.highlightIcon} aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
