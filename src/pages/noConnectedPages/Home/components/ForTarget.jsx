import React from "react";
import FeatureCard from "./FeatureCard";
export default function ForTarget({title, details}) {

  return (
    <section className="space-y-6">
      {/* HEADER DYNAMIQUE */}
      <div className="flex items-center gap-3 px-2">
        <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-foreground shadow-sm">
       
          {React.cloneElement(title.icon, { size: 24 })}
        </div>
        <h2 className="text-2xl font-black italic uppercase tracking-tight">
          {title.title}
        </h2>
      </div>

      {/* GRILLE DE FEATURES */}
      <div
        className={`grid gap-4 ${details.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}
      >
        {details.map((item, index) => (
          <FeatureCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
