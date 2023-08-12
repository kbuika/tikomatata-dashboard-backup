import MainContainer from "@/src/components/ui/main-container"
import useUser from "@/src/hooks/use-user"
import { useUserStore } from "@/src/stores/user-store"
import React, { useState } from "react"
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
  const { user } = useUser()
  const setUser = useUserStore((state) => state.setUser)
  setUser(user)
  return (
    <div>
      <AppSidebar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
      <AppHeader
        left={left}
        right={right}
        setToggleSidebar={setToggleSidebar}
        noHeader={noHeader}
      />
      <MainContainer>{children}</MainContainer>
    </div>
  )
}

export default MainAppWrapper
