import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLink } from "../middleware/api";
import { NavLink } from "react-router-dom";

export default function RedirectHandler() {
  const { code } = useParams();
  const [status, setStatus] = useState({
    loading: true,
    error: null,
    target: null,
  });

  useEffect(() => {
    let mounted = true;
    getLink(code)
      .then((data) => {
        if (!mounted) return;
        setStatus({ loading: false, error: null, target: data.data.url });

        if (data.data.url) {
          window.location.replace(
            `${import.meta.env.VITE_API_BASE_URL}/api/code/${code}`
          );
        }
      })
      .catch((e) => {
        if (!mounted) return;
        setStatus({
          loading: false,
          error: e.message || "Not found",
          target: null,
        });
      });
    return () => {
      mounted = false;
    };
  }, [code]);

  if (status.loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full bg-card border border-border p-6 rounded-xl shadow-md text-center space-y-4 animate-fade-in">
          <img
            src="https://i.gifer.com/ZZ5H.gif"
            alt="Loading"
            className="mx-auto w-20 h-20"
          />
          <h2 className="text-lg font-semibold text-foreground">
            Redirecting…
          </h2>
          <p className="text-muted-foreground text-sm">
            Please wait while we take you to your destination.
          </p>
        </div>
      </div>
    );
  }
  if (status.error)
    return (
      <div className="h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full bg-card border border-border p-6 rounded-xl shadow-md text-center space-y-4 animate-fade-in">
          <h2 className="text-xl font-semibold text-destructive">
            Link Not Found
          </h2>
          <p className="text-muted-foreground text-sm">
            The short link you're trying to access does not exist or has
            expired.
          </p>

          <NavLink
            to="/"
            className="inline-block mt-3 px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition"
          >
            Go Back Home
          </NavLink>
        </div>
      </div>
    );

  return null;
}
