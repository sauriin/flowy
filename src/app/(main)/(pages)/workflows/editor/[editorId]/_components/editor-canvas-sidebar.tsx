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
import { onDragStart } from '@/lib/editor-utils'
import EditorCanvasIconHelper from './editor-canvas-card-icon-helper'
import RenderConnectionAccordion from './render-connection-accordion'
import OutputRenderAccordian from './output-render-accordian'

type Props = {
    nodes: EditorNodeType[]
}

const EditorCanvasSidebar = ({ nodes }: Props) => {

    //WIP:COnnect DB Stuff
    const { state } = useEditor()
    const { nodeConnection } = useNodeConnections()
    return (
        <aside className='h-full'>
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
      data-[state=active]:text-white
    "
                    >
                        Settings
                    </TabsTrigger>

                </TabsList>

                <div className="h-px w-95 justify-center bg-gray-700" />
                <TabsContent
                    value="actions"
                    className="flex flex-col gap-4 p-4"
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
                                className="w- cursor-grab w-85 border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                                onDragStart={(event) =>
                                    onDragStart(event, cardKey as EditorCanvasTypes)
                                }
                            >
                                <CardHeader className="flex flex-row gap-4 p-4">
                                    <EditorCanvasIconHelper type={cardKey as EditorCanvasTypes} />
                                    <CardTitle className="text-md">
                                        {cardKey}
                                        <CardDescription>{cardValue.description}</CardDescription>
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                        ))}
                </TabsContent>
                <TabsContent
                    value="settings"
                    className="flex-1 overflow-y-auto p-4"
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
                            className="px-2"
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
            </Tabs>
        </aside>
    )
}

export default EditorCanvasSidebar