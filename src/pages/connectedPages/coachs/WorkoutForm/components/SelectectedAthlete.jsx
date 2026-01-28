import React from 'react'

export default function SelectectedAthlete({athlete, sports}) {
  return (
    <div className="bg-card border border-muted p-5 rounded-3xl flex items-start gap-4 shadow-sm flex-col w-full max-w-md mx-auto">
      <div className="w-full flex gap-3 items-center">
        <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-primary/20 shrink-0 ">
          {athlete?.username?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-black truncate">{athlete?.username}</h1>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
            Objectif : {athlete?.goal || "Performance"}
          </p>
        </div>
      </div>
      <div className="flex gap-3 shrink-0 flex-wrap ">
        {sports.map((s) => (
          <div
            key={s.id}
            title={s.label}
            className="text-xl flex flex-col gap-1 justify-center items-center opacity-80 bg-muted border border-primary/80 py-1.5 px-3 rounded-3xl shrink-0"
          >
            <span>{s.icon}</span>
            <span className="text-xs">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
