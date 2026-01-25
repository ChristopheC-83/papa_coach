import React from 'react'
import {
  FiLogOut,
} from "react-icons/fi";

export default function Logout({ logout }) {
  return (
    <footer className="pt-4">
      <button
        onClick={logout}
        className="w-full py-4 border-2 border-destructive/20 text-destructive rounded-2xl font-black uppercase italic tracking-widest text-xs hover:bg-destructive hover:text-white transition-all flex items-center justify-center gap-2"
      >
        <FiLogOut /> Déconnexion
      </button>
    </footer>
  );
}
