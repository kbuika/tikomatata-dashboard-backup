import useSWR from "swr";
import userService from "../services/user.service";
import { CURRENT_USER } from "../constants/fetch-keys";
import { getUserNameInitials } from "../lib/utils";
// import type { ICurrentUserResponse, IUser } from "types";
import { useUserDetailsStore } from "../stores/user-details-store";

export default function useUser() {
  const setUser = useUserDetailsStore((state) => state.setUser);

  const { data, isLoading, error, mutate } = useSWR<any>(
    CURRENT_USER,
    () => userService.currentUser(),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      onSuccess: (data) => {
        if (data) {
          setUser(data);
        }
      },
    }
  );

  const user = error ? undefined : data;
  const initials = user ? getUserNameInitials(user?.name) : "";

  // redirect if needed use a useEffect here for the redirect

  return {
    user,
    userInitials: initials,
    isUserLoading: isLoading,
    mutateUser: mutate,
    userError: error,
  };
}
