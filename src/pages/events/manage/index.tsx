import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import EventDashBoard from "@/src/components/manage-event/EventDashBoard"
import EventTickets from "@/src/components/manage-event/EventTickets"
import EventDetails from "@/src/components/manage-event/EventDetails"
import EventCollaborators from "@/src/components/manage-event/EventCollaborators"
import EventTargets from "@/src/components/manage-event/EventTargets"

const ManageEvent = () => {
  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get("tab") || "dashboard"

  useEffect(() => {
    document.title = "Manage Event | Events"
  }, [])
  //FIXME: Add menu on manage event pages [could be an "EventsWrapper" component"]
  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-full">
          {activeTab === "dashboard" && <EventDashBoard />}
          {activeTab === "details" && <EventDetails />}
          {activeTab === "tickets" && <EventTickets />}
          {activeTab === "targets" && <EventTargets />}
          {activeTab === "collaborators" && <EventCollaborators />}
        </div>
      </div>
    </>
  )
}

export default ManageEvent
