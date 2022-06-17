import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const accessToken = sessionStorage.getItem("accessToken");
  const user = JSON.parse(sessionStorage.getItem("user"));

  const isUser = user?.role === "user";

  return isUser ? (
    <Outlet />
  ) : accessToken ? (
    <Navigate to="/unauthorized" replace />
  ) : (
    <Navigate to="/signin" replace />
  );
}

export default ProtectedRoute;
