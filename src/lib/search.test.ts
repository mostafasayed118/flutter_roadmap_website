import { describe, it, expect } from "vitest";
import { filterCategories, filterCategoryGroups } from "./search";
import type { DocCategory } from "@/lib/docs-data";
import type { DocCategoryGroup } from "@/lib/docs/types";
import { Code2, Smartphone } from "lucide-react";

describe("filterCategories", () => {
  const mockCategories: DocCategory[] = [
    {
      id: "dart-basics",
      title: "Dart Basics",
      icon: Code2,
      description: "Basic Dart concepts",
      sections: [
        {
          id: "variables",
          title: "Variables",
          content: "Dart has strong typing with var, final, const",
          codeSnippets: [{ language: "dart", code: "var name = 'Flutter';", label: "Variable declaration" }],
        },
        {
          id: "functions",
          title: "Functions",
          content: "Functions are first-class objects in Dart",
          codeSnippets: [],
        },
      ],
    },
    {
      id: "flutter-widgets",
      title: "Flutter Widgets",
      icon: Smartphone,
      description: "Flutter widget concepts",
      sections: [
        {
          id: "container",
          title: "Container",
          content: "Container is a convenience widget",
          codeSnippets: [{ language: "dart", code: "Container(child: Text('Hello'))", label: "Basic container" }],
        },
      ],
    },
  ];

  it("returns all categories when query is empty", () => {
    expect(filterCategories(mockCategories, "")).toEqual(mockCategories);
    expect(filterCategories(mockCategories, "   ")).toEqual(mockCategories);
  });

  it("filters by section title", () => {
    const result = filterCategories(mockCategories, "Variables");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Dart Basics");
    expect(result[0].sections).toHaveLength(1);
    expect(result[0].sections[0].title).toBe("Variables");
  });

  it("filters by content", () => {
    const result = filterCategories(mockCategories, "first-class");
    expect(result).toHaveLength(1);
    expect(result[0].sections[0].title).toBe("Functions");
  });

  it("filters by code snippet label", () => {
    const result = filterCategories(mockCategories, "Variable declaration");
    expect(result).toHaveLength(1);
    expect(result[0].sections[0].title).toBe("Variables");
  });

  it("filters by code snippet code", () => {
    const result = filterCategories(mockCategories, "Container");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Flutter Widgets");
  });

  it("is case insensitive", () => {
    const result = filterCategories(mockCategories, "VARIABLES");
    expect(result).toHaveLength(1);
  });

  it("returns empty array when no matches", () => {
    const result = filterCategories(mockCategories, "nonexistent");
    expect(result).toHaveLength(0);
  });
});

describe("filterCategoryGroups", () => {
  const mockGroups: DocCategoryGroup[] = [
    {
      id: "dart",
      title: "Dart",
      icon: Code2,
      description: "Dart language reference",
      categoryType: "dart",
      entries: [
        {
          id: "dart-variables",
          title: "Variables",
          category: "dart",
          summary: "Dart has strong typing",
          content: "Full content here",
          codeSnippets: [{ id: "var-1", code: "var x = 1;", language: "dart", label: "Basic variable" }],
          tags: ["dart", "basics", "variables"],
          difficulty: "beginner",
          relatedWeeks: [1],
        },
        {
          id: "dart-functions",
          title: "Functions",
          category: "dart",
          summary: "First-class objects",
          content: "Full content here",
          codeSnippets: [],
          tags: ["dart", "functions"],
          difficulty: "beginner",
          relatedWeeks: [1],
        },
      ],
    },
  ];

  it("returns all categories when query is empty", () => {
    expect(filterCategoryGroups(mockGroups, "")).toEqual(mockGroups);
  });

  it("filters by title", () => {
    const result = filterCategoryGroups(mockGroups, "Variables");
    expect(result).toHaveLength(1);
    expect(result[0].entries).toHaveLength(1);
    expect(result[0].entries[0].title).toBe("Variables");
  });

  it("filters by summary", () => {
    const result = filterCategoryGroups(mockGroups, "first-class");
    expect(result).toHaveLength(1);
    expect(result[0].entries[0].title).toBe("Functions");
  });

  it("filters by tags", () => {
    const result = filterCategoryGroups(mockGroups, "basics");
    expect(result).toHaveLength(1);
    expect(result[0].entries[0].title).toBe("Variables");
  });

  it("filters by code snippet label", () => {
    const result = filterCategoryGroups(mockGroups, "Basic variable");
    expect(result).toHaveLength(1);
  });

  it("filters by code snippet code", () => {
    const result = filterCategoryGroups(mockGroups, "var x");
    expect(result).toHaveLength(1);
  });

  it("is case insensitive", () => {
    const result = filterCategoryGroups(mockGroups, "VARIABLES");
    expect(result).toHaveLength(1);
  });

  it("returns empty array when no matches", () => {
    const result = filterCategoryGroups(mockGroups, "nonexistent");
    expect(result).toHaveLength(0);
  });
});
