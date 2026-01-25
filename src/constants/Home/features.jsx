import {
  FiTarget,
  FiBarChart2,
  FiZap,
  FiLayout,
  FiMessageCircle,
} from "react-icons/fi";

export const COACH_FEATURES = {
  title: { icon: <FiTarget />, title: "Côté Coachs" },
  details: [
    {
      icon: <FiTarget />,
      title: "Gestion d’equipe",
      description:
        "Centralisez tous vos athlètes sur un seul dashboard sécurisé.",
    },
    {
      icon: <FiBarChart2 />,
      title: "Séances réutilisables",
      description:
        "Créez votre bibliothèque de sessions et utilisez-les rapidement autant de fois que vou les voulez !.",
    },
    {
      icon: <FiZap />,
      title: "Analyse du ressenti",
      description:
        "Récupérez le RPE et les commentaires pour affiner chaque bloc d'entraînement de vos athlètes.",
    },
  ],
};

export const ATHLETE_FEATURES = {
  title: { icon: <FiZap />, title: "Côté Athlètes" },
  details: [
    {
      icon: <FiLayout />,
      title: "Planification sur mesure",
      description:
        "Recevez votre plan d'entraînement directement sur votre interface. Clair, net, précis.",
    },
    {
      icon: <FiMessageCircle />,
      title: "Feedback instantané",
      description:
        "Faites vos retours après chaque séance pour que votre coach ajuste le tir en temps réel.",
    },
  ],
};
