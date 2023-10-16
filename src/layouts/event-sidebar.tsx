import { Link } from "react-router-dom"
import { EventSideBarElements } from "../constants/event-sidebar-routes"

export default function EventSideBar() {
  return (
    <div className="fixed w-[250px] max-[1024px]:hidden">
      <div className="px-4">
        <ul className="space-y-2 font-medium">
          {EventSideBarElements.map((element) => (
            <li key={element.name}>
              <Link
                to={`?tab=${element.tabName}`}
                className="h-[40px] w-[180px] max-sidebar:w-[70px] flex items-center p-2 text-neutralDark rounded-sm group hover:bg-mainPrimary hover:text-white active:text-white active:bg-mainPrimary focus:text-white focus:bg-mainPrimary"
              >
                {element.icon}
                <span className="ml-3">{element.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
