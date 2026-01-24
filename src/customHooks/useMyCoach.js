/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useUserStore } from "@/store/user/useUserStore";
import {
  getCoachById,
  getUserLinkStatus,
  linkCoachByCode,
  unlinkCoach,
} from "@/services/linkCoachAthlete";
import { toast } from "sonner";

export function useMyCoach() {
  const { user, login, updateUser } = useUserStore();

  const [state, setState] = useState({
    data: null,
    loading: true,
  });



  // 1. Gestion de la récupération des données
  useEffect(() => {
    if (!user?.coach_id) {
      if (state.data !== null || state.loading !== false) {
        setState({ data: null, loading: false });
      }
      return;
    }

    // Fetching logic...
    setState((prev) => ({ ...prev, loading: true }));

    getCoachById(user.coach_id)
      .then((data) => {
        setState({ data, loading: false });
      })
      .catch(() => {
        toast.error("Impossible de charger les infos du coach");
        setState({ data: null, loading: false });
      });
  }, [user?.coach_id]);

  // 2. Logique pour lier un coach
  const handleLink = async (code) => {
    try {
      const coach = await linkCoachByCode(user.id, code);

      updateUser({
        coach_id: coach.id,
        link_status: "pending",
      });

      toast.success("Demande envoyée au coach !");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // 3. Logique pour délier un coach
  const handleUnlink = async () => {
    try {
      await unlinkCoach(user.id);
      login({ ...user, coach_id: null });
      toast.success("Tu n'as plus de coach. Liberté !");
    } catch (err) {
      toast.error("Échec de la séparation...");
      console.error(err);
    }
  };

  // 4. Refresh status

  const refreshStatus = async (showToast = false) => {
    if (!user?.id) return;
    try {
      // Appel au service (Couche Data)
      const data = await getUserLinkStatus(user.id);

      // Mise à jour du Store (Couche État)
      updateUser({
        coach_id: data.coach_id,
        link_status: data.link_status,
      });
     if (showToast === true) {console.log("DEBUG: Tentative d'affichage du toast...");
       toast.success("Statut mis à jour!!!");
     }
    } catch (err) {
      toast.error("Erreur de synchronisation");
      console.error(err);
    }
  };

  // 5. UN SEUL RETURN à la fin
  return {
    coachData: state.data,
    loading: state.loading,
    handleLink,
    handleUnlink,
    refreshStatus,
    isLinked: !!user?.coach_id,
  };

  //  5. refresh status
}
