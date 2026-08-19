// Shared visual for the OG/Twitter share-card images (app/opengraph-image.tsx
// and app/twitter-image.tsx) — kept in one place so both stay in sync.
// next/og renders via Satori, which only supports inline flex styles, no
// external stylesheet, hence the plain style objects here.
export function SocialCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#0a0a0a",
        backgroundImage:
          "radial-gradient(circle at 78% 45%, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.08) 40%, transparent 70%)",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: "#94a3b8", marginBottom: 18 }}>Hi, My name is</div>
      <div
        style={{
          display: "flex",
          fontSize: 84,
          fontWeight: 700,
          color: "#f1f5f9",
          marginBottom: 10,
          letterSpacing: "-0.02em",
        }}
      >
        HarshPrajapati
      </div>
      <div style={{ display: "flex", fontSize: 40, fontWeight: 600, color: "#3b82f6", marginBottom: 34 }}>
        Software Engineer &amp; Java Developer
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        {["Java", "Spring Boot", "Hibernate", "Microservices", "SQL", "REST APIs"].map((tech) => (
          <div
            key={tech}
            style={{
              display: "flex",
              fontSize: 24,
              color: "#cbd5e1",
              backgroundColor: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: 10,
              padding: "10px 20px",
            }}
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}

export const SOCIAL_CARD_ALT = "HarshPrajapati — Software Engineer & Java Developer";
export const SOCIAL_CARD_SIZE = { width: 1200, height: 630 };
