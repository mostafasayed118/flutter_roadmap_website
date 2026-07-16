"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Rocket,
  BookOpen,
  Timer,
  Trophy,
  ChevronRight,
  ChevronLeft,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const steps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to FlutterPath!",
    description: "Your gamified Flutter learning journey starts here. Track your progress across 34 weeks of structured curriculum.",
    icon: Rocket,
    color: "text-violet-400",
  },
  {
    id: "roadmap",
    title: "Follow the Roadmap",
    description: "Navigate through 10 phases covering Dart, Flutter, state management, Firebase, and deployment. Complete topics and projects to progress.",
    icon: BookOpen,
    color: "text-blue-400",
  },
  {
    id: "timer",
    title: "Track Study Time",
    description: "Use the built-in Pomodoro timer to focus on learning. Sessions are automatically saved and contribute to your streak.",
    icon: Timer,
    color: "text-emerald-400",
  },
  {
    id: "achievements",
    title: "Earn Achievements",
    description: "Unlock badges, maintain streaks, and celebrate milestones. Your progress is visualized with charts and heatmaps.",
    icon: Trophy,
    color: "text-amber-400",
  },
];

const STORAGE_KEY = "flutterpath-onboarding-completed";

export function OnboardingFlow() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const hasCompleted = localStorage.getItem(STORAGE_KEY);
    if (!hasCompleted) {
      // Small delay to let the app load first
      const timer = setTimeout(() => setOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setCompleted(true);
    setOpen(false);
  };

  const handleSkip = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setCompleted(true);
    setOpen(false);
  };

  if (completed) return null;

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Getting Started</span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="py-6"
          >
            <div className="flex flex-col items-center text-center">
              <div className={`mb-4 rounded-full bg-muted/50 p-4 ${step.color}`}>
                <Icon className="size-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="gap-1"
          >
            <ChevronLeft className="size-4" />
            Back
          </Button>

          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentStep
                    ? "w-6 bg-violet-500"
                    : i < currentStep
                    ? "w-1.5 bg-violet-500/50"
                    : "w-1.5 bg-muted"
                }`}
              />
            ))}
          </div>

          <Button onClick={handleNext} className="gap-1">
            {currentStep === steps.length - 1 ? "Get Started" : "Next"}
            {currentStep < steps.length - 1 && <ChevronRight className="size-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
