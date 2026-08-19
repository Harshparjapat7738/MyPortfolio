"use client";

import { useInViewOnce } from "@/hooks/useInViewOnce";
import { footerContent } from "@/lib/content";
import { sections } from "@/lib/sections";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  // Footer isn't a <section> in the RevealSection sense (same as the
  // reference — its own fade-up rule only ever targeted <section>), so it
  // gets the same reveal treatment applied directly via the shared hook.
  const { ref, isVisible } = useInViewOnce<HTMLElement>();

  return (
    <footer ref={ref} className={`${styles.footer} reveal ${isVisible ? "is-visible" : ""}`}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div>
            <h3 className={styles.name}>{footerContent.name}</h3>
            <div className={styles.role}>{footerContent.role}</div>
            <p className={styles.tagline}>{footerContent.tagline}</p>
            <p className={styles.copyright}>
              © {year} {footerContent.name}. All rights reserved.
            </p>
          </div>

          <nav className={styles.nav} aria-label="Footer navigation">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="link-underline">
                {section.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
