import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"; // Loader2 for spinning
import { healthcheck } from "../middleware/api";

export default function HealthCheck() {
  const [status, setStatus] = useState("loading");
  const [version, setVersion] = useState(null);

  useEffect(() => {
    healthcheck()
      .then((data) => {
        setVersion(data.version || "1.0");
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  let icon;
  let title;
  let description;
  let badgeColor;

  switch (status) {
    case "loading":
      icon = (
        <Loader2 className="w-14 h-14 text-blue-500 mx-auto animate-spin" />
      );
      title = "Checking Server...";
      description = "Please wait while we verify the system status.";
      badgeColor = "bg-blue-500/10 text-blue-600";
      break;
    case "success":
      icon = (
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto animate-pulse" />
      );
      title = "Server Healthy";
      description = `All systems operational — Version ${version}`;
      badgeColor = "bg-green-500/10 text-green-600";
      break;
    case "error":
      icon = (
        <AlertCircle className="w-14 h-14 text-red-500 mx-auto animate-pulse" />
      );
      title = "Server Unreachable";
      description = "Something went wrong — unable to reach the server.";
      badgeColor = "bg-red-500/10 text-red-600";
      break;
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="p-8 rounded-2xl border bg-card shadow-sm text-center space-y-3 animate-in fade-in zoom-in duration-300">
        {icon}
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>

        <div className="mt-3">
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${badgeColor}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
