import { useState } from "react";
import { FiUserPlus } from "react-icons/fi";

export default function LinkCoachForm({ onLink }) {
  const [inviteCode, setInviteCode] = useState("");

  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-card border-2 border-dashed border-muted rounded-3xl p-8 text-center">
      <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <FiUserPlus className="text-primary text-2xl" />
      </div>
      <h2 className="text-xl font-bold mb-2">Trouve ton mentor</h2>
      <input
        type="text"
        placeholder="Ex: ARC-X8Z9"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
        className="w-full p-4 rounded-2xl bg-secondary border-none text-center font-mono text-xl mb-4 focus:ring-2 ring-primary transition-all"
      />
      <button
        onClick={() => onLink(inviteCode)}
        className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all"
      >
        Rejoindre ce coach
      </button>
    </div>
  );
}
