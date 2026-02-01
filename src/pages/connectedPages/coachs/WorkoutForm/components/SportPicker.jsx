import React from "react";
import { SPORTS_CONFIG } from "@/constants/Workouts/sports";

export default function SportPicker({ selectedSport, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
      {Object.values(SPORTS_CONFIG).map((sport) => {
        const isActive = selectedSport === sport.id;
        return (
          <button
            key={sport.id}
            type="button"
            onClick={() => onSelect(sport.id)}
            className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all duration-200 active:scale-95 ${
              isActive
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-secondary/20 bg-secondary/5 text-muted-foreground hover:border-muted"
            }`}
          >
            <span className="text-xl">{sport.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-tight leading-none text-left">
              {sport.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
