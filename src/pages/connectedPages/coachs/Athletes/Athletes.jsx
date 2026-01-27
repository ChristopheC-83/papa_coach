import React from "react";
import { useCoachTeam } from "@/customHooks/useCoachTeam";
import TitlePage from "@/components/custom/TitlePage";
import {
  FiUsers,
  FiUserMinus,
  FiExternalLink,
  FiCopy,
  FiCheck,
  FiX,
  FiUserPlus,
} from "react-icons/fi";
import { ModalInvitation } from "./components/ModalInvitation";
import { Link } from "react-router-dom";

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
        <div className="animate-in slide-in-from-top-4 duration-500">
          <h3 className="text-orange-600 font-bold text-sm mb-3 flex items-center gap-2 px-1">
            <FiUserPlus className="animate-bounce" /> Demandes en attente (
            {pendingAthletes.length})
          </h3>
          <div className="space-y-3">
            {pendingAthletes.map((athlete) => (
              <div
                key={athlete.id}
                className="bg-orange-50/50 border border-orange-200 p-4 rounded-2xl flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center font-bold text-orange-700">
                    {athlete.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-bold text-sm">{athlete.username}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAccept(athlete.id)}
                    className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 shadow-sm transition-all active:scale-95"
                  >
                    <FiCheck size={18} />
                  </button>
                  <button
                    onClick={() => handleRemove(athlete.id)} // Remove ici fait office de "Refuser"
                    className="p-3 bg-white border border-orange-200 text-orange-600 rounded-xl hover:bg-orange-100 transition-all active:scale-95"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
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
              <div
                key={athlete.id}
                className="bg-card border border-muted p-4 rounded-2xl flex items-center justify-between hover:shadow-md hover:border-primary/20 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-bold text-xl">
                    {athlete.username?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold leading-tight">
                      {athlete.username}
                    </h3>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">
                      Actif
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    to={`/coach/prepare/${athlete.id}`}
                    className="p-3 bg-secondary rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center"
                  >
                    <FiExternalLink size={18} />
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm(`Retirer ${athlete.username} de ta team ?`))
                        handleRemove(athlete.id);
                    }}
                    className="p-3 bg-secondary rounded-xl hover:bg-destructive hover:text-white transition-all"
                  >
                    <FiUserMinus size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
