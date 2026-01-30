import { ReactNode } from "react";

type Props = { children: ReactNode }

const Layout = ({ children }: Props) => {
    return (
        <div className="border-l border-t pb-10 h-screen rounded-3xl border-muted-foreground/20 overflow-scroll">
            {children}
        </div>
    )
}

export default Layout