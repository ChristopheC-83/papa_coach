import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import {
  FiArrowLeft,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiInfo,
} from "react-icons/fi";

// Tes services et composants
import { getAthleteById } from "@/services/coachTeam";
import { workoutService } from "@/services/workouts";
import { AVAILABLE_SPORTS } from "@/constants/Profile/sports";
import CalendarWorkout from "../../athletes/MyWorkout/components/CalendarWorkout";
import WorkoutForm from "../WorkoutForm/WorkoutForm";
import { useUserStore } from "@/store/user/useUserStore";

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
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6 pb-24">
      {/* 1. NAVIGATION & RETOUR */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all text-xs font-bold uppercase tracking-widest"
      >
        <FiArrowLeft /> Ma Team
      </button>

      {/* 2. HEADER ATHLÈTE */}
      <div className="bg-card border border-muted p-5 rounded-3xl flex items-center gap-4 shadow-sm">
        <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-primary/20 shrink-0">
          {athlete?.username?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-black truncate">{athlete?.username}</h1>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
            Objectif : {athlete?.goal || "Performance"}
          </p>
        </div>
        <div className="flex gap-1 shrink-0">
          {sports.map((s) => (
            <span key={s.id} title={s.label} className="text-xl opacity-80">
              {s.icon}
            </span>
          ))}
        </div>
      </div>

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
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-black uppercase italic tracking-tighter">
            {format(selectedDate, "eeee dd MMMM", { locale: fr })}
          </h2>
        </div>

        {existingWorkout ? (
          /* --- SÉANCE TROUVÉE --- */
          <div className="bg-card border border-muted p-6 rounded-3xl shadow-sm border-l-4 border-l-primary">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                  {existingWorkout.tag}
                </span>
                <h3 className="text-xl font-black leading-tight">
                  {existingWorkout.title}
                </h3>
                <p className="text-xs text-muted-foreground font-bold">
                  {existingWorkout.duration}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-3 bg-secondary/50 rounded-xl hover:text-primary transition-all">
                  <FiEdit2 />
                </button>
                <button className="p-3 bg-secondary/50 rounded-xl hover:text-destructive transition-all">
                  <FiTrash2 />
                </button>
              </div>
            </div>
            <div className="space-y-2 border-t border-muted/50 pt-4">
              {existingWorkout.steps?.map((step, i) => (
                <div
                  key={i}
                  className={`text-xs p-2 rounded-lg ${step.highlight ? "bg-primary/5 border border-primary/10" : ""}`}
                >
                  <span className="font-bold text-primary mr-2">—</span>{" "}
                  {step.title}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* --- AUCUNE SÉANCE --- */
          <div className="space-y-4">
            {!isCreating ? (
              <div className="bg-secondary/10 border-2 border-dashed border-muted rounded-3xl p-10 text-center">
                <p className="text-sm text-muted-foreground italic mb-6">
                  Journée de repos ou séance à programmer.
                </p>
                <button
                  onClick={() => setIsCreating(true)}
                  className="mx-auto flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 active:scale-95 transition-all"
                >
                  <FiPlus /> CRÉER UN ENTRAÎNEMENT
                </button>
              </div>
            ) : (
              <div className="animate-in zoom-in-95 duration-200">
                <WorkoutForm
                  initialDate={selectedDate}
                  onSubmit={handleCreateWorkout}
                  onCancel={() => setIsCreating(false)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
