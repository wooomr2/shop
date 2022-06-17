import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRoles }) {
  const accessToken = sessionStorage.getItem("accessToken");
  const user = JSON.parse(sessionStorage.getItem("user"));

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
