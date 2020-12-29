import React, { createContext, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const loadedToken = localStorage.getItem("token" || "");
  const [token, setToken] = useState(loadedToken);
  const [admin, setAdmin] = useState("");

  if (token) {
    localStorage.setItem("token", token);
  }

  return (
    <AuthContext.Provider value={{ token, setToken, admin, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
