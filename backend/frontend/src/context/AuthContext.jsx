import { createContext, useContext, useState, useCallback } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("api_token"))
  const [userId, setUserId] = useState(() => localStorage.getItem("user_id"))

  const isAuthenticated = !!token

  const login = useCallback((newToken, newUserId, accountType) => {
    localStorage.setItem("api_token", newToken)
    localStorage.setItem("user_id", newUserId)
    localStorage.setItem("account_type", accountType);
    setToken(newToken)
    setUserId(newUserId)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("api_token")
    localStorage.removeItem("user_id")
    setToken(null)
    setUserId(null)
  }, [])

  return (
    <AuthContext.Provider value={{ token, userId, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
