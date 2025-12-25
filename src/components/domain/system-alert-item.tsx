import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SystemAlertVariant = "info" | "success" | "warning" | "error" | "neutral";

export type SystemAlertItemProps = {
    title: string;
    description?: string;
    variant?: SystemAlertVariant;
    icon?: ReactNode;
    action?: ReactNode;
    className?: string;
};

const variantStyles: Record<
    SystemAlertVariant,
    { wrapper: string; icon: string; bar: string }
> = {
    info: {
        wrapper: "border-info/25 bg-info/10",
        icon: "bg-info/15 text-info",
        bar: "bg-gradient-to-b from-info/80 via-info/50 to-transparent",
    },
    success: {
        wrapper: "border-success/25 bg-success/10",
        icon: "bg-success/15 text-success",
        bar: "bg-gradient-to-b from-success/80 via-success/50 to-transparent",
    },
    warning: {
        wrapper: "border-warning/25 bg-warning/10",
        icon: "bg-warning/15 text-warning",
        bar: "bg-gradient-to-b from-warning/80 via-warning/50 to-transparent",
    },
    error: {
        wrapper: "border-destructive/25 bg-destructive/10",
        icon: "bg-destructive/15 text-destructive",
        bar: "bg-gradient-to-b from-destructive/80 via-destructive/50 to-transparent",
    },
    neutral: {
        wrapper: "border-border/60 bg-muted/30",
        icon: "bg-muted text-foreground/70",
        bar: "bg-gradient-to-b from-muted-foreground/30 via-muted-foreground/10 to-transparent",
    },
};

export function SystemAlertItem({
    title,
    description,
    variant = "info",
    icon,
    action,
    className,
}: SystemAlertItemProps) {
    const styles = variantStyles[variant];

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-2xl border bg-card/80 p-4 shadow-sm backdrop-blur",
                styles.wrapper,
                className,
            )}
        >
            <div className={cn("absolute left-0 top-0 h-full w-1.5", styles.bar)} />
            <div className="flex items-start gap-3 pl-2">
                <div
                    className={cn(
                        "mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl",
                        styles.icon,
                    )}
                >
                    {icon ?? <span className="h-2 w-2 rounded-full bg-current" />}
                </div>
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold">{title}</p>
                    {description ? (
                        <p className="text-sm text-muted-foreground">{description}</p>
                    ) : null}
                    {action ? <div className="pt-2">{action}</div> : null}
                </div>
            </div>
        </div>
    );
}
