import React, { useState } from "react";
import { FiArrowRight, FiArrowLeft, FiSend, FiStar } from "react-icons/fi";

export default function FeedbackWizard({ onSubmit, onCancel }) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    rpe: 5,
    pre_feeling: "",
    session_feeling: "",
    pros: "",
    cons: "",
    comment: "",
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // Rendu de la barre de progression
  const progress = (step / totalSteps) * 100;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. PROGRESS BAR & INDICATOR */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">
            Étape {step} sur {totalSteps}
          </span>
          <span className="text-[10px] font-bold text-muted-foreground italic">
            {Math.round(progress)}% complété
          </span>
        </div>
        <div className="h-1.5 w-full bg-secondary rounded-3xl overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 2. ÉTAPES DU FORMULAIRE */}
      <div className="min-h-62.5">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <h3 className="text-lg font-black italic uppercase tracking-tighter">
              Quelle était la difficulté ? (RPE)
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(10)].map((_, i) => {
                const val = i + 1;
                const isActive = formData.rpe === val;
                return (
                  <button
                    key={val}
                    onClick={() => setFormData({ ...formData, rpe: val })}
                    className={`py-4 rounded-3xl font-black transition-all ${
                      isActive
                        ? "bg-primary text-white scale-110 shadow-lg"
                        : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-center text-muted-foreground font-bold italic">
              1 = Très facile | 10 = Effort maximal
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in slide-in-from-right-4">
            <h3 className="text-lg font-black italic uppercase tracking-tighter">
              Tes ressentis
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-muted-foreground ml-2">
                  Avant le départ
                </label>
                <textarea
                  className="w-full p-4 bg-secondary/30 border-2 border-transparent focus:border-primary rounded-3xl outline-none text-xs font-medium"
                  placeholder="Fatigue, motivation, stress..."
                  value={formData.pre_feeling}
                  onChange={(e) =>
                    setFormData({ ...formData, pre_feeling: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-muted-foreground ml-2">
                  Pendant la séance
                </label>
                <textarea
                  className="w-full p-4 bg-secondary/30 border-2 border-transparent focus:border-primary rounded-3xl outline-none text-xs font-medium"
                  placeholder="Sensations, jambes, souffle..."
                  value={formData.session_feeling}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      session_feeling: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in slide-in-from-right-4">
            <h3 className="text-lg font-black italic uppercase tracking-tighter">
              Le Bilan
            </h3>
            <div className="space-y-4">
              {/* CE QUI A PLU */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-primary ml-2 flex items-center gap-1">
                  <span className="size-1.5 bg-primary rounded-3xl" /> Ce qui
                  t'as plu
                </label>
                <textarea
                  className="w-full p-4 bg-secondary/30 border-2 border-transparent focus:border-primary rounded-3xl outline-none text-xs font-medium"
                  placeholder="Un exercice, une sensation, la météo..."
                  value={formData.pros}
                  onChange={(e) =>
                    setFormData({ ...formData, pros: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, cons: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
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
        )}
      </div>

      {/* 3. NAVIGATION NAVIGATION */}
      <div className="flex justify-between items-center pt-4">
        {step > 1 ? (
          <button
            onClick={prevStep}
            className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground hover:text-primary transition-colors"
          >
            <FiArrowLeft /> Retour
          </button>
        ) : (
          <button
            onClick={onCancel}
            className="text-[10px] font-black uppercase text-muted-foreground"
          >
            Annuler
          </button>
        )}

        {step < totalSteps ? (
          <button
            onClick={nextStep}
            className="px-8 py-3 bg-foreground text-background rounded-xl font-black uppercase italic text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all"
          >
            Continuer <FiArrowRight />
          </button>
        ) : (
          <button
            onClick={() => onSubmit(formData)}
            className="px-8 py-3 bg-primary/80 hover:bg-primary/60 cursor-pointer text-white rounded-3xl font-black uppercase italic text-xs flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all text-shadow png-shadow"
          >
            Envoyer mon débrief <FiSend />
          </button>
        )}
      </div>
    </div>
  );
}
