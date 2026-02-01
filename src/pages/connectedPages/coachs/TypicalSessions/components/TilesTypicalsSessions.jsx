import React from "react";
import { FiEdit3, FiTrash2, FiClock } from "react-icons/fi";

export default function TilesTypicalsSessions({
  template,
  handleDelete,
  onSelectTemplate,
  onEditClick, // <--- Ne pas oublier de la récupérer ici !
}) {
  const handleMainClick = () => {
    if (onSelectTemplate) {
      // Mode Sélection (Calendrier)
      onSelectTemplate(template);
    } else {
      // Mode Gestion (Bibliothèque)
      onEditClick();
    }
  };

  return (
    <div
      onClick={handleMainClick}
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
        <h4 className="font-bold text-sm leading-tight">{template.title}</h4>
        <p className="text-[10px] text-muted-foreground mt-1">
          {template.steps?.length || 0} segments d'entraînement
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* BOUTON SUPPRIMER */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // BLOQUE la remontée du clic vers le div parent
            handleDelete(template.id, e);
          }}
          className="p-2 text-muted-foreground hover:text-destructive md:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <FiTrash2 className="size-4" />
        </button>

        {/* ICONE EDIT (Visuelle ou Bouton) */}
        <div
          className="size-8 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors"
          onClick={(e) => {
            e.stopPropagation(); // Sécurité
            onEditClick();
          }}
        >
          <FiEdit3 className="size-4" />
        </div>
      </div>
    </div>
  );
}
