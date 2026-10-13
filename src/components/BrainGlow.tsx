'use client';

import { useEffect, useRef } from 'react';

// A glowing, translucent brain (side view) wrapped in a polygon network.
// The brain body, folds and grooves are painted once per resize to an offscreen
// canvas; each frame adds the network, firing nodes and travelling spikes on
// top. Respects prefers-reduced-motion (one still frame) and pauses off-screen.

type Node = {
  hx: number; hy: number; x: number; y: number; phase: number;
  r: number; charge: number; ring: number; cooldown: number; fade: number;
};
type Edge = [number, number];
type Pulse = { edge: number; dir: 1 | -1; t: number };

type Pt = [number, number];
// Unit space, frontal lobe on the left. Width ≈ 1, y grows down.
const CEREBRUM: Pt[] = [
  [-0.48, 0.02], [-0.5, -0.12], [-0.43, -0.27], [-0.27, -0.38], [-0.04, -0.43],
  [0.18, -0.4], [0.36, -0.29], [0.47, -0.1], [0.47, 0.08], [0.39, 0.19],
  [0.25, 0.2], [0.12, 0.25], [0.02, 0.31], [-0.13, 0.33], [-0.26, 0.27],
  [-0.31, 0.15], [-0.4, 0.1],
];
const CEREBELLUM: Pt[] = [
  [0.14, 0.23], [0.3, 0.19], [0.42, 0.24], [0.4, 0.35], [0.25, 0.39], [0.13, 0.33],
];
const STEM: Pt[] = [
  [0.02, 0.29], [0.12, 0.28], [0.14, 0.44], [0.1, 0.56], [0.03, 0.54], [0.01, 0.4],
];
const SYLVIAN: Pt[] = [[-0.31, 0.13], [-0.14, 0.06], [0.06, -0.01], [0.2, -0.1], [0.27, -0.13]];
const CENTRAL: Pt[] = [[0.02, -0.42], [-0.03, -0.27], [0.03, -0.13], [-0.02, 0.02]];

function curve(p: Path2D, pts: Pt[], closed: boolean) {
  const n = pts.length;
  const at = (i: number) => pts[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  p.moveTo(pts[0][0], pts[0][1]);
  const end = closed ? n : n - 1;
  for (let i = 0; i < end; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    p.bezierCurveTo(
      p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6,
      p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6,
      p2[0], p2[1],
    );
  }
  if (closed) p.closePath();
}

const rgba = (hex: string, a: number) => {
  const v = parseInt(hex.slice(1), 16);
  return `rgba(${(v >> 16) & 255},${(v >> 8) & 255},${v & 255},${a})`;
};

export default function BrainGlow({
  className = '',
  glow = '#2BD98A',
  core = '#D8FFEC',
}: { className?: string; glow?: string; core?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const brainLayer = document.createElement('canvas');
    let width = 0, height = 0, dpr = 1;
    let cx = 0, cy = 0, s = 1;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let adj: number[][] = [];
    let pulses: Pulse[] = [];
    let raf = 0, last = performance.now(), fireTimer = 0, time = 0;

    const toPx = (pts: Pt[]): Pt[] => pts.map(([x, y]) => [cx + x * s, cy + y * s]);
    const path = (pts: Pt[], closed = true) => { const p = new Path2D(); curve(p, toPx(pts), closed); return p; };

    // ── Static brain, painted once per resize ──────────────────────────────
    const paintBrain = () => {
      brainLayer.width = canvas.width; brainLayer.height = canvas.height;
      const b = brainLayer.getContext('2d')!;
      b.setTransform(dpr, 0, 0, dpr, 0, 0);
      b.lineCap = 'round'; b.lineJoin = 'round';

      const cerebrum = path(CEREBRUM), cerebellum = path(CEREBELLUM), stem = path(STEM);
      const all = new Path2D();
      all.addPath(cerebrum); all.addPath(cerebellum); all.addPath(stem);

      // Soft halo behind the brain
      const halo = b.createRadialGradient(cx, cy, s * 0.1, cx, cy, s * 0.75);
      halo.addColorStop(0, rgba(glow, 0.16));
      halo.addColorStop(1, rgba(glow, 0));
      b.fillStyle = halo;
      b.fillRect(cx - s, cy - s, s * 2, s * 2);

      // Glassy body: darker centre, brighter rim
      for (const part of [stem, cerebellum, cerebrum]) {
        const body = b.createRadialGradient(cx, cy - s * 0.05, s * 0.05, cx, cy - s * 0.05, s * 0.55);
        body.addColorStop(0, rgba(glow, 0.06));
        body.addColorStop(0.7, rgba(glow, 0.14));
        body.addColorStop(1, rgba(glow, 0.32));
        b.fillStyle = body;
        b.fill(part);
      }

      // Folds: smooth random walks confined to each part, drawn with glow
      b.globalCompositeOperation = 'lighter';
      const folds = (part: Path2D, count: number, len: number, step: number, x0: number, x1: number, y0: number, y1: number) => {
        for (let k = 0; k < count; k++) {
          let x = 0, y = 0, tries = 0;
          do { x = cx + (x0 + Math.random() * (x1 - x0)) * s; y = cy + (y0 + Math.random() * (y1 - y0)) * s; }
          while (!b.isPointInPath(part, x * dpr, y * dpr) && ++tries < 60);
          if (tries >= 60) continue;
          let a = Math.random() * Math.PI * 2;
          const pts: Pt[] = [[x, y]];
          for (let i = 0; i < len; i++) {
            a += (Math.random() - 0.5) * 0.75;
            let nx = x + Math.cos(a) * step * s, ny = y + Math.sin(a) * step * s;
            if (!b.isPointInPath(part, nx * dpr, ny * dpr)) {
              a += Math.PI * (0.6 + Math.random() * 0.5);
              nx = x + Math.cos(a) * step * s; ny = y + Math.sin(a) * step * s;
              if (!b.isPointInPath(part, nx * dpr, ny * dpr)) break;
            }
            x = nx; y = ny; pts.push([x, y]);
          }
          if (pts.length < 4) continue;
          const p = new Path2D(); curve(p, pts, false);
          b.strokeStyle = rgba(glow, 0.06); b.lineWidth = s * 0.055; b.stroke(p);
          b.strokeStyle = rgba(glow, 0.1); b.lineWidth = s * 0.026; b.stroke(p);
          b.shadowColor = glow; b.shadowBlur = 8;
          b.strokeStyle = rgba(core, 0.28); b.lineWidth = Math.max(0.8, s * 0.004); b.stroke(p);
          b.shadowBlur = 0;
        }
      };
      b.save(); b.clip(cerebrum); folds(cerebrum, 46, 16, 0.024, -0.5, 0.48, -0.43, 0.33); b.restore();
      // Cerebellum: tight horizontal folia
      b.save(); b.clip(cerebellum);
      for (let k = 0; k < 6; k++) {
        const yy = 0.21 + k * 0.03;
        const p = new Path2D(); curve(p, toPx([[0.1, yy + 0.02], [0.24, yy - 0.015], [0.36, yy + 0.005], [0.45, yy + 0.03]]), false);
        b.strokeStyle = rgba(glow, 0.1); b.lineWidth = s * 0.014; b.stroke(p);
        b.strokeStyle = rgba(core, 0.2); b.lineWidth = Math.max(0.7, s * 0.0028); b.stroke(p);
      }
      b.restore();

      // Main grooves read as darker channels with a bright lip
      b.globalCompositeOperation = 'source-over';
      for (const g of [SYLVIAN, CENTRAL]) {
        const p = path(g, false);
        b.strokeStyle = 'rgba(5,8,7,0.45)'; b.lineWidth = s * 0.012; b.stroke(p);
        b.strokeStyle = rgba(core, 0.22); b.lineWidth = Math.max(0.8, s * 0.003); b.stroke(p);
      }

      // Bright rim
      b.globalCompositeOperation = 'lighter';
      b.shadowColor = glow; b.shadowBlur = 18;
      b.strokeStyle = rgba(core, 0.5); b.lineWidth = Math.max(1, s * 0.004);
      b.stroke(cerebrum);
      b.strokeStyle = rgba(core, 0.25);
      b.stroke(cerebellum); b.stroke(stem);
      b.shadowBlur = 0;
      b.globalCompositeOperation = 'source-over';
    };

    // ── Network around the brain ───────────────────────────────────────────
    const buildNetwork = () => {
      nodes = [];
      const count = Math.round(Math.min(150, Math.max(70, s / 4.5)));
      let guard = 0;
      while (nodes.length < count && guard++ < 5000) {
        const ang = Math.random() * Math.PI * 2;
        const rad = Math.sqrt(Math.random());
        const x = cx + Math.cos(ang) * rad * s * 0.78;
        const y = cy + Math.sin(ang) * rad * s * 0.6;
        if (nodes.some((n) => (n.hx - x) ** 2 + (n.hy - y) ** 2 < (s * 0.05) ** 2)) continue;
        // Fade the network out toward the copy on the left
        const fade = Math.min(1, Math.max(0.12, (x - (cx - s * 0.85)) / (s * 0.55)));
        nodes.push({ hx: x, hy: y, x, y, phase: Math.random() * 6.3, r: 1.2 + Math.random() * 2.6,
          charge: 0, ring: 0, cooldown: 0, fade });
      }
      // Connect each node to its nearest few neighbours (a loose triangulation)
      const seen = new Set<string>();
      edges = []; adj = nodes.map(() => []);
      nodes.forEach((a, i) => {
        const near = nodes
          .map((b, j) => ({ j, d: (a.hx - b.hx) ** 2 + (a.hy - b.hy) ** 2 }))
          .filter(({ j }) => j !== i)
          .sort((p, q) => p.d - q.d)
          .slice(0, 3);
        for (const { j, d } of near) {
          if (d > (s * 0.24) ** 2) continue;
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (seen.has(key)) continue;
          seen.add(key);
          adj[i].push(edges.length); adj[j].push(edges.length);
          edges.push([i, j]);
        }
      });
      pulses = [];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const wide = width >= 900;
      s = wide ? Math.min(height * 0.74, width * 0.37) : Math.min(height * 0.8, width * 1.1);
      cx = wide ? width * 0.8 : width * 0.55;
      cy = height * (wide ? 0.53 : 0.48);
      paintBrain();
      buildNetwork();
    };

    const fire = (i: number) => {
      const n = nodes[i];
      if (n.cooldown > 0) return;
      n.charge = 1; n.ring = 1; n.cooldown = 1.4;
      if (pulses.length > 40) return;
      const out = adj[i].filter((e) => { const [a, b] = edges[e]; return nodes[a === i ? b : a].cooldown <= 0; });
      const fan = Math.random() < 0.4 ? 2 : 1;
      for (let k = 0; k < Math.min(fan, out.length); k++) {
        const e = out[Math.floor(Math.random() * out.length)];
        pulses.push({ edge: e, dir: edges[e][0] === i ? 1 : -1, t: 0 });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = 0.92 + Math.sin(time * 0.8) * 0.08; // slow breathing
      ctx.drawImage(brainLayer, 0, 0);
      ctx.restore();

      ctx.lineCap = 'round';
      // Edges
      for (const [i, j] of edges) {
        const a = nodes[i], b = nodes[j];
        const active = Math.max(a.charge, b.charge);
        ctx.strokeStyle = active > 0.1 ? glow : rgba(core, 1);
        ctx.globalAlpha = (0.16 + active * 0.6) * Math.min(a.fade, b.fade);
        ctx.lineWidth = 0.7 + active * 1.1;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      // Spikes
      for (const p of pulses) {
        const [i, j] = edges[p.edge];
        const a = nodes[p.dir === 1 ? i : j], b = nodes[p.dir === 1 ? j : i];
        const h = Math.min(p.t, 1), tl = Math.max(0, p.t - 0.3);
        const hx = a.x + (b.x - a.x) * h, hy = a.y + (b.y - a.y) * h;
        const tx = a.x + (b.x - a.x) * tl, ty = a.y + (b.y - a.y) * tl;
        const g = ctx.createLinearGradient(tx, ty, hx, hy);
        g.addColorStop(0, rgba(glow, 0)); g.addColorStop(1, glow);
        ctx.globalAlpha = Math.min(a.fade, b.fade);
        ctx.strokeStyle = g; ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(hx, hy); ctx.stroke();
        ctx.fillStyle = core;
        ctx.beginPath(); ctx.arc(hx, hy, 2.2, 0, Math.PI * 2); ctx.fill();
      }
      // Nodes
      for (const n of nodes) {
        if (n.ring > 0.02) {
          ctx.globalAlpha = n.ring * 0.5 * n.fade;
          ctx.strokeStyle = glow; ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r + (1 - n.ring) * 18, 0, Math.PI * 2); ctx.stroke();
        }
        if (n.charge > 0.02) {
          const rad = 18 * n.charge + 5;
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, rad);
          g.addColorStop(0, glow); g.addColorStop(1, rgba(glow, 0));
          ctx.globalAlpha = 0.55 * n.charge * n.fade;
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(n.x, n.y, rad, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = (0.55 + n.charge * 0.45) * n.fade;
        ctx.fillStyle = n.charge > 0.08 ? glow : '#FFFFFF';
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + n.charge * 1.5, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now; time += dt;
      fireTimer -= dt;
      if (fireTimer <= 0) { fire(Math.floor(Math.random() * nodes.length)); fireTimer = 0.3 + Math.random() * 0.5; }
      for (const n of nodes) {
        n.x = n.hx + Math.sin(time * 0.5 + n.phase) * 2.5;
        n.y = n.hy + Math.cos(time * 0.4 + n.phase) * 2.5;
        n.charge = Math.max(0, n.charge - dt * 1.1);
        n.ring = Math.max(0, n.ring - dt * 1.4);
        n.cooldown = Math.max(0, n.cooldown - dt);
      }
      const arrived: Pulse[] = [];
      for (const p of pulses) { p.t += dt * 1.4; if (p.t >= 1.3) arrived.push(p); }
      if (arrived.length) {
        pulses = pulses.filter((p) => p.t < 1.3);
        for (const p of arrived) {
          const [i, j] = edges[p.edge];
          if (Math.random() < 0.72) fire(p.dir === 1 ? j : i);
        }
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduceMotion) {
      for (let k = 0; k < 8; k++) nodes[Math.floor(Math.random() * nodes.length)].charge = 0.85;
      draw();
    } else {
      raf = requestAnimationFrame(step);
    }

    const io = new IntersectionObserver(([entry]) => {
      if (reduceMotion) return;
      if (entry.isIntersecting) { if (!raf) { last = performance.now(); raf = requestAnimationFrame(step); } }
      else { cancelAnimationFrame(raf); raf = 0; }
    });
    io.observe(canvas);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [glow, core]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
