import type { DocCategory } from "@/lib/docs-data";

function matchesQuery(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}

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
