/* eslint-disable react-hooks/exhaustive-deps */
import TitlePage from "@/components/custom/TitlePage";
import { FiClock, FiRefreshCw } from "react-icons/fi";
import CoachCard from "./components/CoachCard";
import LinkCoachForm from "./components/LinkCoachForm";
import { useMyCoach } from "@/customHooks/useMyCoach";
import { useUserStore } from "@/store/user/useUserStore";
import { useEffect } from "react";
import { LuDumbbell } from "react-icons/lu";
import CoachSpe from "./components/CoachSpe";

export default function MyCoach() {
  const { user } = useUserStore();
  const { coachData, loading, handleLink, handleUnlink, refreshStatus } =
    useMyCoach();
  
  
    useEffect(() => {
        refreshStatus();
      
    }, []);
  
  if (loading)
    return <div className="p-10 text-center animate-pulse">Chargement...</div>;

  // CAS 1 : Pas de coach du tout
  if (!user?.coach_id) {
    return (
      <div className="w-full max-w-md mx-auto mt-5 p-4 space-y-8 pb-24">
        <TitlePage titlePage="Mon Coach" iconPage={<LuDumbbell />} />
        <LinkCoachForm onLink={handleLink} />
      </div>
    );
  }

  // CAS 2 : En attente de validation
  if (user?.link_status === "pending") {
    return (
      <div className="w-full max-w-md mx-auto mt-5 p-4 space-y-8 pb-24">
        <TitlePage titlePage="Mon Coach" iconPage={<LuDumbbell />} />
        <button
          onClick={() => refreshStatus(true)}
          className="flex items-center gap-2 mx-auto mt-4 px-4 py-2 bg-secondary rounded-full text-sm font-medium active:scale-95 transition-all"
        >
          <FiRefreshCw size={14} /> Vérifier la validation
        </button>
        <div className="w-full max-w-md mx-auto mt-10 p-6 bg-card border border-orange-200 rounded-3xl text-center shadow-sm animate-in fade-in zoom-in">
          <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiClock className="text-orange-600 text-2xl animate-spin-slow" />
          </div>
          <h2 className="text-xl font-bold text-orange-700">
            Demande envoyée !
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            Ton coach (<strong>{coachData?.username}</strong>) doit maintenant
            valider ta demande pour commencer le suivi.
          </p>

          <button
            onClick={handleUnlink}
            className="mt-6 text-xs text-muted-foreground hover:text-destructive underline"
          >
            Annuler la demande
          </button>
        </div>
      </div>
    );
  }
  // CAS 3 : Coach actif (le code que tu as déjà)
  return (
    <div className="w-full md:w-fit max-w-4xl mx-auto mt-5 p-4 space-y-6 pb-24 ">
      <TitlePage titlePage="Mon Coach" iconPage={<LuDumbbell />} />

      <div className="w-full mx-auto flex max-lg:flex-col justify-between gap-4 max-lg:items-center">
        <CoachCard coach={coachData} onUnlink={handleUnlink} />
        <CoachSpe coach={coachData} />
      </div>
    </div>
  );
}
