import React, { ReactNode } from "react"
import { Navigate } from "react-router-dom"

interface IProtectedProps {
  isSignedIn: boolean
  children: ReactNode
}

const Protected: React.FC<IProtectedProps> = ({ isSignedIn, children }) => {
  if (!isSignedIn) {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}

export default Protected
