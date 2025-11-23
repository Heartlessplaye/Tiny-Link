export default function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 rounded-md bg-input text-foreground border border-border focus:ring-2 focus:ring-ring outline-none ${className}`}
    />
  );
}
