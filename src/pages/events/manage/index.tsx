import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import EventDashBoard from "@/src/components/manage-event/event-dashboard"
import EventTickets from "@/src/components/manage-event/event-tickets"
import EventDetails from "@/src/components/manage-event/event-details"
import EventCollaborators from "@/src/components/manage-event/event-collaborators"
import EventTargets from "@/src/components/manage-event/event-targets"

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
