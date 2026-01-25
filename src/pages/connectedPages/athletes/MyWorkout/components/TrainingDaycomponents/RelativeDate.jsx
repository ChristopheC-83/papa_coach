import React from "react";
import { format, differenceInCalendarDays } from "date-fns";
import { fr } from "date-fns/locale";

export default function RelativeDate({ selectedDate }) {
  const getRelativeBadge = (date) => {
    const today = new Date();
    const diff = differenceInCalendarDays(date, today);

    if (diff === 0)
      return <span className="text-primary animate-pulse">Aujourd'hui</span>;
    if (diff === -1) return "Hier";
    if (diff === 1) return "Demain";
    if (diff > 1) return `Dans ${diff} jours`;
    if (diff < -1) return `Il y a ${Math.abs(diff)} jours`;

    return null;
  };
  return (
    <div className="flex items-center justify-between px-2">
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
        {format(selectedDate, "EEEE d MMMM ", { locale: fr })}
      </h3>

      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md bg-secondary text-muted-foreground">
        {getRelativeBadge(selectedDate)}
      </span>
    </div>
  );
}
