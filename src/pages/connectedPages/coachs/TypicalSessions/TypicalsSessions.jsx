import { LIBRARY_FILTERS } from "@/constants/Workouts/workout";
import { templateService } from "@/services/workoutsTemplates";
import React, { useState, useEffect } from "react"; 
import { FiSearch, FiZap, FiTrash2, FiClock } from "react-icons/fi";


export default function TypicalsSessions({ onSelectTemplate }) {
  const [templates, setTemplates] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("Tous");

  useEffect(() => {
    async function loadTemplates() {
      const data = await templateService.getMyTemplates();
      setTemplates(data);
    }
    loadTemplates();
  }, []);

  // Logique de filtrage combinée (Texte + Tag)
  const filteredTemplates = templates.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesTag = activeTag === "Tous" || t.tag === activeTag;
    return matchesSearch && matchesTag;
  });

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Évite de sélectionner la séance en cliquant sur supprimer
    if (confirm("Supprimer ce modèle ?")) {
      await templateService.delete(id);
      setTemplates(templates.filter((t) => t.id !== id));
    }
  };

  return (
    <section className="w-full max-w-lg mx-auto mt-5 p-4 space-y-6 pb-24">
      {/* 1. Recherche & Filtres Rapides */}
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

      {/* 2. Liste des modèles */}
      <div className="grid grid-cols-1 gap-3 max-h-[500px] overflow-y-auto no-scrollbar pr-1">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className="group flex items-center justify-between p-4 bg-card border border-muted rounded-3xl hover:border-primary/50 transition-all text-left cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-primary/10 text-primary rounded-md">
                    {template.tag}
                  </span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <FiClock className="size-3" /> {template.duration}
                  </span>
                </div>
                <h4 className="font-bold text-sm leading-tight">
                  {template.title}
                </h4>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {template.steps?.length || 0} segments d'entraînement
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => handleDelete(template.id, e)}
                  className="p-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FiTrash2 className="size-4" />
                </button>
                <div className="size-8 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <FiZap className="size-4" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 border-2 border-dashed border-muted rounded-3xl">
            <p className="text-xs text-muted-foreground">Aucun modèle trouvé</p>
          </div>
        )}
      </div>
    </section>
  );
}
