import { useEffect, useState } from 'react'
import { blink } from '../blink/client'

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      if (!state.isLoading) setIsLoading(false)
    })
    return unsubscribe
  }, [])

  const login = () => blink.auth.login()
  const logout = () => blink.auth.logout()

  return { user, isLoading, login, logout }
}
