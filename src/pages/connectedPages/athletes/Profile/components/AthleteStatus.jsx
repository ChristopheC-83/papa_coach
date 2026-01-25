import React from "react";
import { FiUser, FiShield, FiChevronRight } from "react-icons/fi";
import InfoTile from "./InfoTile";

export default function AthleteStatus({ user, coachData }) {
  //  ajouter des sports et des niveaux
  return (
    <section className="grid gap-4">
      <InfoTile
        icon={<FiShield />}
        label="Statut du compte"
        value={user?.role === "coach" ? "Coach Expert" : "Athlète"}
        highlight
      />

      <div className="bg-card border border-muted rounded-3xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
          <FiUser size={24} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
            Entraîné par
          </p>
          <p className="font-bold text-sm">
            {coachData ? (
              <span className="text-foreground italic">
                {coachData.username}
              </span>
            ) : (
              <span className="text-muted-foreground italic">
                Aucun coach lié
              </span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
