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
        { label: "Home", href: "/dashboard" },
        { label: "Settings", href: "/settings" },
        { label: "Profile" },
    ]

    return (
        <div className="mx-auto flex w-full flex-col gap-6">
            <div className="space-y-2">
                <PageBreadcrumb items={breadcrumbItems} />
                <div>
                    <h2 className="text-2xl font-semibold text-foreground">
                        My Profile
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Manage your personal information and account preferences.
                    </p>
                </div>
            </div>
            <Tabs defaultValue="profile" className="gap-6">
                <TabsList className="h-auto w-full justify-start gap-8 rounded-none border-b border-border bg-transparent p-0">
                    <TabsTrigger
                        value="profile"
                        className="h-auto flex-none rounded-none border-b-2 border-transparent px-0 pb-3 pt-2 text-sm font-medium text-muted-foreground shadow-none data-[state=active]:border-b-vicenza-500 data-[state=active]:text-vicenza-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none cursor-pointer"
                    >
                        Thông tin chung
                    </TabsTrigger>
                    <TabsTrigger
                        value="security"
                        className="h-auto flex-none rounded-none border-b-2 border-transparent px-0 pb-3 pt-2 text-sm font-medium text-muted-foreground shadow-none data-[state=active]:border-b-vicenza-500 data-[state=active]:text-vicenza-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none cursor-pointer"
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
