export type AdaptiveSidebarItem = {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
    badge?: string;
    disabled?: boolean;
};

export type AdaptiveSidebarSection = {
    label?: string;
    items: AdaptiveSidebarItem[];
};