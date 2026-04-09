import React from 'react'
import Workflow from './workflow'
import { onGetWorkflows } from '../_actions/workflow-connection'
import MoreCredits from './more-credits'

type Props = {}

const Workflows = async (props: Props) => {
    const Workflows = await onGetWorkflows()
    return (
        <div className='relative flex flex-col'>
            <section className='flex flex-col m-2 gap-5'>
                <MoreCredits />
                {Workflows?.length ? Workflows.map((flow) => (
                    <Workflow
                        key={flow.id}
                        {...flow}
                    />
                )) : (
                    <div className='mt-28 text-muted-foreground flex items-center text-3xl justify-center'>
                        No Workflows
                    </div>
                )}
            </section>
        </div>
    )
}

export default Workflows