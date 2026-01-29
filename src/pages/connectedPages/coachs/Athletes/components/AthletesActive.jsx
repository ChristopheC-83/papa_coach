import React from 'react'
import { Link } from 'react-router-dom';import {
  
  FiUserMinus,
  FiExternalLink,
} from "react-icons/fi";

export default function AthletesActive({ athlete, handleRemove }) {
  return (
    <div
      key={athlete.id}
      className="bg-card border border-muted p-4 rounded-2xl flex items-center justify-between hover:shadow-md hover:border-primary/20 transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-bold text-xl">
          {athlete.username?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-bold leading-tight">{athlete.username}</h3>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">
            Actif
          </p>
        </div>
      </div>

      <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
        <Link
          to={`/coach/prepare/${athlete.id}`}
          className="p-3 bg-secondary rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center"
        >
          <FiExternalLink size={18} />
        </Link>
        <button
          onClick={() => {
            if (confirm(`Retirer ${athlete.username} de ta team ?`))
              handleRemove(athlete.id);
          }}
          className="p-3 bg-secondary rounded-xl hover:bg-destructive hover:text-white transition-all"
        >
          <FiUserMinus size={18} />
        </button>
      </div>
    </div>
  );
}
