"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

type AdaptiveSearchProps = {
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onSearch?: (value: string) => void;
    trigger?: React.ReactNode;
    actions?: React.ReactNode;
    filters?: React.ReactNode;
    className?: string;
    inputClassName?: string;
    mobileTitle?: string;
};

export function AdaptiveSearch({
    placeholder = "Tìm kiếm...",
    value,
    defaultValue = "",
    onChange,
    onSearch,
    trigger,
    actions,
    filters,
    className,
    inputClassName,
    mobileTitle = "Tìm kiếm",
}: AdaptiveSearchProps) {
    const isMobile = useIsMobile();
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const inputValue = value ?? internalValue;

    const handleChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (value === undefined) {
                setInternalValue(event.target.value);
            }
            onChange?.(event.target.value);
        },
        [onChange, value],
    );

    const handleSearch = React.useCallback(() => {
        onSearch?.(inputValue);
    }, [inputValue, onSearch]);

    const handleSubmit = React.useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleSearch();
        },
        [handleSearch],
    );

    const input = (
        <Input
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholder}
            className={cn("pl-9", inputClassName)}
        />
    );

    const searchContent = (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                {input}
            </div>
            {filters ? <div className="flex flex-wrap gap-2">{filters}</div> : null}
            {actions ? (
                <div className="flex flex-wrap items-center gap-2">{actions}</div>
            ) : null}
        </form>
    );

    if (isMobile) {
        return (
            <Sheet>
                <SheetTrigger asChild>
                    {trigger ?? (
                        <Button type="button" variant="outline" size="sm">
                            <Search className="h-4 w-4" />
                            Tìm kiếm
                        </Button>
                    )}
                </SheetTrigger>
                <SheetContent side="bottom" className="gap-4">
                    <SheetHeader>
                        <SheetTitle>{mobileTitle}</SheetTitle>
                    </SheetHeader>
                    {searchContent}
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <div className={cn("flex w-full flex-wrap items-center gap-2", className)}>
            <div className="relative min-w-[220px] flex-1">
                <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                {input}
            </div>
            {filters ? <div className="flex items-center gap-2">{filters}</div> : null}
            {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
            {onSearch ? (
                <Button type="button" onClick={handleSearch}>
                    Tìm
                </Button>
            ) : null}
        </div>
    );
}
