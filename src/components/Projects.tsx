import { useState, useEffect, useCallback } from "react";
import { ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BG    = "#070711";
const C     = "#00e5ff";
const V     = "#a78bfa";
const G     = "#22c55e";
const DIM   = "rgba(226,232,240,0.3)";
const TEXT  = "rgba(226,232,240,0.7)";
const BOLD  = "#f1f5f9";

const base = import.meta.env.BASE_URL;

const SCREENSHOTS = [
  { src: `${base}bqa-report.png`,    label: "report",    caption: "Security scan of checkpoint.com — 0 critical, 4 high, 9 warnings, 17 passed" },
  { src: `${base}bqa-ddos.png`,      label: "ddos",      caption: "DDoS mode — 50K requests, 2K concurrent, spoofed IPs, randomised headers" },
  { src: `${base}bqa-dashboard.png`, label: "dashboard", caption: "Pipeline view — Planning, Requirements, Design, Development stages" },
];

const MODULES = [
  { id: "WAF-01", label: "WAF Gut Punch",    status: "armed",    color: G,   desc: "Injects 130KB noise into POST bodies to hit WAF inspection limits and detect Fail Open states." },
  { id: "AUTH-02", label: "Auth Abyss",      status: "armed",    color: G,   desc: "Floods with 60 unique fake JWT tokens concurrently to measure auth latency drift and IdP bottleneck." },
  { id: "RES-03", label: "Resource Vampire", status: "active",   color: C,   desc: "Sends 22 levels of deeply nested JSON to trigger non-linear CPU and RAM amplification." },
  { id: "NET-04", label: "Phantom IP Storm", status: "armed",    color: G,   desc: "Rotates 80 spoofed IPs via X-Forwarded-For to test behavioral rate-limit bypass." },
  { id: "TCP-05", label: "SourDoS",          status: "idle",     color: DIM, desc: "TCP Fragment Overlap — splits payload across 3 fragments to test firewall reassembly." },
  { id: "CVE-06", label: "EBOLA2Shell",      status: "critical", color: "#ef4444", desc: "BOLA + React2Shell (CVE-2025-55182) — enumerates IDs then targets RSC endpoints." },
];

const STATS = [
  { key: "const tests",    val: "300",  suffix: "+ / run", color: C },
  { key: "const sections", val: "6",    suffix: "+",       color: V },
  { key: "const severity", val: "4",    suffix: " tiers",  color: G },
  { key: "const output",   val: '"PDF"',suffix: "",        color: C },
];

/* ── Screenshot gallery ── */
const Gallery = () => {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Main image */}
      <div style={{ position: "relative", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(0,229,255,0.15)", background: "#05050f", marginBottom: "10px" }}>
        {/* Status bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 12px", borderBottom: "1px solid rgba(0,229,255,0.1)", background: "rgba(0,229,255,0.03)" }}>
          <span className="status-dot" style={{ background: G, boxShadow: `0 0 5px ${G}` }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: DIM, letterSpacing: "0.08em" }}>
            bqa_viewer :: {SCREENSHOTS[active].label}.png
          </span>
          <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem", color: "rgba(226,232,240,0.2)" }}>
            {active + 1}/{SCREENSHOTS.length}
          </span>
        </div>
        <div style={{ position: "relative", paddingBottom: "56.25%" }}>
          {SCREENSHOTS.map((s, i) => (
            <img key={s.label} src={s.src} alt={s.label}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", opacity: i === active ? 1 : 0, transition: "opacity 0.5s ease" }}
            />
          ))}
        </div>
      </div>

      {/* Caption */}
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: DIM, lineHeight: 1.5, marginBottom: "10px", minHeight: "2.4em" }}>
        {SCREENSHOTS[active].caption}
      </p>

      {/* Thumbnail strip */}
      <div style={{ display: "flex", gap: "6px" }}>
        {SCREENSHOTS.map((s, i) => (
          <button key={s.label} onClick={() => setActive(i)}
            style={{
              flex: 1, aspectRatio: "16/9",
              border: `1px solid ${i === active ? C : "rgba(255,255,255,0.08)"}`,
              borderRadius: "4px", overflow: "hidden",
              background: "#05050f", padding: 0, cursor: "pointer",
              boxShadow: i === active ? `0 0 8px rgba(0,229,255,0.3)` : "none",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
          >
            <img src={s.src} alt={s.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </button>
        ))}
      </div>
    </div>
  );
};

/* ── NightMOTH module grid ── */
const NightMOTH = () => {
  const [active, setActive] = useState(0);
  const STATUS_COLOR: Record<string,string> = { armed: G, active: C, idle: DIM, critical: "#ef4444" };

  return (
    <div style={{ marginTop: "24px" }}>
      {/* Terminal header */}
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "8px 14px",
        background: "rgba(0,229,255,0.03)",
        border: "1px solid rgba(0,229,255,0.15)",
        borderBottom: "none",
        borderRadius: "5px 5px 0 0",
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        <span className="status-dot" />
        <span style={{ fontSize: "0.62rem", fontWeight: 700, color: C, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          NightMOTH :: Attack_Modules
        </span>
        <span style={{ marginLeft: "auto", fontSize: "0.58rem", color: DIM }}>v2.4 // {MODULES.length} modules loaded</span>
      </div>

      {/* Module grid */}
      <div style={{ border: "1px solid rgba(0,229,255,0.12)", borderRadius: "0 0 5px 5px", overflow: "hidden", background: "rgba(0,0,0,0.25)" }}>
        {/* Tab row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", padding: "10px 12px", borderBottom: "1px solid rgba(0,229,255,0.08)" }}>
          {MODULES.map((m, i) => (
            <button key={m.id} onClick={() => setActive(i)}
              style={{
                padding: "3px 10px", borderRadius: "3px",
                border: `1px solid ${i === active ? STATUS_COLOR[m.status] : "rgba(255,255,255,0.08)"}`,
                background: i === active ? `rgba(${m.status === "armed" ? "34,197,94" : m.status === "active" ? "0,229,255" : m.status === "critical" ? "239,68,68" : "255,255,255"},0.1)` : "transparent",
                color: i === active ? STATUS_COLOR[m.status] : DIM,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.64rem", fontWeight: 700, cursor: "pointer",
                transition: "all 0.18s",
                display: "flex", alignItems: "center", gap: "5px",
              }}
            >
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: STATUS_COLOR[m.status], flexShrink: 0, boxShadow: `0 0 4px ${STATUS_COLOR[m.status]}` }} />
              {m.label}
            </button>
          ))}
        </div>

        {/* Description */}
        <div style={{ padding: "10px 14px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: DIM }}>
              [{MODULES[active].id}] :: status=
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: STATUS_COLOR[MODULES[active].status], fontWeight: 700 }}>
              {MODULES[active].status.toUpperCase()}
            </span>
          </div>
          <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: TEXT, lineHeight: 1.65, minHeight: "3em" }}>
            {MODULES[active].desc}
          </p>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const headRef  = useScrollReveal();
  const cardRef  = useScrollReveal({ rootMargin: "0px 0px -60px 0px" });
  const statsRef = useScrollReveal({ rootMargin: "0px 0px -40px 0px" });

  return (
    <section id="projects" style={{ background: BG, padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* Heading */}
        <div ref={headRef} className="sr-hidden" style={{ marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.28em", color: C, marginBottom: "1rem" }}>
            {"// Projects"}
          </p>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(2.2rem,6vw,3.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: BOLD, marginBottom: "1rem" }}>
            Things_I've_Built
          </h2>
          <div className="amber-line" />
        </div>

        {/* BehemothQA card */}
        <div ref={cardRef} className="sr-hidden sr-delay-1">
          <div style={{
            borderRadius: "8px", overflow: "hidden",
            background: "rgba(255,255,255,0.025)",
            backdropFilter: "blur(16px) saturate(1.2)",
            border: "1px solid rgba(0,229,255,0.15)",
            boxShadow: "0 0 60px rgba(0,229,255,0.04), 0 20px 60px rgba(0,0,0,0.4)",
          }}>
            {/* Dashboard header */}
            <div style={{
              padding: "12px 18px",
              borderBottom: "1px solid rgba(0,229,255,0.1)",
              background: "rgba(0,229,255,0.03)",
              display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap",
            }}>
              <span className="status-dot" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", fontWeight: 800, color: C, letterSpacing: "0.1em" }}>
                BehemothQA
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: DIM }}>v2.4 :: Python</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: G, marginLeft: "4px" }}>LIVE</span>
              <div style={{ marginLeft: "auto", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {["PYTHON","UI/UX QA","SECURITY","DDoS","SQL WORKBENCH","NIGHTMOTH"].map(tag => (
                  <span key={tag} style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.08em",
                    padding: "2px 8px", borderRadius: "2px",
                    border: `1px solid rgba(0,229,255,0.25)`,
                    color: "rgba(0,229,255,0.7)",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "20px 18px" }}>
              {/* Tagline with halo */}
              <div style={{ position: "relative", marginBottom: "14px" }}>
                <div style={{
                  position: "absolute", top: "50%", left: 0,
                  transform: "translateY(-50%)",
                  width: "200px", height: "60px",
                  background: "radial-gradient(ellipse at 30% 50%, rgba(0,229,255,0.12) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />
                <h3 className="chroma-hover" style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "1rem", fontWeight: 800,
                  color: BOLD, letterSpacing: "0.04em", position: "relative",
                }}>
                  Project: <span style={{ color: C, textShadow: `0 0 14px rgba(0,229,255,0.5)` }}>BehemothQA</span>
                </h3>
              </div>

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: DIM, fontStyle: "italic", marginBottom: "12px" }}>
                "Because small bugs deserve heavy consequences."
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.65, color: TEXT, marginBottom: "20px" }}>
                A full-scale QA platform built from scratch in Python. Runs automated test suites across
                UI/UX, security, and functional domains, performs DDoS and load testing, includes a built-in
                SQL workbench, and delivers structured multi-section reports covering hundreds of individual checks per run.
              </p>

              {/* Screenshot gallery */}
              <Gallery />

              {/* NightMOTH */}
              <NightMOTH />

              {/* Code-style stats */}
              <div ref={statsRef} className="sr-hidden sr-delay-2" style={{ marginTop: "24px", padding: "14px 16px", borderRadius: "5px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(0,229,255,0.1)", fontFamily: "'JetBrains Mono', monospace" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", borderBottom: "1px solid rgba(0,229,255,0.08)", paddingBottom: "8px" }}>
                  <span className="status-dot" style={{ background: V, boxShadow: `0 0 5px ${V}` }} />
                  <span style={{ fontSize: "0.62rem", color: DIM, letterSpacing: "0.1em", textTransform: "uppercase" }}>output_documentation.ts</span>
                </div>
                {STATS.map((s, i) => (
                  <div key={s.key} style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: i < STATS.length - 1 ? "4px" : 0 }}>
                    <span style={{ fontSize: "0.72rem", color: V, minWidth: "14ch" }}>{s.key}</span>
                    <span style={{ fontSize: "0.72rem", color: "rgba(226,232,240,0.35)" }}>=</span>
                    <span style={{ fontSize: "0.82rem", fontWeight: 800, color: s.color, textShadow: `0 0 10px ${s.color}50` }}>{s.val}<span style={{ fontSize: "0.72rem", fontWeight: 400, color: DIM }}>{s.suffix}</span></span>
                    <span style={{ fontSize: "0.68rem", color: "rgba(226,232,240,0.18)" }}>;</span>
                  </div>
                ))}
                <div style={{ marginTop: "14px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {["UI/UX", "Security", "Functional", "Load & DDoS", "Humanized QA", "SQL Workbench"].map(s => (
                    <span key={s} style={{ padding: "2px 8px", borderRadius: "3px", background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.18)", color: V, fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.05em" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ marginTop: "18px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a href="https://settings-qa-ai.replit.app" target="_blank" rel="noopener noreferrer"
                  className="scanline-btn"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "8px 18px", borderRadius: "4px",
                    background: C, color: "#070711",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.78rem", fontWeight: 700, textDecoration: "none",
                    transition: "opacity 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "0.85"; el.style.boxShadow = `0 0 20px rgba(0,229,255,0.4)`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "1"; el.style.boxShadow = "none"; }}
                >
                  Launch App <ExternalLink style={{ width: "12px", height: "12px" }} />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;
