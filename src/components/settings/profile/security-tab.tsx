"use client"

import { useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import TwoFactorDialog from "@/components/settings/profile/two-factor-dialog"
import {
    FormikForm,
    FormikInput,
    FormikSubmitButton,
} from "@/components/form/formik"
import { changePasswordInitial } from "@/forms/change-password/change-password.init"
import { ChangePasswordSchema } from "@/forms/change-password/change-password.schema"
import { profileService } from "@/services/profile.service"

type TwoFactorMethod = "app" | "sms"

export default function SecurityTabContent() {
    const [isAppEnabled, setIsAppEnabled] = useState(false)
    const [isSmsEnabled, setIsSmsEnabled] = useState(false)
    const [isLoginAlertEnabled, setIsLoginAlertEnabled] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [pendingMethod, setPendingMethod] = useState<TwoFactorMethod>("app")

    const handleToggle = (method: TwoFactorMethod, checked: boolean) => {
        if (checked) {
            setPendingMethod(method)
            setDialogOpen(true)
            return
        }

        if (method === "app") {
            setIsAppEnabled(false)
        } else {
            setIsSmsEnabled(false)
        }
    }

    const handleConfirm = () => {
        if (pendingMethod === "app") {
            setIsAppEnabled(true)
        } else {
            setIsSmsEnabled(true)
        }
        setDialogOpen(false)
    }

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
                                    Đảm bảo mật khẩu của bạn mạnh và an toàn.
                                </p>
                            </div>
                            <FormikForm
                                initialValues={changePasswordInitial}
                                validationSchema={ChangePasswordSchema}
                                onSubmit={async (values, { setStatus }) => {
                                    try {
                                        await profileService.changePassword({
                                            currentPassword: values.currentPassword,
                                            newPassword: values.newPassword
                                        })
                                        setStatus("")
                                    } catch (error) {
                                        setStatus(
                                            "Tên đăng nhập hoặc mật khẩu không hợp lệ"
                                        )
                                    }
                                }}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <FormikInput
                                        id="currentPassword"
                                        type="password"
                                        name="currentPassword"
                                        label="Mật khẩu hiện tại"
                                        required
                                        placeholder="Điền mật khẩu hiện tại"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FormikInput
                                        id="newPassword"
                                        type="password"
                                        name="newPassword"
                                        label="Mật khẩu mới"
                                        required
                                        placeholder="Điền mật khẩu mới"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FormikInput
                                        id="confirmNewPassword"
                                        type="password"
                                        name="confirmNewPassword"
                                        label="Xác nhận mật khẩu mới"
                                        required
                                        placeholder="Điền mật khẩu xác nhận"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <FormikSubmitButton className="bg-vicenza-500 text-white hover:bg-vicenza-600">
                                        Lưu thay đổi
                                    </FormikSubmitButton>
                                </div>
                            </FormikForm>
                        </div>
                        <div className="space-y-6 lg:border-l lg:border-border lg:pl-6">
                            <div className="space-y-1">
                                <h3 className="text-base font-semibold">
                                    Xác thực 2 yếu tố (2FA)
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Tăng cường bảo mật cho tài khoản của bạn.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-4">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">
                                            Bật xác thực 2 bước
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Sử dụng ứng dụng Authenticator để nhận
                                            mã.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={isAppEnabled}
                                        onCheckedChange={(checked) =>
                                            handleToggle("app", checked)
                                        }
                                        className="data-[state=checked]:bg-vicenza-500"
                                    />
                                </div>
                                <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-4">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">
                                            Xác thực qua SMS
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Nhận mã OTP qua số điện thoại đăng
                                            ký.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={isSmsEnabled}
                                        onCheckedChange={(checked) =>
                                            handleToggle("sms", checked)
                                        }
                                        className="data-[state=checked]:bg-vicenza-500"
                                    />
                                </div>
                                <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-4">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">
                                            Cảnh báo đăng nhập
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Gửi email thông báo khi có đăng nhập
                                            từ thiết bị lạ.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={isLoginAlertEnabled}
                                        onCheckedChange={setIsLoginAlertEnabled}
                                        className="data-[state=checked]:bg-vicenza-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <TwoFactorDialog
                open={dialogOpen}
                method={pendingMethod}
                onOpenChange={setDialogOpen}
                onConfirm={handleConfirm}
            />
        </div>
    )
}
