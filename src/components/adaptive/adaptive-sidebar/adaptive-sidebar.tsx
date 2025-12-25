"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { AdaptiveSidebarSection } from "./adaptive-sidebar-section.type";
import { ThemeToggle } from "@/components/theme-toggle";

const LOGO_IMAGE_PATH = '/logo/logo-vicenza.png'

type AdaptiveSidebarProps = {
    title?: string;
    subtitle?: string;
    sections: AdaptiveSidebarSection[];
    footer?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    contentClassName?: string;
    collapsible?: "offcanvas" | "icon" | "none";
    variant?: "sidebar" | "floating" | "inset";
    side?: "left" | "right";
};

type SidebarNavProps = {
    sections: AdaptiveSidebarSection[];
};

function SidebarNav({ sections }: SidebarNavProps) {
    const pathname = usePathname();
    const { isMobile, setOpenMobile } = useSidebar();

    const handleNavigate = React.useCallback(() => {
        if (isMobile) {
            setOpenMobile(false);
        }
    }, [isMobile, setOpenMobile]);

    return (
        <>
            {sections.map((section, sectionIndex) => (
                <SidebarGroup key={`${section.label ?? "section"}-${sectionIndex}`}>
                    {section.label ? (
                        <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                    ) : null}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {section.items.map((item) => {
                                const isActive =
                                    item.href === "/"
                                        ? pathname === item.href
                                        : pathname?.startsWith(item.href);
                                const Icon = item.icon;

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        {item.disabled ? (
                                            <SidebarMenuButton disabled>
                                                {Icon ? <Icon className="h-4 w-4" /> : null}
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                        ) : (
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                                tooltip={item.title}
                                                onClick={handleNavigate}
                                            >
                                                <Link href={item.href} >
                                                    {Icon ? <Icon className="h-4 w-4" /> : null}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        )}
                                        {item.badge ? (
                                            <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                                        ) : null}
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            ))}
        </>
    );
}

export function AdaptiveSidebar({
    title = "Base UI",
    subtitle,
    sections,
    footer,
    children,
    className,
    contentClassName,
    collapsible = "offcanvas",
    variant = "inset",
    side = "left",
}: AdaptiveSidebarProps) {
    return (
        <SidebarProvider className={cn("min-h-screen", className)}>
            <Sidebar side={side} variant={variant} collapsible={collapsible}>
                <SidebarHeader className="border-b border-sidebar-border">
                    <div className="flex items-center gap-3 px-2 py-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md text-brand-foreground text-sm font-semibold">
                            <Image src={LOGO_IMAGE_PATH} alt="Logo vicenza" height={128} width={128} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold">{title}</p>
                            {subtitle ? (
                                <p className="text-xs text-sidebar-foreground/70">{subtitle}</p>
                            ) : null}
                        </div>
                        <div className="hidden md:block">
                            <SidebarTrigger />
                        </div>
                    </div>
                </SidebarHeader>
                <SidebarContent className="px-1 py-2">
                    <SidebarNav sections={sections} />
                </SidebarContent>
                {footer ? (
                    <SidebarFooter className="border-t border-sidebar-border">
                        {footer}
                    </SidebarFooter>
                ) : null}
                <SidebarRail />
            </Sidebar>
            <SidebarInset className={cn("min-h-screen", contentClassName)}>
                <header className="sticky top-0 z-40 flex items-center h-14 gap-3 border-b border-border bg-background/80 px-4 backdrop-blur md:hidden">
                    <SidebarTrigger />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">{title}</span>
                        {subtitle ? (
                            <span className="text-xs text-muted-foreground">{subtitle}</span>
                        ) : null}
                    </div>
                </header>
                <div className="flex-1 p-4 lg:p-6">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
