// La source unique
export const WORKOUT_TAGS = [
  "Endurance",
  "Intensité",
  "Explosivité",
  "Technique",
  "Fun",
  "Récupération",
  "Compétition",
];

// Les filtres pour la bibliothèque (on enlève souvent Compétition des modèles)
export const LIBRARY_FILTERS = [
  "Tous",
  ...WORKOUT_TAGS.filter((tag) => tag !== "Compétition"),
];

export function isPsychoWorkout(workout) {
  if (!workout) return false;
  const title = workout.title?.toLowerCase() || "";
  return workout.psycho || title.includes("psy") || title.includes("psycho");
}
