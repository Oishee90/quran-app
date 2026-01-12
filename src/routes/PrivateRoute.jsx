/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export function PrivateRoute({ children, allowedRoles }) {
  const access_token = useSelector((state) => state.auth?.access_token);

  const user = useSelector((state) => state.auth?.user);

  const location = useLocation();

  if (!access_token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  //   if (!allowedRoles.includes(role)) {
  //     return <Navigate to="/" replace />;
  //   }

  return children;
}
