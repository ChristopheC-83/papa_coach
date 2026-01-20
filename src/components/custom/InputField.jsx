import { useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";

export default function InputField({
  label,
  id,
  type,
  value="",
  autoComplete,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);

  // ✅ On mémorise si c'est un champ password à la création du composant
  // Cette valeur ne changera pas même si 'type' de l'input devient 'text'
  const isPasswordInput = type === "password";

  return (
    <div className="mb-5">
      <div className="flex gap-2 items-center">
        <label htmlFor={id} className="block mb-3 font-medium text-foreground">
          {label}
        </label>

        {/* On utilise notre constante stable pour l'affichage de l'œil */}
        {isPasswordInput && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="mb-3 cursor-pointer text-muted-foreground hover:text-primary transition-colors"
          >
            {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
          </button>
        )}
      </div>

      <input
        id={id}
        // Logique de bascule : si c'était un password et qu'on veut voir -> text
        // Sinon, on garde le type d'origine
        type={isPasswordInput && showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none focus:ring-2 focus:ring-primary/50"
      />
    </div>
  );
}
