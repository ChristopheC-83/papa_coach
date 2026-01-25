import React, { useState } from "react";
import TitlePage from "@/components/custom/TitlePage";
import { FiCalendar, FiCheckCircle } from "react-icons/fi";
import {  isSameDay } from "date-fns";

import CalendarWorkoutHeader from "./components/CalendarWorkoutHeader";
import CalendarWorkout from "./components/CalendarWorkout";
import TrainingDay from "./components/TrainingDay";

export default function MyWorkout() {
  // --- LOGIQUE CALENDRIER ---
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // const monthStart = startOfMonth(currentMonth);
  // const monthEnd = endOfMonth(monthStart);
  // const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  // const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  // const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  

  // --- MOCK DATA (À remplacer par Supabase) ---

  const racesExamples = [
    {
      date: new Date(new Date().setDate(new Date().getDate() - 7)),
      location: "Nimes",
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 4)),
      location: "Sommières",
    },
  ];

  const sessionsExamples = [
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

  const selectedSession = sessionsExamples.find((s) =>
    isSameDay(s.date, selectedDate),
  );

  return (
    <div className="w-fit max-w-4xl mx-auto mt-5 p-4 space-y-6 pb-24 ">
     
        <TitlePage titlePage="Planning" iconPage={<FiCalendar />} />
  
      <div className="w-full mx-auto flex max-lg:flex-col justify-between gap-4 max-lg:items-center ">
        {/*  calendrier / date picker */}
        <CalendarWorkout
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          trainings={sessionsExamples}
          races={racesExamples}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        {/*  la séance du jour */}
        <TrainingDay
          selectedDate={selectedDate}
          selectedSession={selectedSession}
        />
      </div>
    </div>
  );
}
