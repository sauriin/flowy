import { ConnectionProviderProps } from "@/providers/connection-provider";
import { EditorNode } from "@/providers/editor-provider";
import z from "zod";
import { id } from "zod/v4/locales";


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

export type EditorCanvasTypes = 'Email' | 'Condition' | 'AI' | 'Slack' | 'Google Drive' | 'Notion' | 'Custom Webhook' | 'Google Calendar' | 'Trigger' | 'Action' | 'Wait';

export type EditorCanvasCardType = {
    title: string,
    description: string,
    completed: boolean,
    current: boolean,
    metadata: any,
    type: EditorCanvasTypes
}

export type EditorNodeType = {
    id: string,
    type: EditorCanvasCardType['type'],
    position: {
        x: number,
        y: number
    };
    data: EditorCanvasCardType;
};

export type EditorActions = {
    type: 'LOAD_DATA'
    payload: {
        elements: EditorNode[]
        edges: {
            id: string,
            source: string,
            target: string,
        }[]
    }
}
    | {
        type: 'UPDATE_NODE'
        payload: {
            elements: EditorNode[]
        }
    }
    | { type: 'REDO' }
    | { type: 'UNDO' }
    | {
        type: 'SELECTED_ELEMENT'
        payload: {
            elements: EditorNode
        }
    }