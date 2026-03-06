'use client'
import { Button } from '@/components/ui/button'
import { useNodeConnections } from '@/providers/connection-provider'
import { usePathname } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { onCreateNodesEdges, onFlowPublish } from '../_actions/workflow-connections'

type Props = {
    children?: React.ReactNode
    edges: any[]
    nodes: any[]
}

const FlowInstance = ({ children, edges, nodes }: Props) => {
    const pathname = usePathname()
    const [isFlow, setIsFlow] = useState([])
    const { nodeConnection } = useNodeConnections()

    const onFlowAutomation = () => useCallback(async () => {
        const flow = await onCreateNodesEdges(
            pathname.split('/').pop()!,
            JSON.stringify(nodes),
            JSON.stringify(edges),
            JSON.stringify(isFlow),
        )
        if (flow) toast.message('Flow automation created successfully')
    }, [nodeConnection])

    const onPublishWorkflow = () => useCallback(async () => {
        const response = await onFlowPublish(pathname.split('/').pop()!, true)
        if (response) toast.message(response)
    }, [])
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-3 p-4'>
                <Button
                    onClick={onFlowAutomation}
                    disabled={isFlow.length < 1}
                    className="
                    bg-neutral-800
                    text-white
                    hover:bg-neutral-700
                    disabled:bg-neutral-800/40
                    disabled:text-white/50
                    disabled:cursor-not-allowed
                "
                >
                    Save
                </Button>

                <Button
                    onClick={onPublishWorkflow}
                    disabled={isFlow.length < 1}
                    className="
                    bg-blue-600
                    text-white
                    hover:bg-blue-500
                    disabled:bg-blue-600/40
                    disabled:text-white/50
                    disabled:cursor-not-allowed
                "
                >
                    Publish
                </Button>

            </div>
            {children}
        </div>
    )
}


export default FlowInstance