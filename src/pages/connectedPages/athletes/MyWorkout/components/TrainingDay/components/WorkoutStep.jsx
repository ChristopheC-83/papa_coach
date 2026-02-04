export default function WorkoutStep({ title, detail, highlight = false}) {
  return (
    <div
      className={`p-4 rounded-2xl flex items-center gap-4 ${highlight ? "bg-primary/5 border border-primary/20" : "bg-secondary/30"}`}
    >
      <div
        className={`w-2 h-2 rounded-full ${highlight ? "bg-primary animate-pulse" : "bg-muted-foreground"}`}
      />
      <div>
        <h4 className="text-xs font-black uppercase tracking-tight">{title}</h4>
        <p className="text-sm text-muted-foreground leading-tight">{detail}</p>
      </div>
    </div>
  );
}
