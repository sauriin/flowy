import { CONNECTIONS } from '@/lib/constant'
import React from 'react'
import ConnectionCard from './_components/connection-card'
import { connected } from 'process'

type Props = {
    searchParms?: {
        [key: string]: string | undefined
    }
}

const Connections = (props: Props) => {
    return (
        <div className='flex flex-col gap-4'>
            <h1 className='sticky top-0 z-10 flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-bg'>
                Connections
            </h1>
            <div className='relative flex flex-col gap-4 '>
                <section className='flex flex-col gap-4 p-6 text-muted-foreground'>
                    Connect all your apps directly to Flowy and automate your workflows like never before. We support a wide range of apps and services, making it easy<br /> to integrate your favorite tools and create powerful automations.
                    {CONNECTIONS.map((connection) => {
                        return <ConnectionCard
                            key={connection.title}
                            description={connection.description}
                            icon={connection.image}
                            type={connection.title}
                            title={connection.title}
                        // connected = { connection } 
                        />

                    })
                    }

                </section>
            </div>
        </div>
    )
}

export default Connections