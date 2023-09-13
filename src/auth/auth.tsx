import MainImage from "../assets/images/main.png"
import CustomButton from "../components/ui/custom-button"
import TikomatataLogo from "../assets/logos/tikomatata.png"
import { Link } from "react-router-dom"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import SignInComponent from "./sign-in-component"
import { useState } from "react"
import SignUpComponent from "./sign-up-component"

interface IAuthProps {
  setToken: (userToken: string) => void
}

export default function Auth({ setToken }: IAuthProps) {
  const [isSignIn, setIsSignIn] = useState<boolean>(true)
  return (
    <Dialog>
      <div className="relative h-screen">
        <div className="h-screen">
          <img src={MainImage} alt="auth-bg" className="object-cover h-full w-full"/>
        </div>
        <div className="absolute inset-0">
          <div className="pt-4 flex items-center justify-between sticky top-0 text-gray-300 border-none px-[30px] md:px-[60px]">
            <Link to="/">
              <img src={TikomatataLogo} alt="logo" height={35} width={105} />
            </Link>
            <div className="md:flex items-center justify-between hidden space-x-8">
              <DialogTrigger>
                <CustomButton>Create Your Event</CustomButton>
              </DialogTrigger>
              <DialogTrigger>
                <CustomButton className="bg-transparent border border-white w-[5em]">
                  Login
                </CustomButton>
              </DialogTrigger>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-white mt-24 max-[768px]:mt-36">
            <h2 className=" font-bold text-center md:text-[5em] landing-text text-[3em]">
              Sell your tickets <br />
              where the audience is!
            </h2>
            <DialogTrigger>
              <CustomButton className="mt-4 text-[1em] w-[20em] font-bold">
                Create Your Event
              </CustomButton>
            </DialogTrigger>
            <DialogTrigger className="max-[768px]:block hidden">
                <CustomButton className="bg-transparent border border-white mt-4 w-[20em]">
                  Login
                </CustomButton>
            </DialogTrigger>
            <Link to="https://tikomatata.com/contact">
              <CustomButton className="bg-transparent border border-white mt-4 w-[20em]">
                Talk to Us
              </CustomButton>
            </Link>
          </div>
          <DialogContent className="max-[768px]:w-[90%] rounded">
            <DialogTitle className=" flex items-center justify-center">
              Hey, {isSignIn ? "Welcome Back" : "Let's get started!"}
            </DialogTitle>
            <div className="flex flex-col items-center justify-center">
              {isSignIn ? (
                <SignInComponent
                  setToken={setToken}
                  setIsSignIn={setIsSignIn}
                  isSignIn={isSignIn}
                />
              ) : (
                <SignUpComponent
                  setToken={setToken}
                  setIsSignIn={setIsSignIn}
                  isSignIn={isSignIn}
                />
              )}
            </div>
          </DialogContent>
        </div>
      </div>
    </Dialog>
  )
}
