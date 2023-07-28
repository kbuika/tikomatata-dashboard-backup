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
          <div className="mt-[3em] flex flex-col w-[38%]">
            <div className="flex flex-row items-center justify-center">
              <img src={userDetails?.imageUrl} alt="" className="h-[5em] w-[5em] rounded-[50%]" />
              {/* <CustomButton className="ml-8 h-8 flex items-center">Change Avatar</CustomButton> */}
            </div>
            <div className="w-full mt-[26px]">
              <div>
                <label className="text-neutralDark">Full Name</label>
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
            <div className="w-full mt-[26px]">
              <div>
                <label className="text-neutralDark">Phone Number</label>
                <div className="flex items-center">
                  <span className="w-[35%] text-neutralDark lg:w-1/4 bg-white h-[50px] flex items-center justify-center rounded-sm border rounded-r-none border-gray-600">
                    <img src={KenyaIcon} alt="Kenyan Flag" className="mr-2" />
                    +254
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
            <div className="w-full mt-[26px]">
              <div>
                <label className="text-neutralDark">Email Address</label>
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
