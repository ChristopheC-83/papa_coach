import React from 'react'

export default function FeedbackStep4({ formData, setFormData }) {
  return (
    <div className="space-y-4 animate-in slide-in-from-right-4">
                <h3 className="text-lg font-black italic uppercase tracking-tighter">
                  Dernière note
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-muted-foreground ml-2">
                      Ce qu'on aurait pu mieux faire
                    </label>
                    <textarea
                      className="w-full p-4 bg-secondary/30 border-2 border-transparent focus:border-primary rounded-3xl outline-none text-xs font-medium min-h-30"
                      placeholder="Adapter l'échauffement ? Changer l'heure ? Plus de récup ?"
                      value={formData.comment}
                      onChange={(e) =>
                        setFormData({ ...formData, comment: e.target.value })
                      }
                    />
                  </div>
                  <div className="p-4 bg-primary/5 rounded-3xl border border-primary/10">
                    <p className="text-[10px] text-primary font-bold italic text-center">
                      "Ton feedback est la clé de ta progression. Prêt à envoyer ?"
                    </p>
                  </div>
                </div>
              </div>
  )
}
