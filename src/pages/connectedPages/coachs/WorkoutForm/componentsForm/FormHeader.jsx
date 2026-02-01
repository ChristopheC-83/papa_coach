import { WORKOUT_TAGS } from '@/constants/Workouts/workout'
import React from 'react'


export default function FormHeader({ workout, setWorkout }) {
  return (
    <div className="grid grid-cols-2 gap-4">
            <select
              className="bg-secondary/20 p-4 rounded-2xl text-sm text-primary"
              value={workout.tag}
              onChange={(e) => setWorkout({ ...workout, tag: e.target.value })}
            >
              {WORKOUT_TAGS.map((tag) => (
                <option
                  key={tag}
                  value={tag}
                  className={`bg-background ${tag === "Compétition" ? "text-destructive" : ""}`}
                >
                  {tag}
                </option>
              ))}
            </select>
            {workout.tag !== "Compétition" && (
              <input
                placeholder="Durée (ex: 1h15)"
                className="bg-secondary/20 p-4 rounded-2xl text-sm"
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
              className="col-span-2 bg-secondary/20 p-4 rounded-2xl font-bold"
              value={workout.title}
              onChange={(e) => setWorkout({ ...workout, title: e.target.value })}
            />
          </div>
  )
}
