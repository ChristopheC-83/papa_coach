import React from 'react'

export default function BiographyForm({text, setText, handleSave}) {
  return (
    <section className="bg-card border border-muted rounded-3xl p-8">
          <h3 className="font-black uppercase italic text-[10px] mb-4 tracking-widest text-primary">
            Ma Philosophie
          </h3>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full min-h-37.5 bg-secondary/10 rounded-2xl p-4 text-sm border-none focus:ring-1 focus:ring-primary"
            placeholder="Décris ta méthode, tes diplômes..."
          />
          <button
            onClick={handleSave}
            className="w-full mt-4 py-4 bg-foreground text-background rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] transition-transform"
          >
            Enregistrer ma Bio
          </button>
        </section>
  )
}
