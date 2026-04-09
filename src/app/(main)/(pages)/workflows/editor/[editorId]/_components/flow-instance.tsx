'use client'
import { Button } from '@/components/ui/button'
import { useNodeConnections } from '@/providers/connection-provider'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { onCreateNodesEdges, onFlowPublish } from '../_actions/workflow-connections'

type Props = {
    children?: React.ReactNode
    edges: any[]
    nodes: any[]
}

const FlowInstance = ({ children, edges, nodes }: Props) => {
    const pathname = usePathname()
    const [isFlow, setIsFlow] = useState<any[]>([])
    const { nodeConnection } = useNodeConnections()

    // ✅ FIXED: Direct async function
    const onFlowAutomation = async () => {
        try {
            const flow = await onCreateNodesEdges(
                pathname.split('/').pop()!,
                JSON.stringify(nodes),
                JSON.stringify(edges),
                JSON.stringify(isFlow),
            )

            if (flow) {
                toast.success('Flow automation created successfully ✅')
            }
        } catch (err) {
            console.error(err)
            toast.error('Failed to save flow ❌')
        }
    }

    // ✅ FIXED: Direct async function
    const onPublishWorkflow = async () => {
        try {
            const response = await onFlowPublish(
                pathname.split('/').pop()!,
                true
            )

            if (response) {
                toast.success(response)
            }
        } catch (err) {
            console.error(err)
            toast.error('Failed to publish ❌')
        }
    }

    // ✅ FIXED: Proper flow detection
    const onAutomateWorkflow = () => {
        const flows: any[] = []

        const connectedEdges = edges.map((edge) => edge.target)

        connectedEdges.forEach((target) => {
            nodes.forEach((node) => {
                if (node.id === target) {
                    flows.push(node.type)
                }
            })
        })

        setIsFlow(flows)
    }

    // ✅ FIXED: Actually call function
    useEffect(() => {
        onAutomateWorkflow()
    }, [edges, nodes])

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-3 p-4'>

                {/* SAVE BUTTON */}
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

                {/* PUBLISH BUTTON */}
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