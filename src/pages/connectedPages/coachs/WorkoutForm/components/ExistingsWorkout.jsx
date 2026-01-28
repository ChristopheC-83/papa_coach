import React from 'react'
import {
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

export default function ExistingsWorkout({ existingWorkout }) {
  return (
    <div className="bg-card border border-muted p-6 rounded-3xl shadow-sm border-l-4 border-l-primary w-full max-w-md mx-auto">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[10px] font-black text-primary uppercase tracking-widest">
            {existingWorkout.tag}
          </span>
          <h3 className="text-xl font-black leading-tight">
            {existingWorkout.title}
          </h3>
          <p className="text-xs text-muted-foreground font-bold">
            {existingWorkout.duration}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="p-3 bg-secondary/50 rounded-xl hover:text-primary transition-all">
            <FiEdit2 />
          </button>
          <button className="p-3 bg-secondary/50 rounded-xl hover:text-destructive transition-all">
            <FiTrash2 />
          </button>
        </div>
      </div>
      <div className="space-y-2 border-t border-muted/50 pt-4">
        {existingWorkout.steps?.map((step, i) => (
          <div
            key={i}
            className={`text-xs p-2 rounded-lg ${step.highlight ? "bg-primary/5 border border-primary/10" : ""}`}
          >
            <span className="font-bold text-primary mr-2">—</span> {step.title}
          </div>
        ))}
      </div>
    </div>
  );
}
