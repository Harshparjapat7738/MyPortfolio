import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

/**
 * Centered "eyebrow" heading block used at the top of every content
 * section (accent-colored title + muted subtitle) — reused by About,
 * Experience, and every section that follows.
 */
export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </div>
  );
}
