"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";

import { cn } from "@/lib/utils";

type ErrorStateProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
};

export function ErrorState({
  title = "Đã xảy ra lỗi",
  description = "Vui lòng thử lại hoặc liên hệ quản trị viên.",
  action,
  className,
  icon,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center",
        className,
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        {icon ?? <AlertTriangle className="h-5 w-5" />}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-destructive">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {action ? <div className="pt-2">{action}</div> : null}
    </div>
  );
}
