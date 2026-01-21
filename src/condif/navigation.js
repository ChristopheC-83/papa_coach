import {
  FiHome,
  FiLogIn,
  FiActivity,
  FiUser,
  FiUsers,
  FiCalendar,
  FiUserCheck,
  FiTool,
} from "react-icons/fi";

const navLinks = [
  // Apparaissent SEULEMENT si non connecté
  {
    icon: FiHome,
    label: "Accueil",
    path: "/",
    auth: "public",
  },

  {
    icon: FiLogIn,
    label: "Connexion",
    path: "/login",
    auth: "public",
  },
  {
    icon: FiActivity,
    label: "Inscription",
    path: "/register",
    auth: "public",
  },

  // Apparaissent SEULEMENT si connecté (athlètes et coachs)

  {
    icon: FiCalendar,
    label: "Programme",
    path: "/athlete/workout",
    auth: "private",
    minRole: "athlete",
  },
  {
    icon: FiUserCheck,
    label: "Mon Coach",
    path: "/athlete/coach",
    auth: "private",
    minRole: "athlete",
  },
  {
    icon: FiUser,
    label: "Profil",
    path: "/athlete/profile",
    auth: "private",
  },

  // Apparaissent SEULEMENT si role = coach
  {
    icon: FiUsers,
    label: "Athlètes",
    path: "/coach/athletes",
    auth: "private",
    minRole: "coach",
  },
  {
    icon: FiCalendar,
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

export function getFilteredLinks(isAuth, role) {
  return navLinks.filter((link) => {
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
}
