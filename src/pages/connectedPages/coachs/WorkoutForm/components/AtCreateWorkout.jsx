import React from 'react'
import {
  FiPlus,
} from "react-icons/fi";
import WorkoutForm from '../WorkoutForm';

export default function AtCreateWorkout({
  isCreating,
  setIsCreating,
  selectedDate,
  handleCreateWorkout,
  existingWorkout,
}) {
  return (
    <div className="space-y-4">
      {!isCreating ? (
        <div className="bg-secondary/10 border-2 border-dashed border-muted rounded-3xl p-10 text-center">
          <p className="text-sm text-muted-foreground italic mb-6">
            Journée de repos ou séance à programmer.
          </p>
          <button
            onClick={() => setIsCreating(true)}
            className="mx-auto flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 active:scale-95 transition-all text-shadow"
          >
            <FiPlus /> CRÉER UN ENTRAÎNEMENT
          </button>
        </div>
      ) : (
        <div className="animate-in zoom-in-95 duration-200">
          <WorkoutForm
            initialDate={selectedDate}
            onSubmit={handleCreateWorkout}
            onCancel={() => setIsCreating(false)}
            initialData={existingWorkout} 
          />
        </div>
      )}
    </div>
  );
}
