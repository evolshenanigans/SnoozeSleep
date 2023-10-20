// CurrentUserEmailContext.js
import React, { createContext, useContext, useState } from "react";

const CurrentUserEmailContext = createContext(null);
export function CurrentUserEmailProvider({ children }) {
  const [currentUserEmail, setCurrentUserEmail] = useState(null);

  return (
    // something about a current user email context, with all children nested
    <></>
  );
}

export function useCurrentUserEmail() {
  return useContext(CurrentUserEmailContext);
}
