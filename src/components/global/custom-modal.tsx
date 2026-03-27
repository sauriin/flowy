import { useModal } from '@/providers/modal-provider'
import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '../ui/drawer'
import { Button } from '../ui/button'

type Props = {
    title: string
    subtitle: string
    children: React.ReactNode
    defaultOpen?: boolean
}

const CustomModal = ({ children, title, subtitle }: Props) => {
    const { isOpen, setClose } = useModal()
    const handleClose = () => setClose()

    return (
        <Drawer open={isOpen} onOpenChange={handleClose}>
            <DrawerContent className="px-6 pb-6">

                {/* Header */}
                <DrawerHeader>
                    <DrawerTitle className="text-center text-xl">
                        {title}
                    </DrawerTitle>
                    <DrawerDescription className="text-center">
                        {subtitle}
                    </DrawerDescription>
                </DrawerHeader>

                <div className="w-full max-w-4xl mx-auto">
                    {children}
                </div>

                {/* Footer */}
                <DrawerFooter className="flex flex-col gap-4 bg-background border-t border-t-muted">
                    <DrawerClose asChild>
                        <Button variant="ghost" className="w-full" onClick={handleClose}>
                            Close
                        </Button>
                    </DrawerClose>
                </DrawerFooter>

            </DrawerContent>
        </Drawer>
    )
}

export default CustomModal