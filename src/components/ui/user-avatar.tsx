import { useUserDetailsStore } from "@/src/stores/user-details-store"
import { Avatar, AvatarImage } from "./avatar"

const UserAvatar = () => {
  const user = useUserDetailsStore((state) => state.user)
  return (
    <Avatar>
      <AvatarImage src={user?.imageUrl} alt="avatar" />
      {/* <AvatarFallback>{userInitials}</AvatarFallback> */}
    </Avatar>
  )
}

export default UserAvatar
