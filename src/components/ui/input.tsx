"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const isPassword = type === "password"
  const [showPassword, setShowPassword] = React.useState(false)

  const inputClassName = cn(
    "flex w-full min-w-0 rounded-lg border border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-800 h-12 px-4 py-1.5 text-base text-slate-900 dark:text-white placeholder:text-slate-400 shadow-xs transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    isPassword && "pr-10",
    className
  )

  if (!isPassword) {
    return (
      <input
        type={type}
        data-slot="input"
        className={inputClassName}
        {...props}
      />
    )
  }

  const wrapperClassName = cn(
    "relative min-w-0",
    className?.includes("flex-1") ? "flex-1" : "w-full"
  )

  return (
    <div className={wrapperClassName}>
      <input
        type={showPassword ? "text" : "password"}
        data-slot="input"
        className={inputClassName}
        {...props}
      />
      <button
        type="button"
        aria-label={showPassword ? "Hide password" : "Show password"}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={props.disabled}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  )
}

export { Input }
