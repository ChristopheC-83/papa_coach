import React from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function WeeklyView({
  selectedDate,
  setSelectedDate,
  trainings,
}) {
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="px-1 space-y-3 mt-4">
      <h3 className="font-black italic uppercase text-xl tracking-tighter">
        Planning Hebdo
      </h3>

      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {/* On réduit l'espace entre les cartes */}
          {weekDays.map((day, idx) => {
            const isSelected = isSameDay(day, selectedDate);
            const workout = trainings?.find(
              (t) => t && t.date && isSameDay(new Date(t.date), day),
            );

            return (
              <CarouselItem
                key={idx}
                className="pl-2 basis-1/5" // C'est ICI qu'on définit les 4 jours (1/4)
              >
                <button
                  onClick={() => setSelectedDate(day)}
                  className={`
                    w-full aspect-4/5 p-3 rounded-3xl transition-all border flex flex-col justify-between
                    ${
                      isSelected
                        ? "bg-primary text-white border-primary shadow-lg scale-105 z-10"
                        : "bg-card border-muted hover:border-primary/50"
                    }
                  `}
                >
                  <div className="flex flex-col items-start">
                    <span
                      className={`text-[9px] font-bold uppercase ${isSelected ? "text-white/70" : "text-muted-foreground"}`}
                    >
                      {format(day, "eee", { locale: fr })}
                    </span>
                    <span className="text-sm font-black italic">
                      {format(day, "d")}
                    </span>
                  </div>

                  <div className="flex flex-col items-start w-full overflow-hidden">
                    {workout ? (
                      <>
                        <div
                          className={`size-1.5 rounded-full mb-1 ${isSelected ? "bg-white" : "bg-primary"}`}
                        />
                        <span className="text-[9px] font-black leading-tight truncate w-full">
                          {workout.duration}
                        </span>
                      </>
                    ) : (
                      <span className="text-[9px] font-bold opacity-20 italic">
                        Repos
                      </span>
                    )}
                  </div>
                </button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
