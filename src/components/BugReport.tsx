import { useState } from "react";
import { Send, ChevronDown, Terminal } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BG     = "#070711";
const C      = "#00e5ff";
const V      = "#a78bfa";
const G      = "#22c55e";
const TEXT   = "rgba(226,232,240,0.72)";
const MUTED  = "rgba(226,232,240,0.3)";
const BORDER = "rgba(0,229,255,0.15)";

const FIELD: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(0,229,255,0.14)",
  borderRadius: "4px",
  color: "#f1f5f9",
  padding: "8px 12px",
  width: "100%",
  outline: "none",
  fontSize: "0.875rem",
  fontFamily: "'Inter', sans-serif",
};

const LABEL: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.65rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: MUTED,
  display: "block",
  marginBottom: "5px",
};

const Badge = ({ children, color }: { children: React.ReactNode; color: "red" | "cyan" | "green" }) => {
  const map = { red: ["rgba(239,68,68,0.12)", "#f87171", "rgba(239,68,68,0.25)"], cyan: ["rgba(0,229,255,0.1)", C, BORDER], green: ["rgba(34,197,94,0.1)", G, "rgba(34,197,94,0.25)"] };
  const [bg, col, border] = map[color];
  return (
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", padding: "2px 8px", borderRadius: "3px", background: bg, color: col, border: `1px solid ${border}` }}>
      {children}
    </span>
  );
};

const issueTypes = ["Hire Request", "Portfolio Feedback", "Bug Found", "Collaboration", "Other"];

const BugReport = () => {
  const [issueType, setIssueType] = useState("Hire Request");
  const [submitted, setSubmitted] = useState(false);
  const headRef = useScrollReveal();
  const cardRef = useScrollReveal({ rootMargin: "0px 0px -40px 0px" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.append("_subject", `[${issueType}] ${data.get("summary") || "New ticket from QAblog"}`);
    data.append("_captcha", "false");
    data.append("issue_type", issueType);
    fetch("https://formsubmit.co/ajax/milrad.johnathan19@gmail.com", {
      method: "POST", body: data, headers: { Accept: "application/json" },
    }).then(() => setSubmitted(true)).catch(() => setSubmitted(true));
  };

  return (
    <section id="contact" style={{ background: BG, padding: "6rem 1.5rem" }}>
      <style>{`
        @media (max-width: 520px) {
          .br-row-2 { grid-template-columns: 1fr !important; }
          .br-ticket-header { flex-direction: column; align-items: flex-start !important; }
          .br-form { padding: 16px 14px !important; }
          .br-footer-row { flex-direction: column; align-items: stretch !important; }
          .br-submit-btn { width: 100% !important; justify-content: center !important; }
          .br-footer-hint { display: none !important; }
        }
        input::placeholder, textarea::placeholder, select option { color: rgba(226,232,240,0.25); }
        input:focus, textarea:focus, select:focus { border-color: #00e5ff !important; box-shadow: 0 0 0 2px rgba(0,229,255,0.1) !important; }
        select { background: rgba(255,255,255,0.03); }
        select option { background: #0d0d1f; color: #f1f5f9; }
      `}</style>

      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* Heading */}
        <div ref={headRef} className="sr-hidden" style={{ marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.28em", color: C, marginBottom: "1rem" }}>
            {"// Contact"}
          </p>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(2rem,6vw,3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#f1f5f9", marginBottom: "1rem" }}>
            Found_a_bug?
          </h2>
          <div className="amber-line" style={{ marginBottom: "1.2rem" }} />
          <p style={{ fontFamily: "'Inter', sans-serif", color: MUTED, fontSize: "0.9rem" }}>
            Or just want to hire me? Submit a ticket. I respond to every CRITICAL.
          </p>
        </div>

        {/* Terminal-style ticket card */}
        <div ref={cardRef} className="sr-hidden sr-delay-1" style={{
          borderRadius: "6px", overflow: "hidden",
          background: "rgba(255,255,255,0.025)",
          backdropFilter: "blur(16px) saturate(1.2)",
          border: `1px solid ${BORDER}`,
          boxShadow: "0 0 40px rgba(0,229,255,0.04)",
        }}>
          {/* Terminal title bar */}
          <div className="br-ticket-header" style={{
            background: "rgba(0,229,255,0.03)",
            borderBottom: `1px solid ${BORDER}`,
            padding: "10px 18px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "8px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Terminal style={{ width: "13px", height: "13px", color: C }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700, color: C }}>
                BUG-001
              </span>
              <span style={{ color: "rgba(0,229,255,0.2)" }}>|</span>
              <Badge color="red">🔴 Priority: Critical</Badge>
              <Badge color="cyan">Status: Open</Badge>
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: MUTED }}>Assignee: Johnatan Milrad</span>
          </div>

          {submitted ? (
            <div style={{ padding: "48px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>✅</div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "#f1f5f9", fontSize: "1rem", marginBottom: "6px" }}>
                Ticket submitted successfully
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", color: MUTED, fontSize: "0.85rem" }}>
                Status updated to <Badge color="green">In Progress</Badge>. I'll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="br-form" style={{ padding: "20px 18px", display: "flex", flexDirection: "column", gap: "16px" }}>

              <div className="br-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "14px" }}>
                <div>
                  <label style={LABEL}>Issue Type</label>
                  <div style={{ position: "relative" }}>
                    <select value={issueType} onChange={e => setIssueType(e.target.value)}
                      style={{ ...FIELD, paddingRight: "28px", appearance: "none", cursor: "pointer" }}>
                      {issueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <ChevronDown style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", width: "14px", color: MUTED, pointerEvents: "none" }} />
                  </div>
                </div>
                <div>
                  <label style={LABEL}>Summary *</label>
                  <input name="summary" type="text" required placeholder="e.g. Johnatan is suspiciously good at this" style={FIELD} />
                </div>
              </div>

              <div>
                <label style={LABEL}>Steps to Reproduce / Message</label>
                <textarea name="steps" rows={4}
                  placeholder={"1. Open portfolio\n2. Notice the QA mindset\n3. Decide to reach out"}
                  style={{ ...FIELD, resize: "vertical", lineHeight: "1.55" }} />
              </div>

              <div>
                <label style={LABEL}>Expected Behaviour</label>
                <input name="expected" type="text" placeholder="e.g. Johnatan replies within 24h and we schedule a call" style={FIELD} />
              </div>

              <div className="br-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={LABEL}>Reporter Name</label>
                  <input name="reporter" type="text" placeholder="Your name" style={FIELD} />
                </div>
                <div>
                  <label style={LABEL}>Reporter Email *</label>
                  <input name="email" type="email" required placeholder="your@email.com" style={FIELD} />
                </div>
              </div>

              <div className="br-footer-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "4px", borderTop: `1px solid ${BORDER}`, flexWrap: "wrap", gap: "12px" }}>
                <span className="br-footer-hint" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "rgba(226,232,240,0.2)" }}>
                  * required · severity = CRITICAL
                </span>
                <button type="submit" className="br-submit-btn scanline-btn"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "9px 22px", borderRadius: "4px", border: "none",
                    background: C, color: "#070711",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 800, fontSize: "0.78rem", letterSpacing: "0.06em",
                    cursor: "pointer", transition: "opacity 0.15s, box-shadow 0.15s",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.opacity = "0.85"; el.style.boxShadow = "0 0 16px rgba(0,229,255,0.4)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.opacity = "1"; el.style.boxShadow = "none"; }}
                >
                  <Send style={{ width: "13px", height: "13px" }} />
                  Deploy Message
                </button>
              </div>
            </form>
          )}
        </div>

        <p style={{ marginTop: "16px", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "rgba(226,232,240,0.22)", lineHeight: 1.7 }}>
          {"// If the ticket system itself has a bug. How ironic."}<br />
          {"Escalate → "}<a href="tel:+972523516364" style={{ color: "rgba(0,229,255,0.6)", textDecoration: "none" }}>+972 523516364</a>
        </p>

      </div>
    </section>
  );
};

export default BugReport;
