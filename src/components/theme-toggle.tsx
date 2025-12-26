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
                "relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-xs transition hover:text-foreground cursor-pointer",
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
