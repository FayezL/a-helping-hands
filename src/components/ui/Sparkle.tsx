interface SparkleProps {
  className?: string;
}

export default function Sparkle({ className = "" }: SparkleProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l1.8 6.7L20.5 10.5l-6.7 1.8L12 19l-1.8-6.7L3.5 10.5l6.7-1.8z" />
      <path d="M19 14l.9 3.1L23 18l-3.1.9L19 22l-.9-3.1L15 18l3.1-.9z" opacity="0.6" />
    </svg>
  );
}
