"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  AppWindow,
  Atom,
  Binary,
  Bot,
  Boxes,
  Code,
  Code2,
  Coffee,
  Compass,
  Component,
  Cpu,
  Database,
  FileCode,
  GitBranch,
  Hexagon,
  KeyRound,
  Layers,
  Leaf,
  Link2,
  MessageCircle,
  Moon,
  Orbit,
  Package,
  Palette,
  Plug,
  Rocket,
  ScanFace,
  Send,
  ShieldCheck,
  Sparkles,
  Table2,
  Wand2,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillsContent } from "@/lib/content";
import styles from "./Skills.module.css";

const SKILL_ICONS: Record<string, LucideIcon> = {
  Coffee,
  Zap,
  Layers,
  Moon,
  ShieldCheck,
  Boxes,
  Hexagon,
  Rocket,
  Atom,
  FileCode,
  Palette,
  Database,
  Leaf,
  Table2,
  Link2,
  KeyRound,
  ScanFace,
  Plug,
  Binary,
  Component,
  AppWindow,
  GitBranch,
  Package,
  Send,
  Wrench,
  Compass,
  Code,
  Bot,
  Sparkles,
  MessageCircle,
  Code2,
  Orbit,
  Wand2,
  Cpu,
};

const ALL_KEY = "all";

export function Skills() {
  const [activeKey, setActiveKey] = useState<string>(ALL_KEY);

  const filters = useMemo(
    () => [{ key: ALL_KEY, label: "All" }, ...skillsContent.categories.map((c) => ({ key: c.key, label: c.label }))],
    []
  );

  const visibleSkills = useMemo(() => {
    if (activeKey === ALL_KEY) {
      return skillsContent.categories.flatMap((category) => category.skills);
    }
    return skillsContent.categories.find((category) => category.key === activeKey)?.skills ?? [];
  }, [activeKey]);

  return (
    <RevealSection id="skills" background="secondary" className={styles.skills}>
      <div className={styles.inner}>
        <SectionHeading title={skillsContent.heading} subtitle={skillsContent.subtitle} />

        <div className={styles.filters} role="group" aria-label="Filter skills by category">
          {filters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveKey(filter.key)}
              aria-pressed={activeKey === filter.key}
              className={`${styles.filterBtn} ${activeKey === filter.key ? styles.filterBtnActive : ""}`.trim()}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className={styles.grid} key={activeKey}>
          {visibleSkills.map((skill, index) => {
            const Icon = SKILL_ICONS[skill.icon];
            return (
              <div
                className={`card ${styles.skillCard}`}
                key={skill.name}
                style={{ "--card-index": index } as CSSProperties}
              >
                <div className={styles.iconTile} aria-hidden="true">
                  {Icon ? <Icon size={24} /> : null}
                </div>
                <div className={styles.skillName}>{skill.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
