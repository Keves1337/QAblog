import { ArrowDown } from "lucide-react";

const Hero = () => {
  const base = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

  return (
    <>
      <style>{`
        #hero {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: #070711;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 0 1.5rem;
          padding-top: 56px;
        }

        /* Ambient grid */
        #hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent);
          pointer-events: none;
          z-index: 0;
        }

        /* Top cyan orb */
        #hero-orb {
          position: absolute;
          top: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #00e5ff;
          box-shadow:
            0 0 0 1px rgba(0,229,255,0.5),
            0 0 30px 15px rgba(0,229,255,0.35),
            0 0 80px 40px rgba(0,229,255,0.15),
            0 0 160px 80px rgba(0,229,255,0.06);
          z-index: 1;
          animation: float-orb 4s ease-in-out infinite;
        }
        #hero-orb-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 400px;
          background: radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.1) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        /* Scan line across hero */
        #hero-scan {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent);
          pointer-events: none;
          z-index: 2;
          animation: scan-line 8s linear infinite;
          opacity: 0;
        }

        /* Content */
        #hero-content {
          position: relative;
          z-index: 3;
          text-align: center;
          max-width: 860px;
          width: 100%;
          padding-top: 2rem;
        }

        #hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.28em;
          color: #00e5ff;
          margin-bottom: 2rem;
        }

        #hero-headline {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(2.5rem, 8.5vw, 5.8rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.04em;
          color: #f1f5f9;
          margin-bottom: 1.5rem;
        }
        #hero-headline .hl-cyan {
          color: #00e5ff;
          text-shadow: 0 0 20px rgba(0,229,255,0.5), 0 0 60px rgba(0,229,255,0.2);
        }
        #hero-headline .hl-violet {
          color: #a78bfa;
          text-shadow: 0 0 20px rgba(167,139,250,0.5), 0 0 60px rgba(167,139,250,0.2);
        }

        #hero-sub {
          font-size: clamp(0.88rem, 2vw, 1rem);
          color: rgba(226,232,240,0.38);
          line-height: 1.75;
          max-width: 520px;
          margin: 0 auto 2.5rem;
          font-family: 'Inter', sans-serif;
        }

        /* Tag pills */
        #hero-tags {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.4rem;
          margin-bottom: 3rem;
        }
        .hero-tag {
          padding: 0.25rem 0.7rem;
          border-radius: 3px;
          border: 1px solid rgba(0,229,255,0.18);
          background: rgba(0,229,255,0.04);
          color: rgba(226,232,240,0.5);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.03em;
        }

        /* CTA */
        #hero-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.8rem;
          border-radius: 3px;
          border: 1px solid rgba(0,229,255,0.5);
          color: #00e5ff;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: background 0.2s, box-shadow 0.2s;
          margin-bottom: 5rem;
        }
        #hero-cta-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,229,255,0.15), transparent);
          transition: left 0.5s ease;
        }
        #hero-cta-btn:hover { background: rgba(0,229,255,0.08); box-shadow: 0 0 20px rgba(0,229,255,0.2); }
        #hero-cta-btn:hover::before { left: 100%; }

        /* Photo */
        #hero-photo-section {
          position: relative;
          z-index: 3;
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: auto;
        }
        #hero-photo-frame {
          position: relative;
          width: min(360px, 78vw);
          aspect-ratio: 3 / 4;
          border-radius: 6px 6px 0 0;
          overflow: hidden;
          border: 1px solid rgba(0,229,255,0.15);
          border-bottom: none;
          box-shadow:
            0 0 0 1px rgba(0,229,255,0.04),
            0 -20px 80px rgba(0,229,255,0.05),
            0 -40px 120px rgba(0,0,0,0.5);
        }
        #hero-photo-frame img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: 50% 22%;
          display: block;
          filter: grayscale(30%) contrast(1.08) brightness(0.9);
        }
        /* Corner brackets */
        #hero-photo-frame::before {
          content: '';
          position: absolute;
          top: 8px; left: 8px;
          width: 18px; height: 18px;
          border-top: 2px solid #00e5ff;
          border-left: 2px solid #00e5ff;
          z-index: 4;
        }
        #hero-photo-frame::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 40%;
          background: linear-gradient(to top, #070711 0%, transparent 100%);
          z-index: 2;
        }
        /* Bottom-right corner bracket */
        #hero-photo-br {
          position: absolute;
          bottom: 8px; right: 8px;
          width: 18px; height: 18px;
          border-bottom: 2px solid #00e5ff;
          border-right: 2px solid #00e5ff;
          z-index: 4;
        }
        #hero-photo-name {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 5;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }
        #hero-photo-name-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 700;
          color: rgba(226,232,240,0.6);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        #hero-photo-name-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          font-weight: 600;
          color: #00e5ff;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        @media (min-width: 640px)  { #hero-photo-frame { width: min(400px, 60vw); } }
        @media (min-width: 1024px) { #hero-photo-frame { width: min(440px, 38vw); } }
      `}</style>

      <section id="hero">
        <div id="hero-grid" />
        <div id="hero-orb" />
        <div id="hero-orb-glow" />
        <div id="hero-scan" />

        <div id="hero-content">
          <div id="hero-eyebrow">
            <span className="status-dot status-dot-cyan" />
            QA_ENGINEER :: PORTFOLIO
          </div>

          <h1 id="hero-headline" className="glitch-wrap" data-text="broken software.">
            The precise eye<br />
            for <span className="hl-cyan">broken</span>{" "}
            <span className="hl-violet">software.</span>
          </h1>

          <p id="hero-sub">
            Johnatan Milrad — Manual QA graduate combining a self-taught designer's
            instinct with systematic testing to catch what others miss.
          </p>

          <div id="hero-tags">
            {["// Manual QA Graduate", "// Manual Testing", "// Bug Reporting", "// Test Planning", "// Self-Taught Designer"].map(t => (
              <span key={t} className="hero-tag">{t}</span>
            ))}
          </div>

          <a id="hero-cta-btn" href="#about">
            ./explore_portfolio <ArrowDown style={{ width: "13px", height: "13px" }} />
          </a>
        </div>

        <div id="hero-photo-section">
          <div id="hero-photo-frame">
            <img src={`${base}/hero.jpeg`} alt="Johnatan Milrad" />
            <div id="hero-photo-br" />
            <div id="hero-photo-name">
              <span id="hero-photo-name-text">Johnatan Milrad</span>
              <span id="hero-photo-name-badge">&gt; QA Engineer</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
