import React from 'react'
import Workflow from './workflow'

type Props = {}

const Workflows = (props: Props) => {
    return (
        <div className='relative flex flex-col'>
            <section className='flex flex-col m-2'>
                <Workflow name="Automation Workflow" description="Create a test Workflow" id="1234567890" publish={true} />
            </section>
        </div>
    )
}

export default Workflows