import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Card from "../components/ui/Card";
import {
  Globe,
  MousePointerClick,
  CalendarClock,
  Hash,
  Info,
} from "lucide-react";
import { getLink } from "../middleware/api";
import { NavLink } from "react-router-dom";
export default function StatsPage() {
  const { code } = useParams();
  const [codeData, setCodeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLink(code)
      .then((data) => {
        setCodeData(data.data);
      })
      .catch(() => {
        setCodeData(null);
      })
      .finally(() => setLoading(false));
  }, [code]);

  if (loading) {
    return (
      <div className="flex justify-center py-20 animate-fade-in">
        <p className="text-muted-foreground">Loading analytics…</p>
      </div>
    );
  }

  if (!codeData) {
    return (
      <div className="flex justify-center py-20 animate-fade-in">
        <Card className="max-w-lg text-center py-10">
          <div className="flex justify-center mb-4">
            <Info className="w-10 h-10 text-muted-foreground" />
          </div>

          <h2 className="text-xl font-semibold mb-2">No Analytics Found</h2>

          <p className="text-muted-foreground mb-6">
            The short code <strong>'{code}'</strong> does not exist or has no
            analytics.
          </p>

          <NavLink
            to="/"
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition"
          >
            Go Back Home
          </NavLink>
        </Card>
      </div>
    );
  }
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
      {codeData && (
        <Card title={`Stats for '${code}'`}>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* URL SECTION */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/40 border border-border/50">
              <div className="p-2 rounded-md bg-primary/10 text-primary">
                <Globe className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Destination URL</p>
                <p className="font-medium break-all">{codeData.url}</p>
              </div>
            </div>

            {/* TOTAL CLICKS */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/40 border border-border/50">
              <div className="p-2 rounded-md bg-blue-500/10 text-blue-500">
                <MousePointerClick className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Total Clicks</p>
                <p className="font-semibold text-xl">{codeData.total_clicks}</p>
              </div>
            </div>

            {/* LAST CLICKED */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/40 border border-border/50">
              <div className="p-2 rounded-md bg-amber-500/10 text-amber-500">
                <CalendarClock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Last Clicked</p>
                <p className="font-medium">
                  {codeData.last_clicked_at
                    ? format(
                        new Date(codeData.last_clicked_at),
                        "MMM d, yyyy • HH:mm"
                      )
                    : "Never"}
                </p>
              </div>
            </div>

            {/* SHORT CODE */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/40 border border-border/50">
              <div className="p-2 rounded-md bg-purple-500/10 text-purple-500">
                <Hash className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Short Code</p>
                <p className="font-semibold">{code}</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
