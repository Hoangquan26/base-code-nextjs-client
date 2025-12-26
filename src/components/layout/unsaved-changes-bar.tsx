"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type UnsavedChangesBarProps = {
    visible: boolean
    title?: string
    description?: string
    saveLabel?: string
    discardLabel?: string
    onSave?: () => void
    onDiscard?: () => void
    className?: string
}

type AnchorStyle = {
    left: number
    width: number
}

export default function UnsavedChangesBar({
    visible,
    title = "Bạn có thay đổi chưa lưu.",
    description = "Lưu thay đổi hoặc hủy để tiếp tục.",
    saveLabel = "Lưu thay đổi",
    discardLabel = "Hủy",
    onSave,
    onDiscard,
    className,
}: UnsavedChangesBarProps) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [anchorStyle, setAnchorStyle] = useState<AnchorStyle | null>(null)

    useLayoutEffect(() => {
        const node = containerRef.current
        const parent = node?.parentElement
        if (!node || !parent) {
            return
        }

        const updatePosition = () => {
            const rect = parent.getBoundingClientRect()
            setAnchorStyle({ left: rect.left, width: rect.width })
        }

        updatePosition()

        const resizeObserver = new ResizeObserver(updatePosition)
        resizeObserver.observe(parent)
        window.addEventListener("resize", updatePosition)

        return () => {
            resizeObserver.disconnect()
            window.removeEventListener("resize", updatePosition)
        }
    }, [])

    const hasAnchor = Boolean(anchorStyle)

    return (
        <div
            ref={containerRef}
            className={cn(
                "fixed bottom-6 z-40",
                !hasAnchor &&
                    "left-0 right-0 mx-auto w-full max-w-5xl",
                className
            )}
            style={
                anchorStyle
                    ? {
                          left: anchorStyle.left,
                          width: anchorStyle.width,
                      }
                    : undefined
            }
        >
            <div
                className={cn(
                    "flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/80 bg-background/90 px-5 py-6 shadow-xl shadow-black/5 backdrop-blur transition-all duration-300 ease-out motion-reduce:transition-none supports-[backdrop-filter]:bg-background/70",
                    visible
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-4 opacity-0"
                )}
            >
                <div className=" flex w-full items-center gap-3 lg:w-fit">
                    <span className="h-full rounded-tl-2xl rounded-bl-2xl w-2.5  bg-amber-400 absolute left-0" />
                    <div className="ml-2">
                        <p className="text-md font-semibold text-foreground">
                            {title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>
                </div>
                <div className="flex w-full items-center gap-2 lg:w-fit">
                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="grow basis-1/2 lg:basis-0 lg:grow-0"
                        onClick={onDiscard}
                    >
                        {discardLabel}
                    </Button>
                    <Button
                        type="button"
                        size="lg"
                        className="bg-vicenza-500 hover:bg-vicenza-600 basis-1/2 grow lg:basis-0 lg:grow-0"
                        onClick={onSave}
                    >
                        {saveLabel}
                    </Button>
                </div>
            </div>
        </div>
    )
}