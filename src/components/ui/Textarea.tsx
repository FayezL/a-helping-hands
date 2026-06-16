import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  registration?: object;
}

export default function Textarea({ label, error, registration, className = "", id, ...props }: TextareaProps) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-secondary-800">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`block w-full rounded-2xl border border-secondary-200 bg-white px-4 py-3 text-sm text-foreground shadow-sm placeholder:text-secondary-300 transition-colors focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-300/30 disabled:bg-secondary-50 disabled:text-secondary-400 ${error ? "border-red-400 focus:border-red-400 focus:ring-red-300/30" : ""} ${className}`}
        rows={3}
        {...registration}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
