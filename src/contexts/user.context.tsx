import React, { createContext, ReactElement, useMemo } from "react"

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

export const UserContext = createContext<IUserContextProps>({
  user: {},
  userInitials: "",
  isUserLoading: false,
  mutateUser: () => {},
  userError: null,
} as IUserContextProps)

export const UserProvider = ({ children }: { children: ReactElement }) => {
  // API to fetch user information
  const { user, userInitials, isUserLoading, userError, mutateUser } = useUser()
  const value = useMemo(() => ({
    user,
    userInitials,
    isUserLoading,
    userError,
    mutateUser,
  }), [user, userInitials, isUserLoading, userError, mutateUser])
  return (
    <UserContext.Provider
      value={value}
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
