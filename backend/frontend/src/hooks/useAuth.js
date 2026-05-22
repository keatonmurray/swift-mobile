import { useState, useCallback } from "react"

export const useAuth = () => {
  const [token] = useState(() => localStorage.getItem("api_token"))
  const [userId] = useState(() => localStorage.getItem("user_id"))

  const isAuthenticated = !!token

  const logout = useCallback(() => {
    localStorage.removeItem("api_token")
    localStorage.removeItem("user_id")
    window.location.href = "/login"
  }, [])

  return { token, userId, isAuthenticated, logout }
}
