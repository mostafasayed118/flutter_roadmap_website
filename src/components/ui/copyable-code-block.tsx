"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CopyableCodeBlockProps {
  code: string;
  language?: string;
  label?: string;
}

export function CopyableCodeBlock({ code, language, label }: CopyableCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  return (
    <div className="group relative rounded-lg border border-border bg-popover/80 overflow-hidden">
      {(label || language) && (
        <div className="flex items-center justify-between border-b border-border/50 px-3 py-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            {label ?? language}
          </span>
          {language && !label && (
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">
              {language}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-3 text-sm font-mono text-zinc-300 leading-relaxed">
          <code>{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className={cn(
            "absolute top-2 right-2 flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-all duration-200",
            "opacity-0 group-hover:opacity-100 focus:opacity-100",
            copied
              ? "bg-emerald-500/20 text-emerald-400 scale-100"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:scale-105"
          )}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
        >
          {copied ? (
            <>
              <Check className="size-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3" />
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}
