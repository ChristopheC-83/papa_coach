import { toast } from "sonner";

export function validateRegister(formData) {
  if (!formData.name || formData.name.trim().length < 3) {
    toast.error("Le nom doit contenir au moins 3 caractères.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    toast.error("Adresse email invalide.");
    return false;
  }

  if (!formData.password || formData.password.length < 6) {
    toast.error("Le mot de passe doit contenir au moins 6 caractères.");
    return false;
  }

  if (!formData.confirmPassword || formData.confirmPassword.length < 6) {
    toast.error(
      "Le mot de passe de confirmation doit contenir au moins 6 caractères.",
    );
    return false;
  }

  if (formData.password !== formData.confirmPassword) {
    toast.error("Les mots de passe ne correspondent pas.");
    return false;
  }

  if (!formData.role) {
    toast.error("Veuillez choisir un rôle (Coach ou Athlète).");
    return false;
  }

  return true
}
