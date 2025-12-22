"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

type EmptyStateProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({
  title = "Chưa có dữ liệu",
  description = "Bạn có thể tạo mới để bắt đầu.",
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Empty className={cn("bg-surface", className)}>
      <EmptyHeader>
        {icon ? <EmptyMedia variant="icon">{icon}</EmptyMedia> : null}
        <EmptyTitle>{title}</EmptyTitle>
        {description ? <EmptyDescription>{description}</EmptyDescription> : null}
      </EmptyHeader>
      {action ? <EmptyContent>{action}</EmptyContent> : null}
    </Empty>
  );
}
