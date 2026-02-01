import { WORKOUT_TAGS } from "@/constants/Workouts/workout";
import React from "react";
import SportPicker from "../components/SportPicker";

export default function FormHeader({ workout, setWorkout }) {
  return (
    <div className="space-y-4">
      {/* 1. Le choix du sport : prend toute la largeur, scrollable horizontalement */}
      <SportPicker
        selectedSport={workout.sport || "RUN"}
        onSelect={(sportId) => setWorkout({ ...workout, sport: sportId })}
      />

      {/* 2. Ta grille actuelle pour les métadonnées */}
      <div className="grid grid-cols-2 gap-3">
        <select
          className="bg-secondary/20 p-4 rounded-2xl text-sm text-primary appearance-none"
          value={workout.tag}
          onChange={(e) => setWorkout({ ...workout, tag: e.target.value })}
        >
          {WORKOUT_TAGS.map((tag) => (
            <option
              key={tag}
              value={tag}
              className="bg-background text-foreground"
            >
              {tag}
            </option>
          ))}
        </select>

        {workout.tag !== "Compétition" && (
          <input
            placeholder="Durée (ex: 1h15)"
            className="bg-secondary/20 p-4 rounded-2xl text-sm outline-none focus:ring-1 focus:ring-primary/30 transition-all"
            value={workout.duration}
            onChange={(e) =>
              setWorkout({ ...workout, duration: e.target.value })
            }
          />
        )}

        <input
          placeholder={
            workout.tag === "Compétition"
              ? "Nom / Lieu de la course"
              : "Nom de la séance..."
          }
          className="col-span-2 bg-secondary/20 p-4 rounded-2xl font-bold outline-none focus:ring-1 focus:ring-primary/30 transition-all placeholder:font-normal"
          value={workout.title}
          onChange={(e) => setWorkout({ ...workout, title: e.target.value })}
        />
      </div>
    </div>
  );
}
