import React from 'react'
import {
  FiTarget,
  FiZap,
  FiBarChart2,
  FiUsers,
} from "react-icons/fi";
import FeatureCard from './FeatureCard';
export default function ForCoachs() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 px-2">
        <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-foreground">
          <FiUsers size={24} />
        </div>
        <h2 className="text-2xl font-bold italic uppercase tracking-tight">
          Côté Coachs
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <FeatureCard
          icon={<FiTarget />}
          title="Gestion d'équipe"
          description="Centralisez tous vos athlètes sur un seul dashboard sécurisé."
        />
        <FeatureCard
          icon={<FiBarChart2 />}
          title="Séances réutilisables"
          description="Créez votre bibliothèque de sessions et déployez-les en un clic."
        />
        <FeatureCard
          icon={<FiZap />}
          title="Analyse du ressenti"
          description="Récupérez le RPE et les commentaires pour affiner chaque bloc."
        />
      </div>
    </section>
  );
}
