"use client";

import * as React from "react";
import { CircleHelp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type HelpPopoverProps = {
  title?: string;
  description?: string;
  content?: React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
};

export function HelpPopover({
  title = "Trợ giúp",
  description = "Mẹo sử dụng nhanh cho thao tác này.",
  content,
  trigger,
  className,
}: HelpPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger ?? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <CircleHelp className="h-4 w-4" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className={cn("space-y-2", className)}>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {content ? <div className="text-sm text-muted-foreground">{content}</div> : null}
      </PopoverContent>
    </Popover>
  );
}
