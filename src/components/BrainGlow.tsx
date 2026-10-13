'use client';

import { useEffect, useRef } from 'react';

// A glowing brain image wrapped in a polygon network. The brain and its halo
// are painted once per resize to an offscreen canvas; each frame adds the
// network, firing nodes and travelling spikes on top. Respects
// prefers-reduced-motion (one still frame) and pauses off-screen.

type Node = {
  hx: number; hy: number; x: number; y: number; phase: number;
  r: number; charge: number; ring: number; cooldown: number; fade: number;
};
type Edge = [number, number];
type Pulse = { edge: number; dir: 1 | -1; t: number };

// Cropped, transparent brain renders (1200px for desktop, 720px for phones)
const SRC = '/images/brain-hero.webp';
const SRC_SM = '/images/brain-hero-sm.webp';
const ASPECT = 1200 / 1085;

const rgba = (hex: string, a: number) => {
  const v = parseInt(hex.slice(1), 16);
  return `rgba(${(v >> 16) & 255},${(v >> 8) & 255},${v & 255},${a})`;
};

export default function BrainGlow({
  className = '',
  glow = '#5CC8FF',
  core = '#E6F7FF',
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

    let img: HTMLImageElement | null = null;
    const loadImage = (src: string) => {
      if (img && img.dataset.src === src) return;
      img = new Image();
      img.dataset.src = src;
      img.decoding = 'async';
      img.onload = () => { paintBrain(); if (!raf) draw(); };
      img.src = src;
    };

    // ── Static brain, painted once per resize ──────────────────────────────
    const paintBrain = () => {
      brainLayer.width = canvas.width; brainLayer.height = canvas.height;
      const b = brainLayer.getContext('2d')!;
      b.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (img?.complete && img.naturalWidth) {
        const w = s * 1.05, h = w / ASPECT;
        b.drawImage(img, cx - w / 2, cy - h / 2, w, h);
        // Fade the frontal lobe into the background where it sits behind the copy
        if (width >= 900) {
          const x0 = cx - w / 2;
          const fade = b.createLinearGradient(x0, 0, x0 + w * 0.42, 0);
          fade.addColorStop(0, 'rgba(0,0,0,0.7)');
          fade.addColorStop(1, 'rgba(0,0,0,0)');
          b.globalCompositeOperation = 'destination-out';
          b.fillStyle = fade;
          b.fillRect(x0 - 2, cy - h / 2 - 2, w * 0.42 + 2, h + 4);
          b.globalCompositeOperation = 'source-over';
        }
      }

      // Soft halo, painted behind the brain so the fade above never clips it
      const halo = b.createRadialGradient(cx, cy, s * 0.1, cx, cy, s * 0.8);
      halo.addColorStop(0, rgba(glow, 0.18));
      halo.addColorStop(1, rgba(glow, 0));
      b.globalCompositeOperation = 'destination-over';
      b.fillStyle = halo;
      b.fillRect(cx - s, cy - s, s * 2, s * 2);
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
      s = wide ? Math.min(height * 0.72, width * 0.35) : Math.min(height * 0.8, width * 1.1);
      cx = wide ? width * 0.74 : width * 0.55;
      cy = height * (wide ? 0.53 : 0.48);
      loadImage(s * 1.05 * dpr > 760 ? SRC : SRC_SM);
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
