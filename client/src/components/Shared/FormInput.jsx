import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const FormInput = ({
  type = "text",
  label,
  name,
  value,
  onChange,
  placeholder,
  required = true,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={className}>
      <label className="block text-cambridge-blue-800 text-sm font-medium mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2.5 border border-cambridge-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-golden-brown-300 focus:border-golden-brown-500 outline-none transition-all hover:border-golden-brown-300"
          placeholder={placeholder}
          required={required}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cambridge-blue-500 hover:text-golden-brown-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};
