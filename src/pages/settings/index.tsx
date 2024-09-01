import { useState, useEffect } from "react"
import LoadingScreen from "@/src/components/loading-screen"
import useUser from "@/src/hooks/use-user"
import MainAppWrapper from "@/src/layouts/wrappers/main-app-wrapper"
import { useUserDetailsStore } from "@/src/stores/user-details-store"
import KenyaIcon from "../../assets/icons/kenya.png"
import Button  from "@/src/components/ui/custom-button"

const Settings = () => {
  const { isUserLoading } = useUser()
  const user = useUserDetailsStore((state) => state.user)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (user) {
      setName(user.name || "")
      setPhone(user.phone || "")
      setEmail(user.email || "")
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    //TODO: Implement update logic here
    console.log("Update user:", { name, phone, email })
  }

  return (
    <MainAppWrapper
      left={
        <div>
          <h1 className="text-2xl font-semibold text-center text-neutralDark">
            Profile Settings
          </h1>
        </div>
      }
    >
      {isUserLoading ? (
        <div className="mt-[20px] h-[50vh] w-full">
          <LoadingScreen />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col items-center pt-24 justify-center w-full max-w-2xl mx-auto px-4">
          <div className="w-full space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <label htmlFor="avatar" className="text-lg font-semibold mb-2 md:mb-0">Profile Picture</label>
              <div className="flex items-center">
                <img src={user?.imageUrl} alt="" className="h-20 w-20 rounded-full object-cover" />
                <Button type="button" className="ml-4">Change Avatar</Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <label htmlFor="name" className="text-lg font-semibold mb-2 md:mb-0">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full md:w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Full Name"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <label htmlFor="phone" className="text-lg font-semibold mb-2 md:mb-0">Phone Number</label>
              <div className="flex w-full md:w-2/3">
                <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                  <img src={KenyaIcon} alt="Kenyan Flag" className="w-6 h-4 mr-2" />
                  +254
                </span>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <label htmlFor="email" className="text-lg font-semibold mb-2 md:mb-0">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full md:w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email Address"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="px-6 py-2">Save Changes</Button>
            </div>
          </div>
        </form>
      )}
    </MainAppWrapper>
  )
}

export default Settings
