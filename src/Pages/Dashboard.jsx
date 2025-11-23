import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import LinkRow from "../components/ui/LinkRow";
import { listLinks, createLink, deleteLink } from "../middleware/api";
import { isValidUrl, isValidCode } from "../utils/validator";
import {
  ExternalLink,
  LinkIcon,
  PlusCircle,
  Search,
  Loader2,
  Copy,
} from "lucide-react";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [created, setCreated] = useState(null);

  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);
  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await listLinks();

      setLinks(data.data);
    } catch (e) {
      setError(e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  const filteredLinks = links.filter((l) => {
    if (!debouncedSearch.trim()) return true;

    const term = debouncedSearch.toLowerCase();

    return (
      l.code.toLowerCase().includes(term) || l.url.toLowerCase().includes(term)
    );
  });

  async function handleCreate() {
    setError("");
    if (!isValidUrl(url))
      return setError("Please provide a valid URL (include protocol).");
    if (code && !isValidCode(code))
      return setError("Custom code must match [A-Za-z0-9]{6,8}.");
    setCreating(true);
    try {
      const payload = { url: url, code: code || undefined };
      const created = await createLink(payload);
      setLinks((prev) => [created.data, ...prev]);
      setUrl("");
      setCode("");
      setCreated(created.data);
    } catch (e) {
      if (e.status === 409) setError("Code already exists.");
      else setError(e.message || "Create failed");
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(codeToDelete) {
    if (!confirm("Delete this link?")) return;
    try {
      await deleteLink(codeToDelete);
      setLinks((prev) => prev.filter((l) => l.code !== codeToDelete));
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  }
  function handleCopy(value) {
    const shortUrl = `${window.location.origin}/${value.code}`;

    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        alert(`Copied: ${shortUrl}`);
      })
      .catch(() => {
        alert("Failed to copy.");
      });
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <LinkIcon className="w-6 h-6 text-primary" />
          Dashboard
        </h1>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by code or URL"
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <Card title="Create Short Link">
        <div className="grid gap-3 sm:grid-cols-12">
          <div className="sm:col-span-6">
            <Input
              placeholder="https://example.com/very/long/path"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="sm:col-span-3">
            <Input
              placeholder="Custom code (6-8 chars)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <div className="sm:col-span-3 flex items-center">
            <Button
              onClick={handleCreate}
              disabled={creating}
              className="w-full flex items-center justify-center gap-2"
            >
              {creating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  Create
                </>
              )}
            </Button>
          </div>
        </div>

        {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        {created && (
          <div className="mt-4 p-4 rounded-xl border bg-muted/40 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
            <div>
              <p className="text-sm text-muted-foreground">
                Short Link Created
              </p>
              <a
                href={`${window.location.origin}/${created.code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                {window.location.origin}/{created.code}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="p-2"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${window.location.origin}/${created.code}`
                  )
                }
              >
                <Copy className="w-4 h-4" />
              </Button>

              <a
                href={`${window.location.origin}/${created.code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border text-muted-foreground hover:text-primary transition"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </Card>

      {/* LINKS TABLE */}
      <Card title="Links">
        {loading ? (
          <div className="py-6 text-center text-muted-foreground flex justify-center items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading your links…
          </div>
        ) : (
          <div className="overflow-x-auto">
            {links.length === 0 ? (
              <div className="p-6 bg-muted rounded text-muted-foreground text-center">
                No links yet. Start by creating one!
              </div>
            ) : (
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-left text-sm text-muted-foreground border-b border-border">
                    <th className="px-3 py-2">Code</th>
                    <th className="px-3 py-2">Target</th>
                    <th className="px-3 py-2 text-center">Clicks</th>
                    <th className="px-3 py-2 text-center">Last Clicked</th>
                    <th className="px-3 py-2 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {filteredLinks.map((l) => (
                    <LinkRow
                      key={l.code}
                      value={l}
                      onDelete={handleDelete}
                      onCopy={handleCopy}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
