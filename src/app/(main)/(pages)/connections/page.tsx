import { CONNECTIONS } from '@/lib/constant'
import ConnectionCard from './_components/connection-card'

type Props = {
    searchParms?: {
        [key: string]: string | undefined
    }
}

const Connections = (props: Props) => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="p-6 text-4xl border-b bg-background">
                Connections
            </h1>

            <section className="flex flex-col gap-4 p-6 text-muted-foreground">
                <p>
                    Connect all your apps directly to Flowy and automate your workflows like never before.
                    We support a wide range of apps and services, making<br/> it easy to integrate your favorite
                    tools and create powerful automations.
                </p>

                {CONNECTIONS.map((connection) => (
                    <ConnectionCard
                        key={connection.title}
                        description={connection.description}
                        icon={connection.image}
                        type={connection.title}
                        title={connection.title}
                    />
                ))}
            </section>
        </div>
    )

}

export default Connections