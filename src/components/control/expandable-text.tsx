"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ExpandableTextProps = {
  text: string;
  lines?: number;
  moreLabel?: string;
  lessLabel?: string;
  className?: string;
  textClassName?: string;
};

export function ExpandableText({
  text,
  lines = 3,
  moreLabel = "Xem thêm",
  lessLabel = "Thu gọn",
  className,
  textClassName,
}: ExpandableTextProps) {
  const [expanded, setExpanded] = React.useState(false);

  const collapsedStyle = React.useMemo<React.CSSProperties>(() => {
    if (expanded) {
      return {};
    }
    return {
      display: "-webkit-box",
      WebkitLineClamp: lines,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    };
  }, [expanded, lines]);

  return (
    <div className={cn("space-y-2", className)}>
      <p className={cn("text-sm text-muted-foreground", textClassName)} style={collapsedStyle}>
        {text}
      </p>
      <Button
        type="button"
        variant="link"
        size="sm"
        className="h-auto p-0 text-sm"
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? lessLabel : moreLabel}
      </Button>
    </div>
  );
}

type ReadMoreProps = Omit<ExpandableTextProps, "lines" | "moreLabel" | "lessLabel"> & {
  lines?: number;
};

export function ReadMore({ lines = 2, ...props }: ReadMoreProps) {
  return <ExpandableText lines={lines} {...props} />;
}
