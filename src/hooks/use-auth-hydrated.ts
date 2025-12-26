"use client"

import { useEffect, useRef, useState } from "react"
import { useAuthStore } from "@/stores/auth/auth.store"

export function useAuthHydrated() {
    const [hydrated, setHydrated] = useState(
        typeof window === "undefined" ? false : useAuthStore.persist.hasHydrated()
    )
    const hasSubscribed = useRef(false)

    useEffect(() => {
        if (useAuthStore.persist.hasHydrated()) {
            setHydrated(true)
            return
        }

        if (!hasSubscribed.current) {
            hasSubscribed.current = true
            const unsub = useAuthStore.persist.onFinishHydration(() => {
                setHydrated(true)
            })

            return () => {
                if (unsub) {
                    unsub()
                }
            }
        }
    }, [])

    return hydrated
}
