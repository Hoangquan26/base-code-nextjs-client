"use client";

import { AdaptiveDialog } from "@/components/adaptive/adaptive-dialog/adaptive-dialog";
import { AdaptivePageHeader } from "@/components/adaptive/adaptive-page-header/adaptive-page-header";
import { AdaptiveSearch } from "@/components/adaptive/adaptive-search/adaptive-search";
import { AdaptiveSidebar } from "@/components/adaptive/adaptive-sidebar/adaptive-sidebar";
import { type AdaptiveSidebarSection } from "@/components/adaptive/adaptive-sidebar/adaptive-sidebar-section.type";
import { AppToast, notify } from "@/components/control/app-toast";
import { ConfirmDialog } from "@/components/control/confirm-dialog";
import { CopyToClipboard } from "@/components/control/copy-to-clipboard";
import { ExpandableText, ReadMore } from "@/components/control/expandable-text";
import { HelpPopover } from "@/components/control/help-popover";
import { TooltipHint } from "@/components/control/tooltip-hint";
import {
  AppTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
  TableSearch,
} from "@/components/data/app-table";
import { NotificationItem } from "@/components/domain/notification-item";
import { SystemAlertItem } from "@/components/domain/system-alert-item";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  FileText,
  Inbox,
  LayoutGrid,
  Plus,
  Settings,
  ShieldCheck,
  Trash2,
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

const tableRows = [
  {
    id: "CUS-001",
    name: "Nguyễn Minh Anh",
    email: "minhanh@vincenza.vn",
    status: "Đang hoạt động",
    total: "128.000.000đ",
  },
  {
    id: "CUS-002",
    name: "Trần Quốc Bảo",
    email: "quocbao@vincenza.vn",
    status: "Tạm dừng",
    total: "56.500.000đ",
  },
  {
    id: "CUS-003",
    name: "Lê Thu Hà",
    email: "lethuha@vincenza.vn",
    status: "Đang hoạt động",
    total: "342.000.000đ",
  },
  {
    id: "CUS-004",
    name: "Phạm Gia Hưng",
    email: "giahung@vincenza.vn",
    status: "Chờ xác nhận",
    total: "24.000.000đ",
  },
  {
    id: "CUS-005",
    name: "Võ Thành Long",
    email: "thanhlong@vincenza.vn",
    status: "Đang hoạt động",
    total: "75.300.000đ",
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

        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <AdaptivePageHeader
            title="Khách hàng"
            subtitle="Theo dõi và cập nhật thông tin khách hàng."
            meta={<Badge variant="secondary">128 bản ghi</Badge>}
            actions={
              <>
                <Button variant="outline">Xuất dữ liệu</Button>
                <Button>
                  <Plus className="h-4 w-4" />
                  Thêm khách hàng
                </Button>
              </>
            }
            mobileActions={
              <>
                <Button variant="outline">Xuất dữ liệu</Button>
                <Button>
                  <Plus className="h-4 w-4" />
                  Thêm khách hàng
                </Button>
              </>
            }
          >
            <div className="pt-3">
              <AdaptiveSearch
                placeholder="Tìm theo tên, email, số điện thoại..."
                actions={
                  <Button variant="outline" size="sm">
                    Bộ lọc
                  </Button>
                }
              />
            </div>
          </AdaptivePageHeader>
        </section>

        <section>
          <AppTable
            title="Danh sách khách hàng"
            description="Tổng hợp dữ liệu khách hàng theo trạng thái."
            action={
              <Button>
                <Plus className="h-4 w-4" />
                Tạo mới
              </Button>
            }
            toolbar={
              <TableSearch
                placeholder="Tìm theo tên hoặc email..."
                onSearch={(value) => notify.info(`Đang tìm: ${value}`)}
                filters={
                  <>
                    <Button variant="outline" size="sm">
                      Trạng thái
                    </Button>
                    <Button variant="outline" size="sm">
                      Khu vực
                    </Button>
                  </>
                }
                actions={
                  <Button variant="outline" size="sm">
                    Xuất dữ liệu
                  </Button>
                }
              />
            }
            footer={
              <TablePagination
                page={1}
                totalPages={5}
                totalItems={23}
                pageSize={5}
                onPageChange={(nextPage) =>
                  notify.info(`Chuyển đến trang ${nextPage}`)
                }
              />
            }
          >
            <TableHeader>
              <TableRow>
                <TableHead>Mã</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead align="right">Doanh thu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell muted>{row.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        row.status === "Đang hoạt động"
                          ? "default"
                          : row.status === "Tạm dừng"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </AppTable>
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

        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Interaction &amp; Control</h2>
              <p className="text-sm text-muted-foreground">
                Các thao tác tương tác và điều khiển dùng chung.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <TooltipHint content="Tooltip mô tả nhanh cho hành động." />
              <HelpPopover
                title="Trợ giúp nhanh"
                description="Hướng dẫn thao tác cho mục này."
                content="Bạn có thể tùy chỉnh nội dung theo từng nghiệp vụ."
              />
            </div>
          </div>

          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold">CopyToClipboard</p>
                <CopyToClipboard value="CRM-2025-001" />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold">ExpandableText</p>
                <ExpandableText
                  text="CRM base code cần nội dung mô tả dài để người mới hiểu nhanh mục đích của từng module. Component này giúp thu gọn văn bản và mở rộng khi cần."
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold">ReadMore</p>
                <ReadMore text="Chính sách bảo mật và quy định nội bộ có thể khá dài. ReadMore hỗ trợ xem thêm nhanh mà không làm rối layout." />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold">ConfirmDialog</p>
                <ConfirmDialog
                  variant="destructive"
                  title="Xóa khách hàng"
                  description="Bạn chắc chắn muốn xóa khách hàng này? Thao tác không thể hoàn tác."
                  confirmText="Xóa"
                  cancelText="Hủy"
                  trigger={
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4" />
                      Xóa dữ liệu
                    </Button>
                  }
                  onConfirm={() => notify.success("Đã xóa dữ liệu thành công.")}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold">AppToast</p>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => notify.success("Lưu thành công.")}>
                    Toast thành công
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => notify.error("Có lỗi xảy ra, vui lòng thử lại.")}
                  >
                    Toast lỗi
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Notification &amp; System Alert</h2>
              <p className="text-sm text-muted-foreground">
                Tùy biến item thông báo và cảnh báo hệ thống.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-semibold">NotificationItem</p>
              <NotificationItem
                title="Yêu cầu mới từ khách hàng"
                description="Khách hàng Nguyễn An gửi yêu cầu hỗ trợ."
                time="2 phút trước"
                badge="Mới"
                unread
                icon={<Bell className="h-4 w-4" />}
                href="/dev/notifications/1"
                actions={
                  <Button variant="outline" size="sm">
                    Xem
                  </Button>
                }
              />
              <NotificationItem
                title="Hóa đơn đã được thanh toán"
                description="Invoice #INV-2025-01 đã hoàn tất."
                time="Hôm qua"
                icon={<FileText className="h-4 w-4" />}
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold">SystemAlertItem</p>
              <SystemAlertItem
                variant="warning"
                title="Cảnh báo dung lượng"
                description="Dung lượng lưu trữ còn dưới 10%."
                icon={<AlertTriangle className="h-4 w-4" />}
                action={
                  <Button variant="outline" size="sm">
                    Nâng cấp
                  </Button>
                }
              />
              <SystemAlertItem
                variant="success"
                title="Đồng bộ hoàn tất"
                description="Dữ liệu đã được đồng bộ thành công."
                icon={<ShieldCheck className="h-4 w-4" />}
              />
            </div>
          </div>
        </section>
      </div>
      <AppToast />
    </AdaptiveSidebar>
  );
}
