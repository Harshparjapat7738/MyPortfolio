import { ParticleColorPicker } from "@/components/three/ParticleColorPicker";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import styles from "./HeaderBar.module.css";

export function HeaderBar() {
  return (
    <div className={styles.bar}>
      <a
        href="/resume/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-secondary btn-compact"
      >
        Resume
      </a>
      <a
        href="/resume/cover_letter.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-secondary btn-compact"
      >
        Cover Letter
      </a>
      <ParticleColorPicker />
      <ThemeToggle />
    </div>
  );
}
