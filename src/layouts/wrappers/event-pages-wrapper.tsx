import React, { useState } from "react"
import AppSidebar from "../app-sidebar"
import AppHeader from "../app-header"
import MainContainer from "@/src/components/ui/main-container"
import EventSideBar from "../event-sidebar"
import VerticalEventNavBar from "../horizontal-event-navbar"

type Props = {
  children?: React.ReactNode
  left?: JSX.Element
  right?: JSX.Element
  noHeader?: boolean
}

const EventPagesWrapper: React.FC<Props> = ({ children, right, noHeader }) => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)
  return (
    <div className="relative">
      <AppSidebar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
      <AppHeader
        right={right}
        setToggleSidebar={setToggleSidebar}
        noHeader={noHeader}
      />
      <MainContainer>
        <div className="flex flex-col pt-[5em] min-h-screen max-sidebarLayout:px-[30px]">
          <VerticalEventNavBar />
          <div className="flex flex-row">
            <EventSideBar />
            <div className="w-[80%] min-[1024px]:ml-[220px] max-[1024px]:w-[100%]">{children}</div>
          </div>
        </div>
      </MainContainer>
    </div>
  )
}

export default EventPagesWrapper
