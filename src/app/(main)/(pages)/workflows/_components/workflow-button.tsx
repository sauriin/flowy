'use client'

import Workflowform from "@/components/forms/workflow-form"
import CustomModal from "@/components/global/custom-modal"
import { Button } from "@/components/ui/button"
import { useBilling } from "@/providers/billing-provider"
import { useModal } from "@/providers/modal-provider"
import { Plus, Workflow } from "lucide-react"

type Props = {}

const WorkflowButton = (props: Props) => {
    const { setOpen, setClose } = useModal()
    const { credits } = useBilling()
    const handleClick = () => {
        setOpen(
            <CustomModal
                title="Create Workflow"
                subtitle="Create a new workflow to automate your tasks."
            >
                <Workflowform />
            </CustomModal>
        )

    }
    return (
        <Button
            className="bg-white cursor-pointer"
            size={'icon'}
            {...(credits !== '0'
                ? {
                    onClick: handleClick
                }
                : {
                    disabled: true
                })}
        >
            <Plus className="text-black size-6 " />
        </Button>
    )
}

export default WorkflowButton