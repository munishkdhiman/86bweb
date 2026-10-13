'use client';

import { useEffect, useRef } from 'react';

// A living network of neurons. Only a few fire at a time (sparse firing); each
// spike travels along a synapse as a visible pulse and may trigger the next
// neuron, forming chains of activity. The cursor wires into nearby neurons and
// excites them. Respects prefers-reduced-motion (renders one still frame).

const COLORS = ['#2BD98A', '#5BE8A8', '#1FC27A', '#9AF2C8', '#2BD98A'];

type Neuron = {
  x: number; y: number; vx: number; vy: number;
  r: number; charge: number; ring: number; color: string; cooldown: number;
};
type Pulse = { from: number; to: number; t: number; color: string };

export default function NeuralField({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Resting colour of cells and synapses; firing colours come from COLORS
    const idle = dark ? '#D9D9D9' : '#111111';
    const idleLinkAlpha = dark ? 0.16 : 0.22;
    const cursorColor = dark ? '#2BD98A' : '#12B76A';
    let width = 0, height = 0;
    let neurons: Neuron[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let last = performance.now();
    let fireTimer = 0;
    const mouse = { x: -9999, y: -9999, active: false };
    const LINK = 170;
    const MAX_PULSES = 60;

    const seed = () => {
      const count = Math.round(Math.min(130, Math.max(40, (width * height) / 11000)));
      neurons = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        r: 2.2 + Math.random() * 2.2,
        charge: 0,
        ring: 0,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        cooldown: 0,
      }));
      pulses = [];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const neighbours = (i: number) => {
      const a = neurons[i];
      const out: { j: number; d2: number }[] = [];
      for (let j = 0; j < neurons.length; j++) {
        if (j === i) continue;
        const dx = neurons[j].x - a.x, dy = neurons[j].y - a.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) out.push({ j, d2 });
      }
      return out.sort((p, q) => p.d2 - q.d2);
    };

    // Fire a neuron: flash, ring, and send spikes down one or two synapses.
    const fire = (i: number, color?: string) => {
      const n = neurons[i];
      if (n.cooldown > 0) return;
      if (color) n.color = color;
      n.charge = 1;
      n.ring = 1;
      n.cooldown = 1.4;
      if (pulses.length >= MAX_PULSES) return;
      const near = neighbours(i).filter(({ j }) => neurons[j].cooldown <= 0);
      const fanOut = Math.random() < 0.35 ? 2 : 1;
      for (let k = 0; k < Math.min(fanOut, near.length); k++) {
        // Prefer close neighbours but keep some variety
        const pick = near[Math.floor(Math.random() * Math.min(3, near.length))];
        pulses.push({ from: i, to: pick.j, t: 0, color: n.color });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Synapses
      ctx.lineCap = 'round';
      for (let i = 0; i < neurons.length; i++) {
        const a = neurons[i];
        for (let j = i + 1; j < neurons.length; j++) {
          const b = neurons[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          const closeness = 1 - Math.sqrt(d2) / LINK;
          const active = Math.max(a.charge, b.charge);
          ctx.strokeStyle = active > 0.1 ? (a.charge >= b.charge ? a.color : b.color) : idle;
          ctx.globalAlpha = closeness * idleLinkAlpha + active * closeness * 0.6;
          ctx.lineWidth = 0.9 + active * 1.2;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }

      // Cursor wiring
      if (mouse.active) {
        for (const n of neurons) {
          const dx = n.x - mouse.x, dy = n.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > 140) continue;
          ctx.strokeStyle = cursorColor;
          ctx.globalAlpha = (1 - d / 140) * 0.5;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(n.x, n.y); ctx.stroke();
        }
      }

      // Travelling spikes: bright head with a fading tail
      for (const p of pulses) {
        const a = neurons[p.from], b = neurons[p.to];
        const head = Math.min(p.t, 1), tail = Math.max(0, p.t - 0.28);
        const hx = a.x + (b.x - a.x) * head, hy = a.y + (b.y - a.y) * head;
        const tx = a.x + (b.x - a.x) * tail, ty = a.y + (b.y - a.y) * tail;
        const grad = ctx.createLinearGradient(tx, ty, hx, hy);
        grad.addColorStop(0, dark ? 'rgba(11,13,18,0)' : 'rgba(255,255,255,0)');
        grad.addColorStop(1, p.color);
        ctx.globalAlpha = 0.95;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.6;
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(hx, hy); ctx.stroke();
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(hx, hy, 7, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.arc(hx, hy, 2.6, 0, Math.PI * 2); ctx.fill();
      }

      // Neurons
      for (const n of neurons) {
        if (n.ring > 0.02) {
          ctx.globalAlpha = n.ring * 0.55;
          ctx.strokeStyle = n.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r + (1 - n.ring) * 26, 0, Math.PI * 2); ctx.stroke();
        }
        if (n.charge > 0.02) {
          const rad = 30 * n.charge + 8;
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, rad);
          glow.addColorStop(0, n.color);
          glow.addColorStop(1, dark ? 'rgba(11,13,18,0)' : 'rgba(255,255,255,0)');
          ctx.globalAlpha = 0.45 * n.charge;
          ctx.fillStyle = glow;
          ctx.beginPath(); ctx.arc(n.x, n.y, rad, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = (dark ? 0.4 : 0.55) + n.charge * (dark ? 0.6 : 0.45);
        ctx.fillStyle = n.charge > 0.08 ? n.color : idle;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + n.charge * 2.5, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // Spontaneous sparse firing seeds new chains
      fireTimer -= dt;
      if (fireTimer <= 0) {
        fire(Math.floor(Math.random() * neurons.length));
        fireTimer = 0.45 + Math.random() * 0.6;
      }

      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];
        n.x += n.vx * dt * 60; n.y += n.vy * dt * 60;
        if (n.x < -30) n.x = width + 30; else if (n.x > width + 30) n.x = -30;
        if (n.y < -30) n.y = height + 30; else if (n.y > height + 30) n.y = -30;

        if (mouse.active) {
          const dx = n.x - mouse.x, dy = n.y - mouse.y;
          if (dx * dx + dy * dy < 110 * 110 && Math.random() < 0.05) fire(i, cursorColor);
        }
        n.charge = Math.max(0, n.charge - dt * 1.1);
        n.ring = Math.max(0, n.ring - dt * 1.4);
        n.cooldown = Math.max(0, n.cooldown - dt);
      }

      // Advance spikes; on arrival they may fire the next neuron
      const arrived: Pulse[] = [];
      for (const p of pulses) {
        p.t += dt * 1.5;
        if (p.t >= 1.28) arrived.push(p);
      }
      if (arrived.length) {
        pulses = pulses.filter((p) => p.t < 1.28);
        for (const p of arrived) if (Math.random() < 0.72) fire(p.to, p.color);
      }

      draw();
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.y >= 0 && mouse.y <= rect.height;
    };
    const onLeave = () => { mouse.active = false; };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduceMotion) {
      for (let k = 0; k < 6; k++) {
        const i = Math.floor(Math.random() * neurons.length);
        neurons[i].charge = 0.85;
      }
      draw();
    } else {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
      raf = requestAnimationFrame(step);
    }

    // Pause when off-screen to save battery
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
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [dark]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
