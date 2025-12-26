import type { ComponentType } from "react"
import type { AdaptiveSidebarSection } from "@/components/adaptive/adaptive-sidebar/adaptive-sidebar-section.type"

export type RouteAccess = "public" | "guest" | "auth"

export type RouteConfigItem = {
    id: string
    label: string
    href?: string
    access?: RouteAccess
    roles?: string[]
    requireAllRoles?: boolean
    group?: string
    order?: number
    hidden?: boolean
    showInSidebar?: boolean
    badge?: string
    disabled?: boolean
    icon?: ComponentType<{ className?: string }>
    children?: RouteConfigItem[]
}

export type RouteContext = {
    isAuthenticated: boolean
    roles?: string[] | null
}

export const routeConfig: RouteConfigItem[] = [
    {
        id: "home",
        label: "Home",
        href: "/",
        access: "public",
        showInSidebar: false,
    },
    {
        id: "dev",
        label: "Dev",
        href: "/dev",
        access: "public",
        showInSidebar: false,
    },
    {
        id: "login",
        label: "Login",
        href: "/login",
        access: "guest",
        showInSidebar: false,
    },
    {
        id: "register",
        label: "Register",
        href: "/register",
        access: "guest",
        showInSidebar: false,
    },
    {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        access: "auth",
        group: "General",
        order: 1,
        disabled: true,
    },
    {
        id: "contacts",
        label: "Contacts",
        href: "/dashboard/contacts",
        access: "auth",
        roles: ["ADMIN", "MANAGER"],
        group: "CRM",
        order: 1,
        disabled: true,
    },
    {
        id: "deals",
        label: "Deals",
        href: "/dashboard/deals",
        access: "auth",
        group: "CRM",
        order: 2,
        disabled: true,
    },
    {
        id: "users",
        label: "Users",
        href: "/dashboard/users",
        access: "auth",
        roles: ["ADMIN"],
        group: "System",
        order: 1,
        disabled: true,
    },
    {
        id: "settings",
        label: "Settings",
        href: "/dashboard/settings",
        access: "auth",
        roles: ["ADMIN"],
        group: "System",
        order: 2,
        disabled: true,
    },
]

const normalizeRoles = (roles?: string[] | null) => roles ?? []

const hasAnyRole = (roles: string[], required: string[]) =>
    required.some((role) => roles.includes(role))

const hasAllRoles = (roles: string[], required: string[]) =>
    required.every((role) => roles.includes(role))

export const canAccessRoute = (
    route: RouteConfigItem,
    context: RouteContext
): boolean => {
    const access = route.access ?? "auth"

    if (access === "guest" && context.isAuthenticated) {
        return false
    }

    if (access === "auth" && !context.isAuthenticated) {
        return false
    }

    if (route.roles && route.roles.length > 0) {
        const currentRoles = normalizeRoles(context.roles)
        const allowed = route.requireAllRoles
            ? hasAllRoles(currentRoles, route.roles)
            : hasAnyRole(currentRoles, route.roles)
        if (!allowed) return false
    }

    return true
}

export const filterRouteConfig = (
    routes: RouteConfigItem[],
    context: RouteContext,
    options: { includeHidden?: boolean } = {}
): RouteConfigItem[] => {
    const includeHidden = options.includeHidden ?? false

    return routes
        .map<RouteConfigItem | null>((route) => {
            const children: RouteConfigItem[] | undefined = route.children
                ? filterRouteConfig(route.children, context, options)
                : undefined
            const isAllowed = canAccessRoute(route, context)
            const isVisible = includeHidden || !route.hidden
            const hasVisibleChildren = Boolean(children?.length)

            if ((!isAllowed || !isVisible) && !hasVisibleChildren) {
                return null
            }

            const next: RouteConfigItem = children
                ? { ...route, children }
                : { ...route }

            return next
        })
        .filter((route): route is RouteConfigItem => route !== null)
}

export const buildSidebarSections = (
    routes: RouteConfigItem[],
    context: RouteContext
): AdaptiveSidebarSection[] => {
    const visibleRoutes = filterRouteConfig(routes, context)

    const flatRoutes: RouteConfigItem[] = []
    const stack = [...visibleRoutes]

    while (stack.length > 0) {
        const current = stack.shift()
        if (!current) continue
        flatRoutes.push(current)
        if (current.children && current.children.length > 0) {
            stack.unshift(...current.children)
        }
    }

    const sidebarRoutes = flatRoutes.filter(
        (route) => route.showInSidebar !== false && Boolean(route.href)
    )

    sidebarRoutes.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

    const sectionsMap = new Map<string, AdaptiveSidebarSection>()
    const sectionOrder: string[] = []

    sidebarRoutes.forEach((route) => {
        const label = route.group ?? ""
        if (!sectionsMap.has(label)) {
            sectionsMap.set(label, {
                label: label || undefined,
                items: [],
            })
            sectionOrder.push(label)
        }
        const section = sectionsMap.get(label)
        if (!section) return
        section.items.push({
            title: route.label,
            href: route.href!,
            icon: route.icon,
            badge: route.badge,
            disabled: route.disabled,
        })
    })

    return sectionOrder
        .map((label) => sectionsMap.get(label))
        .filter((section): section is AdaptiveSidebarSection => Boolean(section))
}
