import PageBreadcrumb from "@/components/layout/page-breadcrumb"
import ProfileTabContent from "@/components/settings/profile/profile-tab"
import SecurityTabContent from "@/components/settings/profile/security-tab"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function ProfilePage() {
    const breadcrumbItems = [
        { label: "Trang chủ", href: "/dashboard" },
        { label: "Cài đặt", href: "/settings" },
        { label: "Thông tin cá nhân" },
    ]

    return (
        <div className="mx-auto flex w-full flex-col gap-6">
            <div className="space-y-2">
                <PageBreadcrumb items={breadcrumbItems} />
                <div className=" flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold text-foreground">
                        Thông tin cá nhân
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Quản lý thông tin cá nhân & bảo mật & tài khoản của bạn trên hệ thống CRM.
                    </p>
                </div>
            </div>
            <Tabs defaultValue="profile" className="gap-6">
                <TabsList className="h-auto w-full justify-start gap-8 rounded-none border-b border-border bg-transparent p-0">
                    <TabsTrigger
                        value="profile"
                        className="cursor-pointer h-auto flex-none rounded-none border-b-2 border-transparent px-0 pb-3 pt-2 text-sm font-medium text-muted-foreground shadow-none data-[state=active]:border-b-vicenza-500 data-[state=active]:bg-transparent data-[state=active]:text-vicenza-600 data-[state=active]:shadow-none transition-colors"
                    >
                        Thông tin chung
                    </TabsTrigger>
                    <TabsTrigger
                        value="security"
                        className="cursor-pointer h-auto flex-none rounded-none border-b-2 border-transparent px-0 pb-3 pt-2 text-sm font-medium text-muted-foreground shadow-none data-[state=active]:border-b-vicenza-500 data-[state=active]:bg-transparent data-[state=active]:text-vicenza-600 data-[state=active]:shadow-none transition-colors"
                    >
                        Bảo mật
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <ProfileTabContent />
                </TabsContent>
                <TabsContent value="security">
                    <SecurityTabContent />
                </TabsContent>
            </Tabs>
        </div>
    )
}