import { LogOut, User } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Separator } from "../components/ui/separator"
import MainLogo from "../assets/logos/tikomatata.svg"

const SideBarRoutes = [
  {
    path: "/events",
    icon: "Calendar",
    label: "Events",
    svg: (
      <svg
        width="18"
        height="20"
        viewBox="0 0 21 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.9072 19.8C13.1135 19.8 12.4444 19.5182 11.9 18.9545C11.3556 18.3909 11.0833 17.7008 11.0833 16.8845C11.0833 16.0682 11.3573 15.38 11.9053 14.82C12.4533 14.26 13.1242 13.98 13.9178 13.98C14.7115 13.98 15.3806 14.2618 15.925 14.8255C16.4694 15.3891 16.7417 16.0791 16.7417 16.8955C16.7417 17.7118 16.4677 18.4 15.9197 18.96C15.3717 19.52 14.7008 19.8 13.9072 19.8ZM1.75 24C1.28333 24 0.875 23.82 0.525 23.46C0.175 23.1 0 22.68 0 22.2V3.6C0 3.12 0.175 2.7 0.525 2.34C0.875 1.98 1.28333 1.8 1.75 1.8H3.64583V0.96C3.64583 0.688 3.73528 0.46 3.91417 0.276C4.09306 0.0919999 4.31472 0 4.57917 0C4.85187 0 5.08047 0.0919999 5.26496 0.276C5.44943 0.46 5.54167 0.688 5.54167 0.96V1.8H15.4583V0.96C15.4583 0.688 15.5478 0.46 15.7267 0.276C15.9056 0.0919999 16.1272 0 16.3917 0C16.6644 0 16.893 0.0919999 17.0775 0.276C17.2619 0.46 17.3542 0.688 17.3542 0.96V1.8H19.25C19.7167 1.8 20.125 1.98 20.475 2.34C20.825 2.7 21 3.12 21 3.6V22.2C21 22.68 20.825 23.1 20.475 23.46C20.125 23.82 19.7167 24 19.25 24H1.75ZM1.75 22.2H19.25V9.3H1.75V22.2ZM1.75 7.5H19.25V3.6H1.75V7.5Z"
          className="fill-neutralDark group-hover:fill-neutralWhite group-focus:fill-neutralWhite"
        />
      </svg>
    ),
  },
  {
    path: "/payments",
    icon: "CreditCard",
    label: "Payments",
    svg: (
      <svg
        width="18"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.6364 10.0938C12.7273 10.0938 11.9545 9.78385 11.3182 9.16406C10.6818 8.54427 10.3636 7.79167 10.3636 6.90625C10.3636 6.02083 10.6818 5.26823 11.3182 4.64844C11.9545 4.02865 12.7273 3.71875 13.6364 3.71875C14.5455 3.71875 15.3182 4.02865 15.9545 4.64844C16.5909 5.26823 16.9091 6.02083 16.9091 6.90625C16.9091 7.79167 16.5909 8.54427 15.9545 9.16406C15.3182 9.78385 14.5455 10.0938 13.6364 10.0938ZM4.90909 13.8125C4.45909 13.8125 4.07386 13.6564 3.75341 13.3443C3.43295 13.0322 3.27273 12.657 3.27273 12.2188V1.59375C3.27273 1.15547 3.43295 0.780273 3.75341 0.468164C4.07386 0.156055 4.45909 0 4.90909 0H22.3636C22.8136 0 23.1989 0.156055 23.5193 0.468164C23.8398 0.780273 24 1.15547 24 1.59375V12.2188C24 12.657 23.8398 13.0322 23.5193 13.3443C23.1989 13.6564 22.8136 13.8125 22.3636 13.8125H4.90909ZM7.63636 12.2188H19.6364C19.6364 11.475 19.9 10.8464 20.4273 10.3328C20.9545 9.81927 21.6 9.5625 22.3636 9.5625V4.25C21.6 4.25 20.9545 3.99323 20.4273 3.47969C19.9 2.96615 19.6364 2.3375 19.6364 1.59375H7.63636C7.63636 2.3375 7.37273 2.96615 6.84545 3.47969C6.31818 3.99323 5.67273 4.25 4.90909 4.25V9.5625C5.67273 9.5625 6.31818 9.81927 6.84545 10.3328C7.37273 10.8464 7.63636 11.475 7.63636 12.2188ZM1.63636 17C1.18636 17 0.801136 16.8439 0.480682 16.5318C0.160227 16.2197 0 15.8445 0 15.4062V3.98438C0 3.75859 0.0788636 3.56934 0.236591 3.4166C0.394336 3.26387 0.589791 3.1875 0.822955 3.1875C1.05614 3.1875 1.25 3.26387 1.40455 3.4166C1.55909 3.56934 1.63636 3.75859 1.63636 3.98438V15.4062H19.9091C20.1409 15.4062 20.3352 15.4831 20.492 15.6367C20.6489 15.7903 20.7273 15.9807 20.7273 16.2078C20.7273 16.4349 20.6489 16.6237 20.492 16.7742C20.3352 16.9247 20.1409 17 19.9091 17H1.63636Z"
          className="fill-neutralDark group-hover:fill-neutralWhite group-focus:fill-neutralWhite"
        />
      </svg>
    ),
  },
  {
    path: "/settings",
    icon: "Settings",
    label: "Settings",
    svg: (
      <svg
        width="18"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.0214 24H9.97143C9.74643 24 9.547 23.93 9.37314 23.79C9.19928 23.65 9.09189 23.47 9.05099 23.25L8.56008 20.22C8.17145 20.08 7.76237 19.89 7.33283 19.65C6.90329 19.41 6.52489 19.16 6.19762 18.9L3.34426 20.19C3.11927 20.29 2.89427 20.305 2.66927 20.235C2.44428 20.165 2.27042 20.02 2.14769 19.8L0.122725 16.29C0 16.09 -0.0306813 15.88 0.0306813 15.66C0.0920439 15.44 0.214769 15.26 0.398857 15.12L3.03745 13.23C2.99654 13.05 2.97097 12.845 2.96075 12.615C2.95052 12.385 2.94541 12.18 2.94541 12C2.94541 11.82 2.95052 11.615 2.96075 11.385C2.97097 11.155 2.99654 10.95 3.03745 10.77L0.398857 8.88C0.214769 8.74 0.0920439 8.56 0.0306813 8.34C-0.0306813 8.12 0 7.91 0.122725 7.71L2.14769 4.2C2.27042 3.98 2.44428 3.835 2.66927 3.765C2.89427 3.695 3.11927 3.71 3.34426 3.81L6.19762 5.1C6.52489 4.84 6.90329 4.59 7.33283 4.35C7.76237 4.11 8.17145 3.93 8.56008 3.81L9.05099 0.75C9.09189 0.53 9.19928 0.35 9.37314 0.21C9.547 0.07 9.74643 0 9.97143 0H14.0214C14.2464 0 14.4458 0.07 14.6196 0.21C14.7935 0.35 14.9009 0.53 14.9418 0.75L15.4327 3.78C15.8213 3.92 16.2355 4.105 16.6753 4.335C17.1151 4.565 17.4883 4.82 17.7952 5.1L20.6485 3.81C20.8735 3.71 21.0985 3.695 21.3235 3.765C21.5485 3.835 21.7224 3.98 21.8451 4.2L23.8701 7.68C23.9928 7.88 24.0286 8.095 23.9774 8.325C23.9263 8.555 23.7985 8.74 23.5939 8.88L20.9553 10.71C20.9962 10.91 21.0218 11.125 21.032 11.355C21.0423 11.585 21.0474 11.8 21.0474 12C21.0474 12.2 21.0423 12.41 21.032 12.63C21.0218 12.85 20.9962 13.06 20.9553 13.26L23.5939 15.12C23.778 15.26 23.9007 15.44 23.9621 15.66C24.0235 15.88 23.9928 16.09 23.8701 16.29L21.8451 19.8C21.7224 20.02 21.5485 20.165 21.3235 20.235C21.0985 20.305 20.8735 20.29 20.6485 20.19L17.7952 18.9C17.4679 19.16 17.0946 19.415 16.6753 19.665C16.256 19.915 15.8418 20.1 15.4327 20.22L14.9418 23.25C14.9009 23.47 14.7935 23.65 14.6196 23.79C14.4458 23.93 14.2464 24 14.0214 24ZM11.9964 15.9C13.1009 15.9 14.0418 15.52 14.8191 14.76C15.5963 14 15.985 13.08 15.985 12C15.985 10.92 15.5963 10 14.8191 9.24C14.0418 8.48 13.1009 8.1 11.9964 8.1C10.8919 8.1 9.95097 8.48 9.17371 9.24C8.39645 10 8.00782 10.92 8.00782 12C8.00782 13.08 8.39645 14 9.17371 14.76C9.95097 15.52 10.8919 15.9 11.9964 15.9ZM11.9964 14.1C11.4032 14.1 10.897 13.895 10.4777 13.485C10.0584 13.075 9.8487 12.58 9.8487 12C9.8487 11.42 10.0584 10.925 10.4777 10.515C10.897 10.105 11.4032 9.9 11.9964 9.9C12.5896 9.9 13.0958 10.105 13.5151 10.515C13.9344 10.925 14.1441 11.42 14.1441 12C14.1441 12.58 13.9344 13.075 13.5151 13.485C13.0958 13.895 12.5896 14.1 11.9964 14.1ZM10.6464 22.2H13.3464L13.7759 18.84C14.4509 18.68 15.0901 18.43 15.6935 18.09C16.2969 17.75 16.844 17.34 17.3349 16.86L20.5872 18.24L21.8144 16.08L18.9304 14.01C19.0122 13.67 19.0787 13.335 19.1298 13.005C19.1809 12.675 19.2065 12.34 19.2065 12C19.2065 11.66 19.186 11.325 19.1451 10.995C19.1042 10.665 19.0326 10.33 18.9304 9.99L21.8144 7.92L20.5872 5.76L17.3349 7.14C16.8645 6.62 16.3327 6.185 15.7395 5.835C15.1463 5.485 14.4918 5.26 13.7759 5.16L13.3464 1.8H10.6464L10.2169 5.16C9.52143 5.3 8.87201 5.54 8.26861 5.88C7.66521 6.22 7.12829 6.64 6.65784 7.14L3.40563 5.76L2.17837 7.92L5.06242 9.99C4.9806 10.33 4.91412 10.665 4.86299 10.995C4.81185 11.325 4.78628 11.66 4.78628 12C4.78628 12.34 4.81185 12.675 4.86299 13.005C4.91412 13.335 4.9806 13.67 5.06242 14.01L2.17837 16.08L3.40563 18.24L6.65784 16.86C7.14874 17.34 7.69589 17.75 8.29929 18.09C8.90269 18.43 9.54189 18.68 10.2169 18.84L10.6464 22.2Z"
          className="fill-neutralDark group-hover:fill-neutralWhite group-focus:fill-neutralWhite"
        />
      </svg>
    ),
  },
]

export default function SideBar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLargeView, setIsLargeView] = useState(true)
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [width])

  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 w-[230px] max-sidebar:w-[80px] h-screen transition-transform justify-center duration-300 sm:translate-x-0"
        aria-label="Sidebar"
        style={{}}
      >
        <div className="h-full px-3 py-6 overflow-y-auto bg-neutralWhite relative dark:bg-gray-800">
          <a href="/" className="flex items-center pl-2.5 mb-5 h-[80px]">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-neutralDark dark:text-white">
              {width < 980 ? "TIKO" : <img src={MainLogo} alt="logo" className="h-7 w-15" />}
            </span>
          </a>
          <ul className="space-y-2 font-medium">
            {SideBarRoutes.map((route) => (
              <li key={route.label}>
                <Link
                  to={route.path}
                  className="h-[40px] w-[200px] max-[980px]:w-[50px] flex items-center p-2 text-neutralDark rounded-sm group hover:bg-neutralDark hover:text-neutralWhite active:text-neutralWhite active:bg-neutralDark focus:text-neutralWhite focus:bg-neutralDark"
                >
                  {route.svg}
                  {width < 980 ? "" : <span className="ml-3">{route.label}</span>}
                </Link>
              </li>
            ))}
          </ul>

          <div className="px-2 absolute bottom-0 mb-16">
            <Separator className="my-4" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/kibuikaCodes.png" />
                  <AvatarFallback>SK</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 ml-1">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="/settings">
                      <p className="flex flex-row">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </p>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
      <main>
        <Outlet />
      </main>
    </>
  )
}
