import { GraduationCap } from "lucide-react";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { educationContent } from "@/lib/content";
import styles from "./Education.module.css";

export function Education() {
  return (
    <RevealSection id="education" background="secondary" className={styles.education}>
      <div className={styles.inner}>
        <SectionHeading title={educationContent.heading} subtitle={educationContent.subtitle} />

        <div className={styles.list}>
          {educationContent.entries.map((entry) => (
            <div className={`card ${styles.entryCard}`} key={entry.degree}>
              <div className={styles.left}>
                <div className={styles.iconTile} aria-hidden="true">
                  <GraduationCap size={26} />
                </div>
                <div>
                  <h3 className={styles.degree}>{entry.degree}</h3>
                  <div className={styles.institution}>{entry.institution}</div>
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.duration}>{entry.duration}</div>
                <div className={styles.detail}>{entry.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
