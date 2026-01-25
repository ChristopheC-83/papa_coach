import React, { useState } from "react";
import TitlePage from "@/components/custom/TitlePage";
import { FiCalendar, FiCheckCircle } from "react-icons/fi";
import {  isSameDay, subDays } from "date-fns";

import CalendarWorkoutHeader from "./components/CalendarWorkoutHeader";
import CalendarWorkout from "./components/CalendarWorkout";
import TrainingDay from "./components/TrainingDay";

export default function MyWorkout() {
  // --- LOGIQUE CALENDRIER ---
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Exemple d'entrainement et courses à remplacer par datas de supabase

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

  const recoExamples = racesExamples.map((course) => {
    return {
      ...course, 
      date: subDays(course.date, 1), 
      title: `Reco : ${course.location}`, 
    };
  });

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



  const selectedSession = sessionsExamples.find((session) =>
    isSameDay(session.date, selectedDate),
  );

  const selectedRace = racesExamples.find((race) =>
    isSameDay(race.date, selectedDate),
  );


  const selectedReco = recoExamples.find((reco) =>
    isSameDay(reco.date, selectedDate),
  );

  return (
    <div className="w-fit max-w-4xl mx-auto mt-5 p-4 space-y-6 pb-24 ">
      <TitlePage titlePage="Planning" iconPage={<FiCalendar />} />

      <div className="w-full mx-auto flex max-lg:flex-col justify-between gap-4 max-lg:items-center">
        {/*  calendrier / date picker */}
        <CalendarWorkout
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          trainings={sessionsExamples}
          races={racesExamples}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          recos={recoExamples}
        />
        {/*  la séance du jour */}
        <TrainingDay
          selectedDate={selectedDate}
          selectedSession={selectedSession}
          selectedRace={selectedRace}
          selectedReco={selectedReco}
        />
      </div>
    </div>
  );
}
