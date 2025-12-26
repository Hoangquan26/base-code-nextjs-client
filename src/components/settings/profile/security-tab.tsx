import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SecurityTabContent() {
    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardContent className="pt-6">
                    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <h3 className="text-base font-semibold">
                                    Đổi mật khẩu
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Đảm bảo tính an toàn cho tài khoản của bạn, đổi mật khẩu ngay khi thấy cần thiết.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">
                                        Mật khẩu hiện tại
                                    </Label>
                                    <Input
                                        id="current-password"
                                        type="password"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">
                                        Mật khẩu mới
                                    </Label>
                                    <Input id="new-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">
                                        Xác nhận mật khẩu mới
                                    </Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    className="bg-vicenza-500 text-white hover:bg-neutral-800"
                                >
                                    Lưu thay đổi
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-6 lg:border-l lg:border-border lg:pl-6">
                            <div className="space-y-1">
                                <h3 className="text-base font-semibold">
                                    Xác thực 2 yếu tố (2FA)
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Thêm xác thực cho tài khoản của bạn.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-4">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">
                                            Bật xác thực 2 bước
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Sử dụng ứng dụng Authenticator để nhận mã đăng nhập(TOTP) mỗi khi truy cập tài khoản.
                                        </p>
                                    </div>
                                    <Switch className="data-[state=checked]:bg-vicenza-500" />
                                </div>
                                <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-4">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">
                                            Xác thực qua Email
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Nhận mã OTP qua email đăng ký.
                                        </p>
                                    </div>
                                    <Switch className="data-[state=checked]:bg-vicenza-500" />
                                </div>
                                <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-4">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">
                                            Cảnh báo đăng nhập
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Nhận thông báo qua Email ngay khi có thiết bị lạ truy cập tài khoản.
                                        </p>
                                    </div>
                                    <Switch
                                        defaultChecked
                                        className="data-[state=checked]:bg-vicenza-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
