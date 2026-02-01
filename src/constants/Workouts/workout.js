// La source unique
export const WORKOUT_TAGS = [
  "Endurance",
  "Intensité",
  "Récupération",
  "Compétition",
];

// Les filtres pour la bibliothèque (on enlève souvent Compétition des modèles)
export const LIBRARY_FILTERS = [
  "Tous",
  ...WORKOUT_TAGS.filter((tag) => tag !== "Compétition"),
];
