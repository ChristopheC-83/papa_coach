import React from "react";
import {
  FiZap,
  FiMessageCircle,
  FiLayout,
} from "react-icons/fi";
import FeatureCard from "./FeatureCard";
export default function ForAthletes() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 px-2">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <FiZap size={24} />
        </div>
        <h2 className="text-2xl font-bold italic uppercase tracking-tight">
          Côté Athlètes
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <FeatureCard
          icon={<FiLayout />}
          title="Planification sur mesure"
          description="Recevez votre plan d'entraînement directement sur votre interface. Clair, net, précis."
        />
        <FeatureCard
          icon={<FiMessageCircle />}
          title="Feedback instantané"
          description="Faites vos retours après chaque séance pour que votre coach ajuste le tir en temps réel."
        />
      </div>
    </section>
  );
}
