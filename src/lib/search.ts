import type { DocCategory } from "@/lib/docs-data";
import type { DocCategoryGroup } from "@/lib/docs/types";

function matchesQuery(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}

/**
 * Filter old-format categories (backward compatible with existing docs page).
 */
export function filterCategories(
  categories: DocCategory[],
  query: string
): DocCategory[] {
  if (!query.trim()) return categories;

  return categories
    .map((cat) => ({
      ...cat,
      sections: cat.sections.filter(
        (sec) =>
          matchesQuery(sec.title, query) ||
          matchesQuery(sec.content, query) ||
          sec.codeSnippets?.some(
            (snip) =>
              matchesQuery(snip.code, query) ||
              (snip.label ? matchesQuery(snip.label, query) : false)
          )
      ),
    }))
    .filter((cat) => cat.sections.length > 0);
}

/**
 * Filter new-format categories (DocCategoryGroup with DocEntry).
 * Searches title, summary, tags, and snippet labels — NOT full content body.
 */
export function filterCategoryGroups(
  categories: DocCategoryGroup[],
  query: string
): DocCategoryGroup[] {
  if (!query.trim()) return categories;
  const q = query.toLowerCase();

  return categories
    .map((cat) => ({
      ...cat,
      entries: cat.entries.filter(
        (entry) =>
          entry.title.toLowerCase().includes(q) ||
          entry.summary.toLowerCase().includes(q) ||
          entry.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          entry.codeSnippets.some(
            (snip) =>
              (snip.label ? snip.label.toLowerCase().includes(q) : false) ||
              snip.code.toLowerCase().includes(q)
          )
      ),
    }))
    .filter((cat) => cat.entries.length > 0);
}
