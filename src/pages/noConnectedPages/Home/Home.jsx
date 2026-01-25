import React from "react";
import { useUserStore } from "@/store/user/useUserStore";
import { Link } from "react-router-dom";
import ForTarget from "./components/ForTarget";
import { ATHLETE_FEATURES, COACH_FEATURES } from "@/constants/Home/features";

export default function Home() {
  const { user } = useUserStore();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 space-y-16">
      {/* --- HERO SECTION --- */}
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tighter uppercase italic">
          ARC<span className="text-primary">.</span>
        </h1>
        <p className="text-xl text-muted-foreground font-medium max-w-md mx-auto leading-tight">
          La relation Coach & Athlète poussée à son maximum.
        </p>
        {!user && (
          <div className="pt-6">
            <Link
              to="/register"
              className="bg-secondary/80 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-secondary/30 hover:border-primary transition-all inline-block border border-primary/60"
            >
              Commencer l'aventure
            </Link>
          </div>
        )}
      </header>

      <ForTarget {...ATHLETE_FEATURES} />
      <ForTarget {...COACH_FEATURES} />

      {/* --- FOOTER / CTA --- */}
      <footer className="text-center pt-10 pb-20">
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
          Built for performance by ARC
        </p>
      </footer>
    </div>
  );
}
