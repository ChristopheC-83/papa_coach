import React from 'react'

export default function FeedbackStep2({ formData, setFormData }) {
  return (
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
  );
}
