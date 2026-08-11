"use client";

import { useEffect, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "@/hooks/use-user-id";

export function useSkills() {
  const userId = useUserId();
  const skills = useQuery(api.skills.getSkills, userId ? undefined : "skip");
  const initSkills = useMutation(api.skills.initSkills);
  const toggleSkill = useMutation(api.skills.toggleSkill);

  const initAttempted = useRef(false);

  useEffect(() => {
    if (skills !== undefined && skills.length === 0 && !initAttempted.current) {
      initAttempted.current = true;
      initSkills().catch((err) => {
        console.error("Failed to initialize skills:", err);
        // Don't reset initAttempted — prevents infinite retry loop on backend failure
      });
    }
  }, [skills, initSkills, userId]);

  return {
    skills,
    isLoading: skills === undefined,
    toggleSkill,
    userId,
  };
}
