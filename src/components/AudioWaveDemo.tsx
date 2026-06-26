'use client';

export default function AudioWaveDemo() {
  const bars = [
    { cls: 'wave-bar-1', h: 8 },
    { cls: 'wave-bar-2', h: 20 },
    { cls: 'wave-bar-3', h: 32 },
    { cls: 'wave-bar-5', h: 40 },
    { cls: 'wave-bar-3', h: 36 },
    { cls: 'wave-bar-4', h: 28 },
    { cls: 'wave-bar-1', h: 44 },
    { cls: 'wave-bar-2', h: 32 },
    { cls: 'wave-bar-5', h: 20 },
    { cls: 'wave-bar-3', h: 36 },
    { cls: 'wave-bar-4', h: 24 },
    { cls: 'wave-bar-1', h: 14 },
    { cls: 'wave-bar-2', h: 28 },
    { cls: 'wave-bar-5', h: 40 },
    { cls: 'wave-bar-3', h: 32 },
    { cls: 'wave-bar-4', h: 20 },
    { cls: 'wave-bar-1', h: 36 },
    { cls: 'wave-bar-2', h: 16 },
    { cls: 'wave-bar-5', h: 8 },
  ];

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
              <span className="text-accent-gradient">0.3s Latency.</span>
            </h2>
            <p className="text-zinc-600 text-lg leading-relaxed mb-8">
              Our AI-powered Digital Human avatars deliver real-time, conversational interactions indistinguishable from a trained human agent — at unlimited scale. Each avatar is trained on your brand voice, product knowledge, and compliance requirements.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { value: '40+', label: 'Languages supported' },
                { value: '0.3s', label: 'Average response latency' },
                { value: '24/7', label: 'Always available' },
                { value: '100%', label: 'Brand voice controlled' },
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

          {/* Right — Browser frame mockup with wave */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              {/* Browser chrome */}
              <div className="bg-[#0E202E] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
                {/* Browser top bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/80 border-b border-zinc-700/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="flex-1 mx-4 h-6 rounded bg-zinc-700/60 flex items-center px-3">
                    <span className="text-xs text-zinc-500">86b.ai/agent/live</span>
                  </div>
                </div>

                {/* Main screen */}
                <div className="p-8 flex flex-col items-center gap-6 bg-gradient-to-b from-zinc-900 to-zinc-950 min-h-[360px] justify-center">
                  {/* Avatar circle with pulse ring */}
                  <div className="relative flex items-center justify-center">
                    {/* Outer pulse rings */}
                    <div className="absolute w-32 h-32 rounded-full border border-[#29B6F6]/20 animate-pulse-ring" />
                    <div className="absolute w-28 h-28 rounded-full border border-[#29B6F6]/30 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#29B6F6]/30 to-[#29B6F6]/10 border-2 border-[#29B6F6]/50 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-[#29B6F6]/30 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-[#29B6F6]" />
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-zinc-400 font-mono">Connected · 0.3s · EN</span>
                  </div>

                  {/* Waveform */}
                  <div className="w-full flex items-end justify-center gap-[3px] h-12 px-4">
                    {bars.map((bar, i) => (
                      <div
                        key={i}
                        className={`flex-shrink-0 w-[6px] rounded-full bg-[#29B6F6] ${bar.cls}`}
                        style={{ height: `${bar.h}px` }}
                      />
                    ))}
                  </div>

                  {/* Transcript line */}
                  <div className="w-full px-4 py-3 rounded-xl bg-zinc-800/60 border border-zinc-700/50">
                    <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                      <span className="text-[#29B6F6]">Agent:</span> "Namaste. I can help you with your account query — which product are you referring to?"
                    </p>
                  </div>

                  {/* Language chips */}
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {['EN', 'DE', 'HI', 'AR', 'ZH', 'FR', '+34'].map((lang) => (
                      <span
                        key={lang}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700"
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

