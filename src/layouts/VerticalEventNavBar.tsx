import { Link, useSearchParams } from "react-router-dom"
import clsx from "clsx"
import { EventSideBarElements } from "../constants/EventSideBarRoutes"

export default function VerticalEventNavBar() {
  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get("tab") || "dashboard"
  return (
    <div className="h-10 w-full bg-red pt-4 pb-4 mb-12 hidden max-[1024px]:block">
      <ul className="flex row justify-between overflow-y-hidden overflow-x-auto no-scrollbar">
        {EventSideBarElements.map((element) => (
          <li key={element.name}>
            <Link
              to={`?tab=${element.tabName}`}
              // eslint-disable-next-line quotes
              className={clsx(
                `h-[40px] w-auto flex items-center p-2 text-neutralDark rounded-sm group hover:bg-navBar hover:text-neutralDark active:text-neutralDark active:bg-navBar focus:text-neutralDark focus:bg-navBar ${
                  element.tabName === activeTab ? "bg-navBar text-neutralDark" : ""
                }`,
              )}
            >
              {element.icon}
              <span className="ml-1 text-black">{element.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
