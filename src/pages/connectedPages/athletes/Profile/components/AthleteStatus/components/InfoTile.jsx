import React from 'react'

export default function InfoTile({ icon, label, value, highlight = false }) {
  return (
    <div className="bg-card border border-muted rounded-3xl p-5 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${highlight ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-secondary text-muted-foreground"}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
          {label}
        </p>
        <p className="font-bold text-sm uppercase italic">{value}</p>
      </div>
    </div>
  );
}
