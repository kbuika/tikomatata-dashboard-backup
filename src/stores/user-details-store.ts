import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface UserState {
    user: any,
    setUser: (user: any) => void
}

export const useUserDetailsStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set(() => ({ user: user}))
        }),
        {
            name: "user-storage", // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
)