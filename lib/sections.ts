export interface SectionLink {
  id: string;
  label: string;
}

// Drives the side-nav dots, scroll-spy, and the footer nav links (same
// registry, no duplication) — in page order. Every section is now present.
export const sections: SectionLink[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
