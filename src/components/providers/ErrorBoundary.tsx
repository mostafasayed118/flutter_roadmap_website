"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryInnerProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

class ErrorBoundaryInner extends React.Component<ErrorBoundaryInnerProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryInnerProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] items-center justify-center p-4">
          <div className="max-w-md w-full rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center space-y-4">
            <AlertTriangle className="size-10 text-red-400 mx-auto" />
            <h2 className="text-lg font-semibold text-red-300">Something went wrong</h2>
            <p className="text-sm text-muted-foreground">
              {this.state.error?.message ?? "An unexpected error occurred."}
            </p>
            <Button
              onClick={this.resetError}
              variant="outline"
              className="border-border bg-muted hover:bg-muted/80"
            >
              <RefreshCw className="size-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const pathname = usePathname();
  const boundaryRef = React.useRef<ErrorBoundaryInner>(null);

  React.useEffect(() => {
    boundaryRef.current?.resetError();
  }, [pathname]);

  return (
    <ErrorBoundaryInner ref={boundaryRef} fallback={fallback}>
      {children}
    </ErrorBoundaryInner>
  );
}
