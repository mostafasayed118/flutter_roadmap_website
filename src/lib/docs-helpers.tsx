import { DOCS } from "./constants";

// ── Read Docs Tracking (localStorage) ───────────────────────────
export function getReadDocs(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(DOCS.STORAGE_KEY_READ_DOCS);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

export function toggleReadDoc(docId: string): Set<string> {
  const readDocs = getReadDocs();
  if (readDocs.has(docId)) {
    readDocs.delete(docId);
  } else {
    readDocs.add(docId);
  }
  localStorage.setItem(DOCS.STORAGE_KEY_READ_DOCS, JSON.stringify([...readDocs]));
  return readDocs;
}

export function markDocAsRead(docId: string): Set<string> {
  const readDocs = getReadDocs();
  readDocs.add(docId);
  localStorage.setItem(DOCS.STORAGE_KEY_READ_DOCS, JSON.stringify([...readDocs]));
  return readDocs;
}

// ── Markdown Parsing ────────────────────────────────────────────
export interface ParsedBlock {
  type: string;
  level?: number;
  content: string;
  items?: string[];
  rows?: string[][];
  id?: string;
}

export function parseContent(raw: string): ParsedBlock[] {
  const lines = raw.split("\n");
  const blocks: ParsedBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (/^---+$/.test(line.trim())) {
      blocks.push({ type: "hr", content: "" });
      i++;
      continue;
    }

    const hMatch = line.match(/^(#{1,4})\s+(.+)/);
    if (hMatch) {
      const level = hMatch[1]!.length;
      const text = hMatch[2]!;
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      blocks.push({ type: "heading", level, content: text, id });
      i++;
      continue;
    }

    if (line.startsWith("> ")) {
      const q: string[] = [];
      while (i < lines.length && lines[i]!.startsWith("> ")) {
        q.push(lines[i]!.slice(2));
        i++;
      }
      blocks.push({ type: "blockquote", content: q.join("\n") });
      continue;
    }

    if (line.includes("|") && i + 1 < lines.length && lines[i + 1]!.includes("---")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i]!.includes("|")) {
        const cells = lines[i]!.split("|").map((c) => c.trim()).filter((c) => c.length > 0);
        if (!cells.every((c) => /^[-:]+$/.test(c))) rows.push(cells);
        i++;
      }
      if (rows.length > 0) blocks.push({ type: "table", content: "", rows });
      continue;
    }

    if (/^[-*]\s+/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i]!.trim())) {
        items.push(lines[i]!.trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push({ type: "list", content: "", items });
      continue;
    }

    if (/^\d+\.\s+/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i]!.trim())) {
        items.push(lines[i]!.trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "list", content: "", items });
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    const pLines: string[] = [];
    while (
      i < lines.length &&
      lines[i]!.trim() !== "" &&
      !lines[i]!.startsWith("#") &&
      !lines[i]!.startsWith("> ") &&
      !lines[i]!.startsWith("```") &&
      !/^[-*]\s+/.test(lines[i]!.trim()) &&
      !/^\d+\.\s+/.test(lines[i]!.trim()) &&
      !/^---+$/.test(lines[i]!.trim()) &&
      !(lines[i]!.includes("|") && i + 1 < lines.length && lines[i + 1]!.includes("---"))
    ) {
      pLines.push(lines[i]!);
      i++;
    }
    if (pLines.length > 0) blocks.push({ type: "paragraph", content: pLines.join("\n") });
  }

  return blocks;
}

// ── Inline Markdown Formatting ──────────────────────────────────
export function formatInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const codeMatch = remaining.match(/`([^`]+)`/);
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    const italicMatch = remaining.match(/(?<!\*)\*([^*]+)\*(?!\*)/);
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    const matches = [
      codeMatch ? { type: "code" as const, m: codeMatch, i: codeMatch.index! } : null,
      boldMatch ? { type: "bold" as const, m: boldMatch, i: boldMatch.index! } : null,
      italicMatch ? { type: "italic" as const, m: italicMatch, i: italicMatch.index! } : null,
      linkMatch ? { type: "link" as const, m: linkMatch, i: linkMatch.index! } : null,
    ]
      .filter(Boolean)
      .sort((a, b) => a!.i - b!.i);

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    const first = matches[0]!;
    if (first.i > 0) parts.push(remaining.slice(0, first.i));

    switch (first.type) {
      case "code":
        parts.push(
          <code key={key++} className="rounded-md bg-muted/80 px-1.5 py-0.5 font-mono text-[13px] text-violet-300">
            {first.m[1]}
          </code>
        );
        break;
      case "bold":
        parts.push(
          <strong key={key++} className="font-semibold text-foreground">
            {first.m[1]}
          </strong>
        );
        break;
      case "italic":
        parts.push(
          <em key={key++} className="italic text-muted-foreground/80">
            {first.m[1]}
          </em>
        );
        break;
      case "link":
        parts.push(
          <a
            key={key++}
            href={first.m[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-violet-400 underline decoration-violet-400/30 underline-offset-2 hover:text-violet-300"
          >
            {first.m[1]}
          </a>
        );
        break;
    }

    remaining = remaining.slice(first.i + first.m[0].length);
  }

  return parts;
}
