import React from "react";
import { useUserStore } from "@/store/user/useUserStore";
import PrepareWorkout from "../PrepareWorkout/PrepareWorkout";

// Ce composant est une simple enveloppe (Wrapper)
// Il réutilise toute la logique de PrepareWorkout mais pour le Coach lui-même

export default function MyCoachWorkout() {
  const user = useUserStore((state) => state.user);

  if (!user?.id) return null;

  return (
    <div className="animate-in fade-in duration-500">
      <PrepareWorkout overrideAthleteId={user.id} />
    </div>
  );
}
