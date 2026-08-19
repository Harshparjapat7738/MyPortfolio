import Image from "next/image";
import styles from "./CompanyLogoRotator.module.css";

interface CompanyLogoRotatorProps {
  /** Logo shown facing forward at rest (and permanently under reduced motion). */
  frontSrc: string;
  frontAlt: string;
  /** Logo revealed on the reverse of the 3D turn, halfway through each cycle. */
  backSrc: string;
  backAlt: string;
}

/**
 * A small "physical card" that turns on its vertical axis to alternate
 * between two company logos, used for the Professional Experience badges.
 * Both faces are pinned to the exact same box via `position: absolute` +
 * `backface-visibility: hidden` — see the module CSS for the rotation
 * choreography (hold / spin / hold, driven purely by keyframes so
 * `prefers-reduced-motion` can disable it with a single rule).
 */
export function CompanyLogoRotator({ frontSrc, frontAlt, backSrc, backAlt }: CompanyLogoRotatorProps) {
  return (
    <div className={styles.stage}>
      <div className={styles.rotator}>
        <div className={`${styles.face} ${styles.faceFront}`}>
          <Image src={frontSrc} alt={frontAlt} fill sizes="(max-width: 480px) 80px, 104px" className={styles.image} />
        </div>
        <div className={`${styles.face} ${styles.faceBack}`}>
          <Image src={backSrc} alt={backAlt} fill sizes="(max-width: 480px) 80px, 104px" className={styles.image} />
        </div>
      </div>
    </div>
  );
}
