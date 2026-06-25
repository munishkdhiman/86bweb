"use client";
import { useEffect, useRef } from "react";

const items = [
  "Generative AI", "Digital Humans", "Intelligent Automation", "Revenue Auditing",
  "Predictive Analytics", "NLP & Document Intelligence", "Computer Vision",
  "AI Governance", "HR & Talent AI", "MLOps", "LLM Orchestration",
  "German Language AI", "AI Testing & Red-Teaming", "Travel & Logistics AI",
  "Investor Readiness", "AI Strategy", "Explainable AI", "Edge AI",
];

const stat_items = [
  "90% Manual Audit Elimination", "99.9% Model Accuracy", "10× Faster Due Diligence",
  "100% Private Deployments", "SOC2 Compliant", "EU AI Act Ready", "0.3s Agent Latency",
];

function Track({ items, speed = 40, reverse = false }: { items: string[]; speed?: number; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{
          animation: `marquee${reverse ? "-reverse" : ""} ${items.length * speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-5 py-0">
            <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
            <span className="text-sm font-medium text-slate-500 whitespace-nowrap">{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ScrollingBanner() {
  return (
    <div className="bg-white border-y border-slate-200/60 py-3.5 overflow-hidden select-none">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <Track items={items} speed={35} />
      <div className="mt-3">
        <Track items={stat_items} speed={25} reverse />
      </div>
    </div>
  );
}
