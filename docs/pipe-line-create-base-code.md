# BASE CODE – NEXT.JS CLIENT

> Frontend-only base code for company projects  
> Clone → config → code feature  
> No backend included

---

## Phase 0 – Principles

- [X] Client-only (no backend logic)
- [X] Token-based auth (header only)
- [X] Feature-based architecture

---

## Phase 1 – Foundation

### Project setup
- [X] Init Next.js (App Router): 15.4.7
- [X] Node >= 20
- [X] npm
- [X] TypeScript `strict`
- [X] Absolute import (`@/`)
- [ ] Base README.md

### Folder structure
- [X] `src/app`: 'all next routes'
- [X] `src/components/ui`: shadcn components / minimize component: button, sidebar, ...
- [X] `src/components/layout`: all next layout
- [X] `src/components/shared`: all next shared component: form, lists, ...
- [X] `src/modules`: mapping with backend database model
- [X] `src/services`: all service (api call)
- [X] `src/stores`: state managements (zustand)
- [X] `src/hooks`: all hooks
- [X] `src/lib`: lib usage in project
- [X] `src/types`: define types (TS) for project
- [X] `src/utils`: utilities use in projects

---

## Phase 2 – Routing & Layout

- [X] Route groups
  - [X] `(public)`: all request
  - [X] `(auth)`: auth request
  - [X] `(dashboard)`: auth with permission request
- [ ] Global `layout.tsx`
- [ ] Error page
- [ ] Not found page
- [ ] Loading page

---

## Phase 3 – Environment & Config

### Environment
- [ ] `.env.example`
- [ ] `.env.local`
- [ ] `.env.production`
- [ ] `NEXT_PUBLIC_API_BASE_URL`
- [ ] `NEXT_PUBLIC_ENV`
- [ ] `NEXT_PUBLIC_APP_NAME`

### Validation
- [ ] Zod env schema
- [ ] Typed env export
- [ ] Fail build if env missing

---

## Phase 4 – API Client Layer

### HTTP client
- [ ] Axios / Fetch wrapper
- [ ] Base URL from env
- [ ] Default JSON headers
- [ ] Timeout config

### Interceptor & error
- [ ] Inject access token
- [ ] Handle `401 → logout`
- [ ] `ApiError` class
- [ ] Central error handler
- [ ] Toast error display

### Service convention
- [ ] `auth.service.ts`
- [ ] `user.service.ts`
- [ ] `product.service.ts`
- [ ] No UI logic in service layer

---

## Phase 5 – State Management

### Auth store (Zustand)
- [ ] `accessToken`
- [ ] `refreshToken`
- [ ] `isAuthenticated`
- [ ] `login()`
- [ ] `logout()`
- [ ] Persist storage

### UI store
- [ ] Theme (dark / light)
- [ ] Sidebar state
- [ ] Global loading

---

## Phase 6 – Auth (Client Side)

- [ ] Store token securely
- [ ] Attach token to request headers
- [ ] Clear token on logout
- [ ] Redirect unauthenticated users

### Guard hooks
- [ ] `useAuthGuard`
- [ ] `useGuestGuard`
- [ ] Guard loading state

---

## Phase 7 – UI System

### Design system
- [ ] Tailwind design tokens
- [ ] Typography scale
- [ ] Icon system
- [ ] Dark / Light mode
- [ ] Persist theme

### Layout
- [ ] AppShell
- [ ] Sidebar
- [ ] Header
- [ ] Breadcrumb
- [ ] Footer (optional)

---

## Phase 8 – Form System

### BaseForm
- [ ] React Hook Form
- [ ] Zod validation
- [ ] Inline error message
- [ ] Loading state
- [ ] `Ctrl / Cmd + Enter` submit
- [ ] Toast success / error

### Common inputs
- [ ] TextInput
- [ ] Select
- [ ] Checkbox
- [ ] Switch
- [ ] DatePicker
- [ ] File upload

---

## Phase 9 – Table & Data Display

### BaseTable
- [ ] Pagination
- [ ] Sorting
- [ ] Search
- [ ] Filter
- [ ] Empty state
- [ ] Skeleton loading

### Data fetching
- [ ] Loading state
- [ ] Error state
- [ ] Retry action
- [ ] Refetch support

---

## Phase 10 – UX States

- [ ] Global loading
- [ ] Empty state
- [ ] Error state
- [ ] Forbidden state
- [ ] Not found state

---

## Phase 11 – Performance

- [ ] Dynamic import
- [ ] Memoization (`useMemo`, `useCallback`)
- [ ] Image optimization
- [ ] Avoid unnecessary re-renders

---

## Phase 12 – DX & Team Scale

### Tooling
- [ ] ESLint (strict)
- [ ] Prettier
- [ ] Husky
- [ ] lint-staged
- [ ] Commitlint

### Code conventions
- [ ] File naming rules
- [ ] Component structure rules
- [ ] Hook naming rules
- [ ] Module boundaries

---

## Phase 13 – Documentation

- [ ] README overview
- [ ] Local setup guide
- [ ] Environment guide
- [ ] Folder conventions
- [ ] How to add a new module
- [ ] API integration guide

---

## Phase 14 – Optional Enhancements

- [ ] Module generator (plop)
- [ ] BaseModal
- [ ] BaseConfirmDialog
- [ ] Feature flags (client-side)
- [ ] Skeleton system

---

## Definition of Done

- [ ] Clone repo → run successfully
- [ ] Change API URL → app works
- [ ] New developer onboard < 1 hour
- [ ] Reusable for multiple projects
- [ ] Structure remains stable when scaling
