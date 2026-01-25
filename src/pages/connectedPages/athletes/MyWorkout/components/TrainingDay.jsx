import React from "react";

import RelativeDate from "./TrainingDaycomponents/RelativeDate";
import SessionDetail from "./TrainingDaycomponents/SessionDetail";
import SessionFree from "./TrainingDaycomponents/SessionFree";
import RaceDetail from "./TrainingDaycomponents/RaceDetail";
import RecoDetail from "./TrainingDaycomponents/RecoDetail";

export default function TrainingDay({
  selectedDate,
  selectedSession,
  selectedReco,
  selectedRace,
}) {
  return (
    <div className="w-md max-w-full max-md:mx-2space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-700 md:mt-4">
      <RelativeDate selectedDate={selectedDate} />

      {selectedSession ? (
        <SessionDetail selectedSession={selectedSession} />
      ) : selectedReco ? (
        <RecoDetail selectedReco={selectedReco} />
      ) : selectedRace ? (
        <RaceDetail selectedRace={selectedRace} />
      ) : (
        <SessionFree />
      )}
    </div>
  );
}
