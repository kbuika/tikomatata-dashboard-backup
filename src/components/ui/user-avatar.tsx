import { useUserDetailsStore } from "@/src/stores/user-details-store"
import { Avatar, AvatarImage, AvatarFallback } from "./avatar"
import { getUserNameInitials } from "@/src/lib/utils"

const UserAvatar = () => {
  const user = useUserDetailsStore((state) => state.user)
  const userInitials = getUserNameInitials(user?.name)
  return (
    <Avatar>
      {user?.imageUrl && <AvatarImage src={user?.imageUrl} alt="avatar" />}
      <AvatarFallback>{userInitials || "You"}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
