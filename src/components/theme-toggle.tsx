"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

type ThemeToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ThemeToggle({ className, ...props }: ThemeToggleProps) {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";
    const ariaLabel = mounted
        ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
        : "Toggle theme";

    return (
        <button
            type="button"
            aria-label={ariaLabel}
            className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none",
                className,
            )}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            {...props}
        >
            {!mounted ? (
                <span className="sr-only">Toggle theme</span>
            ) : isDark ? (
                <Sun className="h-4 w-4" aria-hidden />
            ) : (
                <Moon className="h-4 w-4" aria-hidden />
            )}
        </button>
    );
}
