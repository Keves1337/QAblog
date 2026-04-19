import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ── NO SOUNDS — all audio omitted per design requirement ───────────────── */

const LS_XP = "qa_xp_v1";
const XP_PER_BUG = 2;
const MAX_BUGS = 5;
const SPAWN_MS = 3200;
const TICK_MS = 50;

/* ── Rank tiers ─────────────────────────────────────────────────────────── */
const TIERS = [
  { name: "Bronze",      color: "#cd7f32", glow: "rgba(205,127,50,0.7)",   start: 0,     end: 500,   xpPerDiv: 100  },
  { name: "Silver",      color: "#b0b7c3", glow: "rgba(176,183,195,0.6)",  start: 501,   end: 1500,  xpPerDiv: 200  },
  { name: "Gold",        color: "#f5c518", glow: "rgba(245,197,24,0.8)",   start: 1501,  end: 3000,  xpPerDiv: 300  },
  { name: "Platinum",    color: "#00e5cc", glow: "rgba(0,229,204,0.7)",    start: 3001,  end: 5000,  xpPerDiv: 400  },
  { name: "Diamond",     color: "#36a3f7", glow: "rgba(54,163,247,0.85)",  start: 5001,  end: 8000,  xpPerDiv: 600  },
  { name: "Master",      color: "#b44be1", glow: "rgba(180,75,225,0.85)",  start: 8001,  end: 12000, xpPerDiv: 800  },
  { name: "Grandmaster", color: "#ff6154", glow: "rgba(255,97,84,0.85)",   start: 12001, end: 17000, xpPerDiv: 1000 },
  { name: "Champion",    color: "#ff8c00", glow: "rgba(255,140,0,0.85)",   start: 17001, end: 25000, xpPerDiv: 1600 },
  { name: "Top 500",     color: "#facc15", glow: "rgba(250,204,21,1.0)",   start: 25001, end: Infinity, xpPerDiv: 50 },
] as const;

type Tier = typeof TIERS[number];

interface RankInfo {
  tier: Tier;
  tierIdx: number;
  division: number;
  pct: number;
  xpInDiv: number;
  xpForDiv: number;
  isTop500: boolean;
  top500Rank: number;
  label: string;
}

function getRankInfo(xp: number): RankInfo {
  const clampedXp = Math.max(0, xp);
  let tierIdx = TIERS.findIndex((t, i) => i === TIERS.length - 1 || clampedXp <= t.end);
  if (tierIdx < 0) tierIdx = TIERS.length - 1;
  const tier = TIERS[tierIdx];

  if (tier.name === "Top 500") {
    const over = clampedXp - tier.start;
    const top500Rank = Math.max(1, 500 - Math.floor(over / 50));
    const xpInDiv = over % 50;
    return {
      tier, tierIdx, division: top500Rank, pct: xpInDiv / 50,
      xpInDiv, xpForDiv: 50, isTop500: true, top500Rank,
      label: `Top 500  #${top500Rank}`,
    };
  }

  const xpInTier = clampedXp - tier.start;
  const divIdx = Math.min(4, Math.floor(xpInTier / tier.xpPerDiv));
  const division = 5 - divIdx;
  const xpInDiv = xpInTier - divIdx * tier.xpPerDiv;
  const isLast = division === 1;
  const xpForDiv = isLast
    ? (tier.end - tier.start) - divIdx * tier.xpPerDiv
    : tier.xpPerDiv;

  return {
    tier, tierIdx, division, pct: Math.min(1, xpInDiv / xpForDiv),
    xpInDiv, xpForDiv, isTop500: false, top500Rank: 0,
    label: `${tier.name} ${division}`,
  };
}

/* ── Badge SVG ──────────────────────────────────────────────────────────── */
function BadgeSVG({ rank, size = 64 }: { rank: RankInfo; size?: number }) {
  const { tier, division, isTop500, top500Rank } = rank;
  const c = tier.color;
  const fill = `${c}22`;
  const pts = "12,1 22.8,7 22.8,19 12,25 1.2,19 1.2,7";
  const inner = "12,4 19.5,8.5 19.5,17.5 12,22 4.5,17.5 4.5,8.5";

  return (
    <svg viewBox="0 0 24 26" width={size} height={size * 1.08} style={{ display: "block" }}>
      <defs>
        <filter id={`glow-${tier.name}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <polygon points={pts} fill={fill} stroke={c} strokeWidth="1.2"
        filter={`url(#glow-${tier.name})`} />
      <polygon points={inner} fill={`${c}18`} stroke={`${c}66`} strokeWidth="0.4" />
      {isTop500 ? (
        <>
          <text x="12" y="11" textAnchor="middle" dominantBaseline="middle"
            fill={c} fontSize="4" fontWeight="800" fontFamily="monospace">TOP</text>
          <text x="12" y="16.5" textAnchor="middle" dominantBaseline="middle"
            fill={c} fontSize="3.2" fontWeight="700" fontFamily="monospace">500</text>
          <text x="12" y="22" textAnchor="middle" dominantBaseline="middle"
            fill={c} fontSize="3" fontWeight="600" fontFamily="monospace">
            #{top500Rank}
          </text>
        </>
      ) : (
        <>
          <text x="12" y="12" textAnchor="middle" dominantBaseline="middle"
            fill={c} fontSize="8" fontWeight="900" fontFamily="monospace">
            {division}
          </text>
          <text x="12" y="20" textAnchor="middle" dominantBaseline="middle"
            fill={`${c}cc`} fontSize="3.2" fontWeight="700" fontFamily="monospace" letterSpacing="0.5">
            {tier.name.slice(0, 3).toUpperCase()}
          </text>
        </>
      )}
    </svg>
  );
}

/* ── XP Bar ─────────────────────────────────────────────────────────────── */
function XPBar({ xp, rank, pulse }: { xp: number; rank: RankInfo; pulse: boolean }) {
  const { tier, pct, xpInDiv, xpForDiv, label, isTop500 } = rank;
  const c = tier.color;
  const nextLabel = isTop500 && rank.top500Rank === 1
    ? "MAX"
    : `${xpForDiv - xpInDiv} XP`;

  return (
    <div style={{
      position: "fixed", top: "var(--nav-h, 54px)", left: 0, right: 0, zIndex: 99,
      height: "32px", background: "rgba(5,5,5,0.88)", backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${c}33`,
      display: "flex", alignItems: "center", gap: "10px", padding: "0 16px",
    }}>
      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.68rem",
        fontWeight: 700, color: c, whiteSpace: "nowrap", letterSpacing: "0.04em",
        textShadow: `0 0 8px ${c}` }}>
        {label}
      </span>

      <div style={{ flex: 1, height: "6px", borderRadius: "3px",
        background: "rgba(255,255,255,0.06)", overflow: "hidden", position: "relative" }}>
        <motion.div
          animate={{ width: `${pct * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute", inset: 0, width: `${pct * 100}%`,
            background: `linear-gradient(90deg, ${c}88, ${c})`,
            borderRadius: "3px",
            boxShadow: pulse ? `0 0 10px ${c}, 0 0 20px ${c}` : `0 0 6px ${c}88`,
          }}
        />
      </div>

      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.62rem",
        color: "rgba(248,250,252,0.35)", whiteSpace: "nowrap" }}>
        {nextLabel === "MAX" ? "MAX RANK" : `${nextLabel} to next`}
      </span>

      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem",
        color: "rgba(248,250,252,0.22)", whiteSpace: "nowrap" }}>
        {xp} XP
      </span>
    </div>
  );
}

/* ── Rank Badge corner widget ────────────────────────────────────────────── */
function RankBadgeWidget({ rank }: { rank: RankInfo }) {
  const { tier } = rank;
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      position: "fixed", bottom: "24px", right: "20px", zIndex: 98,
      display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
      pointerEvents: "none",
    }}>
      <motion.div
        animate={{ filter: pulse
          ? `drop-shadow(0 0 10px ${tier.color}) drop-shadow(0 0 20px ${tier.glow})`
          : `drop-shadow(0 0 5px ${tier.glow})` }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      >
        <BadgeSVG rank={rank} size={58} />
      </motion.div>
      <span style={{
        fontFamily: "JetBrains Mono, monospace", fontSize: "0.55rem",
        color: tier.color, textAlign: "center", letterSpacing: "0.05em",
        textShadow: `0 0 8px ${tier.glow}`,
      }}>
        QA TIER
      </span>
    </div>
  );
}

/* ── Mechanical Bug ─────────────────────────────────────────────────────── */
function BugSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 32 26" width="32" height="26">
      <ellipse cx="16" cy="15" rx="7.5" ry="5.5" fill={color} />
      <circle cx="16" cy="8" r="4" fill={color} />
      <line x1="8.5" y1="11" x2="2" y2="7" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="8.5" y1="15" x2="1" y2="15" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="8.5" y1="18.5" x2="2" y2="22" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="23.5" y1="11" x2="30" y2="7" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="23.5" y1="15" x2="31" y2="15" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="23.5" y1="18.5" x2="30" y2="22" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="14" y1="5" x2="11.5" y2="1.5" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="5" x2="20.5" y2="1.5" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <circle cx="14.2" cy="7.8" r="1.1" fill="rgba(255,255,255,0.9)" />
      <circle cx="17.8" cy="7.8" r="1.1" fill="rgba(255,255,255,0.9)" />
      <ellipse cx="16" cy="15" rx="3.5" ry="2" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="0.7" />
      <line x1="12.5" y1="15" x2="19.5" y2="15" stroke="rgba(0,0,0,0.2)" strokeWidth="0.6" />
    </svg>
  );
}

interface Bug {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  splatted: boolean;
}

function BugEntity({
  bug, onSquash, rankColor,
}: { bug: Bug; onSquash: (id: string, x: number, y: number) => void; rankColor: string }) {
  return (
    <AnimatePresence>
      {!bug.splatted ? (
        <motion.div
          key="bug"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 3, opacity: 0, filter: "blur(4px)" }}
          transition={{ exit: { duration: 0.35 } }}
          onClick={e => onSquash(bug.id, e.clientX, e.clientY)}
          onTouchEnd={e => { e.preventDefault(); const t = e.changedTouches[0]; onSquash(bug.id, t.clientX, t.clientY); }}
          style={{
            position: "fixed",
            left: bug.x,
            top: bug.y,
            transform: `rotate(${bug.rot}deg)`,
            cursor: "pointer",
            zIndex: 97,
            pointerEvents: "all",
            userSelect: "none",
            filter: `drop-shadow(0 0 4px ${rankColor}88)`,
          }}
        >
          <BugSVG color={rankColor} />
        </motion.div>
      ) : (
        <motion.div
          key="splat"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 2.5, opacity: 0 }}
          exit={{}}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            position: "fixed", left: bug.x, top: bug.y,
            zIndex: 97, pointerEvents: "none",
          }}
        >
          <BugSVG color={rankColor} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Main BugSquash component ────────────────────────────────────────────── */
export default function BugSquash() {
  const [xp, setXp] = useState<number>(() => {
    try { return Math.max(0, parseInt(localStorage.getItem(LS_XP) ?? "0", 10) || 0); }
    catch { return 0; }
  });
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [popups, setPopups] = useState<{ id: string; x: number; y: number }[]>([]);
  const [levelUpLabel, setLevelUpLabel] = useState<string | null>(null);
  const [barPulse, setBarPulse] = useState(false);

  const prevRankLabel = useRef<string>("");
  const prevXp = useRef(xp);

  const rank = getRankInfo(xp);

  useEffect(() => {
    try { localStorage.setItem(LS_XP, String(xp)); } catch {}
  }, [xp]);

  useEffect(() => {
    const curr = getRankInfo(xp);
    const prev = getRankInfo(prevXp.current);
    if (xp > prevXp.current && curr.label !== prev.label) {
      setLevelUpLabel(curr.label);
      setBarPulse(true);
      setTimeout(() => setLevelUpLabel(null), 2800);
      setTimeout(() => setBarPulse(false), 1200);
    }
    prevXp.current = xp;
  }, [xp]);

  useEffect(() => {
    prevRankLabel.current = rank.label;
  }, [rank.label]);

  useEffect(() => {
    const tick = setInterval(() => {
      setBugs(prev => prev.map(b => {
        if (b.splatted) return b;
        const TOP = 90;
        const BOT = window.innerHeight - 30;
        const LEFT = 0;
        const RIGHT = window.innerWidth - 32;
        let { x, y, vx, vy } = b;
        x += vx * TICK_MS;
        y += vy * TICK_MS;
        if (x < LEFT)  { x = LEFT;  vx = Math.abs(vx); }
        if (x > RIGHT) { x = RIGHT; vx = -Math.abs(vx); }
        if (y < TOP)   { y = TOP;   vy = Math.abs(vy); }
        if (y > BOT)   { y = BOT;   vy = -Math.abs(vy); }
        const angle = Math.atan2(vy, vx) * (180 / Math.PI);
        return { ...b, x, y, vx, vy, rot: angle };
      }));
    }, TICK_MS);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const spawn = () => {
      setBugs(prev => {
        if (prev.filter(b => !b.splatted).length >= MAX_BUGS) return prev;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.04 + Math.random() * 0.08;
        return [...prev, {
          id: Math.random().toString(36).slice(2),
          x: 40 + Math.random() * (window.innerWidth - 80),
          y: 100 + Math.random() * (window.innerHeight - 160),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rot: 0,
          splatted: false,
        }];
      });
    };
    spawn();
    const id = setInterval(spawn, SPAWN_MS);
    return () => clearInterval(id);
  }, []);

  const squash = useCallback((id: string, cx: number, cy: number) => {
    setBugs(prev => prev.map(b => b.id === id ? { ...b, splatted: true } : b));
    setTimeout(() => setBugs(prev => prev.filter(b => b.id !== id)), 500);
    setXp(prev => prev + XP_PER_BUG);
    const pid = Math.random().toString(36).slice(2);
    setPopups(prev => [...prev, { id: pid, x: cx, y: cy }]);
    setTimeout(() => setPopups(prev => prev.filter(p => p.id !== pid)), 1100);
  }, []);

  return (
    <>
      <XPBar xp={xp} rank={rank} pulse={barPulse} />
      <RankBadgeWidget rank={rank} />

      {bugs.map(bug => (
        <BugEntity key={bug.id} bug={bug} onSquash={squash} rankColor={rank.tier.color} />
      ))}

      <AnimatePresence>
        {popups.map(p => (
          <motion.div key={p.id}
            initial={{ opacity: 1, y: 0, scale: 0.9 }}
            animate={{ opacity: 0, y: -64, scale: 1.4 }}
            exit={{}}
            transition={{ duration: 1.0, ease: "easeOut" }}
            style={{
              position: "fixed", left: p.x - 18, top: p.y - 24,
              zIndex: 9999, pointerEvents: "none",
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 900, fontSize: "1rem",
              color: "#22c55e",
              textShadow: "0 0 14px #22c55e, 0 0 28px #22c55e88",
            }}
          >
            +{XP_PER_BUG} XP
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {levelUpLabel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -30 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            style={{
              position: "fixed", top: "38%", left: "50%", transform: "translate(-50%,-50%)",
              zIndex: 9999, pointerEvents: "none", textAlign: "center",
            }}
          >
            <div style={{
              padding: "20px 36px", borderRadius: "16px",
              background: "rgba(5,5,5,0.85)", backdropFilter: "blur(20px)",
              border: `1px solid ${rank.tier.color}55`,
              boxShadow: `0 0 40px ${rank.tier.glow}`,
            }}>
              <div style={{
                fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem",
                letterSpacing: "0.35em", color: rank.tier.color,
                marginBottom: "8px", opacity: 0.8,
              }}>
                RANK UP
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: "2rem",
                fontWeight: 900, color: "#f8fafc", letterSpacing: "-0.02em",
                textShadow: `0 0 24px ${rank.tier.glow}, 0 0 48px ${rank.tier.glow}`,
              }}>
                {levelUpLabel}
              </div>
              <BadgeSVG rank={rank} size={48} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
