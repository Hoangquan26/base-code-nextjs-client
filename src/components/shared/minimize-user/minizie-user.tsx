"use client"

import React from 'react'

import { useAuthUser } from "@/stores/auth/auth.selector"
import Image from 'next/image'

export type MinizieUserProps = {
    username?: string
    email?: string
    avatarUrl?: string | null
}

export default function MinizieUser(props: MinizieUserProps) {
    const user = useAuthUser()
    const username = props.username ?? user?.name ?? user?.email ?? "Anonymous"
    const email = props.email ?? user?.email ?? ""
    const avatarUrl = props.avatarUrl ?? user?.avatarUrl ?? null

    const initials = username
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()

    return (
        <div className="flex items-center gap-3 rounded-md bg-sidebar-accent px-3 py-2 text-sidebar-accent-foreground hover:divide-background hover:cursor-pointer">
            {avatarUrl ? (
                <Image
                    height={48}
                    width={48}
                    src={avatarUrl}
                    alt={username}
                    className="h-9 w-9 rounded-full object-cover ring-1 ring-sidebar-border"
                />
            ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-brand-foreground text-xs font-semibold ring-1 ring-sidebar-border">
                    {initials || "AA"}
                </div>
            )}
            <div className="text-sm">
                <p className="font-semibold">{username}</p>
                {email ? (
                    <p className="text-xs text-sidebar-accent-foreground/80">
                        {email}
                    </p>
                ) : null}
            </div>
        </div>
    )
}
