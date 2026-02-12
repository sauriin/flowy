import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ConnectionTypes } from "@/lib/types";

type Props = {
    type: ConnectionTypes;
    icon: string;
    title: ConnectionTypes;
    description: string;
    callback?: () => void;
    connected: Record<string, any>;
};

const ConnectionCard = ({
    description,
    icon,
    title,
    type,
    connected,
}: Props) => {
    // Map titles to redirect URLs safely
    const redirectMap: Record<string, string | undefined> = {
        Discord: process.env.NEXT_PUBLIC_DISCORD_REDIRECT,
        Notion: process.env.NEXT_PUBLIC_NOTION_REDIRECT,
        Slack: process.env.NEXT_PUBLIC_SLACK_REDIRECT,
    };

    // Fallback to "#" if env is missing (prevents Next crash)
    const redirectUrl = redirectMap[title] ?? "#";

    return (
        <Card className="flex w-full justify-between">
            <CardHeader className="flex flex-col gap-4">
                <div className="flex flex-row gap-2">
                    <Image
                        src={icon}
                        alt={title}
                        width={30}
                        height={30}
                        className="object-contain"
                    />
                </div>

                <div>
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <CardDescription className="text-sm">
                        {description}
                    </CardDescription>
                </div>
            </CardHeader>

            <div className="flex flex-col gap-2 p-4">
                {connected?.[type] ? (
                    <div className="rounded-lg border-2 border-primary px-3 py-2 text-sm font-bold text-primary">
                        Connected
                    </div>
                ) : (
                    <Link
                        href={redirectUrl}
                        className="rounded-lg bg-primary p-2 font-bold bg-white w-20 text-black"
                    >
                        Connect
                    </Link>
                )}
            </div>
        </Card>
    );
};

export default ConnectionCard;
