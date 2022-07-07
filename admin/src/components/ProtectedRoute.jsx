import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRoles }) {
  const accessToken = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));

  const haveRoles = user?.roles?.find((role) => allowedRoles?.includes(role));

  return haveRoles ? (
    <Outlet />
  ) : accessToken ? (
    <Navigate to="/unauthorized" replace />
  ) : (
    <Navigate to="/signin" replace />
  );
}

export default ProtectedRoute;
