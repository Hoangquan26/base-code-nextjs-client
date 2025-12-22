import React from 'react'

export type MinizieUserProps = {
    username?: string;
    email: string;
}

export default function MinizieUser(props: MinizieUserProps) {
    const { email, username } = props
    return (
        <div className="flex items-center gap-3 rounded-md bg-sidebar-accent px-3 py-2 text-sidebar-accent-foreground hover:divide-background hover:cursor-pointer">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-brand-foreground text-xs font-semibold">
                {username?.toUpperCase()?.slice(0, 2) ?? "AA"}
            </div>
            <div className="text-sm">
                <p className="font-semibold">{username}</p>
                <p className="text-xs text-sidebar-accent-foreground/80">
                    {email}
                </p>
            </div>
        </div>
    )
}
