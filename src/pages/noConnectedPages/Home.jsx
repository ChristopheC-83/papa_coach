import React from "react";
import { useUserStore } from "@/store/user/useUserStore";
import {
  FiTarget,
  FiZap,
  FiMessageCircle,
  FiBarChart2,
  FiUsers,
  FiLayout,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useUserStore();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 space-y-16">
      {/* --- HERO SECTION --- */}
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tighter  uppercase italic">
          ARC<span className="text-primary">.</span>
        </h1>
        <p className="text-xl text-muted-foreground font-medium max-w-md mx-auto leading-tight">
          La relation Coach & Athlète poussée à son maximum.
        </p>
        {!user && (
          <div className="pt-6">
            <Link
              to="/login"
              className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all inline-block"
            >
              Commencer l'aventure
            </Link>
          </div>
        )}
      </header>

      {/* --- SECTION ATHLÈTES --- */}
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

      {/* --- SECTION COACHES --- */}
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

      {/* --- FOOTER / CTA --- */}
      <footer className="text-center pt-10 pb-20">
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
          Built for performance by ARC
        </p>
      </footer>
    </div>
  );
}

// Sous-composant pour garder le code propre (Refacto Ready)
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-card border border-muted p-6 rounded-3xl space-y-3 hover:border-primary/30 transition-colors shadow-sm">
      <div className="text-primary text-xl">{icon}</div>
      <h3 className="font-bold text-lg leading-tight">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
