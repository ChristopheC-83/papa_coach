import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import {
  FiArrowLeft,
} from "react-icons/fi";

// Tes services et composants
import { getAthleteById } from "@/services/coachTeam";
import { workoutService } from "@/services/workouts";
import { AVAILABLE_SPORTS } from "@/constants/Profile/sports";
import CalendarWorkout from "../../athletes/MyWorkout/components/CalendarWorkout";
import { useUserStore } from "@/store/user/useUserStore";
import SelectectedAthlete from "../WorkoutForm/components/SelectectedAthlete";
import ExistingsWorkout from "../WorkoutForm/components/ExistingsWorkout";
import AtCreateWorkout from "../WorkoutForm/components/AtCreateWorkout";

export default function PrepareWorkout() {
  const { athleteId } = useParams();
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  // --- ÉTATS ---
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCreating, setIsCreating] = useState(false);

  // Séances (on les initialise vides)
  const [trainings, setTrainings] = useState([]);

  // --- CHARGEMENT INITIAL (L'athlète) ---
  useEffect(() => {
    async function loadData() {
      try {
        const athleteData = await getAthleteById(athleteId);
        setAthlete(athleteData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [athleteId]);

  // --- LOGIQUE : TROUVER LA SÉANCE DU JOUR ---
  const existingWorkout = trainings.find((t) =>
    isSameDay(new Date(t.date), selectedDate),
  );

  // --- HANDLERS ---
  const handleCreateWorkout = async (formData) => {
    try {
      // Appel au service (on rajoute les IDs manquants)
      const newWorkout = await workoutService.createWorkout({
        ...formData,
        athlete_id: athleteId,
        coach_id: user.id,
      });

      console.log("newWorkout :", newWorkout);

      setTrainings([...trainings, newWorkout]);
      setIsCreating(false);
    } catch (error) {
      alert("Erreur lors de la création");
      console.error("Détails :", error.message);
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center animate-pulse text-primary font-bold">
        Initialisation du chantier...
      </div>
    );

  // Calcul des sports favoris pour le header
  const sports = (athlete?.favorite_sports || [])
    .map((id) => AVAILABLE_SPORTS.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <div className="w-full max-w-md mx-auto mt-5 space-y-6 pb-24 ">
      {/* 1. NAVIGATION & RETOUR */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all text-xs font-bold uppercase tracking-widest cursor-pointer"
      >
        <FiArrowLeft /> Ma Team
      </button>

      {/* 2. HEADER ATHLÈTE */}

      <SelectectedAthlete athlete={athlete} sports={sports} />

      {/* 3. CALENDRIER */}
      <div className="flex justify-center">
        <CalendarWorkout
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          selectedDate={selectedDate}
          setSelectedDate={(date) => {
            setSelectedDate(date);
            setIsCreating(false); // On ferme le formulaire si on change de jour
          }}
          trainings={trainings}
          races={[]} // À hydrater plus tard
          recos={[]} // À hydrater plus tard
        />
      </div>

      {/* 4. ZONE D'ACTION (La séance du jour) */}
      <div className="space-y-4 pt-2 w-full max-w-md mx-auto">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-black uppercase italic tracking-tighter">
            {format(selectedDate, "eeee dd MMMM", { locale: fr })}
          </h2>
        </div>

        {existingWorkout ? (
          /* --- SÉANCE TROUVÉE --- */
          <ExistingsWorkout existingWorkout={existingWorkout} />
        ) : (
          /* --- AUCUNE SÉANCE --- */
          <AtCreateWorkout
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            selectedDate={selectedDate}
            handleCreateWorkout={handleCreateWorkout}
          />
        )}
      </div>
    </div>
  );
}
