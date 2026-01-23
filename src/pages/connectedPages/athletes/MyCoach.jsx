import TitlePage from "@/components/custom/TitlePage";
import { FiClock, FiMail, FiUser, FiRefreshCw } from "react-icons/fi";
import CoachCard from "./CoachCard";
import LinkCoachForm from "./LinkCoachForm";
import { useMyCoach } from "@/customHooks/useMyCoach";
import { useUserStore } from "@/store/user/useUserStore";

export default function MyCoach() {
  const { user } = useUserStore();
  const { coachData, loading, handleLink, handleUnlink, refreshStatus } =
    useMyCoach();
  console.log(user?.link_status);
  if (loading)
    return <div className="p-10 text-center animate-pulse">Chargement...</div>;

  // CAS 1 : Pas de coach du tout
  if (!user?.coach_id) {
    return <LinkCoachForm onLink={handleLink} />;
  }

  // CAS 2 : En attente de validation
  if (user?.link_status === "pending") {
    return (
      <>
        <button
          onClick={refreshStatus}
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
      </>
    );
  }
  // CAS 3 : Coach actif (le code que tu as déjà)
  return <CoachCard coach={coachData} onUnlink={handleUnlink} />;
}
