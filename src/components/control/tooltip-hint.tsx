"use client";

import * as React from "react";
import { CircleHelp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TooltipHintProps = {
  content: React.ReactNode;
  children?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
};

export function TooltipHint({
  content,
  children,
  side = "top",
  align = "center",
  className,
}: TooltipHintProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children ?? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <CircleHelp className="h-4 w-4" />
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent side={side} align={align} className={cn(className)}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
