import useSWR from "swr";
// services
import userService from "../services/user.service";
// constants
import { CURRENT_USER } from "../constants/fetch-keys";
import { getUserNameInitials } from "../lib/utils";
// types
// import type { ICurrentUserResponse, IUser } from "types";
let call = 0;
export default function useUser({ options = {} } = {}) {
    console.log("call", call++);
  // API to fetch user information
  const { data, isLoading, error, mutate } = useSWR<any>(
    CURRENT_USER,
    () => userService.currentUser(),
    options
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
