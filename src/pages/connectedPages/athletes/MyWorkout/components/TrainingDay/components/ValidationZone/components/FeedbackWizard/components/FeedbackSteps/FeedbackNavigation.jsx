import React from 'react'
import { FiArrowLeft, FiArrowRight, FiSend } from "react-icons/fi";

export default function FeedbackNavigation({ step, totalSteps, setStep, onSubmit, onCancel, formData }) {

    
  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));
    
  return (
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
  )
}
