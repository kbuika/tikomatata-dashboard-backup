import { MenuSquare } from "lucide-react"

type Props = {
  left?: JSX.Element
  right?: JSX.Element
  noHeader?: boolean
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const AppHeader: React.FC<Props> = ({ left, right, noHeader, setToggleSidebar }) => {
  return (
    // eslint-disable-next-line quotes
    <div
      className={`w-full flex flex-row items-center justify-between pl-[270px] h-[10vh] pr-[50px] max-sidebarLayout:pl-[20px] border-b-2 ${
        noHeader ? "hidden" : ""
      }`}
    >
      <div className="flex flex-row items-center justify-center">
        <div className="mr-4 hidden max-sidebarLayout:block">
          <button onClick={() => setToggleSidebar((prevData) => !prevData)}>
            <MenuSquare className="h-9 w-10 text-neutralPrimary" />
          </button>
        </div>
        {left}
      </div>
      {right}
    </div>
  )
}

export default AppHeader
