import React from 'react'
import { format,addMonths, subMonths } from "date-fns";
import { fr } from "date-fns/locale";
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";



export default function CalendarWorkoutHeader({ currentMonth, setCurrentMonth }) {
  return (
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
  );
}
