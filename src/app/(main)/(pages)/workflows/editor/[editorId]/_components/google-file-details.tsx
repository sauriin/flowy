import { Card, CardContent } from '@/components/ui/card'
import { onAddTemplate } from '@/lib/editor-utils'
import { ConnectionProviderProps } from '@/providers/connection-provider'
import React from 'react'

type Props = {
    nodeConnection: ConnectionProviderProps
    title: string
    gFile: any
}

const isGoogleFileNotEmpty = (file: any): boolean => {
    return file && Object.keys(file).length > 0
}

// readable type
const getReadableType = (mimeType: string) => {
    if (mimeType === 'application/vnd.google-apps.folder') return 'Folder'
    if (mimeType === 'application/vnd.google-apps.document') return 'Google Doc'
    if (mimeType?.includes('pdf')) return 'PDF'
    if (mimeType?.includes('image')) return 'Image'
    if (mimeType?.includes('spreadsheet')) return 'Spreadsheet'
    return 'File'
}

const GoogleFileDetails = ({ gFile, nodeConnection, title }: Props) => {
    if (!isGoogleFileNotEmpty(gFile)) return null

    return (
        <div className="w-full">
            <Card className="w-full border border-zinc-700 bg-zinc-900 hover:border-zinc-500 transition-all duration-200">
                <CardContent className="flex items-center gap-3 p-4 sm:p-5">


                    <div className="text-2xl shrink-0">
                        {gFile.mimeType === 'application/vnd.google-apps.folder'
                            ? '📁'
                            : '📄'}
                    </div>

                    <div className="flex flex-col flex-1 min-w-0">

                        <p
                            className="font-medium text-white line-clamp-2 wrap-break-words cursor-pointer hover:underline"
                            title={gFile.name}
                            onClick={() =>
                                onAddTemplate(nodeConnection, title, gFile.name)
                            }
                        >
                            {gFile.name}
                        </p>

                        {/* FILE TYPE */}
                        <p className="text-xs sm:text-sm text-zinc-400 truncate">
                            {getReadableType(gFile.mimeType)}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default GoogleFileDetails