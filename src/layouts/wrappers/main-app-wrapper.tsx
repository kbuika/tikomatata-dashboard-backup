import React, { useState } from "react"
import AppSidebar from "../app-sidebar"
import AppHeader from "../app-header"
import MainContainer from "@/src/components/ui/main-container"

type Props = {
  children?: React.ReactNode
  left?: JSX.Element
  right?: JSX.Element
  noHeader?: boolean
}

const MainAppWrapper: React.FC<Props> = ({ children, left, right, noHeader }) => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)
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
