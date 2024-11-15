import MainContainer from "@/src/components/ui/main-container"
import useUser from "@/src/hooks/use-user"
import { useUserDetailsStore } from "@/src/stores/user-details-store"
import React, { useState, useEffect } from "react"
import AppHeader from "../app-header"
import AppSidebar from "../app-sidebar"

type Props = {
  children?: React.ReactNode
  left?: JSX.Element
  right?: JSX.Element
  noHeader?: boolean
}

const MainAppWrapper: React.FC<Props> = ({ children, left, right, noHeader }) => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)
  const userDetailsInStore = useUserDetailsStore((state) => state.user)
  const setUser = useUserDetailsStore((state) => state.setUser)
  const { user } = useUser()

  useEffect(() => {
    if (userDetailsInStore) {
      setUser(userDetailsInStore)
    } else {
      setUser(user)
    }
  }, [userDetailsInStore, setUser])
  return (
    <div>
      <AppSidebar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
      <AppHeader
        left={left}
        right={right}
        setToggleSidebar={setToggleSidebar}
        noHeader={noHeader}
        eventTab={false}
      />
      <MainContainer>{children}</MainContainer>
    </div>
  )
}

export default MainAppWrapper
