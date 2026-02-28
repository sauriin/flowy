import React from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
// import { toast } from 'sonner'
// import { onFlowPublish } from '../_actions/workflow-connections'

type Props = {
    name: string
    description: string
    id: string
    publish: boolean | null
}

const Workflow = ({ description, id, name, publish }: Props) => {
    // const onPublishFlow = async (event: any) => {
    //     const response = await onFlowPublish(
    //         id,
    //         event.target.ariaChecked === 'false'
    //     )
    //     if (response) toast.message(response)
    // }

    return (
        <Card className="flex w-full flex-row items-center justify-between px-6 py-10">

            {/* LEFT */}
            <div className="flex flex-col gap-3">
                <Link href={`/workflows/editor/${id}`}>
                    <div className="flex gap-2">
                        <Image src="/googleDrive.png" alt="Google Drive" height={30} width={30} />
                        <Image src="/notion.png" alt="Notion" height={30} width={30} />
                        <Image src="/discord.png" alt="Discord" height={30} width={30} />
                    </div>

                    <div>
                        <CardTitle className="text-lg">{name}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                </Link>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-center gap-2">
                <Label htmlFor='airplane-mode' className="text-muted-foreground">
                    {publish ? "On" : "Off"}
                </Label>

                <Switch
                    id='airplane-mode'
                //  onClick={onPublishWorkflow} 
                //  defaultChecked={props.publish}
                />
            </div>

        </Card>
    )
}

export default Workflow