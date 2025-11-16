import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) return <Navigate to="/signin" replace />
  if (role && user.role.toLowerCase() !== role.toString()) return <Navigate to="/unauthorized" replace />

  return children
}
