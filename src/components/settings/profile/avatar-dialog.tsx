"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Camera, ImagePlus, Trash2 } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AvatarDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    currentAvatarUrl?: string | null
    displayName?: string
}

export default function AvatarDialog({
    open,
    onOpenChange,
    currentAvatarUrl,
    displayName = "Người dùng",
}: AvatarDialogProps) {
    const [fileName, setFileName] = useState<string | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const initials = displayName
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl)
            }
        }
    }, [previewUrl])

    const handleClear = () => {
        setFileName(null)
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
            setPreviewUrl(null)
        }
        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }

    const handleSelect = (file?: File) => {
        if (!file) {
            handleClear()
            return
        }
        setFileName(file.name)
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
        }
        setPreviewUrl(URL.createObjectURL(file))
    }

    const sizeClass = previewUrl ? "h-40 w-40" : "h-32 w-32"

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Cập nhật ảnh đại diện</DialogTitle>
                    <DialogDescription>
                        Ảnh đại diện giúp mọi người dễ nhận ra bạn trong CRM.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 sm:grid-cols-[220px_1fr]">
                    <div className="flex flex-col items-center gap-4">
                        <button
                            type="button"
                            className={cn(
                                "group relative overflow-hidden rounded-full border border-border bg-muted shadow-sm transition-all duration-200",
                                sizeClass
                            )}
                            onClick={() => inputRef.current?.click()}
                        >
                            {previewUrl || currentAvatarUrl ? (
                                <Image
                                    src={previewUrl ?? currentAvatarUrl ?? ""}
                                    alt={displayName}
                                    width={160}
                                    height={160}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="flex h-full w-full items-center justify-center text-xl font-semibold text-muted-foreground">
                                    {initials || "ND"}
                                </span>
                            )}
                            <span className="absolute inset-0 rounded-full bg-black/35 opacity-0 transition group-hover:opacity-100" />
                            <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-muted-foreground shadow">
                                <Camera className="h-4 w-4" />
                            </span>
                        </button>
                        <div className="flex w-full flex-col gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={() => inputRef.current?.click()}
                            >
                                Chọn ảnh mới
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="w-full text-muted-foreground"
                                onClick={handleClear}
                            >
                                Gỡ ảnh
                            </Button>
                        </div>
                        <p className="text-center text-xs text-muted-foreground">
                            Nhấp vào ảnh để chọn ảnh mới. Ảnh vuông hiển thị đẹp
                            nhất.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-5 text-center">
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                                    <ImagePlus className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <p className="text-sm font-medium">
                                    Kéo & thả hoặc chọn ảnh từ thiết bị
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Hỗ trợ PNG, JPG tối đa 2MB.
                                </p>
                                <Button asChild variant="outline" size="sm">
                                    <label htmlFor="avatar-upload">
                                        Chọn ảnh
                                    </label>
                                </Button>
                                <input
                                    ref={inputRef}
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    className="sr-only"
                                    onChange={(event) =>
                                        handleSelect(event.target.files?.[0])
                                    }
                                />
                            </div>
                        </div>
                        {fileName ? (
                            <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground">
                                <span>
                                    Đã chọn: <strong>{fileName}</strong>
                                </span>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1 text-xs text-foreground"
                                    onClick={handleClear}
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Gỡ
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Hủy
                    </Button>
                    <Button type="button" onClick={() => onOpenChange(false)}>
                        Lưu thay đổi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
