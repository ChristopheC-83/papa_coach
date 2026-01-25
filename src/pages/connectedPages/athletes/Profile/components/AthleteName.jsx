import React, { useState } from "react";
import { toast } from "sonner";
import { FiMail, FiEdit2, FiCheck } from "react-icons/fi";
import { updateProfile } from "@/services/users";
import { useUserStore } from "@/store/user/useUserStore";

export default function AthleteName({ user }) {
  const updateUserStore = useUserStore((state) => state.updateUser);
  const [newName, setNewName] = useState(user?.username || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateName = async () => {
    if (!newName.trim() || newName === user.username || newName.trim().length < 3) {
      setIsEditing(false);
      return;
    }

    try {
      // 1. Appel Supabase via le service
      await updateProfile(user.id, { username: newName });

      // 2. Mise à jour du store local pour l'UI
      updateUserStore({ username: newName });

      toast.success("Nom mis à jour !");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
      setNewName(user.username); // On reset le champ en cas d'échec
      console.error("Détails :", error.message);
    } finally {
      setIsEditing(false);
    }
  };

  return (
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
  );
}
