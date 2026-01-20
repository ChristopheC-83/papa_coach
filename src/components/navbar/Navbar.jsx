/* eslint-disable no-unused-vars */
import React from "react";
import NavbarMobile from "./NavbarMobile";
import NavbarDesktop from "./NavbarDesktop";
import { useUserStore } from "@/store/user/useUserStore";
import { FiHome } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import { FiActivity } from "react-icons/fi";

export default function Navbar() {
  const user = useUserStore((state) => state.user);

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
      label: "Dashboard",
      path: "/dashboard",
      auth: "private",
    },

    // Role-based
    {
      icon: <FiHome />,
      label: "Mes Athlètes",
      path: "/coach/athletes",
      auth: "private",
      role: "coach",
    },
    {
      icon: <FiHome />,
      label: "Mon Programme",
      path: "/athlete/workout",
      auth: "private",
      role: "athlete",
    },
  ];

  const filteredLinks = navLinks.filter((link) => {
    // Si je ne suis PAS connecté
    // if (!isAuth) {
    return link.auth === "all" || link.auth === "public";
    // }

    // Si je SUIS connecté
    // if (link.auth === "all") return true;
    // if (link.auth === "private") {
    //   // On check le rôle si spécifié, sinon on affiche
    //   return !link.role || link.role === role;
    // }

    return false; // Exclut les liens "public" (Login/Register) quand on est connecté
  });
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
