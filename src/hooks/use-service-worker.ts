"use client";

import { useEffect, useState } from "react";

interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  isOffline: boolean;
  updateAvailable: boolean;
}

export function useServiceWorker(): ServiceWorkerState {
  const [state, setState] = useState<ServiceWorkerState>({
    isSupported: false,
    isRegistered: false,
    isOffline: false,
    updateAvailable: false,
  });

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    // Client-only init (navigator.serviceWorker); the other state updates
    // below happen in async callbacks and event handlers.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState((prev) => ({ ...prev, isSupported: true }));

    // Register service worker
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        setState((prev) => ({ ...prev, isRegistered: true }));

        // Check for updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                setState((prev) => ({ ...prev, updateAvailable: true }));
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error("Service worker registration failed:", error);
      });

    // Listen for online/offline events
    const handleOnline = () => {
      setState((prev) => ({ ...prev, isOffline: false }));
    };

    const handleOffline = () => {
      setState((prev) => ({ ...prev, isOffline: true }));
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Set initial offline state
    setState((prev) => ({ ...prev, isOffline: !navigator.onLine }));

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return state;
}

export function updateServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return;
  }

  navigator.serviceWorker.getRegistration().then((registration) => {
    if (registration) {
      registration.waiting?.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    }
  });
}
