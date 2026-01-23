/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useUserStore } from "@/store/user/useUserStore";
import {
  getMyAthletes,
  acceptAthlete,
  removeAthleteFromTeam,
} from "@/services/coachTeam";
import { toast } from "sonner";

export function useCoachTeam() {
  const { user } = useUserStore();
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour charger la liste
  const fetchTeam = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const data = await getMyAthletes(user.id);
      setAthletes(data);
    } catch (err) {
      toast.error("Impossible de charger ta team");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Chargement initial
  useEffect(() => {
    fetchTeam();
  }, [user?.id]);

  // Action : Accepter un athlète
  const handleAccept = async (athleteId) => {
    try {
      await acceptAthlete(athleteId);
      // Optimistic UI : on met à jour localement sans recharger
      setAthletes((prev) =>
        prev.map((a) =>
          a.id === athleteId ? { ...a, link_status: "active" } : a,
        ),
      );
      toast.success("Athlète accepté dans la team !");
    } catch (err) {
      toast.error("Erreur lors de l'acceptation");
      console.error(err);
    }
  };

  // Action : Retirer (ou refuser) un athlète
  const handleRemove = async (athleteId) => {
    try {
      await removeAthleteFromTeam(athleteId);
      // On filtre pour l'enlever de la liste locale
      setAthletes((prev) => prev.filter((a) => a.id !== athleteId));
      toast.success("Opération réussie");
    } catch (err) {
      toast.error("Erreur lors du retrait");
      console.error(err);
    }
  };

  // On sépare le grain de l'ivraie pour le composant
  return {
    activeAthletes: athletes.filter((a) => a.link_status === "active"),
    pendingAthletes: athletes.filter((a) => a.link_status === "pending"),
    loading,
    handleAccept,
    handleRemove,
    refresh: fetchTeam,
  };
}
