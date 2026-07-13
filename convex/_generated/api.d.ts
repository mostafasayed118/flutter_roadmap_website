/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as badges from "../badges.js";
import type * as bookmarks from "../bookmarks.js";
import type * as goals from "../goals.js";
import type * as leaderboard from "../leaderboard.js";
import type * as progress from "../progress.js";
import type * as seed from "../seed.js";
import type * as showcase from "../showcase.js";
import type * as skills from "../skills.js";
import type * as streaks from "../streaks.js";
import type * as timeTracker from "../timeTracker.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  badges: typeof badges;
  bookmarks: typeof bookmarks;
  goals: typeof goals;
  leaderboard: typeof leaderboard;
  progress: typeof progress;
  seed: typeof seed;
  showcase: typeof showcase;
  skills: typeof skills;
  streaks: typeof streaks;
  timeTracker: typeof timeTracker;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
