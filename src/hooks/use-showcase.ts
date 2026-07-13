"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUserId } from "./use-user-id";

export function useShowcase() {
  const userId = useUserId();
  const projects = useQuery(
    api.showcase.getProjects,
    userId ? { userId } : "skip"
  );
  const addProject = useMutation(api.showcase.addProject);
  const updateProject = useMutation(api.showcase.updateProject);
  const deleteProject = useMutation(api.showcase.deleteProject);

  return {
    projects: projects ?? [],
    addProject: userId
      ? (data: {
          title: string;
          description: string;
          githubUrl?: string;
          liveUrl?: string;
          imageUrl?: string;
          technologies: string[];
        }) => addProject({ userId, ...data })
      : undefined,
    updateProject,
    deleteProject,
  };
}
