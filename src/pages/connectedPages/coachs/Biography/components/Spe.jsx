import React from "react";

export default function Spe({ title, description, user, idName, datasArray }) {
  // On récupère la liste dynamiquement (ex: user['favorite_sports'])
  const selectedIds = user?.[idName] || [];

  return (
    <section className="bg-card border border-muted rounded-[2.5rem] p-8">
      <h3 className="font-black uppercase italic text-[10px] mb-2 tracking-widest text-primary text-center">
        {title}
      </h3>

      <p className="text-[10px] text-center text-muted-foreground italic mb-6">
        {description}
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        {selectedIds.map((dataId) => {
          // On cherche la correspondance dans le tableau de constantes fourni (datasArray)
          const dataMatch = datasArray.find((item) => item.id === dataId);

          if (!dataMatch) return null;

          return (
            <div
              key={dataId}
              className="flex flex-col items-center justify-center gap-1 bg-primary/5 rounded-2xl px-4 py-3 min-w-22.5 border border-primary/10 transition-transform active:scale-95"
            >
              <span className="text-xl">{dataMatch.icon}</span>
              <span className="text-[9px] font-black uppercase tracking-tighter text-primary text-center leading-none">
                {dataMatch.label}
              </span>
            </div>
          );
        })}
      </div>

      {selectedIds.length === 0 && (
        <p className="text-[10px] text-center text-muted-foreground/50 italic">
          Aucune sélection pour le moment.
        </p>
      )}
    </section>
  );
}
