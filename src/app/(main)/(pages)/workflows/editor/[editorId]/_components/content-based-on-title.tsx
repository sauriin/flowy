'use client'
import { AccordionContent } from '@/components/ui/accordion'
import { EditorState } from '@/providers/editor-provider'
import { ConnectionTypes, nodeMapper } from '@/lib/types'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { ConnectionProviderProps } from '@/providers/connection-provider'
import { onContentChange } from '@/lib/editor-utils'
import GoogleFileDetails from './google-file-details'
import GoogleDriveFile from './google-drive-files'
import ActionButton from './action-button'
import axios from 'axios'

export interface Option {
    value: string
    label: string
    disable?: boolean
    fixed?: boolean
    [key: string]: string | boolean | undefined
}

// ✅ GLOBAL CACHE
let driveCache: any[] = []

type Props = {
    nodeConnection: ConnectionProviderProps
    newState: EditorState
    file: any
    setFile: (file: any) => void
    selectedSlackChannels: Option[]
    setSelectedSlackChannels: (value: Option[]) => void
}

const ContentBasedOnTitle = ({
    nodeConnection,
    newState,
    file,
    setFile,
    selectedSlackChannels,
    setSelectedSlackChannels,
}: Props) => {
    const { selectedNode } = newState.editor
    const title = selectedNode.data.title as ConnectionTypes

    const [files, setFiles] = useState<any[]>(driveCache)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')

    // ✅ FETCH FILES (ONLY ONCE)
    useEffect(() => {
        if (title !== 'Google Drive') return
        if (driveCache.length > 0) return

        const fetchFiles = async () => {
            try {
                setLoading(true)
                const res = await axios.get('/api/drive')

                const fetched = res.data?.message?.files || []
                driveCache = fetched
                setFiles(fetched)
            } catch (err) {
                console.error(err)
                toast.error('Failed to fetch files')
            } finally {
                setLoading(false)
            }
        }

        fetchFiles()
    }, [title])

    // ✅ LOAD SELECTED FILE (PERSISTENCE)
    useEffect(() => {
        if (title !== 'Google Drive') return

        const key = nodeMapper[title]
        const saved = (nodeConnection as any)[key]?.selectedFile

        if (saved) {
            setFile(saved)
        }
    }, [title])

    // ✅ SAFE ACCESS
    const key = nodeMapper[title]
    const nodeConnectionType = (nodeConnection as any)[key] || {}

    const isConnected =
        title === 'Google Drive'
            ? !nodeConnection.isLoading
            : title === 'Slack'
            ? !!nodeConnection.slackNode?.slackAccessToken
            : title === 'Discord'
            ? !!nodeConnection.discordNode?.webhookURL
            : title === 'Notion'
            ? !!nodeConnection.notionNode?.accessToken
            : false

    if (!isConnected) return <p>Not connected</p>

    // 🔍 FILTER
    const filteredFiles = files.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <AccordionContent>
            <Card>
                {title === 'Discord' && (
                    <CardHeader>
                        <CardTitle>{nodeConnectionType.webhookName}</CardTitle>
                        <CardDescription>{nodeConnectionType.guildName}</CardDescription>
                    </CardHeader>
                )}

                <div className="flex flex-col gap-3 px-6 py-3 pb-1">
                    {title !== 'Google Drive' && (
                        <>
                            <p>
                                {title === 'Notion'
                                    ? 'Values to be stored'
                                    : 'Message'}
                            </p>

                            <Input
                                type="text"
                                placeholder="Enter your message..."
                                value={nodeConnectionType.content ?? ''}
                                onChange={(event) =>
                                    onContentChange(nodeConnection, title, event)
                                }
                            />
                        </>
                    )}
                    {title === 'Google Drive' && (
                        <div className="flex flex-col gap-3">

                            {/* ✅ LISTENER BACK */}
                            <GoogleDriveFile />

                            {/* 🔍 SEARCH */}
                            <Input
                                placeholder="Search files..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            {/* 🔄 LOADING */}
                            {loading && (
                                <div className="h-20 bg-zinc-800 animate-pulse rounded-md" />
                            )}

                            {/* 📂 FILE LIST */}
                            {!loading && (
                                <div className="max-h-60 overflow-y-auto border border-zinc-700 rounded-md">
                                    {filteredFiles.map((f) => {
                                        const isSelected = file?.id === f.id

                                        return (
                                            <div
                                                key={f.id}
                                                className={`p-2 cursor-pointer flex gap-2 items-center rounded-md transition
                                                ${
                                                    isSelected
                                                        ? 'bg-blue-600/20 border border-blue-500'
                                                        : 'hover:bg-zinc-800'
                                                }`}
                                                onClick={() => {
                                                    setFile(f)

                                                    // ✅ SAVE SELECTION
                                                    ;(nodeConnection as any)[key].selectedFile = f

                                                    toast.success(`Selected: ${f.name}`)
                                                }}
                                            >
                                                <span>
                                                    {f.mimeType ===
                                                    'application/vnd.google-apps.folder'
                                                        ? '📁'
                                                        : '📄'}
                                                </span>

                                                <span className="truncate">
                                                    {f.name}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ✅ SHOW FILE IN OTHER NODES */}
                    {file && title !== 'Google Drive' && (
                        <Card>
                            <CardContent>
                                <GoogleFileDetails
                                    nodeConnection={nodeConnection}
                                    title={title}
                                    gFile={file}
                                />
                            </CardContent>
                        </Card>
                    )}

                    {/* ✅ ACTION BUTTON */}
                    <ActionButton
                        currentService={title}
                        nodeConnection={nodeConnection}
                        channels={selectedSlackChannels}
                        setChannels={setSelectedSlackChannels}
                    />
                </div>
            </Card>
        </AccordionContent>
    )
}

export default ContentBasedOnTitle