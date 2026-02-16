import { ConnectionProviderProps } from "@/providers/connection-provider";
import z from "zod";


export const EditUserProfileSchema = z.object({
    email: z.string().email("Required"),
    name: z.string().min(1, "Required"),
})

export const WorkflowFormSchema = z.object({
    name: z
        .string()
        .min(4, "Name must be at least 4 characters"),

    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
});


export type ConnectionTypes = 'Google Drive' | 'Notion' | 'Slack' | 'Discord'

export type Connection = {
    title: ConnectionTypes
    description: string
    image: string
    connectionKey: keyof ConnectionProviderProps
    accessTokenKey?: string
    alwaysTrue?: boolean
    slackSpecial?: boolean
}

