import { EditorCanvasCardType } from '@/lib/types'
import { useEditor } from '@/providers/editor-provider'
import React, { useMemo } from 'react'
import { Position, useNodeId } from 'reactflow'
import EditorCanvasIconHelper from './editor-canvas-card-icon-helper'
import CustomHandle from './custom-handle'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import clsx from 'clsx'

type Props = {}

const EditorCanvasCardSingle = ({ data }: { data: EditorCanvasCardType }) => {
    const { dispatch, state } = useEditor()
    const nodeId = useNodeId()
    const logo = useMemo(() => {
        return <EditorCanvasIconHelper type={data.type} />
    }, [data])
    return (
        <>
            {data.type !== 'Trigger' && data.type !== 'Google Drive' && (
                <CustomHandle type='target' position={Position.Top} style={{ zIndex: 100 }} />
            )}
            <Card onClick={(e) => {
                e.stopPropagation()
                const val = state.editor.elements.find((n) => n.id === nodeId)
                if (val)
                    dispatch({
                        type: 'SELECTED_ELEMENT',
                        payload: {
                            elements: val
                        }
                    })
            }}
                className='relative max-w-120 dark:border-muted-foreground/70 '
            >
                <CardHeader className='flex flex-row items-center gap-4'>
                    <div>{logo}</div>
                    <div>
                        <CardTitle className='text-md'>{data.title}</CardTitle>
                        <CardDescription>
                            <p className='text-xs text-muted-foreground/50'>
                                <b className='text-muted-foreground/70'>ID:</b>
                                {nodeId}
                            </p>
                            <p>{data.description}</p>
                        </CardDescription>
                    </div>
                </CardHeader>
                <Badge className='absolute right-2 top-2' variant='secondary'>
                    {data.type}
                </Badge>
                <div className={clsx('absolute top-4 left-3 w-2 h-2 rounded-full', {
                    'bg-green-500': Math.random() > 0.6,
                    'bg-orange-500': Math.random() <= 0.6 && Math.random() > 0.8,
                    'bg-red-500': Math.random() >= 0.6,
                })}></div>
            </Card>
            <CustomHandle
                type="source"
                position={Position.Bottom}
                id="a"
            />
        </>
    )
}

export default EditorCanvasCardSingle