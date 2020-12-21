import React, { createContext, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const loadedToken = localStorage.getItem("token" || "");
  const [token, setToken] = useState(loadedToken);

  if (token) {
    localStorage.setItem("token", token.token);
    localStorage.setItem("admin", token.admin);
  }

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
