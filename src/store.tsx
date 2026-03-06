import { create } from 'zustand'

export interface Option {
    value: string,
    label: string,
    disable?: boolean

    fixed?: boolean
    [key: string]: string | boolean | undefined
}

type FlowyStore = {
    googleFile: any
    setGoogleFile: (file: any) => void
    slackChannels: Option[]
    setSlackChannels: (channels: Option[]) => void
    selectedSlackChannels: Option[]
    setSelectedSlackChannels: (channels: Option[]) => void
}

export const useFlowyStore = create<FlowyStore>()((set) => ({
    googleFile: {},
    setGoogleFile: (googleFile: any) => set({ googleFile }),
    slackChannels: [],
    setSlackChannels: (slackChannels: Option[]) => set({ slackChannels }),
    selectedSlackChannels: [],
    setSelectedSlackChannels: (selectedSlackChannels: Option[]) => set({ selectedSlackChannels }),

}))