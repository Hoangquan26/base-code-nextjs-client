import type { ReactNode } from "react"
import AuthGuard from "@/components/control/auth-guard"
import DashboardShell from "@/components/layout/dashboard-shell"

export default function DashboardLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <AuthGuard>
            <DashboardShell>{children}</DashboardShell>
        </AuthGuard>
    )
}
