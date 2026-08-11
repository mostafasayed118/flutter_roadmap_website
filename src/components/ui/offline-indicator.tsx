"use client";

import { useServiceWorker, updateServiceWorker } from "@/hooks/use-service-worker";
import { Button } from "@/components/ui/button";
import { WifiOff, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function OfflineIndicator() {
  const { isOffline, updateAvailable } = useServiceWorker();

  return (
    <>
      {/* Offline Banner */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-amber-500/90 px-4 py-2 text-sm text-white backdrop-blur-sm"
          >
            <WifiOff className="size-4" />
            <span>You&apos;re offline. Some features may be limited.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update Available Banner */}
      <AnimatePresence>
        {updateAvailable && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-violet-500/90 px-4 py-2 text-sm text-white backdrop-blur-sm"
          >
            <Download className="size-4" />
            <span>New version available!</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={updateServiceWorker}
              className="text-white hover:bg-white/20"
            >
              Update
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
