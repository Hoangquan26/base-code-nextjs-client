"use client"

import Image from "next/image"
import { Bell } from "lucide-react"

import { cn } from "@/lib/utils"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "../theme-toggle"

type CrmHeaderProps = {
    title?: string
    showSidebarTrigger?: boolean
    className?: string
}

export function CrmHeader({
    title = "Account Settings",
    showSidebarTrigger = false,
    className,
}: CrmHeaderProps) {
    return (
        <header
            className={cn(
                "flex h-16 items-center justify-between border-b border-border bg-background px-6",
                className
            )}
        >
            <div className="flex items-center gap-3">
                {showSidebarTrigger ? (
                    <SidebarTrigger className="hidden h-9 w-9 rounded-full border border-border md:inline-flex" />
                ) : null}
                <h1 className="text-base font-semibold text-foreground">{title}</h1>
            </div>
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-xs transition hover:text-foreground"
                >
                    <Bell className="h-4 w-4" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-background" />
                </button>
                <ThemeToggle />

                <div className="h-6 w-px bg-border" />
                <button
                    type="button"
                    aria-label="Open user menu"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background shadow-xs"
                >
                    <Image
                        src="/img/team-img.jpg"
                        alt="User avatar"
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                    />
                </button>
            </div>
        </header>
    )
}
