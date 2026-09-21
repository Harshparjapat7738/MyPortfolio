// Structured portfolio copy, sourced from HarshPrajapati's resume (see
// PORTFOLIO_CONTENT.md for the full breakdown/provenance). Sections are
// added here as they're implemented.

export const heroContent = {
  greeting: "Hi, My name is",
  name: "Harsh Prajapati",
  roles: ["Software Engineer", "Java Developer", "Backend Developer"],
  description:
    "I specialize in Java, Spring Boot, Hibernate, SQL, and Microservices architecture — designing backend systems that are scalable, secure, and built around clean RESTful API design and efficient database use.",
  // Same keywords already in the description above, repeated as scannable
  // badges — a recruiter skimming for a tech match shouldn't have to read
  // a full sentence to confirm it in the first few seconds on the page.
  techBadges: ["Java", "Spring Boot", "Microservices", "SQL","NodeJS", "ExpressJS", "ReactJS", "MongoDB"],
  primaryCta: { label: "Get In Touch", href: "#contact" },
  secondaryCta: { label: "View My Work", href: "#projects" },
  initials: "HP",
};

export const aboutContent = {
  heading: "About Me",
  subtitle: "Backend-focused engineering, with an eye for clean, scalable systems. ⚙️",
  paragraphs: [
    "I'm a Software Engineer & Java Developer specializing in Java, Spring Boot, Hibernate, SQL, and microservices architecture. My focus is on building scalable, secure, high-performance backend systems, with particular attention to RESTful API design, database optimization, and modular service development.",
    "I'm passionate about building enterprise-grade applications and continuously improving backend performance through clean code and efficient design patterns — whether that's structuring a microservices architecture, tuning a SQL query, or securing an API with JWT and Spring Security.",
    "Alongside backend work, I've also built full-stack applications with React.js, Node.js, and Express.js — so I'm comfortable owning a feature from the database up through the API to the UI that consumes it.",
  ],
  focusAreas: [
    {
      icon: "Server",
      title: "Backend Systems",
      description: "Java, Spring Boot, Hibernate",
    },
    {
      icon: "Boxes",
      title: "Microservices Architecture",
      description: "Service discovery, API gateways, distributed services",
    },
    {
      icon: "Database",
      title: "Databases & SQL",
      description: "Schema design, query optimization",
    },
    {
      icon: "Link2",
      title: "REST API Design",
      description: "Secure, well-structured APIs with JWT & Spring Security",
    },
    {
      icon: "Layers",
      title: "Full-Stack Development",
      description: "React.js, Node.js, Express.js",
    },
  ],
};

export interface SkillItem {
  name: string;
  icon: string;
}

export interface SkillCategory {
  key: string;
  label: string;
  skills: SkillItem[];
}

// Icon names map to lucide-react components in components/sections/Skills.tsx.
// Generic, associative icon choices (no brand logos) — same approach the
// reference site uses for its skill tiles.
export const skillsContent = {
  heading: "Skills & Technologies",
  subtitle: "The tools and technologies I use to build backend and full-stack systems.",
  categories: [
    {
      key: "backend",
      label: "Backend",
      skills: [
        { name: "Java", icon: "Coffee" },
        { name: "Spring Boot", icon: "Zap" },
        { name: "Spring Data JPA", icon: "Layers" },
        { name: "Hibernate", icon: "Moon" },
        { name: "Spring Security", icon: "ShieldCheck" },
        { name: "Microservices", icon: "Boxes" },
        { name: "Node.js", icon: "Hexagon" },
        { name: "Express.js", icon: "Rocket" },
      ],
    },
    {
      key: "frontend",
      label: "Frontend",
      skills: [
        { name: "React.js", icon: "Atom" },
        { name: "HTML", icon: "FileCode" },
        { name: "CSS", icon: "Palette" },
      ],
    },
    {
      key: "database",
      label: "Database",
      skills: [
        { name: "MySQL", icon: "Database" },
        { name: "MongoDB", icon: "Leaf" },
        { name: "SQL", icon: "Table2" },
      ],
    },
    {
      key: "apis-security",
      label: "APIs & Security",
      skills: [
        { name: "REST APIs", icon: "Link2" },
        { name: "JWT", icon: "KeyRound" },
        { name: "Authentication", icon: "ScanFace" },
        { name: "JDBC", icon: "Plug" },
      ],
    },
    {
      key: "core-cs",
      label: "Core CS",
      skills: [
        { name: "Data Structures & Algorithms", icon: "Binary" },
        { name: "OOP", icon: "Component" },
      ],
    },
    {
      key: "tools",
      label: "Tools",
      skills: [
        { name: "IntelliJ IDEA", icon: "AppWindow" },
        { name: "Visual Studio Code", icon: "Code" },
        { name: "GitHub", icon: "GitBranch" },
        { name: "Maven", icon: "Package" },
        { name: "Postman", icon: "Send" },
        { name: "MySQL Workbench", icon: "Wrench" },
        { name: "MongoDB Compass", icon: "Compass" },
        { name: "Docker", icon: "Container" },
      ],
    },
    {
      key: "ai-tools",
      label: "AI Tools",
      skills: [
        { name: "ChatGPT", icon: "Bot" },
        { name: "Google Gemini", icon: "Sparkles" },
        { name: "Claude", icon: "MessageCircle" },
        { name: "Cursor", icon: "Code2" },
        { name: "Antigravity", icon: "Orbit" },
        { name: "Emergent.AI", icon: "Wand2" },
        { name: "GroqCloud", icon: "Cpu" },
      ],
    },
  ] satisfies SkillCategory[],
};

export interface ProjectEntry {
  title: string;
  /** Short category kicker shown above the title — Microservices / Full-Stack /
   *  Security / Backend — derived from each project's own description
   *  below, not a separate claim. */
  type: string;
  description: string;
  tech: string[];
  icon: string;
}

// No GitHub/live URLs, screenshots, or metrics exist for these projects on
// the resume — cards are designed to stand on description + tech stack
// alone rather than fabricating links. See the CTA below the grid instead.
export const projectsContent = {
  heading: "Featured Projects",
  subtitle: "Microservices and full-stack projects I've built, backend-first.",
  entries: [
    {
      title: "JD Optimize Resume",
      type: "Microservices",
      description:
        "AI-powered platform that parses a job description and generates a tailored resume, cover letter and outreach email content. Built as independent Spring Boot microservices for JD parsing, content optimization and document generation, coordinated behind an API Gateway.",
      tech: ["Java", "Spring Boot", "Microservices", "API Gateway", "REST APIs"],
      icon: "FileText",
    },
    {
      title: "Hotel Microservice Project",
      type: "Microservices",
      description:
        "A scalable microservices-based hotel management system built with Spring Boot, Hibernate and MySQL. Implemented service discovery, API Gateway and inter-service communication for booking, user management and hotel services.",
      tech: ["Spring Boot", "Hibernate", "MySQL", "Microservices", "API Gateway"],
      icon: "Hotel",
    },
    {
      title: "Contact Manager Microservice",
      type: "Microservices",
      description: "Contact management application with CRUD operations using Spring Boot and MySQL.",
      tech: ["Spring Boot", "MySQL", "REST APIs"],
      icon: "Contact",
    },
    {
      title: "GEN-AI Full Stack Web App",
      type: "Full-Stack",
      description: "Full-stack AI-integrated web application using React.js, Spring Boot and REST APIs.",
      tech: ["React.js", "Spring Boot", "REST APIs", "AI"],
      icon: "BrainCircuit",
    },
    {
      title: "JWT-Auth Application",
      type: "Security",
      description: "Secure authentication and authorization application using JWT and Spring Security.",
      tech: ["Spring Boot", "Spring Security", "JWT"],
      icon: "ShieldCheck",
    },
    {
      title: "Blogging Application",
      type: "Backend",
      description:
        "Full-featured blogging platform with user roles, post management and comment system using Spring Boot and Hibernate.",
      tech: ["Spring Boot", "Hibernate"],
      icon: "Newspaper",
    },
    {
      title: "Data Mapping",
      type: "Full-Stack",
      description:
        "AI-powered workflow visualizer: describe a project's complete workflow and the application generates a full swimlane flowchart from it using a Groq AI model. Built on the MERN stack.",
      tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Groq AI"],
      icon: "Workflow",
    },
    {
      title: "BizzConnect",
      type: "Full-Stack",
      description:
        "Business-selling marketplace where sellers register and list their property, assets, land and other business-related equipment for sale. Built on the MERN stack.",
      tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
      icon: "Store",
    },
  ] satisfies ProjectEntry[],
};

export interface ExperienceEntry {
  role: string;
  company: string;
  duration: string;
  /** Scannable tech list, lifted directly from the highlights below —
   *  lets a recruiter confirm a stack match without reading every bullet. */
  tech: string[];
  highlights: string[];
  /** Company mark shown in the entry's logo badge (see CompanyLogoRotator). */
  logo: { src: string; alt: string };
  /** Supporting document for this role (offer/experience/training letter),
   *  if one was supplied — omit the field entirely for an entry that has
   *  none rather than linking a placeholder. */
  document?: { href: string; label: string };
}

export const experienceContent = {
  heading: "Professional Experience",
  subtitle: "My professional journey",
  entries: [
    {
      role: "Software Engineer",
      company: "Levithan Private Ltd",
      duration: "5 Months",
      logo: { src: "/images/levithan.png", alt: "Levithan Private Ltd" },
      document: { href: "/resume/Levithan%20Experience%20Letter.pdf", label: "Experience Letter" },
      tech: [ "REST APIs","NodeJS", "ExpressJS", "ReactJS", "MongoDB", "JWT", "Spring Security", "API integration"],
      highlights: [
        "Developed and maintained backend services using Java, Spring Boot, Hibernate, and MySQL.",
        "Implemented a microservices-based architecture for modular, scalable applications.",
        "Designed and optimized SQL queries and database schemas for improved performance.",
        "Collaborated with frontend teams to integrate RESTful APIs, ensuring seamless data exchange.",
        "Contributed to API Gateway and service discovery setup for distributed systems.",
      ],
    },
    {
      role: "Java Full Stack Developer Intern",
      company: "CodeSquadz, Noida",
      duration: "6 Months",
      logo: { src: "/images/codesquadz.png", alt: "CodeSquadz" },
      document: { href: "/resume/codesquadz%20traning%20letter.pdf", label: "Training Letter" },
      tech: ["Java","Spring Boot", "Hibernate ORM", "MySQL", "Microservices", "REST APIs","Spring Data JPA"],
      highlights: [
        "Built full-stack web applications using Spring Boot, React.js, and MongoDB.",
        "Implemented JWT-based authentication and Spring Security for secure user access.",
        "Designed and developed RESTful APIs and integrated them with frontend components.",
        "Gained hands-on experience with ORM (Hibernate) and database-driven application design.",
      ],
    },
  ] satisfies ExperienceEntry[],
};

export interface EducationEntry {
  degree: string;
  institution: string;
  duration: string;
  detail: string;
}

// Only what the resume states — no coursework list or honors were given,
// and no certifications appear on the resume at all, so that subsection is
// omitted entirely rather than shown empty or invented.
export const educationContent = {
  heading: "Education",
  subtitle: "My academic background.",
  entries: [
    {
      degree: "Bachelor of Computer Science Engineering",
      institution: "J.C. Bose University of Engineering & Technology, YMCA, Faridabad",
      duration: "2021 – 2025",
      detail: "CGPA: 7.8/10",
    },
  ] satisfies EducationEntry[],
};

export const contactContent = {
  heading: "Get In Touch",
  subtitle: "Have an opportunity or a project in mind? I'd like to hear from you.",
  intro:
    "The fastest way to reach me is by email — happy to share more about my experience or walk through any of the projects above.",
  email: "harshparjapat7738@gmail.com",
  phone: "8506015186",
  location: "Faridabad, Haryana",
  linkedin: {
    label: "linkedin.com/in/harshparjapat9718",
    href: "https://www.linkedin.com/in/harshparjapat9718",
  },
};

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const footerContent = {
  name: "HarshPrajapati",
  role: "Software Engineer & Java Developer",
  tagline: "Building scalable, secure backend systems with Java, Spring Boot, and Microservices.",
  socialLinks: [
    // lucide-react dropped brand-logo icons a while back — GitBranch is
    // the same generic stand-in used for "GitHub" in the Skills section.
    { label: "GitHub", href: "https://github.com/Harshparjapat7738", icon: "GitBranch" },
  ] satisfies SocialLink[],
};
