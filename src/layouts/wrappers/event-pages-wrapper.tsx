import React, { useState } from "react"
import AppSidebar from "../app-sidebar"
import AppHeader from "../app-header"
import MainContainer from "@/src/components/ui/main-container"
import EventSideBar from "../EventSideBar"
import VerticalEventNavBar from "../VerticalEventNavBar"

type Props = {
  children?: React.ReactNode
  left?: JSX.Element
  right?: JSX.Element
  noHeader?: boolean
}

const EventPagesWrapper: React.FC<Props> = ({ children, left, right, noHeader }) => {
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
      <MainContainer>
        <div className="flex flex-col min-h-screen max-sidebarLayout:px-[30px]">
          <VerticalEventNavBar />
          <div className="flex flex-row">
            <EventSideBar />
            <div className="w-[80%] max-[1024px]:w-[100%]">{children}</div>
          </div>
        </div>
      </MainContainer>
    </div>
  )
}

export default EventPagesWrapper
