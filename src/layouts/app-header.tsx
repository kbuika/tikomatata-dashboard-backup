import { ArrowLeft, Menu } from "lucide-react"
import { useEventsStore } from "../stores/events-store"
import { useNavigate } from "react-router-dom"

type Props = {
  left?: JSX.Element
  right?: JSX.Element
  noHeader?: boolean
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>
}
// TODO: make the header fixed, not sticky.
const AppHeader: React.FC<Props> = ({ right, noHeader, setToggleSidebar }) => {
  const navigate = useNavigate()
  const selectedEvent = useEventsStore((state) => state.selectedEvent)
  return (
    <div
      className={`w-full flex flex-row items-center justify-between pl-[270px] h-[10vh] pr-[50px] max-sidebarLayout:px-[30px] border-b-2 ${
        noHeader ? "hidden" : ""
      }`}
    >
      <div className="flex flex-row items-center justify-center">
        <div className="mr-4 hidden max-sidebarLayout:block">
          <button
            onClick={() => setToggleSidebar((prevData) => !prevData)}
            className="flex flex-row items-center justify-center"
          >
            <Menu className="h-8 w-7 text-neutralPrimary" />
          </button>
        </div>
        <div className="text-neutralDark">
          <div className="w-full flex flex-row items-center justify-between relative">
            <ArrowLeft className="h-5 w-8 text-dark-700 cursor-pointer" onClick={() => navigate(-1)}/>
            <h2 className="text-[18px] font-semibold ml-2">{selectedEvent?.name}</h2>
          </div>
        </div>
      
      </div>
      {right}
    </div>
  )
}

export default AppHeader
