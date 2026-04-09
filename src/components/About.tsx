import { useScrollReveal } from "@/hooks/useScrollReveal";

const C   = "#00e5ff";
const V   = "#a78bfa";
const T   = "rgba(226,232,240,0.72)";
const B   = "#f1f5f9";
const M   = "rgba(226,232,240,0.35)";

const About = () => {
  const headRef  = useScrollReveal();
  const p1Ref    = useScrollReveal({ rootMargin: "0px 0px -40px 0px" });
  const p2Ref    = useScrollReveal({ rootMargin: "0px 0px -40px 0px" });
  const p3Ref    = useScrollReveal({ rootMargin: "0px 0px -40px 0px" });
  const statsRef = useScrollReveal({ rootMargin: "0px 0px -40px 0px" });

  return (
    <section id="about" className="section-padding" style={{ background: "#070711" }}>
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>

        {/* Label */}
        <div ref={headRef} className="sr-hidden">
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.28em", color: C, marginBottom: "1rem" }}>
            {"// Background"}
          </p>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(2.2rem,6vw,3.8rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: B, marginBottom: "1rem" }}>
            About_Me
          </h2>
          <div className="amber-line" style={{ marginBottom: "3.5rem" }} />
        </div>

        {/* Paragraphs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem", fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.95rem,2vw,1.05rem)", lineHeight: 1.8, color: T }}>

          <p ref={p1Ref} className="sr-hidden sr-delay-1">
            I'm <span style={{ color: B, fontWeight: 600 }}>Johnatan Milrad</span>, a 33-year-old based in{" "}
            <span style={{ color: B, fontWeight: 600 }}>Ashdod, Israel</span>, at the very beginning of my journey as a{" "}
            <span style={{ color: C, fontWeight: 600 }}>QA Engineer</span>.
            {" "}Not coming from a traditional software background — and that's exactly what makes my perspective worth paying attention to.
          </p>

          <p ref={p2Ref} className="sr-hidden sr-delay-2">
            On my own I've been creating designs using{" "}
            <span style={{ color: B, fontWeight: 600 }}>Figma</span>,{" "}
            <span style={{ color: B, fontWeight: 600 }}>Photoshop</span>, and{" "}
            <span style={{ color: B, fontWeight: 600 }}>Illustrator</span>
            {" "}— all self-taught. That journey sharpened my eye: when something is visually off, when a flow feels awkward, when a layout doesn't serve the user. Those same instincts carry directly into QA.
          </p>

          <p ref={p3Ref} className="sr-hidden sr-delay-3">
            I graduated a <span style={{ color: V, fontWeight: 600 }}>Manual QA course</span>, gaining a solid foundation in test case design, bug lifecycle management, and testing methodologies. On top of that I've built independently:{" "}
            <span style={{ color: B, fontWeight: 600 }}>writing test cases</span>,
            exploring <span style={{ color: B, fontWeight: 600 }}>API testing with Postman</span>, and getting hands-on with{" "}
            <span style={{ color: B, fontWeight: 600 }}>Jira</span>.
          </p>

        </div>

        {/* Stats */}
        <div ref={statsRef} className="sr-hidden sr-delay-2" style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginTop: "4rem", paddingTop: "2.5rem", borderTop: "1px solid rgba(0,229,255,0.08)" }}>
          {[
            { num: "300+", label: "automated checks / run",  color: C },
            { num: "6",    label: "NightMOTH attack modules", color: V },
            { num: "4",    label: "severity tiers per report", color: "#22c55e" },
          ].map(s => (
            <div key={s.num} style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(1.8rem,5vw,2.6rem)", fontWeight: 900, color: s.color, lineHeight: 1, textShadow: `0 0 20px ${s.color}50` }}>
                {s.num}
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: M, maxWidth: "14ch" }}>{s.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
