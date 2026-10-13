'use client';

import { useEffect, useRef } from 'react';

// A drifting field of neurons where only a few fire at any moment — a nod to the
// brain's sparse firing. Spikes cascade to neighbours and the cursor excites
// nearby cells. Respects prefers-reduced-motion (renders one still frame).

const COLORS = ['#FF6B4A', '#E14FA0', '#7B61FF', '#14B8A6', '#F59E0B'];

type Node = { x: number; y: number; vx: number; vy: number; r: number; charge: number; color: string; cooldown: number };

export default function NeuralField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0, height = 0, dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;
    let last = performance.now();
    let fireTimer = 0;
    const mouse = { x: -9999, y: -9999 };
    const LINK = 150;

    const seed = () => {
      const count = Math.round(Math.min(90, Math.max(36, (width * height) / 16000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: 1.6 + Math.random() * 1.8,
        charge: 0,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        cooldown: 0,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const fire = (n: Node) => {
      if (n.cooldown > 0) return;
      n.charge = 1;
      n.cooldown = 1.6;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Synapses
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          const d = Math.sqrt(d2);
          const base = (1 - d / LINK) * 0.2;
          const active = Math.max(a.charge, b.charge);
          ctx.strokeStyle = active > 0.05 ? (a.charge > b.charge ? a.color : b.color) : '#16181D';
          ctx.globalAlpha = base + active * 0.45 * (1 - d / LINK);
          ctx.lineWidth = active > 0.05 ? 1.2 : 0.8;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }

      // Cell bodies
      for (const n of nodes) {
        if (n.charge > 0.02) {
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 26 * n.charge + 6);
          glow.addColorStop(0, n.color);
          glow.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.globalAlpha = 0.35 * n.charge;
          ctx.fillStyle = glow;
          ctx.beginPath(); ctx.arc(n.x, n.y, 26 * n.charge + 6, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 0.45 + n.charge * 0.55;
        ctx.fillStyle = n.charge > 0.05 ? n.color : '#16181D';
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + n.charge * 2.2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // Spontaneous sparse firing
      fireTimer -= dt;
      if (fireTimer <= 0) {
        fire(nodes[Math.floor(Math.random() * nodes.length)]);
        fireTimer = 0.35 + Math.random() * 0.5;
      }

      for (const n of nodes) {
        n.x += n.vx * dt * 60; n.y += n.vy * dt * 60;
        if (n.x < -20) n.x = width + 20; else if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20; else if (n.y > height + 20) n.y = -20;

        const mdx = n.x - mouse.x, mdy = n.y - mouse.y;
        if (mdx * mdx + mdy * mdy < 90 * 90 && Math.random() < 0.08) fire(n);

        // Propagate: a strongly charged cell sometimes excites a neighbour
        if (n.charge > 0.75 && Math.random() < 0.06) {
          for (const m of nodes) {
            if (m === n || m.cooldown > 0) continue;
            const dx = m.x - n.x, dy = m.y - n.y;
            if (dx * dx + dy * dy < LINK * LINK && Math.random() < 0.18) { m.color = n.color; fire(m); break; }
          }
        }
        n.charge = Math.max(0, n.charge - dt * 0.9);
        n.cooldown = Math.max(0, n.cooldown - dt);
      }

      draw();
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduceMotion) {
      for (let i = 0; i < 6; i++) nodes[Math.floor(Math.random() * nodes.length)].charge = 0.8;
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
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
