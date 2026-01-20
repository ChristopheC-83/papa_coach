import InputField from "@/components/custom/InputField";
import Title from "@/components/custom/Title";
import TitlePage from "@/components/custom/TitlePage";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputsLlogin = [
    {
      label: "Email",
      id: "email",
      type: "email",
      value: email,
      autoComplete: "email",
      onChange: (e) => setEmail(e.target.value),
    },
    {
      label: "Password",
      id: "password",
      type: "password",
      value: password,
      autoComplete: "password",
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  function handleLogin(event) {
    event.preventDefault();
  }

  return (
    <div className="w-full max-w-96 mx-auto mt-5">
      <TitlePage titlePage="Connexion" iconPage={<FiLogIn />} />

      <form onSubmit={handleLogin} className=" w-full my-8 ">
        {inputsLlogin.map((input) => (
          <InputField key={input.id} {...input} />
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
