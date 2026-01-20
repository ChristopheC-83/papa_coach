
import { Button } from "@/components/ui/button"; // Si tu as installé le bouton Shadcn
import { useTheme } from "@/customHooks/useTheme";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      variant="outline"
    >
      Actuel : {theme}
    </Button>
  );
}