import { useModal } from '@/providers/modal-provider'
import React, { use } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '../ui/drawer'
import { Button } from '../ui/button'
import { Ghost } from 'lucide-react'

type Props = {
    title: string
    subtitle: string
    children: React.ReactNode
    defaultOpen?: boolean
}

const CustomModal = ({ children, title, subtitle, defaultOpen }: Props) => {
    const { isOpen, setClose } = useModal()
    const handleClose = () => setClose()
    return (
        <Drawer open={isOpen} onClose={handleClose}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className='text-center'>{title}</DrawerTitle>
                    <DrawerDescription className='text-center flex flex-col items-center gap-4 h-96 overflow-scroll'>
                        {subtitle}
                        {children}
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className='flex flex-col gap-4 bg-background border-t border-t-muted'>
                    <DrawerClose>
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