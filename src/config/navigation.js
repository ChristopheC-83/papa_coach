import {
  FiHome,
  FiLogIn,
  FiActivity,
  FiUser,
  FiUsers,
  FiCalendar,
  FiUserCheck,
  FiTool,
  FiLink2,
  FiPenTool,
  FiClipboard,
} from "react-icons/fi";

// 1. LES LIENS COMMUNS (Si besoin, sinon on sépare tout)
export const COMMON_LINKS = [
  { label: "Accueil", path: "/", icon: FiHome, auth: "all" },
];

// 2. LES LIENS VISITEURS
export const VISITORS_LINKS = [
  {
    label: "Connexion",
    path: "/login",
    icon: FiLogIn,
  },
  {
    label: "Inscription",
    path: "/register",
    icon: FiActivity,
  },
];

// 3. CONFIG ATHLÈTE (Simple et directe)
export const ATHLETE_LINKS = [
  { label: "Programme", path: "/athlete/workout", icon: FiActivity },
  { label: "Mon Coach", path: "/athlete/coach", icon: FiUserCheck },
  { label: "Profil", path: "/athlete/profile", icon: FiUser },
];

// 4. CONFIG COACH (Structurée pour la Bottom Bar + la Sheet)
export const COACH_LINKS = {
  // Ce qui reste visible en permanence sur le mobile du coach
  bottom: [
    {
      label: "Athlètes",
      path: "/coach/athletes",
      icon: FiUsers,
    },
    {
      label: "Création Séances",
      path: "/coach/typicals_sessions",
      icon: FiClipboard,
    },
    // {
    //   label: "Préparations",
    //   path: "/coach/prepareWorkout",
    //   icon: FiCalendar,
    // },
  ],
  // Ce qui est rangé dans la Sheet "Outils"
  tools: [
    // {
    //   label: "Liens d'invitation",
    //   path: "/coach/invitation",
    //   icon: FiLink2,
    // },

    {
      label: "Ressources",
      path: "/coach/resources",
      icon: FiClipboard,
    },
    {
      label: "Mon Programme",
      path: "/coach/workout",
      icon: FiCalendar,
    },
    {
      label: "Biographie",
      path: "/coach/biography",
      icon: FiPenTool,
    },
    // On rappelle les liens "persos" du coach ici pour qu'il puisse y accéder
    {
      label: "Profil",
      path: "/athlete/profile",
      icon: FiUser,
    },
  ],
};

