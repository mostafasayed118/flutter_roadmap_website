"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "./use-user-id";
import { useProgress } from "./use-progress";
import { useSessions } from "./use-sessions";
import { useStreak } from "./use-streak";
import { useSkills } from "./use-skills";
import { useShowcase } from "./use-showcase";
import { useBadges } from "./use-badges";

/**
 * Evaluates badge conditions on data changes and auto-unlocks earned badges.
 * Uses getBadgeProgressData for per-week and per-phase completion checks.
 * Runs once per relevant data change, skipping already-unlocked badges.
 */
export function useBadgeEvaluator() {
  const userId = useUserId();
  const { stats } = useProgress();
  const { totalTime } = useSessions();
  const { currentStreak } = useStreak();
  const { skills } = useSkills();
  const { projects } = useShowcase();
  const { badges, unlockBadge } = useBadges();
  const badgeProgress = useQuery(
    api.progress.getBadgeProgressData,
    userId ? { userId } : "skip"
  );

  const evaluatedRef = useRef(false);
  const prevStatsRef = useRef(stats);
  const prevTotalTimeRef = useRef(totalTime);
  const prevStreakRef = useRef(currentStreak);
  const prevSkillsRef = useRef(skills);
  const prevProjectsRef = useRef(projects);
  const prevBadgeProgressRef = useRef(badgeProgress);

  useEffect(() => {
    if (!unlockBadge || !stats || !totalTime || !skills || !projects || !badgeProgress) return;

    // Only re-evaluate when data actually changes
    const dataChanged =
      stats !== prevStatsRef.current ||
      totalTime !== prevTotalTimeRef.current ||
      currentStreak !== prevStreakRef.current ||
      skills !== prevSkillsRef.current ||
      projects !== prevProjectsRef.current ||
      badgeProgress !== prevBadgeProgressRef.current;

    if (!dataChanged && evaluatedRef.current) return;

    prevStatsRef.current = stats;
    prevTotalTimeRef.current = totalTime;
    prevStreakRef.current = currentStreak;
    prevSkillsRef.current = skills;
    prevProjectsRef.current = projects;
    prevBadgeProgressRef.current = badgeProgress;
    evaluatedRef.current = true;

    const unlockedIds = new Set(badges.filter((b) => b.unlocked).map((b) => b.id));
    const toUnlock: string[] = [];

    // ── Progress-based badges ──────────────────────────────────

    // first-step: 1 topic completed
    if (!unlockedIds.has("first-step") && stats.completedTopics >= 1) {
      toUnlock.push("first-step");
    }

    // half-way: 50% progress
    if (!unlockedIds.has("half-way") && stats.overallPercentage >= 50) {
      toUnlock.push("half-way");
    }

    // roadmap-complete: 100% completed
    if (!unlockedIds.has("roadmap-complete") && stats.overallPercentage >= 100) {
      toUnlock.push("roadmap-complete");
    }

    // ── Week-based badges ──────────────────────────────────────

    // week-warrior: at least 1 week fully completed
    if (!unlockedIds.has("week-warrior") && badgeProgress.totalWeeksCompleted >= 1) {
      toUnlock.push("week-warrior");
    }

    // five-weeks: 5 weeks fully completed
    if (!unlockedIds.has("five-weeks") && badgeProgress.totalWeeksCompleted >= 5) {
      toUnlock.push("five-weeks");
    }

    // ── Phase-based badges ─────────────────────────────────────
    // Phase order mapping from seed.ts:
    //   1 = Dart, 2 = Flutter, 3 = State Mgmt, 9 = Firebase

    // dart-master: Phase 1 (order 1) completed
    if (!unlockedIds.has("dart-master") && badgeProgress.completedPhaseOrders.includes(1)) {
      toUnlock.push("dart-master");
    }

    // flutter-foundation: Phase 2 (order 2) completed
    if (!unlockedIds.has("flutter-foundation") && badgeProgress.completedPhaseOrders.includes(2)) {
      toUnlock.push("flutter-foundation");
    }

    // state-guru: Phase 3 (order 3) completed
    if (!unlockedIds.has("state-guru") && badgeProgress.completedPhaseOrders.includes(3)) {
      toUnlock.push("state-guru");
    }

    // firebase-explorer: Phase 9 (order 9) completed
    if (!unlockedIds.has("firebase-explorer") && badgeProgress.completedPhaseOrders.includes(9)) {
      toUnlock.push("firebase-explorer");
    }

    // all-rounder: at least 1 topic in every phase (all 10 phases started)
    if (!unlockedIds.has("all-rounder") && badgeProgress.startedPhaseOrders.length >= 10) {
      toUnlock.push("all-rounder");
    }

    // ── Study-time badges ──────────────────────────────────────

    // ten-hours: 10+ hours
    if (!unlockedIds.has("ten-hours") && totalTime.totalMinutes >= 600) {
      toUnlock.push("ten-hours");
    }

    // fifty-hours: 50+ hours
    if (!unlockedIds.has("fifty-hours") && totalTime.totalMinutes >= 3000) {
      toUnlock.push("fifty-hours");
    }

    // hundred-hours: 100+ hours
    if (!unlockedIds.has("hundred-hours") && totalTime.totalMinutes >= 6000) {
      toUnlock.push("hundred-hours");
    }

    // ── Streak badges ──────────────────────────────────────────

    if (!unlockedIds.has("streak-3") && currentStreak >= 3) {
      toUnlock.push("streak-3");
    }

    if (!unlockedIds.has("streak-7") && currentStreak >= 7) {
      toUnlock.push("streak-7");
    }

    if (!unlockedIds.has("streak-30") && currentStreak >= 30) {
      toUnlock.push("streak-30");
    }

    // ── Skills badge ───────────────────────────────────────────

    const totalSkillsChecked = skills.reduce(
      (sum, cat) => sum + cat.items.filter((i) => i.completed).length,
      0
    );
    if (!unlockedIds.has("skill-collector") && totalSkillsChecked >= 25) {
      toUnlock.push("skill-collector");
    }

    // ── Showcase badge ─────────────────────────────────────────

    if (!unlockedIds.has("project-builder") && projects.length >= 1) {
      toUnlock.push("project-builder");
    }

    // ── Unlock all newly earned badges ─────────────────────────

    for (const badgeId of toUnlock) {
      unlockBadge(badgeId).catch(() => {
        // Silently ignore — badge may already be unlocked by another tab
      });
    }
  }, [stats, totalTime, currentStreak, skills, projects, badges, unlockBadge, badgeProgress]);
}
