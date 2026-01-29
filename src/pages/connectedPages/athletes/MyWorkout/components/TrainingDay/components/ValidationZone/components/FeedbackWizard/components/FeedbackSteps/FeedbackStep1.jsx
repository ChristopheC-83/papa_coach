import React from 'react'

export default function FeedbackStep1({ formData , setFormData }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <h3 className="text-lg font-black italic uppercase tracking-tighter">
        Quelle était la difficulté ? (RPE)
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {[...Array(10)].map((_, i) => {
          const val = i + 1;
          const isActive = formData.rpe === val;
          return (
            <button
              key={val}
              onClick={() => setFormData({ ...formData, rpe: val })}
              className={`py-4 rounded-3xl font-black transition-all ${
                isActive
                  ? "bg-primary text-white scale-110 shadow-lg"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              {val}
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-center text-muted-foreground font-bold italic">
        1 = Très facile | 10 = Effort maximal
      </p>
    </div>
  );
}
