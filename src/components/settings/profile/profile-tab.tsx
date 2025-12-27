"use client"

import { useMemo, useState } from "react"
import { Mail, Phone } from "lucide-react"

import UnsavedChangesBar from "@/components/layout/unsaved-changes-bar"
import AvatarDialog from "@/components/settings/profile/avatar-dialog"
import AvatarPreviewButton from "@/components/settings/profile/avatar-preview-button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAuthUser } from "@/stores/auth/auth.selector"

type ProfileFormValues = {
    firstName: string
    lastName: string
    username: string
    role: string
    email: string
    phone: string
    country: string
    bio: string
}

const createDefaultValues = (): ProfileFormValues => ({
    firstName: "Vincenza",
    lastName: "Admin",
    username: "admin.user",
    role: "Super Administrator",
    email: "admin@vincenza.vn",
    phone: "+84 90 123 4567",
    country: "vn",
    bio: "",
})

export default function ProfileTabContent() {
    const authUser = useAuthUser()
    const [baselineValues, setBaselineValues] = useState<ProfileFormValues>(
        createDefaultValues
    )
    const [values, setValues] = useState<ProfileFormValues>(createDefaultValues)
    const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false)

    const isDirty = useMemo(() => {
        return JSON.stringify(values) !== JSON.stringify(baselineValues)
    }, [baselineValues, values])

    const handleDiscard = () => {
        setValues({ ...baselineValues })
    }

    const handleSave = () => {
        setBaselineValues({ ...values })
    }

    const displayName = authUser?.name ?? authUser?.email ?? "Người dùng"
    const avatarUrl = authUser?.avatarUrl ?? "/img/team-img.jpg"

    return (
        <div className="relative flex flex-col gap-6">
            <Card>
                <CardHeader className="border-b">
                    <div className="flex items-center gap-4">
                        <AvatarPreviewButton
                            avatarUrl={avatarUrl}
                            displayName={displayName}
                            onClick={() => setIsAvatarDialogOpen(true)}
                        />
                        <div className="space-y-1">
                            <CardTitle>Thông tin cá nhân</CardTitle>
                            <CardDescription>
                                Cập nhật ảnh đại diện và thông tin cá nhân trong
                                hệ thống CRM.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid gap-6 md:grid-cols-[160px_1fr]">
                        <div className="space-y-2">
                            <Button
                                type="button"
                                variant="link"
                                className="h-auto justify-start p-0 text-sm text-muted-foreground"
                                onClick={() => setIsAvatarDialogOpen(true)}
                            >
                                Thay đổi ảnh đại diện
                            </Button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">Tên</Label>
                                <Input
                                    id="first-name"
                                    value={values.firstName}
                                    onChange={(event) =>
                                        setValues((prev) => ({
                                            ...prev,
                                            firstName: event.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Họ</Label>
                                <Input
                                    id="last-name"
                                    value={values.lastName}
                                    onChange={(event) =>
                                        setValues((prev) => ({
                                            ...prev,
                                            lastName: event.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="username">Tên đăng nhập</Label>
                                <InputGroup>
                                    <InputGroupAddon>
                                        <InputGroupText>
                                            vincenza.crm/
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        id="username"
                                        value={values.username}
                                        onChange={(event) =>
                                            setValues((prev) => ({
                                                ...prev,
                                                username: event.target.value,
                                            }))
                                        }
                                    />
                                </InputGroup>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Vai trò</Label>
                                <Input
                                    id="role"
                                    value={values.role}
                                    onChange={(event) =>
                                        setValues((prev) => ({
                                            ...prev,
                                            role: event.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="border-b">
                    <CardTitle>Thông tin liên hệ</CardTitle>
                    <CardDescription>
                        Liên hệ của bạn được hiển thị trong hệ thống.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 pt-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email liên hệ</Label>
                        <InputGroup>
                            <InputGroupAddon>
                                <Mail className="h-4 w-4 text-muted-foreground" />
                            </InputGroupAddon>
                            <InputGroupInput
                                id="email"
                                type="email"
                                value={values.email}
                                onChange={(event) =>
                                    setValues((prev) => ({
                                        ...prev,
                                        email: event.target.value,
                                    }))
                                }
                            />
                        </InputGroup>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Số điện thoại</Label>
                            <InputGroup>
                                <InputGroupAddon>
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                </InputGroupAddon>
                                <InputGroupInput
                                    id="phone"
                                    type="tel"
                                    value={values.phone}
                                    onChange={(event) =>
                                        setValues((prev) => ({
                                            ...prev,
                                            phone: event.target.value,
                                        }))
                                    }
                                />
                            </InputGroup>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="country">Địa điểm</Label>
                            <Select
                                value={values.country}
                                onValueChange={(value) =>
                                    setValues((prev) => ({
                                        ...prev,
                                        country: value,
                                    }))
                                }
                            >
                                <SelectTrigger id="country" className="w-full">
                                    <SelectValue placeholder="Chọn quốc gia" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="vn">Vietnam</SelectItem>
                                    <SelectItem value="sg">Singapore</SelectItem>
                                    <SelectItem value="us">United States</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bio">Thông tin thêm / Chi tiết</Label>
                        <Textarea
                            id="bio"
                            placeholder="Ngắn gọn thông tin chi tiết về bản thân..."
                            className="min-h-[120px]"
                            value={values.bio}
                            onChange={(event) =>
                                setValues((prev) => ({
                                    ...prev,
                                    bio: event.target.value,
                                }))
                            }
                        />
                        <p className="text-xs text-muted-foreground">
                            Thông tin thêm về bản thân hoặc đường dẫn liên kết
                            khác.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <UnsavedChangesBar
                visible={isDirty}
                onDiscard={handleDiscard}
                onSave={handleSave}
            />
            <AvatarDialog
                open={isAvatarDialogOpen}
                onOpenChange={setIsAvatarDialogOpen}
                currentAvatarUrl={avatarUrl}
                displayName={displayName}
            />
        </div>
    )
}
