import InputField from "@/components/custom/InputField";
import TitlePage from "@/components/custom/TitlePage";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { signUpUser } from "@/services/auth";
import { useUserStore } from "@/store/user/useUserStore";
import { generateCoachCode, validateRegister } from "@/utils/validateRegister";
import React, { useState } from "react";
import { FiActivity } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import RoleSelector from "./RoleSelector";

export default function Register() {
  // feedback UX
  const [isLoading, setIsLoading] = useState(false);
  // zustand
  const login = useUserStore((state) => state.login);
  // router
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "athlete", // Valeur par défaut
    invitation_code: null,
  });

  //  on ne sort pas ce tableau du composant => gestion des states
  const inputsRegister = [
    {
      label: "Nom / Pseudo",
      id: "name",
      type: "text",
      value: formData.name,
      autoComplete: "name",
    },
    {
      label: "Email",
      id: "email",
      type: "email",
      value: formData.email,
      autoComplete: "email",
    },
    {
      label: "Password",
      id: "password",
      type: "password",
      value: formData.password,
      autoComplete: "password",
    },
    {
      label: "Confirm Password",
      id: "confirmPassword",
      type: "password",
      value: formData.confirmPassword,
      autoComplete: null,
    },
  ];

  //  modification des states des inputs
  function handleChange(event) {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  async function handleRegister(event) {
    event.preventDefault();

    // 1. Validation des inputs
    if (!validateRegister(formData)) {
      return;
    }
    setIsLoading(true);

    try {
      // 2. On calcule le code coach localement (pas dans le state)
      let finalCode = null;
      if (formData.role === "coach") {
        finalCode = generateCoachCode();
      }

      // 3. On prépare l'objet final à envoyer au service
      const userData = {
        ...formData,
        invitation_code: finalCode,
      };

      // 4. Appel de Supabase
      const data = await signUpUser(userData);

      if (data?.user) {
        // 5. Mise à jour du store (Zustand)
        login({
          id: data.user.id,
          email: data.user.email,
          username: formData.name,
          role: formData.role,
          invitation_code: finalCode,
        });
        toast.success("Bienvenue dans l'aventure A.R.C. !");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "athlete",
          invitation_code: null,
        });

        setTimeout(() => {
          navigate("/athlete/profile");
        }, 1500);
      }
    } catch (err) {
      toast.error(err.message);
      console.error("Détails techniques:", err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-96 mx-auto mt-5">
      <TitlePage titlePage="Inscription" iconPage={<FiActivity />} />

      <form onSubmit={handleRegister} className=" w-full my-8 " noValidate>
        {inputsRegister.map((input) => (
          <InputField key={input.id} onChange={handleChange} {...input} />
        ))}

        <RoleSelector
          value={formData.role}
          onChange={(value) => setFormData({ ...formData, role: value })}
        />

        <button
          type="submit"
          className={cn(
            "py-2.5 rounded-lg transition-all font-medium w-full max-w-96 mt-4 text-secondary-foreground bg-secondary",
            " hover:text-secondary-foreground hover:bg-accent",
          )}
          disabled={isLoading}
        >
          {isLoading ? "Inscription en cours..." : "Inscription"}
        </button>
      </form>
    </div>
  );
}
