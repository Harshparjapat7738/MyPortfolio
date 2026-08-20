"use client";

import { GitBranch, type LucideIcon } from "lucide-react";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { footerContent } from "@/lib/content";
import { sections } from "@/lib/sections";
import styles from "./Footer.module.css";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  GitBranch,
};

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

          <div className={styles.secondary}>
            {footerContent.socialLinks.length > 0 ? (
              <div className={styles.social}>
                {footerContent.socialLinks.map((link) => {
                  const Icon = SOCIAL_ICONS[link.icon];
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-btn"
                      aria-label={link.label}
                      title={link.label}
                    >
                      {Icon ? <Icon size={20} /> : null}
                    </a>
                  );
                })}
              </div>
            ) : null}

            <nav className={styles.nav} aria-label="Footer navigation">
              {sections.map((section) => (
                <a key={section.id} href={`#${section.id}`} className="link-underline">
                  {section.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
