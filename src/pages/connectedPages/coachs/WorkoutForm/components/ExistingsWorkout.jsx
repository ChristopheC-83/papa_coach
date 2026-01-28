import React from "react";
import { FiEdit2, FiTrash2, FiClock } from "react-icons/fi";

export default function ExistingsWorkout({
  existingWorkout,
  onDelete,
  onEdit,
}) {
  const handleDelete = () => {
    if (window.confirm("Supprimer cette séance définitivement ?")) {
      onDelete(existingWorkout.id);
    }
  };

  return (
    <div className="bg-card border border-muted p-6 rounded-3xl shadow-sm w-full max-w-md mx-auto transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded-full">
            {existingWorkout.tag}
          </span>
          <h3 className="text-xl font-black leading-tight italic uppercase tracking-tighter">
            {existingWorkout.title}
          </h3>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase">
            <FiClock className="text-primary" /> {existingWorkout.duration}
          </div>
        </div>

        {/* ACTIONS BONTONS */}
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-3 bg-secondary/50 rounded-xl hover:bg-primary hover:text-white transition-all active:scale-90"
            title="Modifier"
          >
            <FiEdit2 size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="p-3 bg-secondary/50 rounded-xl hover:bg-destructive hover:text-white transition-all active:scale-90"
            title="Supprimer"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>

      {/* STRUCTURE DE LA SÉANCE */}
      <div className="space-y-2 border-t border-muted/50 pt-4">
        <p className="text-[10px] font-black text-muted-foreground/50 uppercase mb-2">
          Structure :
        </p>
        {existingWorkout.steps?.map((step, i) => (
          <div
            key={i}
            className={`group p-3 rounded-2xl border transition-all ${
              step.highlight
                ? "bg-primary/5 border-primary/20 shadow-sm"
                : "bg-secondary/20 border-transparent"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full ${step.highlight ? "bg-primary" : "bg-muted-foreground"}`}
              />
              <h4
                className={`text-xs font-bold ${step.highlight ? "text-primary uppercase" : "text-foreground"}`}
              >
                {step.title}
              </h4>
            </div>
            {step.detail && (
              <p className="text-[11px] text-muted-foreground mt-1 pl-3 border-l border-muted ml-0.5">
                {step.detail}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
