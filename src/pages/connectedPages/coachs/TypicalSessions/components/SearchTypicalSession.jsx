import { LIBRARY_FILTERS } from "@/constants/Workouts/workout";
import React from "react";

import { FiSearch } from "react-icons/fi";

export default function SearchTypicalSession({ search, setSearch, activeTag, setActiveTag }) {
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
        {/* Chips de filtrage */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {LIBRARY_FILTERS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all whitespace-nowrap border ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary/10 text-muted-foreground border-transparent hover:border-muted"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    );
}
