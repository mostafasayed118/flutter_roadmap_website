import { describe, it, expect, beforeEach, vi } from "vitest";
import { getReadDocs, toggleReadDoc, markDocAsRead, parseContent } from "./docs-helpers";

describe("getReadDocs", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty set when no data stored", () => {
    const result = getReadDocs();
    expect(result).toBeInstanceOf(Set);
    expect(result.size).toBe(0);
  });

  it("returns stored docs", () => {
    localStorage.setItem("flutter-roadmap-read-docs", JSON.stringify(["doc1", "doc2"]));
    const result = getReadDocs();
    expect(result.size).toBe(2);
    expect(result.has("doc1")).toBe(true);
    expect(result.has("doc2")).toBe(true);
  });

  it("handles invalid JSON gracefully", () => {
    localStorage.setItem("flutter-roadmap-read-docs", "invalid json");
    const result = getReadDocs();
    expect(result).toBeInstanceOf(Set);
    expect(result.size).toBe(0);
  });
});

describe("toggleReadDoc", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds doc to read list", () => {
    const result = toggleReadDoc("doc1");
    expect(result.has("doc1")).toBe(true);
    expect(result.size).toBe(1);
  });

  it("removes doc from read list", () => {
    toggleReadDoc("doc1");
    const result = toggleReadDoc("doc1");
    expect(result.has("doc1")).toBe(false);
    expect(result.size).toBe(0);
  });

  it("persists to localStorage", () => {
    toggleReadDoc("doc1");
    const stored = JSON.parse(localStorage.getItem("flutter-roadmap-read-docs") || "[]");
    expect(stored).toContain("doc1");
  });
});

describe("markDocAsRead", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds doc to read list", () => {
    const result = markDocAsRead("doc1");
    expect(result.has("doc1")).toBe(true);
  });

  it("does not duplicate docs", () => {
    markDocAsRead("doc1");
    const result = markDocAsRead("doc1");
    expect(result.size).toBe(1);
  });
});

describe("parseContent", () => {
  it("parses headings", () => {
    const result = parseContent("# Heading 1\n## Heading 2");
    expect(result).toHaveLength(2);
    expect(result[0].type).toBe("heading");
    expect(result[0].level).toBe(1);
    expect(result[0].content).toBe("Heading 1");
    expect(result[1].level).toBe(2);
  });

  it("parses paragraphs", () => {
    const result = parseContent("This is a paragraph.");
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("paragraph");
    expect(result[0].content).toBe("This is a paragraph.");
  });

  it("parses unordered lists", () => {
    const result = parseContent("- Item 1\n- Item 2\n- Item 3");
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("list");
    expect(result[0].items).toHaveLength(3);
  });

  it("parses ordered lists", () => {
    const result = parseContent("1. First\n2. Second\n3. Third");
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("list");
    expect(result[0].items).toHaveLength(3);
  });

  it("parses blockquotes", () => {
    const result = parseContent("> This is a quote");
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("blockquote");
  });

  it("parses horizontal rules", () => {
    const result = parseContent("---");
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("hr");
  });

  it("generates heading ids", () => {
    const result = parseContent("## My Heading");
    expect(result[0].id).toBe("my-heading");
  });

  it("handles empty input", () => {
    const result = parseContent("");
    expect(result).toHaveLength(0);
  });
});
