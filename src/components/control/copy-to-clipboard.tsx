"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CopyToClipboardProps = Omit<
    React.ComponentProps<typeof Button>,
    "onClick" | "children"
> & {
    value: string;
    label?: string;
    copiedLabel?: string;
    icon?: React.ReactNode;
};

export function CopyToClipboard({
    value,
    label = "Sao chép",
    copiedLabel = "Đã sao chép",
    icon,
    className,
    ...props
}: CopyToClipboardProps) {
    const [copied, setCopied] = React.useState(false);
    const timeoutRef = React.useRef<number | null>(null);

    const handleCopy = React.useCallback(async () => {
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(value);
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = value;
                textarea.setAttribute("readonly", "true");
                textarea.style.position = "absolute";
                textarea.style.left = "-9999px";
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
            }
            setCopied(true);
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
        } catch {
            setCopied(false);
        }
    }, [value]);

    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn("gap-2", className)}
            onClick={handleCopy}
            {...props}
        >
            {icon ?? (copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />)}
            <span>{copied ? copiedLabel : label}</span>
        </Button>
    );
}
