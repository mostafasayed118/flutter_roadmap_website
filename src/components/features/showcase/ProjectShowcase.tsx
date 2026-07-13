"use client";

import { useState } from "react";
import { Plus, GitBranch, ExternalLink, Trash2, Folder } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useShowcase } from "@/hooks/use-showcase";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { EmptyState } from "@/components/ui/empty-state";

export function ProjectShowcase() {
  const { projects, addProject, deleteProject } = useShowcase();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    githubUrl: "",
    liveUrl: "",
    technologies: "",
  });

  const handleAdd = () => {
    if (!form.title.trim()) return;
    addProject?.({
      title: form.title,
      description: form.description,
      githubUrl: form.githubUrl || undefined,
      liveUrl: form.liveUrl || undefined,
      technologies: form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
    setForm({ title: "", description: "", githubUrl: "", liveUrl: "", technologies: "" });
    setOpen(false);
  };

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Project Showcase
              </span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Display your completed Flutter projects
            </p>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
          >
            <Plus className="mr-2 size-4" />
            Add Project
          </Button>
        </div>

        {projects.length === 0 ? (
          <GlassCard className="p-12">
            <EmptyState
              icon={Folder}
              title="No projects yet"
              description="Start adding your completed Flutter projects to build your portfolio."
            />
          </GlassCard>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <GlassCard key={project._id} className="p-5">
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="font-semibold">{project.title}</h3>
                  <button
                    onClick={() => deleteProject({ projectId: project._id })}
                    className="shrink-0 rounded-md p-1 text-muted-foreground/30 hover:text-rose-400"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
                <p className="mb-3 line-clamp-3 text-sm text-muted-foreground">
                  {project.description}
                </p>
                {project.technologies.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <GitBranch className="size-3" />
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="size-3" />
                      Live
                    </a>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-4">
              <div>
                <label className="text-sm font-medium">Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="My Flutter App"
                  className="mt-1 h-9 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-foreground focus:border-violet-500/40 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="A brief description of your project..."
                  className="mt-1 h-20 w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-foreground focus:border-violet-500/40 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium">GitHub URL</label>
                <input
                  value={form.githubUrl}
                  onChange={(e) =>
                    setForm({ ...form, githubUrl: e.target.value })
                  }
                  placeholder="https://github.com/..."
                  className="mt-1 h-9 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-foreground focus:border-violet-500/40 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Live URL</label>
                <input
                  value={form.liveUrl}
                  onChange={(e) =>
                    setForm({ ...form, liveUrl: e.target.value })
                  }
                  placeholder="https://..."
                  className="mt-1 h-9 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-foreground focus:border-violet-500/40 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Technologies (comma-separated)
                </label>
                <input
                  value={form.technologies}
                  onChange={(e) =>
                    setForm({ ...form, technologies: e.target.value })
                  }
                  placeholder="Flutter, Dart, Firebase"
                  className="mt-1 h-9 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-foreground focus:border-violet-500/40 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                />
              </div>
              <Button
                onClick={handleAdd}
                disabled={!form.title.trim()}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600"
              >
                Add Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AnimatedPage>
  );
}
