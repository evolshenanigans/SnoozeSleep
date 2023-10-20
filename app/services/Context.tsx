import { createContext, useContext } from "react";

export const UserContext = createContext<any | undefined>(undefined);

export function useUserContext() {
  const currentUser = useContext(UserContext);
  //   if (currentUser === undefined) {
  //     throw new Error("useUserContext must be used with a UserContext");
  //   }
  //   console.log("current user IN CONTEXT", currentUser);
  return currentUser;
}
