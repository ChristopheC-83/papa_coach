import React from 'react'

export default function FeedBackSkipped({ handleDoneSubmit }) {
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground italic">
        Sélectionne la raison principale :
      </p>
      <div className="grid grid-cols-2 gap-2">
        {["Blessure", "Maladie", "Travail", "Météo", "Fatigue", "Autre"].map(
          (reason) => (
            <button
              key={reason}
              onClick={() => handleDoneSubmit({ reason }, "skipped")}
              className="py-3 bg-secondary/30 hover:bg-primary/10 hover:text-primary rounded-3xl text-[10px] font-bold uppercase transition-all"
            >
              {reason}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
