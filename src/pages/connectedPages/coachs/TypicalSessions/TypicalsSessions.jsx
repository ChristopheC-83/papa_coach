import { templateService } from "@/services/workoutsTemplates";
import React, { useState, useEffect } from "react";
import SearchTypicalSession from "./components/SearchTypicalSession";
import TilesTypicalsSessions from "./components/TilesTypicalsSessions";
import WorkoutForm from "../WorkoutForm/WorkoutForm";
import { toast } from "sonner";

export default function TypicalsSessions({ onSelectTemplate = null }) {
  const [templates, setTemplates] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("Tous");
  const [activeSport, setActiveSport] = useState("Tous");
  const [editingTemplate, setEditingTemplate] = useState(null);

  useEffect(() => {
    async function loadTemplates() {
      const data = await templateService.getMyTemplates();
      setTemplates(data);
    }
    loadTemplates();
  }, []);

  // Logique de filtrage combinée (Texte + Tag)
  const filteredTemplates = templates.filter((t) => {
    if (!t) return false;
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesTag = activeTag === "Tous" || t.tag === activeTag;

    // Filtre par sport
    const matchesSport = activeSport === "Tous" || t.sport === activeSport;

    return matchesSearch && matchesTag && matchesSport;
  });

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Évite de sélectionner la séance en cliquant sur supprimer
    if (confirm("Supprimer ce modèle ?")) {
      await templateService.delete(id);
      toast.info("Modèle supprimé");
      setTemplates(templates.filter((t) => t.id !== id));
    }
  };

  if (editingTemplate) {
    return (
      <div className="w-full max-w-lg mx-auto mt-5 p-4 animate-in fade-in duration-300">
        <button
          onClick={() => setEditingTemplate(null)}
          className="mb-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
        >
          ← Retour à la bibliothèque
        </button>

        <WorkoutForm
          initialData={editingTemplate}
          onCancel={() => setEditingTemplate(null)}
          isLibraryMode={true} // <--- C'est ici que la magie opère
          onSubmit={async (updatedData) => {
            // Ici on réutilise ton service save (qui fait l'upsert)
            await templateService.save({
              ...updatedData,
              id: editingTemplate.id, // On s'assure de garder l'ID pour l'update
            });
            toast.success(
              editingTemplate?.id ? "Modèle mis à jour" : "Nouveau modèle créé",
            );
            // On rafraîchit la liste et on ferme l'édition
            const data = await templateService.getMyTemplates();
            setTemplates(data);
            setEditingTemplate(null);
          }}
        />
      </div>
    );
  }

  // --- MODE LISTE (Ton code actuel) ---
  return (
    <section className="w-full max-w-lg mx-auto mt-5 p-4 space-y-6 pb-24">
      <SearchTypicalSession
        search={search}
        setSearch={setSearch}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
        activeSport={activeSport}
        setActiveSport={setActiveSport}
      />

      {/* --- AJOUTER CE BOUTON --- */}
      <button
        onClick={() =>
          setEditingTemplate({
            title: "",
            tag: "Endurance",
            duration: "01:00",
            steps: [{ title: "Échauffement", detail: "", highlight: false }],
          })
        }
        className="w-full py-4 border-2 border-dashed border-primary/30 rounded-3xl text-primary font-bold flex items-center justify-center gap-2 hover:bg-primary/5 transition-all mb-4"
      >
        + Nouveau modèle de séance
      </button>

      {/* Ton code existant de la grille ensuite... */}

      <div className="grid grid-cols-1 gap-3 max-h-125 overflow-y-auto no-scrollbar pr-1">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => {
            // SÉCURITÉ : Si le template est invalide, on ne l'affiche pas
            if (!template) return null;

            return (
              <TilesTypicalsSessions
                key={template.id}
                template={template}
                handleDelete={handleDelete}
                onSelectTemplate={onSelectTemplate}
                onEditClick={() => setEditingTemplate(template)}
              />
            );
          })
        ) : (
          <div className="text-center py-10 border-2 border-dashed border-muted rounded-3xl text-xs text-muted-foreground">
            Aucun modèle trouvé
          </div>
        )}
      </div>
    </section>
  );
}
