import React from 'react'
import WorkflowButton from './_components/workflow-button'

type Props = {}

const Workflows = (props: Props) => {
    return (
        // <div className='flex flex-col gap-4 relative'>
        //     <h1 className='text-4xl sticky top-0 z-10 p-6 bg-background/50  backdrop-blur-lg flex items-center border-b justify-between'>
        //         Workflows

        //     </h1>
        // </div>
        <div className="flex flex-col gap-4">
            <h1 className="p-6 text-4xl border-b justify-between flex bg-background">
                Workflows
                <WorkflowButton />
            </h1>
        </div>
    )
}

export default Workflows