import React from "react";
import { useCoachTeam } from "@/customHooks/useCoachTeam";
import TitlePage from "@/components/custom/TitlePage";
import {
  FiUsers,
} from "react-icons/fi";
import { ModalInvitation } from "./components/ModalInvitation";
import AthletesWaiting from "./components/AthletesWaiting";
import AthletesActive from "./components/AthletesActive";

export default function Athletes() {
  const {
    activeAthletes,
    pendingAthletes,
    loading,
    handleAccept,
    handleRemove,
  } = useCoachTeam();

  if (loading)
    return (
      <div className="p-10 text-center animate-pulse text-primary font-medium">
        Chargement de ta team...
      </div>
    );

  return (
    <div className="w-full max-w-2xl mx-auto mt-5 p-4 space-y-8 pb-20">
      <div className="w-full flex justify-between">
        <TitlePage titlePage="Ma Team" iconPage={<FiUsers />} />
        <ModalInvitation />
      </div>

      {/* --- SECTION : DEMANDES EN ATTENTE (Le sas d'entrée) --- */}
      {pendingAthletes.length > 0 && (
        <AthletesWaiting
          pendingAthletes={pendingAthletes}
          handleAccept={handleAccept}
          handleRemove={handleRemove}
        />
      )}

      {/* --- SECTION : LISTE OFFICIELLE (La Team active) --- */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold px-1 flex items-center justify-between">
          Athlètes Actifs
          <span className="text-xs bg-secondary px-2 py-1 rounded-full text-muted-foreground">
            {activeAthletes.length}
          </span>
        </h2>

        {activeAthletes.length === 0 ? (
          <div className="text-center p-12 bg-secondary/20 rounded-3xl border-2 border-dashed border-muted/50">
            <p className="text-sm text-muted-foreground italic">
              Ta liste d'athlètes est vide.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {activeAthletes.map((athlete) => (
              <AthletesActive
                key={athlete.id}
                athlete={athlete}
                handleRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
