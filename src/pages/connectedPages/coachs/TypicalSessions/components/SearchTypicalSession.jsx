import { SPORTS_CONFIG } from "@/constants/Workouts/sports";
import { LIBRARY_FILTERS } from "@/constants/Workouts/workout";
import React from "react";

import { FiSearch } from "react-icons/fi";

export default function SearchTypicalSession({
  search,
  setSearch,
  activeTag,
  setActiveTag,
  activeSport, 
  setActiveSport,
}) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Rechercher un modèle..."
          className="w-full bg-secondary/20 p-4 pl-12 rounded-2xl text-sm outline-none focus:ring-1 ring-primary transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* FILTRE PAR SPORT (Le nouveau bandeau) */}
      <div className="flex gap-2 flex-wrap justify-between pb-2">
        <button
          onClick={() => setActiveSport("Tous")}
          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-shadow cursor-pointer ${
            activeSport === "Tous"
              ? "bg-primary/80 text-white"
              : "bg-secondary/10 text-muted-foreground"
          }`}
        >
          Tous
        </button>
        {Object.values(SPORTS_CONFIG).map((sport) => (
          <button
            key={sport.id}
            onClick={() => setActiveSport(sport.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
              activeSport === sport.id
                ? `${sport.color} text-white`
                : "bg-secondary/10 text-muted-foreground hover:bg-secondary/30"
            }`}
          >
            <span>{sport.icon}</span>
            <span>{sport.label}</span>
          </button>
        ))}
      </div>
      {/* Chips de filtrage */}
      <div className="flex gap-2 flex-wrap justify-between pb-2">
        {LIBRARY_FILTERS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-shadow cursor-pointer ${
              activeTag === tag
                ? "bg-primary/80 text-white"
                : "bg-secondary/10 text-muted-foreground hover:bg-secondary/30"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
