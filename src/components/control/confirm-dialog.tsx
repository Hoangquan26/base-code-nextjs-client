"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ConfirmDialogProps = {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "destructive";
    trigger?: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
    className?: string;
};

export function ConfirmDialog({
    title = "Xác nhận thao tác",
    description = "Hành động này có thể ảnh hưởng dữ liệu hiện tại.",
    confirmText = "Xác nhận",
    cancelText = "Hủy",
    variant = "default",
    trigger,
    onConfirm,
    onCancel,
    className,
}: ConfirmDialogProps) {
    return (
        <AlertDialog>
            {trigger ? <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger> : null}
            <AlertDialogContent className={cn(className)}>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    {description ? <AlertDialogDescription>{description}</AlertDialogDescription> : null}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className={cn(
                            variant === "destructive" && buttonVariants({ variant: "destructive" }),
                        )}
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
