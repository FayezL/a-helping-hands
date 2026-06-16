import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`rounded-3xl bg-white p-8 shadow-sm shadow-secondary-200/40 border border-secondary-100/60 ${
        hover
          ? "transition-all duration-300 hover:shadow-xl hover:shadow-accent-200/30 hover:-translate-y-1"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
