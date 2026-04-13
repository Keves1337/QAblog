import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Mail, Phone, MapPin, Send, Shield, Zap, Eye, ChevronDown, ArrowUpRight } from "lucide-react";

/* ─── Palette ───────────────────────────────────────────────────────────── */
const ACC   = "#818cf8";
const A_DIM = "rgba(129,140,248,0.1)";
const BOLD  = "#f8fafc";
const TEXT  = "rgba(248,250,252,0.5)";
const MUTED = "rgba(248,250,252,0.2)";
const G     = "#22c55e";
const BASE  = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

/* ─── Motion variants ───────────────────────────────────────────────────── */
// Container staggers children; each card flips up from a 3D angle
const ctn = { hidden: {}, show: { transition: { staggerChildren: 0.082, delayChildren: 0.12 } } };
const cardV = {
  hidden: { opacity: 0, y: 30, rotateX: 14, scale: 0.95 },
  show:   { opacity: 1, y: 0,  rotateX: 0,  scale: 1,
    transition: { type: "spring", damping: 20, stiffness: 260 } },
};

/* ─── Hook: detect mobile (< 768 px) ───────────────────────────────────── */
const useIsMobile = () => {
  const [m, setM] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return m;
};

/*
 * BentoCard — two-layer design:
 *   outer  <motion.div>  — grid placement, Framer entrance (rotateX flip-in)
 *   inner  <div.bento-card.tilt-target>  — visual styling + interactive 3D tilt
 */
const BC = ({
  children, innerStyle, col, row, minH, className = "",
}: {
  children: React.ReactNode;
  innerStyle?: React.CSSProperties;
  col?: string; row?: string; minH?: string;
  className?: string;
}) => (
  <motion.div variants={cardV}
    style={{ gridColumn: col, gridRow: row, minHeight: minH, display: "flex", flexDirection: "column" }}
  >
    <div className={`bento-card tilt-target ${className}`}
      style={{ padding: "24px", flex: 1, ...innerStyle }}
    >{children}</div>
  </motion.div>
);

/* ─── IDE window ─────────────────────────────────────────────────────────── */
const IDE = () => (
  <div className="ide-window" style={{ flex: 1 }}>
    <div className="ide-bar">
      <span className="ide-dot" style={{ background: "#ff5f57" }} />
      <span className="ide-dot" style={{ background: "#febc2e" }} />
      <span className="ide-dot" style={{ background: "#28c840" }} />
      <span style={{ marginLeft: "10px", color: MUTED, fontSize: "0.68rem" }}>behemoth_qa.py</span>
      <span style={{ marginLeft: "auto" }} className="badge">Python 3.12</span>
    </div>
    <div className="ide-body">
      <pre>
<span className="tok-cm"># BehemothQA v2.4  ·  Security QA Platform</span>{"\n"}
<span className="tok-kw">from</span>{" "}<span className="tok-im">nightmoth</span>{" "}<span className="tok-kw">import</span>{" "}<span className="tok-cls">NightMOTH</span>{", "}<span className="tok-cls">AttackConfig</span>{"\n"}
<span className="tok-kw">from</span>{" "}<span className="tok-im">modules</span>{" "}<span className="tok-kw">import</span>{" "}<span className="tok-cls">WAFGutPunch</span>{", "}<span className="tok-cls">AuthAbyss</span>{"\n\n"}
<span className="tok-var">config</span>{" "}<span className="tok-op">=</span>{" "}<span className="tok-cls">AttackConfig</span>{"(\n"}
{"  "}<span className="tok-pm">target</span><span className="tok-op">=</span><span className="tok-str">"https://target.com"</span>{",\n"}
{"  "}<span className="tok-pm">mode</span><span className="tok-op">=</span><span className="tok-str">"full_scan"</span>{",\n"}
{"  "}<span className="tok-pm">concurrency</span><span className="tok-op">=</span><span className="tok-num">2000</span>{",\n)\n\n"}
<span className="tok-var">scanner</span>{" "}<span className="tok-op">=</span>{" "}<span className="tok-cls">NightMOTH</span>{"("}<span className="tok-var">config</span>{")\n\n"}
<span className="tok-cm"># Execute all 6 NightMOTH attack modules</span>{"\n"}
<span className="tok-var">results</span>{" "}<span className="tok-op">=</span>{" "}<span className="tok-var">scanner</span>.<span className="tok-fn">run</span>{"(\n"}
{"  "}<span className="tok-cls">WAFGutPunch</span>{"("}<span className="tok-pm">payload_size</span><span className="tok-op">=</span><span className="tok-str">"130KB"</span>{"),\n"}
{"  "}<span className="tok-cls">AuthAbyss</span>{"("}<span className="tok-pm">jwt_tokens</span><span className="tok-op">=</span><span className="tok-num">60</span>{"),\n)\n\n"}
<span className="tok-var">report</span>{" "}<span className="tok-op">=</span>{" "}<span className="tok-var">results</span>.<span className="tok-fn">export_pdf</span>{"(\n"}
{"  "}<span className="tok-pm">sections</span><span className="tok-op">=</span>{"["}<span className="tok-str">"security"</span>{", "}<span className="tok-str">"load"</span>{", "}<span className="tok-str">"ui_ux"</span>{"]\n)\n\n"}
<span className="tok-fn">print</span>{"("}<span className="tok-str">f"Scan done: {"{"}<span className="tok-var">results</span>.<span className="tok-var">total_checks</span>{"}"} checks"</span>{")\n"}
<span className="tok-cm"># → Scan done: 300+ checks</span><span className="ide-cursor"/>
      </pre>
    </div>
  </div>
);

/* ─── Contact form ───────────────────────────────────────────────────────── */
const issueTypes = ["Hire Request", "Portfolio Feedback", "Bug Found", "Collaboration", "Other"];
const ContactForm = () => {
  const [type, setType] = useState("Hire Request");
  const [sent, setSent]  = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.append("_subject", `[${type}] from QAblog`);
    fd.append("_captcha", "false");
    fd.append("issue_type", type);
    fetch("https://formsubmit.co/ajax/milrad.johnathan19@gmail.com", {
      method: "POST", body: fd, headers: { Accept: "application/json" },
    }).then(() => setSent(true)).catch(() => setSent(true));
  };
  if (sent) return (
    <div style={{ textAlign: "center", padding: "2rem 0" }}>
      <div style={{ fontSize: "2rem", marginBottom: "10px" }}>✅</div>
      <p style={{ fontWeight: 700, color: BOLD, marginBottom: "6px" }}>Message delivered.</p>
      <p style={{ color: TEXT, fontSize: "0.85rem" }}>I'll get back to you soon.</p>
    </div>
  );
  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div className="contact-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px" }}>
        <div>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, color: MUTED, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Type</div>
          <div style={{ position: "relative" }}>
            <select value={type} onChange={e => setType(e.target.value)} className="noir-input" style={{ appearance: "none", paddingRight: "28px", cursor: "pointer" }}>
              {issueTypes.map(t => <option key={t}>{t}</option>)}
            </select>
            <ChevronDown style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", width: "13px", color: MUTED, pointerEvents: "none" }} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, color: MUTED, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Subject *</div>
          <input name="summary" type="text" required placeholder="What's on your mind?" className="noir-input" />
        </div>
      </div>
      <div>
        <div style={{ fontSize: "0.68rem", fontWeight: 700, color: MUTED, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Message</div>
        <textarea name="message" rows={3} placeholder="Tell me more…" className="noir-input" />
      </div>
      <div className="contact-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <div>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, color: MUTED, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Name</div>
          <input name="name" type="text" placeholder="Your name" className="noir-input" />
        </div>
        <div>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, color: MUTED, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Email *</div>
          <input name="email" type="email" required placeholder="your@email.com" className="noir-input" />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "4px" }}>
        <button type="submit" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "10px 24px", borderRadius: "9px", border: "none",
          background: ACC, color: "#050505", fontWeight: 700, fontSize: "0.85rem",
          fontFamily: "'Inter', sans-serif", cursor: "pointer",
          transition: "opacity 0.15s, box-shadow 0.15s",
        }}
          onMouseEnter={e => { const b = e.currentTarget; b.style.opacity = "0.85"; b.style.boxShadow = "0 0 24px rgba(129,140,248,0.6)"; }}
          onMouseLeave={e => { const b = e.currentTarget; b.style.opacity = "1"; b.style.boxShadow = "none"; }}
        >Send <Send style={{ width: "13px", height: "13px" }} /></button>
      </div>
    </form>
  );
};

/* ─── Skills marquee ─────────────────────────────────────────────────────── */
const SKILLS = [
  "Manual Testing","Test Case Design","Bug Reporting","Regression Testing","Jira",
  "Postman","GitHub","Python","Figma","Photoshop","Illustrator","UI/UX Design",
  "Security Testing","Load Testing","SQL Workbench","DDoS Simulation","NightMOTH",
];
const Marquee = () => (
  <div className="marquee-wrap marquee-mask" style={{ overflow: "hidden", display: "flex" }}>
    {[0, 1].map(k => (
      <div key={k} className="marquee-track" aria-hidden={k === 1}>
        {[...SKILLS, ...SKILLS].map((s, i) => (
          <span key={i} style={{
            flexShrink: 0, padding: "5px 18px", marginRight: "8px",
            borderRadius: "99px", border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.025)",
            fontSize: "0.75rem", fontWeight: 500, color: TEXT, whiteSpace: "nowrap",
          }}>{s}</span>
        ))}
      </div>
    ))}
  </div>
);

/* ─── 3D orbit ring ──────────────────────────────────────────────────────── */
const OrbitRing = ({ size = 80, speed = "10s", opacity = 0.18, dotColor = ACC }: {
  size?: number; speed?: string; opacity?: number; dotColor?: string;
}) => (
  <div style={{
    position: "absolute", width: size, height: size,
    borderRadius: "50%",
    border: `1px solid rgba(129,140,248,${opacity})`,
    animation: `orbit-ring ${speed} linear infinite`,
    transformStyle: "preserve-3d",
    pointerEvents: "none",
  }}>
    <div style={{
      position: "absolute", top: "-4px", left: "50%", transform: "translateX(-50%)",
      width: "7px", height: "7px", borderRadius: "50%",
      background: dotColor, boxShadow: `0 0 12px ${dotColor}`,
    }} />
  </div>
);

/* ─── Ambient bg orbs ────────────────────────────────────────────────────── */
const AmbientBg = () => (
  <>
    <div className="amb amb-1" />
    <div className="amb amb-2" />
    <div className="amb amb-3" />
  </>
);

/* ─── Glass Box ──────────────────────────────────────────────────────────── */
const GbLine = ({ children }: { children: React.ReactNode }) => (
  <div className="gb-line">{children}</div>
);
const Cm = ({ c }: { c: string }) => <span className="gb-cm">{c}</span>;
const Kw = ({ c }: { c: string }) => <span className="gb-kw">{c}</span>;
const Cl = ({ c }: { c: string }) => <span className="gb-cl">{c}</span>;
const St = ({ c }: { c: string }) => <span className="gb-st">{c}</span>;
const Vr = ({ c }: { c: string }) => <span className="gb-vr">{c}</span>;
const Fn = ({ c }: { c: string }) => <span className="gb-fn">{c}</span>;
const Nm = ({ c }: { c: string }) => <span className="gb-nm">{c}</span>;
const Pu = ({ c }: { c: string }) => <span className="gb-pu">{c}</span>;

const GlassBox = () => {
  const boxRef  = useRef<HTMLDivElement>(null);
  const [scan, setScan]     = useState(false);
  const [jitter, setJitter] = useState(false);

  const setXY = (x: number, y: number) => {
    const el = boxRef.current;
    if (!el) return;
    el.style.setProperty("--gcx", `${x}px`);
    el.style.setProperty("--gcy", `${y}px`);
  };

  const onMove = (e: React.MouseEvent) => {
    const r = boxRef.current!.getBoundingClientRect();
    setXY(e.clientX - r.left, e.clientY - r.top);
  };
  const onLeave = () => setXY(-300, -300);
  const onTouch = (e: React.TouchEvent) => {
    const r = boxRef.current!.getBoundingClientRect();
    setXY(e.touches[0].clientX - r.left, e.touches[0].clientY - r.top);
  };

  const onClick = () => {
    if (scan) return;
    setScan(true);
    setJitter(true);
    setTimeout(() => setJitter(false), 900);
    setTimeout(() => setScan(false), 1800);
  };

  return (
    <div
      ref={boxRef}
      className={`gb-root${scan ? " gb-scanning" : ""}`}
      style={{ "--gcx": "-300px", "--gcy": "-300px" } as React.CSSProperties}
      onMouseMove={onMove} onMouseLeave={onLeave}
      onTouchMove={onTouch} onTouchEnd={onLeave}
      onClick={onClick}
    >
      {/* ── Bottom layer: syntax-highlighted source ── */}
      <div className={`gb-code${jitter ? " gb-jitter" : ""}`}>
        <pre className="gb-pre">
          <GbLine><Cm c="# // glass_box.py | QA Component Lab" /></GbLine>
          <GbLine><Cm c="# Move cursor to X-ray · Click to run diagnostic" /></GbLine>
          <GbLine>&nbsp;</GbLine>
          <GbLine><Kw c="class " /><Cl c="GlassCard" /><Pu c="(" /><Cl c="Component" /><Pu c="):" /></GbLine>
          <GbLine>{"    "}<Vr c="blur" /><Pu c="     = " /><Nm c="10.0" /><Cm c="   # backdrop-filter blur" /></GbLine>
          <GbLine>{"    "}<Vr c="opacity" /><Pu c="  = " /><Nm c="0.08" /><Cm c="   # glass alpha channel" /></GbLine>
          <GbLine>{"    "}<Vr c="cursor" /><Pu c="   = " /><Pu c="(" /><Nm c="-1" /><Pu c=", " /><Nm c="-1" /><Pu c=")" /><Cm c="  # x-ray origin" /></GbLine>
          <GbLine>&nbsp;</GbLine>
          <GbLine>{"    "}<Kw c="def " /><Fn c="xray" /><Pu c="(self, x: " /><Cl c="int" /><Pu c=", y: " /><Cl c="int" /><Pu c=") -&gt; " /><Cl c="None" /><Pu c=":" /></GbLine>
          <GbLine>{"        "}<Vr c="self" /><Pu c="." /><Vr c="cursor " /><Pu c="= " /><Pu c="(" /><Vr c="x" /><Pu c=", " /><Vr c="y" /><Pu c=")" /></GbLine>
          <GbLine>{"        "}<Vr c="self" /><Pu c="." /><Vr c="blur   " /><Pu c="= " /><Fn c="max" /><Pu c="(" /><Nm c="0.0" /><Pu c=", " /><Nm c="10.0 " /><Pu c="- " /><Nm c="8.0" /><Pu c=")" /></GbLine>
          <GbLine>&nbsp;</GbLine>
          <GbLine>{"    "}<Kw c="def " /><Fn c="run_diagnostic" /><Pu c="(self) -&gt; " /><Cl c="str" /><Pu c=":" /></GbLine>
          <GbLine>{"        "}<Kw c="return " /><St c={`f"SCAN OK: {self.blur:.1f}px blur | cursor:{self.cursor}"`} /></GbLine>
        </pre>
      </div>

      {/* ── Top layer: frosted glass + UI ── */}
      <div className="gb-glass">
        <div className="gb-ui">
          <div className="gb-ui-label"><Cm c="# // QA Component Lab" /></div>
          <div className="gb-ui-title">Glass<span style={{ color: ACC }}>Box</span></div>
          <div className="gb-ui-desc">
            Move cursor to X-ray the source code beneath the glass.
            Click to run a system diagnostic scan.
          </div>
          <button className="gb-ui-btn" onClick={onClick}>Run Diagnostic →</button>
        </div>
      </div>

      {/* Cursor ring indicator */}
      <div className="gb-cursor-ring" aria-hidden="true" />
    </div>
  );
};

/* ─── Cert 3D flip card ──────────────────────────────────────────────────── */
const FACE: React.CSSProperties = {
  position: "absolute", inset: 0,
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden" as React.CSSProperties["WebkitBackfaceVisibility"],
  display: "flex", gap: "12px", alignItems: "flex-start",
};

const CertFlipCard = () => {
  const [flipped, setFlipped] = useState(false);
  const [quick,   setQuick]   = useState(false);

  return (
    <div
      style={{ flex: 1, minHeight: "130px", perspective: "900px", cursor: "pointer", userSelect: "none" }}
      onMouseEnter={() => { setQuick(false); setFlipped(true); }}
      onMouseLeave={() => { setQuick(false); setFlipped(false); }}
      onClick={() => { setQuick(true); setFlipped(f => !f); }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: quick ? 0.22 : 0.72, ease: [0.4, 0, 0.2, 1] }}
        style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d" }}
      >
        {/* ── FRONT: Manual QA Engineer ── */}
        <div style={FACE}>
          <div style={{ padding: "11px", borderRadius: "11px", flexShrink: 0, animation: "float-badge 5.5s ease-in-out infinite", background: A_DIM, border: "1px solid rgba(129,140,248,0.2)" }}>
            <Shield style={{ width: "18px", height: "18px", color: ACC }} strokeWidth={1.5} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "0.95rem", color: BOLD, marginBottom: "4px", letterSpacing: "-0.01em" }}>Manual QA Engineer</div>
            <div style={{ fontSize: "0.75rem", color: ACC, marginBottom: "10px", fontWeight: 600 }}>QA Course · Graduate</div>
            <p style={{ fontSize: "0.79rem", color: TEXT, lineHeight: 1.65, margin: 0 }}>Full manual testing lifecycle: test case design, bug reporting, regression testing, Jira, web and mobile platforms.</p>
          </div>
        </div>

        {/* ── BACK: UI/UX Designer ── */}
        <div style={{ ...FACE, transform: "rotateY(180deg)" }}>
          <div style={{ padding: "11px", borderRadius: "11px", flexShrink: 0, animation: "float-badge 5.5s ease-in-out infinite", background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.22)" }}>
            <Eye style={{ width: "18px", height: "18px", color: "#a78bfa" }} strokeWidth={1.5} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "0.95rem", color: BOLD, marginBottom: "4px", letterSpacing: "-0.01em" }}>UI/UX Designer</div>
            <div style={{ fontSize: "0.75rem", color: "#a78bfa", marginBottom: "10px", fontWeight: 600 }}>Self-taught · Graduate</div>
            <p style={{ fontSize: "0.79rem", color: TEXT, lineHeight: 1.65, margin: 0 }}>Figma, Photoshop, Illustrator. Designing interfaces with a tester's instinct for what breaks, and the precision to fix it.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────────────── */
export default function Index() {
  const isMobile = useIsMobile();

  /* Combined effect: mouse-glow CSS vars + 3D tilt (tilt delayed past entrance) */
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".tilt-target");
    let tiltLive = false;
    const timer = setTimeout(() => { tiltLive = true; }, 1800);

    const onMove = (e: MouseEvent) => {
      targets.forEach(el => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);

        if (!tiltLive) return;
        const inside = e.clientX >= r.left && e.clientX <= r.right
                    && e.clientY >= r.top  && e.clientY <= r.bottom;
        if (inside) {
          const dx = (e.clientX - r.left) / r.width  - 0.5;
          const dy = (e.clientY - r.top)  / r.height - 0.5;
          el.style.transform = `perspective(1000px) rotateX(${-dy * 9}deg) rotateY(${dx * 9}deg) translateZ(8px)`;
          el.style.transition = "transform 0.08s ease, box-shadow 0.15s ease";
          el.style.boxShadow  = "0 30px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(129,140,248,0.12)";
          const outer = el.parentElement as HTMLElement;
          if (outer) outer.style.zIndex = "20";
        } else {
          el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
          el.style.transition = "transform 0.65s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease";
          el.style.boxShadow  = "";
          const outer = el.parentElement as HTMLElement;
          if (outer) outer.style.zIndex = "";
        }
      });
    };

    const onLeave = () => {
      if (!tiltLive) return;
      targets.forEach(el => {
        el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
        el.style.transition = "transform 0.65s cubic-bezier(0.22,1,0.36,1)";
        el.style.boxShadow  = "";
        const outer = el.parentElement as HTMLElement;
        if (outer) outer.style.zIndex = "";
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ── Button helpers ── */
  const BtnPrimary = ({ href, children, external }: { href?: string; children: React.ReactNode; external?: boolean }) => (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
      style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "10px 22px", borderRadius: "9px", background: ACC, color: "#050505", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", transition: "opacity 0.15s, box-shadow 0.15s" }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.opacity = "0.85"; el.style.boxShadow = "0 0 28px rgba(129,140,248,0.6)"; }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.opacity = "1"; el.style.boxShadow = "none"; }}
    >{children}</a>
  );
  const BtnGhost = ({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) => (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
      style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 20px", borderRadius: "9px", border: "1px solid rgba(255,255,255,0.1)", color: TEXT, fontWeight: 600, fontSize: "0.85rem", textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = ACC; el.style.color = BOLD; }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.color = TEXT; }}
    >{children}</a>
  );

  return (
    <>
      {/* ── Atmosphere ── */}
      <div className="noise" aria-hidden />
      <div className="vignette" aria-hidden />
      <AmbientBg />

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      {/* Desktop: Logo | section-links (center) | BehemothQA (right)      */}
      {/* Mobile:  row1 Logo | BehemothQA   row2 section-links (full width) */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "0 32px", minHeight: "54px",
        background: "rgba(5,5,5,0.75)", backdropFilter: "blur(20px) saturate(1.4)",
        borderBottom: "1px solid rgba(255,255,255,0.045)",
      }}>
        {/* Logo */}
        <motion.span initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
          style={{ fontWeight: 900, fontSize: "0.95rem", color: BOLD, letterSpacing: "-0.03em", lineHeight: "54px" }}>
          Johnatan<span style={{ color: ACC }}>.</span>
        </motion.span>

        {/* Section links — center on desktop, second row on mobile */}
        <div className="nav-section-links"
          style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {["About","Projects","Skills","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontSize: "0.8rem", color: MUTED, textDecoration: "none", padding: "4px 10px", borderRadius: "6px", transition: "color 0.15s, background 0.15s" }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.color = BOLD; el.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.color = MUTED; el.style.background = "transparent"; }}
            >{l}</a>
          ))}
        </div>

        {/* BehemothQA — right on desktop, right of row 1 on mobile */}
        <a href="https://settings-qa-ai.replit.app" target="_blank" rel="noopener noreferrer"
          className="nav-behemoth"
          style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "6px 14px", borderRadius: "8px", background: A_DIM, border: "1px solid rgba(129,140,248,0.22)", color: ACC, fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", transition: "background 0.15s", flexShrink: 0 }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(129,140,248,0.18)")}
          onMouseLeave={e => (e.currentTarget.style.background = A_DIM)}
        >BehemothQA <ExternalLink style={{ width: "10px", height: "10px" }} /></a>
      </nav>

      {/* ── Bento grid — perspective wrapper gives entrance cards a 3D origin ── */}
      <main style={{ position: "relative", zIndex: 2, paddingTop: "54px" }}>
        <motion.div id="about" variants={ctn} initial={isMobile ? false : "hidden"} animate="show"
          style={{
            ...(isMobile ? {} : { perspective: "1800px", perspectiveOrigin: "50% -10%" }),
            display: "grid", gridTemplateColumns: "repeat(3,1fr)",
            gap: "10px", maxWidth: "1140px", margin: "0 auto",
            padding: "18px 18px 48px",
          }}>

          {/* ══ HERO ══════════════════════════════════════════════════════════ */}
          <BC col="span 2" minH="260px"
            innerStyle={{ display: "flex", flexDirection: "column", justifyContent: "space-between", background: "rgba(255,255,255,0.022)" }}>
            {/* Background grid */}
            <div className="hero-grid" style={{ position: "absolute", inset: 0, borderRadius: "inherit", opacity: 0.55, zIndex: 0 }} />
            {/* Top-right ambient glow */}
            <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle, rgba(129,140,248,0.13) 0%, transparent 70%)", filter: "blur(20px)", zIndex: 0, pointerEvents: "none" }} />

            {/* 3D orbit rings (decorative) */}
            <div style={{ position: "absolute", right: "36px", top: "50%", transform: "translateY(-50%)", zIndex: 0, pointerEvents: "none" }}>
              <OrbitRing size={88} speed="11s" opacity={0.18} />
              <div style={{ position: "absolute", inset: "16px", borderRadius: "50%", border: "1px solid rgba(129,140,248,0.08)", animation: "orbit-ring 7s linear infinite reverse" }} />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              {/* Badge with 3D float */}
              <div style={{ marginBottom: "22px" }}>
                <span className="badge" style={{ animation: "float-badge 4.5s ease-in-out infinite" }}>
                  <span className="live-dot" style={{ background: ACC, boxShadow: `0 0 5px ${ACC}`, animation: "pulse-ring 2s infinite" }} />
                  QA Engineer
                </span>
              </div>

              <h1 style={{ fontSize: "clamp(2.6rem,6vw,4.5rem)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 0.96, color: BOLD, marginBottom: "18px" }}>
                Johnatan<br />
                <span style={{ color: ACC, animation: "text-glow 3.5s ease-in-out infinite", display: "inline-block" }}>Milrad</span>
              </h1>
              <p style={{ fontSize: "0.9rem", color: TEXT, lineHeight: 1.7, maxWidth: "42ch" }}>
                Manual QA graduate. Self-taught designer with a precise eye for broken software, catching what automated tools miss.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "24px", position: "relative", zIndex: 1 }}>
              <BtnPrimary href="#projects">View Projects <ArrowUpRight style={{ width: "14px", height: "14px" }} /></BtnPrimary>
              <BtnGhost href="#contact">Get in Touch</BtnGhost>
            </div>
          </BC>

          {/* ══ STATUS ════════════════════════════════════════════════════════ */}
          <BC innerStyle={{ background: "rgba(129,140,248,0.04)", border: "1px solid rgba(129,140,248,0.13)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "14px" }}>
                <span className="live-dot" />
                <span style={{ fontSize: "0.68rem", fontWeight: 800, color: G, textTransform: "uppercase", letterSpacing: "0.14em" }}>Available</span>
              </div>
              <p style={{ fontWeight: 800, fontSize: "1.1rem", color: BOLD, marginBottom: "8px", letterSpacing: "-0.02em" }}>Open to Work</p>
              <p style={{ fontSize: "0.8rem", color: TEXT, lineHeight: 1.6 }}>Looking for a QA role where precision meets real impact.</p>
            </div>
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "9px" }}>
              {[
                { icon: MapPin, text: "Ashdod, Israel",            href: undefined },
                { icon: Mail,   text: "milrad.johnathan19@gmail.com", href: "mailto:milrad.johnathan19@gmail.com" },
                { icon: Phone,  text: "+972 523 516 364",           href: "tel:+972523516364" },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.78rem", color: TEXT }}>
                  <Icon style={{ width: "13px", color: ACC, flexShrink: 0, animation: "float-icon 3.5s ease-in-out infinite" }} />
                  {href ? <a href={href} style={{ color: TEXT, textDecoration: "none" }}>{text}</a> : <span>{text}</span>}
                </div>
              ))}
            </div>
          </BC>

          {/* ══ PHOTO ═════════════════════════════════════════════════════════ */}
          <BC row="span 2" innerStyle={{ padding: "0", overflow: "hidden" }} className="photo-bc">
            <div className="photo-inner" style={{ position: "relative", width: "100%", height: "100%", minHeight: "340px" }}>
              <img src={`${BASE}/hero.jpeg`} alt="Johnatan Milrad"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 15%", display: "block", filter: "grayscale(30%) contrast(1.12) brightness(0.82) saturate(0.88)" }}
              />
              {/* Cinematic color grade */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(150deg, rgba(99,102,241,0.18) 0%, transparent 55%, rgba(5,5,5,0.18) 100%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.3) 35%, transparent 60%)" }} />
              {/* 3D float corner bracket */}
              <div style={{ position: "absolute", top: "14px", left: "14px", width: "20px", height: "20px", borderTop: `2px solid ${ACC}`, borderLeft: `2px solid ${ACC}`, opacity: 0.75, animation: "float-badge 5s ease-in-out infinite" }} />
              <div style={{ position: "absolute", bottom: "0", left: "0", right: "0", padding: "16px 20px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, fontSize: "0.85rem", color: BOLD }}>Johnatan Milrad</span>
                <span className="badge">QA Engineer</span>
              </div>
            </div>
          </BC>

          {/* ══ ABOUT ═════════════════════════════════════════════════════════ */}
          <BC col="span 2"
            innerStyle={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "14px" }}>
              <Eye style={{ width: "14px", color: ACC, flexShrink: 0 }} />
              <span style={{ fontSize: "0.67rem", fontWeight: 800, color: MUTED, textTransform: "uppercase", letterSpacing: "0.12em" }}>Background</span>
            </div>
            <p style={{ fontSize: "0.92rem", color: TEXT, lineHeight: 1.75, marginBottom: "14px" }}>
              I'm a <strong style={{ color: BOLD }}>Manual QA graduate</strong> who came to software through design, building skills across{" "}
              <strong style={{ color: BOLD }}>Figma, Photoshop, and Illustrator</strong> entirely self-taught. That design background sharpens my eye for what's visually broken, flows that feel wrong, and UX patterns that don't serve the user.
            </p>
            <p style={{ fontSize: "0.92rem", color: TEXT, lineHeight: 1.75 }}>
              On top of coursework I built <strong style={{ color: BOLD }}>BehemothQA</strong> independently, getting hands-on with <strong style={{ color: BOLD }}>Jira, Postman, GitHub</strong>, and security testing in the process.
            </p>
            {/* Stats with 3D float animation, staggered */}
            <div className="stats-row" style={{ display: "flex", gap: "28px", marginTop: "auto", paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.05)", flexWrap: "wrap" }}>
              {[
                { n: "300+", l: "checks / run",  c: ACC,     delay: "0s"    },
                { n: "6",    l: "attack modules", c: "#67e8f9", delay: "0.4s" },
                { n: "4",    l: "severity tiers", c: G,        delay: "0.8s" },
              ].map(s => (
                <div key={s.n} style={{ animation: `float-stat 4s ease-in-out infinite`, animationDelay: s.delay }}>
                  <div style={{ fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 900, color: s.c, letterSpacing: "-0.04em", lineHeight: 1, textShadow: `0 0 30px ${s.c}66, 0 8px 32px rgba(0,0,0,0.5)` }}>{s.n}</div>
                  <div style={{ fontSize: "0.72rem", color: MUTED, marginTop: "4px", fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </BC>

          {/* ══ MARQUEE ═══════════════════════════════════════════════════════ */}
          <BC id="skills" col="span 3" innerStyle={{ padding: "18px 0", overflow: "hidden" }}>
            <div style={{ padding: "0 24px", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Zap style={{ width: "13px", color: ACC, animation: "float-icon 3s ease-in-out infinite" }} />
              <span style={{ fontSize: "0.67rem", fontWeight: 800, color: MUTED, textTransform: "uppercase", letterSpacing: "0.12em" }}>Skills &amp; Tools</span>
            </div>
            <Marquee />
          </BC>

          {/* ══ BEHEMOTHQA IDE ════════════════════════════════════════════════ */}
          <BC id="projects" col="span 2" row="span 2"
            innerStyle={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {/* Accent orb */}
            <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "260px", height: "260px", borderRadius: "50%", background: "radial-gradient(circle, rgba(129,140,248,0.11) 0%, transparent 70%)", filter: "blur(30px)", zIndex: 0, pointerEvents: "none" }} />
            {/* Orbit behind IDE */}
            <div style={{ position: "absolute", bottom: "80px", right: "20px", zIndex: 0, pointerEvents: "none" }}>
              <OrbitRing size={60} speed="14s" opacity={0.12} dotColor="#67e8f9" />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "5px" }}>
                <span className="live-dot" />
                <span style={{ fontWeight: 900, fontSize: "1.1rem", color: BOLD, letterSpacing: "-0.03em" }}>BehemothQA</span>
                <span className="badge" style={{ animation: "float-badge 5s ease-in-out infinite" }}>v2.4</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
                <p style={{ fontSize: "0.78rem", color: TEXT, margin: 0 }}>Full-scale Python QA platform. 300+ checks per run</p>
                <a href="https://settings-qa-ai.replit.app" target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "7px 15px", borderRadius: "8px", background: ACC, color: "#050505", fontWeight: 700, fontSize: "0.8rem", textDecoration: "none", whiteSpace: "nowrap", transition: "opacity 0.15s, box-shadow 0.15s", flexShrink: 0 }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.opacity = "0.85"; el.style.boxShadow = "0 0 22px rgba(129,140,248,0.55)"; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.opacity = "1"; el.style.boxShadow = "none"; }}
                >Launch App <ExternalLink style={{ width: "11px", height: "11px" }} /></a>
              </div>
            </div>

            <div style={{ position: "relative", zIndex: 1, flex: 1 }}>
              <IDE />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", position: "relative", zIndex: 1 }}>
              {["Python","Security","DDoS","UI/UX QA","SQL Workbench","NightMOTH","PDF Reports"].map(t => (
                <span key={t} style={{ padding: "3px 10px", borderRadius: "99px", fontSize: "0.68rem", fontWeight: 600, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: TEXT }}>{t}</span>
              ))}
            </div>
          </BC>

          {/* ══ SKILLS DETAIL ═════════════════════════════════════════════════ */}
          <BC innerStyle={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
              <Shield style={{ width: "13px", color: ACC, animation: "float-icon 4s ease-in-out infinite" }} />
              <span style={{ fontSize: "0.67rem", fontWeight: 800, color: MUTED, textTransform: "uppercase", letterSpacing: "0.12em" }}>Expertise</span>
            </div>
            {[
              { cat: "QA",     col: ACC,      items: ["Manual Testing","Test Case Design","Bug Reporting","Regression"] },
              { cat: "Tools",  col: "#67e8f9", items: ["Jira","Postman","GitHub","Python"] },
              { cat: "Design", col: "#f9a8d4", items: ["Figma","Photoshop","Illustrator"] },
            ].map(g => (
              <div key={g.cat}>
                <div style={{ fontSize: "0.64rem", fontWeight: 800, color: g.col, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.85 }}>{g.cat}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {g.items.map(s => (
                    <span key={s} style={{ padding: "3px 9px", borderRadius: "6px", fontSize: "0.74rem", fontWeight: 500, background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)", color: TEXT }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </BC>

          {/* ══ CERT ══════════════════════════════════════════════════════════ */}
          <BC minH="160px" innerStyle={{ background: "rgba(129,140,248,0.04)", border: "1px solid rgba(129,140,248,0.12)", display: "flex", flexDirection: "column", overflow: "visible" }}>
            <CertFlipCard />
          </BC>

          {/* ══ GLASS BOX ════════════════════════════════════════════════════ */}
          <BC col="span 3" innerStyle={{ padding: "0", overflow: "hidden", minHeight: "220px" }}>
            <GlassBox />
          </BC>

          {/* ══ HOBBIES ═══════════════════════════════════════════════════════ */}
          <BC col="span 3" innerStyle={{ padding: "0", overflow: "hidden" }}>
            {/* Header row */}
            <div style={{ padding: "20px 24px 0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "0.67rem", fontWeight: 800, color: MUTED, textTransform: "uppercase", letterSpacing: "0.12em" }}>Beyond the Test Suite</span>
            </div>

            <div className="hobbies-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", margin: "14px 0 0" }}>
              {[

                /* ── 01 · Sound & Rhythm ─────────────────────────────────────── */
                {
                  n: "01", t: "Sound & Rhythm",
                  d: "Cubase, FL Studio, Ableton. Training the ear for what's off.",
                  art: (
                    <svg viewBox="0 0 80 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "80px", height: "52px" }}>
                      {/* Equalizer bars — symmetric mountain silhouette */}
                      {[6, 14, 24, 36, 44, 36, 24, 14, 6].map((h, i) => (
                        <rect key={i}
                          className="eq"
                          x={i * 8 + 4} y={52 - h} width={5} height={h} rx={2.5}
                          fill={ACC}
                          opacity={i === 4 ? 1 : i === 3 || i === 5 ? 0.7 : i === 2 || i === 6 ? 0.45 : 0.22}
                          style={{
                            animation: `eq-bar ${1.1 + i * 0.18}s ease-in-out infinite alternate`,
                            animationDelay: `${i * 0.12}s`,
                            transformBox: "fill-box",
                            transformOrigin: "center bottom",
                          }}
                        />
                      ))}
                      {/* Baseline */}
                      <line x1="4" y1="52" x2="76" y2="52" stroke={`rgba(129,140,248,0.18)`} strokeWidth="0.75"/>
                    </svg>
                  ),
                },

                /* ── 02 · Visual Systems ─────────────────────────────────────── */
                {
                  n: "02", t: "Visual Systems",
                  d: "Figma, Photoshop, Illustrator. Design instinct sharpens QA precision.",
                  art: (
                    <svg viewBox="0 0 80 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "80px", height: "52px" }}>
                      {/* Bezier curve — main path */}
                      <path d="M8 44 C8 12, 40 12, 40 26 S72 40, 72 8" stroke={ACC} strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
                      {/* Control handles */}
                      <line x1="8" y1="44" x2="8" y2="12" stroke={`rgba(129,140,248,0.3)`} strokeWidth="0.75" strokeDasharray="2 2"/>
                      <line x1="72" y1="8" x2="72" y2="40" stroke={`rgba(129,140,248,0.3)`} strokeWidth="0.75" strokeDasharray="2 2"/>
                      {/* Anchor dots */}
                      <circle cx="8"  cy="44" r="3" fill="rgba(129,140,248,0.15)" stroke={ACC} strokeWidth="1.5"/>
                      <circle cx="72" cy="8"  r="3" fill="rgba(129,140,248,0.15)" stroke={ACC} strokeWidth="1.5"/>
                      {/* Control point diamonds */}
                      <rect x="5.5" y="9.5" width="5" height="5" rx="0.5" fill="transparent" stroke={`rgba(129,140,248,0.5)`} strokeWidth="1" transform="rotate(45 8 12)"/>
                      <rect x="69.5" y="37.5" width="5" height="5" rx="0.5" fill="transparent" stroke={`rgba(129,140,248,0.5)`} strokeWidth="1" transform="rotate(45 72 40)"/>
                      {/* Mid point */}
                      <circle cx="40" cy="26" r="2" fill={ACC} opacity="0.6"/>
                    </svg>
                  ),
                },

                /* ── 03 · Velocity ───────────────────────────────────────────── */
                {
                  n: "03", t: "Velocity",
                  d: "Reading the road in real time. High-speed awareness. Zero tolerance for drift.",
                  art: (
                    <svg viewBox="0 0 80 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "80px", height: "52px" }}>
                      {/* Vanishing point road */}
                      <line x1="40" y1="0"  x2="0"  y2="52" stroke={ACC} strokeWidth="1.2" opacity="0.8"/>
                      <line x1="40" y1="0"  x2="80" y2="52" stroke={ACC} strokeWidth="1.2" opacity="0.8"/>
                      {/* Centre divider dashes */}
                      {[8, 18, 29, 40].map((y, i) => (
                        <line key={i}
                          x1={40 - (y / 52) * 4} y1={y}
                          x2={40 + (y / 52) * 4} y2={y + 4}
                          stroke={ACC} strokeWidth="0.75" opacity={0.2 + i * 0.15}
                          strokeLinecap="round"
                        />
                      ))}
                      {/* Horizontal cross-bars (perspective) */}
                      {[14, 28, 42].map((y, i) => {
                        const spread = (y / 52) * 36;
                        return (
                          <line key={i}
                            x1={40 - spread} y1={y}
                            x2={40 + spread} y2={y}
                            stroke={`rgba(129,140,248,${0.12 + i * 0.07})`}
                            strokeWidth="0.75"
                          />
                        );
                      })}
                      {/* Vanishing dot */}
                      <circle cx="40" cy="0" r="2.5" fill={ACC} opacity="0.9"/>
                    </svg>
                  ),
                },

                /* ── 04 · Competitive Edge ───────────────────────────────────── */
                {
                  n: "04", t: "Competitive Edge",
                  d: "Pattern recognition under pressure. Finding the edge case every time.",
                  art: (
                    <svg viewBox="0 0 80 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "80px", height: "52px" }}>
                      {/* Outer ring */}
                      <circle cx="40" cy="26" r="22" stroke={ACC} strokeWidth="1" opacity="0.25"/>
                      {/* Inner ring */}
                      <circle cx="40" cy="26" r="14" stroke={ACC} strokeWidth="1" opacity="0.5"/>
                      {/* Crosshair ticks */}
                      <line x1="40" y1="0"  x2="40" y2="8"  stroke={ACC} strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="40" y1="44" x2="40" y2="52" stroke={ACC} strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="0"  y1="26" x2="8"  y2="26" stroke={ACC} strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="72" y1="26" x2="80" y2="26" stroke={ACC} strokeWidth="1.5" strokeLinecap="round"/>
                      {/* Corner bracket marks at 45-deg */}
                      {[[-1,-1],[1,-1],[1,1],[-1,1]].map(([sx, sy], i) => (
                        <g key={i} transform={`translate(${40 + sx * 22} ${26 + sy * 22})`}>
                          <line x1="0" y1="0" x2={sx * 5} y2="0" stroke={ACC} strokeWidth="1" opacity="0.45"/>
                          <line x1="0" y1="0" x2="0" y2={sy * 5} stroke={ACC} strokeWidth="1" opacity="0.45"/>
                        </g>
                      ))}
                      {/* Center dot pulsing */}
                      <circle cx="40" cy="26" r="2.5" fill={ACC} style={{ animation: "pulse-ring 2.2s infinite" }}/>
                    </svg>
                  ),
                },

              ].map((h, i) => (
                <div key={h.n}
                  style={{
                    padding: "20px",
                    borderRight: i < 3 ? "1px solid rgba(255,255,255,0.055)" : "none",
                    borderTop: "1px solid rgba(255,255,255,0.055)",
                    transition: "background 0.25s",
                    cursor: "default",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(129,140,248,0.028)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                >
                  {/* Number */}
                  <div style={{ fontSize: "0.6rem", fontWeight: 800, color: `rgba(129,140,248,0.35)`, letterSpacing: "0.15em", marginBottom: "16px", fontFamily: "'JetBrains Mono', monospace" }}>{h.n}</div>

                  {/* Art */}
                  <div style={{ marginBottom: "18px", animation: `float-badge ${4 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.25}s`, display: "inline-block" }}>
                    {h.art}
                  </div>

                  {/* Thin separator */}
                  <div style={{ width: "24px", height: "1px", background: `rgba(129,140,248,0.3)`, marginBottom: "12px" }} />

                  {/* Title */}
                  <div style={{ fontWeight: 700, fontSize: "0.87rem", color: BOLD, marginBottom: "7px", letterSpacing: "-0.01em" }}>{h.t}</div>

                  {/* Description */}
                  <div style={{ fontSize: "0.74rem", color: TEXT, lineHeight: 1.65 }}>{h.d}</div>
                </div>
              ))}
            </div>
          </BC>

          {/* ══ CONTACT ═══════════════════════════════════════════════════════ */}
          <BC id="contact" col="span 3">
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "22px" }}>
              <div>
                <h2 style={{ fontWeight: 900, fontSize: "clamp(1.7rem,4vw,2.5rem)", color: BOLD, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "8px" }}>
                  Let's<span style={{ color: ACC }}> work</span> together.
                </h2>
                <p style={{ fontSize: "0.87rem", color: TEXT }}>Submit a message. I respond to every serious inquiry.</p>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                <BtnGhost href="https://www.linkedin.com/in/johnathan-milrad-502b18b2" external>LinkedIn</BtnGhost>
                <BtnPrimary href="https://settings-qa-ai.replit.app" external>BehemothQA <ExternalLink style={{ width: "12px", height: "12px" }} /></BtnPrimary>
              </div>
            </div>
            <ContactForm />
          </BC>

          {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
          <BC col="span 3" innerStyle={{ padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", background: "rgba(255,255,255,0.012)" }}>
            <span style={{ fontSize: "0.75rem", color: MUTED }}>© 2025 Johnatan Milrad · QA Engineer</span>
            <span style={{ fontSize: "0.72rem", color: "rgba(248,250,252,0.1)", letterSpacing: "0.02em" }}>Built with precision.</span>
          </BC>

        </motion.div>
      </main>

      <style>{`
        @media (max-width: 767px) {

          /* ━━ NAV: 2-row on mobile ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
          /* Row 1: Logo (left) | BehemothQA (right)                         */
          /* Row 2: About · Projects · Skills · Contact (evenly spread)       */
          nav {
            padding: 0 16px !important;
            min-height: 54px !important;
            align-content: center !important;
          }
          /* Push section links to their own row */
          .nav-section-links {
            order: 10 !important;
            flex-basis: 100% !important;
            justify-content: space-around !important;
            padding: 8px 0 10px !important;
            border-top: 1px solid rgba(255,255,255,0.05) !important;
          }
          .nav-section-links a {
            font-size: 0.75rem !important;
            padding: 5px 8px !important;
          }

          /* Main: push down to clear 2-row nav */
          main { padding-top: 108px !important; }

          /* ━━ BENTO GRID → single column ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
          main > div {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
            padding: 12px 12px 48px !important;
            overflow-x: hidden !important;
          }

          /* Critical: min-width:0 stops grid items overflowing their 1fr track */
          main > div > div {
            grid-column: span 1 !important;
            grid-row:    span 1 !important;
            min-width: 0 !important;
            max-width: 100% !important;
          }

          /* Bento card inner: clamp to card width */
          .bento-card {
            min-width: 0 !important;
            max-width: 100% !important;
            overflow: hidden !important;
          }

          /* ━━ HERO PHOTO: show, shorter height on mobile ━━━━━━━━━━━━━━━━━━━ */
          .photo-bc { display: flex !important; }
          .photo-inner { min-height: 240px !important; }

          /* ━━ TYPOGRAPHY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
          h1 { font-size: clamp(2rem, 9vw, 2.8rem) !important; }
          p, h2, h3 { overflow-wrap: break-word; word-break: break-word; }

          /* ━━ IDE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
          .ide-body { overflow-x: auto !important; }
          .ide-body pre { min-width: max-content; }

          /* ━━ BACKGROUND STATS ROW ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
          .stats-row { gap: 20px !important; flex-wrap: wrap !important; }

          /* ━━ SKILLS MARQUEE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
          .marquee-mask {
            -webkit-mask-image: linear-gradient(90deg,transparent 0%,black 5%,black 95%,transparent 100%) !important;
            mask-image: linear-gradient(90deg,transparent 0%,black 5%,black 95%,transparent 100%) !important;
          }

          /* ━━ HOBBIES: 4-col → 2×2 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
          .hobbies-grid { grid-template-columns: repeat(2,1fr) !important; }
          .hobbies-grid > div:nth-child(2n) { border-right: none !important; }

          /* ━━ CONTACT FORM ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
          .contact-form-grid { grid-template-columns: 1fr !important; }

          /* ━━ GLASSBOX ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
          .gb-ui  { padding: 18px 20px !important; }
          .gb-pre { font-size: 9.5px !important; }
        }
        a { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </>
  );
}
