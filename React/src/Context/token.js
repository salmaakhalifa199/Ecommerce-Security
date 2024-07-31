import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import React from "react";

export const tokenContext = createContext();

export default function TokenContextProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [])

  function  getPayload(newToken) {
    const {role, id, email} = jwtDecode(newToken);

    return {role, id, email};
  }

  return (
    <tokenContext.Provider value={{ token, setToken, getPayload }}>
      {children}
    </tokenContext.Provider>
  );
}
