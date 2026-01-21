/* eslint-disable no-unused-vars */
import React from "react";
import NavbarMobile from "./NavbarMobile";
import NavbarDesktop from "./NavbarDesktop";
import { useUserStore } from "@/store/user/useUserStore";
import { FiHome } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import { FiActivity } from "react-icons/fi";
import { FiUser } from "react-icons/fi";import { FiUsers } from "react-icons/fi";import { FiCalendar } from "react-icons/fi";import { FiUserCheck } from "react-icons/fi";





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

    // Apparaissent SEULEMENT si connecté (athlètes et coachs)
    {
      icon: <FiUser />,
      label: "Profil",
      path: "/athlete/profile",
      auth: "private",
    },
    {
      icon: <FiHome />,
      label: "Programme",
      path: "/athlete/workout",
      auth: "private",
      minRole: "athlete",
    },
    {
      icon: <FiUserCheck />,
      label: "Mon Coach",
      path: "/athlete/coach",
      auth: "private",
      minRole: "athlete",
    },

    // Apparaissent SEULEMENT si role = coach
    {
      icon: <FiUsers />,
      label: "Athlètes",
      path: "/coach/athletes",
      auth: "private",
      minRole: "coach",
    },
    {
      icon: <FiCalendar />,
      label: "Préparations",
      path: "/coach/prepareWorkout",
      auth: "private",
      minRole: "coach",
    },
  ];

  // 1. Définition de la hiérarchie des rôles
  const roleLevels = {
    athlete: 1,
    coach: 2,
    // admin: 3, (Facile à ajouter plus tard)
  };

  const filteredLinks = navLinks.filter((link) => {
    // Cas 1 : Lien universel (Accueil)
    if (link.auth === "all") return true;

    // Cas 2 : Utilisateur NON connecté
    if (!isAuth) {
      return link.auth === "public";
    }

    // Cas 3 : Utilisateur CONNECTÉ
    if (isAuth) {
      // On dégage les liens publics (Login/Register)
      if (link.auth === "public") return false;

      // On traite les liens privés
      if (link.auth === "private") {
        // S'il n'y a pas de minRole, tout le monde voit (ex: Profil)
        if (!link.minRole) return true;

        // LOGIQUE CLÉ : On compare les niveaux
        // Le niveau de l'utilisateur doit être >= au niveau requis par le lien
        const userLevel = roleLevels[role] || 0;
        const requiredLevel = roleLevels[link.minRole] || 0;

        return userLevel >= requiredLevel;
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
