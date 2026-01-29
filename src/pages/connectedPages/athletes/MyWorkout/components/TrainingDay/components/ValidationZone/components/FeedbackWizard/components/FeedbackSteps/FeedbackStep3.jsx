import React from 'react'

export default function FeedbackStep3({ formData, setFormData }) {
  return (
    <div className="space-y-4 animate-in slide-in-from-right-4">
      <h3 className="text-lg font-black italic uppercase tracking-tighter">
        Le Bilan
      </h3>
      <div className="space-y-4">
        {/* CE QUI A PLU */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-primary ml-2 flex items-center gap-1">
            <span className="size-1.5 bg-primary rounded-3xl" /> Ce qui t'as plu
          </label>
          <textarea
            className="w-full p-4 bg-secondary/30 border-2 border-transparent focus:border-primary rounded-3xl outline-none text-xs font-medium"
            placeholder="Un exercice, une sensation, la météo..."
            value={formData.pros}
            onChange={(e) => setFormData({ ...formData, pros: e.target.value })}
          />
        </div>
        {/* CE QUI A ÉTÉ DUR / À AMÉLIORER */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-muted-foreground ml-2">
            Ce qui a été difficile
          </label>
          <textarea
            className="w-full p-4 bg-secondary/30 border-2 border-transparent focus:border-destructive/30 focus:border-2 rounded-3xl outline-none text-xs font-medium"
            placeholder="Difficulté technique, fatigue, douleur..."
            value={formData.cons}
            onChange={(e) => setFormData({ ...formData, cons: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
