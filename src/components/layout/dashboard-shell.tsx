"use client"

import type { ReactNode } from "react"
import {
    BarChart3,
    Bell,
    FileText,
    LayoutDashboard,
    Settings,
    Shield,
    Users,
} from "lucide-react"

import { AdaptiveSidebar } from "@/components/adaptive/adaptive-sidebar/adaptive-sidebar"
import { CrmHeader } from "@/components/layout/crm-header"
import MinizieUser from "@/components/shared/minimize-user/minizie-user"
import type { AdaptiveSidebarSection } from "@/components/adaptive/adaptive-sidebar/adaptive-sidebar-section.type"

const sidebarSections: AdaptiveSidebarSection[] = [
    {
        label: "Overview",
        items: [
            { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { title: "Reports", href: "/reports", icon: BarChart3 },
        ],
    },
    {
        label: "Management",
        items: [
            { title: "Customers", href: "/customers", icon: Users },
            { title: "Invoices", href: "/invoices", icon: FileText },
            { title: "Security", href: "/security", icon: Shield },
            { title: "Notifications", href: "/notifications", icon: Bell },
            { title: "Settings", href: "/settings/profile", icon: Settings },
        ],
    },
]

type DashboardShellProps = {
    children: ReactNode
}

export default function DashboardShell({ children }: DashboardShellProps) {
    return (
        <AdaptiveSidebar
            title="Vincenza CRM"
            subtitle="Manage your business"
            sections={sidebarSections}
            footer={<MinizieUser />}
            className="min-h-screen"
            contentClassName="min-h-screen"
            contentWrapperClassName="p-0"
            showHeaderTrigger={false}
            showRail={false}
            collapsible="offcanvas"
            variant="sidebar"
        >
            <div className="flex min-h-screen flex-col">
                <CrmHeader showSidebarTrigger className="hidden md:flex" />
                <main className="flex-1 px-6 py-6 lg:px-10 lg:py-6">
                    {children}
                </main>
            </div>
        </AdaptiveSidebar>
    )
}
