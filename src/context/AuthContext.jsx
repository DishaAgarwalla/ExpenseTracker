import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = async (email, password) => {
    const user = { id: 1, name: email.split('@')[0], email }
    setUser(user)
    return user
  }

  const register = async (name, email, password) => {
    const user = { id: 1, name, email }
    setUser(user)
    return user
  }

  const logout = () => {
    setUser(null)
  }

  const value = { user, login, register, logout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
