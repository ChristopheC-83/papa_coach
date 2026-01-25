import React from "react";

import RelativeDate from "./TrainingDaycomponents/RelativeDate";
import SessionDetail from "./TrainingDaycomponents/SessionDetail";
import SessionFree from "./TrainingDaycomponents/SessionFree";

export default function TrainingDay({ selectedDate, selectedSession }) {
  return (
    <div className="w-md space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-700">
      <RelativeDate selectedDate={selectedDate} />

      {selectedSession ? (
        <SessionDetail selectedSession={selectedSession} />
      ) : (
        <SessionFree />
      )}
    </div>
  );
}
