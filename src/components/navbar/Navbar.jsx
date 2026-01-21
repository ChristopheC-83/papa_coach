/* eslint-disable no-unused-vars */
import React from "react";
import NavbarMobile from "./NavbarMobile";
import NavbarDesktop from "./NavbarDesktop";
import { useUserStore } from "@/store/user/useUserStore";
import { FiHome } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import { FiActivity } from "react-icons/fi";

export default function Navbar() {
  const { isAuth, user, isHydrated } = useUserStore();
  const role = user?.role;

  const navLinks = [
    {
      icon: <FiHome />,
      label: "Accueil",
      path: "/",
      auth: "all",
    },

    // Apparaissent SEULEMENT si non connecté
    {
      icon: <FiLogIn />,
      label: "Connexion",
      path: "login",
      auth: "public",
    },
    {
      icon: <FiActivity />,
      label: "Inscription",
      path: "/register",
      auth: "public",
    },

    // Apparaissent SEULEMENT si connecté
    {
      icon: <FiHome />,
      label: "Profil",
      path: "/profile",
      auth: "private",
    },

    // Role-based
    {
      icon: <FiHome />,
      label: "Athlètes",
      path: "/coach/athletes",
      auth: "private",
      role: "coach",
    },
    {
      icon: <FiHome />,
      label: "Programme",
      path: "/athlete/workout",
      auth: "private",
      role: "athlete",
    },
  ];

  const filteredLinks = navLinks.filter((link) => {
    // 1. Gestion des liens pour tout le monde (Accueil)
    if (link.auth === "all") return true;

    // 2. Si je ne suis PAS connecté
    if (!isAuth) {
      return link.auth === "public";
    }

    // 3. Si je SUIS connecté
    if (isAuth) {
      // On cache les liens "public" (Connexion/Inscription)
      if (link.auth === "public") return false;

      // On gère les liens "private"
      if (link.auth === "private") {
        // Si un rôle spécifique est requis, on vérifie
        if (link.role) {
          return link.role === role;
        }
        return true; // Lien privé sans rôle spécifique (ex: Dashboard général)
      }
    }

    return false;
  });

  // Si le store n'est pas encore prêt, on ne rend rien ou un squelette
  // pour éviter le "flash" de contenu non connecté
  if (!isHydrated) return null;

  return (
    <div className="bg-background text-foreground">
      <div className="hidden md:block  ">
        <NavbarDesktop links={filteredLinks} />
      </div>
      <div className="block md:hidden fixed bottom-0 left-0 w-full border-t bg-muted text-muted-foreground z-50">
        <NavbarMobile links={filteredLinks} />
      </div>
    </div>
  );
}
