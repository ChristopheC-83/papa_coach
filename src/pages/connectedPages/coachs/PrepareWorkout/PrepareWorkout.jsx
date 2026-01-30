import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import { FiArrowLeft } from "react-icons/fi";

// Services et composants
import { getAthleteById } from "@/services/coachTeam";
import { resetWorkoutFeedback, workoutService } from "@/services/workouts";
import { AVAILABLE_SPORTS } from "@/constants/Profile/sports";
import { useUserStore } from "@/store/user/useUserStore";

// Tes sous-composants découpés
import SelectectedAthlete from "../WorkoutForm/components/SelectectedAthlete";
import ExistingsWorkout from "../WorkoutForm/components/ExistingsWorkout";
import AtCreateWorkout from "../WorkoutForm/components/AtCreateWorkout";
import CalendarWorkout from "../../athletes/MyWorkout/components/CalendarWorkout/CalendarWorkout";
import ValidatedZone from "../../athletes/MyWorkout/components/TrainingDay/components/ValidatedZone/ValidatedZone";
import WeeklyView from "./components/WeeklyView";

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
  const [trainings, setTrainings] = useState([]);

  // --- 1. CHARGEMENT DE L'ATHLÈTE (Pour sortir du mode Loading) ---
  useEffect(() => {
    async function loadAthlete() {
      if (!athleteId) return;
      try {
        setLoading(true);
        const athleteData = await getAthleteById(athleteId);
        setAthlete(athleteData);
      } catch (err) {
        console.error("Erreur chargement athlète:", err);
      } finally {
        setLoading(false); // <--- Libère l'affichage
      }
    }
    loadAthlete();
  }, [athleteId]);

  // --- 2. CHARGEMENT DES SÉANCES (Indépendant du loading de la page) ---
  useEffect(() => {
    async function fetchWorkouts() {
      if (!athleteId || loading) return;
      try {
        const start = new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          1,
        );
        const end = new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + 1,
          0,
        );

        const data = await workoutService.getAthleteProgram(
          athleteId,
          start,
          end,
        );
        setTrainings(data);
      } catch (err) {
        console.error("Erreur fetch workouts:", err);
      }
    }
    fetchWorkouts();
  }, [athleteId, currentMonth, loading]);

  // --- 3. HANDLERS (CRUD) ---

  // Sauvegarde (Création OU Modification)
  const handleSaveWorkout = async (formData, existingId) => {
    try {
      let result;
      if (existingId) {
        // MODE UPDATE
        result = await workoutService.updateWorkout(existingId, formData);
        setTrainings(
          trainings.map((t) => (t && t.id === existingId ? result : t)),
        );
      } else {
        // MODE CREATE
        result = await workoutService.createWorkout({
          ...formData,
          athlete_id: athleteId,
          coach_id: user.id,
        });
        setTrainings([...trainings, result]);
      }
      setIsCreating(false);
    } catch (error) {
      alert("Erreur de sauvegarde");
      console.error("Détails :", error.message);
    }
  };

  // Dans ton composant PrepareWorkout.jsx

  const handleReset = async (workoutId) => {
    // 1. Demande de confirmation (Simple mais efficace)
    const confirmReset = window.confirm(
      "⚠️ ATTENTION : Tu vas supprimer définitivement le débriefing de l'athlète. Cette action est irréversible. Continuer ?",
    );

    if (!confirmReset) return;

    try {
      // 2. Appel au service
      const updatedWorkout = await resetWorkoutFeedback(workoutId, user.role);

      // 3. Mise à jour de l'état local (pour que l'UI réagisse direct sans recharger la page)
      setTrainings((prev) =>
        prev.map((t) => (t.id === workoutId ? updatedWorkout : t)),
      );

      // Optionnel : un petit feedback visuel
      alert("Le débriefing a été réinitialisé !");
    } catch (error) {
      console.error("Erreur lors du reset:", error.message);
      alert("Erreur technique lors de la réinitialisation.");
    }
  };

  // Suppression
  const handleDeleteWorkout = async (id) => {
    try {
      await workoutService.deleteWorkout(id);
      setTrainings(trainings.filter((t) => t && t.id !== id));
    } catch (error) {
      alert("Erreur de suppression");
      console.error("Détails :", error.message);
    }
  };

  // --- 4. LOGIQUE DE VUE ---
  const existingWorkout = trainings?.find(
    (t) => t && t.date && isSameDay(new Date(t.date), selectedDate),
  );

  const sports = (athlete?.favorite_sports || [])
    .map((id) => AVAILABLE_SPORTS.find((s) => s.id === id))
    .filter(Boolean);

  if (loading) {
    return (
      <div className="p-10 text-center animate-pulse text-primary font-bold">
        Initialisation du chantier...
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto mt-5 space-y-6 pb-24 px-2">
      {/* NAVIGATION */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all text-xs font-bold uppercase tracking-widest cursor-pointer"
      >
        <FiArrowLeft /> Ma Team
      </button>

      {/* HEADER ATHLÈTE */}
      <SelectectedAthlete athlete={athlete} sports={sports} />

      {/* CALENDRIER */}
      <div className="flex justify-center">
        <CalendarWorkout
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          selectedDate={selectedDate}
          setSelectedDate={(date) => {
            setSelectedDate(date);
            setIsCreating(false);
          }}
          trainings={trainings}
          races={[]} // À connecter plus tard
          recos={[]} // À connecter plus tard
        />
      </div>

      {/*  LA VUE HEBDO */}
      <WeeklyView
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        trainings={trainings}
      />

      {/* ZONE D'ACTION */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-black uppercase italic tracking-tighter">
            {format(selectedDate, "eeee dd MMMM", { locale: fr })}
          </h2>
        </div>

        {existingWorkout ? (
          <>
            {/* SI COMPLÉTÉE : On affiche d'abord le feedback de l'athlète */}
            {existingWorkout.is_completed !== null && (
              <ValidatedZone
                activeActivity={existingWorkout}
                feedback={existingWorkout.athlete_feedback}
              />
            )}

            {/* ENSUITE : Le détail de la séance (modifiable ou non) */}
            {!isCreating ? (
              <ExistingsWorkout
                existingWorkout={existingWorkout}
                onDelete={handleDeleteWorkout}
                onEdit={() => setIsCreating(true)}
              />
            ) : (
              <AtCreateWorkout
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                selectedDate={selectedDate}
                existingWorkout={existingWorkout}
                handleCreateWorkout={handleSaveWorkout}
              />
            )}

            {/* BOUTON RESET (Optionnel, uniquement si complété) */}
            {existingWorkout.is_completed !== null && (
              <button
                onClick={() => handleReset(existingWorkout.id)}
                className="w-full py-3 bg-destructive/10 text-destructive rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-destructive hover:text-white transition-all mt-4 cursor-pointer"
              >
                ⚠️ Réinitialiser le débriefing
              </button>
            )}
          </>
        ) : (
          <AtCreateWorkout
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            selectedDate={selectedDate}
            handleCreateWorkout={handleSaveWorkout}
          />
        )}
      </div>
    </div>
  );
}
