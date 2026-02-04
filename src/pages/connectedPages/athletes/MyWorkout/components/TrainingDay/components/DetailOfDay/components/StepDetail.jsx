import React from 'react'

export default function StepDetail({ step }) {
  return (
    <div
      className={`p-4 rounded-2xl flex items-center gap-4 transition-all ${
        step.highlight
          ? "bg-primary/80 text-white shadow-md"
          : "bg-secondary/40 border border-muted"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${step.highlight ? "bg-white animate-pulse" : "bg-primary/80"}`}
      />
      <div>
        <h4
          className={`text-[10px] font-black uppercase  text-shadow ${step.highlight ? "text-white/80 " : "text-primary"}`}
        >
          {step.title}
        </h4>
        <p
          className={`text-sm font-bold whitespace-pre-line leading-relaxed text-shadow ${step.highlight ? "text-white " : "text-foreground"}`}
        >
          {step.detail}
        </p>
      </div>
    </div>
  );
}
