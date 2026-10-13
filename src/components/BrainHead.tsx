'use client';

import { useEffect, useRef } from 'react';

// A side-profile human head with a brain of firing neurons inside. Neurons sit
// at fixed homes inside the brain outline and jitter slightly; only a few fire
// at a time and spikes travel along synapses to their neighbours, forming
// chains. A short column of neurons runs down the spinal cord. Respects
// prefers-reduced-motion (renders one still frame) and pauses off-screen.

type Neuron = {
  hx: number; hy: number; x: number; y: number; phase: number;
  r: number; charge: number; ring: number; color: string; cooldown: number;
};
type Pulse = { from: number; to: number; t: number; color: string };

// Head silhouette in unit space (facing left, toward the copy). y grows down.
const HEAD: [number, number][] = [
  [0.16, 0.66], [0.17, 0.48], [0.27, 0.32], [0.37, 0.12], [0.39, -0.1], [0.33, -0.3],
  [0.18, -0.43], [-0.02, -0.48], [-0.2, -0.43], [-0.32, -0.3], [-0.37, -0.14],
  [-0.38, -0.02], [-0.42, 0.06], [-0.47, 0.13], [-0.43, 0.17], [-0.44, 0.22],
  [-0.41, 0.25], [-0.43, 0.29], [-0.39, 0.34], [-0.36, 0.4], [-0.25, 0.43],
  [-0.12, 0.42], [-0.09, 0.66],
];
// Brain: cerebrum plus cerebellum, also in unit space
const CEREBRUM: [number, number][] = [
  [-0.3, -0.08], [-0.31, -0.22], [-0.22, -0.35], [-0.06, -0.41], [0.12, -0.38],
  [0.27, -0.27], [0.33, -0.1], [0.3, 0.04], [0.18, 0.08], [0.06, 0.06],
  [-0.06, 0.08], [-0.18, 0.04],
];
const CEREBELLUM: [number, number][] = [
  [0.12, 0.1], [0.24, 0.06], [0.31, 0.1], [0.27, 0.19], [0.15, 0.2], [0.1, 0.15],
];

// Smooth closed/open curve through points (Catmull-Rom → Bézier)
function curve(ctx: CanvasRenderingContext2D | Path2D, pts: [number, number][], closed: boolean) {
  const n = pts.length;
  const at = (i: number) => pts[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  ctx.moveTo(pts[0][0], pts[0][1]);
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    ctx.bezierCurveTo(
      p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6,
      p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6,
      p2[0], p2[1],
    );
  }
  if (closed) ctx.closePath();
}

const DEFAULT_COLORS = ['#2BD98A', '#5BE8A8', '#1FC27A', '#9AF2C8'];

export default function BrainHead({
  className = '',
  colors = DEFAULT_COLORS,
  idle = '#D9D9D9',
}: { className?: string; colors?: string[]; idle?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0, height = 0;
    let cx = 0, cy = 0, s = 1; // head centre and scale in px
    let neurons: Neuron[] = [];
    let pulses: Pulse[] = [];
    let link = 60;
    let raf = 0;
    let last = performance.now();
    let fireTimer = 0;
    let time = 0;
    const MAX_PULSES = 50;

    const toPx = (pts: [number, number][]) => pts.map(([x, y]) => [cx + x * s, cy + y * s] as [number, number]);
    let headPath = new Path2D();
    let brainPath = new Path2D();

    const layout = () => {
      // Desktop: head on the right. Narrow screens: centred and larger, behind the copy.
      const wide = width >= 900;
      s = wide ? Math.min(height * 0.8, width * 0.4) : Math.min(height * 0.7, width * 1.05);
      cx = wide ? width * 0.77 : width * 0.62;
      cy = height * (wide ? 0.54 : 0.5);
      link = s * 0.11;

      headPath = new Path2D(); curve(headPath, toPx(HEAD), false);
      brainPath = new Path2D();
      curve(brainPath, toPx(CEREBRUM), true);
      curve(brainPath, toPx(CEREBELLUM), true);

      // Seed neurons inside the brain by rejection sampling
      const area = s * s;
      const count = Math.round(Math.min(160, Math.max(70, area / 2600)));
      neurons = [];
      let guard = 0;
      while (neurons.length < count && guard++ < 20000) {
        const x = cx + (Math.random() - 0.5) * 0.7 * s;
        const y = cy + (-0.42 + Math.random() * 0.64) * s;
        if (!ctx.isPointInPath(brainPath, x, y)) continue;
        // Keep a little spacing so the network reads clearly
        if (neurons.some((n) => (n.hx - x) ** 2 + (n.hy - y) ** 2 < (s * 0.028) ** 2)) continue;
        neurons.push(makeNeuron(x, y));
      }
      // Spinal cord: a short column down the neck
      for (let k = 0; k < 6; k++) {
        const t = k / 5;
        neurons.push(makeNeuron(cx + (0.13 - t * 0.05) * s, cy + (0.22 + t * 0.4) * s, 2));
      }
      pulses = [];
    };

    const makeNeuron = (x: number, y: number, r?: number): Neuron => ({
      hx: x, hy: y, x, y, phase: Math.random() * Math.PI * 2,
      r: r ?? 1.6 + Math.random() * 1.8, charge: 0, ring: 0,
      color: colors[Math.floor(Math.random() * colors.length)], cooldown: 0,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
    };

    const neighbours = (i: number) => {
      const a = neurons[i];
      const out: { j: number; d2: number }[] = [];
      for (let j = 0; j < neurons.length; j++) {
        if (j === i) continue;
        const d2 = (neurons[j].x - a.x) ** 2 + (neurons[j].y - a.y) ** 2;
        if (d2 < link * link) out.push({ j, d2 });
      }
      return out.sort((p, q) => p.d2 - q.d2);
    };

    const fire = (i: number, color?: string) => {
      const n = neurons[i];
      if (n.cooldown > 0) return;
      if (color) n.color = color;
      n.charge = 1; n.ring = 1; n.cooldown = 1.3;
      if (pulses.length >= MAX_PULSES) return;
      const near = neighbours(i).filter(({ j }) => neurons[j].cooldown <= 0);
      const fanOut = Math.random() < 0.4 ? 2 : 1;
      for (let k = 0; k < Math.min(fanOut, near.length); k++) {
        const pick = near[Math.floor(Math.random() * Math.min(3, near.length))];
        pulses.push({ from: i, to: pick.j, t: 0, color: n.color });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Head: faint glass fill and a fine outline
      const fill = ctx.createRadialGradient(cx, cy - s * 0.15, 0, cx, cy - s * 0.15, s * 0.6);
      fill.addColorStop(0, 'rgba(43,217,138,0.07)');
      fill.addColorStop(1, 'rgba(43,217,138,0)');
      ctx.fillStyle = fill;
      ctx.beginPath(); ctx.arc(cx, cy - s * 0.12, s * 0.55, 0, Math.PI * 2); ctx.fill();

      ctx.strokeStyle = idle;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1.2;
      ctx.stroke(headPath);
      ctx.globalAlpha = 0.14;
      ctx.setLineDash([3, 5]);
      ctx.stroke(brainPath);
      ctx.setLineDash([]);

      // Synapses
      for (let i = 0; i < neurons.length; i++) {
        const a = neurons[i];
        for (let j = i + 1; j < neurons.length; j++) {
          const b = neurons[j];
          const d2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
          if (d2 > link * link) continue;
          const closeness = 1 - Math.sqrt(d2) / link;
          const active = Math.max(a.charge, b.charge);
          ctx.strokeStyle = active > 0.1 ? (a.charge >= b.charge ? a.color : b.color) : idle;
          ctx.globalAlpha = closeness * 0.16 + active * closeness * 0.7;
          ctx.lineWidth = 0.8 + active * 1.2;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }

      // Travelling spikes
      for (const p of pulses) {
        const a = neurons[p.from], b = neurons[p.to];
        const head = Math.min(p.t, 1), tail = Math.max(0, p.t - 0.3);
        const hx = a.x + (b.x - a.x) * head, hy = a.y + (b.y - a.y) * head;
        const tx = a.x + (b.x - a.x) * tail, ty = a.y + (b.y - a.y) * tail;
        const grad = ctx.createLinearGradient(tx, ty, hx, hy);
        grad.addColorStop(0, 'rgba(10,10,10,0)');
        grad.addColorStop(1, p.color);
        ctx.globalAlpha = 0.95;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(hx, hy); ctx.stroke();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.25;
        ctx.beginPath(); ctx.arc(hx, hy, 6, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.arc(hx, hy, 2.2, 0, Math.PI * 2); ctx.fill();
      }

      // Neurons
      for (const n of neurons) {
        if (n.ring > 0.02) {
          ctx.globalAlpha = n.ring * 0.55;
          ctx.strokeStyle = n.color;
          ctx.lineWidth = 1.3;
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r + (1 - n.ring) * 20, 0, Math.PI * 2); ctx.stroke();
        }
        if (n.charge > 0.02) {
          const rad = 24 * n.charge + 6;
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, rad);
          glow.addColorStop(0, n.color);
          glow.addColorStop(1, 'rgba(10,10,10,0)');
          ctx.globalAlpha = 0.5 * n.charge;
          ctx.fillStyle = glow;
          ctx.beginPath(); ctx.arc(n.x, n.y, rad, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 0.45 + n.charge * 0.55;
        ctx.fillStyle = n.charge > 0.08 ? n.color : idle;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + n.charge * 2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += dt;

      fireTimer -= dt;
      if (fireTimer <= 0) {
        fire(Math.floor(Math.random() * neurons.length));
        fireTimer = 0.35 + Math.random() * 0.5;
      }

      for (const n of neurons) {
        // Gentle breathing around a fixed home keeps the brain shape intact
        n.x = n.hx + Math.sin(time * 0.6 + n.phase) * 1.6;
        n.y = n.hy + Math.cos(time * 0.5 + n.phase) * 1.6;
        n.charge = Math.max(0, n.charge - dt * 1.1);
        n.ring = Math.max(0, n.ring - dt * 1.4);
        n.cooldown = Math.max(0, n.cooldown - dt);
      }

      const arrived: Pulse[] = [];
      for (const p of pulses) {
        p.t += dt * 1.6;
        if (p.t >= 1.3) arrived.push(p);
      }
      if (arrived.length) {
        pulses = pulses.filter((p) => p.t < 1.3);
        for (const p of arrived) if (Math.random() < 0.7) fire(p.to, p.color);
      }

      draw();
      raf = requestAnimationFrame(step);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduceMotion) {
      for (let k = 0; k < 8; k++) neurons[Math.floor(Math.random() * neurons.length)].charge = 0.85;
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

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [colors, idle]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
