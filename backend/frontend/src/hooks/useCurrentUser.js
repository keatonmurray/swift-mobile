import { useEffect, useState } from "react"
import axios from "axios"

/**
 * useCurrentUser
 * --------------
 * Lightweight hook that loads the authenticated user from `/api/user`.
 * Returns `{ user, loading, error, refetch }`.
 *
 * The token is read from localStorage on mount; if it's missing the hook
 * resolves to `loading: false, user: null` without firing a request.
 *
 * Replace the call site logic across the app with this hook to avoid
 * the duplicate fetch boilerplate that exists in many pages today.
 */
const useCurrentUser = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem("api_token")
    if (!token) {
      setLoading(false)
      return
    }

    let active = true

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        )

        // The API has shipped a few shapes over time — be defensive.
        const fetched = res.data?.user ?? res.data?.data ?? res.data ?? null

        if (active) {
          setUser(fetched)
          setError(null)
        }
      } catch (err) {
        if (active) {
          setError(err)
          setUser(null)
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchUser()
    return () => {
      active = false
    }
  }, [reloadKey])

  return {
    user,
    loading,
    error,
    refetch: () => setReloadKey((k) => k + 1),
  }
}

export default useCurrentUser
