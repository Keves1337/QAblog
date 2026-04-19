import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ExternalLink, Mail, Phone, MapPin, Send,
  Shield, Eye, ArrowRight, Sparkles,
  FileText, Zap,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BLOOM_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4";

/* ─── Palette — Bloom white hierarchy ──────────────────────────────────── */
const W   = "rgba(255,255,255,1)";
const W80 = "rgba(255,255,255,0.80)";
const W60 = "rgba(255,255,255,0.60)";
const W50 = "rgba(255,255,255,0.50)";
const W25 = "rgba(255,255,255,0.25)";
const W10 = "rgba(255,255,255,0.10)";
const G   = "#22c55e";
const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

/* ─── Mobile hook ───────────────────────────────────────────────────────── */
const useIsMobile = () => {
  const [m, setM] = useState(() => typeof window !== "undefined" && window.innerWidth < 1024);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 1024);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return m;
};

/* ─── Marquee ────────────────────────────────────────────────────────────── */
const SKILLS = [
  "Manual Testing","Test Case Design","Bug Reporting","Regression Testing",
  "Exploratory Testing","Jira","Postman","GitHub","Python","SQL","Figma",
  "Photoshop","Illustrator","UI/UX Review","API Testing","Mobile Testing",
  "Web Accessibility","Security QA","Performance QA","Agile/Scrum",
];
const Marquee = () => (
  <div style={{ position:"relative", overflow:"hidden" }}>
    {[1,2].map(k => (
      <div key={k} style={{ display:"flex", gap:"8px", padding:"4px 0", width:"max-content",
        animation:`mq-${k%2===0?"rev":"fwd"} 38s linear infinite` }}>
        {[...SKILLS,...SKILLS].map((s,i) => (
          <span key={i} className="lg-pill" style={{ padding:"5px 14px", borderRadius:"99px", fontSize:"0.75rem",
            color:W60, whiteSpace:"nowrap", flexShrink:0 }}>{s}</span>
        ))}
      </div>
    ))}
  </div>
);



/* ─── Cert flip card ─────────────────────────────────────────────────────── */
const FACE: React.CSSProperties = {
  position:"absolute", inset:0, backfaceVisibility:"hidden",
  WebkitBackfaceVisibility:"hidden" as React.CSSProperties["WebkitBackfaceVisibility"],
  display:"flex", gap:"12px", alignItems:"flex-start",
};
const CertFlipCard = () => {
  const [flipped, setFlipped] = useState(false);
  const [quick,   setQuick]   = useState(false);
  return (
    <div style={{ flex:1, minHeight:"130px", perspective:"900px", cursor:"pointer", userSelect:"none" }}
      onMouseEnter={() => { setQuick(false); setFlipped(true); }}
      onMouseLeave={() => { setQuick(false); setFlipped(false); }}
      onClick={() => { setQuick(true); setFlipped(f => !f); }}
    >
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: quick ? 0.22 : 0.72, ease:[0.4,0,0.2,1] }}
        style={{ width:"100%", height:"100%", position:"relative", transformStyle:"preserve-3d" }}
      >
        <div style={FACE}>
          <div style={{ padding:"11px", borderRadius:"11px", flexShrink:0, background:"rgba(255,255,255,0.07)", animation:"float-badge 5.5s ease-in-out infinite" }}>
            <Shield style={{ width:"18px", height:"18px", color:W }} strokeWidth={1.5} />
          </div>
          <div>
            <div style={{ fontWeight:600, fontSize:"0.92rem", color:W, marginBottom:"4px" }}>Manual QA Engineer</div>
            <div style={{ fontSize:"0.72rem", color:W60, marginBottom:"8px" }}>QA Course · Graduate</div>
            <p style={{ fontSize:"0.78rem", color:W50, lineHeight:1.65, margin:0 }}>Full manual testing lifecycle: test case design, bug reporting, regression testing, Jira, web and mobile platforms.</p>
          </div>
        </div>
        <div style={{ ...FACE, transform:"rotateY(180deg)" }}>
          <div style={{ padding:"11px", borderRadius:"11px", flexShrink:0, background:"rgba(255,255,255,0.07)", animation:"float-badge 5.5s ease-in-out infinite" }}>
            <Eye style={{ width:"18px", height:"18px", color:W }} strokeWidth={1.5} />
          </div>
          <div>
            <div style={{ fontWeight:600, fontSize:"0.92rem", color:W, marginBottom:"4px" }}>UI/UX Designer</div>
            <div style={{ fontSize:"0.72rem", color:W60, marginBottom:"8px" }}>UI/UX Prodigy</div>
            <p style={{ fontSize:"0.78rem", color:W50, lineHeight:1.65, margin:0 }}>Figma, Photoshop, Illustrator. Design instinct sharpens QA precision — spotting what's visually wrong instantly.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ─── IDE block ──────────────────────────────────────────────────────────── */
const IdeBlock = () => (
  <div className="ide-window" style={{ flex:1 }}>
    <div className="ide-bar">
      <span className="ide-dot" style={{ background:"#ff5f57" }} />
      <span className="ide-dot" style={{ background:"#febc2e" }} />
      <span className="ide-dot" style={{ background:"#28c840" }} />
      <span style={{ marginLeft:"10px", color:W25, fontSize:"0.68rem" }}>behemoth_qa.py</span>
      <span style={{ marginLeft:"auto" }} className="badge">Python 3.12</span>
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
<span className="tok-var">report</span>{" "}<span className="tok-op">=</span>{" "}<span className="tok-var">results</span>.<span className="tok-fn">export_report</span>{"(\n"}
{"  "}<span className="tok-pm">sections</span><span className="tok-op">=</span>{"["}<span className="tok-str">"security"</span>{", "}<span className="tok-str">"load"</span>{", "}<span className="tok-str">"ui_ux"</span>{"]\n)\n\n"}
<span className="tok-fn">print</span>{"("}<span className="tok-str">f"Scan done: {"{"}<span className="tok-var">results</span>.<span className="tok-var">total_checks</span>{"}"} checks"</span>{")\n"}
<span className="tok-cm"># Scan done: 1500+ tests</span><span className="ide-cursor"/>
      </pre>
    </div>
  </div>
);

/* ─── Contact form ───────────────────────────────────────────────────────── */
const issueTypes = ["Hire Request","Portfolio Feedback","Bug Found","Collaboration","Other"];
function ChevronDown({ style }: { style?: React.CSSProperties }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><polyline points="6 9 12 15 18 9"/></svg>;
}
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
      method:"POST", body:fd, headers:{ Accept:"application/json" },
    }).then(() => setSent(true)).catch(() => setSent(true));
  };
  if (sent) return (
    <div style={{ textAlign:"center", padding:"2rem 0" }}>
      <div style={{ fontSize:"2rem", marginBottom:"10px" }}>✅</div>
      <p style={{ fontWeight:600, color:W, marginBottom:"6px" }}>Message delivered.</p>
      <p style={{ color:W60, fontSize:"0.85rem" }}>I'll get back to you soon.</p>
    </div>
  );
  return (
    <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:"10px" }}>
        <div>
          <div style={{ fontSize:"0.68rem", fontWeight:600, color:W50, marginBottom:"6px", textTransform:"uppercase", letterSpacing:"0.08em" }}>Type</div>
          <div style={{ position:"relative" }}>
            <select value={type} onChange={e => setType(e.target.value)} className="noir-input"
              style={{ appearance:"none", paddingRight:"28px", cursor:"pointer" }}>
              {issueTypes.map(t => <option key={t}>{t}</option>)}
            </select>
            <ChevronDown style={{ position:"absolute", right:"10px", top:"50%", transform:"translateY(-50%)", width:"12px", color:W50, pointerEvents:"none" }} />
          </div>
        </div>
        <div>
          <div style={{ fontSize:"0.68rem", fontWeight:600, color:W50, marginBottom:"6px", textTransform:"uppercase", letterSpacing:"0.08em" }}>Name</div>
          <input name="name" required placeholder="Your name" className="noir-input" />
        </div>
      </div>
      <div>
        <div style={{ fontSize:"0.68rem", fontWeight:600, color:W50, marginBottom:"6px", textTransform:"uppercase", letterSpacing:"0.08em" }}>Email</div>
        <input name="email" type="email" required placeholder="your@email.com" className="noir-input" />
      </div>
      <div>
        <div style={{ fontSize:"0.68rem", fontWeight:600, color:W50, marginBottom:"6px", textTransform:"uppercase", letterSpacing:"0.08em" }}>Message</div>
        <textarea name="message" required rows={4} placeholder="Tell me about your project..." className="noir-input" style={{ resize:"vertical", minHeight:"80px" }} />
      </div>
      <button type="submit" className="cta-btn lgs"
        style={{ padding:"11px 24px", borderRadius:"99px", color:W, fontWeight:500, fontSize:"0.85rem", border:"none", cursor:"pointer",
          display:"inline-flex", alignItems:"center", gap:"7px", alignSelf:"flex-start",
          transition:"transform 0.2s", fontFamily:"'Poppins',sans-serif" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >Send Message <Send style={{ width:"13px", height:"13px" }} /></button>
    </form>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════ */
export default function Page() {
  const isMobile = useIsMobile();
  const shockRef = useRef<HTMLDivElement>(null);

  /* Hero card 3-D tilt */
  const tiltRef    = useRef<HTMLDivElement>(null);
  const tiltX      = useMotionValue(0);
  const tiltY      = useMotionValue(0);
  const sTiltX     = useSpring(tiltX, { stiffness:280, damping:22 });
  const sTiltY     = useSpring(tiltY, { stiffness:280, damping:22 });
  const handleTilt = (cx: number, cy: number) => {
    const el = tiltRef.current; if (!el) return;
    const r  = el.getBoundingClientRect();
    tiltX.set(((cy - r.top  - r.height/2) / (r.height/2)) * -12);
    tiltY.set(((cx - r.left - r.width /2) / (r.width /2)) *  12);
  };
  const resetTilt  = () => { tiltX.set(0); tiltY.set(0); };

  /* GSAP reveal animations */
  useEffect(() => {
    const tweens: gsap.core.Tween[] = [];
    document.querySelectorAll<HTMLElement>(".reveal-section").forEach(section => {
      const items = section.querySelectorAll<HTMLElement>(".reveal-item");
      if (!items.length) return;
      tweens.push(gsap.fromTo(items,
        { opacity:0, y:56, scale:0.95 },
        { opacity:1, y:0, scale:1, duration:0.82, stagger:0.09, ease:"power3.out",
          scrollTrigger: {
            trigger:section, start:"top 78%", toggleActions:"play none none none",
            onEnter: () => {
              const sw = shockRef.current; if (!sw) return;
              sw.style.opacity="1"; sw.style.transform="translate(-50%,-50%) scale(0)";
              sw.style.transition="none";
              requestAnimationFrame(() => {
                sw.style.transition="transform 0.9s cubic-bezier(0.2,0,0.6,1), opacity 0.9s ease";
                sw.style.transform="translate(-50%,-50%) scale(8)"; sw.style.opacity="0";
              });
            },
          },
        }
      ));
      const label = section.querySelector<HTMLElement>(".sec-label");
      if (label) tweens.push(gsap.fromTo(label,
        { clipPath:"inset(0 100% 0 0)" },
        { clipPath:"inset(0 0% 0 0)", duration:0.7, ease:"power2.out",
          scrollTrigger:{ trigger:section, start:"top 85%", toggleActions:"play none none none" } }
      ));
    });
    return () => { tweens.forEach(tw => { tw.scrollTrigger?.kill(); tw.kill(); }); };
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  };

  return (
    <>
      {/* ── Full-screen video background (Bloom spec: z-0, object-cover) ── */}
      <video
        autoPlay loop muted playsInline
        style={{
          position:"fixed", inset:0, width:"100%", height:"100%",
          objectFit:"cover", zIndex:0, pointerEvents:"none",
        }}
      >
        <source src={BLOOM_VIDEO} type="video/mp4" />
      </video>

      {/* Shockwave ring */}
      <div ref={shockRef} style={{
        position:"fixed", left:"50%", top:"50%", zIndex:5,
        width:"80px", height:"80px", borderRadius:"50%",
        border:"2px solid rgba(255,255,255,0.25)",
        transform:"translate(-50%,-50%) scale(0)", opacity:0, pointerEvents:"none",
      }} />

      {/* Noise overlay */}
      <div className="noise" aria-hidden />

      {/* All content at z-10 per Bloom spec */}
      <div style={{ position:"relative", zIndex:10 }}>

        {/* ── Fixed nav ── */}
        <nav style={{
          position:"fixed", top:0, left:0, right:0, zIndex:100,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"0 2rem", minHeight:"56px",
          background:"rgba(8,8,18,0.55)", backdropFilter:"blur(14px)", WebkitBackdropFilter:"blur(14px)",
        }}>
          <a href="#hero" onClick={scrollTo("hero")} aria-label="Home"
            style={{ display:"inline-flex", alignItems:"center", textDecoration:"none" }}>
            <svg width="38" height="38" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"
              style={{ display:"block" }}>
              <defs>
                <linearGradient id="jmStroke" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                  <stop offset="55%" stopColor="rgba(255,255,255,0.65)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.95)" />
                </linearGradient>
                <linearGradient id="jmRing" x1="0" y1="0" x2="0" y2="44" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.10)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.55)" />
                </linearGradient>
              </defs>
              <rect x="1" y="1" width="42" height="42" rx="11" fill="rgba(255,255,255,0.04)" stroke="url(#jmRing)" strokeWidth="1.2" />
              {/* M strokes */}
              <path d="M11 31 L11 14 L17 24 L23 14 L23 31"
                stroke="url(#jmStroke)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* J descender */}
              <path d="M33 13 L33 28 Q33 33 28 33 Q24 33 24 29"
                stroke="url(#jmStroke)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              {/* J top serif dot */}
              <circle cx="33" cy="11.4" r="1.5" fill="rgba(255,255,255,0.92)" />
            </svg>
          </a>
          {!isMobile && (
            <div style={{ display:"flex", gap:"4px" }}>
              {["About","Projects","Skills"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} onClick={scrollTo(l.toLowerCase())}
                  style={{ fontSize:"0.8rem", color:W50, textDecoration:"none", padding:"4px 10px",
                    borderRadius:"6px", transition:"color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color=W)}
                  onMouseLeave={e => (e.currentTarget.style.color=W50)}
                >{l}</a>
              ))}
            </div>
          )}
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <a href="https://www.linkedin.com/in/johnathan-milrad-502b18b2" target="_blank" rel="noopener noreferrer"
              style={{ fontSize:"0.78rem", color:W80, textDecoration:"none", padding:"4px 8px", transition:"color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color=W)}
              onMouseLeave={e => (e.currentTarget.style.color=W80)}
            >LinkedIn</a>
            <a href="https://github.com/Keves1337" target="_blank" rel="noopener noreferrer"
              style={{ fontSize:"0.78rem", color:W80, textDecoration:"none", padding:"4px 8px", transition:"color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color=W)}
              onMouseLeave={e => (e.currentTarget.style.color=W80)}
            >GitHub</a>
            <a href="https://settings-qa-ai.replit.app" target="_blank" rel="noopener noreferrer"
              className="lg-pill" style={{ display:"inline-flex", alignItems:"center", gap:"5px",
                padding:"6px 14px", borderRadius:"99px", color:W80, fontSize:"0.78rem", fontWeight:500, textDecoration:"none" }}
            >BehemothQA <ExternalLink style={{ width:"10px", height:"10px" }} /></a>
          </div>
        </nav>

        {/* ══════════════════════════════════════════════════════════════════
            HERO — Bloom two-panel split
        ══════════════════════════════════════════════════════════════════ */}
        <section id="hero" style={{
          minHeight:"100svh", display:"flex", flexDirection:"row",
        }}>
          {/* ── LEFT PANEL 52% ── */}
          <div style={{
            position:"relative", width: isMobile ? "100%" : "52%",
            display:"flex", flexDirection:"column",
            padding: isMobile ? "1rem" : "1.5rem",
            paddingTop:"64px",
          }}>
            <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", height:"100%",
              padding: isMobile ? "1.25rem" : "1.5rem 2rem" }}>

              {/* Nav row — floats over raw video (no glass behind) */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                marginBottom:"1.5rem", paddingBottom:"0.5rem" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                  <span className="live-dot" style={{ background:G, boxShadow:`0 0 6px ${G}` }} />
                  <span style={{ fontSize:"0.72rem", fontWeight:600, color:G, textTransform:"uppercase", letterSpacing:"0.16em" }}>Available for Work</span>
                </div>
              </div>

              {/* Hero card — half-width glass card with 3D tilt on hover/touch */}
              <motion.div
                ref={tiltRef}
                style={{ rotateX:sTiltX, rotateY:sTiltY,
                  transformStyle:"preserve-3d", perspective:900,
                  width: "fit-content", maxWidth: isMobile ? "100%" : "clamp(280px,44%,440px)",
                  alignSelf:"flex-start" }}
                onMouseMove={e => handleTilt(e.clientX, e.clientY)}
                onMouseLeave={resetTilt}
                onTouchMove={e => { e.preventDefault(); handleTilt(e.touches[0].clientX, e.touches[0].clientY); }}
                onTouchEnd={resetTilt}
              >
              <div className="lgs" style={{ borderRadius:"1.75rem", display:"flex",
                flexDirection:"column", justifyContent:"center", width:"100%",
                gap: isMobile ? "1.25rem" : "1.75rem",
                padding: isMobile ? "1.5rem" : "2rem 2.25rem" }}>

                <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.2, duration:0.65 }}
                  style={{ fontSize:"clamp(2rem,4vw,3.2rem)", fontWeight:500,
                    letterSpacing:"-0.04em", lineHeight:0.95, color:W, margin:0,
                    fontFamily:"'Poppins',sans-serif" }}
                >
                  Johnatan<br />
                  <em style={{ fontFamily:"'Source Serif 4',serif", fontStyle:"italic",
                    fontWeight:300, color:W80 }}>Milrad.</em>
                </motion.h1>

                <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.38, duration:0.55 }}
                  style={{ fontSize:"clamp(0.85rem,1.5vw,0.98rem)", color:W60,
                    lineHeight:1.7, maxWidth:"30ch", margin:0, fontWeight:400 }}
                >
                  Manual QA graduate with <em style={{ fontFamily:"'Source Serif 4',serif",
                    fontStyle:"italic", color:W80 }}>UI/UX sensibility</em> and a precise eye
                  for broken software, catching what automated tools miss.
                </motion.p>

                {/* CTA */}
                <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.5, duration:0.5 }}
                  style={{ display:"flex", gap:"12px", flexWrap:"wrap", alignItems:"center" }}
                >
                  <a href="#about" onClick={scrollTo("about")}
                    className="lgs cta-btn"
                    style={{ display:"inline-flex", alignItems:"center", gap:"10px",
                      padding:"13px 24px", borderRadius:"99px", color:W, fontWeight:500,
                      fontSize:"0.9rem", textDecoration:"none", transition:"transform 0.2s",
                      fontFamily:"'Poppins',sans-serif" }}
                    onMouseEnter={e => (e.currentTarget.style.transform="scale(1.05)")}
                    onMouseLeave={e => (e.currentTarget.style.transform="scale(1)")}
                  >
                    View My Work
                    <div style={{ width:"28px", height:"28px", borderRadius:"50%",
                      background:W10, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <ArrowRight size={13} color={W} />
                    </div>
                  </a>
                  <a href="#contact" onClick={scrollTo("contact")}
                    className="lg-pill"
                    style={{ display:"inline-flex", alignItems:"center", gap:"6px",
                      padding:"13px 22px", borderRadius:"99px", color:W60,
                      fontSize:"0.9rem", textDecoration:"none", transition:"transform 0.2s, color 0.15s",
                      fontFamily:"'Poppins',sans-serif", border:"none" }}
                    onMouseEnter={e => { e.currentTarget.style.transform="scale(1.04)"; e.currentTarget.style.color=W; }}
                    onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.color=W60; }}
                  >
                    Get in Touch
                  </a>
                </motion.div>

                {/* Skill pills */}
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
                  transition={{ delay:0.62, duration:0.5 }}
                  style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}
                >
                  {["Manual Testing","Security QA","UI/UX Review"].map(p => (
                    <span key={p} className="lg-pill"
                      style={{ padding:"6px 14px", borderRadius:"99px", fontSize:"0.75rem",
                        color:W80, whiteSpace:"nowrap" }}
                    >{p}</span>
                  ))}
                </motion.div>
              </div>
              </motion.div>

              {/* Bottom quote — floats over raw video below the glass card */}
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
                transition={{ delay:0.8, duration:0.6 }}
                style={{ paddingTop:"1.25rem", paddingBottom:"0.5rem" }}
              >
                <p style={{ fontSize:"0.95rem", color:W80, margin:"0 0 10px",
                  fontFamily:"'Poppins',sans-serif", fontWeight:400, lineHeight:1.55 }}>
                  "A <em style={{ fontFamily:"'Source Serif 4',serif", fontStyle:"italic" }}>precise eye</em>{" "}
                  finds what automated tools miss."
                </p>
                <div style={{ height:"1px", background:W25, width:"100%" }} />
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT PANEL 48% — desktop only ── */}
          {!isMobile && (
            <div style={{
              width:"48%", display:"flex", flexDirection:"column",
              padding:"88px 1.5rem 1.5rem 0.75rem",
              justifyContent:"space-between",
            }}>
              {/* About card */}
              <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.42, duration:0.55 }}
                className="lg" style={{ borderRadius:"1.5rem", padding:"1.5rem",
                  background:"rgba(0,0,0,0.45)" }}
              >
                <p style={{ fontSize:"0.85rem", fontWeight:500, color:W, marginBottom:"6px",
                  fontFamily:"'Poppins',sans-serif" }}>Johnatan Milrad</p>
                <p style={{ fontSize:"0.75rem", color:W80, lineHeight:1.6, margin:0 }}>
                  Manual QA Engineer with UI/UX design expertise. Building precise test processes that catch what automated tools miss.
                </p>
              </motion.div>

              {/* Bottom feature section */}
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.56, duration:0.6 }}
                className="lg" style={{ borderRadius:"2.5rem", padding:"1.25rem",
                  background:"rgba(0,0,0,0.45)" }}
              >
                <a href="https://settings-qa-ai.replit.app" target="_blank" rel="noopener noreferrer"
                  className="lg" style={{ display:"block", borderRadius:"1.5rem", padding:"1.25rem 1.25rem",
                    textDecoration:"none", transition:"transform 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.transform="scale(1.02)")}
                  onMouseLeave={e => (e.currentTarget.style.transform="scale(1)")}
                >
                  <Shield size={22} color={W} style={{ marginBottom:"10px", opacity:0.85 }} />
                  <div style={{ fontSize:"0.9rem", fontWeight:500, color:W, fontFamily:"'Poppins',sans-serif" }}>BehemothQA</div>
                  <div style={{ fontSize:"0.74rem", color:W60, marginTop:"4px" }}>Security testing platform</div>
                </a>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
                transition={{ delay:1.1, duration:0.6 }}
                style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"6px",
                  paddingTop:"0.5rem", pointerEvents:"none" }}
              >
                <span style={{ fontSize:"0.58rem", fontWeight:600, color:W25,
                  letterSpacing:"0.2em", textTransform:"uppercase" }}>scroll</span>
                <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:1.6, ease:"easeInOut" }}
                  style={{ width:"1px", height:"28px", background:`linear-gradient(to bottom,${W50},transparent)` }}
                />
              </motion.div>
            </div>
          )}
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            ABOUT
        ══════════════════════════════════════════════════════════════════ */}
        <section id="about" className="reveal-section" style={{
          minHeight:"100svh", display:"flex", alignItems:"center",
          padding:"80px clamp(1.5rem,6vw,4.5rem)",
          background:"rgba(0,0,0,0.55)", backdropFilter:"blur(0px)",
        }}>
          <div style={{ width:"100%" }}>
            <div className="sec-label" style={{ marginBottom:"2.5rem" }}>
              <span className="sec-num">01</span>
              <span className="sec-slash">/</span>
              <span className="sec-title">ABOUT</span>
            </div>
            <div className="about-grid" style={{ display:"grid", gridTemplateColumns: isMobile ? "minmax(0,1fr)" : "minmax(0,1fr) minmax(0,1fr)", gap: isMobile ? "2rem" : "3rem", alignItems:"start" }}>
              <div>
                <h2 className="reveal-item sec-heading" style={{ marginBottom:"1.5rem" }}>
                  The <em>Precise Eye</em><br />for Broken Software.
                </h2>
                <p className="reveal-item" style={{ fontSize:"0.92rem", color:W60, lineHeight:1.8, marginBottom:"1rem" }}>
                  I'm a <strong style={{ color:W, fontWeight:500 }}>Manual QA graduate</strong> who came to software through design, building skills across{" "}
                  <strong style={{ color:W, fontWeight:500 }}>Figma, Photoshop, and Illustrator</strong> with a strong UI/UX sensibility. That design background sharpens my eye for what's visually broken.
                </p>
                <p className="reveal-item" style={{ fontSize:"0.92rem", color:W60, lineHeight:1.8, marginBottom:"2rem" }}>
                  On top of coursework I built <strong style={{ color:W, fontWeight:500 }}>BehemothQA</strong> independently, getting hands-on with{" "}
                  <strong style={{ color:W, fontWeight:500 }}>Jira, Postman, GitHub</strong>, and security testing.
                </p>
                <div className="reveal-item" style={{ display:"flex", gap:"2.5rem", flexWrap:"wrap", marginBottom:"2rem" }}>
                  {[{ n:"1500+", l:"tests / run" },{ n:"6", l:"attack modules" },{ n:"4", l:"severity tiers" }].map(s => (
                    <div key={s.n}>
                      <div style={{ fontSize:"clamp(1.8rem,3.5vw,2.4rem)", fontWeight:500, color:W,
                        letterSpacing:"-0.04em", lineHeight:1, fontFamily:"'Poppins',sans-serif" }}>{s.n}</div>
                      <div style={{ fontSize:"0.72rem", color:W50, marginTop:"4px" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="reveal-item">
                <div className="lgs" style={{ borderRadius:"1.5rem", padding:"1.75rem" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"1rem" }}>
                    <span className="live-dot" style={{ background:G, boxShadow:`0 0 6px ${G}` }} />
                    <span style={{ fontSize:"0.72rem", fontWeight:600, color:G, textTransform:"uppercase", letterSpacing:"0.14em" }}>Open to Work</span>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"9px", marginBottom:"1.25rem" }}>
                    {[
                      { icon:MapPin, text:"Ashdod, Israel",              href:undefined },
                      { icon:Mail,   text:"milrad.johnathan19@gmail.com", href:"mailto:milrad.johnathan19@gmail.com" },
                      { icon:Phone,  text:"+972 523 516 364",             href:"tel:+972523516364" },
                    ].map(({ icon:Icon, text, href }) => (
                      <div key={text} style={{ display:"flex", alignItems:"center", gap:"9px", fontSize:"0.78rem", color:W60 }}>
                        <div className="icon-pill"><Icon style={{ width:"12px", color:W, position:"relative", zIndex:1 }} /></div>
                        {href ? <a href={href} style={{ color:W60, textDecoration:"none", transition:"color 0.15s" }}
                          onMouseEnter={e => (e.currentTarget.style.color=W)}
                          onMouseLeave={e => (e.currentTarget.style.color=W60)}
                        >{text}</a> : <span>{text}</span>}
                      </div>
                    ))}
                  </div>
                  <CertFlipCard />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            PROJECTS
        ══════════════════════════════════════════════════════════════════ */}
        <section id="projects" className="reveal-section" style={{
          minHeight:"130svh", padding:"80px clamp(1.5rem,6vw,4.5rem)",
          background:"rgba(0,0,0,0.60)",
        }}>
          <div style={{ width:"100%" }}>
            <div className="sec-label" style={{ marginBottom:"3rem" }}>
              <span className="sec-num">02</span><span className="sec-slash">/</span>
              <span className="sec-title">PROJECTS</span>
            </div>

            {/* P1 */}
            <div className="reveal-item proj-card" style={{ flexDirection: isMobile ? "column" : "row" }}>
              <div style={{ display:"flex", gap:"1.5rem", flex:1, minWidth:0 }}>
                <div className="proj-num">01</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px" }}>
                    <span className="live-dot" /><h3 className="proj-name">BehemothQA</h3>
                    <span className="badge">v2.4</span>
                  </div>
                  <p style={{ fontSize:"0.87rem", color:W60, lineHeight:1.7, marginBottom:"14px", maxWidth:"46ch" }}>
                    Full scale Python QA platform with over 1500 automated security tests per run. Built from scratch with NightMOTH attack modules, WAF bypass, and detailed report generation.
                  </p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"14px" }}>
                    {["Python","Security","DDoS","UI/UX QA","NightMOTH"].map(t => (
                      <span key={t} className="lg-pill tech-tag">{t}</span>
                    ))}
                  </div>
                  <a href="https://settings-qa-ai.replit.app" target="_blank" rel="noopener noreferrer"
                    className="lgs" style={{ display:"inline-flex", alignItems:"center", gap:"6px",
                      padding:"9px 20px", borderRadius:"99px", color:W, fontWeight:500,
                      fontSize:"0.82rem", textDecoration:"none", transition:"transform 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.transform="scale(1.04)")}
                    onMouseLeave={e => (e.currentTarget.style.transform="scale(1)")}
                  >Launch App <ExternalLink style={{ width:"11px", height:"11px" }} /></a>
                </div>
              </div>
              {!isMobile && <div className="proj-visual"><IdeBlock /></div>}
            </div>

            {/* P2 — NightMOTH */}
            <div className="reveal-item proj-card" style={{ flexDirection: isMobile ? "column" : "row" }}>
              <div className="proj-num">02</div>
              <div style={{ flex:1, minWidth:0 }}>
                  <h3 className="proj-name" style={{ marginBottom:"8px" }}>BehemothQA NightMOTH Extension</h3>
                  <p style={{ fontSize:"0.87rem", color:W60, lineHeight:1.7, marginBottom:"14px", maxWidth:"52ch" }}>
                    A modular browser extension that turns BehemothQA into a full stress and adversarial testing platform. Six specialised attack modules run concurrently at up to 2000 requests per second, giving you firewall, auth, session and logic coverage without leaving the browser.
                  </p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"14px" }}>
                    {["Python","Load Testing","Security","Concurrency","Automation"].map(t => (
                      <span key={t} className="lg-pill tech-tag">{t}</span>
                    ))}
                  </div>
                  {/* Module mini cards — lives inside text column, naturally aligned with title */}
                  <div style={{ display:"grid", marginTop:"1.25rem",
                    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap:"10px" }}>
                {[
                  { icon:(
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 2L3 4.5v5C3 13 6 16 9 17c3-1 6-4 6-7.5v-5L9 2z"/>
                      <path d="M9 6v3M9 11h.01" strokeWidth="2"/>
                    </svg>), name:"WAFGutPunch", desc:"Fires oversized payloads to probe and bypass WAF filtering rules" },
                  { icon:(
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="8" width="10" height="8" rx="1.5"/>
                      <path d="M6 8V6a3 3 0 016 0v2"/>
                      <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none"/>
                      <path d="M9 13v1.5" strokeWidth="1.5"/>
                    </svg>), name:"AuthAbyss", desc:"Rotates 60 JWT tokens simultaneously to saturate auth rate limits" },
                  { icon:(
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 11c2-4 4-6 8-6s6 2 8 6"/>
                      <path d="M1 7c2-3 4-4 8-4s6 1 8 4"/>
                      <path d="M1 15c2-2 4-3 8-3s6 1 8 3"/>
                    </svg>), name:"FloodSurge", desc:"HTTP flood engine that scales to 2000 concurrent requests per second" },
                  { icon:(
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 4h2a2 2 0 010 4H6a2 2 0 010-4z"/>
                      <path d="M10 10h2a2 2 0 010 4h-2a2 2 0 010-4z"/>
                      <path d="M8 6h2M8 12h2" strokeDasharray="2 2"/>
                    </svg>), name:"SessionBreaker", desc:"Cookie poisoning and session token exhaustion across active endpoints" },
                  { icon:(
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="8" cy="8" r="5"/>
                      <path d="M12 12l4 4"/>
                      <circle cx="8" cy="8" r="2" strokeWidth="1"/>
                    </svg>), name:"ReconMOTH", desc:"Passive endpoint discovery paired with response header fingerprinting" },
                  { icon:(
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 1v3M9 14v3M1 9h3M14 9h3M3.2 3.2l2.1 2.1M12.7 12.7l2.1 2.1M3.2 14.8l2.1-2.1M12.7 5.3l2.1-2.1"/>
                      <circle cx="9" cy="9" r="3"/>
                    </svg>), name:"CrashLogic", desc:"Business logic fuzzing to surface unexpected application state failures" },
                ].map(m => (
                  <div key={m.name} className="lg" style={{ borderRadius:"1rem", padding:"14px 16px" }}>
                    <div style={{ color:W60, marginBottom:"8px", lineHeight:1 }}>{m.icon}</div>
                    <div style={{ fontSize:"0.78rem", fontWeight:600, color:W,
                      fontFamily:"'Poppins',sans-serif", marginBottom:"4px" }}>{m.name}</div>
                    <div style={{ fontSize:"0.7rem", color:W50, lineHeight:1.5 }}>{m.desc}</div>
                  </div>
                ))}
                  </div>
              </div>
            </div>

            {/* P3 */}
            <div className="reveal-item proj-card" style={{ flexDirection: isMobile ? "column" : "row" }}>
              <div style={{ display:"flex", gap:"1.5rem", flex:1, minWidth:0 }}>
                <div className="proj-num">03</div>
                <div style={{ flex:1 }}>
                  <h3 className="proj-name" style={{ marginBottom:"8px" }}>Professional QA Test Reports</h3>
                  <p style={{ fontSize:"0.87rem", color:W60, lineHeight:1.7, marginBottom:"14px", maxWidth:"46ch" }}>
                    Comprehensive test documentation including test plans, bug reports, test suites, and exploratory charters following industry standard QA methodologies.
                  </p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"14px" }}>
                    {["Test Cases","Bug Reports","Jira","Exploratory","Regression"].map(t => (
                      <span key={t} className="lg-pill tech-tag">{t}</span>
                    ))}
                  </div>
                  <span className="lg-pill" style={{ display:"inline-flex", alignItems:"center", gap:"6px",
                    padding:"9px 20px", borderRadius:"99px", color:W50, fontWeight:500,
                    fontSize:"0.82rem", fontStyle:"italic", fontFamily:"'Source Serif 4',serif" }}
                  >Sample reports coming soon</span>
                </div>
              </div>
              <div className="proj-visual" style={{ flexShrink:0, width: isMobile ? "100%" : "200px" }}>
                {[{ label:"Test Coverage", val:92 },{ label:"Bug Detection", val:87 },{ label:"Report Quality", val:95 }].map(b => (
                  <div key={b.label} style={{ marginBottom:"14px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"5px" }}>
                      <span style={{ fontSize:"0.72rem", color:W50 }}>{b.label}</span>
                      <span style={{ fontSize:"0.72rem", color:W80, fontWeight:600 }}>{b.val}%</span>
                    </div>
                    <div style={{ height:"3px", background:"rgba(255,255,255,0.1)", borderRadius:"2px", overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${b.val}%`,
                        background:"linear-gradient(to right,rgba(255,255,255,0.7),rgba(255,255,255,0.3))",
                        borderRadius:"2px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SKILLS
        ══════════════════════════════════════════════════════════════════ */}
        <section id="skills" className="reveal-section" style={{
          minHeight:"100svh", display:"flex", alignItems:"center",
          padding:"80px clamp(1.5rem,6vw,4.5rem)",
          background:"rgba(0,0,0,0.55)",
        }}>
          <div style={{ width:"100%" }}>
            <div className="sec-label" style={{ marginBottom:"3rem" }}>
              <span className="sec-num">03</span><span className="sec-slash">/</span>
              <span className="sec-title">SKILLS</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "minmax(0,1fr)" : "minmax(0,2fr) minmax(0,3fr)", gap: isMobile ? "2rem" : "3rem" }} className="skills-grid">
              <div>
                <h2 className="reveal-item sec-heading" style={{ marginBottom:"2rem", fontSize:"clamp(1.8rem,3.5vw,2.8rem)" }}>
                  <em>Precision</em><br />Toolset.
                </h2>
                {[
                  { cat:"QA",     items:["Manual Testing","Test Case Design","Bug Reporting","Regression","Exploratory Testing","Mobile Testing"] },
                  { cat:"Tools",  items:["Jira","Postman","GitHub","Python","SQL","API Testing"] },
                  { cat:"Design", items:["Figma","Photoshop","Illustrator","UI/UX Review","Accessibility"] },
                ].map((g,i) => (
                  <div key={g.cat} className="reveal-item" style={{ marginBottom:"1.5rem" }}>
                    <div style={{ fontSize:"0.62rem", fontWeight:700, color:W50, marginBottom:"10px",
                      textTransform:"uppercase", letterSpacing:"0.14em" }}>
                      <span style={{ opacity:0.5, marginRight:"6px", fontFamily:"monospace" }}>0{i+1}</span>{g.cat}
                    </div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                      {g.items.map(s => (
                        <span key={s} className="lg-pill"
                          style={{ padding:"5px 13px", borderRadius:"99px", fontSize:"0.75rem",
                            color:W60, transition:"color 0.2s" }}
                          onMouseEnter={e => (e.currentTarget.style.color=W)}
                          onMouseLeave={e => (e.currentTarget.style.color=W60)}
                        >{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="reveal-item">
                <div className="lgs" style={{ borderRadius:"1.5rem", padding:"2rem 2.25rem" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"1.5rem" }}>
                    <Zap style={{ width:"14px", color:W60 }} />
                    <span style={{ fontSize:"0.68rem", fontWeight:700, color:W50, textTransform:"uppercase", letterSpacing:"0.12em" }}>Full Skill Set</span>
                  </div>
                  <Marquee />
                  <div style={{ marginTop:"2rem", paddingTop:"1.5rem", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
                    <p style={{ fontSize:"0.9rem", color:W60, lineHeight:1.8 }}>
                      Combining the precision of a QA engineer with the eye of a designer to catch bugs that matter and interfaces that don't serve their users.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            CONTACT
        ══════════════════════════════════════════════════════════════════ */}
        <section id="contact" className="reveal-section" style={{
          minHeight:"100svh", display:"flex", alignItems:"center",
          padding:"80px clamp(1.5rem,6vw,4.5rem) 120px",
          background:"rgba(0,0,0,0.60)",
        }}>
          <div style={{ width:"100%" }}>
            <div className="sec-label" style={{ marginBottom:"3rem" }}>
              <span className="sec-num">04</span><span className="sec-slash">/</span>
              <span className="sec-title">CONTACT</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "minmax(0,1fr)" : "minmax(0,2fr) minmax(0,3fr)", gap: isMobile ? "2rem" : "3rem" }} className="contact-grid">
              <div>
                <h2 className="reveal-item sec-heading" style={{ marginBottom:"1.5rem" }}>
                  Let's <span>work</span><br /><em>together.</em>
                </h2>
                <p className="reveal-item" style={{ fontSize:"0.9rem", color:W60, lineHeight:1.75, marginBottom:"2rem", maxWidth:"36ch" }}>
                  Submit a message. I respond to every serious inquiry.
                </p>
                <div className="reveal-item" style={{ display:"flex", flexDirection:"column", gap:"14px", marginBottom:"2rem" }}>
                  {[
                    { icon:Mail,   text:"milrad.johnathan19@gmail.com", href:"mailto:milrad.johnathan19@gmail.com" },
                    { icon:Phone,  text:"+972 523 516 364",             href:"tel:+972523516364" },
                    { icon:MapPin, text:"Ashdod, Israel",               href:undefined },
                  ].map(({ icon:Icon, text, href }) => (
                    <div key={text} style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                      <div className="icon-pill icon-pill-lg">
                        <Icon style={{ width:"14px", color:W, position:"relative", zIndex:1 }} />
                      </div>
                      {href
                        ? <a href={href} style={{ fontSize:"0.87rem", color:W60, textDecoration:"none", transition:"color 0.2s" }}
                            onMouseEnter={e => (e.currentTarget.style.color=W)}
                            onMouseLeave={e => (e.currentTarget.style.color=W60)}
                          >{text}</a>
                        : <span style={{ fontSize:"0.87rem", color:W60 }}>{text}</span>}
                    </div>
                  ))}
                </div>
                <div className="reveal-item" style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
                  <a href="https://www.linkedin.com/in/johnathan-milrad-502b18b2" target="_blank" rel="noopener noreferrer"
                    className="lg-pill" style={{ display:"inline-flex", alignItems:"center", gap:"5px",
                      padding:"10px 20px", borderRadius:"99px", color:W60, fontSize:"0.85rem",
                      textDecoration:"none", transition:"color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color=W)}
                    onMouseLeave={e => (e.currentTarget.style.color=W60)}
                  >LinkedIn <ExternalLink style={{ width:"11px" }} /></a>
                  <a href="https://settings-qa-ai.replit.app" target="_blank" rel="noopener noreferrer"
                    className="lgs" style={{ display:"inline-flex", alignItems:"center", gap:"5px",
                      padding:"10px 20px", borderRadius:"99px", color:W, fontSize:"0.85rem",
                      textDecoration:"none", transition:"transform 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.transform="scale(1.04)")}
                    onMouseLeave={e => (e.currentTarget.style.transform="scale(1)")}
                  >BehemothQA <ExternalLink style={{ width:"11px" }} /></a>
                </div>
              </div>
              <div className="reveal-item">
                <div className="lgs" style={{ borderRadius:"1.5rem", padding:"2rem 2.5rem" }}>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer — flat, no glass frame */}
        <footer style={{
          padding:"1.5rem clamp(1.5rem,6vw,4.5rem)",
          display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"8px",
          background:"transparent",
        }}>
          <span style={{ fontSize:"0.75rem", color:W50 }}>Johnatan Milrad · QA Engineer</span>
          <span style={{ fontSize:"0.7rem", color:W25, letterSpacing:"0.04em" }}>Built with precision.</span>
        </footer>
      </div>

      {/* ─── Styles ─────────────────────────────────────────────────────── */}
      <style>{`
        /* ── Liquid Glass light (exact Bloom spec) ── */
        .lg {
          background: rgba(255,255,255,0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.10);
          position: relative; overflow: hidden;
        }
        .lg::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
            transparent 40%, transparent 60%,
            rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          pointer-events: none; z-index: 0;
        }
        .lg > * { position: relative; z-index: 1; }

        /* ── Liquid Glass Strong (exact Bloom spec) ── */
        .lgs {
          background: rgba(255,255,255,0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(50px);
          box-shadow: 4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15);
          position: relative; overflow: hidden;
        }
        .lgs::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.20) 20%,
            transparent 40%, transparent 60%,
            rgba(255,255,255,0.20) 80%, rgba(255,255,255,0.50) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          pointer-events: none; z-index: 0;
        }
        .lgs > * { position: relative; z-index: 1; }

        /* Nav hairline */
        nav.lgs { border-radius: 0; overflow: visible; }
        nav.lgs::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.06) 70%, transparent);
          pointer-events: none;
        }

        /* Bloom panel overlay — pointer-events:none so clicks pass through */
        .bloom-panel { pointer-events: none; }

        /* ── Pills ── */
        .lg-pill {
          background: rgba(255,255,255,0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.10);
          position: relative; overflow: hidden;
          display: inline-block;
        }
        .lg-pill::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1.4px;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
            transparent 40%, transparent 60%,
            rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
        }

        .cta-btn { cursor: pointer; }

        /* Icon pills */
        .icon-pill {
          width:28px; height:28px; border-radius:8px;
          display:flex; align-items:center; justify-content:center;
          background:rgba(255,255,255,0.07);
          box-shadow:inset 0 1px 1px rgba(255,255,255,0.10);
          flex-shrink:0; position:relative; overflow:hidden;
        }
        .icon-pill::before {
          content:''; position:absolute; inset:0; border-radius:inherit; padding:1px;
          background:linear-gradient(135deg,rgba(255,255,255,0.35) 0%,transparent 60%);
          -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
          -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none;
        }
        .icon-pill-lg { width:38px; height:38px; border-radius:12px; }

        /* Badge */
        .badge {
          display:inline-flex; align-items:center;
          padding:3px 10px; border-radius:99px;
          font-size:0.66rem; font-weight:600; letter-spacing:0.05em;
          background:rgba(255,255,255,0.08); color:rgba(255,255,255,0.75);
          position:relative; overflow:hidden;
        }
        .badge::before {
          content:''; position:absolute; inset:0; border-radius:inherit; padding:1px;
          background:linear-gradient(180deg,rgba(255,255,255,0.35) 0%,transparent 50%);
          -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
          -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none;
        }

        /* Tech tags */
        .tech-tag {
          padding:4px 12px !important; border-radius:99px !important;
          font-size:0.69rem !important; font-weight:500 !important;
          color:${W60} !important;
        }

        /* Section labels */
        .sec-label { display:flex; align-items:baseline; gap:0.6rem; }
        .sec-num   { font-size:0.78rem; font-weight:700; color:${W50}; font-family:'JetBrains Mono',monospace; letter-spacing:0.1em; }
        .sec-slash { color:${W25}; font-size:0.78rem; }
        .sec-title { font-size:0.78rem; font-weight:700; color:${W25}; letter-spacing:0.2em; text-transform:uppercase; }

        /* Headings */
        .sec-heading {
          font-size:clamp(2rem,4.5vw,3.2rem); font-weight:500;
          letter-spacing:-0.035em; line-height:1.05; color:${W}; margin:0;
          font-family:'Poppins',sans-serif;
        }
        .sec-heading em {
          font-family:'Source Serif 4',serif; font-style:italic; font-weight:300; color:${W80};
        }

        /* Grids */
        .two-col    { display:grid; grid-template-columns:1fr 1fr; gap:3rem; align-items:start; }
        .two-col > * { min-width:0; }
        .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:3rem; align-items:start; }
        .about-grid > * { min-width:0; }

        /* Project cards */
        .proj-card {
          background:rgba(255,255,255,0.01);
          backdrop-filter:blur(4px);
          box-shadow:inset 0 1px 1px rgba(255,255,255,0.10), 0 4px 24px rgba(0,0,0,0.20);
          border-radius:1.5rem; padding:1.75rem 2rem;
          display:flex; gap:2rem; align-items:flex-start;
          position:relative; overflow:hidden; margin-bottom:0.875rem;
          transition:box-shadow 0.25s;
        }
        .proj-card::before {
          content:''; position:absolute; inset:0; border-radius:inherit; padding:1.4px;
          background:linear-gradient(180deg,rgba(255,255,255,0.38) 0%,rgba(255,255,255,0.10) 20%,transparent 40%,transparent 60%,rgba(255,255,255,0.10) 80%,rgba(255,255,255,0.38) 100%);
          -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
          -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none; z-index:0;
        }
        .proj-card > * { position:relative; z-index:1; }
        .proj-card:hover { box-shadow:inset 0 1px 1px rgba(255,255,255,0.15),0 4px 32px rgba(255,255,255,0.06),0 0 0 1px rgba(255,255,255,0.12); }
        .proj-num  { font-size:clamp(2.5rem,5vw,4rem); font-weight:700; color:rgba(255,255,255,0.05); font-family:'JetBrains Mono',monospace; letter-spacing:-0.04em; line-height:1; flex-shrink:0; user-select:none; }
        .proj-name { font-size:1.1rem; font-weight:500; color:${W}; letter-spacing:-0.02em; margin:0; font-family:'Poppins',sans-serif; }
        .proj-visual { flex-shrink:0; width:clamp(200px,32%,360px); }

        /* IDE */
        .ide-window { background:#080812; border-radius:10px; border:1px solid rgba(255,255,255,0.04); overflow:hidden; font-family:'JetBrains Mono',monospace; font-size:0.72rem; line-height:1.78; }
        .ide-bar { background:#0e0e1c; padding:9px 14px; display:flex; align-items:center; gap:6px; border-bottom:1px solid rgba(255,255,255,0.04); }
        .ide-dot { width:11px; height:11px; border-radius:50%; flex-shrink:0; }
        .ide-body { padding:14px 18px; overflow-x:auto; scrollbar-width:none; }
        .ide-body::-webkit-scrollbar { display:none; }
        .ide-body pre { margin:0; min-width:max-content; }
        .ide-cursor { display:inline-block; width:2px; height:1em; background:rgba(255,255,255,0.7); vertical-align:middle; animation:cursor-blink 1.1s step-end infinite; margin-left:1px; }

        /* Syntax */
        .tok-cm{color:rgba(255,255,255,0.28);font-style:italic}.tok-kw{color:#c084fc}.tok-im{color:#67e8f9}.tok-cls{color:#a5f3fc}.tok-fn{color:#fde68a}.tok-str{color:#86efac}.tok-num{color:#fdba74}.tok-op{color:rgba(255,255,255,0.4)}.tok-var{color:rgba(255,255,255,0.78)}.tok-pm{color:#f9a8d4}

        /* Form */
        .noir-input {
          background:rgba(255,255,255,0.05); border:none; border-radius:10px;
          color:${W}; padding:10px 14px; width:100%; outline:none;
          font-family:'Poppins',sans-serif; font-size:0.875rem;
          box-shadow:inset 0 1px 1px rgba(255,255,255,0.08); transition:box-shadow 0.2s;
        }
        .noir-input:focus { box-shadow:inset 0 1px 1px rgba(255,255,255,0.15),0 0 0 1px rgba(255,255,255,0.20); }
        .noir-input::placeholder { color:${W25}; }
        select.noir-input option { background:#0d0d1a; color:${W}; }

        /* Noise */
        .noise {
          position:fixed; inset:0; pointer-events:none; z-index:9999;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E");
          opacity:0.035;
        }

        /* Live dot */
        .live-dot { width:6px; height:6px; border-radius:50%; background:#22c55e; box-shadow:0 0 6px #22c55e; animation:blink 1.5s ease-in-out infinite; flex-shrink:0; display:inline-block; }

        /* Keyframes */
        @keyframes blink        { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.8)} }
        @keyframes cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes orbit-ring   { from{transform:rotateX(70deg) rotateZ(0deg)} to{transform:rotateX(70deg) rotateZ(360deg)} }
        @keyframes float-badge  { 0%,100%{transform:translateY(0) translateZ(0)} 50%{transform:translateY(-5px) translateZ(6px)} }
        @keyframes mq-fwd       { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes mq-rev       { from{transform:translateX(-50%)} to{transform:translateX(0)} }

        /* Mobile */
        @media (max-width: 1023px) {
          #hero { flex-direction:column !important; }
          .two-col { grid-template-columns:1fr !important; gap:2rem !important; }
          nav { padding:0 1rem !important; }
        }
        a { -webkit-tap-highlight-color:transparent; }
      `}</style>
    </>
  );
}
