import { useState } from "react";
import { useUserStore } from "@/store/user/useUserStore";
import { FiCopy, FiCheck, FiShare2 } from "react-icons/fi";
import TitlePage from "@/components/custom/TitlePage";
import { toast } from "sonner";
import { DialogTitle } from "@/components/ui/dialog";

export default function Invitations() {
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
    <div className="w-full max-w-md mx-auto mt-5 p-4">
      <DialogTitle>
        <TitlePage titlePage="Inviter un Athlète" iconPage={<FiShare2 />} />
      </DialogTitle>
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

      <div className="mt-8 space-y-4">
        <h3 className="font-bold text-lg text-muted-foreground">
          Comment ça marche ?
        </h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>1. Envoie ce code à ton athlète.</li>
          <li>2. L'athlète crée son compte sur ARC.</li>
          <li>3. Il entre ton code dans son profil.</li>
          <li>4. Il apparaît magiquement dans ta liste d'athlètes !</li>
        </ul>
      </div>
    </div>
  );
}
// WV6C7H