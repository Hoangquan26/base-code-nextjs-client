"use client";

import * as React from "react";
import { SlidersHorizontal } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type AdaptivePageHeaderProps = {
  title: string;
  subtitle?: string;
  breadcrumbs?: React.ReactNode;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  mobileActions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export function AdaptivePageHeader({
  title,
  subtitle,
  breadcrumbs,
  meta,
  actions,
  mobileActions,
  children,
  className,
}: AdaptivePageHeaderProps) {
  const isMobile = useIsMobile();
  const shouldUseSheet = isMobile && (mobileActions || actions);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {breadcrumbs ? <div>{breadcrumbs}</div> : null}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold">{title}</h1>
            {meta ? <div className="flex items-center gap-2">{meta}</div> : null}
          </div>
          {subtitle ? (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        {shouldUseSheet ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4" />
                Tùy chọn
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="gap-4">
              <SheetHeader>
                <SheetTitle>Tùy chọn</SheetTitle>
              </SheetHeader>
              <div className="flex flex-wrap items-center gap-2">
                {mobileActions ?? actions}
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex flex-wrap items-center gap-2">{actions}</div>
        )}
      </div>
      {children ? <div>{children}</div> : null}
    </div>
  );
}
