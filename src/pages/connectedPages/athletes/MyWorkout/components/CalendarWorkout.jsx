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
import CalendarWorkoutHeader from "./CalendarWorkoutHeader";


export default function CalendarWorkout({
  currentMonth,
  setCurrentMonth,
  trainings,
  races,
  selectedDate,
  setSelectedDate,
  recos,
}) {
  const weekDays = ["L", "M", "M", "J", "V", "S", "D"];
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className=" w-md flex flex-col">
      <CalendarWorkoutHeader
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />

      <div className="bg-card border border-muted rounded-[2.5rem] p-5 shadow-sm">
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
            const hasEvent = trainings.some((s) => isSameDay(s.date, day));
            const hasRace = races.some((s) => isSameDay(s.date, day));
            const hasReco = recos.some((s) => isSameDay(s.date, day));
            // console.log(hasEvent);

            return (
              <button
                key={idx}
                onClick={() => setSelectedDate(day)}
                className={`
                     relative h-10 flex items-center justify-center rounded-xl text-sm transition-all
                     ${!isCurrentMonth ? "opacity-10" : "opacity-100"}
                     ${isSelected ? "bg-primary text-white text-shadow font-black scale-110 z-10 shadow-lg shadow-primary/30" : "hover:bg-secondary font-bold"}
                     ${isToday && !isSelected ? "border border-primary text-primary" : ""}
                   `}
              >
                {format(day, "d")}
                {hasEvent && !isSelected && (
                  <div
                    className={`absolute -bottom-2 size-2 bg-primary rounded-full`}
                  />
                )}
                {hasRace && !isSelected && (
                  <div
                    className={`absolute -bottom-2.5 size-3 bg-destructive rounded-full border border-white`}
                  />
                )}
                {hasReco && !isSelected && (
                  <div
                    className={`absolute -bottom-2 size-2 bg-destructive/70 rounded-full`}
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
