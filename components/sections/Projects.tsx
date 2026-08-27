import { BrainCircuit, Contact, FileText, Hotel, Newspaper, ShieldCheck, type LucideIcon } from "lucide-react";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projectsContent } from "@/lib/content";
import styles from "./Projects.module.css";

const PROJECT_ICONS: Record<string, LucideIcon> = {
  Hotel,
  Contact,
  BrainCircuit,
  ShieldCheck,
  Newspaper,
  FileText,
};

export function Projects() {
  return (
    <RevealSection id="projects" background="primary" className={styles.projects}>
      <div className={styles.inner}>
        <SectionHeading title={projectsContent.heading} subtitle={projectsContent.subtitle} />

        <div className={styles.grid}>
          {projectsContent.entries.map((project) => {
            const Icon = PROJECT_ICONS[project.icon];
            return (
              <article className={`card ${styles.projectCard}`} key={project.title}>
                <div className={styles.media}>
                  <div className={styles.mediaGlow} aria-hidden="true" />
                  <div className={styles.iconBadge} aria-hidden="true">
                    {Icon ? <Icon size={34} /> : null}
                  </div>
                </div>

                <div className={styles.body}>
                  <span className="kicker">{project.type}</span>
                  <h3 className={styles.title}>{project.title}</h3>
                  <p className={styles.description}>{project.description}</p>
                  <div className={styles.tags}>
                    {project.tech.map((tech) => (
                      <span className="tag-chip" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.footerCta}>
          <p className={styles.footerCtaText}>
            Source and live links aren&apos;t public for these projects — happy to walk through the code.
          </p>
          <a href="#contact" className="btn btn-secondary">
            Get In Touch
          </a>
        </div>
      </div>
    </RevealSection>
  );
}
