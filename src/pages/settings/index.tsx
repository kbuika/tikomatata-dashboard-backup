import { useEffect, useState } from "react"
import MainAppWrapper from "@/src/layouts/wrappers/main-app-wrapper"
import { getUserInfo } from "@/src/apiCalls"
import { errorToast } from "@/src/lib/utils"
import LoadingScreen from "@/src/components/LoadingScreen"
import KenyaIcon from "../../assets/icons/kenya.png"

const Settings = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userDetails, setUserDetails] = useState<any>({})

  useEffect(() => {
    fetchUserDetails()
  }, [])

  const fetchUserDetails = async () => {
    setIsLoading(true)
    try {
      const res = await getUserInfo()
      if (res.status === 200) {
        setUserDetails(res.data)
      } else {
        errorToast("Could not fetch your details. Try again later.")
      }
    } catch (error) {
      errorToast("Could not fetch your details. Try again later.")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <MainAppWrapper
      left={
        <div>
          <h1 className="text-[23px] font-semibold text-center text-neutralDark">
            Profile Settings
          </h1>
        </div>
      }
    >
      {isLoading ? (
        <div className="mt-[20px] h-[50vh] w-full">
          <LoadingScreen />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center w-full px-8">
            <div className="w-full mt-[26px] flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold">Profile Picture</h3>
              </div>
              <div className="mt-2 md:w-[60%] lg:w-[70%]">
                <img src={userDetails?.imageUrl} alt="" className="h-[5em] w-[5em] rounded-md" />
                {/* <CustomButton className="ml-8 h-8 flex items-center">Change Avatar</CustomButton> */}
              </div>
            </div>
            <div className="w-full mt-[26px] flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold">Full Name</h3>
              </div>
              <div className="mt-2 md:w-[60%] lg:w-[70%]">
                <input
                  id="name"
                  type="text"
                  required
                  className="h-[50px] bg-white appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                  placeholder="Enter Full Name"
                  autoComplete="nope"
                  defaultValue={userDetails?.name}
                ></input>
              </div>
            </div>
            <div className="w-full mt-[26px] flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold">Phone Number</h3>
              </div>
              <div className="md:w-[60%] lg:w-[70%]">
                <div className="flex items-center mt-2">
                  <span className="w-[35%] text-neutralDark lg:w-1/4 bg-white h-[50px] flex items-center justify-center rounded-sm border rounded-r-none border-gray-600">
                    <img src={KenyaIcon} alt="Kenyan Flag" className="mr-2" />
                    <span className="max-[400px]:hidden">+254</span>
                  </span>
                  <input
                    id="phone"
                    type="text"
                    required
                    className="w-3/4 h-[50px] bg-white appearance-none rounded-sm rounded-l-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                    placeholder="Phone number"
                    autoComplete="nope"
                  ></input>
                </div>
              </div>
            </div>
            <div className="w-full mt-[26px] flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold">Email</h3>
              </div>
              <div className="mt-2 md:w-[60%] lg:w-[70%]">
                <input
                  id="email"
                  type="email"
                  required
                  className="h-[50px] bg-white appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                  placeholder="Email Address"
                  autoComplete="nope"
                  defaultValue={userDetails?.email}
                ></input>
              </div>
            </div>
          </div>
        </>
      )}
    </MainAppWrapper>
  )
}

export default Settings
