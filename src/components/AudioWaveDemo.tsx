'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AudioWaveDemo() {
  const [wave, setWave] = useState([3, 6, 9, 12, 8, 5, 10, 7, 4, 11, 6, 9, 3, 8, 5, 7, 11, 4, 6]);
  const [msgIdx, setMsgIdx] = useState(0);
  const [msgVisible, setMsgVisible] = useState(true);

  const messages = [
    'Namaste. I can help you with your account query — which product are you referring to?',
    'Let me pull up your account details. Could you verify your registered email?',
    'Your renewal is due in 3 days. Would you like me to process it now?',
  ];

  useEffect(() => {
    const waveIv = setInterval(() => {
      setWave(w => w.map(() => Math.floor(Math.random() * 16) + 2));
    }, 160);
    const msgIv = setInterval(() => {
      setMsgVisible(false);
      setTimeout(() => {
        setMsgIdx(i => (i + 1) % messages.length);
        setMsgVisible(true);
      }, 500);
    }, 3800);
    return () => { clearInterval(waveIv); clearInterval(msgIv); };
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#29B6F6] mb-4">
              Live Capability
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0E202E] leading-tight mb-6">
              Digital Human Agents.<br />
              <span className="text-accent-gradient">Sub-Second Latency.</span>
            </h2>
            <p className="text-zinc-600 text-lg leading-relaxed mb-8">
              Our AI-powered Digital Human avatars deliver low-latency, natural conversational interactions that handle the majority of routine queries without human escalation — at unlimited scale. Each avatar is trained on your brand voice, product knowledge, and compliance requirements. Deployed on your preferred infrastructure: private VPC, Azure, AWS, or on-premise.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { value: '40+', label: 'Languages supported' },
                { value: '~0.3s', label: 'Target response latency' },
                { value: '24/7', label: 'Always available' },
                { value: '100%', label: 'Brand-voice trained' },
              ].map((m) => (
                <div key={m.label} className="p-4 rounded-xl border border-zinc-200 bg-zinc-50">
                  <div className="text-2xl font-bold text-[#29B6F6]">{m.value}</div>
                  <div className="text-sm text-zinc-500 mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            <ul className="space-y-2">
              {[
                'Multilingual: EN, DE, HI, AR, ZH + 36 more',
                'Fully private deployment — no public API',
                'Integrates with any CRM or helpdesk',
                'Custom avatar appearance and brand voice',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#29B6F6] mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Photorealistic MetaHuman with live animated overlays */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              {/* Browser chrome */}
              <div className="bg-[#0A1628] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">

                {/* Browser top bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#0D1F35] border-b border-zinc-700/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="flex-1 mx-4 h-6 rounded bg-zinc-700/60 flex items-center px-3">
                    <span className="text-xs text-zinc-500 font-mono">86b.ai/agent/live</span>
                  </div>
                </div>

                {/* Main screen — photorealistic face + overlays */}
                <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                  {/* The MetaHuman face */}
                  <Image
                    src="/svc_digital_human.png"
                    alt="Digital Human Agent"
                    fill
                    className="object-cover object-center"
                    unoptimized
                    priority
                  />
                  {/* Gradient overlay — darken bottom for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/20 to-transparent" />

                  {/* Connected badge — top left */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] text-white font-mono">Connected · ~0.3s · EN</span>
                  </div>

                  {/* Latency badge — top right */}
                  <div className="absolute top-3 right-3 bg-[#29B6F6]/20 border border-[#29B6F6]/40 px-3 py-1 rounded-full">
                    <span className="text-[11px] text-[#29B6F6] font-bold font-mono">LIVE</span>
                  </div>

                  {/* Waveform — animated bars */}
                  <div className="absolute bottom-28 left-0 right-0 flex items-end justify-center gap-[3px] h-12 px-8">
                    {wave.map((h, i) => (
                      <div
                        key={i}
                        className="flex-shrink-0 w-[5px] rounded-full bg-[#29B6F6]/80 transition-all duration-150"
                        style={{ height: `${h * 2.4}px` }}
                      />
                    ))}
                  </div>

                  {/* Chat bubble — animated cycling messages */}
                  <div
                    className={`absolute bottom-12 left-3 right-3 transition-opacity duration-500 ${
                      msgVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="bg-[#29B6F6]/15 border border-[#29B6F6]/30 backdrop-blur-sm rounded-xl px-4 py-2.5">
                      <p className="text-[11px] text-white/90 leading-relaxed font-mono">
                        <span className="text-[#29B6F6] font-bold">Agent: </span>
                        &ldquo;{messages[msgIdx]}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Language chips — bottom strip */}
                  <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
                    {['EN', 'DE', 'HI', 'AR', 'ZH', 'FR', '+34'].map((lang) => (
                      <span
                        key={lang}
                        className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 border border-white/20 text-white/80"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Caption */}
              <p className="text-center text-xs text-zinc-400 mt-3">
                Real-time conversational AI · Private VPC deployment
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
