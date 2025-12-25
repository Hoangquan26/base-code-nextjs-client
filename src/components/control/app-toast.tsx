"use client";

import * as React from "react";
import { toast } from "sonner";

import { Toaster } from "@/components/ui/sonner";

type AppToastProps = React.ComponentProps<typeof Toaster>;

export function AppToast(props: AppToastProps) {
    return (
        <Toaster
            position="top-right"
            richColors
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast-base relative overflow-hidden rounded-2xl border bg-card/90 p-4 pl-5 shadow-sm backdrop-blur before:absolute before:left-0 before:top-0 before:h-full before:w-1.5 before:bg-muted-foreground/30",
                    title: "text-sm font-semibold",
                    description: "text-sm text-muted-foreground",
                    icon: "mt-0.5 text-foreground/70",
                    closeButton:
                        "right-3 top-3 rounded-md border border-border bg-background/70 text-foreground/70 hover:bg-muted",
                    actionButton:
                        "rounded-md border border-border bg-background/80 px-2 py-1 text-xs text-foreground hover:bg-muted",
                    cancelButton:
                        "rounded-md border border-border bg-background/80 px-2 py-1 text-xs text-muted-foreground hover:bg-muted",
                    success:
                        "border-success/25 bg-success/10 before:bg-success/70",
                    error:
                        "border-destructive/25 bg-destructive/10 before:bg-destructive/70",
                    warning:
                        "border-warning/25 bg-warning/10 before:bg-warning/70",
                    info:
                        "border-info/25 bg-info/10 before:bg-info/70",
                    loading:
                        "border-info/25 bg-info/10 before:bg-info/70",
                    default:
                        "border-border/60 bg-card/80 before:bg-muted-foreground/30",
                },
            }}
            {...props}
        />
    );
}

export const notify = toast;
