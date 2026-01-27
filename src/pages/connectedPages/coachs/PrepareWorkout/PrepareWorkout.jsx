import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PrepareWorkoutPage() {
  const { athleteId } = useParams(); // Récupère l'ID depuis l'URL
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAthlete() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", athleteId)
        .single();

      if (!error) setAthlete(data);
      setLoading(false);
    }
    fetchAthlete();
  }, [athleteId]);

  if (loading) return <p>Chargement du profil athlète...</p>;

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-20">
      {/* HEADER DE L'ATHLÈTE : Le coach sait sur qui il bosse */}
      <div className="flex items-center gap-4 bg-card p-6 rounded-3xl border border-muted shadow-sm">
        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center font-black text-primary">
          {athlete?.username?.charAt(0)}
        </div>
        <div>
          <h1 className="text-xl font-black">
            Programmation pour {athlete?.username}
          </h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
            Objectif : {athlete?.goal || "Non défini"}
          </p>
        </div>
      </div>

      {/* TON CALENDRIER ICI */}
      <CalendarView athleteId={athleteId} />

      {/* TON FORMULAIRE ICI */}
      <WorkoutForm athleteId={athleteId} onSubmit={""} />
    </div>
  );
}
