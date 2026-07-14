import type { LucideIcon } from "lucide-react";

export type DocCategoryType =
  | "dart"
  | "flutter"
  | "bloc"
  | "packages"
  | "firebase"
  | "cheat-sheet";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface CodeSnippet {
  id: string;
  language: "dart" | "yaml" | "bash" | "json" | "sql" | "css" | "javascript" | "properties" | "groovy";
  code: string;
  label: string;
  description?: string;
}

export interface DocEntry {
  id: string;
  title: string;
  category: DocCategoryType;
  summary: string;
  content: string;
  codeSnippets: CodeSnippet[];
  relatedWeeks: number[];
  tags: string[];
  difficulty: Difficulty;
  sourceUrl?: string;
}

export interface DocCategoryGroup {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  categoryType: DocCategoryType;
  entries: DocEntry[];
}
