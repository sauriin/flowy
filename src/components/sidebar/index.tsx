"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { menuOptions } from "@/lib/constant"
import { Database, GitBranch, LucideMousePointerClick } from "lucide-react"
import { ModeToggle } from "../global/mode-toggle"

type Props = {}

const flowIcons = [
    LucideMousePointerClick,
    GitBranch,
    Database,
    GitBranch,
    LucideMousePointerClick,
]

const MenuOptions = (props: Props) => {
    const pathName = usePathname()

    return (
        <nav className="h-screen flex flex-col justify-between px-2 py-6 bg-background">
            <div className="flex flex-col items-center gap-6">
                <Link href="/" className="font-bold text-lg text-foreground">
                    Flowy
                </Link>

                <TooltipProvider>
                    <div className="flex flex-col gap-4">
                        {menuOptions.map((menuItem) => (
                            <Tooltip key={menuItem.name} delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={menuItem.href}
                                        className={clsx(
                                            "h-9 w-9 flex items-center justify-center rounded-lg transition",
                                            pathName === menuItem.href
                                                ? "bg-[#6D28D9] text-white shadow-[0_0_20px_rgba(109,40,217,0.6)]"
                                                : "hover:bg-muted text-muted-foreground"

                                        )}
                                    >
                                        <menuItem.Component selected={pathName === menuItem.href} />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent className="bg-popover text-popover-foreground">
                                    {menuItem.name}
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                </TooltipProvider>

                <Separator />

                {/* scrolling flow */}
                <div className="flex flex-col items-center gap-8 py-4 px-2 rounded-full bg-muted border border-border h-30 overflow-y-auto">
                    {flowIcons.map((Icon, index) => (
                        <div key={index} className="relative flex items-center justify-center">
                            <div className="p-2 rounded-full bg-background border border-border">
                                <Icon size={14} className="text-foreground" />
                            </div>

                            {index !== flowIcons.length - 1 && (
                                <span className="absolute top-full h-6 border-l border-muted-foreground/50" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center">
                <ModeToggle />
            </div>
        </nav>
    )
}

export default MenuOptions
