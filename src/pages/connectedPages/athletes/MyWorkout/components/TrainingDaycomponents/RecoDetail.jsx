import React from 'react'

export default function RecoDetail({ selectedReco }) {
  return (
    <div className="bg-card border-2 border-primary/5 rounded-3xl p-6 shadow-xl space-y-6">
      <div className="space-y-1">
        <span className="bg-destructive/60 text-white text-shadow text-[9px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          reconnaissance Parcours
        </span>
        <h2 className="text-2xl font-black uppercase italic tracking-tighter leading-none pt-5">
          {selectedReco.location}
        </h2>
      </div>
    </div>
  );
}
