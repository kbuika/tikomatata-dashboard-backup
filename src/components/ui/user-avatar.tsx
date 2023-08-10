import { useUserState } from "@/src/contexts/user.context"
import { Avatar, AvatarImage, AvatarFallback } from "./avatar"

const UserAvatar = () => {
  const { user, userInitials } = useUserState()
  return (
    <Avatar>
      <AvatarImage src={user?.imageUrl} alt="avatar" />
      <AvatarFallback>{userInitials}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
