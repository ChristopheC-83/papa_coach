import React from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useUserStore } from "@/store/user/useUserStore";
import { AVAILABLE_SPORTS } from "@/constants/Profile/sports";
import { updateProfile } from "@/services/users";

export default function SportSelector() {
  const user = useUserStore((state) => state.user);
  const updateUserStore = useUserStore((state) => state.updateUser);

  const selectedSports = user?.favorite_sports || [];

  const handleToggleSport = async (sportId) => {
    let updatedSports;

    // 1. Logique de toggle
    if (selectedSports.includes(sportId)) {
      updatedSports = selectedSports.filter((id) => id !== sportId);
    } else {
      if (selectedSports.length >= 3) {
        toast.error("Maximum 3 sports autorisés");
        return;
      }
      updatedSports = [...selectedSports, sportId];
    }

    try {
      // 2. Appel du service universel
      await updateProfile(user.id, { favorite_sports: updatedSports });

      // 3. Mise à jour du store pour le rafraîchissement global
      updateUserStore({ favorite_sports: updatedSports });

      toast.success("Sports mis à jour !");
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde");
      console.error("Erreur technique :", error.message);
    }
  };

  return (
    <section className="bg-card border border-muted rounded-3xl px-3 py-6 shadow-sm">
      <h3 className="text-center mb-6 font-black uppercase italic text-sm tracking-widest">
        Mes 3 Sports Prioritaires
      </h3>

      <div className="flex flex-wrap gap-4 justify-center">
        {AVAILABLE_SPORTS.map((sport) => {
          const isSelected = selectedSports.includes(sport.id);
          const isMaxReached = selectedSports.length >= 3 && !isSelected;

          return (
            <button
              key={sport.id}
              type="button"
              disabled={isMaxReached}
              onClick={() => handleToggleSport(sport.id)}
              className={cn(
                "flex items-center justify-around gap-2 px-2 py-2.5 rounded-full border-2 transition-all duration-200",
                "font-bold text-[11px] uppercase tracking-widest w-5/12 h-24",
                isSelected
                  ? "border-primary bg-primary/10 text-primary scale-105 shadow-md"
                  : "border-muted bg-transparent text-muted-foreground hover:border-muted-foreground",
                isMaxReached && "opacity-20 cursor-not-allowed grayscale",
              )}
            >
              <span className="w-2 text-base">{sport.icon}</span>
              {sport.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center">
        <span className="bg-secondary/50 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
          {selectedSports.length} / 3 sélectionnés
        </span>
      </div>
    </section>
  );
}
