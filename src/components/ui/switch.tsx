"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, checked, defaultChecked, ...props }, ref) => {
  const [isOn, setIsOn] = React.useState(defaultChecked ?? false)

  return (
    <SwitchPrimitive.Root
      ref={ref}
      checked={checked ?? isOn}
      onCheckedChange={(val) => {
        setIsOn(val)
        props.onCheckedChange?.(val)
      }}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer p-0.5",
        isOn ? "bg-[#E5E5E5]" : "bg-[#282828] ",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "block h-5 w-5 rounded-full shadow transition-transform",
          isOn
            ? "bg-[#171717] translate-x-5"
            : "bg-white translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
})

Switch.displayName = "Switch"

export { Switch }