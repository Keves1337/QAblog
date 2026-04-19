import { useEffect, useState, useRef, useCallback, lazy, Suspense } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ExternalLink, Mail, Phone, MapPin, Send,
  Shield, Zap, Eye, ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WebGLGuard, hasWebGL } from "@/components/WebGLGuard";
const MonolithScene = lazy(() => import("@/components/MonolithScene"));

gsap.registerPlugin(ScrollTrigger);

/* ─── Palette ───────────────────────────────────────────────────────────── */
const ACC   = "#00e5ff";
const A_DIM = "rgba(0,229,255,0.08)";
const BOLD  = "#f8fafc";
const TEXT  = "rgba(248,250,252,0.5)";
const MUTED = "rgba(248,250,252,0.2)";
const G     = "#22c55e";
const BASE  = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

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

/* ─── Letter-by-letter text reveal ──────────────────────────────────────── */
function SplitText({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <span style={{ display: "inline-block", ...style }}>
      {text.split("").map((char, i) => (
        <span key={i} className="split-letter"
          style={{ animationDelay: `${0.30 + i * 0.042}s`, whiteSpace: char === " " ? "pre" : undefined }}
        >{char}</span>
      ))}
    </span>
  );
}

/* ─── Marquee ────────────────────────────────────────────────────────────── */
const SKILLS = [
  "Manual Testing","Test Case Design","Bug Reporting","Regression Testing",
  "Exploratory Testing","Jira","Postman","GitHub","Python","SQL","Figma",
  "Photoshop","Illustrator","UI/UX Review","API Testing","Mobile Testing",
  "Web Accessibility","Security QA","Performance QA","Agile/Scrum",
];
const Marquee = () => (
  <div className="marquee-mask" style={{ overflow: "hidden" }}>
    {[1, 2].map(k => (
      <div key={k} className={`marquee-row marquee-row--${k % 2 === 0 ? "rev" : "fwd"}`}
        style={{ display: "flex", gap: "10px", padding: "5px 0", width: "max-content", animation: `marquee-${k % 2 === 0 ? "rev" : "fwd"} 38s linear infinite` }}
      >
        {[...SKILLS, ...SKILLS].map((s, i) => (
          <span key={i} style={{
            padding: "6px 14px", borderRadius: "8px", flexShrink: 0,
            border: "1px solid rgba(0,229,255,0.14)",
            background: "rgba(0,229,255,0.04)",
            fontSize: "0.78rem", fontWeight: 500, color: TEXT, whiteSpace: "nowrap",
          }}>{s}</span>
        ))}
      </div>
    ))}
  </div>
);

/* ─── Glass Box ──────────────────────────────────────────────────────────── */
const GbLine = ({ children }: { children: React.ReactNode }) => <div className="gb-line">{children}</div>;
const Cm = ({ c }: { c: string }) => <span className="gb-cm">{c}</span>;
const Kw = ({ c }: { c: string }) => <span className="gb-kw">{c}</span>;
const Cl = ({ c }: { c: string }) => <span className="gb-cl">{c}</span>;
const St = ({ c }: { c: string }) => <span className="gb-st">{c}</span>;
const Vr = ({ c }: { c: string }) => <span className="gb-vr">{c}</span>;
const Fn = ({ c }: { c: string }) => <span className="gb-fn">{c}</span>;
const Nm = ({ c }: { c: string }) => <span className="gb-nm">{c}</span>;
const Pu = ({ c }: { c: string }) => <span className="gb-pu">{c}</span>;

const GlassBox = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scan, setScan]     = useState(false);
  const [jitter, setJitter] = useState(false);

  const setXY = (x: number, y: number) => {
    const el = boxRef.current;
    if (!el) return;
    el.style.setProperty("--gcx", `${x}px`);
    el.style.setProperty("--gcy", `${y}px`);
  };
  const onMove  = (e: React.MouseEvent) => { const r = boxRef.current!.getBoundingClientRect(); setXY(e.clientX - r.left, e.clientY - r.top); };
  const onLeave = () => setXY(-300, -300);
  const onTouch = (e: React.TouchEvent) => { const r = boxRef.current!.getBoundingClientRect(); setXY(e.touches[0].clientX - r.left, e.touches[0].clientY - r.top); };
  const onClick = () => {
    if (scan) return;
    setScan(true); setJitter(true);
    setTimeout(() => setJitter(false), 900);
    setTimeout(() => setScan(false), 1800);
  };

  return (
    <div ref={boxRef} className={`gb-root${scan ? " gb-scanning" : ""}`}
      style={{ "--gcx": "-300px", "--gcy": "-300px" } as React.CSSProperties}
      onMouseMove={onMove} onMouseLeave={onLeave} onTouchMove={onTouch} onTouchEnd={onLeave} onClick={onClick}
    >
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
      <div className="gb-glass">
        <div className="gb-ui">
          <div className="gb-ui-label"><Cm c="# // QA Component Lab" /></div>
          <div className="gb-ui-title">Glass<span style={{ color: ACC }}>Box</span></div>
          <div className="gb-ui-desc">Move cursor to X-ray the source code beneath the glass. Click to run a system diagnostic scan.</div>
          <button className="gb-ui-btn" onClick={onClick}>Run Diagnostic →</button>
        </div>
      </div>
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
    <div style={{ flex: 1, minHeight: "130px", perspective: "900px", cursor: "pointer", userSelect: "none" }}
      onMouseEnter={() => { setQuick(false); setFlipped(true); }}
      onMouseLeave={() => { setQuick(false); setFlipped(false); }}
      onClick={() => { setQuick(true); setFlipped(f => !f); }}
    >
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: quick ? 0.22 : 0.72, ease: [0.4, 0, 0.2, 1] }}
        style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d" }}
      >
        <div style={FACE}>
          <div style={{ padding: "11px", borderRadius: "11px", flexShrink: 0, animation: "float-badge 5.5s ease-in-out infinite", background: A_DIM, border: "1px solid rgba(0,229,255,0.18)" }}>
            <Shield style={{ width: "18px", height: "18px", color: ACC }} strokeWidth={1.5} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "0.95rem", color: BOLD, marginBottom: "4px", letterSpacing: "-0.01em" }}>Manual QA Engineer</div>
            <div style={{ fontSize: "0.75rem", color: ACC, marginBottom: "10px", fontWeight: 600 }}>QA Course · Graduate</div>
            <p style={{ fontSize: "0.79rem", color: TEXT, lineHeight: 1.65, margin: 0 }}>Full manual testing lifecycle: test case design, bug reporting, regression testing, Jira, web and mobile platforms.</p>
          </div>
        </div>
        <div style={{ ...FACE, transform: "rotateY(180deg)" }}>
          <div style={{ padding: "11px", borderRadius: "11px", flexShrink: 0, animation: "float-badge 5.5s ease-in-out infinite", background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.22)" }}>
            <Eye style={{ width: "18px", height: "18px", color: "#a78bfa" }} strokeWidth={1.5} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "0.95rem", color: BOLD, marginBottom: "4px", letterSpacing: "-0.01em" }}>UI/UX Designer</div>
            <div style={{ fontSize: "0.75rem", color: "#a78bfa", marginBottom: "10px", fontWeight: 600 }}>UI/UX Prodigy</div>
            <p style={{ fontSize: "0.79rem", color: TEXT, lineHeight: 1.65, margin: 0 }}>Figma, Photoshop, Illustrator. Design instinct sharpens QA precision — spotting what's visually wrong instantly.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Python IDE snippet ─────────────────────────────────────────────────── */
const IdeBlock = () => (
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
            <select value={type} onChange={e => setType(e.target.value)} className="noir-input"
              style={{ appearance: "none", paddingRight: "28px", cursor: "pointer" }}
            >
              {issueTypes.map(t => <option key={t}>{t}</option>)}
            </select>
            <ChevronDown style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", width: "12px", color: MUTED, pointerEvents: "none" }} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, color: MUTED, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Name</div>
          <input name="name" required placeholder="Your name" className="noir-input" />
        </div>
      </div>
      <div>
        <div style={{ fontSize: "0.68rem", fontWeight: 700, color: MUTED, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Email</div>
        <input name="email" type="email" required placeholder="your@email.com" className="noir-input" />
      </div>
      <div>
        <div style={{ fontSize: "0.68rem", fontWeight: 700, color: MUTED, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Message</div>
        <textarea name="message" required rows={4} placeholder="Tell me about your project..." className="noir-input" style={{ resize: "vertical", minHeight: "80px" }} />
      </div>
      <button type="submit"
        style={{ padding: "10px 24px", borderRadius: "9px", background: ACC, color: "#050505", fontWeight: 700, fontSize: "0.85rem", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "7px", alignSelf: "flex-start", transition: "opacity 0.15s, box-shadow 0.15s" }}
        onMouseEnter={e => { const el = e.currentTarget; el.style.opacity = "0.85"; el.style.boxShadow = "0 0 28px rgba(0,229,255,0.6)"; }}
        onMouseLeave={e => { const el = e.currentTarget; el.style.opacity = "1"; el.style.boxShadow = "none"; }}
      >Send Message <Send style={{ width: "13px", height: "13px" }} /></button>
    </form>
  );
};

/* ─── Missing import shim ────────────────────────────────────────────────── */
function ChevronDown({ style }: { style?: React.CSSProperties }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><polyline points="6 9 12 15 18 9"/></svg>;
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════ */
export default function Page() {
  const isMobile = useIsMobile();

  /* refs for 3D scene */
  const scrollProgressRef = useRef<number>(0);
  const isHoveredRef      = useRef<boolean>(false);

  /* WebGL availability */
  const [webglOk] = useState(() => {
    if (typeof window === "undefined") return false;
    return hasWebGL();
  });

  /* shockwave element ref */
  const shockRef = useRef<HTMLDivElement>(null);

  /* ── Magnetic cursor ── */
  const cursorX     = useMotionValue(-100);
  const cursorY     = useMotionValue(-100);
  const cursorScale = useMotionValue(1);
  const springX     = useSpring(cursorX,     { stiffness: 280, damping: 28 });
  const springY     = useSpring(cursorY,     { stiffness: 280, damping: 28 });
  const sScale      = useSpring(cursorScale, { stiffness: 380, damping: 30 });
  const magnetElRef = useRef<Element | null>(null);

  useEffect(() => {
    if (isMobile) return;
    const move = (e: MouseEvent) => {
      const magEl = magnetElRef.current;
      if (magEl) {
        const r = magEl.getBoundingClientRect();
        cursorX.set(e.clientX + (r.left + r.width / 2  - e.clientX) * 0.30);
        cursorY.set(e.clientY + (r.top  + r.height / 2 - e.clientY) * 0.30);
      } else {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as Element).closest("a,button,.mag-target");
      if (el) { magnetElRef.current = el; cursorScale.set(2.2); }
      else    { magnetElRef.current = null; cursorScale.set(1); }
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, [isMobile, cursorX, cursorY, cursorScale]);

  /* ── Wire isHoveredRef to project links ── */
  useEffect(() => {
    if (!webglOk) return;
    const onEnter = () => { isHoveredRef.current = true; };
    const onLeave = () => { isHoveredRef.current = false; };
    const targets = document.querySelectorAll<HTMLElement>(
      '#projects a, #projects button, a[href*="behemothqa"], a[href*="github"][href*="Keves"]'
    );
    targets.forEach(el => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });
    return () => { targets.forEach(el => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); }); };
  }, [webglOk]);

  /* ── Scroll progress → 5 sections × 0.2 = 1.0 ── */
  useEffect(() => {
    if (!webglOk) return;
    const makeTrigger = (id: string, base: number) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el, start: "top 90%", end: "bottom 10%", scrub: 0.6,
        onUpdate: (self) => { scrollProgressRef.current = base + self.progress * 0.2; },
      });
    };
    const triggers = [
      makeTrigger("hero",     0.00),
      makeTrigger("about",    0.20),
      makeTrigger("projects", 0.40),
      makeTrigger("skills",   0.60),
      makeTrigger("contact",  0.80),
    ].filter(Boolean);
    return () => { triggers.forEach(t => t?.kill()); };
  }, [webglOk]);

  /* ── GSAP explosion reveals per section ── */
  useEffect(() => {
    const localTweens: gsap.core.Tween[] = [];

    document.querySelectorAll<HTMLElement>(".reveal-section").forEach((section) => {
      const items = section.querySelectorAll<HTMLElement>(".reveal-item");
      if (!items.length) return;

      localTweens.push(gsap.fromTo(items,
        { opacity: 0, y: 60, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.85,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none none",
            onEnter: () => {
              // Shockwave ring flash
              const sw = shockRef.current;
              if (!sw) return;
              sw.style.opacity = "1";
              sw.style.transform = "translate(-50%, -50%) scale(0)";
              sw.style.transition = "none";
              requestAnimationFrame(() => {
                sw.style.transition = "transform 0.9s cubic-bezier(0.2,0,0.6,1), opacity 0.9s ease";
                sw.style.transform = "translate(-50%, -50%) scale(8)";
                sw.style.opacity = "0";
              });
            },
          },
        }
      ));

      // Section label clips in from left
      const label = section.querySelector<HTMLElement>(".section-label");
      if (label) {
        localTweens.push(gsap.fromTo(label,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none none" },
          }
        ));
      }
    });

    return () => { localTweens.forEach(tw => { tw.scrollTrigger?.kill(); tw.kill(); }); };
  }, []);

  /* ── Button helpers ── */
  const BtnPrimary = useCallback(({ href, children, external }: { href?: string; children: React.ReactNode; external?: boolean }) => (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
      style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "11px 24px", borderRadius: "10px", background: ACC, color: "#050505", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", transition: "opacity 0.15s, box-shadow 0.15s" }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.opacity = "0.85"; el.style.boxShadow = "0 0 32px rgba(0,229,255,0.65)"; }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.opacity = "1"; el.style.boxShadow = "none"; }}
    >{children}</a>
  ), []);

  const BtnGhost = useCallback(({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) => (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
      style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "11px 22px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.12)", color: TEXT, fontWeight: 600, fontSize: "0.85rem", textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = ACC; el.style.color = BOLD; }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.12)"; el.style.color = TEXT; }}
    >{children}</a>
  ), []);

  return (
    <>
      {/* ── Fixed 3D canvas — always-visible background ── */}
      {webglOk && (
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <Suspense fallback={null}>
            <WebGLGuard>
              <MonolithScene scrollProgress={scrollProgressRef} isHovered={isHoveredRef} />
            </WebGLGuard>
          </Suspense>
        </div>
      )}
      {!webglOk && (
        <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "linear-gradient(135deg, #07080e 0%, #0c0e1c 100%)" }} />
      )}

      {/* ── Shockwave ring ── */}
      <div ref={shockRef} style={{
        position: "fixed", left: "50%", top: "50%", zIndex: 5,
        width: "80px", height: "80px", borderRadius: "50%",
        border: "2px solid rgba(0,229,255,0.55)",
        transform: "translate(-50%, -50%) scale(0)",
        opacity: 0, pointerEvents: "none",
        boxShadow: "0 0 40px rgba(0,229,255,0.3), inset 0 0 20px rgba(0,229,255,0.1)",
      }} />

      {/* ── Magnetic cursor ── */}
      {!isMobile && (
        <motion.div aria-hidden style={{
          position: "fixed", top: 0, left: 0, zIndex: 999, pointerEvents: "none",
          x: springX, y: springY, scale: sScale,
          translateX: "-50%", translateY: "-50%",
          width: 18, height: 18, borderRadius: "50%",
          border: "1.5px solid rgba(0,229,255,0.65)",
          background: "rgba(0,229,255,0.05)",
          backdropFilter: "blur(2px)",
        }} />
      )}

      {/* ── Ambient effects ── */}
      <div className="noise"   aria-hidden />
      <div className="vignette" aria-hidden />
      <div className="amb amb-1" />
      <div className="amb amb-2" />
      <div className="amb amb-3" />

      {/* ══════════════════════════════════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════════════════════════════ */}
      <nav className="nav-glass" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between",
        padding: "0 32px", minHeight: "54px",
      }}>
        <motion.span initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ fontWeight: 900, fontSize: "0.95rem", color: BOLD, letterSpacing: "-0.03em", lineHeight: "54px" }}
        >Johnatan<span style={{ color: ACC }}>.</span></motion.span>

        <div className="nav-section-links" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {["About","Projects","Skills","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              onClick={e => { e.preventDefault(); document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); }}
              style={{ fontSize: "0.8rem", color: MUTED, textDecoration: "none", padding: "4px 10px", borderRadius: "6px", transition: "color 0.15s, background 0.15s" }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.color = BOLD; el.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.color = MUTED; el.style.background = "transparent"; }}
            >{l}</a>
          ))}
        </div>

        <a href="https://settings-qa-ai.replit.app" target="_blank" rel="noopener noreferrer"
          className="nav-behemoth"
          style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "6px 14px", borderRadius: "8px", background: A_DIM, border: "1px solid rgba(0,229,255,0.20)", color: ACC, fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", transition: "background 0.15s", flexShrink: 0 }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,229,255,0.15)")}
          onMouseLeave={e => (e.currentTarget.style.background = A_DIM)}
        >BehemothQA <ExternalLink style={{ width: "10px", height: "10px" }} /></a>
      </nav>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — Full viewport, canvas shows through
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="hero" style={{
        position: "relative", zIndex: 1,
        height: "100svh", minHeight: "600px",
        display: "flex", flexDirection: "column",
        alignItems: "flex-start", justifyContent: "center",
        padding: "0 clamp(1.5rem,6vw,5rem)", paddingTop: "54px",
      }}>
        {/* Left gradient veil for text legibility */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 75% 100% at 15% 50%, rgba(5,5,8,0.52) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        {/* Invisible hover zone for obelisk interaction */}
        {webglOk && !isMobile && (
          <div style={{
            position: "absolute", right: "22%", top: "50%",
            width: "clamp(120px,18vw,220px)", height: "clamp(240px,36vw,440px)",
            transform: "translateY(-50%)", cursor: "none", zIndex: 1,
            pointerEvents: "auto", background: "transparent",
          }} />
        )}

        {/* Hero text content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: "min(700px,90vw)", pointerEvents: "auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.5rem" }}
          >
            <span className="live-dot" style={{ background: G, boxShadow: `0 0 6px ${G}` }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.18em" }}>Available for Work</span>
          </motion.div>

          <h1 style={{
            fontSize: "clamp(2.8rem,7.5vw,5.6rem)",
            fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 0.93,
            color: BOLD, marginBottom: "1.6rem",
            fontFamily: "'Poppins', sans-serif",
          }}>
            <SplitText text="Johnatan" />
            <br />
            <SplitText text="Milrad." style={{ color: ACC, animation: "text-glow 3.5s ease-in-out infinite" }} />
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.6 }}
            style={{ fontSize: "clamp(0.9rem,2vw,1.1rem)", color: TEXT, lineHeight: 1.7, maxWidth: "44ch", marginBottom: "2.5rem", fontWeight: 400 }}
          >
            Manual QA graduate with <em style={{ fontFamily: "'Source Serif 4', serif", fontStyle: "italic", color: "rgba(248,250,252,0.75)" }}>UI/UX sensibility</em> and a precise eye for broken software, catching what automated tools miss.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.56, duration: 0.5 }}
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
          >
            <BtnPrimary href="#about">View Work <ArrowUpRight style={{ width: "14px", height: "14px" }} /></BtnPrimary>
            <BtnGhost href="#contact">Get in Touch</BtnGhost>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }}
          style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", zIndex: 2, pointerEvents: "none" }}
        >
          <span style={{ fontSize: "0.62rem", fontWeight: 600, color: MUTED, letterSpacing: "0.18em", textTransform: "uppercase" }}>scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            style={{ width: "1px", height: "32px", background: `linear-gradient(to bottom, ${ACC}, transparent)` }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ABOUT — Section 2 | Phase B: obelisk rotates, neon intensifies
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="about" className="reveal-section" style={{
        position: "relative", zIndex: 1,
        minHeight: "100svh",
        display: "flex", alignItems: "center",
        padding: "80px clamp(1.5rem,6vw,5rem)",
      }}>
        {/* Left veil */}
        <div className="section-left-veil" />

        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "1140px", margin: "0 auto" }}>
          {/* Section label */}
          <div className="section-label" style={{ marginBottom: "2.5rem" }}>
            <span className="section-num">01</span>
            <span className="section-slash">/</span>
            <span className="section-title-text">ABOUT</span>
          </div>

          <div className="about-grid">
            {/* Left: bio */}
            <div>
              <h2 className="reveal-item cinematic-heading" style={{ marginBottom: "1.5rem" }}>
                The <em>Precise Eye</em><br />for <span style={{ color: ACC }}>Broken</span> Software.
              </h2>

              <p className="reveal-item" style={{ fontSize: "0.93rem", color: TEXT, lineHeight: 1.8, marginBottom: "1rem" }}>
                I'm a <strong style={{ color: BOLD }}>Manual QA graduate</strong> who came to software through design, building skills across <strong style={{ color: BOLD }}>Figma, Photoshop, and Illustrator</strong> with a strong UI/UX sensibility. That design background sharpens my eye for what's visually broken, flows that feel wrong, and UX patterns that don't serve the user.
              </p>
              <p className="reveal-item" style={{ fontSize: "0.93rem", color: TEXT, lineHeight: 1.8, marginBottom: "2rem" }}>
                On top of coursework I built <strong style={{ color: BOLD }}>BehemothQA</strong> independently, getting hands-on with <strong style={{ color: BOLD }}>Jira, Postman, GitHub</strong>, and security testing in the process.
              </p>

              {/* Stats */}
              <div className="reveal-item" style={{ display: "flex", gap: "2.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
                {[
                  { n: "300+", l: "checks / run",   c: ACC },
                  { n: "6",    l: "attack modules",  c: "#67e8f9" },
                  { n: "4",    l: "severity tiers",  c: G },
                ].map(s => (
                  <div key={s.n}>
                    <div style={{ fontSize: "clamp(1.8rem,3.5vw,2.4rem)", fontWeight: 900, color: s.c, letterSpacing: "-0.04em", lineHeight: 1, textShadow: `0 0 30px ${s.c}55` }}>{s.n}</div>
                    <div style={{ fontSize: "0.72rem", color: MUTED, marginTop: "4px", fontWeight: 500 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: glass card */}
            <div className="reveal-item">
              <div className="glass-panel" style={{ padding: "28px" }}>
                {/* Photo */}
                <div style={{ position: "relative", width: "100%", height: "200px", borderRadius: "12px", overflow: "hidden", marginBottom: "20px" }}>
                  <img src={`${BASE}/hero.jpeg`} alt="Johnatan Milrad"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 15%", filter: "grayscale(25%) contrast(1.1) brightness(0.85)" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7,8,14,0.7) 0%, transparent 50%)" }} />
                  <div style={{ position: "absolute", bottom: "14px", left: "14px" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.85rem", color: BOLD }}>Johnatan Milrad</span>
                    <span className="badge" style={{ marginLeft: "8px" }}>QA Engineer</span>
                  </div>
                  <div style={{ position: "absolute", top: "10px", left: "10px", width: "16px", height: "16px", borderTop: `2px solid ${ACC}`, borderLeft: `2px solid ${ACC}`, opacity: 0.7 }} />
                </div>

                {/* Availability */}
                <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "18px" }}>
                  <span className="live-dot" />
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.14em" }}>Open to Work</span>
                </div>

                {/* Contact info */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                  {[
                    { icon: MapPin, text: "Ashdod, Israel",              href: undefined },
                    { icon: Mail,   text: "milrad.johnathan19@gmail.com", href: "mailto:milrad.johnathan19@gmail.com" },
                    { icon: Phone,  text: "+972 523 516 364",             href: "tel:+972523516364" },
                  ].map(({ icon: Icon, text, href }) => (
                    <div key={text} style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "0.8rem", color: TEXT }}>
                      <div className="contact-icon-pill" style={{ width: "28px", height: "28px", borderRadius: "8px", flexShrink: 0 }}>
                        <Icon style={{ width: "12px", color: ACC, position: "relative", zIndex: 1 }} />
                      </div>
                      {href ? <a href={href} style={{ color: TEXT, textDecoration: "none" }}>{text}</a> : <span>{text}</span>}
                    </div>
                  ))}
                </div>

                {/* Cert flip card */}
                <CertFlipCard />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PROJECTS — Section 3 | Phase C: EXPLOSION, fragments scatter
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="projects" className="reveal-section" style={{
        position: "relative", zIndex: 1,
        minHeight: "130svh",
        padding: "80px clamp(1.5rem,6vw,5rem)",
      }}>
        <div className="section-left-veil" />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "1140px", margin: "0 auto" }}>
          <div className="section-label" style={{ marginBottom: "3rem" }}>
            <span className="section-num">02</span>
            <span className="section-slash">/</span>
            <span className="section-title-text">PROJECTS</span>
          </div>

          {/* Project 1: BehemothQA */}
          <div className="reveal-item project-strip">
            <div className="project-strip-inner">
              <div className="project-meta">
                <div className="project-number">01</div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <span className="live-dot" />
                    <h3 className="project-name">BehemothQA</h3>
                    <span className="badge" style={{ animation: "float-badge 5s ease-in-out infinite" }}>v2.4</span>
                  </div>
                  <p style={{ fontSize: "0.88rem", color: TEXT, lineHeight: 1.7, marginBottom: "14px", maxWidth: "46ch" }}>
                    Full-scale Python QA platform with 300+ automated security checks per run. Built from scratch with NightMOTH attack modules, WAF bypass, and PDF report generation.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                    {["Python","Security","DDoS","UI/UX QA","NightMOTH","PDF Reports"].map(t => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <a href="https://settings-qa-ai.replit.app" target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "8px 18px", borderRadius: "8px", background: ACC, color: "#050505", fontWeight: 700, fontSize: "0.8rem", textDecoration: "none", transition: "opacity 0.15s, box-shadow 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.boxShadow = "0 0 22px rgba(0,229,255,0.5)"; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.boxShadow = "none"; }}
                    >Launch App <ExternalLink style={{ width: "11px", height: "11px" }} /></a>
                  </div>
                </div>
              </div>
              {/* IDE preview */}
              <div className="project-ide">
                <IdeBlock />
              </div>
            </div>
          </div>

          {/* Project 2: DDoS Stress Test */}
          <div className="reveal-item project-strip">
            <div className="project-strip-inner" style={{ alignItems: "center" }}>
              <div className="project-meta">
                <div className="project-number">02</div>
                <div>
                  <h3 className="project-name" style={{ marginBottom: "8px" }}>DDoS Stress Test Suite</h3>
                  <p style={{ fontSize: "0.88rem", color: TEXT, lineHeight: 1.7, marginBottom: "14px", maxWidth: "46ch" }}>
                    NightMOTH simulation platform for high-concurrency load testing. 6 attack modules including WAFGutPunch and AuthAbyss with configurable concurrency up to 2000 simultaneous requests.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                    {["Python","Load Testing","Security","Concurrency","Automation"].map(t => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                  <a href="https://github.com/Keves1337" target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "8px 18px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.12)", color: TEXT, fontWeight: 600, fontSize: "0.8rem", textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = ACC; e.currentTarget.style.color = BOLD; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = TEXT; }}
                  >GitHub <ExternalLink style={{ width: "11px", height: "11px" }} /></a>
                </div>
              </div>
              {/* Visual: animated rings */}
              <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: "240px", height: "180px", position: "relative" }}>
                {[80, 120, 160].map((size, i) => (
                  <div key={i} style={{
                    position: "absolute", width: size, height: size, borderRadius: "50%",
                    border: `1px solid rgba(0,229,255,${0.35 - i * 0.1})`,
                    animation: `orbit-ring ${11 + i * 3}s linear infinite`,
                  }}>
                    <div style={{ position: "absolute", top: "-4px", left: "50%", transform: "translateX(-50%)", width: "7px", height: "7px", borderRadius: "50%", background: ACC, boxShadow: `0 0 12px ${ACC}` }} />
                  </div>
                ))}
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,255,0.3) 0%, rgba(0,229,255,0.05) 70%)", border: `1px solid rgba(0,229,255,0.45)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Zap style={{ width: "16px", color: ACC }} />
                </div>
              </div>
            </div>
          </div>

          {/* Project 3: Test Reports */}
          <div className="reveal-item project-strip">
            <div className="project-strip-inner" style={{ alignItems: "center" }}>
              <div className="project-meta">
                <div className="project-number">03</div>
                <div>
                  <h3 className="project-name" style={{ marginBottom: "8px" }}>Professional QA Test Reports</h3>
                  <p style={{ fontSize: "0.88rem", color: TEXT, lineHeight: 1.7, marginBottom: "14px", maxWidth: "46ch" }}>
                    Comprehensive test documentation including test plans, bug reports, test suites, and exploratory charters following industry-standard QA methodologies and severity tiers.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                    {["Test Cases","Bug Reports","Jira","Exploratory","Regression"].map(t => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                  <a href="https://github.com/Keves1337" target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "8px 18px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.12)", color: TEXT, fontWeight: 600, fontSize: "0.8rem", textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = ACC; e.currentTarget.style.color = BOLD; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = TEXT; }}
                  >View Reports <ExternalLink style={{ width: "11px", height: "11px" }} /></a>
                </div>
              </div>
              {/* Visual: stat bars */}
              <div style={{ flexShrink: 0, width: "220px" }}>
                {[
                  { label: "Test Coverage", val: 92, c: ACC },
                  { label: "Bug Detection", val: 87, c: "#67e8f9" },
                  { label: "Report Quality", val: 95, c: G },
                ].map(b => (
                  <div key={b.label} style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                      <span style={{ fontSize: "0.72rem", color: MUTED }}>{b.label}</span>
                      <span style={{ fontSize: "0.72rem", color: b.c, fontWeight: 700 }}>{b.val}%</span>
                    </div>
                    <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${b.val}%`, background: `linear-gradient(to right, ${b.c}, ${b.c}88)`, borderRadius: "2px", boxShadow: `0 0 8px ${b.c}66`, transition: "width 1s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GlassBox interactive demo */}
          <div className="reveal-item" style={{ marginTop: "1.5rem" }}>
            <GlassBox />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SKILLS — Section 4 | Phase D: orbital grid formation
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="skills" className="reveal-section" style={{
        position: "relative", zIndex: 1,
        minHeight: "100svh",
        display: "flex", alignItems: "center",
        padding: "80px clamp(1.5rem,6vw,5rem)",
      }}>
        <div className="section-left-veil" />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "1140px", margin: "0 auto", width: "100%" }}>
          <div className="section-label" style={{ marginBottom: "3rem" }}>
            <span className="section-num">03</span>
            <span className="section-slash">/</span>
            <span className="section-title-text">SKILLS</span>
          </div>

          <div className="skills-grid">
            {/* Skill categories */}
            <div>
              <h2 className="reveal-item cinematic-heading" style={{ marginBottom: "2rem", fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
                <em>Precision</em><br /><span style={{ color: ACC }}>Toolset.</span>
              </h2>
              {[
                { cat: "QA",      col: ACC,       items: ["Manual Testing","Test Case Design","Bug Reporting","Regression","Exploratory Testing","Mobile Testing"] },
                { cat: "Tools",   col: "#67e8f9", items: ["Jira","Postman","GitHub","Python","SQL","API Testing"] },
                { cat: "Design",  col: "#f9a8d4", items: ["Figma","Photoshop","Illustrator","UI/UX Review","Accessibility"] },
              ].map((g, i) => (
                <div key={g.cat} className="reveal-item skill-category">
                  <div style={{ fontSize: "0.62rem", fontWeight: 800, color: g.col, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.14em" }}>
                    <span style={{ opacity: 0.5, marginRight: "6px", fontFamily: "monospace" }}>0{i + 1}</span>{g.cat}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {g.items.map(s => (
                      <span key={s} className="skill-pill"
                        style={{ "--pill-col": g.col } as React.CSSProperties}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = g.col; }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = TEXT; }}
                      ><span>{s}</span></span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Marquee panel */}
            <div className="reveal-item">
              <div className="glass-panel" style={{ padding: "28px", height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                  <Zap style={{ width: "14px", color: ACC }} />
                  <span style={{ fontSize: "0.68rem", fontWeight: 800, color: MUTED, textTransform: "uppercase", letterSpacing: "0.12em" }}>Full Skill Set</span>
                </div>
                <Marquee />
                <div style={{ marginTop: "28px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <p style={{ fontSize: "0.83rem", color: TEXT, lineHeight: 1.75 }}>
                    Combining the precision of a QA engineer with the eye of a designer to catch bugs that matter and interfaces that don't serve their users.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CONTACT — Section 5 | Phase E: energy sphere forms
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="reveal-section" style={{
        position: "relative", zIndex: 1,
        minHeight: "100svh",
        display: "flex", alignItems: "center",
        padding: "80px clamp(1.5rem,6vw,5rem) 120px",
      }}>
        <div className="section-left-veil" />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "1140px", margin: "0 auto", width: "100%" }}>
          <div className="section-label" style={{ marginBottom: "3rem" }}>
            <span className="section-num">04</span>
            <span className="section-slash">/</span>
            <span className="section-title-text">CONTACT</span>
          </div>

          <div className="contact-cinematic-grid">
            {/* Left: heading + details */}
            <div>
              <h2 className="reveal-item cinematic-heading" style={{ marginBottom: "1.5rem" }}>
                Let's <span style={{ color: ACC }}>work</span><br /><em>together.</em>
              </h2>
              <p className="reveal-item" style={{ fontSize: "0.9rem", color: TEXT, lineHeight: 1.75, marginBottom: "2rem", maxWidth: "36ch" }}>
                Submit a message. I respond to every serious inquiry.
              </p>
              <div className="reveal-item" style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "2rem" }}>
                {[
                  { icon: Mail,   text: "milrad.johnathan19@gmail.com", href: "mailto:milrad.johnathan19@gmail.com" },
                  { icon: Phone,  text: "+972 523 516 364",             href: "tel:+972523516364" },
                  { icon: MapPin, text: "Ashdod, Israel",               href: undefined },
                ].map(({ icon: Icon, text, href }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div className="contact-icon-pill">
                      <Icon style={{ width: "14px", color: ACC, position: "relative", zIndex: 1 }} />
                    </div>
                    {href
                      ? <a href={href} style={{ fontSize: "0.88rem", color: TEXT, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = BOLD)} onMouseLeave={e => (e.currentTarget.style.color = TEXT)}>{text}</a>
                      : <span style={{ fontSize: "0.88rem", color: TEXT }}>{text}</span>
                    }
                  </div>
                ))}
              </div>
              <div className="reveal-item" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <BtnGhost href="https://www.linkedin.com/in/johnathan-milrad-502b18b2" external>LinkedIn</BtnGhost>
                <BtnPrimary href="https://settings-qa-ai.replit.app" external>BehemothQA <ExternalLink style={{ width: "12px", height: "12px" }} /></BtnPrimary>
              </div>
            </div>

            {/* Right: contact form */}
            <div className="reveal-item">
              <div className="glass-panel" style={{ padding: "32px" }}>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        position: "relative", zIndex: 1,
        padding: "28px clamp(1.5rem,6vw,5rem)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px",
        background: "rgba(7,8,14,0.75)", backdropFilter: "blur(12px)",
      }}>
        <span style={{ fontSize: "0.75rem", color: MUTED }}>© 2025 Johnatan Milrad · QA Engineer</span>
        <span style={{ fontSize: "0.72rem", color: "rgba(248,250,252,0.1)", letterSpacing: "0.02em" }}>Built with precision.</span>
      </footer>

      <style>{`
        /* ── Section layout helpers ── */
        .section-left-veil {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to right, rgba(4,4,10,0.80) 0%, rgba(4,4,10,0.42) 48%, transparent 100%);
        }
        .section-label { display: flex; align-items: baseline; gap: 0.6rem; }
        .section-num { font-size: clamp(0.68rem,1.5vw,0.82rem); font-weight: 700; color: ${ACC}; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.1em; }
        .section-slash { color: rgba(0,229,255,0.28); font-size: 0.78rem; }
        .section-title-text { font-size: clamp(0.68rem,1.5vw,0.82rem); font-weight: 700; color: ${MUTED}; letter-spacing: 0.18em; text-transform: uppercase; }

        /* ── Cinematic heading — Poppins with optional serif italic ── */
        .cinematic-heading { font-size: clamp(2rem,4.5vw,3.4rem); font-weight: 700; letter-spacing: -0.035em; line-height: 1.05; color: ${BOLD}; margin: 0; font-family: 'Poppins', sans-serif; }
        .cinematic-heading em { font-family: 'Source Serif 4', serif; font-style: italic; font-weight: 400; color: rgba(248,250,252,0.8); }

        /* ── Glass panel — liquid-glass-strong tier ── */
        .glass-panel {
          background: rgba(5,5,12,0.60);
          backdrop-filter: blur(48px) saturate(1.6);
          -webkit-backdrop-filter: blur(48px) saturate(1.6);
          box-shadow: 0 8px 32px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.13);
          border-radius: 22px;
          position: relative; overflow: hidden;
        }
        .glass-panel::before {
          content: '';
          position: absolute; inset: 0; border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%, transparent 40%, transparent 60%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          pointer-events: none; z-index: 0;
        }
        .glass-panel > * { position: relative; z-index: 1; }

        /* ── About section grid ── */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }

        /* ── Project strips ── */
        .project-strip { margin-bottom: 0.875rem; }
        .project-strip-inner {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(14px) saturate(1.5);
          -webkit-backdrop-filter: blur(14px) saturate(1.5);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.10), 0 4px 24px rgba(0,0,0,0.30);
          border-radius: 20px;
          padding: 26px 30px;
          display: flex; gap: 2rem; align-items: flex-start;
          position: relative; overflow: hidden;
          transition: box-shadow 0.28s;
        }
        .project-strip-inner::before {
          content: '';
          position: absolute; inset: 0; border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.10) 20%, transparent 40%, transparent 60%, rgba(255,255,255,0.10) 80%, rgba(255,255,255,0.38) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          pointer-events: none; z-index: 0;
        }
        .project-strip-inner > * { position: relative; z-index: 1; }
        .project-strip-inner:hover { box-shadow: inset 0 1px 1px rgba(255,255,255,0.14), 0 4px 32px rgba(0,229,255,0.10), 0 0 0 1px rgba(0,229,255,0.14); }
        .project-meta { display: flex; gap: 1.5rem; flex: 1; min-width: 0; }
        .project-number { font-size: clamp(2.5rem,5vw,4rem); font-weight: 800; color: rgba(0,229,255,0.06); font-family: 'JetBrains Mono', monospace; letter-spacing: -0.04em; line-height: 1; flex-shrink: 0; user-select: none; }
        .project-name { font-size: 1.12rem; font-weight: 700; color: ${BOLD}; letter-spacing: -0.02em; margin: 0; font-family: 'Poppins', sans-serif; }
        .project-ide { flex-shrink: 0; width: clamp(220px, 34%, 380px); }
        .tech-tag { padding: 3px 11px; border-radius: 99px; font-size: 0.69rem; font-weight: 500; background: rgba(255,255,255,0.05); color: ${TEXT}; position: relative; overflow: hidden; display: inline-block; }
        .tech-tag::before {
          content: '';
          position: absolute; inset: 0; border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 50%, rgba(255,255,255,0.08) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          pointer-events: none;
        }

        /* ── Skill pill ── */
        .skill-pill {
          padding: 5px 13px; border-radius: 99px; font-size: 0.75rem; font-weight: 500;
          background: rgba(255,255,255,0.04);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.08);
          color: ${TEXT}; transition: color 0.2s, box-shadow 0.2s; cursor: default;
          position: relative; overflow: hidden; display: inline-block;
        }
        .skill-pill::before {
          content: '';
          position: absolute; inset: 0; border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.30) 0%, transparent 50%, rgba(255,255,255,0.08) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          pointer-events: none;
        }
        .skill-pill > span { position: relative; z-index: 1; }
        .skill-pill:hover { color: ${BOLD}; box-shadow: inset 0 1px 1px rgba(255,255,255,0.14), 0 0 0 1px rgba(0,229,255,0.22); }

        /* ── Skills grid ── */
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
        .skill-category { margin-bottom: 1.5rem; }

        /* ── Contact grid ── */
        .contact-cinematic-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 3.5rem; align-items: start; }

        /* ── Contact icon pill ── */
        .contact-icon-pill {
          width: 38px; height: 38px; border-radius: 12px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.05);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.10), 0 2px 8px rgba(0,0,0,0.25);
          position: relative; overflow: hidden;
        }
        .contact-icon-pill::before {
          content: '';
          position: absolute; inset: 0; border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 50%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          pointer-events: none;
        }

        /* ── Shared animations ── */
        @keyframes marquee-fwd { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes marquee-rev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        .marquee-mask { -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%); mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%); }

        /* ── Nav pill ── */
        .nav-glass {
          background: rgba(5,5,12,0.65);
          backdrop-filter: blur(28px) saturate(1.6);
          -webkit-backdrop-filter: blur(28px) saturate(1.6);
          box-shadow: 0 1px 24px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.10);
          border-bottom: none;
        }
        .nav-glass::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 1.4px;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.20) 30%, rgba(255,255,255,0.08) 70%, transparent 100%);
          pointer-events: none;
        }

        /* ── Mobile overrides ── */
        @media (max-width: 767px) {
          nav { padding: 0 16px !important; min-height: 54px !important; align-content: center !important; }
          .nav-section-links { order: 10 !important; flex-basis: 100% !important; justify-content: space-around !important; padding: 8px 0 10px !important; border-top: 1px solid rgba(255,255,255,0.05) !important; }
          .nav-section-links a { font-size: 0.75rem !important; padding: 5px 8px !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .skills-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .contact-cinematic-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .project-strip-inner { flex-direction: column !important; }
          .project-ide { width: 100% !important; }
          .project-meta { flex-direction: column !important; gap: 0.75rem !important; }
          .section-left-veil { background: rgba(4,4,10,0.80) !important; }
          .cinematic-heading { font-size: clamp(1.8rem, 8vw, 2.4rem) !important; }
          #hero h1 { font-size: clamp(2.4rem, 9vw, 3.2rem) !important; }
          .ide-body { overflow-x: auto !important; }
          .ide-body pre { min-width: max-content; }
          .contact-form-grid { grid-template-columns: 1fr !important; }
          .gb-ui { padding: 18px 20px !important; }
          .gb-pre { font-size: 9.5px !important; }
        }
        a { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </>
  );
}
