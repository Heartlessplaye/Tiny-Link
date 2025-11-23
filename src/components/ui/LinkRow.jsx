import { Link as RouterLink } from "react-router-dom";
import Button from "./Button";
import { Copy, BarChart2, Trash2, ExternalLink } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function LinkRow({ value, onDelete, onCopy }) {
  return (
    <tr className="border-b border-border hover:bg-muted/50">
      <td className="px-3 py-2 font-mono">
        <div className="flex items-center gap-2">
          {value.code}

          <div className="relative group">
            <a
              href={`${import.meta.env.VITE_API_BASE_URL}/api/code/${
                value.code
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <Tooltip text="Visit URL" />
          </div>
        </div>
      </td>

      <td className="px-3 py-2 max-w-[300px]">
        <span className="truncate-url">{value.url}</span>
      </td>

      <td className="px-3 py-2 text-center">{value.total_clicks ?? 0}</td>

      <td className="px-3 py-2 text-center">
        {value.last_clicked_at
          ? format(parseISO(value.last_clicked_at), "dd MMM yyyy, hh:mm a")
          : "-"}
      </td>

      <td className="px-3 py-2 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="relative group">
            <Button
              variant="ghost"
              className="p-2"
              onClick={() => onCopy(value)}
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Tooltip text="Copy short URL" />
          </div>

          <div className="relative group">
            <RouterLink to={`/code/${value.code}`}>
              <Button variant="icon" className="p-2 border border-border">
                <BarChart2 className="w-4 h-4" />
              </Button>
            </RouterLink>
            <Tooltip text="View stats" />
          </div>

          <div className="relative group">
            <Button
              variant="destructive"
              className="p-2"
              onClick={() => onDelete(value.code)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Tooltip text="Delete" />
          </div>
        </div>
      </td>
    </tr>
  );
}

function Tooltip({ text }) {
  return (
    <span
      className="absolute -top-7 left-1/2 -translate-x-1/2
      text-[11px] text-white bg-neutral-800/90
      px-2 py-1 rounded shadow-md
      opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
      transition-all duration-150 whitespace-nowrap pointer-events-none"
    >
      {text}
    </span>
  );
}
