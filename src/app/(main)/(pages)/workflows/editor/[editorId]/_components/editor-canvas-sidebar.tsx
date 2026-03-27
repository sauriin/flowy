'use client'
import { EditorCanvasTypes, EditorNodeType } from '@/lib/types'
import { useEditor } from '@/providers/editor-provider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CONNECTIONS, EditorCanvasDefaultCardTypes } from '@/lib/constant'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { useNodeConnections } from '@/providers/connection-provider'
import { fetchBotSlackChannels, onConnections, onDragStart } from '@/lib/editor-utils'
import EditorCanvasIconHelper from './editor-canvas-card-icon-helper'
import RenderConnectionAccordion from './render-connection-accordion'
import OutputRenderAccordian from './output-render-accordian'
import { useFlowyStore } from '@/store'
import { useEffect } from 'react'

type Props = {
    nodes: EditorNodeType[]
}

const EditorCanvasSidebar = ({ nodes }: Props) => {

    const { state } = useEditor()
    const { nodeConnection } = useNodeConnections()
    const { googleFile, setSlackChannels } = useFlowyStore()

    useEffect(() => {
        if (state) {
            onConnections(nodeConnection, state, googleFile)
        }
    }, [state])

    useEffect(() => {
        if (nodeConnection.slackNode.slackAccessToken) {
            fetchBotSlackChannels(
                nodeConnection.slackNode.slackAccessToken,
                setSlackChannels
            )
        }
    }, [nodeConnection])

    return (
        <aside className='h-full flex flex-col overflow-hidden'>
            <Tabs
                defaultValue="actions"
                className="flex h-full flex-col overflow-hidden"
            >
                <TabsList className="w-full bg-transparent p-0 h-12">
                    <TabsTrigger
                        value="actions"
                        className="
                            flex-1
                            rounded-none
                            border-b-2
                            border-transparent
                            text-gray-500
                            data-[state=active]:text-white"
                    >
                        Actions
                    </TabsTrigger>

                    <TabsTrigger
                        value="settings"
                        className="
                            flex-1
                            rounded-none
                            border-b-2
                            border-transparent
                            text-gray-500
                            data-[state=active]:text-white"
                    >
                        Settings
                    </TabsTrigger>
                </TabsList>

                <div className="h-px w-full bg-gray-700" />

                {/* ✅ SCROLL CONTAINER (IMPORTANT) */}
                <div className="flex-1 overflow-hidden">

                    {/* ACTIONS TAB */}
                    <TabsContent
                        value="actions"
                        className="h-full overflow-y-auto flex flex-col gap-3 p-3 data-[state=inactive]:hidden"
                    >
                        {Object.entries(EditorCanvasDefaultCardTypes)
                            .filter(
                                ([_, cardType]) =>
                                    (!nodes.length && cardType.type === 'Trigger') ||
                                    (nodes.length && cardType.type === 'Action')
                            )
                            .map(([cardKey, cardValue]) => (
                                <Card
                                    key={cardKey}
                                    draggable
                                    className="cursor-grab w-full border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                                    onDragStart={(event) =>
                                        onDragStart(event, cardKey as EditorCanvasTypes)
                                    }
                                >
                                    <CardHeader className="flex flex-row items-center gap-4 p-3">
                                        <EditorCanvasIconHelper
                                            type={cardKey as EditorCanvasTypes}
                                        />

                                        <div>
                                            <CardTitle className="text-sm leading-tight">
                                                {cardKey}
                                            </CardTitle>

                                            <CardDescription className="text-xs leading-tight">
                                                {cardValue.description}
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                </Card>
                            ))}
                    </TabsContent>

                    {/* SETTINGS TAB */}
                    <TabsContent
                        value="settings"
                        className="h-full overflow-y-auto flex flex-col gap-4 p-3 data-[state=inactive]:hidden"
                    >
                        <div className="px-2 py-4 text-center text-xl font-bold">
                            {state.editor.selectedNode.data.title}
                        </div>

                        <Accordion type="multiple">
                            <AccordionItem
                                value="Options"
                                className="border-y px-2"
                            >
                                <AccordionTrigger className="no-underline!">
                                    Account
                                </AccordionTrigger>
                                <AccordionContent>
                                    {CONNECTIONS.map((connection) => (
                                        <RenderConnectionAccordion
                                            key={connection.title}
                                            state={state}
                                            connection={connection}
                                        />
                                    ))}
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem
                                value="Expected Output"
                                className="px-1"
                            >
                                <AccordionTrigger className="no-underline!">
                                    Action
                                </AccordionTrigger>

                                <OutputRenderAccordian
                                    state={state}
                                    nodeConnection={nodeConnection}
                                />
                            </AccordionItem>
                        </Accordion>
                    </TabsContent>

                </div> {/* ✅ END SCROLL CONTAINER */}
            </Tabs>
        </aside>
    )
}

export default EditorCanvasSidebar