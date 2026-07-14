// ── Accessibility Utilities ──────────────────────────────────────

/**
 * Announces a message to screen readers using a live region
 */
export function announceToScreenReader(message: string, priority?: "polite" | "assertive") {
  if (typeof window === "undefined") return;

  const announcer = document.getElementById("sr-announcer");
  if (announcer) {
    announcer.setAttribute("aria-live", priority || "polite");
    announcer.textContent = message;
  }
}

/**
 * Generates a unique ID for accessibility attributes
 */
export function generateA11yId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Keyboard navigation helpers
 */
export const KEYBOARD_KEYS = {
  ENTER: "Enter",
  SPACE: " ",
  ESCAPE: "Escape",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  TAB: "Tab",
  HOME: "Home",
  END: "End",
} as const;

/**
 * Checks if an element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  const focusableSelectors = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ];
  return focusableSelectors.some((selector) => element.matches(selector));
}

/**
 * Trap focus within a container element
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusableElements = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  }

  container.addEventListener("keydown", handleKeyDown);
  firstElement?.focus();

  return () => {
    container.removeEventListener("keydown", handleKeyDown);
  };
}

/**
 * Color contrast helpers
 */
export function getContrastColor(hexColor: string): "white" | "black" {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "black" : "white";
}

/**
 * Reduced motion detection
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * High contrast mode detection
 */
export function prefersHighContrast(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-contrast: high)").matches;
}
