import InputField from "@/components/custom/InputField";
import TitlePage from "@/components/custom/TitlePage";
import { cn } from "@/lib/utils";
import { LoginUser } from "@/services/loginUser";
import { useUserStore } from "@/store/user/useUserStore";
import { validateLogin } from "@/utils/validateLogin";
import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Pour le feedback UX

  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();

  const inputsLlogin = [
    {
      label: "Email",
      id: "email",
      type: "email",
      value: formData.email,
      autoComplete: "email",
    },
    {
      label: "Mot de Passe",
      id: "password",
      type: "password",
      value: formData.password,
      autoComplete: "password",
    },
  ];

  function handleChange(event) {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  async function handleLogin(event) {
    event.preventDefault();
    // 1. Validation locale
    if (!validateLogin(formData)) {
      return;
    }
    setIsLoading(true);

    try {
      // 2. Appel du service que tu as créé
      const userData = await LoginUser({
        email: formData.email,
        password: formData.password,
      });

      // 3. Mise à jour du store (Zustand)
      login(userData);

      toast.success(`Content de vous revoir !`);
      setFormData({ email: "", password: "" });

      // 4. On dégage vers le profil
      navigate("/athlete/profile");
    } catch (err) {
      let message = "Une erreur est survenue";
      if (err.message === "Invalid login credentials") {
        message = "Email et/ou mot de passe incorrect";
      }

      toast.error(message);
      console.error("Détails techniques:", err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-96 mx-auto mt-5">
      <TitlePage titlePage="Connexion" iconPage={<FiLogIn />} />

      <form onSubmit={handleLogin} className=" w-full my-8 " noValidate>
        {inputsLlogin.map((input) => (
          <InputField key={input.id} onChange={handleChange} {...input} />
        ))}
        <button
          type="submit"
          className={cn(
            "py-2.5 rounded-lg transition-all font-medium w-full max-w-96 mt-4 text-secondary-foreground bg-secondary",
            " hover:text-secondary-foreground hover:bg-accent",
          )}
        >
          {isLoading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
