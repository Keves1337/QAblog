import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";

const links = [
  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills" },
  { label: "Contact",  href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
      background: scrolled ? "rgba(7,7,17,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(14px) saturate(1.3)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,229,255,0.08)" : "1px solid transparent",
    }}>
      <nav style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "0 1.5rem", height: "56px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <span style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: "#00e5ff",
            boxShadow: "0 0 8px rgba(0,229,255,0.8)",
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.82rem", fontWeight: 700,
            letterSpacing: "0.06em", color: "#e2e8f0",
          }}>
            J·M<span style={{ color: "#00e5ff" }}>_</span>
          </span>
        </a>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <div className="nav-links" style={{ display: "flex", gap: "0.25rem" }}>
            {links.map(l => (
              <a key={l.label} href={l.href}
                className="chroma-hover scanline-btn"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem", fontWeight: 500,
                  color: "rgba(226,232,240,0.45)",
                  textDecoration: "none",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "3px",
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#00e5ff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(226,232,240,0.45)")}
              >
                {l.label}
              </a>
            ))}
          </div>

          <a href="https://settings-qa-ai.replit.app" target="_blank" rel="noopener noreferrer"
            className="scanline-btn"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem", fontWeight: 600,
              padding: "0.3rem 0.85rem",
              borderRadius: "3px",
              border: "1px solid rgba(0,229,255,0.4)",
              color: "#00e5ff",
              textDecoration: "none",
              marginLeft: "0.75rem",
              transition: "background 0.15s, border-color 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(0,229,255,0.1)";
              el.style.boxShadow = "0 0 14px rgba(0,229,255,0.25)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "transparent";
              el.style.boxShadow = "none";
            }}
          >
            BehemothQA <ExternalLink style={{ width: "10px", height: "10px" }} />
          </a>
        </div>
      </nav>

      <style>{`
        @media (max-width: 500px) { .nav-links { display: none !important; } }
      `}</style>
    </header>
  );
};

export default Navbar;
