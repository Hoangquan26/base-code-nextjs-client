"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

type AdaptiveDialogProps = {
    title?: string;
    description?: string;
    trigger?: React.ReactNode;
    footer?: React.ReactNode;
    children?: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    contentClassName?: string;
    mobileSide?: "top" | "right" | "bottom" | "left";
};

export function AdaptiveDialog({
    title,
    description,
    trigger,
    footer,
    children,
    open,
    defaultOpen,
    onOpenChange,
    contentClassName,
    mobileSide = "bottom",
}: AdaptiveDialogProps) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return ( 
            <Sheet
                open={open}
                defaultOpen={defaultOpen}
                onOpenChange={onOpenChange}
            >
                {trigger ? <SheetTrigger asChild>{trigger}</SheetTrigger> : null}
                <SheetContent side={mobileSide} className={cn("p-0", contentClassName)}>
                    {title || description ? (
                        <SheetHeader className="px-4 pt-4">
                            {title ? <SheetTitle className=" text-xl">{title}</SheetTitle> : null}
                            {description ? (
                                <SheetDescription>{description}</SheetDescription>
                            ) : null}
                        </SheetHeader>
                    ) : null}
                    <div className="px-4 pb-4">{children}</div>
                    {footer ? (
                        <SheetFooter className="border-t border-border px-4 py-3">
                            {footer}
                        </SheetFooter>
                    ) : null}
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Dialog
            open={open}
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
        >
            {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
            <DialogContent className={contentClassName}>
                {title || description ? (
                    <DialogHeader>
                        {title ? <DialogTitle>{title}</DialogTitle> : null}
                        {description ? (
                            <DialogDescription>{description}</DialogDescription>
                        ) : null}
                    </DialogHeader>
                ) : null}
                {children}
                {footer ? <DialogFooter>{footer}</DialogFooter> : null}
            </DialogContent>
        </Dialog>
    );
}
