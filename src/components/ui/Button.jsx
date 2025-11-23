import clsx from "clsx";
export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  const base =
    "px-4 py-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-ring";
  const map = {
    primary: "bg-primary text-primary-foreground",
    ghost: "bg-transparent border border-border text-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    success: "bg-success text-white",
    info: "bg-info text-white",
    icon: "p-2 rounded-md bg-muted hover:bg-muted/70 flex items-center justify-center",
  };
  return (
    <button className={clsx(base, map[variant], className)} {...props}>
      {children}
    </button>
  );
}
