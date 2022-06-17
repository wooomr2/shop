import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const accessToken = sessionStorage.getItem("accessToken");
  const user = JSON.parse(sessionStorage.getItem("user"));

  const isAdmin = user?.role === "admin" || user?.role === "root";

  return isAdmin ? (
    <Outlet />
  ) : accessToken ? (
    <Navigate to="/unauthorized" replace />
  ) : (
    <Navigate to="/signin" replace />
  );
}

export default ProtectedRoute;
