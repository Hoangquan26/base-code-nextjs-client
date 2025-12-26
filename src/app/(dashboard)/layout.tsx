import type { ReactNode } from "react"
import AuthGuard from "@/components/control/auth-guard"

export default function DashboardLayout({
    children,
}: {
    children: ReactNode
}) {
    return <AuthGuard>{children}</AuthGuard>
}
