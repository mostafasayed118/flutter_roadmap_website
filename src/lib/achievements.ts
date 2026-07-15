// ── Achievement System ──────────────────────────────────────────

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "progress" | "streak" | "time" | "challenge" | "social";
  requirement: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, "unlocked" | "unlockedAt">[] = [
  // Progress achievements
  {
    id: "first-topic",
    title: "First Steps",
    description: "Complete your first topic",
    icon: "🎯",
    category: "progress",
    requirement: 1,
  },
  {
    id: "ten-topics",
    title: "Getting Started",
    description: "Complete 10 topics",
    icon: "📚",
    category: "progress",
    requirement: 10,
  },
  {
    id: "fifty-topics",
    title: "Halfway There",
    description: "Complete 50 topics",
    icon: "🔥",
    category: "progress",
    requirement: 50,
  },
  {
    id: "hundred-topics",
    title: "Century Club",
    description: "Complete 100 topics",
    icon: "💯",
    category: "progress",
    requirement: 100,
  },
  {
    id: "first-project",
    title: "Builder",
    description: "Complete your first project",
    icon: "🔨",
    category: "progress",
    requirement: 1,
  },
  {
    id: "ten-projects",
    title: "Project Master",
    description: "Complete 10 projects",
    icon: "🏗️",
    category: "progress",
    requirement: 10,
  },

  // Streak achievements
  {
    id: "streak-3",
    title: "On a Roll",
    description: "Maintain a 3-day streak",
    icon: "⚡",
    category: "streak",
    requirement: 3,
  },
  {
    id: "streak-7",
    title: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "🗡️",
    category: "streak",
    requirement: 7,
  },
  {
    id: "streak-30",
    title: "Monthly Master",
    description: "Maintain a 30-day streak",
    icon: "👑",
    category: "streak",
    requirement: 30,
  },
  {
    id: "streak-100",
    title: "Century Streak",
    description: "Maintain a 100-day streak",
    icon: "🏆",
    category: "streak",
    requirement: 100,
  },

  // Time achievements
  {
    id: "hours-10",
    title: "Time Investor",
    description: "Study for 10 hours total",
    icon: "⏰",
    category: "time",
    requirement: 600,
  },
  {
    id: "hours-50",
    title: "Dedicated Learner",
    description: "Study for 50 hours total",
    icon: "🎯",
    category: "time",
    requirement: 3000,
  },
  {
    id: "hours-100",
    title: "Centurion",
    description: "Study for 100 hours total",
    icon: "💎",
    category: "time",
    requirement: 6000,
  },
  {
    id: "hours-500",
    title: "Master Scholar",
    description: "Study for 500 hours total",
    icon: "🌟",
    category: "time",
    requirement: 30000,
  },

  // Challenge achievements
  {
    id: "challenge-7",
    title: "Challenge Champion",
    description: "Complete 7 daily challenges",
    icon: "🎪",
    category: "challenge",
    requirement: 7,
  },
  {
    id: "challenge-30",
    title: "Challenge Master",
    description: "Complete 30 daily challenges",
    icon: "🎖️",
    category: "challenge",
    requirement: 30,
  },

  // Social achievements
  {
    id: "share-first",
    title: "Social Butterfly",
    description: "Share your progress for the first time",
    icon: "🦋",
    category: "social",
    requirement: 1,
  },
  {
    id: "share-10",
    title: "Influencer",
    description: "Share your progress 10 times",
    icon: "📱",
    category: "social",
    requirement: 10,
  },
];

const STORAGE_KEY = "flutter-roadmap-achievements";

export function loadAchievements(): Achievement[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const stored = raw ? JSON.parse(raw) : {};

    return ACHIEVEMENT_DEFINITIONS.map((def) => ({
      ...def,
      unlocked: stored[def.id]?.unlocked || false,
      unlockedAt: stored[def.id]?.unlockedAt,
    }));
  } catch {
    return ACHIEVEMENT_DEFINITIONS.map((def) => ({
      ...def,
      unlocked: false,
    }));
  }
}

export function saveAchievements(achievements: Achievement[]): void {
  if (typeof window === "undefined") return;
  const stored: Record<string, { unlocked: boolean; unlockedAt?: string }> = {};
  achievements.forEach((a) => {
    if (a.unlocked) {
      stored[a.id] = { unlocked: true, unlockedAt: a.unlockedAt };
    }
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
}

export function unlockAchievement(achievementId: string): Achievement | null {
  const achievements = loadAchievements();
  const achievement = achievements.find((a) => a.id === achievementId);

  if (!achievement || achievement.unlocked) return null;

  achievement.unlocked = true;
  achievement.unlockedAt = new Date().toISOString();
  saveAchievements(achievements);

  return achievement;
}

export function checkAndUnlockAchievements(stats: {
  completedTopics: number;
  completedProjects: number;
  currentStreak: number;
  totalMinutes: number;
}): Achievement[] {
  const unlocked: Achievement[] = [];
  const achievements = loadAchievements();

  const checks = [
    { id: "first-topic", value: stats.completedTopics },
    { id: "ten-topics", value: stats.completedTopics },
    { id: "fifty-topics", value: stats.completedTopics },
    { id: "hundred-topics", value: stats.completedTopics },
    { id: "first-project", value: stats.completedProjects },
    { id: "ten-projects", value: stats.completedProjects },
    { id: "streak-3", value: stats.currentStreak },
    { id: "streak-7", value: stats.currentStreak },
    { id: "streak-30", value: stats.currentStreak },
    { id: "streak-100", value: stats.currentStreak },
    { id: "hours-10", value: stats.totalMinutes },
    { id: "hours-50", value: stats.totalMinutes },
    { id: "hours-100", value: stats.totalMinutes },
    { id: "hours-500", value: stats.totalMinutes },
  ];

  for (const check of checks) {
    const achievement = achievements.find((a) => a.id === check.id);
    if (achievement && !achievement.unlocked && check.value >= achievement.requirement) {
      achievement.unlocked = true;
      achievement.unlockedAt = new Date().toISOString();
      unlocked.push(achievement);
    }
  }

  if (unlocked.length > 0) {
    saveAchievements(achievements);
  }

  return unlocked;
}
