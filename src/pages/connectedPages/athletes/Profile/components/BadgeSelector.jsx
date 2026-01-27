import { cn } from "@/lib/utils";
import { updateProfile } from "@/services/users";
import { useUserStore } from "@/store/user/useUserStore";
import { toast } from "sonner";

// On renomme SportSelector en BadgeSelector pour plus de clarté
export default function BadgeSelector({
  items, // La liste (AVAILABLE_SPORTS ou AVAILABLE_EXPERTISES)
  dbField, // Le nom de la colonne dans Supabase ('favorite_sports' ou 'specialities')
  title, // Le titre affiché
  maxSelection = 3,
}) {
  const user = useUserStore((state) => state.user);
  const updateUserStore = useUserStore((state) => state.updateUser);

  // On récupère dynamiquement la bonne liste dans l'objet user
  const selectedItems = user?.[dbField] || [];

  const handleToggle = async (itemId) => {
    let updatedList;
    if (selectedItems.includes(itemId)) {
      updatedList = selectedItems.filter((id) => id !== itemId);
    } else {
      if (selectedItems.length >= maxSelection) {
        toast.error(`Maximum ${maxSelection} autorisés`);
        return;
      }
      updatedList = [...selectedItems, itemId];
    }

    try {
      // On utilise [dbField] pour mettre à jour la bonne colonne
      await updateProfile(user.id, { [dbField]: updatedList });
      updateUserStore({ [dbField]: updatedList });
      toast.success("Mis à jour !");
    } catch (error) {
      toast.error("Erreur de sauvegarde");
      console.error("Détails :", error.message);
    }
  };

  return (
    <section className="bg-card border border-muted rounded-3xl px-3 py-6 shadow-sm w-full max-w-md ">
      <h3 className="text-center mb-6 font-black uppercase italic text-sm tracking-widest">
        {title}
      </h3>

      <div className="flex flex-wrap gap-4 justify-center">
        {items.map((item) => {
          const isSelected = selectedItems.includes(item.id);
          const isMaxReached =
            selectedItems.length >= maxSelection && !isSelected;

          return (
            <button
              key={item.id}
              onClick={() => handleToggle(item.id)}
              disabled={isMaxReached}
              className={cn(
                "flex items-center justify-around gap-2 px-2 py-2.5 rounded-full border-2 transition-all duration-200",
                "font-bold text-[11px] uppercase tracking-widest w-5/12 h-16",
                isSelected
                  ? "border-primary bg-primary/10 text-primary scale-105"
                  : "border-muted text-muted-foreground",
                isMaxReached && "opacity-20 grayscale",
              )}
            >
              <span className="text-base whitespace-pre-line leading-tight flex flex-col">
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
