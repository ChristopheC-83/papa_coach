import { useState } from "react";
import { toast } from "sonner";
import { useUserStore } from "@/store/user/useUserStore";
import { updateProfile } from "@/services/users";
import { AVAILABLE_SPORTS } from "@/constants/Profile/sports";
import Spe from "./components/Spe";
import { AVAILABLE_EXPERTISES } from "@/constants/Profile/expertises";
import { Link } from "react-router-dom";

export default function Biography() {
  const { user, updateUser } = useUserStore();
  const [text, setText] = useState(user?.bio || "");

  console.log(user);
  const handleSave = async () => {
    try {
      await updateProfile(user.id, { bio: text });
      updateUser({ bio: text });
      toast.success("Profil mis à jour");
    } catch (error) {
      toast.error("Erreur de sauvegarde");
      console.error("Détails :", error.message);
    }
  };

  return (
    <section className="w-full max-w-lg mx-auto mt-5 p-4 space-y-8 pb-24">
      <div className="space-y-8">
        {/* 1. LA BIOGRAPHY (Le texte libre) */}
        <section className="bg-card border border-muted rounded-[2.5rem] p-8">
          <h3 className="font-black uppercase italic text-[10px] mb-4 tracking-widest text-primary">
            Ma Philosophie
          </h3>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full min-h-37.5 bg-secondary/10 rounded-2xl p-4 text-sm border-none focus:ring-1 focus:ring-primary"
            placeholder="Décris ta méthode, tes diplômes..."
          />
          <button
            onClick={handleSave}
            className="w-full mt-4 py-4 bg-foreground text-background rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] transition-transform"
          >
            Enregistrer ma Bio
          </button>
        </section>

        {/* 2. LA SPÉCIALISATION (Visuelle, pas de texte libre !) */}
        <section className="bg-card border border-muted rounded-[2.5rem] p-8">
          <Spe
            title={"Mes Sports de prédilections"}
            description={
              "Ces sports apparaîtront sur ton profil public d'entraîneur."
            }
            user={user}
            idName={"favorite_sports"}
            datasArray={AVAILABLE_SPORTS}
          />
          <Spe
            title={"Mes Spécialisations"}
            description={
              "Ces spécilalités apparaîtront sur ton profil public d'entraîneur."
            }
            user={user}
            idName={"specialities"}
            datasArray={AVAILABLE_EXPERTISES}
          />
          <Link to="/athlete/profile">
            <h4 className="mt-4 text-[14px] text-center text-muted-foreground italic">
              Modifier ces spé dans votre profil
            </h4>
          </Link>
        </section>
      </div>
    </section>
  );
}
