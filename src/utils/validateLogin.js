import { toast } from "sonner";

export function validateLogin(formData) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    toast.error("Adresse email invalide.");
    return;
  }

  if (!formData.password) {
    toast.error("Saisir votre mot de passe.");
    return;
  }

  toast.success("Connexion réussie.");
}
