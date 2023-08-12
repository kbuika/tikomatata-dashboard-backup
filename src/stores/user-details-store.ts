import { create } from "zustand"

interface UserState {
    user: any,
    setUser: (user: any) => void
}


export const useUserDetailsStore = create<UserState>()((set) => ({
    user: null,
    setUser: (user) => set(() => ({ user: user}))
}))