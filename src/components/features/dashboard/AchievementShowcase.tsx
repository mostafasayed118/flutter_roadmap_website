"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Trophy, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { loadAchievements, type Achievement } from "@/lib/achievements";

export function AchievementShowcase() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    setAchievements(loadAchievements());
  }, []);

  const categories = ["all", "progress", "streak", "time", "challenge", "social"];

  const filteredAchievements =
    selectedCategory === "all"
      ? achievements
      : achievements.filter((a) => a.category === selectedCategory);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <GlassCard className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="size-4 text-amber-400" />
          <h3 className="text-sm font-semibold">Achievements</h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {unlockedCount}/{totalCount} unlocked
        </span>
      </div>

      {/* Category Filter */}
      <div className="mb-4 flex flex-wrap gap-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-2 py-1 text-xs font-medium transition-all ${
              selectedCategory === category
                ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                : "bg-muted/50 text-muted-foreground border border-transparent hover:bg-muted"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {filteredAchievements.map((achievement, i) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`relative flex flex-col items-center rounded-lg border p-3 text-center transition-all ${
              achievement.unlocked
                ? "border-amber-500/30 bg-amber-500/10"
                : "border-border/50 bg-card/30 opacity-60"
            }`}
          >
            <span className="text-2xl">{achievement.icon}</span>
            <p className="mt-1 text-xs font-medium">{achievement.title}</p>
            <p className="text-[10px] text-muted-foreground">
              {achievement.description}
            </p>
            {!achievement.unlocked && (
              <Lock className="absolute top-1 right-1 size-3 text-muted-foreground" />
            )}
            {achievement.unlocked && achievement.unlockedAt && (
              <p className="mt-1 text-[10px] text-amber-400">
                {new Date(achievement.unlockedAt).toLocaleDateString()}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
