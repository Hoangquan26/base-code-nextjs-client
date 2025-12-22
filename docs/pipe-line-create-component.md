# COMPANY BASE UI - Component Inventory

> Mục tiêu:
>
> - Bao quát đầy đủ (cả phần dự phòng) component cần thiết cho nhiều ứng dụng.
> - Dễ maintain, dễ mở rộng, không phá kiến trúc.
> - Dev mới nhìn là hiểu đang có sẵn gì.
> - Phù hợp base code dùng lâu dài (3-5 năm).

Ghi chú:

- **BẮT BUỘC**: component tối thiểu phải có trong base code.

---

## Checklist triển khai tối thiểu (không thể thiếu)

- [ ] AppLayout, ResponsiveSidebar, Topbar, PageHeader, PageContainer
- [ ] AppFormLayout, FormField, FormLabel, FormError, FormActions
- [ ] TextInput, SelectInput, DatePicker, SwitchInput
- [ ] AppTable, TableHeader, TableRow, TableCell, TablePagination, TableSearch
- [ ] LoadingState, EmptyState, ErrorState
- [ ] ConfirmDialog, AppToast
- [ ] PermissionGuard, RoleGuard

---

## I. Adaptive / Responsive Components

> Giải quyết khác biệt Desktop/Mobile, không để dev tự xử lý breakpoint trong từng page.

**Không thể thiếu:**

- **AdaptiveSidebar**
- **AdaptiveDialog**
- **AdaptiveFilters**
- **AdaptiveSearch**

Danh sách đầy đủ:

```txt
AdaptiveDialog
AdaptiveSheet
AdaptiveSidebar
AdaptiveDrawer
AdaptivePopover
AdaptiveMenu
AdaptiveTabs
AdaptiveToolbar
AdaptiveFilters
AdaptiveActions
AdaptiveFooterActions
AdaptiveSearch
AdaptiveSplitView
AdaptiveDetailView
AdaptivePageHeader
AdaptiveActionGroup
```

## II. Layout & Navigation Components

> Định hình khung ứng dụng, không chứa logic nghiệp vụ.

**Không thể thiếu:**

- **AppLayout**
- **ResponsiveSidebar**
- **Topbar**
- **PageHeader**
- **PageContainer**

Danh sách đầy đủ:

```txt
AppLayout
AuthLayout
DashboardLayout
EmptyLayout

Topbar
MobileTopbar
BottomNavigation
ResponsiveSidebar
SidebarGroup
SidebarItem

PageHeader
PageSubHeader
PageContainer
PageSection

AppBreadcrumb
AppFooter
StickyHeader
ScrollContainer
```

## III. Form System Components

> Chuẩn hóa toàn bộ CRUD, không để layout form tự chế trong page.

**Không thể thiếu:**

- **AppFormLayout**
- **FormField**
- **FormLabel**
- **FormError**
- **FormActions**
- **TextInput**
- **SelectInput**
- **DatePicker**
- **SwitchInput**

Danh sách đầy đủ:

```txt
AppFormLayout
FormSection
FormGroup
FormField
FormLabel
FormHint
FormError
FormErrorSummary
FormFooter
FormActions

TextInput
PasswordInput
NumberInput
CurrencyInput
PercentInput
PhoneInput
EmailInput
OtpInput

Textarea
CharacterCounterTextarea

SelectInput
AsyncSelect
MultiSelect
TagSelect

DatePicker
DateRangePicker
TimePicker
DateTimePicker

CheckboxGroup
RadioGroup
SwitchInput

FileUpload
ImageUpload
AvatarUpload
DragDropUpload

FormPreview
FormReadonlyView
```

## IV. Data Display Components

> Admin, dashboard, báo cáo, danh sách dữ liệu lớn.

**Không thể thiếu:**

- **AppTable**
- **TableHeader**
- **TableRow**
- **TableCell**
- **TablePagination**
- **TableSearch**

Danh sách đầy đủ:

```txt
AppTable
TableHeader
TableBody
TableRow
TableCell

TableActionMenu
TableFilterBar
TableSearch
TablePagination
TableColumnToggle
TableDensityToggle

BulkActionBar
BulkSelectCheckbox

DataCard
DataCardGrid
StatCard
MetricCard
TrendCard

KeyValueList
KeyValueItem

ListView
ListItem
CardListView
CardListItem

Timeline
TimelineItem
ActivityFeed

ChartContainer
LineChart
BarChart
PieChart
AreaChart

JsonViewer
CodeViewer
LogViewer
```

## V. Feedback & State Components

> Trạng thái UI, nâng chất lượng trải nghiệm người dùng.

**Không thể thiếu:**

- **LoadingState**
- **EmptyState**
- **ErrorState**

Danh sách đầy đủ:

```txt
LoadingState
LoadingOverlay
LoadingSpinner
Skeleton
SkeletonTable
SkeletonCard

EmptyState
EmptySearchResult
EmptyFilterResult

ErrorState
ErrorBoundaryFallback
ErrorInline
ErrorPage

NoPermission
MaintenanceState
OfflineState

SuccessState
InfoState
WarningState
```

## VI. Interaction & Control Components

> Chuẩn hóa hành vi người dùng và logic giao tiếp UI.

**Không thể thiếu:**

- **ConfirmDialog**
- **AppToast**
- **TooltipHint**

Danh sách đầy đủ:

```txt
ConfirmDialog
ConfirmDangerDialog
ConfirmLeavePage
ConfirmBulkAction

AppToast
ToastContainer

PermissionGuard
RoleGuard
FeatureFlag
ABTest

ShortcutHint
KeyboardShortcutProvider

CopyToClipboard
ExpandableText
ReadMore

TooltipHint
HelpPopover
InfoPopover
```

## VII. Business / Domain Components (Cao nhất)

> Component gắn chặt nghiệp vụ, thay đổi theo từng công ty/sản phẩm.  
> Không đưa vào UI core dùng chung.

```txt
UserAvatar
UserStatusBadge
UserRoleTag
UserCard

OrderStatusBadge
OrderTimeline
OrderSummaryCard

PaymentMethodBadge
PaymentStatusTag
InvoicePreview

AuditLogItem
AuditLogTimeline

NotificationItem
SystemAlertItem

ProductStatusBadge
InventoryLevelTag
PriceChangeIndicator

PermissionLabel
RoleMatrixView

BankTransactionItem
TransactionTypeBadge
```

## VIII. Hooks & Utilities (tách riêng, không để lẫn component)

> Hook và utility đặt theo chức năng, không để trong `src/components/`.

```txt
useConfirm
useLeaveGuard
notify
```

Gợi ý thư mục:

- Hooks: `src/hooks/`
- Utilities: `src/utils/` hoặc `src/lib/`

## Khuyến nghị cấu trúc thư mục

```txt
src/components/
  adaptive/
  layout/
  form/
  data/
  feedback/
  control/
  domain/
  ui/          # shadcn primitive (internal use only)

src/hooks/
src/utils/
```
