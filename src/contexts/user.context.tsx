import React, { createContext, ReactElement } from "react"

import { KeyedMutator } from "swr"

import useUser from "../hooks/use-user"
// types
// import type { ICurrentUserResponse, IUser } from "types";

interface IUserContextProps {
  user?: any
  userInitials: string
  isUserLoading: boolean
  mutateUser: KeyedMutator<any>
  userError?: any
}

export const UserContext = createContext<IUserContextProps>({} as IUserContextProps)

export const UserProvider = ({ children }: { children: ReactElement }) => {
  // API to fetch user information
  const { user, userInitials, isUserLoading, userError, mutateUser } = useUser()

  return (
    <UserContext.Provider
      value={{
        user: userError ? undefined : user,
        userInitials,
        isUserLoading,
        userError,
        mutateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserState = () => {
  const context = React.useContext(UserContext)

  if (!context) {
    throw new Error("useUserState must be used within a UserProvider")
  }

  return context
}
