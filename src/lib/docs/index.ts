import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Smartphone,
  Layers,
  Package,
  Flame,
  Zap,
} from "lucide-react";
import type {
  DocCategoryType,
  DocCategoryGroup,
  DocEntry,
  CodeSnippet,
  Difficulty,
} from "./types";

export type { DocEntry, DocCategoryType, DocCategoryGroup, CodeSnippet, Difficulty } from "./types";

// Lazy-loaded category loaders
const categoryLoaders: Record<
  DocCategoryType,
  () => Promise<{ default: DocEntry[] }>
> = {
  dart: () => import("./docs-dart").then((m) => ({ default: m.dartDocs })),
  flutter: () =>
    import("./docs-flutter").then((m) => ({ default: m.flutterDocs })),
  bloc: () => import("./docs-bloc").then((m) => ({ default: m.blocDocs })),
  packages: () =>
    import("./docs-packages").then((m) => ({ default: m.packagesDocs })),
  firebase: () =>
    import("./docs-firebase").then((m) => ({ default: m.firebaseDocs })),
  "cheat-sheet": () =>
    import("./docs-cheat-sheet").then((m) => ({ default: m.cheatSheetDocs })),
};

const categoryMeta: Record<
  DocCategoryType,
  { id: string; title: string; icon: LucideIcon; description: string }
> = {
  dart: {
    id: "dart-core",
    title: "Dart Core Concepts",
    icon: Code2,
    description:
      "Master the Dart language — types, OOP, async, null safety, generics, and effective Dart guidelines.",
  },
  flutter: {
    id: "flutter-core",
    title: "Flutter UI & Core",
    icon: Smartphone,
    description:
      "Widgets, layout system, navigation, state management, animations, theming, and testing in Flutter.",
  },
  bloc: {
    id: "bloc-cubit",
    title: "Bloc & Cubit State Management",
    icon: Layers,
    description:
      "Predictable state management with Cubit (simple) and Bloc (event-driven), Flutter widgets, architecture patterns, and testing.",
  },
  packages: {
    id: "flutter-packages",
    title: "Essential Packages",
    icon: Package,
    description:
      "Production-proven packages for networking (Dio), navigation (go_router), state, storage (Hive), serialization (Freezed), UI, and device APIs.",
  },
  firebase: {
    id: "firebase",
    title: "Firebase Integration",
    icon: Flame,
    description:
      "FlutterFire setup, Authentication, Firestore, Storage, FCM, Analytics, Crashlytics, Remote Config, and Security Rules.",
  },
  "cheat-sheet": {
    id: "cheat-sheet",
    title: "Cheat Sheet",
    icon: Zap,
    description:
      "Quick reference cards for Dart, Flutter, Bloc/Cubit, Firebase, and deployment — copy-paste ready.",
  },
};

// Cache for loaded categories
const loadedCategories = new Map<DocCategoryType, DocEntry[]>();

/**
 * Load all categories lazily (for the docs page).
 * Returns cached results on subsequent calls.
 */
export async function loadAllCategories(): Promise<DocCategoryGroup[]> {
  const entries = await Promise.all(
    (Object.keys(categoryLoaders) as DocCategoryType[]).map(
      async (catType) => {
        if (loadedCategories.has(catType)) {
          return {
            ...categoryMeta[catType],
            categoryType: catType,
            entries: loadedCategories.get(catType)!,
          };
        }
        const loader = categoryLoaders[catType];
        const mod = await loader();
        loadedCategories.set(catType, mod.default);
        return {
          ...categoryMeta[catType],
          categoryType: catType,
          entries: mod.default,
        };
      }
    )
  );
  return entries;
}

/**
 * Load a single category lazily.
 */
export async function loadCategory(
  catType: DocCategoryType
): Promise<DocCategoryGroup> {
  if (loadedCategories.has(catType)) {
    return {
      ...categoryMeta[catType],
      categoryType: catType,
      entries: loadedCategories.get(catType)!,
    };
  }
  const loader = categoryLoaders[catType];
  const mod = await loader();
  loadedCategories.set(catType, mod.default);
  return {
    ...categoryMeta[catType],
    categoryType: catType,
    entries: mod.default,
  };
}

/**
 * Get all entries flattened (for search indexing).
 */
export async function getAllEntries(): Promise<DocEntry[]> {
  const categories = await loadAllCategories();
  return categories.flatMap((cat) => cat.entries);
}

/**
 * Find a single entry by ID across all categories.
 */
export async function findEntryById(
  id: string
): Promise<DocEntry | undefined> {
  const entries = await getAllEntries();
  return entries.find((e) => e.id === id);
}

/**
 * Get entries related to specific roadmap weeks.
 */
export async function getEntriesForWeek(
  week: number
): Promise<DocEntry[]> {
  const entries = await getAllEntries();
  return entries.filter((e) => e.relatedWeeks.includes(week));
}

/**
 * Synchronous access to categories (must be loaded first via loadAllCategories).
 * Used by the docs page after initial load.
 */
export function getLoadedCategories(): DocCategoryGroup[] {
  const result: DocCategoryGroup[] = [];
  for (const catType of Object.keys(categoryMeta) as DocCategoryType[]) {
    const entries = loadedCategories.get(catType);
    if (entries) {
      result.push({
        ...categoryMeta[catType],
        categoryType: catType,
        entries,
      });
    }
  }
  return result;
}

/**
 * Synchronous filter for loaded categories (search).
 */
export function filterLoadedCategories(
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
              snip.code.toLowerCase().includes(q) ||
              snip.label.toLowerCase().includes(q)
          )
      ),
    }))
    .filter((cat) => cat.entries.length > 0);
}
