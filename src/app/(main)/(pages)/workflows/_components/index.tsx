import React from 'react'
import Workflow from './workflow'

type Props = {}

const Workflows = (props: Props) => {
    return (
        <div className='relative flex flex-col gap-4'>
            <section className='flex flex-col gap-4 p-6'>
                <Workflow name="My Workflow" description="This is a sample workflow" id="1234567890" publish={false} />
            </section>
        </div>
    )
}

export default Workflows