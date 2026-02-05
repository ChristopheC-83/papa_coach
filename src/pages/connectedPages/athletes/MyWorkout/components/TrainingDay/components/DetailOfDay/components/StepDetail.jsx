import React from "react";

import { LiaBrainSolid } from "react-icons/lia";
import {
  FiStar,
} from "react-icons/fi";

export default function StepDetail({ step }) {
  return (
    <div
      className={`p-4 rounded-2xl flex flex-col  items-start gap-4 transition-all ${
        step.highlight
          ? "bg-primary/60 border border-primary text-white shadow-md"
          : step.psycho
            ? "bg-orange-500/30 border border-orange-500 text-white shadow-md"
            : "bg-secondary/40 border border-muted"
      }`}
    >
      <div className="flex items-center gap-2">
        {step.psycho && <LiaBrainSolid className="text-orange-500 text-xl" />}
        {step.highlight && <FiStar className="text-primary text-xl"  />}
        {!step.psycho && !step.highlight && (
          <div className={`w-2 h-2  rounded-full bg-primary/80`} />
        )}
        <h4
          className={`text-[10px] font-black uppercase  text-shadow ${step.highlight ? "text-white/80 text-shadow" : "text-primary"}`}
        >
          {step.title}
        </h4>
      </div>
      <p
        className={`text-sm font-bold whitespace-pre-line leading-relaxed text-shadow `}
      >
        {step.detail}
      </p>
    </div>
  );
}
