"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table as UiTable,
  TableBody as UiTableBody,
  TableCell as UiTableCell,
  TableHead as UiTableHead,
  TableHeader as UiTableHeader,
  TableRow as UiTableRow,
} from "@/components/ui/table";

type AppTableProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  toolbar?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  tableClassName?: string;
};

export function AppTable({
  title,
  description,
  action,
  toolbar,
  footer,
  children,
  className,
  tableClassName,
}: AppTableProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card shadow-sm", className)}>
      {title || description || action ? (
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-4 py-3">
          <div className="space-y-1">
            {title ? <h3 className="text-base font-semibold">{title}</h3> : null}
            {description ? (
              <p className="text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {action ? <div className="flex items-center gap-2">{action}</div> : null}
        </div>
      ) : null}
      {toolbar ? <div className="border-b border-border px-4 py-3">{toolbar}</div> : null}
      <UiTable className={cn("min-w-full", tableClassName)}>{children}</UiTable>
      {footer ? <div className="border-t border-border px-4 py-3">{footer}</div> : null}
    </div>
  );
}

export function TableHeader({
  className,
  ...props
}: React.ComponentProps<"thead">) {
  return (
    <UiTableHeader
      className={cn(
        "bg-muted/40 text-muted-foreground [&_tr]:border-b [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wide",
        className,
      )}
      {...props}
    />
  );
}

export function TableBody({
  className,
  ...props
}: React.ComponentProps<"tbody">) {
  return <UiTableBody className={cn(className)} {...props} />;
}

export function TableRow({
  className,
  ...props
}: React.ComponentProps<"tr">) {
  return (
    <UiTableRow
      className={cn(
        "transition-colors hover:bg-muted/40 data-[state=selected]:bg-muted/60",
        className,
      )}
      {...props}
    />
  );
}

type TableHeadProps = React.ComponentProps<"th"> & {
  align?: "left" | "center" | "right";
};

export function TableHead({ align = "left", className, ...props }: TableHeadProps) {
  return (
    <UiTableHead
      className={cn(
        align === "right" && "text-right",
        align === "center" && "text-center",
        className,
      )}
      {...props}
    />
  );
}

type TableCellProps = React.ComponentProps<"td"> & {
  align?: "left" | "center" | "right";
  muted?: boolean;
};

export function TableCell({
  align = "left",
  muted = false,
  className,
  ...props
}: TableCellProps) {
  return (
    <UiTableCell
      className={cn(
        "py-3",
        muted && "text-muted-foreground",
        align === "right" && "text-right",
        align === "center" && "text-center",
        className,
      )}
      {...props}
    />
  );
}

type TableSearchProps = {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  actions?: React.ReactNode;
  filters?: React.ReactNode;
  className?: string;
  inputClassName?: string;
};

export function TableSearch({
  placeholder = "Tìm kiếm...",
  value,
  defaultValue = "",
  onChange,
  onSearch,
  actions,
  filters,
  className,
  inputClassName,
}: TableSearchProps) {
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

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex w-full flex-wrap items-center gap-2", className)}
    >
      <div className="relative min-w-[220px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn("pl-9", inputClassName)}
        />
      </div>
      {filters ? <div className="flex items-center gap-2">{filters}</div> : null}
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      {onSearch ? (
        <Button type="submit" variant="secondary">
          Tìm kiếm
        </Button>
      ) : null}
    </form>
  );
}

type TablePaginationProps = {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  hrefBuilder?: (page: number) => string;
  totalItems?: number;
  pageSize?: number;
  itemLabel?: string;
  className?: string;
};

const PAGINATION_ELLIPSIS = "ellipsis";

function getPaginationRange(current: number, total: number, delta: number) {
  const range: number[] = [];
  const rangeWithDots: Array<number | typeof PAGINATION_ELLIPSIS> = [];
  let last: number | undefined;

  for (let i = 1; i <= total; i += 1) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    }
  }

  for (const page of range) {
    if (last !== undefined) {
      if (page - last === 2) {
        rangeWithDots.push(last + 1);
      } else if (page - last > 2) {
        rangeWithDots.push(PAGINATION_ELLIPSIS);
      }
    }
    rangeWithDots.push(page);
    last = page;
  }

  return rangeWithDots;
}

export function TablePagination({
  page,
  totalPages,
  onPageChange,
  hrefBuilder,
  totalItems,
  pageSize,
  itemLabel = "bản ghi",
  className,
}: TablePaginationProps) {
  const safePage = Math.max(1, Math.min(page, totalPages || 1));
  const range = getPaginationRange(safePage, totalPages, 1);
  const canGoPrev = safePage > 1;
  const canGoNext = safePage < totalPages;

  const summary =
    totalItems && pageSize
      ? {
          start: Math.min((safePage - 1) * pageSize + 1, totalItems),
          end: Math.min(safePage * pageSize, totalItems),
        }
      : null;

  const handleClick =
    (target: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!onPageChange || hrefBuilder) {
        return;
      }
      if (target < 1 || target > totalPages) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      onPageChange(target);
    };

  return (
    <div
      className={cn(
        "flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
        className,
      )}
    >
      {summary ? (
        <p className="text-sm text-muted-foreground">
          Hiển thị {summary.start}-{summary.end} / {totalItems} {itemLabel}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Trang {safePage} / {totalPages || 1}
        </p>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={hrefBuilder ? hrefBuilder(safePage - 1) : "#"}
              aria-disabled={!canGoPrev}
              className={!canGoPrev ? "pointer-events-none opacity-50" : undefined}
              onClick={handleClick(safePage - 1)}
            />
          </PaginationItem>
          {range.map((item, index) =>
            item === PAGINATION_ELLIPSIS ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationLink
                  href={hrefBuilder ? hrefBuilder(item) : "#"}
                  isActive={item === safePage}
                  onClick={handleClick(item)}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              href={hrefBuilder ? hrefBuilder(safePage + 1) : "#"}
              aria-disabled={!canGoNext}
              className={!canGoNext ? "pointer-events-none opacity-50" : undefined}
              onClick={handleClick(safePage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
