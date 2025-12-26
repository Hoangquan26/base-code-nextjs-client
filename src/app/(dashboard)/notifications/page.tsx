import type { ComponentType } from "react"
import {
    AlertTriangle,
    AtSign,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    Filter,
    Settings,
    ShieldCheck,
} from "lucide-react"

import PageBreadcrumb from "@/components/layout/page-breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const notificationFilters = [
    { value: "unread", label: "Unread", count: 3 },
    { value: "all", label: "All Notifications" },
    { value: "mentions", label: "Mentions" },
    { value: "archived", label: "Archived" },
]

const todayNotifications = [
    {
        id: "lead",
        title: "New Lead Requires Attention",
        description:
            "A new high-value lead TechCorp International has been assigned to you. Follow up is required within 2 hours.",
        time: "15 mins ago",
        badge: { label: "High Priority", className: "border-rose-200 text-rose-600 bg-rose-50" },
        icon: AlertTriangle,
        iconClassName: "bg-amber-50 text-amber-500",
        highlight: true,
    },
    {
        id: "mention",
        title: "Sarah Jenkins mentioned you",
        description:
            '"Can you review the Q3 Financial Report attached here? I need your approval before sending."',
        time: "1 hour ago",
        linkLabel: "Reply",
        icon: AtSign,
        iconClassName: "bg-blue-50 text-blue-500",
    },
    {
        id: "maintenance",
        title: "System Maintenance Scheduled",
        description:
            "The CRM system will undergo scheduled maintenance on Nov 15, 2023 from 02:00 AM to 04:00 AM.",
        time: "3 hours ago",
        badge: { label: "System", className: "border-slate-200 text-slate-600 bg-slate-50" },
        icon: ShieldCheck,
        iconClassName: "bg-slate-100 text-slate-600",
    },
]

const yesterdayNotifications = [
    {
        id: "completed",
        title: "Task Completed: Update Pricing",
        description:
            'Michael Scott marked the task "Update Q4 Pricing Strategy" as completed.',
        time: "Yesterday, 4:30 PM",
        icon: CheckCircle2,
        iconClassName: "bg-emerald-50 text-emerald-500",
    },
    {
        id: "invite",
        title: "Meeting Invitation: Marketing Sync",
        description: "You have been invited to the weekly marketing sync.",
        time: "Yesterday, 10:00 AM",
        linkLabel: "View Calendar",
        icon: CalendarDays,
        iconClassName: "bg-violet-50 text-violet-500",
    },
]

function NotificationCard({
    title,
    description,
    time,
    badge,
    linkLabel,
    icon: Icon,
    iconClassName,
    highlight,
}: {
    title: string
    description: string
    time: string
    badge?: { label: string; className: string }
    linkLabel?: string
    icon: ComponentType<{ className?: string }>
    iconClassName: string
    highlight?: boolean
}) {
    return (
        <div
            className={cn(
                "bg-card text-card-foreground rounded-xl border border-border shadow-sm",
                highlight && "border-l-4 border-l-amber-400"
            )}
        >
            <div className="flex gap-4 p-5">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", iconClassName)}>
                    <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                        {highlight ? (
                            <span className="h-2 w-2 rounded-full bg-rose-500" />
                        ) : null}
                    </div>
                    <p className="text-sm text-muted-foreground">{description}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span>{time}</span>
                        {badge ? (
                            <Badge variant="outline" className={badge.className}>
                                {badge.label}
                            </Badge>
                        ) : null}
                        {linkLabel ? (
                            <button type="button" className="text-xs font-medium text-foreground">
                                {linkLabel}
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function NotificationsPage() {
    const breadcrumbItems = [
        { label: "Home", href: "/dashboard" },
        { label: "Notifications" },
    ]

    return (
        <div className="mx-auto flex w-full flex-col gap-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                    <PageBreadcrumb items={breadcrumbItems} />
                    <div>
                        <h2 className="text-2xl font-semibold text-foreground">
                            Activity Center
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Stay updated with your latest CRM activities, leads,
                            and alerts.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Mark all as read
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Settings className="h-4 w-4" />
                        Settings
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="unread" className="gap-5">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
                    <TabsList className="flex h-auto w-full flex-wrap justify-start gap-3 rounded-none bg-transparent p-0 sm:w-auto">
                        {notificationFilters.map((filter) => (
                            <TabsTrigger
                                key={filter.value}
                                value={filter.value}
                                className="h-auto flex-none rounded-full border border-border bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground shadow-none data-[state=active]:border-transparent data-[state=active]:bg-neutral-900 data-[state=active]:text-white"
                            >
                                <span>{filter.label}</span>
                                {filter.count ? (
                                    <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/15 px-2 text-xs text-white">
                                        {filter.count}
                                    </span>
                                ) : null}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <button
                        type="button"
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                        <Filter className="h-4 w-4" />
                        Sort by: <span className="text-foreground">Newest First</span>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </button>
                </div>

                {notificationFilters.map((filter) => (
                    <TabsContent key={filter.value} value={filter.value}>
                        <div className="flex flex-col gap-6">
                            <div className="space-y-3">
                                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Today
                                </div>
                                <div className="flex flex-col gap-4">
                                    {todayNotifications.map((notification) => (
                                        <NotificationCard
                                            key={`${filter.value}-${notification.id}`}
                                            {...notification}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Yesterday
                                </div>
                                <div className="flex flex-col gap-4">
                                    {yesterdayNotifications.map((notification) => (
                                        <NotificationCard
                                            key={`${filter.value}-${notification.id}`}
                                            {...notification}
                                        />
                                    ))}
                                </div>
                            </div>
                            <button
                                type="button"
                                className="mx-auto inline-flex items-center gap-2 text-sm text-muted-foreground"
                            >
                                Load more notifications
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
