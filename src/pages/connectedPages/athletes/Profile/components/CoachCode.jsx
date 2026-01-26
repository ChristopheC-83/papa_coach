import { useUserStore } from "@/store/user/useUserStore";
import React, { useState } from "react";
import { toast } from "sonner";
import { FiCopy, FiCheck, FiShare2 } from "react-icons/fi";

export default function CoachCode() {
  const user = useUserStore((state) => state.user);
  const [copied, setCopied] = useState(false);

  // On récupère le code du store
  const code = user?.invitation_code || "NON GÉNÉRÉ";
  const handleCopy = () => {
    if (!user?.invitation_code) return;

    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copié dans le presse-papier !");

    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="mt-10 bg-card border-2 border-dashed border-primary/20 rounded-3xl p-8 text-center">
      <p className="text-muted-foreground text-sm mb-4">
        Partage ce code avec tes futurs élèves. Ils devront le saisir lors de
        leur inscription.
      </p>

      <div className="bg-secondary/30 rounded-2xl py-6 mb-6">
        <span className="text-4xl font-black tracking-widest text-primary">
          {code}
        </span>
      </div>

      <button
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground rounded-2xl font-bold transition-all active:scale-95"
      >
        {copied ? (
          <FiCheck className="text-xl" />
        ) : (
          <FiCopy className="text-xl" />
        )}
        {copied ? "Copié !" : "Copier mon code"}
      </button>
    </div>
  );
}
