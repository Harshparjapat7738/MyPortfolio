import { Boxes, Database, Layers, Link2, Server, type LucideIcon } from "lucide-react";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/lib/content";
import styles from "./About.module.css";

const FOCUS_ICONS: Record<string, LucideIcon> = {
  Server,
  Boxes,
  Database,
  Link2,
  Layers,
};

export function About() {
  return (
    <RevealSection id="about" background="secondary" className={styles.about}>
      <div className={styles.inner}>
        <SectionHeading title={aboutContent.heading} subtitle={aboutContent.subtitle} />

        <div className={styles.grid}>
          <div className={`card ${styles.panel}`}>
            {aboutContent.focusAreas.map((item) => {
              const Icon = FOCUS_ICONS[item.icon];
              return (
                <div className={styles.focusItem} key={item.title}>
                  <div className={styles.focusIcon} aria-hidden="true">
                    {Icon ? <Icon size={20} /> : null}
                  </div>
                  <div>
                    <div className={styles.focusTitle}>{item.title}</div>
                    <div className={styles.focusDescription}>{item.description}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.content}>
            {aboutContent.paragraphs.map((paragraph) => (
              <p className={styles.paragraph} key={paragraph.slice(0, 24)}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
