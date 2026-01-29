import React, { useState } from "react";
import ProgressBar from "./components/ProgressBar";
import FeedbackStep1 from "./components/FeedbackSteps/FeedbackStep1";
import FeedbackStep2 from "./components/FeedbackSteps/FeedbackStep2";
import FeedbackStep3 from "./components/FeedbackSteps/FeedbackStep3";
import FeedbackStep4 from "./components/FeedbackSteps/FeedbackStep4";
import FeedbackNavigation from "./components/FeedbackSteps/FeedbackNavigation";

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

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. PROGRESS BAR & INDICATOR */}
      <ProgressBar step={step} totalSteps={totalSteps} />

      {/* 2. ÉTAPES DU FORMULAIRE */}
      <div className="min-h-62.5">
        {step === 1 && (
          <FeedbackStep1 formData={formData} setFormData={setFormData} />
        )}

        {step === 2 && (
          <FeedbackStep2 formData={formData} setFormData={setFormData} />
        )}

        {step === 3 && (
          <FeedbackStep3 formData={formData} setFormData={setFormData} />
        )}

        {step === 4 && (
          <FeedbackStep4 formData={formData} setFormData={setFormData} />
        )}
      </div>

      {/* 3. NAVIGATION NAVIGATION */}
      <FeedbackNavigation
        step={step}
        totalSteps={totalSteps}
        setStep={setStep}
        onSubmit={onSubmit}
        onCancel={onCancel}
        formData={formData}
      />
    </div>
  );
}
