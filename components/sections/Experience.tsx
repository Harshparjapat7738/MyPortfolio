import { CheckCircle2, FileText } from "lucide-react";
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

          {experienceContent.entries.map((entry) => {
            return (
              <div className={styles.item} key={`${entry.company}-${entry.role}`}>
                <div className={styles.dot} aria-hidden="true" />
                <div className={`card ${styles.card}`}>
                  <div className={styles.logoWrap}>
                    <CompanyLogoRotator
                      frontSrc={entry.logo.src}
                      frontAlt={entry.logo.alt}
                      backSrc={entry.logo.src}
                      backAlt={entry.logo.alt}
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
                  {entry.document ? (
                    <a
                      href={entry.document.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.documentLink}
                    >
                      <FileText size={15} aria-hidden="true" />
                      {entry.document.label}
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
