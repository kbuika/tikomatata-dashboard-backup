import { create } from "zustand"
import { EventDataType } from "../types"

interface EventsState {
    allEvents: Array<EventDataType>,
    selectedEvent: EventDataType | null,
    setAllEvents: (events: Array<EventDataType>) => void,
    setSelectedEvent: (event: EventDataType) => void
}


export const useEventsStore = create<EventsState>()((set) => ({
    allEvents: [],
    selectedEvent: null,
    setAllEvents: (events) => set(() => ({ allEvents: events})),
    setSelectedEvent: (event) => set(() => ({ selectedEvent: event}))
}))