import { GraduationCap } from "lucide-react";
import { useRef, useCallback } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const C     = "#00e5ff";
const V     = "#a78bfa";
const C_DIM = "rgba(0,229,255,0.1)";
const C_B   = "rgba(0,229,255,0.25)";
const BOLD  = "#f1f5f9";
const TEXT  = "rgba(226,232,240,0.62)";
const MUTED = "rgba(226,232,240,0.35)";

const cert = {
  icon: GraduationCap,
  title: "Manual QA Engineer",
  issuer: "QA Course",
  description:
    "Covered the full manual testing lifecycle: test case design, bug reporting, regression testing, test plan creation, and defect tracking in Jira. Includes theory and hands-on practice across web and mobile platforms.",
  tags: ["Test Case Design", "Bug Lifecycle", "Regression Testing", "Jira", "Web & Mobile QA"],
};

const MAX_TILT = 14;
const PERSPECTIVE = 900;

function TiltCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number | null>(null);
  const Icon = cert.icon;

  const applyTilt = useCallback((clientX: number, clientY: number) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const dx = (clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const dy = (clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
    const gx = ((clientX - rect.left) / rect.width)  * 100;
    const gy = ((clientY - rect.top)  / rect.height) * 100;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      card.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${-dy * MAX_TILT}deg) rotateY(${dx * MAX_TILT}deg) scale3d(1.02,1.02,1.02)`;
      card.style.transition = "transform 0.08s ease-out";
      glow.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(0,229,255,0.14) 0%, transparent 60%)`;
      glow.style.opacity = "1";
    });
  }, []);

  const resetTilt = useCallback(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    card.style.transform = `perspective(${PERSPECTIVE}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    card.style.transition = "transform 0.45s cubic-bezier(0.23,1,0.32,1)";
    glow.style.opacity = "0";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={e => applyTilt(e.clientX, e.clientY)}
      onMouseLeave={resetTilt}
      onTouchMove={e => { e.preventDefault(); applyTilt(e.touches[0].clientX, e.touches[0].clientY); }}
      onTouchEnd={resetTilt}
      onTouchCancel={resetTilt}
      style={{
        position: "relative", width: "100%", maxWidth: "36rem",
        borderRadius: "6px", overflow: "hidden",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(16px) saturate(1.2)",
        border: "1px solid rgba(0,229,255,0.15)",
        boxShadow: "0 0 40px rgba(0,229,255,0.05), 0 20px 60px rgba(0,0,0,0.5)",
        transformStyle: "preserve-3d", willChange: "transform",
        cursor: "default", touchAction: "none",
      }}
    >
      <div ref={glowRef} style={{ position: "absolute", inset: 0, opacity: 0, transition: "opacity 0.2s", pointerEvents: "none", zIndex: 1, borderRadius: "inherit" }} />

      {/* Cyan top bar */}
      <div style={{ height: "2px", background: `linear-gradient(90deg, ${C}, ${V})`, position: "relative", zIndex: 2 }} />

      <div style={{ padding: "2rem", position: "relative", zIndex: 2 }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
          <div style={{ flexShrink: 0, padding: "0.75rem", borderRadius: "5px", background: C_DIM, border: `1px solid ${C_B}`, transform: "translateZ(20px)" }}>
            <Icon style={{ width: "1.4rem", height: "1.4rem", color: C }} strokeWidth={1.5} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.05rem", fontWeight: 700, color: BOLD, marginBottom: "0.15rem", transform: "translateZ(15px)" }}>
              {cert.title}
            </h3>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: C }}>{cert.issuer}</p>
          </div>
          <span style={{
            flexShrink: 0, padding: "0.2rem 0.6rem",
            borderRadius: "3px", fontSize: "0.65rem", fontWeight: 700,
            fontFamily: "'JetBrains Mono', monospace",
            background: C_DIM, border: `1px solid ${C_B}`,
            color: C, transform: "translateZ(10px)",
          }}>
            Graduate
          </span>
        </div>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.65, color: TEXT, marginBottom: "1.1rem", transform: "translateZ(8px)" }}>
          {cert.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", transform: "translateZ(12px)" }}>
          {cert.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "'JetBrains Mono', monospace",
              padding: "0.22rem 0.6rem", borderRadius: "3px",
              fontSize: "0.67rem", fontWeight: 500,
              background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.14)",
              color: MUTED,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const Certifications = () => {
  const headRef = useScrollReveal();
  const cardRef = useScrollReveal({ rootMargin: "0px 0px -60px 0px" });

  return (
    <section className="section-padding" id="certifications" style={{ background: "#070711" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div ref={headRef} className="sr-hidden">
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.28em", color: C, marginBottom: "1rem" }}>
            {"// Education"}
          </p>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(2.2rem,6vw,3.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: BOLD, marginBottom: "1rem" }}>
            Certifications
          </h2>
          <div className="amber-line" style={{ marginBottom: "3.5rem" }} />
        </div>

        <div ref={cardRef} className="sr-hidden sr-delay-1" style={{ display: "flex", justifyContent: "center" }}>
          <TiltCard />
        </div>
      </div>
    </section>
  );
};

export default Certifications;
