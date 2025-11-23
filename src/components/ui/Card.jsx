export default function Card({ title, children, className = "" }) {
  return (
    <div
      className={`bg-card text-card-foreground border border-border rounded-lg p-4 shadow-sm ${className}`}
    >
      {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
      {children}
    </div>
  );
}
