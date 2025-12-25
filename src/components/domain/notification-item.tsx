import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type NotificationItemProps = {
    title: string;
    description?: string;
    time?: string;
    icon?: ReactNode;
    badge?: string;
    unread?: boolean;
    href?: string;
    actions?: ReactNode;
    className?: string;
};

export function NotificationItem({
    title,
    description,
    time,
    icon,
    badge,
    unread = false,
    href,
    actions,
    className,
}: NotificationItemProps) {
    const content = (
        <>
            <div
                className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-md bg-muted text-foreground",
                    unread && "ring-1 ring-brand/40",
                )}
            >
                {icon ?? <span className="h-2 w-2 rounded-full bg-brand" />}
            </div>
            <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold">{title}</p>
                            {unread ? (
                                <span className="h-2 w-2 rounded-full bg-brand" />
                            ) : null}
                        </div>
                        {description ? (
                            <p className="text-sm text-muted-foreground">{description}</p>
                        ) : null}
                    </div>
                    {badge ? (
                        <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                            {badge}
                        </span>
                    ) : null}
                </div>
                {time ? <p className="text-xs text-muted-foreground">{time}</p> : null}
            </div>
        </>
    );

    return (
        <div
            className={cn(
                "flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/40",
                unread && "border-l-2 border-l-brand",
                className,
            )}
        >
            {href ? (
                <Link href={href} className="flex flex-1 items-start gap-3">
                    {content}
                </Link>
            ) : (
                <div className="flex flex-1 items-start gap-3">{content}</div>
            )}
            {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </div>
    );
}
