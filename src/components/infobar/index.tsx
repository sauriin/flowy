'use client'
import React, { useEffect } from 'react'
import { ModeToggle } from '../global/mode-toggle'
import { Book, Headphones, Search } from 'lucide-react'
import Templates from '../icons/cloud_download'
import { Input } from '@/components/ui/input'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
type Props = {}

const InfoBar = (props: Props) => {


    return (
        <div className="flex flex-row justify-end gap-6 items-center px-4 py-4 w-full bg-background border-b border-border">
            <span
                className="
    flex items-center gap-2
    px-4 py-2
    rounded-full
    bg-neutral-300 dark:bg-neutral-800
    transition
    focus-within:bg-neutral-300 dark:focus-within:bg-neutral-800
  "
            >
                <Search className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />

                <Input
                    placeholder="Quick Search"
                    className="
      bg-transparent
      border-none
      p-0
      h-auto
      text-sm
      text-neutral-800 dark:text-neutral-200
      placeholder:text-neutral-600 dark:placeholder:text-neutral-400
      focus:outline-none
      focus-visible:outline-none
      focus-visible:ring-0
      focus-visible:ring-offset-0
    "
                />
            </span>


            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                        <Headphones />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Contact Support</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                        <Book />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Guide</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default InfoBar