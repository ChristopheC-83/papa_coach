import { AVAILABLE_EXPERTISES } from "@/constants/Profile/expertises";
import { AVAILABLE_SPORTS } from "@/constants/Profile/sports";
import React from "react";

export default function CoachSpe({ coach }) {
    // Fonction pour transformer les IDs en objets complets (Icon + Label)
    
    console.log(coach)
  const getDataFromIds = (ids, referenceArray) => {
    if (!ids || !Array.isArray(ids)) return [];
    return ids
      .map((id) => referenceArray.find((item) => item.id === id))
      .filter((item) => item !== undefined);
    };
    


  const sports = getDataFromIds(coach?.favorite_sports, AVAILABLE_SPORTS);
  const expertises = getDataFromIds(coach?.specialities, AVAILABLE_EXPERTISES);

  return (
    <div className="mt-6 space-y-4 w-full max-w-md">
      {/* SECTION EXPERTISES / SPÉCIALITÉS */}
      {expertises.length > 0 && (
        <section className="bg-card border border-muted rounded-3xl p-6 shadow-sm border-t-2 border-t-primary/20">
          <h3 className="text-center mb-5 font-black uppercase italic text-[10px] tracking-[0.2em] text-primary">
            Expertises Techniques
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {expertises.map((exp) => (
              <div
                key={exp.id}
                className="flex flex-col items-center justify-center gap-1 bg-primary/5 rounded-2xl px-4 py-3 min-w-[85px] border border-primary/10"
              >
                <span className="text-xl">{exp.icon}</span>
                <span className="text-[9px] font-black uppercase tracking-tighter text-primary text-center leading-none">
                  {exp.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* SECTION SPORTS PRATIQUÉS */}
      {sports.length > 0 && (
        <section className="bg-card border border-muted rounded-3xl p-6 shadow-sm">
          <h3 className="text-center mb-5 font-black uppercase italic text-[10px] tracking-[0.2em] text-primary">
            Sports pratiqués
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {sports.map((sport) => (
              <div
                key={sport.id}
                className="flex flex-col items-center justify-center gap-1 bg-secondary/10 rounded-2xl px-4 py-3 min-w-21.25 border border-muted/20"
              >
                <span className="text-xl">{sport.icon}</span>
                <span className="text-[9px] font-black uppercase tracking-tighter text-muted-foreground text-center leading-none">
                  {sport.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
