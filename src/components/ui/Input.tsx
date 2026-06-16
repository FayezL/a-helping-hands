import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  registration?: object;
}

export default function Input({ label, error, registration, className = "", id, ...props }: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-secondary-800">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`block w-full rounded-2xl border border-secondary-200 bg-white px-4 py-3 text-sm text-foreground shadow-sm placeholder:text-secondary-300 transition-colors focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-300/30 disabled:bg-secondary-50 disabled:text-secondary-400 ${error ? "border-red-400 focus:border-red-400 focus:ring-red-300/30" : ""} ${className}`}
        {...registration}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
