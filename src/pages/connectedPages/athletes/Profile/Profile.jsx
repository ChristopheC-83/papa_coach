import { useMyCoach } from "@/customHooks/useMyCoach";
import { useUserStore } from "@/store/user/useUserStore";
import  { useEffect, useState } from "react";
import { toast } from "sonner";
import TitlePage from "@/components/custom/TitlePage";
import {
  FiUser,
  FiMail,
  FiShield,
  FiLogOut,
  FiEdit2,
  FiCheck,
} from "react-icons/fi";

export default function Profile() {
  const { user, logout } = useUserStore();
  const { refreshStatus } = useMyCoach();

  const { coachData } = useMyCoach();

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user?.username || "");

  const handleUpdateName = async () => {
    // Ici ton appel service pour update le profil dans Supabase
    // updateProfile(user.id, { username: newName })
    toast.success("Nom mis à jour !");
    setIsEditing(false);
  };

  useEffect(() => {
    refreshStatus();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mt-5 p-4 space-y-8 pb-24">
      <TitlePage titlePage="Mon Profil" iconPage={<FiUser />} />

      {/* --- SECTION IDENTITÉ --- */}
      <section className="bg-card border border-muted rounded-[2.5rem] p-8 shadow-sm text-center space-y-4">
        <div className="relative w-24 h-24 bg-secondary rounded-full mx-auto flex items-center justify-center border-4 border-background shadow-xl">
          <span className="text-3xl font-black text-primary">
            {user?.username?.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="space-y-1">
          {isEditing ? (
            <div className="flex items-center gap-2 bg-background border border-muted rounded-xl p-1 pr-2">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="bg-transparent px-3 py-2 outline-none w-full font-bold"
                autoFocus
              />
              <button
                onClick={handleUpdateName}
                className="p-2 bg-primary text-white rounded-lg"
              >
                <FiCheck />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 group">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                {user?.username || "Athlète ARC"}
              </h2>
              <button
                onClick={() => setIsEditing(true)}
                className=" group-hover:opacity-100 p-1 text-muted-foreground transition-all"
              >
                <FiEdit2 size={16} />
              </button>
            </div>
          )}
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-2">
            <FiMail className="text-primary" /> {user?.email}
          </p>
        </div>
      </section>

      {/* --- STATUT & COACH --- */}
      <section className="grid gap-4">
        <InfoTile
          icon={<FiShield />}
          label="Statut du compte"
          value={user?.role === "coach" ? "Coach Expert" : "Athlète"}
          highlight
        />

        <div className="bg-card border border-muted rounded-3xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <FiUser size={24} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
              Entraîné par
            </p>
            <p className="font-bold text-sm">
              {coachData ? (
                <span className="text-foreground italic">
                  {coachData.username}
                </span>
              ) : (
                <span className="text-muted-foreground italic">
                  Aucun coach lié
                </span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* --- ACTIONS --- */}
      <footer className="pt-4">
        <button
          onClick={logout}
          className="w-full py-4 border-2 border-destructive/20 text-destructive rounded-2xl font-black uppercase italic tracking-widest text-xs hover:bg-destructive hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <FiLogOut /> Déconnexion
        </button>
      </footer>
    </div>
  );
}

// Petit composant UI pour les tuiles d'info
function InfoTile({ icon, label, value, highlight = false }) {
  return (
    <div className="bg-card border border-muted rounded-3xl p-5 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${highlight ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-secondary text-muted-foreground"}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
          {label}
        </p>
        <p className="font-bold text-sm uppercase italic">{value}</p>
      </div>
    </div>
  );
}
