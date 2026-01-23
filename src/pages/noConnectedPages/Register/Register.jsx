import InputField from "@/components/custom/InputField";
import TitlePage from "@/components/custom/TitlePage";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { signUpUser } from "@/services/auth";
import { useUserStore } from "@/store/user/useUserStore";
import { generateCoachCode, validateRegister } from "@/utils/validateRegister";
import React, { useState } from "react";
import { FiActivity } from "react-icons/fi";
import { LuDumbbell } from "react-icons/lu";
import { LuTrophy } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Register() {
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "athlete", // Valeur par défaut
    invitation_code : null
  });

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

  function handleChange(event) {
    const { id, value } = event.target;

    // 1. On met à jour la data dynamiquement grâce à l'id de l'input
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

 

  async function handleRegister(event) {
    event.preventDefault();

    if (!validateRegister(formData)) {
      return;
    }

    try {
      // 1. On calcule le code localement (pas dans le state)
      let finalCode = null;
      if (formData.role === "coach") {
        finalCode = generateCoachCode();
      }

      // 2. On prépare l'objet final à envoyer au service
      const userData = {
        ...formData,
        invitation_code: finalCode,
      };
      const data = await signUpUser(userData);
      // 3 lignes de test

      if (data?.user) {
        // C'EST CETTE LIGNE QUI REMPLIT TON LOCAL STORAGE
        login({
          id: data.user.id,
          email: data.user.email,
          username: formData.name, // On récupère le nom du formulaire
          role: formData.role, // On récupère le rôle du formulaire
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
    }
  }

  return (
    <div className="w-full max-w-96 mx-auto mt-5">
      <TitlePage titlePage="Inscription" iconPage={<FiActivity />} />

      <form onSubmit={handleRegister} className=" w-full my-8 " noValidate>
        {inputsRegister.map((input) => (
          <InputField key={input.id} onChange={handleChange} {...input} />
        ))}
        <RadioGroup
          defaultValue="athlete"
          onValueChange={(value) => {
            setFormData({ ...formData, role: value });
          }}
          className="grid grid-cols-2 gap-4 my-6"
        >
          <div>
            <RadioGroupItem
              value="athlete"
              id="athlete"
              className="peer sr-only"
            />
            <Label
              htmlFor="athlete"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <LuDumbbell className="mb-3 h-6 w-6" />
              <span className="font-semibold">Athlète</span>
            </Label>
          </div>

          <div>
            <RadioGroupItem value="coach" id="coach" className="peer sr-only" />
            <Label
              htmlFor="coach"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <LuTrophy className="mb-3 h-6 w-6" />
              <span className="font-semibold">Coach</span>
            </Label>
          </div>
        </RadioGroup>
        <button
          type="submit"
          className={cn(
            "py-2.5 rounded-lg transition-all font-medium w-full max-w-96 mt-4 text-secondary-foreground bg-secondary",
            " hover:text-secondary-foreground hover:bg-accent",
          )}
        >
          Inscription
        </button>
      </form>
    </div>
  );
}
