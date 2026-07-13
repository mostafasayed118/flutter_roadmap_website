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
  language: string;
  code: string;
  label?: string;
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
}

export interface DocCategoryGroup {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  categoryType: DocCategoryType;
  entries: DocEntry[];
}
