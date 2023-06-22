import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import MainContainer from "@/src/components/ui/CustomContainer"
import EventSideBar from "@/src/layouts/EventSideBar"
import EventDashBoard from "@/src/components/manage-event/EventDashBoard"
import EventTickets from "@/src/components/manage-event/EventTickets"
import EventDetails from "@/src/components/manage-event/EventDetails"
import EventCollaborators from "@/src/components/manage-event/EventCollaborators"

const ManageEvent = () => {
  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get("tab") || "dashboard"

  useEffect(() => {
    document.title = "Manage Event | Events"
  }, [])

  return (
    <MainContainer className="pl-[220px]">
      <div className="flex min-h-screen">
        <EventSideBar />
        <div className="w-full pl-[30px]">
          {activeTab === "dashboard" && <EventDashBoard />}
          {activeTab === "details" && <EventDetails />}
          {activeTab === "tickets" && <EventTickets />}
          {activeTab === "collaborators" && <EventCollaborators />}
        </div>
      </div>
    </MainContainer>
  )
}

export default ManageEvent
