import { useState } from "react";
import { toast } from "sonner";
import { useUserStore } from "@/store/user/useUserStore";
import { updateProfile } from "@/services/users";
import { AVAILABLE_SPORTS } from "@/constants/Profile/sports";
import Spe from "./components/Spe";
import { AVAILABLE_EXPERTISES } from "@/constants/Profile/expertises";
import { Link } from "react-router-dom";
import BiographyForm from "./components/BiographyForm";

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
        <BiographyForm text={text} setText={setText} handleSave={handleSave} />

        {/* 2. LA SPÉCIALISATION (Visuelle, pas de texte libre !) */}
        <section className="bg-card border border-muted rounded-3xl p-8">
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
