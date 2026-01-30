import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
import CalendarWorkoutHeader from "./components/CalendarWorkoutHeader";

export default function CalendarWorkout({
  currentMonth,
  setCurrentMonth,
  trainings,
  selectedDate,
  setSelectedDate,
}) {
  const weekDays = ["L", "M", "M", "J", "V", "S", "D"];
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className=" w-md max-w-full max-md:mx-2 flex flex-col">
      <CalendarWorkoutHeader
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />

      <div className="bg-card border border-muted rounded-3xl p-5 shadow-sm">
        <div className="grid grid-cols-7 mb-4">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className="text-center text-[10px] font-black text-muted-foreground/50"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, idx) => {
            const isSelected = isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());
            const isCurrentMonth = isSameMonth(day, monthStart);

            // On récupère la séance du jour
            const dayEvent = trainings?.find(
              (s) => s?.date && isSameDay(new Date(s.date), day),
            );
            const isRace = dayEvent?.tag === "Compétition";

            // --- GESTION DES COULEURS (Priorité à la course) ---
            let bgColor = "";
            if (isSelected) {
              bgColor = isRace
                ? "bg-destructive/60 shadow-destructive/40"
                : "bg-primary shadow-primary/30";
            } else {
              bgColor = isRace
                ? "bg-destructive/20 text-destructive/70"
                : "hover:bg-secondary";
            }

            return (
              <button
                key={idx}
                onClick={() => setSelectedDate(day)}
                className={`
                    relative h-10 flex items-center justify-center rounded-xl text-sm transition-all cursor-pointer
                    ${bgColor}
                    ${!isCurrentMonth ? "opacity-10" : "opacity-100"}
                    ${isSelected ? "text-white text-shadow font-black scale-110 z-10 shadow" : "font-bold"}
                    ${isToday && !isSelected ? "border border-primary text-primary" : ""}
                  `}
              >
                {format(day, "d")}

                {dayEvent &&  (
                  <div
                    className={`absolute -bottom-1 size-2 rounded-full ${isRace ? "bg-destructive" : "bg-primary"}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
