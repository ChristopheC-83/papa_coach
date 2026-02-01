import { LIBRARY_FILTERS } from "@/constants/Workouts/workout";
import { templateService } from "@/services/workoutsTemplates";
import React, { useState, useEffect } from "react"; 
import SearchTypicalSession from "./components/SearchTypicalSession";
import TilesTypicalsSessions from "./components/TilesTypicalsSessions";


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
        <SearchTypicalSession search={search} setSearch={setSearch} activeTag={activeTag} setActiveTag={setActiveTag} />

        

      {/* 2. Liste des modèles */}
      <div className="grid grid-cols-1 gap-3 max-h-125 overflow-y-auto no-scrollbar pr-1">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <TilesTypicalsSessions key={template.id} template={template} handleDelete={handleDelete} onSelectTemplate={onSelectTemplate} />
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
