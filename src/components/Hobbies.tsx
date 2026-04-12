import { Headphones, Palette, Bike, Gamepad2, LucideIcon } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const C    = "#00e5ff";
const V    = "#a78bfa";
const BOLD = "#f1f5f9";
const TEXT = "rgba(226,232,240,0.58)";

interface HobbyData {
  title: string;
  icon: LucideIcon;
  animClass: string;
  accent: string;
  delay: "sr-delay-1" | "sr-delay-2" | "sr-delay-3" | "sr-delay-4";
  desc: string;
}

const hobbies: HobbyData[] = [
  { title: "DJing_&_Music",       icon: Headphones, animClass: "dj-animation",     accent: C, delay: "sr-delay-1",
    desc: "Crafting sonic experiences with Cubase, FL Studio, and Ableton. Music production trains the ear for subtle imperfections, a mindset that carries directly into QA." },
  { title: "Design_&_Creativity", icon: Palette,    animClass: "design-animation", accent: V, delay: "sr-delay-2",
    desc: "Bringing ideas to life through Figma, Photoshop, and Illustrator. A strong design sense helps evaluate UX quality and catch visual regressions others miss." },
  { title: "Motorcycle_Riding",   icon: Bike,       animClass: "bike-animation",   accent: C, delay: "sr-delay-3",
    desc: "Freedom on two wheels. Riding demands constant situational awareness and fast decisions, skills that translate well to high-pressure testing environments." },
  { title: "Competitive_Gaming",  icon: Gamepad2,   animClass: "gaming-animation", accent: V, delay: "sr-delay-4",
    desc: "Strategic thinking, pattern recognition, rapid iteration. Every session practices identifying edge cases, reproducing issues, and communicating clearly under pressure." },
];

/* Extracted to its own component so the hook is always called at the top level */
const HobbyCard = ({ h }: { h: HobbyData }) => {
  const cardRef = useScrollReveal({ rootMargin: "0px 0px -40px 0px" });
  const Icon = h.icon;

  return (
    <div
      ref={cardRef}
      className={`sr-hidden ${h.delay} glass ${h.animClass}`}
      style={{
        padding: "1.5rem",
        borderRadius: "6px",
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = h.accent === C ? "rgba(0,229,255,0.3)" : "rgba(167,139,250,0.3)";
        el.style.boxShadow = h.accent === C ? "0 0 20px rgba(0,229,255,0.06)" : "0 0 20px rgba(167,139,250,0.06)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(255,255,255,0.08)";
        el.style.boxShadow = "none";
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <Icon style={{ width: "1.3rem", height: "1.3rem", color: h.accent }} strokeWidth={1.5} />
      </div>
      <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", fontWeight: 700, color: BOLD, marginBottom: "0.6rem" }}>
        {h.title}
      </h3>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", lineHeight: 1.65, color: TEXT }}>
        {h.desc}
      </p>
    </div>
  );
};

const Hobbies = () => {
  const headRef = useScrollReveal();

  return (
    <section id="hobbies" style={{ padding: "6rem 1.5rem", background: "#070711" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <div ref={headRef} className="sr-hidden" style={{ marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.28em", color: C, marginBottom: "1rem" }}>
            {"// Beyond the Test Suite"}
          </p>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(2.2rem,6vw,3.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: BOLD, marginBottom: "1rem" }}>
            Who_I_Am_Outside_Work
          </h2>
          <div className="amber-line" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "1rem" }}>
          {hobbies.map(h => <HobbyCard key={h.title} h={h} />)}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
