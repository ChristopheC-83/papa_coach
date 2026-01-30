/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import TitlePage from "@/components/custom/TitlePage";
import { FiCalendar } from "react-icons/fi";
import { isSameDay, startOfMonth, endOfMonth } from "date-fns";
import { useUserStore } from "@/store/user/useUserStore";
import { workoutService } from "@/services/workouts";
import CalendarWorkout from "./components/CalendarWorkout/CalendarWorkout";
import TrainingDay from "./components/TrainingDay/TrainingDay";
import WeeklyView from "../../coachs/PrepareWorkout/components/WeeklyView";

export default function MyWorkout() {
  const user = useUserStore((state) => state.user);

  // --- ÉTATS ---
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH DES DONNÉES REELLES ---
  useEffect(() => {
    async function fetchAthleteData() {
      if (!user?.id) return;

      try {
        setLoading(true);
        // On définit la plage du mois en cours pour le fetch
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);

        // Appel au service (On récupère les workouts)
        const data = await workoutService.getAthleteProgram(
          user.id,
          start,
          end,
        );
        setTrainings(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du planning:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAthleteData();
  }, [user?.id, currentMonth]); // Se relance si on change de mois ou d'utilisateur

  // --- LOGIQUE DE SÉLECTION ---
  // On cherche dans le state 'trainings' chargé depuis Supabase
  const selectedSession = trainings.find((session) =>
    isSameDay(new Date(session.date), selectedDate),
  );


  // On isole la fonction de chargement
  async function refreshData() {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const data = await workoutService.getAthleteProgram(user.id, start, end);
    setTrainings(data);
  }

  useEffect(() => {
    refreshData();
  }, [currentMonth]);

  return (
    <div className="w-full md:w-fit max-w-4xl mx-auto mt-5 p-4 space-y-6 pb-24 ">
      <TitlePage titlePage="Planning" iconPage={<FiCalendar />} />

      {loading ? (
        <div className="flex justify-center p-20 animate-pulse font-black uppercase text-primary">
          Synchronisation de tes efforts...
        </div>
      ) : (
        <div className="w-full mx-auto flex max-lg:flex-col justify-between gap-4 max-lg:items-center">
          <div className="flex flex-col">
            <CalendarWorkout
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              trainings={trainings} 
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            {/*  LA VUE HEBDO */}
            <WeeklyView
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              trainings={trainings}
            />
          </div>

          <TrainingDay
            selectedDate={selectedDate}
            selectedSession={selectedSession}
            // selectedRace={selectedRace}
            // selectedReco={selectedReco}
            // On peut ajouter ici une fonction de refresh si l'athlète valide sa séance
            onRefresh={refreshData}
          />
        </div>
      )}
    </div>
  );
}
