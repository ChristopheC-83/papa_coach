import InputField from "@/components/custom/InputField";
import TitlePage from "@/components/custom/TitlePage";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { validateLogin } from "@/utils/validateLogin";
import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";

export default function Login() {
  const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

  const inputsLlogin = [
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
  ];

  function handleChange(event) {
    const { id, value } = event.target;

    // 1. On met à jour la data dynamiquement grâce à l'id de l'input
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  function handleLogin(event) {
      event.preventDefault();
      const error = validateLogin(formData);
      if (error) {
        return;
      }
  
      console.log("coucou");
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
          Connexion
        </button>
      </form>
    </div>
  );
}
