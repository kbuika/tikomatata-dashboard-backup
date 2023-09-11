import { Menu } from "lucide-react"

type Props = {
  left?: JSX.Element
  right?: JSX.Element
  noHeader?: boolean
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const AppHeader: React.FC<Props> = ({ left, right, noHeader, setToggleSidebar }) => {
  return (
    <div
      className={`sticky top-0 bg-white z-20 w-full flex flex-row items-center justify-between pl-[270px] h-[10vh] pr-[50px] max-sidebarLayout:px-[30px] border-b-2 ${
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
        {left}
      </div>
      {right}
    </div>
  )
}

export default AppHeader
