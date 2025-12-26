# Auth Protected + Route Config (Tiếng Việt)

Tài liệu này mô tả cách bảo vệ route (client-only) và cách dùng `routeConfig`
để điều khiển sidebar + phân quyền theo role.

## 1) Bảo vệ route (client-only)

Base code sử dụng các guard phía client:

- `AuthGuard`: chặn user chưa đăng nhập.
- `GuestGuard`: chặn user đã đăng nhập khỏi trang guest (login/register).
- `RoleGuard`: ẩn UI theo role.
- `useAuthGuard` / `useGuestGuard`: hook cho các flow tuỳ biến.

Lưu ý: guard phía client KHÔNG bảo mật API. Backend vẫn phải kiểm tra token
và role ở mọi request.

### 1.1 Bảo vệ route group (dashboard)

`src/app/(dashboard)/layout.tsx` đã bọc toàn bộ dashboard:

```tsx
import AuthGuard from "@/components/control/auth-guard"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>
}
```

### 1.2 Bảo vệ trang guest (auth)

`src/app/(auth)/layout.tsx` được bọc bởi `GuestGuard`, nên nếu user đã đăng nhập
sẽ bị redirect.

### 1.3 Bảo vệ một page cụ thể

```tsx
import AuthGuard from "@/components/control/auth-guard"

export default function Page() {
  return (
    <AuthGuard roles={["ADMIN"]} redirectUnauthorizedTo="/not-found">
      <div>Trang chỉ dành cho Admin</div>
    </AuthGuard>
  )
}
```

### 1.4 Ẩn component theo role

```tsx
import RoleGuard from "@/components/control/role-guard"

<RoleGuard roles={["ADMIN", "MANAGER"]} requireAll={false}>
  <button>Hành động hạn chế</button>
</RoleGuard>
```

Hoặc dùng hook:

```tsx
import { useHasAnyRole } from "@/stores/auth/auth.selector"

const canEdit = useHasAnyRole(["ADMIN", "MANAGER"])
```

### 1.5 Yêu cầu dữ liệu

Auth store cần:

- `accessToken`, `refreshToken`, `tokenType`
- `user.roles` là mảng string (ví dụ: `["ADMIN", "MANAGER"]`)

Hãy đảm bảo API trả về roles đúng format này.

## 2) routeConfig

`routeConfig` là nguồn dữ liệu chung cho:

- Sidebar menu
- Quy tắc truy cập theo auth + role
- Group, order, badge, visibility

File: `src/config/route-config.ts`

### 2.1 Các field của RouteConfigItem

```ts
export type RouteConfigItem = {
  id: string
  label: string
  href?: string
  access?: "public" | "guest" | "auth"
  roles?: string[]
  requireAllRoles?: boolean
  group?: string
  order?: number
  hidden?: boolean
  showInSidebar?: boolean
  badge?: string
  disabled?: boolean
  icon?: ComponentType<{ className?: string }>
  children?: RouteConfigItem[]
}
```

Ghi chú:
- `access` quyết định quyền truy cập (guest/auth).
- `roles` giới hạn theo role.
- `hidden` ẩn khỏi navigation (nhưng route vẫn dùng được).
- `showInSidebar: false` chỉ ẩn khỏi sidebar.
- `children` dùng cho route lồng.

### 2.2 Kết nối sidebar

Có thể tự kết nối `routeConfig` với `AdaptiveSidebar` (tuỳ chọn).

```tsx
import { routeConfig, buildSidebarSections } from "@/config/route-config"
import { useAuthRoles, useIsAuthenticated } from "@/stores/auth/auth.selector"

const isAuthenticated = useIsAuthenticated()
const roles = useAuthRoles()
const sections = buildSidebarSections(routeConfig, { isAuthenticated, roles })
```

### 2.3 Lọc thủ công

```ts
import { canAccessRoute, filterRouteConfig } from "@/config/route-config"

const visibleRoutes = filterRouteConfig(routeConfig, {
  isAuthenticated,
  roles,
})

const canOpen = canAccessRoute(routeConfigItem, {
  isAuthenticated,
  roles,
})
```

## 3) Best practices

- Dồn tất cả route vào `routeConfig` và render sidebar từ đó (nếu team cần).
- Bảo mật thật sự luôn nằm ở backend.
- Không dùng SSR guard khi token nằm trong localStorage.
- Nếu muốn SSR guard, chuyển token sang cookie và dùng middleware.