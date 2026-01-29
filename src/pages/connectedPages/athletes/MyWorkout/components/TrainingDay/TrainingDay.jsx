import React from "react";
import RelativeDate from "./components/RelativeDate";
import SessionDetail from "./components/DetailOfDay/SessionDetail";
import RecoDetail from "./components/DetailOfDay/RecoDetail";
import RaceDetail from "./components/DetailOfDay/RaceDetail";
import SessionFree from "./components/DetailOfDay/SessionFree";
import ValidationZone from "./components/ValidationZone/ValidationZone";
import ValidatedZone from "./components/ValidatedZone/ValidatedZone";

export default function TrainingDay({
  selectedDate,
  selectedSession,
  selectedReco,
  selectedRace,
  onRefresh,
}) {
  const activeActivity = selectedSession || selectedReco || selectedRace;
  const feedback = activeActivity?.athlete_feedback || {};

  return (
    <div className="w-md max-w-full max-md:mx-2 space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-700 md:mt-4">
      <RelativeDate selectedDate={selectedDate} />

      {selectedSession && <SessionDetail selectedSession={selectedSession} />}
      {selectedReco && <RecoDetail selectedReco={selectedReco} />}
      {selectedRace && <RaceDetail selectedRace={selectedRace} />}
      {!activeActivity && <SessionFree />}

      {activeActivity && (
        <div className="mt-6">
          {/* --- CAS 1 : FORMULAIRE À REMPLIR --- */}
          {activeActivity.is_completed === null ? (
            <ValidationZone
              workoutId={activeActivity.id}
              onRefresh={onRefresh}
            />
          ) : (
            /* --- CAS 2 : RÉCAPITULATIF "FIGÉ" --- */
            <ValidatedZone
              feedback={feedback}
              activeActivity={activeActivity}
            />
          )}
        </div>
      )}
    </div>
  );
}
