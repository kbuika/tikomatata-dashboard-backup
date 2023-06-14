import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"

export default function SideBarLayout() {
  return (
    <div>
      <SideBar />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
