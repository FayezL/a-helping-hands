"use client";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  registration?: object;
  options: { value: string; label: string }[];
}

export default function Select({
  label,
  error,
  registration,
  options,
  className = "",
  id,
  ...props
}: SelectProps) {
  const selectId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      <label
        htmlFor={selectId}
        className="mb-1.5 block text-sm font-medium text-secondary-800"
      >
        {label}
      </label>
      <select
        id={selectId}
        className={`w-full rounded-2xl border border-secondary-200 bg-white px-4 py-3 text-secondary-900 transition-colors focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-300/30 ${error ? "border-red-400 focus:border-red-400 focus:ring-red-300/30" : ""} ${className}`}
        {...registration}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
