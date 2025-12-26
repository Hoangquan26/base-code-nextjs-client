"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const isPassword = type === "password"
  const [showPassword, setShowPassword] = React.useState(false)

  const inputClassName = cn(
    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1.5 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
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
