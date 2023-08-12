import { useUserStore } from "@/src/stores/user-store"
import { Avatar, AvatarImage } from "./avatar"

const UserAvatar = () => {
  const user = useUserStore((state) => state.user)
  return (
    <Avatar>
      <AvatarImage src={user?.imageUrl} alt="avatar" />
      {/* <AvatarFallback>{userInitials}</AvatarFallback> */}
    </Avatar>
  )
}

export default UserAvatar
