import React from 'react'
import WorkflowButton from './_components/workflow-button'
import Workflows from './_components'

type Props = {}

const Page = (props: Props) => {
    return (

        <div className="flex flex-col gap-4">
            <h1 className="p-6 text-4xl border-b justify-between flex bg-background">
                Workflows
                <WorkflowButton />
            </h1>
            <Workflows />
            <Workflows />
            <Workflows />
            <Workflows />
        </div>
    )
}

export default Page