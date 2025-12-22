# Hệ màu (Sáng/Tối)

File liên quan:
- `src/app/globals.css`: khai báo token màu và map vào Tailwind qua `@theme inline`.
- `src/app/layout.tsx`: bọc theme provider, tự động gán class `dark` trên `html`.

## Mục tiêu
- Tất cả UI dùng token màu thay vì hard-code.
- Sáng/tối tự động chuyển qua class `dark`.
- Đổi màu chỉ cần sửa 1 nơi trong `globals.css`.

## Token chính (dùng hằng ngày)
- Nền/chữ: `bg-background`, `text-foreground`
- Bề mặt: `bg-surface`, `text-surface-foreground`, `bg-surface-muted`, `text-surface-muted-foreground`
- Lớp nổi: `bg-elevated`, `text-elevated-foreground`, `bg-card`, `text-card-foreground`, `bg-popover`, `text-popover-foreground`
- Primary/Secondary: `bg-primary`, `text-primary-foreground`, `bg-secondary`, `text-secondary-foreground`
- Muted/Accent: `bg-muted`, `text-muted-foreground`, `bg-accent`, `text-accent-foreground`
- Trạng thái: `bg-success`, `text-success-foreground`, `bg-warning`, `text-warning-foreground`, `bg-info`, `text-info-foreground`
- Destructive: `bg-destructive`, `text-destructive-foreground`
- Link/Brand: `text-link`, `hover:text-link-hover`, `bg-brand`, `text-brand-foreground`
- Viền/Input/Focus: `border-border`, `border-border-strong`, `bg-input`, `ring-ring`, `ring-ring-strong`
- Overlay: `bg-overlay`

## Token mở rộng
- Sidebar: `bg-sidebar`, `text-sidebar-foreground`, `bg-sidebar-primary`, `text-sidebar-primary-foreground`, `bg-sidebar-accent`, `text-sidebar-accent-foreground`, `border-sidebar-border`, `ring-sidebar-ring`
- Chart: `bg-chart-1` ... `bg-chart-5`

## Palette dùng cho tương lai
- Neutral scale (tĩnh): `text-neutral-50` ... `text-neutral-950`, `bg-neutral-50` ... `bg-neutral-950`
- Brand scale (tĩnh): `bg-brand-muted`, `text-brand-muted-foreground`, `bg-brand-subtle`, `text-brand-subtle-foreground`

## Màu nền + chữ mặc định
Đã set trong `globals.css`:
```css
body { @apply bg-background text-foreground font-sans; }
```
Nên UI mới chỉ cần dùng `text-foreground` và `bg-background` là đủ.

## Ví dụ sử dụng
```tsx
<div className="bg-elevated text-elevated-foreground border border-border rounded-md p-4">
  <h2 className="text-foreground font-semibold">Cài đặt</h2>
  <p className="text-muted-foreground text-sm">Cập nhật thông tin.</p>
  <button className="mt-3 inline-flex items-center rounded-md bg-primary text-primary-foreground px-3 py-2">
    Lưu
  </button>
</div>
```

```tsx
<a className="text-link hover:text-link-hover" href="/docs">
  Tài liệu
</a>
```

```tsx
<span className="inline-flex items-center rounded-full bg-success text-success-foreground px-2 py-1 text-xs">
  Hoạt động
</span>
```

## Sáng/Tối hoạt động thế nào
- Sáng: token nằm trong `:root`.
- Tối: token override trong `.dark`.
- `next-themes` gán class `dark` trên `html` khi user chọn tối.
- Token semantic (background/primary/...) tự đổi theo theme; palette (neutral/brand) là màu tĩnh nếu không override.

## Quy tắc maintain
- Không dùng màu hard-code trong component.
- Nếu cần màu mới: thêm token mới vào `:root` và `.dark`, sau đó map vào `@theme inline`.
- Nếu cần palette mới: đặt tên có tiền tố rõ ràng (ví dụ `neutral-*`, `brand-*`).
