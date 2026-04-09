import { ExternalLink, Linkedin } from "lucide-react";

const Footer = () => (
  <footer style={{ padding: "2.5rem 1.5rem", borderTop: "1px solid rgba(0,229,255,0.07)", background: "#070711" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.5rem" }}>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00e5ff", boxShadow: "0 0 6px rgba(0,229,255,0.7)" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: "0.82rem", color: "#f1f5f9", letterSpacing: "0.06em" }}>
            J·M<span style={{ color: "#00e5ff" }}>_</span>
          </span>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "rgba(226,232,240,0.25)" }}>
          © 2025 Johnatan Milrad · QA Engineer
        </p>
      </div>

      <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
        <a href="https://settings-qa-ai.replit.app" target="_blank" rel="noopener noreferrer"
          className="scanline-btn"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.35rem",
            padding: "0.42rem 1rem", borderRadius: "3px",
            background: "#00e5ff", color: "#070711",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem", fontWeight: 700, textDecoration: "none",
            transition: "opacity 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "0.85"; el.style.boxShadow = "0 0 16px rgba(0,229,255,0.4)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "1"; el.style.boxShadow = "none"; }}
        >
          BehemothQA <ExternalLink style={{ width: "11px", height: "11px" }} />
        </a>

        <a href="https://www.linkedin.com/in/johnathan-milrad-502b18b2" target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.35rem",
            padding: "0.42rem 1rem", borderRadius: "3px",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(226,232,240,0.5)",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.75rem", fontWeight: 500, textDecoration: "none",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(0,229,255,0.3)"; el.style.color = "#00e5ff"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.color = "rgba(226,232,240,0.5)"; }}
        >
          <Linkedin style={{ width: "13px", height: "13px" }} />
          LinkedIn
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
