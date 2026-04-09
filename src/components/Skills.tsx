import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClipboardCheck, Wrench, Palette, Brain } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const C   = "#00e5ff";
const V   = "#a78bfa";
const BOLD = "#f1f5f9";
const MUTED = "rgba(226,232,240,0.32)";
const TEXT  = "rgba(226,232,240,0.62)";

const BASE = "https://raw.githubusercontent.com/Keves1337/johnqablog/main/src/assets";

const toolImages: Record<string, { image: string; alt: string }> = {
  "Figma":              { image: `${BASE}/tools/figma.jpg`,        alt: "Figma" },
  "Photoshop":          { image: `${BASE}/tools/photoshop.jpg`,    alt: "Photoshop" },
  "Illustrator":        { image: `${BASE}/tools/illustrator.jpg`,  alt: "Illustrator" },
  "UI/UX Design":       { image: `${BASE}/tools/uiux.jpg`,         alt: "UI/UX" },
  "Problem Solving":    { image: `${BASE}/skills/problem-solving.jpg`,    alt: "Problem Solving" },
  "Attention to Detail":{ image: `${BASE}/skills/attention-detail.jpg`,   alt: "Attention to Detail" },
  "Team Collaboration": { image: `${BASE}/skills/team-collaboration.jpg`, alt: "Collaboration" },
  "Creative Thinking":  { image: `${BASE}/skills/creative-thinking.jpg`,  alt: "Creative Thinking" },
};

const skillsData = [
  { icon: ClipboardCheck, title: "QA_Methods", animClass: "qa-animation", accent: C,
    tools: ["Manual QA Graduate", "Manual Testing", "Test Case Design", "Bug Reporting", "Regression Testing"] },
  { icon: Wrench, title: "Tools_&_Platforms", animClass: "tools-animation", accent: V,
    tools: ["Jira", "Python", "BehemothQA", "GitHub"] },
  { icon: Palette, title: "Design_&_UX", animClass: "design-animation", accent: C,
    tools: ["Figma", "Photoshop", "Illustrator", "UI/UX Design"] },
  { icon: Brain, title: "Core_Skills", animClass: "skills-animation", accent: V,
    tools: ["Problem Solving", "Attention to Detail", "Team Collaboration", "Creative Thinking"] },
];

/* ── Spotlight grid ── */
const SpotlightGrid = ({ children }: { children: React.ReactNode }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    gridRef.current?.querySelectorAll<HTMLElement>(".spotlight-card").forEach(card => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  }, []);
  const handleMouseLeave = useCallback(() => {
    gridRef.current?.querySelectorAll<HTMLElement>(".spotlight-card").forEach(card => {
      card.style.setProperty("--mx", "-999px");
      card.style.setProperty("--my", "-999px");
    });
  }, []);

  return (
    <>
      <style>{`
        .spotlight-card {
          --mx: -999px; --my: -999px;
          position: relative;
          background: rgba(255,255,255,0.025);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 6px;
          padding: 1.5rem;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .spotlight-card::before {
          content: '';
          position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(280px circle at var(--mx) var(--my), rgba(0,229,255,0.1) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .spotlight-card::after {
          content: '';
          position: absolute; inset: -1px; border-radius: inherit;
          background: radial-gradient(260px circle at var(--mx) var(--my), rgba(0,229,255,0.35) 0%, transparent 65%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          padding: 1px; pointer-events: none; z-index: 0;
          opacity: 0; transition: opacity 0.3s;
        }
        .spotlight-card:hover::after { opacity: 1; }
        .spotlight-card:hover { box-shadow: 0 0 30px rgba(0,229,255,0.06); }
        .spotlight-card > * { position: relative; z-index: 1; }
      `}</style>
      <div
        ref={gridRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1px",
          background: "rgba(255,255,255,0.04)",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {children}
      </div>
    </>
  );
};

const Skills = () => {
  const [selectedTool, setSelectedTool] = useState<{ name: string; image: string; alt: string } | null>(null);
  const headRef = useScrollReveal();
  const gridRef = useScrollReveal({ rootMargin: "0px 0px -60px 0px" });

  return (
    <section id="skills" style={{ padding: "6rem 1.5rem", background: "#070711" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <div ref={headRef} className="sr-hidden">
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.28em", color: C, marginBottom: "1rem" }}>
            {"// Expertise"}
          </p>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(2.2rem,6vw,3.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: BOLD, marginBottom: "1rem" }}>
            Skills_&amp;_Tools
          </h2>
          <div className="amber-line" style={{ marginBottom: "3.5rem" }} />
        </div>

        <div ref={gridRef} className="sr-hidden sr-delay-1">
          <SpotlightGrid>
            {skillsData.map(skill => {
              const Icon = skill.icon;
              return (
                <div key={skill.title} className={`spotlight-card ${skill.animClass}`}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                    <div style={{ padding: "0.55rem", borderRadius: "5px", background: `rgba(${skill.accent === C ? "0,229,255" : "167,139,250"},0.1)`, border: `1px solid rgba(${skill.accent === C ? "0,229,255" : "167,139,250"},0.22)`, flexShrink: 0 }}>
                      <Icon style={{ width: "1.1rem", height: "1.1rem", color: skill.accent }} strokeWidth={1.5} />
                    </div>
                    <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.88rem", fontWeight: 700, color: BOLD }}>{skill.title}</h3>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    {skill.tools.map(tool => {
                      const isBehemoth = tool === "BehemothQA";
                      return isBehemoth ? (
                        <a key={tool} href="https://settings-qa-ai.replit.app" target="_blank" rel="noopener noreferrer"
                          className="scanline-btn"
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "0.45rem 0.7rem", borderRadius: "4px",
                            background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.35)",
                            color: C, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", fontWeight: 600,
                            textDecoration: "none", transition: "background 0.15s, box-shadow 0.15s",
                          }}
                          onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(0,229,255,0.15)"; el.style.boxShadow = "0 0 12px rgba(0,229,255,0.2)"; }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(0,229,255,0.08)"; el.style.boxShadow = "none"; }}
                        >
                          <span>⚡ BehemothQA</span>
                          <span style={{ fontSize: "0.62rem", opacity: 0.7 }}>mine ↗</span>
                        </a>
                      ) : (
                        <button key={tool} onClick={() => { if (toolImages[tool]) setSelectedTool({ name: tool, ...toolImages[tool] }); }}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "0.45rem 0.7rem", borderRadius: "4px",
                            background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)",
                            color: TEXT, fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 500,
                            cursor: toolImages[tool] ? "pointer" : "default", width: "100%", textAlign: "left",
                            transition: "background 0.15s, border-color 0.15s, color 0.15s",
                          }}
                          onMouseEnter={e => { if (!toolImages[tool]) return; const el = e.currentTarget as HTMLButtonElement; el.style.background = "rgba(0,229,255,0.05)"; el.style.borderColor = "rgba(0,229,255,0.2)"; el.style.color = BOLD; }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "rgba(255,255,255,0.025)"; el.style.borderColor = "rgba(255,255,255,0.06)"; el.style.color = TEXT; }}
                        >
                          {tool}
                          {toolImages[tool] && <span style={{ fontSize: "0.62rem", color: C, opacity: 0.6 }}>↗</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </SpotlightGrid>
        </div>
      </div>

      <Dialog open={!!selectedTool} onOpenChange={() => setSelectedTool(null)}>
        <DialogContent style={{ background: "rgba(7,7,17,0.95)", backdropFilter: "blur(20px)", border: "1px solid rgba(0,229,255,0.15)", maxWidth: "680px" }}>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "'JetBrains Mono', monospace", color: BOLD, fontSize: "1.2rem" }}>{selectedTool?.name}</DialogTitle>
          </DialogHeader>
          {selectedTool && (
            <img src={selectedTool.image} alt={selectedTool.alt} style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "5px", border: "1px solid rgba(0,229,255,0.12)", marginTop: "1rem" }} />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Skills;
