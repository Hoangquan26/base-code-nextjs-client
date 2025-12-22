"use client";

import { AdaptiveDialog } from "@/components/adaptive/adaptive-dialog/adaptive-dialog";
import { AdaptiveSidebar } from "@/components/adaptive/adaptive-sidebar/adaptive-sidebar";
import { type AdaptiveSidebarSection } from "@/components/adaptive/adaptive-sidebar/adaptive-sidebar-section.type";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Bell,
  FileText,
  Inbox,
  LayoutGrid,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

const sections: AdaptiveSidebarSection[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", href: "/dev", icon: LayoutGrid },
      { title: "Reports", href: "/dev/reports", icon: BarChart3 },
    ],
  },
  {
    label: "Management",
    items: [
      { title: "Customers", href: "/dev/customers", icon: Users },
      { title: "Invoices", href: "/dev/invoices", icon: FileText },
      { title: "Security", href: "/dev/security", icon: ShieldCheck },
      { title: "Notifications", href: "/dev/notifications", icon: Bell },
      { title: "Settings", href: "/dev/settings", icon: Settings },
    ],
  },
];

export default function DevPage() {
  return (
    <AdaptiveSidebar
      title="Vincenza CRM"
      subtitle="Xem trước Adaptive Sidebar"
      sections={sections}
      footer={
        <div className="flex items-center gap-3 rounded-md bg-sidebar-accent px-3 py-2 text-sidebar-accent-foreground">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-brand-foreground text-xs font-semibold">
            VA
          </div>
          <div className="text-sm">
            <p className="font-semibold">Admin</p>
            <p className="text-xs text-sidebar-accent-foreground/80">
              admin@vincenza.vn
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">Adaptive Sidebar</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Xem trước layout cho base code. Sidebar tự động co giãn cho mobile
            và desktop.
          </p>
        </section>

        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Adaptive Dialog</h2>
              <p className="text-sm text-muted-foreground">
                Dialog tự chuyển sang Sheet trên mobile.
              </p>
            </div>
            <AdaptiveDialog
              title="Tạo khách hàng"
              description="Điền thông tin để tạo mới khách hàng."
              trigger={<Button>Thêm khách hàng</Button>}
              footer={
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end">
                  <Button variant="outline">Hủy</Button>
                  <Button>Lưu</Button>
                </div>
              }
            >
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Ví dụ nội dung form sẽ nằm ở đây.</p>
                <div className="rounded-md border border-border bg-surface px-3 py-2">
                  Tên khách hàng
                </div>
                <div className="rounded-md border border-border bg-surface px-3 py-2">
                  Số điện thoại
                </div>
                <div className="rounded-md border border-border bg-surface px-3 py-2">
                  Email liên hệ
                </div>
              </div>
            </AdaptiveDialog>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="text-sm text-muted-foreground">Hoạt động hôm nay</p>
            <p className="mt-2 text-2xl font-semibold">128</p>
            <p className="text-sm text-success">+12% so với hôm qua</p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="text-sm text-muted-foreground">Đơn cần xử lý</p>
            <p className="mt-2 text-2xl font-semibold">24</p>
            <p className="text-sm text-warning">5 cần ưu tiên</p>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-elevated p-4">
          <h2 className="text-lg font-semibold">Danh sách gần đây</h2>
          <div className="mt-3 space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Hợp đồng #A-1023</span>
              <span className="text-info">Đang xử lý</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Yêu cầu hỗ trợ #T-225</span>
              <span className="text-success">Hoàn tất</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Thanh toán #P-88</span>
              <span className="text-warning">Cần xác nhận</span>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <LoadingState
            action={<Button variant="outline">Hủy</Button>}
            className="bg-card"
          />
          <EmptyState
            title="Chưa có hồ sơ"
            description="Tạo hồ sơ mới để bắt đầu quản lý khách hàng."
            icon={<Inbox className="h-5 w-5" />}
            action={<Button>Thêm hồ sơ</Button>}
          />
          <ErrorState
            description="Không thể tải dữ liệu. Kiểm tra kết nối và thử lại."
            action={<Button variant="outline">Thử lại</Button>}
          />
        </section>
      </div>
    </AdaptiveSidebar>
  );
}
