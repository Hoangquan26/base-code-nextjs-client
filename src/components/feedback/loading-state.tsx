"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

type LoadingStateProps = {
    title?: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
};

export function LoadingState({
    title = "Đang tải dữ liệu",
    description = "Vui lòng chờ trong giây lát.",
    action,
    className,
}: LoadingStateProps) {
    return (
        <div
            className={cn(
                "flex w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed bg-surface p-6 text-center",
                className,
            )}
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Spinner className="h-5 w-5 text-foreground" />
            </div>
            <div className="space-y-1">
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            {action ? <div className="pt-2">{action}</div> : null}
        </div>
    );
}
