"use client"

import Image from "next/image"
import { Camera } from "lucide-react"

import { cn } from "@/lib/utils"

type AvatarPreviewButtonProps = {
    avatarUrl?: string | null
    displayName: string
    onClick?: () => void
    className?: string
}

export default function AvatarPreviewButton({
    avatarUrl,
    displayName,
    onClick,
    className,
}: AvatarPreviewButtonProps) {
    const initials = displayName
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label="Thay đổi ảnh đại diện"
            className={cn(
                "group relative h-16 w-16 overflow-hidden rounded-full border border-border bg-muted shadow-sm",
                className
            )}
        >
            {avatarUrl ? (
                <Image
                    src={avatarUrl}
                    alt={displayName}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                />
            ) : (
                <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted-foreground">
                    {initials || "ND"}
                </span>
            )}
            <span className="absolute inset-0 rounded-full bg-black/35 opacity-0 transition group-hover:opacity-100" />
            <span className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-background/90 text-muted-foreground shadow">
                <Camera className="h-3.5 w-3.5" />
            </span>
        </button>
    )
}
