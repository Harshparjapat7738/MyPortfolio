"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Palette } from "lucide-react";
import { DEFAULT_PARTICLE_COLOR, useParticleColor } from "@/hooks/useParticleColor";
import styles from "./ParticleColorPicker.module.css";

const PRESETS = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Purple", value: "#a855f7" },
  { name: "Emerald", value: "#10b981" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Cyan", value: "#06b6d4" },
];

/**
 * Icon-button + popover for recoloring the hero's particle background.
 * Lives in the header rather than inside Hero itself since the control
 * needs to stay reachable regardless of scroll position, same as the
 * theme toggle it sits next to. Selection persists via useParticleColor
 * (localStorage), so it survives a reload.
 */
export function ParticleColorPicker() {
  const { color, setColor, resetColor } = useParticleColor();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const popoverId = useId();

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className="icon-btn"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Change hero animation color"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={popoverId}
      >
        <Palette size={20} style={{ color }} />
      </button>

      {open ? (
        <div className={styles.popover} id={popoverId} role="dialog" aria-label="Hero animation color">
          <span className={styles.label}>Animation Color</span>

          <div className={styles.swatchRow}>
            {PRESETS.map((preset) => (
              <button
                key={preset.value}
                type="button"
                className={`${styles.swatch} ${color === preset.value ? styles.swatchActive : ""}`.trim()}
                style={{ backgroundColor: preset.value }}
                onClick={() => setColor(preset.value)}
                aria-label={preset.name}
                aria-pressed={color === preset.value}
                title={preset.name}
              />
            ))}
          </div>

          <div className={styles.customRow}>
            <input
              type="color"
              className={styles.colorInput}
              value={color}
              onChange={(event) => setColor(event.target.value)}
              aria-label="Pick a custom color"
            />
            <span className={styles.customLabel}>Custom</span>
          </div>

          {color !== DEFAULT_PARTICLE_COLOR ? (
            <button type="button" className={styles.resetBtn} onClick={resetColor}>
              Reset to default
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
