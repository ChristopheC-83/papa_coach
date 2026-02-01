import { useState } from "react";

export function useWorkoutEditor(initialData, initialDate) {
  const [workout, setWorkout] = useState({
    title: initialData?.title || "",
    tag: initialData?.tag || "Endurance",
    duration: initialData?.duration || "",
    date: initialData?.date || initialDate,
    steps: initialData?.steps || [
      { title: "Échauffement", detail: "", highlight: false },
    ],
  });

  const addStep = () => {
    setWorkout((prev) => ({
      ...prev,
      steps: [...prev.steps, { title: "", detail: "", highlight: false }],
    }));
  };

  const updateStep = (index, field, value) => {
    const newSteps = [...workout.steps];
    newSteps[index][field] = value;
    setWorkout((prev) => ({ ...prev, steps: newSteps }));
  };

  const moveStep = (index, direction) => {
    const newSteps = [...workout.steps];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSteps.length) return;
    [newSteps[index], newSteps[targetIndex]] = [
      newSteps[targetIndex],
      newSteps[index],
    ];
    setWorkout((prev) => ({ ...prev, steps: newSteps }));
  };

  const removeStep = (index) => {
    setWorkout((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  };

  return { workout, setWorkout, addStep, updateStep, moveStep, removeStep };
}
