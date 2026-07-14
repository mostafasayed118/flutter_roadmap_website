"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

import { cn } from "@/lib/utils";

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverPortal({ ...props }: PopoverPrimitive.Portal.Props) {
  return <PopoverPrimitive.Portal data-slot="popover-portal" {...props} />;
}

function PopoverPositioner({
  className,
  ...props
}: PopoverPrimitive.Positioner.Props) {
  return (
    <PopoverPrimitive.Positioner
      data-slot="popover-positioner"
      className={cn("z-50", className)}
      {...props}
    />
  );
}

function PopoverPopup({
  className,
  children,
  ...props
}: PopoverPrimitive.Popup.Props) {
  return (
    <PopoverPrimitive.Popup
      data-slot="popover-popup"
      className={cn(
        "w-64 rounded-xl border border-border bg-popover p-3 text-sm text-popover-foreground shadow-xl outline-none",
        "data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95",
        "data-[closing]:animate-out data-[closing]:fade-out-0 data-[closing]:zoom-out-95",
        className
      )}
      {...props}
    >
      {children}
    </PopoverPrimitive.Popup>
  );
}

export { Popover, PopoverTrigger, PopoverPortal, PopoverPositioner, PopoverPopup };
