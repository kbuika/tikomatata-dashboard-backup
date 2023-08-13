import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { TicketDataType } from "../types"

interface TicketsState {
    allTickets: Array<TicketDataType>,
    selectedTicket: TicketDataType | null,
    setAllTickets: (events: Array<TicketDataType>) => void,
    setSelectedTicket: (event: TicketDataType) => void
    updateTicket: (ticket: TicketDataType) => void
    resetAllTickets: () => void
}


export const useTicketsStore = create<TicketsState>()(
    persist(
        (set) => ({
            allTickets: [],
            selectedTicket: null,
            setAllTickets: (tickets) => set(() => ({ allTickets: tickets})),
            setSelectedTicket: (ticket) => set(() => ({ selectedTicket: ticket})),
            updateTicket: (ticket) => set((state) => ({ allTickets: state.allTickets.map((t) => t.ticketId === ticket.ticketId ? ticket : t)})),
            resetAllTickets: () => set(() => ({ allTickets: []}))
        }),
        {
            name: "tickets-storage", // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }

))