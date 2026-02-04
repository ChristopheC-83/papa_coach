import React from "react";

import { LiaBrainSolid } from "react-icons/lia";
import {
  FiPlus,
  FiTrash2,
  FiStar,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";

export default function StepDetail({ step }) {
  return (
    <div
      className={`p-4 rounded-2xl flex items-center gap-4 transition-all ${
        step.highlight
          ? "bg-primary/40 border border-primary text-white shadow-md"
          : step.psycho
            ? "bg-orange-500/20 border border-orange-500 text-white shadow-md"
            : "bg-secondary/40 border border-muted"
      }`}
    >
      {step.psycho && <LiaBrainSolid className="text-orange-500 text-xl" />}
      {step.highlight && <FiStar className="text-primary  text-xl"  />}
      {!step.psycho && !step.highlight && (
        <div className={`w-2 h-2  rounded-full bg-primary/80 ms-2`} />
      )}
      <h4
        className={`text-[10px] font-black uppercase  text-shadow ${step.highlight ? "text-white/80 text-shadow" : "text-primary"}`}
      >
        {step.title}
      </h4>
      <p
        className={`text-sm font-bold whitespace-pre-line leading-relaxed text-shadow ${step.highlight ? "text-white " : "text-foreground"}`}
      >
        {step.detail}
      </p>
    </div>
  );
}
