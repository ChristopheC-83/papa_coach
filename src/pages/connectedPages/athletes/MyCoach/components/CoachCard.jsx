import { useState } from "react";
import {
  FiMessageCircle,
  FiLogOut,
  FiAlertTriangle,
} from "react-icons/fi";

export default function CoachCard({ coach, onUnlink }) {
  const [showConfirm, setShowConfirm] = useState(false);
  console.log(coach);

  return (
    <div className="w-full max-w-md mx-auto mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-card rounded-3xl p-6 shadow-sm border border-muted relative overflow-hidden">
        {/* L'overlay de confirmation (La fameuse Popup) */}
        {showConfirm && (
          <div className="absolute inset-0 z-10 bg-card/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-200">
            <FiAlertTriangle className="text-destructive text-4xl mb-4" />
            <h3 className="font-bold text-lg mb-2">Rompre le lien ?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Tu ne pourras plus recevoir les programmes de{" "}
              <strong>{coach?.username}</strong>.
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 bg-secondary rounded-xl font-bold text-sm"
              >
                Annuler
              </button>
              <button
                onClick={onUnlink}
                className="flex-1 py-3 bg-destructive text-white rounded-xl font-bold text-sm"
              >
                Confirmer
              </button>
            </div>
          </div>
        )}

        {/* --- Contenu normal de la carte --- */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl font-bold text-primary">
            {coach?.username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-black">{coach?.username}</h2>
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              Coach Mentor
            </span>
          </div>
        </div>

        <div className="space-y-2 mb-8">
          <h3 className="font-bold text-sm text-muted-foreground uppercase">
            Bio
          </h3>
          <p className="text-sm leading-relaxed italic">
            "{coach?.bio || "Pas de bio, il préférait faire du sport !!!"}"
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={`mailto:${coach?.email}`}
            className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all text-shadow"
          >
            <FiMessageCircle className="text-xl png-shadow" />
            Contacter par email
          </a>

          <button
            onClick={() => setShowConfirm(true)}
            className="mt-2 text-muted-foreground text-xs hover:text-destructive transition-colors flex items-center justify-center gap-1"
          >
            <FiLogOut size={14} /> Quitter ce coach
          </button>
        </div>
      </div>
    </div>
  );
}
