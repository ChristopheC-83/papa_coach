import React from 'react'

export default function FeatureCard({ icon, title, description }) {
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
