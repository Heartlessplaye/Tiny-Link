import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const loc = useLocation();
  return (
    <header className="w-full bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-5xl mx-auto p-4 flex items-center justify-between gap-4">
        <Link to="/" className="text-xl font-bold">
          TinyLink
        </Link>

        <nav className="flex items-center gap-3">
          <NavLink to="/" active={loc.pathname === "/"}>
            Dashboard
          </NavLink>
          <NavLink to="/healthz" active={loc.pathname === "/healthz"}>
            Health
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, children, active }) {
  return (
    <Link
      to={to}
      className={`px-3 py-1 rounded ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
