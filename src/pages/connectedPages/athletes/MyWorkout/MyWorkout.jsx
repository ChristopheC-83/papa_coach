import React, { useState } from "react";
import TitlePage from "@/components/custom/TitlePage";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiZap,
  FiCheckCircle,
  FiChevronRight as FiArrow,
} from "react-icons/fi";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  differenceInCalendarDays,
  
} from "date-fns";
import { fr } from "date-fns/locale";


export default function MyWorkout() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // --- LOGIQUE CALENDRIER ---
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

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

  // --- MOCK DATA (À remplacer par Supabase) ---
  const sessions = [
    {
      date: new Date(),
      title: "Seuil Pyramidal",
      tag: "Intensité",
      duration: "1h10",
      steps: [
        {
          title: "Échauffement",
          detail: "20min footing progressif + 5 lignes droites",
          highlight: false,
        },
        {
          title: "Corps de séance",
          detail: "2000m - 1500m - 1000m - 500m (R=2')",
          highlight: true,
        },
        {
          title: "Retour au calme",
          detail: "10min trot très lent",
          highlight: false,
        },
      ],
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      title: "Sortie Longue Active",
      tag: "Endurance",
      duration: "1h45",
      steps: [
        {
          title: "Footing",
          detail: "1h en endurance fondamentale",
          highlight: false,
        },
        {
          title: "Bloc Allure",
          detail: "30min allure cible marathon",
          highlight: true,
        },
        { title: "Fin de séance", detail: "15min souple", highlight: false },
      ],
    },
  ];

  const selectedSession = sessions.find((s) => isSameDay(s.date, selectedDate));

  return (
    <div className="w-full max-w-md mx-auto mt-5 p-4 space-y-6 pb-24">
      <TitlePage titlePage="Planning" iconPage={<FiCalendar />} />

      {/* --- DATE PICKER MENSUEL ARC STYLE --- */}
      <div className="bg-card border border-muted rounded-[2.5rem] p-5 shadow-sm">
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="font-black italic uppercase text-xl tracking-tighter">
            {format(currentMonth, "MMMM yyyy", { locale: fr })}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-2 bg-secondary rounded-xl hover:bg-primary hover:text-white transition-all"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 bg-secondary rounded-xl hover:bg-primary hover:text-white transition-all"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 mb-4">
          {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
            <div
              key={i}
              className="text-center text-[10px] font-black text-muted-foreground/50"
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, idx) => {
            const isSelected = isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());
            const isCurrentMonth = isSameMonth(day, monthStart);
            const hasEvent = sessions.some((s) => isSameDay(s.date, day));

            return (
              <button
                key={idx}
                onClick={() => setSelectedDate(day)}
                className={`
                  relative h-10 flex items-center justify-center rounded-xl text-sm transition-all
                  ${!isCurrentMonth ? "opacity-10" : "opacity-100"}
                  ${isSelected ? "bg-primary text-white font-black scale-110 z-10 shadow-lg shadow-primary/30" : "hover:bg-secondary font-bold"}
                  ${isToday && !isSelected ? "border border-primary text-primary" : ""}
                `}
              >
                {format(day, "d")}
                {hasEvent && !isSelected && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- DÉTAIL DE LA SÉANCE --- */}
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-700">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            {format(selectedDate, "EEEE d MMMM ", { locale: fr })}
          </h3>

          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md bg-secondary text-muted-foreground">
            {getRelativeBadge(selectedDate)}
          </span>
        </div>

        {selectedSession ? (
          <div className="bg-card border-2 border-primary/5 rounded-[2.5rem] p-6 shadow-xl space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="bg-primary/10 text-primary text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedSession.tag}
                </span>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter leading-none pt-2">
                  {selectedSession.title}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-primary italic leading-none">
                  {selectedSession.duration}
                </p>
                <p className="text-[9px] text-muted-foreground uppercase font-bold mt-1">
                  Durée
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {selectedSession.steps.map((step, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl flex items-center gap-4 transition-all ${
                    step.highlight
                      ? "bg-primary text-white shadow-md"
                      : "bg-secondary/40 border border-muted"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${step.highlight ? "bg-white animate-pulse" : "bg-primary"}`}
                  />
                  <div>
                    <h4
                      className={`text-[10px] font-black uppercase ${step.highlight ? "text-white/80" : "text-primary"}`}
                    >
                      {step.title}
                    </h4>
                    <p
                      className={`text-sm font-bold leading-tight ${step.highlight ? "text-white" : "text-foreground"}`}
                    >
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* --- BOUTON DEBRIEF --- */}
            <button
              onClick={() => console.log("Ouvrir le formulaire de débrief")}
              className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase italic tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group shadow-lg shadow-primary/20"
            >
              <FiCheckCircle className="text-lg group-hover:rotate-12 transition-transform" />
              Remplir mon débrief
            </button>
          </div>
        ) : (
          <div className="bg-secondary/10 border-2 border-dashed border-muted rounded-[2.5rem] py-16 text-center">
            <p className="text-muted-foreground font-bold italic text-sm">
              Repos ou séance libre
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
