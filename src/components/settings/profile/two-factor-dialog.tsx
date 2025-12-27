"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type TwoFactorMethod = "app" | "sms"

type TwoFactorDialogProps = {
    open: boolean
    method: TwoFactorMethod
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
}

const METHOD_COPY: Record<
    TwoFactorMethod,
    { title: string; description: string; cta: string }
> = {
    app: {
        title: "Thiết lập ứng dụng xác thực",
        description:
            "Quét mã QR bằng Authenticator để bật xác thực hai bước cho tài khoản.",
        cta: "Kích hoạt",
    },
    sms: {
        title: "Xác minh số điện thoại",
        description: "Thêm số điện thoại để nhận mã OTP qua SMS.",
        cta: "Gửi mã",
    },
}

export default function TwoFactorDialog({
    open,
    method,
    onOpenChange,
    onConfirm,
}: TwoFactorDialogProps) {
    const copy = METHOD_COPY[method]

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{copy.title}</DialogTitle>
                    <DialogDescription>{copy.description}</DialogDescription>
                </DialogHeader>
                {method === "app" ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-center">
                            <div className="flex h-44 w-44 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 text-xs text-muted-foreground">
                                Mã QR
                            </div>
                        </div>
                        <div className="rounded-xl border border-border bg-muted/40 px-4 py-3">
                            <p className="text-xs text-muted-foreground">
                                Mã dự phòng
                            </p>
                            <p className="mt-1 text-sm font-semibold tracking-widest text-foreground">
                                VCNZ-4821
                            </p>
                        </div>
                        <div className="rounded-xl border border-border bg-background px-4 py-3">
                            <p className="text-xs font-medium text-foreground">
                                Hướng dẫn nhanh
                            </p>
                            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                                <p>1. Mở ứng dụng Authenticator.</p>
                                <p>2. Quét mã QR hoặc nhập mã dự phòng.</p>
                                <p>3. Nhập mã 6 số để hoàn tất xác minh.</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="otp">Mã xác thực</Label>
                            <Input id="otp" placeholder="Nhập 6 chữ số" />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="sms-phone">Số điện thoại</Label>
                            <Input
                                id="sms-phone"
                                type="tel"
                                placeholder="+84 90 123 4567"
                            />
                        </div>
                        <div className="rounded-xl border border-border bg-muted/40 px-4 py-3">
                            <p className="text-xs text-muted-foreground">
                                Chúng tôi sẽ gửi mã xác minh đến số này để kích
                                hoạt 2FA.
                            </p>
                        </div>
                    </div>
                )}
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Hủy
                    </Button>
                    <Button type="button" onClick={onConfirm}>
                        {copy.cta}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
