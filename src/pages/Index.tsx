import { useEffect, useRef } from "react";
import * as THREE from "three";
import { CSS3DRenderer, CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";
import gsap from "gsap";
import "../z-portfolio.css";

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

/* ─── Plate Z positions ──────────────────────────────────────────────── */
const PLATE_Z   = [0, -5000, -10000, -15000, -20000];
const CAM_START = 2500;
const CAM_END   = -22000;

/* ─── Plate HTML builders ────────────────────────────────────────────── */
function buildPlate0(): string {  // Hero
  return `
<div class="zp-plate-num">PLT-00 // HERO</div>
<div class="zp-inner">
  <div class="zp-badge"><span class="dot"></span> QA Engineer</div>
  <h1>Johnatan<br><span class="zp-acc">Milrad</span></h1>
  <p>Manual QA graduate. Self-taught designer with a precise eye<br>
  for broken software — catching what automated tools miss.</p>
  <div class="zp-stats">
    <div><div class="zp-stat-val acc">300+</div><div class="zp-stat-label">Checks / Run</div></div>
    <div><div class="zp-stat-val grn">6</div><div class="zp-stat-label">Attack Modules</div></div>
    <div><div class="zp-stat-val" style="color:#f8fafc">4</div><div class="zp-stat-label">Severity Tiers</div></div>
  </div>
  <div class="zp-btn-row" style="margin-top:32px">
    <a href="#plate-3" class="zp-btn zp-btn-primary" id="view-projects-btn">View Projects</a>
    <a href="#plate-4" class="zp-btn zp-btn-ghost" id="contact-btn">Get in Touch</a>
  </div>
</div>`;
}

function buildPlate1(): string {  // About
  return `
<div class="zp-plate-num">PLT-01 // ABOUT</div>
<div class="zp-inner">
  <h3>Background</h3>
  <div class="zp-two-col">
    <div>
      <p>I'm a <strong class="zp-bold">Manual QA graduate</strong> who came to software through design
      — building skills across <strong class="zp-bold">Figma, Photoshop, and Illustrator</strong> entirely self-taught.
      That design background sharpens my eye for what's visually broken, flows that feel wrong,
      and UX patterns that don't serve the user.</p>
      <p>On top of coursework I built <strong class="zp-bold">BehemothQA</strong> independently
      — getting hands-on with <strong class="zp-bold">Jira, Postman, GitHub</strong>,
      and security testing in the process.</p>
      <div class="zp-stats">
        <div>
          <div class="zp-stat-val acc">300+</div>
          <div class="zp-stat-label">Checks / Run</div>
        </div>
        <div>
          <div class="zp-stat-val grn">6</div>
          <div class="zp-stat-label">Attack Modules</div>
        </div>
        <div>
          <div class="zp-stat-val" style="color:#f8fafc">4</div>
          <div class="zp-stat-label">Severity Tiers</div>
        </div>
      </div>
    </div>
    <div>
      <div class="zp-contact-row">
        <span class="ci">📍</span>
        <span>Ashdod, Israel</span>
      </div>
      <div class="zp-contact-row">
        <span class="ci">✉️</span>
        <a href="mailto:milrad.johnathan19@gmail.com">milrad.johnathan19@gmail.com</a>
      </div>
      <div class="zp-contact-row">
        <span class="ci">📞</span>
        <a href="tel:+972523516364">+972 523 516 364</a>
      </div>
      <div class="zp-contact-row">
        <span class="ci">🔗</span>
        <a href="https://www.linkedin.com/in/johnathan-milrad-502b18b2" target="_blank">LinkedIn</a>
      </div>
      <div style="margin-top:24px;padding:18px;background:rgba(129,140,248,0.06);border:1px solid rgba(129,140,248,0.14);border-radius:10px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <span style="width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px #22c55e;display:inline-block;animation:zp-pulse 2s infinite"></span>
          <span style="font-size:0.7rem;font-weight:800;color:#22c55e;text-transform:uppercase;letter-spacing:0.12em">Available</span>
        </div>
        <div style="font-weight:800;font-size:1rem;color:#f8fafc;margin-bottom:6px">Open to Work</div>
        <div style="font-size:0.8rem;color:rgba(248,250,252,0.45);line-height:1.6">Looking for a QA role where precision meets real impact.</div>
      </div>
    </div>
  </div>
</div>`;
}

function buildPlate2(): string {  // Skills
  const qa   = ["Manual Testing","Test Case Design","Bug Reporting","Regression Testing","Exploratory Testing","UI/UX Testing","Security Testing","Load Testing","DDoS Simulation"];
  const tool = ["Jira","Postman","GitHub","SQL Workbench","NightMOTH","Chrome DevTools","Figma","Photoshop","Illustrator"];
  const dev  = ["Python","HTML/CSS","REST APIs","JSON","Git","Agile/Scrum","Test Documentation","BDD Concepts"];

  const tags = (arr: string[], cat: string) =>
    arr.map(s => `<span class="zp-skill-tag cat-${cat}">${s}</span>`).join("");

  return `
<div class="zp-plate-num">PLT-02 // SKILLS</div>
<div class="zp-inner">
  <h3>Skills</h3>
  <div style="margin-bottom:20px">
    <div style="font-size:0.7rem;font-weight:700;color:rgba(129,140,248,0.6);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:10px">QA Engineering</div>
    <div class="zp-skills-wrap">${tags(qa, "qa")}</div>
  </div>
  <div style="margin-bottom:20px">
    <div style="font-size:0.7rem;font-weight:700;color:rgba(34,197,94,0.6);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:10px">Tools</div>
    <div class="zp-skills-wrap">${tags(tool, "tool")}</div>
  </div>
  <div>
    <div style="font-size:0.7rem;font-weight:700;color:rgba(251,191,36,0.6);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:10px">Dev / Process</div>
    <div class="zp-skills-wrap">${tags(dev, "dev")}</div>
  </div>
</div>`;
}

function buildPlate3(): string {  // Projects
  return `
<div class="zp-plate-num">PLT-03 // PROJECTS</div>
<div class="zp-inner">
  <h3>Projects</h3>
  <div style="display:flex;align-items:baseline;gap:16px;margin-bottom:6px">
    <h2 style="margin:0">BehemothQA</h2>
    <span style="font-size:0.72rem;font-weight:700;color:#22c55e;letter-spacing:0.06em">LIVE</span>
  </div>
  <p>A self-built security and load QA platform. 6 NightMOTH attack modules, 300+ automated checks per run, 4 severity tiers, PDF export.</p>
  <div class="zp-ide">
    <div class="zp-ide-bar">
      <div class="zp-ide-dot" style="background:#ff5f57"></div>
      <div class="zp-ide-dot" style="background:#febc2e"></div>
      <div class="zp-ide-dot" style="background:#28c840"></div>
      <span class="zp-ide-filename">behemoth_qa.py</span>
    </div>
    <div class="zp-ide-body"><pre><span class="cm"># BehemothQA v2.4  ·  Security QA Platform</span>
<span class="kw">from</span> <span class="im">nightmoth</span> <span class="kw">import</span> <span class="cls">NightMOTH</span>, <span class="cls">AttackConfig</span>
<span class="kw">from</span> <span class="im">modules</span> <span class="kw">import</span> <span class="cls">WAFGutPunch</span>, <span class="cls">AuthAbyss</span>

<span class="var">config</span> <span class="op">=</span> <span class="cls">AttackConfig</span>(
  <span class="pm">target</span><span class="op">=</span><span class="str">"https://target.com"</span>,
  <span class="pm">mode</span><span class="op">=</span><span class="str">"full_scan"</span>,
  <span class="pm">concurrency</span><span class="op">=</span><span class="num">2000</span>,
)

<span class="var">scanner</span> <span class="op">=</span> <span class="cls">NightMOTH</span>(<span class="var">config</span>)
<span class="var">results</span> <span class="op">=</span> <span class="var">scanner</span>.<span class="fn">run</span>(
  <span class="cls">WAFGutPunch</span>(<span class="pm">payload_size</span><span class="op">=</span><span class="str">"130KB"</span>),
  <span class="cls">AuthAbyss</span>(<span class="pm">jwt_tokens</span><span class="op">=</span><span class="num">60</span>),
)
<span class="cm"># Scan done: 300+ checks</span></pre></div>
  </div>
  <div class="zp-btn-row" style="margin-top:20px">
    <a href="https://settings-qa-ai.replit.app" target="_blank" class="zp-btn zp-btn-primary">Open BehemothQA</a>
    <a href="${BASE}/behemothqa-sample-report.pdf" target="_blank" class="zp-btn zp-btn-ghost">Sample Report</a>
  </div>
</div>`;
}

function buildPlate4(): string {  // Contact
  return `
<div class="zp-plate-num">PLT-04 // CONTACT</div>
<div class="zp-inner" id="contact-inner">
  <h3>Contact</h3>
  <h2>Start a Conversation</h2>
  <form class="zp-form" id="zp-contact-form">
    <div class="zp-form-row">
      <div>
        <label class="zp-form-label">Name</label>
        <input name="name" type="text" class="zp-input" placeholder="Your name">
      </div>
      <div>
        <label class="zp-form-label">Email *</label>
        <input name="email" type="email" class="zp-input" placeholder="your@email.com" required>
      </div>
    </div>
    <div>
      <label class="zp-form-label">Subject *</label>
      <input name="summary" type="text" class="zp-input" placeholder="What's on your mind?" required>
    </div>
    <div>
      <label class="zp-form-label">Message</label>
      <textarea name="message" class="zp-textarea" placeholder="Tell me more..."></textarea>
    </div>
    <div style="display:flex;justify-content:flex-end">
      <button type="submit" class="zp-btn zp-btn-primary">Send Message</button>
    </div>
  </form>
  <div id="zp-form-success" style="display:none;text-align:center;padding:2rem 0">
    <div style="font-size:2.2rem;margin-bottom:12px">✅</div>
    <div style="font-weight:800;color:#f8fafc;margin-bottom:6px">Message delivered.</div>
    <div style="font-size:0.85rem;color:rgba(248,250,252,0.45)">I'll get back to you soon.</div>
  </div>
</div>`;
}

/* ─── Component ──────────────────────────────────────────────────────── */
export default function Index() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current!;
    let W = window.innerWidth, H = window.innerHeight;

    /* ── Scene & Camera ─────────────────────────────────────────────── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 1, 65000);
    camera.position.z = CAM_START;

    /* ── 2D Canvas particle field (no WebGL needed) ─────────────────── */
    const bgCanvas = document.createElement("canvas");
    bgCanvas.style.cssText = "position:absolute;top:0;left:0;z-index:0;pointer-events:none;";
    bgCanvas.width = W; bgCanvas.height = H;
    root.appendChild(bgCanvas);
    const ctx2d = bgCanvas.getContext("2d")!;

    // Generate static star data: [x 0-1, y 0-1, size, r, g, b, opacity]
    type Star = { x: number; y: number; s: number; r: number; g: number; b: number; a: number };
    const stars: Star[] = [];
    const starColors = [
      { r: 129, g: 140, b: 248 }, // indigo
      { r:  34, g: 197, b:  94 }, // green
      { r: 248, g: 250, b: 252 }, // white
    ];
    for (let i = 0; i < 280; i++) {
      const c = starColors[Math.floor(Math.random() * starColors.length)];
      stars.push({
        x: Math.random(), y: Math.random(),
        s: 0.5 + Math.random() * 1.4,
        r: c.r, g: c.g, b: c.b,
        a: 0.06 + Math.random() * 0.22,
      });
    }

    const drawStars = (camZ: number) => {
      const travel = (CAM_START - camZ) / (CAM_START - CAM_END); // 0→1
      ctx2d.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      stars.forEach(st => {
        // parallax: stars drift slightly as camera moves
        const px = (st.x * bgCanvas.width  + travel * st.s * 120) % bgCanvas.width;
        const py = (st.y * bgCanvas.height + travel * st.s *  60) % bgCanvas.height;
        ctx2d.beginPath();
        ctx2d.arc(px, py, st.s, 0, Math.PI * 2);
        ctx2d.fillStyle = `rgba(${st.r},${st.g},${st.b},${st.a})`;
        ctx2d.fill();
      });
    };
    drawStars(CAM_START);

    /* ── CSS3D renderer ──────────────────────────────────────────────── */
    const css3d = new CSS3DRenderer();
    css3d.setSize(W, H);
    css3d.domElement.style.cssText = "position:absolute;top:0;left:0;pointer-events:none;z-index:10;";
    root.appendChild(css3d.domElement);

    /* ── Build plates ────────────────────────────────────────────────── */
    const BUILDERS = [buildPlate0, buildPlate1, buildPlate2, buildPlate3, buildPlate4];
    const PLATE_NAMES = ["HERO","ABOUT","SKILLS","PROJECTS","CONTACT"];

    interface Plate { el: HTMLDivElement; obj: CSS3DObject; z: number; }
    const plates: Plate[] = [];

    PLATE_Z.forEach((z, i) => {
      const el = document.createElement("div");
      el.className = "zp-plate";
      el.innerHTML = BUILDERS[i]();
      // Start in wireframe
      el.classList.add("zp-wireframe");

      const obj = new CSS3DObject(el);
      obj.position.z = z;
      scene.add(obj);
      plates.push({ el, obj, z });
    });

    /* ── Contact form wiring ─────────────────────────────────────────── */
    const wireForm = () => {
      const form = root.querySelector<HTMLFormElement>("#zp-contact-form");
      const success = root.querySelector<HTMLElement>("#zp-form-success");
      if (!form || !success) return;
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        fd.append("_subject", "[QAblog] Contact");
        fd.append("_captcha", "false");
        fetch("https://formsubmit.co/ajax/milrad.johnathan19@gmail.com", {
          method: "POST", body: fd, headers: { Accept: "application/json" },
        }).then(() => {
          form.style.display = "none";
          success.style.display = "block";
        }).catch(() => {
          form.style.display = "none";
          success.style.display = "block";
        });
      });
    };

    /* Plates contain the form in the DOM once added — observe mutations */
    const formObserver = new MutationObserver(() => {
      if (root.querySelector("#zp-contact-form")) {
        wireForm();
        formObserver.disconnect();
      }
    });
    formObserver.observe(root, { childList: true, subtree: true });

    /* ── Scroll state ────────────────────────────────────────────────── */
    const proxy = { z: CAM_START };
    let targetZ     = CAM_START;
    let scrollSpeed = 0;
    let speedTimer  = 0;

    const travel = (delta: number) => {
      targetZ = Math.max(CAM_END, Math.min(CAM_START, targetZ - delta));
      gsap.to(proxy, {
        z: targetZ, duration: 1.5, ease: "power3.out", overwrite: true,
        onUpdate: () => { camera.position.z = proxy.z; },
      });
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dy = e.deltaY;
      scrollSpeed = Math.abs(dy);
      clearTimeout(speedTimer);
      speedTimer = window.setTimeout(() => { scrollSpeed = 0; }, 300);
      travel(dy * 8);
      if (Math.abs(dy) > 70) triggerGlitch();
    };

    let lastTouchY = 0;
    const onTouchStart = (e: TouchEvent) => { lastTouchY = e.touches[0].clientY; };
    const onTouchMove  = (e: TouchEvent) => {
      e.preventDefault();
      const dy = lastTouchY - e.touches[0].clientY;
      lastTouchY = e.touches[0].clientY;
      travel(dy * 10);
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchmove",  onTouchMove,  { passive: false });

    /* ── Glitch system ───────────────────────────────────────────────── */
    const scanlines = root.querySelector<HTMLElement>(".zp-scanlines")!;
    let glitching = false;
    let glitchRaf = 0;
    let glitchEnd = 0;

    function triggerGlitch() {
      glitchEnd = performance.now() + 420;
      if (glitching) return;
      glitching = true;
      gsap.to(scanlines, { opacity: 0.55, duration: 0.08 });
      const shake = () => {
        if (performance.now() < glitchEnd) {
          camera.position.x = (Math.random() - 0.5) * 9;
          camera.position.y = (Math.random() - 0.5) * 9;
          glitchRaf = requestAnimationFrame(shake);
        } else {
          camera.position.x = 0;
          camera.position.y = 0;
          glitching = false;
          gsap.to(scanlines, { opacity: 0, duration: 0.5 });
        }
      };
      glitchRaf = requestAnimationFrame(shake);
    }

    /* ── HUD elements ────────────────────────────────────────────────── */
    const hudZ       = root.querySelector<HTMLElement>(".hud-z")!;
    const hudBarFill = root.querySelector<HTMLElement>(".hud-bar-fill")!;
    const hudHealth  = root.querySelector<HTMLElement>(".hud-health-val")!;
    const hudPlate   = root.querySelector<HTMLElement>(".hud-plate")!;
    const hudVel     = root.querySelector<HTMLElement>(".hud-vel")!;
    const scrollHint = root.querySelector<HTMLElement>(".zp-scroll-hint")!;

    /* ── Render loop ─────────────────────────────────────────────────── */
    let raf = 0;
    let frame = 0;
    let prevCamZ = CAM_START;

    const TICK = () => {
      raf = requestAnimationFrame(TICK);
      frame++;

      const camZ     = camera.position.z;
      const velocity = Math.abs(camZ - prevCamZ);
      prevCamZ       = camZ;

      /* Buffer health: 100 at rest, drops with speed, recovers */
      const bufferHealth = Math.max(0, Math.min(100, 100 - scrollSpeed * 0.5 - velocity * 5));

      /* HUD — update every 2 frames */
      if (frame % 2 === 0) {
        hudZ.textContent      = `Z: ${camZ.toFixed(0)}`;
        hudVel.textContent    = `VEL: ${velocity.toFixed(1)} u/f`;
        hudBarFill.style.width = `${bufferHealth.toFixed(0)}%`;
        hudBarFill.style.background =
          bufferHealth > 65 ? "#22c55e" : bufferHealth > 35 ? "#f59e0b" : "#ef4444";
        hudHealth.textContent = `${bufferHealth.toFixed(0)}%`;

        /* nearest plate */
        let nearest = 0, nearDist = Infinity;
        plates.forEach((p, i) => {
          const d = Math.abs(camZ - p.z);
          if (d < nearDist) { nearDist = d; nearest = i; }
        });
        hudPlate.textContent = `PLT-0${nearest} // ${PLATE_NAMES[nearest]}`;

        /* Hide scroll hint once user has traveled > 1000 units */
        if (camZ < CAM_START - 1000 && scrollHint.style.opacity !== "0") {
          gsap.to(scrollHint, { opacity: 0, duration: 0.6 });
        }
      }

      /* Plate distance effects */
      plates.forEach(({ el, z }) => {
        const dist = camZ - z;  // positive = camera is still approaching

        let blurPx      = 0;
        let chromaOff   = 0;
        let plateOpacity = 1;

        if (dist > 2000) {
          /* Wireframe — far away */
          el.classList.add("zp-wireframe");
          el.classList.remove("zp-hifi");
          /* Fade out at extreme distance */
          plateOpacity = Math.max(0.08, 1 - (dist - 2000) / 10000);
          blurPx = 0;

        } else if (dist > 0) {
          /* Approaching — switch to hi-fi */
          el.classList.add("zp-hifi");
          el.classList.remove("zp-wireframe");

          if (dist < 550) {
            /* Atomize zone — blur + chromatic aberration increases */
            const t = 1 - dist / 550;            // 0→1 as dist → 0
            blurPx    = t * t * 22;
            chromaOff = t * t * 10;
            plateOpacity = Math.max(0, 1 - t * t * 1.6);
          }

        } else {
          /* Behind camera — invisible */
          plateOpacity = 0;
          el.classList.add("zp-hifi");
          el.classList.remove("zp-wireframe");
        }

        el.style.opacity = String(plateOpacity.toFixed(3));
        el.style.filter  = blurPx > 0
          ? `blur(${blurPx.toFixed(1)}px) drop-shadow(${chromaOff.toFixed(1)}px 0 0 rgba(255,50,100,0.85)) drop-shadow(-${chromaOff.toFixed(1)}px 0 0 rgba(0,210,255,0.85))`
          : "none";

        /* Enable pointer events only when within readable range */
        el.style.pointerEvents = (dist > 80 && dist < 2200) ? "auto" : "none";
      });

      if (frame % 3 === 0) drawStars(camera.position.z);
      css3d.render(scene, camera);
    };
    TICK();

    /* ── Resize ──────────────────────────────────────────────────────── */
    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      css3d.setSize(W, H);
      bgCanvas.width = W; bgCanvas.height = H;
      drawStars(camera.position.z);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(glitchRaf);
      clearTimeout(speedTimer);
      window.removeEventListener("resize", onResize);
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchmove", onTouchMove);
      formObserver.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="zp-root">

      {/* ── HUD: top-left ── */}
      <div className="zp-hud zp-hud-tl">
        <div className="hud-label">Depth Coord</div>
        <div className="hud-z hud-value">Z: 2500</div>
        <div className="hud-label" style={{ marginTop: "10px" }}>Velocity</div>
        <div className="hud-vel hud-value">VEL: 0.0 u/f</div>
        <div className="hud-label" style={{ marginTop: "10px" }}>Active Plate</div>
        <div className="hud-plate hud-value">PLT-00 // HERO</div>
      </div>

      {/* ── HUD: bottom-left ── */}
      <div className="zp-hud zp-hud-bl">
        <div className="hud-label">Buffer Health</div>
        <div className="hud-bar">
          <div className="hud-bar-fill" style={{ width: "100%", background: "#22c55e" }} />
        </div>
        <div className="hud-health-val hud-value" style={{ marginTop: "5px" }}>100%</div>
      </div>

      {/* ── Scanlines ── */}
      <div className="zp-scanlines" aria-hidden="true" />

      {/* ── Scroll hint ── */}
      <div className="zp-scroll-hint">↓ SCROLL TO TRAVEL ↓</div>

    </div>
  );
}
