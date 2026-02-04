import React from "react";
import { FiZap } from "react-icons/fi";

export default function CoachFeedbackDisplay({ workout }) {
  if (!workout?.coach_comment) return null;

  const getLoadColor = (score) => {
    if (score < 200) return "text-green-400"; // Cool
    if (score < 500) return "text-primary"; // Travail
    return "text-orange-500"; // Hardcore
  };

  return (
    <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-linear-to-r from-transparent to-primary/20"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">
          Expert Analysis
        </span>
        <div className="h-px flex-1 bg-linear-to-l from-transparent to-primary/20"></div>
      </div>

      <div className="bg-zinc-900/50 border border-primary/20 rounded-[32px] p-6 relative overflow-hidden shadow-xl">
        <FiZap className="absolute -right-3 -top-3 text-7xl text-primary/5 -rotate-12" />

        <div className="relative z-10">
          <p className="text-sm text-zinc-200 leading-relaxed italic  font-medium whitespace-pre-line">
            "{workout.coach_comment}"
          </p>

          {workout.load_score && (
            <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">
                  Charge de travail
                </span>
                <span className="text-[10px] font-bold text-zinc-600">
                  Calcul Foster
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-3xl font-black italic ${getLoadColor(workout.load_score)}`}
                >
                  {workout.load_score}
                </span>
                <span className="text-[10px] font-black text-zinc-500 uppercase">
                  pts
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
